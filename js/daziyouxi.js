	
	var go=$(".go")[0];
	var returnnew=$(".returnnew")[0];
	var zanting=$(".zanting")[0];
	var falg=true;
	returnnew.onclick=function(){//   重新开始
		history.go(0)
	}
	var agin=$(".gameover")[0];
	agin.onclick=function(){
		history.go(0)
		animate(agin,{top:-400},500);
	}
	// returnnew.onclick=function(){}
function game(box){
	this.box=box;
	this.letter=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	this.letterArr=[];
	this.speed=4;//速度
	this.num=4;//同时掉下的个数
	this.level=1; //关卡
	this.scroe=0;//分数
	this.life=10;//生命
	this.cw=document.documentElement.clientWidth;
	this.ch=document.documentElement.clientHeight;
	//this.getLetter(4);
	this.Play();
	this.key();

	
}
game.prototype={
	getLetter:function(num){//获取并制造出来掉下来的东西；
		for(var i=0;i<num;i++){
			var div=document.createElement("div");//创建一个DIV
			// div.className="zibj"
			div.style.cssText="width:70px;background:url(./images/24.png) no-repeat -2px 0;height:70px;position:absolute;font-size:36px;line-height:70px;text-align:center;left:"+(Math.random()*(this.cw-400)+200)+"px;top:"+(Math.random()*(-50)-50)+"px";//给div添加样式
			div.innerHTML=this.letter[Math.floor(Math.random()*this.letter.length)];//cong letter中获取字符，并添加到div中
			this.letterArr.push(div);//添加到新数组中
			this.box.appendChild(div);
		}	
	},
	Play:function(){
		var that=this
		go.onclick=function(){
			if(falg){
				t=setInterval(move,50)
				falg=false;
			}
			
		}
		function move(){
			var life=10;
			var xuetiao=$(".xuetiao")[0];
			var lifes=$(".life")[0];
			var agin=$(".gameover")[0];
			if(that.letterArr.length<that.num){  //少几个添加几个
				that.getLetter(that.num-that.letterArr.length)
			}
			for(var i=0;i<that.letterArr.length;i++){
				that.letterArr[i].style.top=that.letterArr[i].offsetTop+that.speed+'px';
				if(that.letterArr[i].offsetTop>that.ch-70){//超出屏幕后清除
				that.life-=1;              //超出后生命值-1；
				lifes=that.life;
				animate(xuetiao,{marginLeft:-16*(10-lifes)})
				if(that.life==0){
					clearInterval(t);
					animate(agin,{top:0},500);
				}
				that.box.removeChild(that.letterArr[i]);
				that.letterArr.splice(i,1);
				}
			}				
		}
		zanting.onclick=function(){
			if(!falg){

				clearInterval(t)
				falg=true;
			}			
		}
	},
	key:function(){//键盘事件
		that=this;
		document.onkeydown=function(e){
			if(falg){
				return;
			}
			var ev=e||window.event;
			var scroes=$(".scroes")[0];
			// var scroe=0;
			var lett=String.fromCharCode(ev.keyCode);//将阿四课吗值转换为字符
			for(var i=0;i<that.letterArr.length;i++){
				//console.log(that.letterArr[i])
				if(that.letterArr[i].innerHTML==lett){    //这里错过，一定要加innerHTML
					that.scroe+=1;       //消除后分数加1；
					scroes.innerHTML=that.scroe;
					// scroes.style.cssText="font-size:20px;font-family:幼圆;font-weight:600;"
	// console.log(this.scroe)
	// if(this.scroe>=10){
	// 	this.speed+=10;
	// 	this.level+=1;
	// }
					that.box.removeChild(that.letterArr[i]);
					that.letterArr.splice(i,1);
					break;
				}
			}
		}
	}
}