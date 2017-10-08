<template>
	<div>
		<headerBar></headerBar>
		<router-view></router-view>
		<!-- </keep-alive> -->
		<FooterView></FooterView>
	</div>
</template>
<script>
	import FooterView from '../components/footer'
	import headerBar from '../components/headerBar'
	import {mapActions} from 'vuex'
	export default{
		data(){
		    return {
		       dataList:"",
		       position:{}
		    }
	 	},
	 	components:{
			FooterView,
			headerBar
		},
		methods:{
			...mapActions(['setTitle','setCur'])
		},
		


	}
</script>
