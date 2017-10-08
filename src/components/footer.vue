<template>
<div id='footer' v-show='isShow'>
	<router-link v-for="(item,index) in items" :to="`/index/${item.src}`"  :class ="[isCur==index?item.class2:item.class1]" :key="item.id">
		<div></div>
		<p>{{item.text}}</p>	
	</router-link>	
</div>
</template>
<script>
	import news from '../assets/new.png'
	import hero from '@/assets/hero.png'
	import player from '@/assets/player.png'
	import video from '@/assets/video.png'
	import {mapGetters} from 'vuex'
	export default {
		data(){
			return {
				items:[{
					id:1,
					src:'news',
					text:'资讯',
					class1: 'news',
					class2: 'news1',
				},{
					id:2,
					src:'player',
					text:'玩家',
					class1: 'player',
					class2: 'player1',
				},{
					id:3,
					src:'hero',
					text:'英雄',
					class1: 'hero',
					class2: 'hero1',
				},{
					id:4,
					src:'video',
					text:'视频',
					class1: 'video',
					class2: 'video1',
				}],
			}
		},
		methods:{
			
		},
		computed:{
			...mapGetters(['isCur','isShow'])
		}
		
	}

</script>
<style lang='less'>

#footer{
	width: 100%;
	height: .98rem;
	position:fixed;
	bottom: 0;
	left: 0;
	background: #fafafa;
	box-shadow: 0 -2px 2px rgba(0,0,0,0.2);
	a {
		width: 1.87rem;
		height: 98rem;
		display: block;
		font-size: .2rem;
		color: #979797;
		text-align: center;
		float:left;
		text-decoration: none;
		&.news {
			div {
				background:url(../assets/new1.png);
				background-size: cover;
			}
		}
		&.player {
			div {
				background:url(../assets/player1.png);
				background-size: cover;
			}
		}
		&.hero {
			div {
				background:url(../assets/hero1.png);
				background-size: cover;
			}
		}
		&.video {
			div {
				background:url(../assets/video1.png);
				background-size: cover;
			}
		}
		&.news1 {
			color: #40a6fb;
			div {
				background:url(../assets/new.png);
				background-size: cover;
			}
		}
		&.player1 {
			color: #40a6fb;
			div {
				background:url(../assets/player.png);
				background-size: cover;
			}
		}
		&.hero1 {
			color: #40a6fb;
			div {
				background:url(../assets/hero.png);
				background-size: cover;
			}
		}
		&.video1{
			color: #40a6fb;
			div {
				background:url(../assets/video.png);
				background-size: cover;
			}
		}
		div{
			width: .38rem;
			height: .4rem;
			margin: 0 auto;
			margin-top: .18rem;
		}
		
	}	
}
</style>