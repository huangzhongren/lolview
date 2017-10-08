<template>
	<ul class='newsList'>
		<li v-for='item in newsList' @click='jumpToDeatils(item)'>
			<div class="small_img">
				<img :src="item.image_url_small"/>
			</div>
			<div class="newInfo">
				<h1 v-text="item.title"></h1>	
				<h4 v-text="item.summary"></h4>
				<p>{{item.publication_date.slice(0,10)}}<span>{{transForm(item.pv)}}万阅</span></p>
			</div>
		</li>
	</ul>
</template>
<script>	
	import {newsList} from '../data/newslist'
	import sss from '../data/ajax'
	export default{
		data(){
			return {
				newsList
			}
		},
		methods:{
			transForm:sss.transForm,
			jumpToDeatils:function(item){
				location.href = item.article_url;
			}
		},
		mounted(){
			let newsList = document.querySelectorAll(".newsList");
			console.log(newsList)
			newsList.onscroll = function(){
				console.log("我滚动了")
			}
		}
	}
</script>
<style lang='less'>
	.newsList{
		width: 100%;
		overflow-y: auto;
		height: 7rem;
		li{
			height: 1.2rem;
			padding: .1rem;
			.small_img {
				width: 1.5rem;
				height: 1.2rem;
				float:left;
			}
			img {
				width: 100%;
				height: 100%;
			}
			.newInfo {
				width:5.5rem;
				padding-left: .21rem;
				float: left;
				h1 {
					font-size: .3rem;
				}
				h4 {
					font-size: .26rem;
					font-weight: normal;
					height: .36rem;
					overflow:hidden;
				}
				p {
					font-size: .26rem;
					span{
						color: #40a6fb;
						margin-left: .51rem;
					}
				}
			}
			border-bottom: .01rem solid #f0f0f0;
		}
	}
</style>