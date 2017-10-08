<template>
	<div class="playerInfo">
		<div :class='["info",scrollTop<10?"opc":""]'>
			<div class='isLoading'>
				<div class="spinner">
				    <div class="double-bounce1"></div>
				    <div class="double-bounce2"></div>
				</div>
				<p class='tips'></p>
			</div>
			<div class="playerArrat" @click="page++"><img :src="`http://static.lolbox.duowan.com/images/profile_icons/${icon_Id}.jpg`"></div>
			<p class='level'>{{playerInfo.level}}级</p>
			<p class='area'>{{playerInfo.area_id|getAreaName}}&nbsp;&nbsp;&nbsp;<span class="dan">{{dan}}</span></p>
			<p class="battlePower">战斗力&nbsp;:&nbsp;{{playerInfo.power_value}}&nbsp;&nbsp;赞&nbsp;:&nbsp;{{playerInfo.praise_num}}</p>
		</div>
		<div class='playerRecord'>
			<ul class="killNum">
				<li><span></span><p>三杀:{{playerInfos["triple_kills"]}}</p></li>
				<li><span></span><p>四杀:{{playerInfos.quadra_kills}}</p></li>
				<li><span></span><p>五杀:{{playerInfos.penta_kills}}</p></li>
				<li><span></span><p>总击杀:{{playerInfos.kills_total}}</p></li>
				<li><span></span><p>MVP:{{playerInfos.mvp}}</p></li>
				<li><span></span><p>超神:{{playerInfos.god_like_num}}</p></li>
			</ul>
			<ul class="matches">
				<li v-for='battle in battleList' @click="battleDetails(battle)">
					<div class='championPic'>
						<img v-lazy="`http://cdn.tgp.qq.com/pallas/images/champions_id/${battle.champion_id}.png`" />
					</div>
					<div class='battleInfo'>
						<p v-if='battle.win==2'>失败</p>
						<p v-else>胜利</p>
						<p>{{battle.game_type|getGameType}}</p>
					</div>
					<span></span>
				</li>
				<rise-loader :loading="loading" :color="color" :size="size"></rise-loader>
			</ul>
		</div>
		
	</div>
</template>
<script>
	import ajax from 'axios'
	import {getAreaName,getGameType} from '../filters/'
	import {mapActions} from 'vuex'
	import {Drh} from '../modules'
	import RiseLoader from 'vue-spinner/src/RiseLoader.vue'
	export default {
		data(){
			return {
				playerInfo:"",//用户信息简
				playerInfos:{},//用户信息
				battleList:[],//对战信息
				dan:'',//段位
				icon_Id:"",
				flag:true,//用于控制是否可以加载更多
				page: 0,//定义当前页数
				loading: false,//展示是否显示加载动画
				color:"#000",
				size:".25rem",
				scrollTop:11
			}
		},
		created(){
			this.setTitle('搜索')
			this.setShow(false)
	 		this.setTrans(true)
			//请求页面数据
			this.getAjax()
		},
		filters:{
			getAreaName,
			getGameType
		},
		components:{
			RiseLoader
		},
		methods:{
			battleDetails:function(battle){
				this.$router.push({path:`/index/battleDetails/${this.playerInfo.qquin}/${this.playerInfo.area_id}/${battle.game_id}`})
			},
			getBattleInfo: function(){//ajax请求数据
				let qquin = this.$route.params.qquin
				let vaid = this.$route.params.area_id
				ajax.get("/api/CombatList?qquin="+qquin+"&vaid="+vaid+"&p="+this.page).then(res=>{
					this.battleList = this.battleList.concat(res.data.data[0].battle_list)//拼接数组
					if(res.data.data[0].list_num==0){//没有数据了
						this.loading = false//隐藏加载动画
						//移除监听
						this.flag = false
					}else{
						//设置200毫秒后使flag变为true 
						setTimeout((function(){
							this.flag = true
						}).bind(this),200)
					}
				},err=>{
					console.log(err)
				})
			},
			getAjax: function(){
				let qquin = this.$route.params.qquin
				let vaid = this.$route.params.area_id
				this.icon_Id = this.$route.params.icon_id
				ajax.get("/api/UserHotInfo?qquin="+qquin+"&vaid="+vaid).then(res=>{
				this.playerInfo = res.data.data[0]
				this.setTitle(this.playerInfo.name);
				console.log(this.playerInfo)
					ajax.get("/api/GetTierQueue?tier="+this.playerInfo.tier+"&queue="+this.playerInfo.queue).then(res=>{
						this.dan = res.data.data[0].return
					})
				},err=>{
					console.log(err)
				})
				ajax.get("/api/UserExtInfo?qquin="+qquin+"&vaid="+vaid).then(res=>{
					this.playerInfos.triple_kills = res.data.data[1].triple_kills;
					this.playerInfos.quadra_kills = res.data.data[1].quadra_kills;
					this.playerInfos.penta_kills = res.data.data[1].penta_kills;
					this.playerInfos.kills_total = res.data.data[1].kills_total;
					this.playerInfos.mvp = res.data.data[2].total_match_mvps+res.data.data[2].total_rank_mvps;
					this.playerInfos.god_like_num = res.data.data[1].god_like_num;
					
				},err=>{
					console.log(err)
				})
				//请求战斗数据
				this.getBattleInfo();
			},
			loadMore: function(){
				if(this.flag){
					this.page++;
					this.loading = true;
					this.flag = false;
					console.log(this.page)
				}
			},
			...mapActions(['setTitle','setShow','setTrans'])
		},
		watch:{//监测page改变调用ajax
			"page": function(){
				this.getBattleInfo();
			},
		},
		mounted(){
			//获取页面下滑元素
			let warp = document.getElementsByClassName('playerInfo')[0];
			let el = document.querySelector('.playerRecord');//获取上拉元素
			window.onscroll = function(e){
				if(document.body.scrollTop>212){
					document.body.scrollTop = 212
					document.body.style.overflow = "hidden";
				}
				this.scrollTop = Math.abs(document.body.scrollTop-212)
			}
			var ss = new Drh({
				ele:el,
				type:'upRefresh'
			},this.loadMore)
			ss.upRefresh()
			var dd = new Drh({
				ele: warp,
				type:'downRefresh'
			},this.getAjax)
			dd.downRefresh()//添加下拉刷新
		},
		updated(){//页面数据更新完毕
			let load = document.getElementsByClassName('isLoading')[0];
			load.style.height = 0;
			load.getElementsByClassName('tips')[0].innerText = ''
		},
		destoryed(){
			this.setTrans(false);
			window.onscroll = null;
		}

	}
	       
</script>
<style lang="less">
	.playerInfo {
		.info {
			width: 100%;
			padding-bottom:.36rem;
			background: url(../assets/playerInfos.jpg) no-repeat;
			background-size: cover;
			padding-top: .88rem;
			transition: all 1s;
			&.opc{
				.level,
				.area,
				.battlePower{
					color:rgba(255,255,255,0)
				}
			}
		}
		.playerArrat {
			width: 1.28rem;
			height: 1.28rem;
			margin: 0 auto;
			padding-top: .46rem;
			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.level {
			margin-top: .18rem;
			font-size: .3rem;
			text-align: center;
			font-weight: 700;
			color: #fff;
		}
		.area {
			font-size: .24rem;
			color: #fff;
			text-align: center;
			margin-top: .3rem;
		}
		.battlePower {
			font-size: .22rem;
			color:#fff;
			text-align: center;
			margin-top: .16rem;
		}
		.killNum{
			overflow: hidden;
			height: 3.82rem;
			border-bottom: .02rem solid #f0f0f0;
			li {
				width: 2.5rem;
				font-size: .22rem;
				text-align: center;
				float:left;
				&:nth-child(1){
					span {
						display: block;
						width: .66rem;
						height: .66rem;
						background: url(../assets/threeKill.jpg);
						background-size: cover;
						margin: .44rem auto;
					}
				}
				&:nth-child(2){
					span {
						display: block;
						width: .66rem;
						height: .66rem;
						background: url(../assets/fourKill.jpg);
						background-size: cover;
						margin: .44rem auto;
					}
				}
				&:nth-child(3){
					span {
						display: block;
						width: .66rem;
						height: .66rem;
						background: url(../assets/fiveKill.jpg);
						background-size: cover;
						margin: .44rem auto;
					}
				}
				&:nth-child(4){
					span {
						display: block;
						width: .66rem;
						height: .66rem;
						background: url(../assets/totalKill.jpg);
						background-size: cover;
						margin: .44rem auto;
					}
				}
				&:nth-child(5){
					span {
						display: block;
						width: .55rem;
						height: .71rem;
						background: url(../assets/mvp.jpg);
						background-size: cover;
						margin: .44rem auto;
					}
				}
				&:nth-child(6){
					span {
						display: block;
						width: .64rem;
						height: .64rem;
						background: url(../assets/godLike.jpg);
						background-size: cover;
						margin: .44rem auto;
					}
				}
			}

		}
	}
	.playerRecord{
		overflow-y: auto;
		height: 15rem;
	}
	.matches{
		li{
			padding-top: .33rem;
			padding-bottom: .18rem;
			overflow: hidden;
			border-bottom: .01rem solid #e1e1e1;
			span{
				width: .13rem;
				height: .23rem;
				display: block;
				background: url(../assets/arrow_right.png);
				background-size: 100%;
				float:right;
				margin-right: .41rem;
				margin-top: .39rem;
			}
			transition: all 1s;
		}
		.championPic{
			width:1rem;
			height:1rem;
			float:left;
			margin-left: .41rem;
			img{
				width: 100%;
				height: 100%;
				border-radius:50%;
			}
		}
		.battleInfo{
			float:left;
			padding-left: .35rem;
			p{
				color:#F00;
				font-size: .3rem;
				margin-top: .1rem;
			}
			p:last-child{
				color: #959595;
				font-size: .24rem;
				margin-top: .2rem;
			}
		}
	}
</style>