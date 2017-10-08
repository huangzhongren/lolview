// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import VueLazyload from 'vue-lazyload'
//设置axios的全局配置
axios.defaults.headers.common = {
	'DAIWAN-API-TOKEN':'32133-23493-43483-4A83A'
}
Vue.config.productionTip = false

Vue.use(VueLazyload,{
    preLoad: 1.3,
    error:'dist/error.png',
    //loading:'dist/loading.gif',
    attempt:1,
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
})
Vue.prototype.ajax = axios




window.onload=function(){  
    var width = window.screen.width;
		document.documentElement.style.fontSize = (width/750)*100+'px'
		console.log(document.documentElement.style.fontSize)
}  
//当浏览器窗口大小改变时，设置显示内容的高度  
window.onresize=function(){  
    var width = window.screen.width;
		document.documentElement.style.fontSize = (width/750)*100+'px'
}  
window.onScroll = function(e){
    e.preventDefault();
}