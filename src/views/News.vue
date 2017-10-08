<template>
	<div class='carousel'>
		<swiper :options="swiperOption">
			<swiper-slide v-for="item in bannerNews" :key="item.article_id">
				<a :href="item.article_url" >
					<img width="100%" height="20%" :src="item.image_url_big" >
				</a>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
		<newsList></newsList>
	</div>	
</template>
<script>
	import {swiper,swiperSlide} from 'vue-awesome-swiper'
	import {bannerNews} from '../data/banner'
	import newsList from '../components/newsBar'
	import {mapActions,mapGetters} from 'vuex'
	import {Drh} from '../modules'
	export default{
		created(){
			this.refresh()
		},
		data(){
			return {
				swiperOption:{
					autoplay: 3000,
					pagination: '.swiper-pagination',
					paginationClickable: true,

				},
				bannerNews,
				msg:"资讯"
			}
		},
		components:{
			swiper,
			swiperSlide,
			newsList
		},
		methods:{
			...mapActions(['setTitle','setCur','setTrans']),
			refresh(){
				this.setTitle("资讯");
				this.setCur(0);
				this.setTrans(false)
			}
		},
		computed:{
			...mapGetters(['isLoading'])
		},
		updated(){
			let load = document.getElementsByClassName('isLoading')[0];
			load.style.height = 0;
			load.getElementsByClassName('tips')[0].innerText = ''
		}

	}
</script>
<style lang='less'>
	.carousel {
		margin-top: .88rem;
		.swiper-pagination-bullet{
			background:#d9d9d9;
			opacity: 1;
		}
		.swiper-pagination-bullet-active{
			background:#40a6fb;
		}
		
	}
</style>