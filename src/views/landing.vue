 <template>
	<div class='landing'>
		<div>
			<img src='../assets/index.png'/>
		</div>
		<router-link to='./index/news'>进入</router-link>
	</div>
</template>
<style lang='less'>
	.landing {
		img {
			width:100%;
			display: block;
		}
	}
	.landing{
		a{
			display: block;
			width: 2.19rem;
			height: .66rem;
			line-height: .66rem;
			border-radius: .1rem;
			background: #40a6fb;
			text-align: center;
			margin: 0 auto;
			margin-top: -1.99rem;
			position: relative;
			z-index:1;
			font-size: .35rem;
			color: #fff;
			text-decoration: none;
		}
	}
</style>