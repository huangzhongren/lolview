<template>
	<div class="skills">
		<div><span></span>技能介绍</div>
		<ul class="skillIntroduce">
			<li>
				<div class='skillImg'><img :src="`http://ossweb-img.qq.com/images/lol/img/passive/${passiveImg.full}`"></div>
				<div class='skillName'>
					<h1 v-text='passive.name'></h1>
					<p v-text='passive.description'></p>
				</div>
			</li>
			<li v-for="skill in todos.spells">
				<div class='skillImg'><img :src="`http://ossweb-img.qq.com/images/lol/img/spell/${skill.image.full}`"></div>
				<div class='skillName'>
					<h1 v-html='skill.name'></h1>
					<p v-html='skill.tooltip'></p>
				</div>
			</li>
		</ul>
		<div><span></span>技能加点推荐</div>
		<div class='addPoint' v-for='(type,key) in todos.trait'>{{key|playPosition}}：{{type["add-point"]}}</div>
	</div>
</template>
<script>
import {playPosition} from '../filters'
	export default{
		data(){
			return {
				passiveImg:'',
				passive:''
			}
		},
		created(){

		},
		filters:{
			playPosition
		},
		props:['todos'],
		beforeUpdate(){
			console.log(11)
			this.passive = this.todos.passive;
			this.passiveImg = this.todos.passive.image
		}
	}
</script>
<style lang='less'>
	.skills{
		>div {
			font-size: .3rem;
			background: #f0f0f0;
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
		.skillIntroduce{
			font-size:.2rem;
			li {
				overflow: hidden;
				padding-bottom: .43rem;
				border-bottom: .02rem solid #f0f0f0;
			}
			.skillImg {
				width: 1.4rem;
				height: 1.4rem;
				margin-left: .2rem;
				margin-top: .75rem;
				float: left;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.skillName {
				float: left;
				width: 5.6rem;
				padding-left: .22rem;
				h1 {
					font-size: .3rem;
					margin-top: .14rem;
				}
				p{
					margin-top: .32rem;
				}
			}
			
		}
		.addPoint {
			padding: .24rem .32rem;
			font-size: .3rem;
			background: #fff;
		}
	}
</style>