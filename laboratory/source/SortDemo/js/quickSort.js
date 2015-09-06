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

	var chartPart = $("#chartPart");
	var processTitle = $("#processTitle");

	copyArray(list,listOld);
	buidChart(list);
	quick_sort_main(list);

    eventDel();

	/*事件处理集合*/
	function eventDel(){
		$("#getRandonList").on("click",function(){
			redmoBuildChart(randomCount);
			copyArray(list,listOld);
			buidChart(listOld);
			quick_sort_main(list);
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
			quick_sort_main(list);
			showTheArr();
		});

		$("#startDeom").on("click",function(){
			//quick_sort_main(list);
			showDemo();
		});

		$("#nextStartDeom").on("click",function(){
			//quick_sort_main(list);
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
		var chartWidth = _offsetWidth/list.length;
		isShowTitle = list.length<=50;
			
		for (var i = 0; i < list.length; i++) {
			if(isShowTitle){
				_html += "<div class='numCom' title='"+list[i]+"' id='rowNumID"+i+"' style='left:"+i*chartWidth+"px;;height:"+list[i]+"px;'>"+list[i]+"</div>";
			}else{
				_html += "<div class='numCom' title='"+list[i]+"' id='rowNumID"+i+"' style='left:"+i*chartWidth+"px;;height:"+list[i]+"px;'/>";
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

	/*快速排序快速入口*/
	function quick_sort_main(list){
		process = [];
		quick_sort(list, 0, list.length-1);
	}

	/*快速排序入口*/
	function quick_sort(list, start, end) { 
      if (start < end) { 
        var pivotpos = partition(list, start, end);   //找出快排的基数 
        quick_sort(list, start, pivotpos - 1);        //将左边的快排一次 
        quick_sort(list, pivotpos + 1, end);          //将右边的快排一次 
      } 

    } 

    //将一个序列调整成以基数为分割的两个区域，一边全都不小于基数，一边全都不大于基数 
    function partition(list, start, end) { 
      var pivot = list[start];

      while(start<end){

      	process.push({pivot:pivot,start:start,end:end,module:2,val:list[end],noChange:list[end] >= pivot});

      	while(start<end&&list[end] >= pivot){
      		--end;

      		process.push({pivot:pivot,start:start,end:end,module:2,val:list[end],noChange:list[end] >= pivot});
      	}

      	list[start] = list[end];
      	list[end] = pivot;

      	process.push({pivot:pivot,start:start,end:end,module:1,val:list[start],noChange:list[start] <= pivot});

      	while(start<end&&list[start] <= pivot){
      		++start;
      		process.push({pivot:pivot,start:start,end:end,module:1,val:list[start],noChange:list[start] <= pivot});
      	}
      	list[end] = list[start];
      	list[start] = pivot;
      }
      //list[start] = pivot;
      return start;
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

    	var processOne = process[showDemoCount++];
		cleanBackground();

		var	_processTitle = "";
		processTitle.empty();
		if(processOne.module == 1){
			_processTitle += "基数["+processOne.end+"]="+processOne.pivot+"和 ["+processOne.start+"]="+processOne.val+"比较"
		} else {
			_processTitle += "基数["+processOne.start+"]="+processOne.pivot+"和 ["+processOne.end+"]="+processOne.val+"比较"
		}

		_processTitle +=processOne.noChange? "&nbsp;&nbsp;不交换": "&nbsp;&nbsp;交换"

		if(processOne.noChange){
			if(processOne.module == 1){
				_processTitle += "&nbsp;&nbsp;继续向后移动"
			} else {
				_processTitle += "&nbsp;&nbsp;继续向前移动"
			}
		}
	
		processTitle.append(_processTitle);

		// var startEle = $("#rowNumID"+processOne.start);
		// var endEle = $("#rowNumID"+processOne.end);

		var startEle = $(".numCom").eq(processOne.start);
		var endEle = $(".numCom").eq(processOne.end);

		// startEle.css("background","#f0ad4e");
		// endEle.css("background","#f0ad4e");

		if(processOne.module == 2){
			startEle.css("background","#d9534f");//基数
			endEle.css("background","#f0ad4e");
		} else {
			endEle.css("background","#d9534f");//基数
			startEle.css("background","#f0ad4e");
		}

		if(!processOne.noChange){
			if (processOne.module == 1) {
				// startEle.attr("id","rowNumID"+processOne.end);
				// endEle.attr("id","rowNumID"+processOne.start);

				//endEle.css("height",processOne.val);
				endEle.animate({height:processOne.val},{speed:speed,queue:false});
				endEle.attr("title",processOne.val);

				//startEle.css("height",processOne.pivot);
				startEle.animate({height:processOne.pivot},{speed:speed,queue:false});
				startEle.attr("title",process.pivot);
				if(isShowTitle){
					endEle.empty();
					endEle.append(processOne.val);

					startEle.empty();
					startEle.append(processOne.pivot);
				}
			} else {
				// startEle.attr("id","rowNumID"+processOne.end);
				// endEle.attr("id","rowNumID"+processOne.start);

				// endEle.css("height",processOne.pivot);
				endEle.animate({height:processOne.pivot},{speed:speed,queue:false});
				endEle.attr("title",processOne.pivot);

   				//startEle.css("height",processOne.val);
				startEle.animate({height:processOne.val},{speed:speed,queue:false});
				startEle.attr("title",process.val);
				
				if(isShowTitle){
					endEle.empty();
					endEle.append(processOne.pivot);

					startEle.empty();
					startEle.append(processOne.val);
				}
			}

			if(processOne.module == 1){
				startEle.css("background","#d9534f");//基数
				endEle.css("background","#f0ad4e");
			} else {
				endEle.css("background","#d9534f");//基数
				startEle.css("background","#f0ad4e");
			}
		}

		if (showDemoCount>=process.length) {
			window.clearInterval(intervalId);
			cleanBackground();
		};
    }

    function cleanBackground(){
    	$(".numCom").css("background","#46b8da");
    }

    function cleanList(){
    	list = [];
    	listOld = [];
    }
});