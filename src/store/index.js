import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
	//状态集合
	state:{
		title:'默认标题',
		player:{},
		isCur:0,//判断处于哪类页面[资讯,搜索,英雄,视频]
		heroes:[],
		players:[],
		isShow:true,
		isLoading: true,
		isTrans: false
	},
	mutations:{
		SET_TITLE:(state,title)=>{
			state.title = title;
		},
		SET_CUR:(state,isCur)=>{
			state.isCur = isCur;
		},
		SET_HERO:(state,heroes)=>{
			state.heroes = heroes;
		},
		SET_PLAYER:(state,players)=>{
			state.players = players;
		},
		SET_SHOW:(state,isShow)=>{
			state.isShow = isShow;
		},
		SET_LOAD:(state,isLoading)=>{
			state.isLoading = isLoading;
		},
		SET_TRANS:(state,isTrans)=>{
			state.isTrans = isTrans;
		}
		
	}, 
	//方法集合
	actions:{
		setTitle:({commit},title)=>{
			commit('SET_TITLE',title)
		},
		setCur:({commit},isCur)=>{
			commit('SET_CUR',isCur)
		},
		setHero:({commit},heroes)=>{
			commit('SET_HERO',heroes)
		},
		setPlayer:({commit},players)=>{
			commit('SET_PLAYER',players)
		},
		setShow:({commit},isShow)=>{
			commit('SET_SHOW',isShow)
		},
		setLoad:({commit},isLoading)=>{
			commit('SET_LOAD',isLoading)
		},
		setTrans:({commit},isTrans)=>{
			commit('SET_TRANS',isTrans)
		}
	},
	//获取状态
	getters:{
		msg:state=>state.title,
		isCur:state=>state.isCur,
		heroes:state=>state.heroes,
		players:state=>state.players,
		isShow:state=>state.isShow,
		isLoading:state=>state.isLoading,
		isTrans:state=>state.isTrans
	}
})