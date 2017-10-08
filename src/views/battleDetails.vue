<template>
	<div class='battleDetails'>
		<div class='battleInfo'>
			<span>开始时间 : {{startTime.substring(10,16)}}</span> 
			<span>总时长 : {{battleInfo.duration|transTime}}</span>
			<span>模式 : {{battleInfo.game_type|getGameType}}</span>
		</div>
		<ul class="battleList">
			<p><span>获胜方</span></p>
			<li v-for='record in battleInfo.gamer_records' v-if="record.win==1">
				<div class='champion'>
					<img :src="`http://cdn.tgp.qq.com/pallas/images/champions_id/${ record.champion_id}.png`" />
					<p>LV{{record.level}}</p>
				</div>
				<div class='champion-r'>
					<p>{{record.name}}</p>
					<p>{{record.champions_killed}}/{{record.num_deaths}}/{{record.assists}}</p>
					<p>
						<img :src="record.item0|skillIcon">
						<img :src="record.item1|skillIcon">
						<img :src="record.item2|skillIcon">
						<img :src="record.item3|skillIcon">
						<img :src="record.item4|skillIcon">
						<img :src="record.item5|skillIcon">
						<img :src="record.item6|skillIcon">
					</p>
				</div>
			</li>
		</ul>
		<ul class="battleList">
			<p><span>失败方</span></p>
			<li v-for='record in battleInfo.gamer_records' v-if="record.win==2">
				<div class='champion'>
					<img :src="`http://cdn.tgp.qq.com/pallas/images/champions_id/${ record.champion_id}.png`" />
					<p>LV{{record.level}}</p>
				</div>
				<div class='champion-r'>
					<p>{{record.name}}</p>
					<p>{{record.champions_killed}}/{{record.num_deaths}}/{{record.assists}}</p>
					<p>
						<img :src="record.item0|skillIcon">
						<img :src="record.item1|skillIcon">
						<img :src="record.item2|skillIcon">
						<img :src="record.item3|skillIcon">
						<img :src="record.item4|skillIcon">
						<img :src="record.item5|skillIcon">
						<img :src="record.item6|skillIcon">
					</p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	import ajax from 'axios'
	import {getGameType ,transTime,skillIcon} from '../filters'
	import {mapActions} from 'vuex'
	export default{
		data(){
			return {
				battleInfo:'',
				startTime:''
			}
		},
		created(){
			this.setTitle('对战详情');
			this.setShow(false);
			this.setTrans(false);
		},
		filters:{
			getGameType,
			transTime,
			skillIcon
		},
		mounted(){
			let qquin = this.$route.params.qquin;
			let vaid = this.$route.params.vaid;
			let gameid = this.$route.params.gameId;
			ajax.get(`/api/GameDetail?qquin=${qquin}&vaid=${vaid}&gameid=${gameid}`).then(res=>{
				this.battleInfo = res.data.data[0].battle;
				this.startTime = this.battleInfo.start_time;
				console.log(this.battleInfo)
			},err=>{
				console.log(err)
			})
		},
		methods:{
			...mapActions(['setTitle','setTrans','setShow'])
		}
	}
</script>
<style lang='less'>
	.battleDetails{
		margin-top: .88rem;
		.battleInfo{
			height: .8rem;
			line-height: .8rem;
			font-size: .28rem;
			background: #f0f0f0;
			span{ 
				float:left;
				&:nth-child(1){
					text-indent: .16rem;
				};
				&:nth-child(2){
					text-indent: .52rem;
				};
				&:nth-child(3){
					text-indent: .48rem;
				};
			}
		}
		.battleList{
			margin-bottom: .98rem;
			>p{
				height: .93rem;
				border-bottom: .02rem solid #e1e1e1;
				span{
					width: 1.44rem;
					height: .55rem;
					margin-top: .18rem;
					margin-left: .18rem;
					display: block;
					font-size: .26rem;
					line-height: .55rem;
					text-align: center;
					color: #fff;
					background: #ff9900;
				}
			}
			li{
				font-size: .3rem;
				overflow: hidden;
				margin-top: .18rem;
				.champion {
					float:left;
					margin-left: .19rem;
					img {
						width: 1.25rem;
						height: 1.25rem;
						display: block;
					}
					p{
						width: 1.21rem;
						height: .49rem;
						line-height: .49rem;
						text-align: center;
						border: .02rem solid #23a723;
					}
				}
				.champion-r {
					width: 5.7rem;
					float:left;
					margin-left: .32rem;
					margin-top: .26rem;
					border-bottom: .02rem solid #e1e1e1;
					p:nth-child(2){
						text-align :right;
						margin-top: .15rem;
						margin-right: .36rem;
						color: #a5a5a5;
					}
					p:last-child{
						margin-bottom: .09rem;
					}
					img {
						width: .5rem;
						height: .5rem;
					}
				}
			}
		}
	}
</style>