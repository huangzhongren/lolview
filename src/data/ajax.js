export default {
	ajax:function(url){
		return new Promise((resolve, reject) => {
	        var xhr = new XMLHttpRequest();
	        xhr.open('GET', url);
	        xhr.onreadystatechange = handle;
	        xhr.responseType = 'json';
	        xhr.setRequestHeader('Accept', 'application/json');
	        xhr.send();

	        function handle() {
	            if (this.readyState !== 4) {
	                return;
	            } else if (this.status === 200) {
	                resolve(this.response);
	            } else {
	                reject(new Error(this.statusText));
	            }
	        }
	    })
	},
	// ajax('src/assets/resource.json').then(function(json) {
	// 	console.log("成功了",json);
	// }, function(error) {
	// 	console.log("出错了",error);
	// })

	transForm:function(num){
		if(num>10000){
			return parseInt(num/10000)
		}else{
			return num
		}
	}
}