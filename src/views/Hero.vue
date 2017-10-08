<template>
	<div>
		<div v-if='isLoading' class='isLoading'></div>
		<ul class='heroList'>
			<li v-for="hero in heroes" @click='jumpHeroDetails(hero)'>
				<div class="heroArrat"><img v-lazy="`http://cdn.tgp.qq.com/pallas/images/champions_id/${hero.id}.png`" /></div>
				<div class="heroInfo">
					<p class="heroTitle">{{hero.title}}</p>
					<p class="heroName">{{hero.cname}}({{hero.ename}})</p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import ajax from 'axios'
export default{
	created(){
		this.setTitle("英雄列表");
		this.setCur(2);
		this.setShow(true);
		this.setTrans(false);
	},
	data(){
		return {
			
		}
	},
	props: ['todos'],
	methods: {	
		...mapActions(['setTitle','setCur','setHero','setShow','setTrans']),
		jumpHeroDetails:function(hero){
			this.$router.push("/index/heroesDetails/"+hero.id)
		}
	},
	computed:{
		...mapGetters(['heroes','isLoading'])
	},
	mounted(){
		ajax.get("/api/champion").then(res=>{
          	this.setHero(res.data.data)
        },err=>{
          	console.log(err)
        })
	}

}
</script>
<style lang="less">
	.heroList{
		margin-top: .88rem;
		li{
			width: 50%;
			float:left;
			padding-top: .32rem;
			padding-left: .29rem;
			box-sizing: border-box;
			overflow: hidden;
			.heroArrat {
				width:1.15rem;
				height:1.15rem;
				float: left;
				img {
					width:100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.heroInfo {
				text-indent: .14rem;
				.heroTitle {
					font-size: .3rem;
					margin-top: .22rem;
				}
				.heroName {
					font-size: .27rem;
					height: .35rem;
					overflow: hidden;
				}
			}
		}
	}
</style>