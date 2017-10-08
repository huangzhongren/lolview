<template>
	<div>
		<div class="heroGenarel">
			<img :src="`http://cdn.tgp.qq.com/pallas/images/skins/original/${hero.key}-${skinCur.id}.jpg`"/>
			<p>&nbsp;&nbsp;&nbsp;{{hero.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{tags|getHeroType}}&nbsp;&nbsp;&nbsp;&nbsp;功&nbsp;&nbsp;:&nbsp;&nbsp;{{heroInfo.attack}}&nbsp;&nbsp;&nbsp;法&nbsp;&nbsp;:&nbsp;&nbsp;{{heroInfo.magic}}&nbsp;&nbsp;&nbsp;防&nbsp;&nbsp;:&nbsp;&nbsp;{{heroInfo.defense}}&nbsp;&nbsp;&nbsp;操作&nbsp;&nbsp;:&nbsp;&nbsp;{{heroInfo.difficulty}}</p>
		</div>
		<ul class='tabs'>
			<li :class ='{active:currentView==tab1}' @click="toggleTab(tab1)"><span>技能说明</span></li>
			<li :class ='{active:currentView==tab2}' @click="toggleTab(tab2)"><span>皮肤欣赏</span></li>
		</ul>
		<div class="list">
			<component :is='currentView' :todos='hero'></component>
		</div>
	</div>
</template>
<script>
    import ajax from 'axios'
    import {mapActions} from 'vuex'
    import {getHeroType} from '../filters'
    import skills from '../components/skills'
    import skins from '../components/skins'
    export default {
    	data(){
    		return {
    			hero:"",
    			skinCur:'',
    			tags:'',
    			heroInfo:'',
    			tab1:"tabOne",
    			tab2:"tabTwo",
    			currentView: 'tabOne',
    			passiveImg:'',
    		}
    	},
		created(){
			this.setShow(false)
		},
		filters:{
			getHeroType
		},
		methods:{
			...mapActions(['setTitle','setShow']),
			toggleTab:function(tab){
				this.currentView = tab;
			}			
		},
		components:{
			tabOne:skills,
			tabTwo:skins
		},
		mounted(){
			let champion_id = this.$route.params.heroId;
			ajax.get("/api/GetChampionDetail?champion_id="+champion_id).then(res=>{
				this.hero = res.data.data[0];
				this.skinCur = this.hero.skins[0];
				this.tags = this.hero.tags[1];
				this.setTitle(this.hero.name);
				this.heroInfo = this.hero.info;
			},err=>{
				console.log(err);
			})
		}
	}
</script>
<style lang='less'>
	.heroGenarel {
		margin-top: .88rem;
		position: relative;
		height: 3.71rem;
		img {
			height: 100%;
		}
		p{
			width: 100%;
			height: .81rem;
			line-height: .81rem;
			font-size: .28rem;
			font-weight: normal;
			color: #fff;
			background:rgba(0,0,0,0.3);
			position: absolute;
			bottom: 0;
		}
	}
	.tabs {
		overflow: hidden;
		li{
			width: 50%;
			height: .83rem;
			line-height: .83rem;
			text-align: center;
			float: left;
			font-size: .3rem ;	
			span{
				width: 80%;
				height: 100%;
				display:block;
			}
			&.active{
				span{
					color: #40a6fb;
					border-bottom: .04rem solid #40a6fb;
				}
			}
		}
	}
</style>