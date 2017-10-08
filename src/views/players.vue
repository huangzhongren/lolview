<template>
	<div>
		<div class="searchBar">
			<input type="text" placeholder="搜索召唤师" v-model="msg" />
			<div class='btn' @click="disPlayers">
				<span class='search'></span>
				<p>搜索</p>
			</div>
		</div>
		<div v-show="players.length == 0" class='blank'></div>
		<ul class="playerList">
			<li v-for="player in players" @click="getDetails(player)">
				<div class="avatar"><img v-lazy="`http://static.lolbox.duowan.com/images/profile_icons/${player.icon_id}.jpg`" /></div>
				<div>
					<h1>{{player.name}}</h1>
					<p>{{player.area_id|getAreaName}}<span>等级{{player.level}}</span></p>
				</div>
			</li>
		</ul>	
	</div>	
</template>
<script>
	import {getAreaName,headUrl} from '../filters'
	import {mapActions,mapGetters} from 'vuex'
	export default{
		created(){
			this.setTitle("搜索");
			this.setTrans(false);
			this.setShow(true);
			this.setCur(1)
		},
		data(){
			return {
				msg:"",
				loading: false
			}
		},
		methods:{
			disPlayers(){
				this.ajax.get(`/api/UserArea?keyword=${this.msg}`).then(res=>{
					this.setPlayer(res.data.data)
				},err=>{
					console.log(err)
				})
			},
			getDetails(player){
				//跳转
				this.$router.push({path:`/index/playerDetails/${player.qquin}/${player.area_id}/${player.icon_id}`});
			},
			...mapActions(['setTitle','setCur','setPlayer','setTrans','setShow'])
		},
		computed:{
			...mapGetters(['players'])
		},
		filters:{
			getAreaName,
			headUrl
		},
		
	}
</script>
<style lang='less'>
	.searchBar {
		width: 100%;
		height: 1.05rem;
		margin-top: .88rem;
		background: #40a6fb;
		position: relative;
		input {
			width: 6.24rem;
			height: .69rem;
			font-size: .28rem;
			display: block;
			margin :0 auto;
			border-radius: .1rem;
			padding-left: .36rem;
		}
		.btn {
			width: 1.01rem;
			height: .69rem;
			line-height: .69rem;
			font-size: .24rem;
			color: #40a6fb;
			position: absolute;
			right: .45rem;
			top: 0;
			.search{
				width: .23rem;
				height: .22rem;
				margin-top: .21rem;
				margin-right: .1rem;
				display: block;
				background: url(../assets/search.jpg);
				background-size: cover;
				float:left;
			}
			p {
				float:left;
			}
		}
		
	}
	.blank {
		width: 1.52rem;
		height: 2.09rem;
		background: url(../assets/blank.jpg);
		background-size: cover;
		margin-left: 2.99rem;
		margin-top: 3rem;
	}
	.playerList {
		overflow-y: auto;
		height: 12rem;
		margin-bottom: .98rem;
		li {
			overflow: hidden;
			padding-top: .46rem;
			padding-bottom: .18rem;
			border-bottom: #e1e1e1;
			margin-left: .5rem;
		}
		.avatar {
			width:1rem;
			height:1rem;
			img {
				border-radius:50%;
				width:100%;
			}
		}
		div {
			float: left;
		}
		h1 {
			font-size: .28rem;
			margin-left: .35rem;
			margin-top: .1rem;
		}
		p {
			font-size: .22rem;
			margin-left: .35rem;
			margin-top: .25rem;
			span {
				margin-left: .28rem;
			}
		}
	}
</style>