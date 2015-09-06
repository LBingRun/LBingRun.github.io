/**从地址栏中取出参数name*/
$.getUrlParam = function(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return unescape(r[2]); return null;
}

/**从地址栏中取出所有参数并封装到一个对象中*/
$.getUlrParams = function(){
	var search = window.location.search;
	if(search === "") {
		return {};
	}
	else {
		var result = {};
		var params = search.split(/\?|&/);
		var len = params.length;
		for(var i = 0; i < len; i++) {
			if(params[i] !== "") {	
				var entity = params[i].split("=");
				result[entity[0]] = entity[1];
			}
		}
		return result;
	} 	
}

/**取出一个Cookie*/
$.getCookie = function(c_name) {
	if (document.cookie.length>0){　　//先查询cookie是否为空，为空就return ""
	　　　　　　c_start=document.cookie.indexOf(c_name + "=");　　//通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
	　　　　　　if (c_start!=-1){ 
	　　　　　　　　c_start=c_start + c_name.length+1;　　//最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
	　　　　　　　　c_end=document.cookie.indexOf(";",c_start);　　//为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
	　　　　　　　　if (c_end==-1) 
				c_end=document.cookie.length;　　
	　　　　　　　　//return unescape(document.cookie.substring(c_start,c_end))　　//通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节
	          return document.cookie.substring(c_start,c_end);
	　　　　　　} 
	}
	return "";
}