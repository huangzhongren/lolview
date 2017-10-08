<template>
	<div :class='["header",isTrans?"trans":""]'>
		<span @click="goBack"></span>
		<p>{{msg}}</p>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	export default{
		data(){
			return {
				path:''
			}
		},
		methods:{
			goBack(){
				var path1 = this.$route.path
				if(path1.search(/heroesDetails/)!=-1){
					this.$router.push({path:'/index/hero'})
				}else if(path1.search(/playerDetails/)!=-1){
					this.$router.push({path:'/index/player'})
				}else if(path1.search(/battleDetails/)!=-1){
					history.go(-1)
				}else if(path1.search(/[news|hero|player|video]/)!=-1){
					this.$router.push({path:'/'})
				}
			}
		},
		computed:mapGetters(['msg','isTrans'])

	}
</script>
<style lang='less'>
	.header {
		width: 100%;
		height:.88rem;
		background: #40a6fb;
		position: fixed;
		top:0;
		z-index: 10;
		&.trans{
			background: rgba(0,0,0,0);
		}
		span{
			width: .18rem;
			height:  .34rem;
			position: absolute;
			top: .32rem;
			left: .33rem;
			display: block;
			background: url(../assets/arrow_left.png);
			background-size: cover;
		}
		p {
			line-height: .88rem;
			text-align: center;
			font-size: .35rem;
			color: #fff;
		}
		
	}
</style>
