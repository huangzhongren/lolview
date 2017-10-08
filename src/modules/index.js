const refresh = {
	position:{},//存储触摸点位置
	element:null,//下拉显示对象
	me:null,//操作元素
	init: function(opts,callback){//callback为当前页面需要执行的函数
		if(opts.type=='downRefresh'){
			this.me = opts.ele;//下拉对象
		}else if(opts.type=='upRefresh'){
			this.me = opts.ele//下滑对象
		}
		this.todo = callback;//下拉后huo下滑到底部需要执行的函数
		this.element = this.me.getElementsByClassName("isLoading")[0];//下拉后显示的对象
	},
	getStartPistion: function(event){//得到起始位置
		this.position.startPosition = event.touches[0].pageY;
		this.element.style.transition = "none";
		this.element.getElementsByClassName('tips')[0].innerText = '松开刷新'
		console.log(this.position.startPosition)
	},
	getMovePosition: function(e){//得到移动位置
		this.position.movePosition = e.touches[0].pageY;
		//得到当前触摸点距第一次触摸的距离
		let distance = parseInt(this.position.movePosition - this.position.startPosition);
		if(distance>0&&this.me.getElementsByClassName('playerRecord')[0].scrollTop==0){
			e.preventDefault();
		}
		if(this.element&&distance>0&&this.me.scrollTop==0&&this.me.getElementsByClassName('playerRecord')[0].scrollTop==0){
			this.element.style.height = distance/3+"px";//让元素拥有自己的高度
		}
	},
	getEndPosition: function(e){
		this.position.endPosition = e.changedTouches[0].pageY;
		if(this.element&&this.position.endPosition>this.position.startPosition&&this.me.scrollTop==0&&this.me.getElementsByClassName('playerRecord')[0].scrollTop==0){//添加一些显示效果
			this.element.getElementsByClassName('tips')[0].innerText = '正在刷新'
			this.element.style.transition = 'height .2s'
			this.element.style.height = '.88rem';
			//执行过渡动画后在更新数据
			if(this.todo != undefined&&typeof this.todo=='function'){
				this.todo()
			}
		}
	},
	handler:function(){
		//获取scrollTop值
		var scrollTop = parseInt(this.me.scrollTop);
		if(scrollTop==0){
			document.body.style.overflow = "visible"
		}
		//获取包含对象的高度
		var scrollHeight = this.me.scrollHeight;
		//获取可视区域高度 
		var offsetHeight = this.me.offsetHeight;
		if(scrollTop+15 >= scrollHeight - offsetHeight){
			//这里执行加载更多时需要的函数
			if(this.todo != undefined&&typeof this.todo=='function'){
				this.todo()
			}
		}
	},
	downRefresh: function(){//下拉刷新
		this.me.addEventListener('touchstart',this.getStartPistion.bind(this));
		this.me.addEventListener('touchmove',this.getMovePosition.bind(this));
		this.me.addEventListener('touchend',this.getEndPosition.bind(this));
	}, 
	upRefresh: function(){//下滑到底部加载更多
		this.me.addEventListener('scroll',this.handler.bind(this))
	},
	unbind: function(type){//解绑方法
		if(type=='downRefresh'){
			this.me.removeEventListener('touchstart',this.getStartPistion.bind(this));
			this.me.removeEventListener('touchmove',this.getMovePosition.bind(this));
			this.me.removeEventListener('touchend',this.getEndPosition.bind(this));
		}else if(type=='upRefresh'){
			this.me.removeEventListener('scroll',this.handler.bind(this))
		}
	}
}
export const Drh = function(){
	this.init.apply(this,arguments)
}
Drh.prototype = refresh;



