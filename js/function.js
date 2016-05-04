/*通过类名方式获取元素*/
  //getClass(classname,obj)
   //参数1 classname 类名
   //参数2 obj  范围
function getClass(classname,obj){
	obj=obj||document;
	//设置默认范围
	if (document.getElementsByClassName!=undefined){
		//支持  判断能不能从document里获得类名  boolean 值为true
		return obj.getElementsByClassName(classname);
		//返回
	}else{
		//不支持
		var arr=[];
		//新建一个数组
		var alls=obj.getElementsByTagName('*');
		//获取当前范围里的所有的标签
		for (var i = 0; i < alls.length; i++) {
			//遍历上一步所获取的标签 
			if (check(alls[i].className,classname)) {
				//如果遍历出来的类名和我们所需要的类名相等的话把这个值添加到我们新建的数组
				arr.push(alls[i]);
			};
		};
		return arr;
		//返回这个数组
	}
}
//当一个标签有多个类名时  解决ie6-8兼容性问题
	function check(oldclass,newclass){


		var arr=newclass.split(" ")
		for (var i = 0; i < arr.length; i++) {
			if (arr[i]==oldclass) {
				return true;
			}else{
				return false;
			}
		};
	}



//获取内容  设置内容
function getText(obj,val){
	if (val==undefined) {
		//如果val 未定义的话 为获取 执行下面代码
		if (obj.innerText) {
			//判断是否支持innerText
			return obj.innerText;
			//支持返回 
		}else{
			//不支持返回 textContent
			return obj.textContent;
		}
	}else{
		//否则执行下边的代码 为设置
		if (obj.innerContent) {
			//支持 innerText  将val值赋给要改变的内容
			return obj.innerText=val;
		}else{
			//同上
			return obj.textContent=val;
		}
	}
	
}


//获取样式的兼容性问题
function getStyle(obj,attr){
	//如果  条件为真 条件 转换boolean类型 除了 null "" undefined false 0 NaN 为假 其他都为真
	if (obj.currentStyle) {
		//ie支持  返回下边的结果  attr是一个局部变量 需要中括号将变量变为字符串
		return obj.currentStyle[attr];
	}else{
		//谷歌火狐 支持 返回下边的代码
		return getComputedStyle(obj,null)[attr];
	}
}



//简化获取函数
function $(selector,content){
	if (typeof selector=="string") {
		var content=content||document;
		if (selector.charAt(0)=="#") {
			return document.getElementById(selector.substring(1));
		}else if (selector.charAt(0)==".") {
			return getClass(selector.substring(1),content)
		}else if (/^[a-zA-Z][a-zA-Z1-6]*$/.test(selector)){
			return content.getElementsByTagName(selector)
		}else if(/^<[a-zA-Z][A-Za-z1-6]{0,10}>$/.test(selector)){
			return document.createElement(selector.slice(1,-1))
		}
	};
	if (typeof selector=="function") {
		 window.onload=function(){
			selector();
		}
	};
}








//简化获取函数
function $(selector,content){
	if (typeof selector=="string") {
		var content=content||document;
		if (selector.charAt(0)=="#") {
			return document.getElementById(selector.substring(1));
		}else if (selector.charAt(0)==".") {
			return getClass(selector.substring(1),content)
		}else if (/^[a-zA-Z][a-zA-Z1-6]*$/.test(selector)){
			return content.getElementsByTagName(selector)
		};
	};
	if (typeof selector=="function") {
		on(window,"load",selector)
		//  window.onload=function(){
		// 	selector();
		// }
	};
}
/*去除字符串的空格*/
function trim(str,type){
	type=type||'lr';
	if (type=='a') {
		return str.replace(/\s*/g,"")
	}
	if (type=='lr') {
		return str.replace(/^\s*|\s*$/g,"")
	};
	if (type=='l') {
		return str.replace(/^\s*/g,"")
	};
	if (type=='r') {
		return str.replace(/\s*$/g,"") 
	};

}



// //节点  a 需要文档  b bu需要文档
function getChilds(parent,type){
	type=type||'b';
	var childs=parent.childNodes;
	var newarr=[];
	if (type=='a') {
			for (var i = 0; i < childs.length; i++) {
			if (childs[i].nodeType==1||(childs[i].nodeType==3&&trim(childs[i].nodeValue)!="")) {
            newarr.push(childs[i])
		};
		};
	}else if (type=='b') {
			for (var i = 0; i < childs.length; i++) {
			if (childs[i].nodeType==1) {
            newarr.push(childs[i])
		};
		};
	};
	
	return newarr;
} 
//获取第一个子节点
function getFirst(parent,type){
	return getChilds(parent,type)[0];
}
//获取最后一个子节点
function getLast(parent,type){
	var alls=getChilds(parent,type);
	return getChilds(parent,type)[alls.length-1];
}
//获取任意一个子节点
function getNum(parent,type,index){
	return getChilds(parent,type)[index];

}
//获取下一个兄弟节点
function getNext(obj){
	var next=obj.nextSibling;
	//定义一个next 将对象的下一个兄弟节点赋值给它
	if (next==null) {
		return false;
	};
	while(next.nodeType==8||(next.nodeType==3&&trim(next.nodeValue)=="")){
		//当条件
		next=next.nextSibling;
		//继续寻找下一个兄弟节点
		if (next==null) {
			return false;
		};	
	}
	return next;
}
//获取上一个兄弟节点
function getPre(obj){
	var pre=obj.previousSibling;
	//定义pre 将对象的上一个兄弟元素赋值给他
	if (pre==null) {
		return false;
	};
	while(pre.nodeType==8||(pre.nodeType==3&&trim(pre.nodeValue)=="")){

		pre=pre.previousSibling;
		//继续寻找上一个兄弟节点
		if (pre==null) {
			return false;
		};	
	}
	
	return pre;
}

//给同一事件源添加或删除事件
function on(obj,event,how){//事件源，事件，处理程序
	if(obj.addEventListener){
		 obj.addEventListener(event,how,false);
	}else{
		obj.attachEvent("on"+event,how);
	}
}
function del(obj,event,how){//事件源，事件，处理程序
	if(obj.removeEventListener){
		 obj.removeEventListener(event,how,false);
	}else{
		obj.detachEvent("on"+event,how);
	}
}

function mousewheel(obj,mouseUp,mouseDown){//滚轮事件
	if(obj.attachEvent){  //事件绑定  ie
	obj.attachEvent("onmousewheel",scrollFn);
	}else if(obj.addEventListener){
		obj.addEventListener("mousewheel",scrollFn,false);  //  chorme
		obj.addEventListener("DOMMouseScroll",scrollFn,false); //  FF
	}

	function scrollFn(e){
		var ev=e||window.event;
		var en=ev.wheelDelta||ev.detail;//第一个是 ie 和chorme  第二个是FF
		if(en==120||en==-3||en==-1){
			// console.log(ev.detail);
			mouseUp&&mouseUp.call(obj);
			// console.log("向上")
		}
		if(en==-120||en==3||en==1){
			mouseDown&&mouseDown.call(obj);
			// console.log("向下")
		}
		if(ev.preventDefault){
			ev.preventDefault()
		}else{
			ev.returnValue=false;
		}
	}

}




//判断某个元素是否包含有另外一个元素
function contains (parent,child) {//返回 true  parent 包含 child    返回false 不是包含关系
	if(parent.contains){//如果对象支持contains
		// 如果  父对象 包含 子对象   并且  父对象不等于 子对象 返回 true 
		return parent.contains(child) && parent!=child;
	}else{
		//父对象 包含 子对象  16   父对象 在子对象之前 4  = 20
		return (parent.compareDocumentPosition(child)===20);
	}
}
//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
function checkHover (e,target) {
	//target 对象 
	if(getEvent(e).type=="mouseover"){
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
	}else{
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
	}
}

/*
  hover(obj,overfun,outfun)  鼠标移入移除事件 
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
	if(overfun){
	    obj.onmouseover=function  (e) {
			if(checkHover(e,obj)){
				overfun.call(obj);
			}
	    }
	}
	if(outfun){
		obj.onmouseout=function  (e) {
			if(checkHover(e,obj)){
				outfun.call(obj);
			}
	    }
	}
}

//获得事件对象
function getEvent (e) {
	return e||window.event;
}

