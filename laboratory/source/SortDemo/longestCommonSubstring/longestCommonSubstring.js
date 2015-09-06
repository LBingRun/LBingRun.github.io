$(function(){
/*
  保存table数据
*/
  var savetable = [];
  var savecoordinate = [];
  var savecoordinategui = [];
/*
  初始化表格
*/
function initTable(row,col){
    var table = [];
    for(var i=0;i<=row+1;i++){
       if(!table[i]){
          table[i] = [];
       }
       for(var j=0;j<=col+1;j++){
           if(!table[i][j]){
               table[i][j] = [];
           }
           //保证（0,0）（1,0）（0,1）位置的元素为空
           if ((i==0&&j==0)||(i==1&&j==0)||(i==0&&j==1)) {
             table[i][j] = " ";
           }else{
             table[i][j] = 0;
           }
        }
    }
    
    return table;
}
/*
  确定s1和s2中相等的字符串所在s1和s2的位置
*/
function computeLCSIndex(s1,s2,table){
    var i = s1.length;
    var j = s2.length;
    var L1=[];
    var L2=[];
    while(i>0 && j>0){
    //console.log(i,j);
    if(s1[i-1] == s2[j-1]){
        console.log(i,j);
        L1.push([i+2,j+2]);
        L2.push([i+2,j+2]);
        j -=1;
        i -=1;
        L2.push([i+2,j+2]);
    }else{
        if(!table[i+1-1]){
           console.log("终止："+i);     
           break;
        }
 
        if(table[i+1-1][j+1] > table[i+1][j-1+1]){
           i -= 1;
           L2.push([i+2,j+2]);
        }else{
           j -= 1;
           L2.push([i+2,j+2]);
        }
    }
    }
    savecoordinategui = L2;
    savecoordinate = L1;
    /*
    L1.forEach(function(i){
    console.log(i);
    });
   */
    return L1;
}
/*
  返回LCS中s1,s2 的公共字符串
 */
function LCS(s1,s2,L1){
    console.log("L1.reverse():"+L1.reverse());
    L1 = L1.reverse();
    var LCS = "";
    for(var j=0;j<L1.length;j++){
      //console.log("L1[j][1]-1:"+(L1[j][1]-1));
    LCS+=(s2[L1[j][1]-1-2]);
    }
    //console.log(LCS);
    return LCS;
}
 
function diff(s1,s2){
    //len1第一个字符串的长度
    var len1 = s1.length;
    //len2第二个字符串的长度
    var len2 = s2.length;
    var table;
    var L1;
     //初始化表格
    table  = initTable(len1,len2);
    for(k=2;k<len1+2;k++){
       for(l=2;l<len2+2;l++){
           if(s1[k-2] === s2[l-2]){
               table[k][l] = table[k-1][l-1] + 1;
               //console.log("k:"+k+",l:"+l+"   "+table[k-1][l-1]);
           }else{
               //console.log("k:"+k,"l:"+l);
               table[k][l] = Math.max(table[k][l-1],table[k-1][l]);
           }
        }
    }
    savetable=table;
    /*
    //打印table
    table.forEach(function(i){
    console.log(i);
    });
    
    */
    L1 = computeLCSIndex(s1,s2,table);
    return L1;
}
var timerun;
var over;
var row;
var low;
//记录上一个节点的显示位置
var rememberrow;
var rememberlow;
//回溯计时器
var starthui;
//下标
var savecoordinatenum;
var commonStr = '';
//现成休眠时间
var runtime = 500;
$("#btn").click(function(){
    $("#maintale").empty();
    $("#commonStr").empty();
    commonStr = '';
    clearInterval(timerun);
    clearInterval(over);
    clearInterval(starthui);
    row=2;
    low=2;
    rememberrow=0;
    rememberlow=0;
    savecoordinatenum = 0;

    var firstString;
    var lastString;
    firstString = $("#firstString").val();
    lastString = $("#lastString").val();
    
    if (firstString==null||firstString==""||firstString==" ") {
      alert("序列串一不能为空！");
    }else if (lastString==null||lastString==""||lastString==" ") {
      alert("序列串二不能为空！");
    }else{
      start(firstString,lastString);
    }
    //console.info(firstString + "  "+lastString);
    
});

function start(firstString,lastString){
    /*var A = 'CGATAATTGAGA';
    var B = 'GTTCCTAATA';*/
    var A;
    var B;
    if (firstString.length>lastString.length) {
        A = firstString;
        B = lastString;
    }else{
        A = lastString;
        B = firstString;
    }
    
    
    //给出公共子序列表 和坐标信息
    var L = diff(A,B);
    var s = LCS(A,B,L);
    for (var i = s.length-1; i >=0; i--) {
      commonStr += s[i];
      //console.info("s[i]");
    };
    
    console.log(commonStr);
    savetable.forEach(function(i){
    console.log(i);
    });
    /*
    savecoordinate.forEach(function(i){
    console.log(i);
    });*/
    savecoordinategui.forEach(function(i){
    console.log(i);
    });
    var _table;
    for (var i = 0; i <=A.length+1; i++) {
       _table="";
       for (var j =0; j<=B.length+1; j++) {
        if (i==0||i==1) {
           if (i==0&&j>=2) {
             _table = _table + "<td style='text-align:center;background-color:#4e72b8'><span>"+B[j-2]+"</span></td>";
           }else{
             _table = _table + "<td id='"+i+j+"' style='text-align:center'><span>"+savetable[i][j]+"</span></td>";
           }
          
        }else{
          if (j==0) {
            _table = _table + "<td style='text-align:center ;background-color:#4e72b8'><span>"+A[i-2]+"</span></td>";
          }else if (j==1) {
            _table = _table + "<td id='"+i+j+"' style='text-align:center'><span>"+savetable[i][j]+"</span></td>";
          }else{
            _table = _table + "<td id='"+i+j+"' style='text-align:center'><span id='"+i+j+"' style='visibility:hidden;'>"+savetable[i][j]+"</span></td>";
          }
        }
       };
         _table = "<tr>"+_table+"</tr>"
         $("#maintale").append(_table);
    };
    managertime(A,B);
}

function managertime(A,B){
  
    timerun = setInterval(function(){managerctr(A,B);},runtime);
}
function managerctr(A,B){
   var al = A.length;
   var bl = B.length;
   //
   colorRange(row,low,A,B);
   
   $("table td span[id='"+row+low+"']").css("visibility","visible");
   low++;
   //如果一行显示完，接着显示第二行
   if (low==bl+2) {
       low=2;
       row++;
   }
   if (low==bl+1&&row==al+1) {
    colorRange(row,low,A,B);
    $("table td span[id='"+row+low+"']").css("visibility","visible");
    //colorRange(row,low);
     console.info("dddd");
     clearInterval(timerun);
     over=setInterval(function(){
       $("table td[id='"+(row-1)+(low-1)+"']").css("background-color","#ffffff");
       $("table td[id='"+(row)+(low-1)+"']").css("background-color","#ffffff");
       $("table td[id='"+(row-1)+(low)+"']").css("background-color","#ffffff");
       clearInterval(over);
       backdate();
     },runtime);
   }
}
/*
   遍历的时候改变颜色判断当前值的来源
*/
function colorRange(row,low,A,B){
  if (A[row-2]==B[low-2]) {
      $("table td[id='"+rememberrow+rememberlow+"']").css("background-color","#ffffff");
      $("table td[id='"+(row-1)+(low-1)+"']").css("background-color","#1d953f");
      rememberrow = row-1;
      rememberlow = low-1;
   }else{
       $("table td[id='"+rememberrow+rememberlow+"']").css("background-color","#ffffff");
       if (savetable[row-1][low]>savetable[row][low-1]) {
            $("table td[id='"+(row-1)+(low)+"']").css("background-color","#ffc20e");
            rememberrow = row-1;
            rememberlow = low;
       }else{
            $("table td[id='"+(row)+(low-1)+"']").css("background-color","#ffc20e");
            rememberrow = row;
            rememberlow = low-1;
       }
      
   }
}
//记录上一个回溯节点

function backdate(){
    managerhuisu();
   /*for (var k = 0; k <savecoordinate.length; k++) {
       //console.info("dddd:"+savecoordinate[k][0]+"  "+savecoordinate[k][1]); 
    }*/
}
function managerhuisu(){
   starthui = setInterval(function(){
         var _num0 = savecoordinategui[savecoordinatenum][0]-1;
         var _num1 = savecoordinategui[savecoordinatenum][1]-1;
         $("table td[id='"+_num0+_num1+"']").css("background-color","#ffd400");
         for (var i = 0; i < savecoordinate.length; i++) {
           if ((_num0+1==(savecoordinate[i][0]))&&(_num1+1==(savecoordinate[i][1]))) {
                $("table td[id='"+_num0+_num1+"']").css("background-color","#33a3dc");
           }
         };
         savecoordinatenum++;
         if (savecoordinatenum==savecoordinategui.length) {
          $("#commonStr").append("<span style='font-size: 20px;background-color:#fff;color:#000;'>公共字符串</span><br><span style='font-size: 42px;background-color:#fff;color:red;'>"+commonStr+"</span>");
            clearInterval(starthui);
         }
       },runtime);
}
});
