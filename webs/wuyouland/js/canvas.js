	// var canvas = document.querySelector('canvas'),
	var canvas = document.getElementsByTagName('canvas')[0],
	    context = canvas.getContext('2d'),
	    w = canvas.width = window.innerWidth,
	    h = canvas.height = window.innerHeight;
    var loading = 0;   		//计算用
    var speed_v1 = 40 		// 直线速度
    var speed_v2 = 10 		// 上下展开速度

    var speed_time =5 *1000 //第一个显示时间
    var speed_status1 = 50; //这个是当前加载进度
    var reload_over = true; //判断是否加载完成
    var start_time = new Date();
    var strings1= '欢迎使用九宫格小助手';
    var strings2=[
    				'使用规则如下：',
    				'    1.请在页面中出现的1-9个格子中输入0-8 （0代表空白格）',
    				'    2.因服务器无法承担高计算能力，故单一时间计算有限制，还请谅解',
    				'    3.如果需要更为高效快捷不受限制的搜索，请联系我或直接在github上查看已开源代码',
    				'       感谢您的理解，请点击继续按键进入程序页面'
    ];
    var stop;
    var canvasclose = true;
     //初始化
    var clearColor = 'rgba(0, 0, 0, 0.2)'       
   	function draw(){
		context.save();
		context.lineWidth=10;
		context.moveTo(0,canvas.height/2)
		context.strokeStyle = "#fe9901";  
		
	   // if (loading<=canvas.width/10+10)
	    if (new Date()-start_time>speed_time &&reload_over ){
	    	//强制加载成功
	    	reload_over = false;
	    	speed_status1=100;
	    }
    	speed_status = speed_status1*(canvas.width/10+10)/100;

	   if (loading<=speed_status) 
	   	{	// 画出开始页面
			context.lineTo(loading*10,canvas.height/2)
	   		loading+=speed_v1;//后期这边改成js的值进行自动调整 加载完毕了执行下面
		}else if(speed_status1>=100){
			window.cancelAnimationFrame(stop);// 横线处理完毕
			loading = 0;
			console.log("draw over one");
	
			drawFrame2();
		}
		context.stroke()
       	context.restore();
  	}
  	function draw2(){
  		context.save();
  		context.lineWidth=speed_v2;
		context.strokeStyle = "#fe9901";  

  		if (loading<=canvas.height/2+10) 
	   	{// 拉开
			context.moveTo(0,canvas.height/2 - loading);
			context.lineTo(canvas.width,canvas.height/2 - loading);
			context.moveTo(0,canvas.height/2 + loading)
			context.lineTo(canvas.width,canvas.height/2 + loading);
			context.stroke()

	   		loading+=speed_v2;
		}else{
			window.cancelAnimationFrame(stop);// 横线处理完毕
			loading = 0;
			console.log("draw over two");
			context.fillStyle = "white";
			context.font = 20 + "px arial";
			context.fillText("skip",canvas.width-(20*4), 20);
			console.log(canvas.width-(20*4), 20);
   			context.restore();

			drawTittle()
		}
       	context.restore();

  	}
  	this.drawTittlestrings = '';
  	this.drawTittlestrings2 = '';
  	this.drawTittlestrid =0; //用来输出strings到了第几行
    function drawTittle(){
    	context.save();
		stop = window.requestAnimationFrame(drawTittle, canvas);
		//每次都清空下画布
		if (loading%4 == 0 && this.drawTittlestrings.length < strings1.length){
			context.fillStyle="#fe9901";  
			context.beginPath();  
			context.fillRect(0,canvas.height/10,canvas.width,canvas.height);  
			context.closePath();  
			context.fillStyle = "white";
			this.size = canvas.height/20;
			context.font = this.size + "px arial";
			this.drawTittlestrings += strings1[this.drawTittlestrings.length];
			context.fillText(this.drawTittlestrings,canvas.width/2-(this.size+3)*(strings1.length)/2, canvas.height/6);
   			context.restore();
		}
			loading+=1;
			if (this.drawTittlestrings.length >= strings1.length){// 第一行文本完成
			if (loading%4 == 0&& this.drawTittlestrid<strings2.length){
				context.fillStyle="#fe9901";  
				context.beginPath();  
				context.fillRect(0,canvas.height/6+this.size*(this.drawTittlestrid )+this.size/2,canvas.width,canvas.height);  
				context.closePath();  
				context.fillStyle = "white";
				this.size = canvas.height/20;
				context.font = this.size/2 + "px arial";
				this.drawTittlestrings2 += strings2[this.drawTittlestrid][this.drawTittlestrings2.length];
				// console.log(this.drawTittlestrings2 )
				context.fillText(this.drawTittlestrings2 ,canvas.width/10, canvas.height/6+this.size*(this.drawTittlestrid +1));
				if (this.drawTittlestrings2.length >=strings2[this.drawTittlestrid].length){
					//说明这行输入完毕
					this.drawTittlestrings2 ='';
					this.drawTittlestrid+=1;
				}
	   			context.restore();
			}else{
				if(this.drawTittlestrid>=strings2.length)
					window.cancelAnimationFrame(stop);// 横线处理完毕
				}
			}
    }
    function closecanvas(){
    	context.save();

			if( this.lasttime ==null ){
	   			this.lasttime = (new Date()).getTime();
			}
			console.log(this.lasttime ,new Date() ,this.lasttime+100 )
			if (document.getElementsByTagName('canvas')[0].style.opacity>=0){
				window.requestAnimationFrame(closecanvas, canvas);

			}else{
				document.getElementsByClassName('canvas_one')[0].style.zIndex=-999;
				canvasclose = false;
			}
			if(  this.lasttime+100 > (new Date()).getTime()){
				// window.requestAnimationFrame(closecanvas, canvas);
				if(document.getElementsByTagName('canvas')[0].style.opacity==''){
					document.getElementsByTagName('canvas')[0].style.opacity = 1;
					document.getElementsByClassName("canvas_one")[0].style.opacity = 1;
				}else{
					document.getElementsByTagName('canvas')[0].style.opacity = document.getElementsByTagName('canvas')[0].style.opacity-0.01;
					document.getElementsByClassName("canvas_one")[0].style.opacity= document.getElementsByTagName('canvas')[0].style.opacity-0.01;
				}
	   			this.lasttime = (new Date()).getTime();
	   			console.log(document.getElementsByTagName('canvas')[0].style.opacity)
			}
    }

    function drawFrame2(){
    	stop = window.requestAnimationFrame(drawFrame2, canvas);
    	draw2();
    }
    //点击事件
    canvas.addEventListener('click', function(e){
    	var location = getLocation(e.clientX, e.clientY);
    	if(!canvasclose){
    		return 0;
    	}
    	if(location.x>=canvas.width-20*4  && location.y>=0 && location.y<=20 &&location.x<=canvas.width-20 )
		{
			window.cancelAnimationFrame(stop);// 结束当前运行，直接进入最后一步
			loading=0;
			closecanvas();
		}
    })



	//鼠标移动
	var skip=false ;
	canvas.onmousemove = function (e) {
		if(!canvasclose){
    		return 0;
    	}
		var location = getLocation(e.clientX, e.clientY);
		if(location.x>=canvas.width-20*4  && location.y>=0 && location.y<=20 &&location.x<=canvas.width-20)
		{
			//鼠标移动到右上角的skip ，显示动画
			skip =true;
			canvas.style.cursor= 'pointer';	
			context.fillStyle = "blue";
			context.font = 20 + "px arial";
			context.fillText("skip",canvas.width-(20*4), 20);
			console.log(canvas.width-(20*4), 20);
   			context.restore();

		}else{
			canvas.style.cursor= '';
			if(skip){
				context.fillStyle="#fe9901";  
				context.beginPath();  
				context.fillRect(canvas.width-20*4,0,canvas.width-20,30);  
				context.closePath();  
				context.fillStyle = "white";
				context.font = 20 + "px arial";
				context.fillText("skip",canvas.width-(20*4), 20);
				console.log(canvas.width-(20*4), 20);
	   			context.restore();
	   			skip=false;
			}

		}
	};
	function getLocation(x, y) {
		var bbox = canvas.getBoundingClientRect();
		return {
			x: (x - bbox.left) * (canvas.width / bbox.width),
			y: (y - bbox.top) * (canvas.height / bbox.height)
			
			/*
			 * 此处不用下面两行是为了防止使用CSS和JS改变了canvas的高宽之后是表面积拉大而实际
			 * 显示像素不变而造成的坐标获取不准的情况
			x: (x - bbox.left),
			y: (y - bbox.top)
			*/
		};
	}


    //动画循环
  (function drawFrame(){
        stop = window.requestAnimationFrame(drawFrame, canvas);
        context.fillStyle = clearColor;
        context.fillRect(0, 0, w, h);  //注意这
        draw();
   }())
			// document.getElementsByClassName('canvas_one')[0].style.zIndex=-1;//将canvas初始画图设置为-1
