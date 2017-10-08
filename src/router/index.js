import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/views/landing'
import Index from '@/views/index'
import News from '@/views/News'
import Player from '@/views/Players'
import Hero from '@/views/Hero'
import Video from '@/views/Video'
import playerDetails from '@/views/playerDetails'
import heroesDetails from '@/views/heroesDetails'
import skills from '@/components/skills'
import skins from '@/components/skins'
import battleDetails from '@/views/battleDetails'
Vue.use(Router)
//暴露出路由
export default new Router({
  // mode:'history',
  // scrollBehavior:()=>({y:0}),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children:[
      	{path:'news',component:News},
      	{path:'player',component:Player},
      	{path:'hero',component:Hero},
      	{path:'video',component:Video},
      	{
	      path: 'playerDetails/:qquin/:area_id/:icon_id',
	      name: 'playerdetails',
	      component: playerDetails
	     },
  	    {
  	      path: 'heroesDetails/:heroId',
  	      name: 'heroesDetails',
  	      component: heroesDetails,
  	      children:[
  	      	{path:'skills',components:skills},
  	      	{path:'skins',components:skins}
  	      ]
  	    },
        {
            path:"battleDetails/:qquin/:vaid/:gameId",
            name:"battleDetails",
            component: battleDetails
        }
      ]
    },
    
  ]
})
