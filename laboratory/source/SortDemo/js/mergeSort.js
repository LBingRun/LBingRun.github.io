$(function(){


	var list = [352, 296, 214, 261, 331, 397, 175, 339, 310, 336]; 
	//保留演示数组
	var listOld = [];
	//存储执行过程
	var process = [];
	//默认的定时器速度
	var speed = 1000;
	//定时器
	var intervalId;
	//是否显示数字
	var isShowTitle = true;
	//随机数个数
	var randomCount = 10;
	//演示步奏计数
	var showDemoCount = 0;
	//每一个柱状图的宽度
	var chartWidth = 0;

	var chartPart = $("#chartPart");
	var processTitle = $("#processTitle");

	copyArray(list,listOld);
	buidChart(list);
	mergeSortMain(list);

    eventDel();

	/*事件处理集合*/
	function eventDel(){
		$("#getRandonList").on("click",function(){
			redmoBuildChart(randomCount);
			copyArray(list,listOld);
			buidChart(listOld);
			mergeSortMain(list);
			showTheArr();
		});

		$("#getInputList").on("click",function(){
			var inputSort = $("#inputSort").val();
			if (inputSort) {
				inputSort = inputSort.replace(/\s/g,"");
				cleanList();
				list = inputSort.split(",");
				randomCount = list.length;
			};
			copyArray(list,listOld);
			buidChart(listOld);
			mergeSortMain(list);
			showTheArr();
		});

		$("#startDeom").on("click",function(){
			//mergeSortMain(list);
			showDemo();
		});

		$("#nextStartDeom").on("click",function(){
			//mergeSortMain(list);
			window.clearInterval(intervalId);
			showDemoProcess();
		});

		$("#speedBtn li").click(function(){
			speed = $(this).find("a").attr("speed");
		});

		$("#randCountBar li").click(function(){
			randomCount = $(this).find("a").attr("randCount");
		});

		window.onresize = function(){
			window.clearInterval(intervalId);
    		cleanBackground();

	    	buidChart(list);
		}
	}

	/*复制数组*/
	function copyArray(source,point){
		for (var i = 0; i < source.length; i++) {
			point[i] = source[i];
		};
	}

	/*显示原始数组*/
	function showTheArr(){
		var listArea = $("#listArea");
		var _listBar1 = "结果数组[";
		var _listBar2 = "原始数组[";
		for (var i = 0; i < list.length; i++) {
			if (i!=list.length-1) {
				_listBar1 += list[i]+",";
				_listBar2 += listOld[i]+",";
			}else{
				_listBar1 += list[i];
				_listBar2 += listOld[i];
			}
		};
		_listBar1 +="]";
		_listBar2 +="]";

		listArea.empty();
		listArea.append(_listBar2+"<br>"+_listBar1);
	}

	/*根据数组重新绘制表格*/
	function buidChart(list){
		var _html = "";
		var _offsetWidth = document.body.offsetWidth;
		chartWidth = _offsetWidth/list.length;
		isShowTitle = list.length<=50;
			
		for (var i = 0; i < list.length; i++) {
			if(isShowTitle){
				_html += "<div class='numCom' title='"+list[i]+"' valueNum="+list[i]+" id='rowNumID"+i+"' style='left:"+i*chartWidth+"px;;height:"+list[i]+"px;'>"+list[i]+"</div>";
			}else{
				_html += "<div class='numCom' title='"+list[i]+"' valueNum="+list[i]+" id='rowNumID"+i+"' style='left:"+i*chartWidth+"px;;height:"+list[i]+"px;'/>";
			}
		};
		
		chartPart.empty();
		chartPart.append(_html);

		if(list.length>500){
			$(".numCom").css("border","0px")
		} else {
			$(".numCom").css("border","0px 1px 0px 1px solid");
		}

		$(".numCom").css("width",chartWidth);
	}

	/*产生随机数*/
	function redmoBuildChart(num){
		window.clearInterval(intervalId);
    	cleanBackground();
		cleanList();
		if (!num) {
			num = 50;
		}
		var xx ;
		list = [];
		for (var i = 0; i < num; i++) {
			xx = 0;
			while(xx>400||xx<100){
				xx = Math.round(Math.random()*1000);
			}
			list.push(xx);
		};
	}

    /*执行演示过程*/
    function showDemo(){

    	buidChart(listOld);
    	showDemoCount = 0;

    	window.clearInterval(intervalId);
    	cleanBackground();

    	intervalId = window.setInterval(showDemoProcess,speed);
    }

    function showDemoProcess(){
    	if (showDemoCount>=process.length){
    		processTitle.empty();
    		processTitle.append("演示完毕");
    		return;
    	}

    	/////// 提示
		getProcessTitleMain(showDemoCount);

    	var processOne = process[showDemoCount++];
		cleanBackground();

		var $numComBar = $(".numCom");
		var $destBar = $numComBar.eq(processOne.dest);

		var startEle = $numComBar.eq(processOne.position1);
		var endEle = $numComBar.eq(processOne.position2);

		endEle.css("background","#f0ad4e");
		startEle.css("background","#f0ad4e");

		//a记录最后移动的位置
		var a = 0 , needMoveVal = 0 ,needMovePosition = 0;
		if(processOne.result){
			a = processOne.position1;
			needMoveVal = processOne.val1;
			needMovePosition = processOne.position1;
		} else {
			a = processOne.position2;
			needMoveVal = processOne.val2;
			needMovePosition = processOne.position2;
		}
		var needMoveDest = processOne.dest;//移动的终点

		//从processOne.dest到a的元素都要向后移动一格;
		for (var i = a; i > needMoveDest; i--) {
			var $needNextBar = $numComBar.eq(i);
			var needNextVal = $numComBar.eq(i-1).attr("valueNum");

			$needNextBar.css("height",needNextVal)
			//上一个元素的值
			$needNextBar.attr("valueNum",needNextVal);
			//是否需要显示柱状图上的文字
			if(isShowTitle){
				$needNextBar.empty();
				$needNextBar.append(needNextVal);
				$needNextBar.attr("title",needNextVal);
			}
		};

		
		$destBar.animate({height:needMoveVal},{speed:speed,queue:false});
		$destBar.attr("valueNum",needMoveVal);
		$destBar.attr("title",needMoveVal);
		if(isShowTitle){
			$destBar.empty();
			$destBar.append(needMoveVal);
		}

		//如果结束了就关闭定时器
		if (showDemoCount>=process.length) {
			window.clearInterval(intervalId);
			cleanBackground();
		};
    }

    /*步奏提示提取*/
    function getProcessTitleMain(j){
    	processTitle.empty();
    	processTitle.append("当&nbsp;&nbsp;&nbsp;&nbsp;前:"+getProcessTitle(j)+"<br>下一步:"+getProcessTitle(j+1));
    }

    /*步奏提示提取*/
    function getProcessTitle(j){

    	if (j>=process.length){
    		return "演示完毕";
    	}

    	//a记录最后移动的位置
    	var processOne = process[j];
		var a = 0 , needMoveVal = 0;
		if(processOne.result){
			a = processOne.position1;
			needMoveVal = processOne.val1;
		} else {
			a = processOne.position2;
			needMoveVal = processOne.val2;
		}
		var needMoveDest = processOne.dest;//移动的终点

		var	_processTitle = "";
		
		if(needMoveDest<a){
			_processTitle += "把&nbsp;"+needMoveDest+"&nbsp;到&nbsp;"+a+"&nbsp;向后移动";
		}else {
			_processTitle += "不需要移动";
		}

		_processTitle += "&nbsp;&nbsp;把"+needMoveVal+"从"+a+"移动到"+needMoveDest;

		return _processTitle;
    }

    function cleanBackground(){
    	$(".numCom").css("background","#46b8da");
    }

    function cleanList(){
    	list = [];
    	listOld = [];
    }

    ///归并排序祝入口
    function mergeSortMain(list){
    	process = [];//排序是清除存储的过程
    	mergeSort(list,0,list.length-1);
	}

    ///归并排序
    function mergeSort(list,low,high){
    	var mid = Math.floor((low+high)/2);
    	if(low<high){
    		//左边
    		mergeSort(list,low,mid);
    		//右边
    		mergeSort(list,mid+1,high);
    		//左右归并
    		merge(list,low,mid,high);
    	}

    	return list;
    }

    function merge(list, low, mid, high) {
	  var n1 = mid - low + 1;//低位的个数
	  var n2 = high - mid;//高位的个数
	  var left = [];
	  var right = [];
	  var m = n = 0;

	  //left数组
	  for (var i = 0; i < n1; i++) {
	    left[i] = list[low + i];
	  }
	  //right数组
	  for (var j = 0; j < n2; j++) {
	    right[j] = list[mid + 1 + j];
	  }
	  left[n1] = right[n2] = Number.MAX_VALUE;
	  //排序
	  for (var k = low; k <= high; k++) {
	  	//存储归并排序的而过程
	  	process.push({position1:(low+m),val1:left[m],position2:(low+n1+n),val2:right[n],result:left[m] <= right[n],dest:k});

	    if (left[m] <= right[n]) {
	      list[k] = left[m];
	      m++;
	    } else {
	      list[k] = right[n];
	      n++;
	    }

	  }
	}
});