<template>
	<div class='skins'>
		<div><span></span>点击皮肤可以观看介绍视频哦</div>
		<ul>
			<li v-for="skin in todos.skins">
				<img :src="`http://cdn.tgp.qq.com/pallas/images/skins/original/${todos.key}-${skin.id}.jpg`" @click='jumpDetails(skin)'>
				<p>{{skin.name}}</p>
			</li>
		</ul>
	</div>
</template>
<style lang='less'>
	.skins{
		background: #f0f0f0;
		>div {
			font-size: .3rem;
			height: .8rem;
			line-height: .8rem;
			span {
				width: .38rem;
				height: .38rem;
				display: inline-block;
				background: url(../assets/icon.jpg);
				background-size: cover;
				margin-left: .13rem;
				margin-top: .24rem;
				margin-right: .15rem;
			}
		}
		ul {
			padding: 0 .14rem;
			text-align: center;
			img {
				display: block;
				width:100%;
			}
			p {
				height: .83rem;
				line-height: .83rem;
				font-size: .3rem;
				font-weight: 900;
			}
		}
	}
</style>
<script>
	export default{
		data(){
			return {

			}
		},
		created(){

		},
		props:['todos'],
		methods:{
			jumpDetails:function(skin){
				location.href=skin.displayUrl
			}
		}
	}
</script>