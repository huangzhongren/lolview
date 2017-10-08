<template>
	<div>
		<ul class='videoList'>
			<li v-for="item in videoList">
				<img v-lazy="item.img">
				<p class='titleP'>{{item.title}}</p>
				<p class='date'>{{item.createdate.substring(0,10)}}<span>{{transForm(item.comments)}}万评论</span></p>
			</li>
		</ul>
	</div>
</template>
<script>
	import {videoList} from '../data/videolist'
	import {mapActions} from 'vuex'
	export default{
		created(){
			this.setTitle("视频");
			this.setCur(3);
			this.setTrans(false);
			this.setShow(true)
		},
		data(){
			return {
				videoList
			}
		},
		methods:{
			transForm:function(num){
				if(num>10000){
					return parseInt(num/10000)
				}else{
					return num;
				}
			},
			...mapActions(['setTitle','setCur','setTrans','setShow'])
		}
	}
</script>
<style lang="less">
	.videoList{
		margin-top: .88rem;
		margin-bottom: .98rem;
		padding-left: .14rem;
		padding-right: .14rem;
		li{
			width: 3.31rem;
			height: 3.24rem;
			float: left;
			margin: .15rem;
			img {
				width: 100%;
				height: 2.19rem;
			}
			.titleP {
				font-size: .24rem;
				height: .7rem;
				overflow: hidden;
			}
			.date {
				font-size: .2rem;
				span{
					color:#40a6fb;
					float:right;
				}
			}
		}
		img[lazy=loaded] {
			opacity: 0;
			animation: fade 1s forwards;
		}

	}
	@keyframes fade {
		from{
			opacity:0
		}
		to{
			opacity:1
		}
	}
</style>