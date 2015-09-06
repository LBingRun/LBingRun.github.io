$(function(){
  var name = "ABCDEFGHIJKLMNOPQLMNUVWXYZ";
  //var b = "5,10,4,6,10,2";
  var a /*= [5,10,4,6,10,2]*/;
  var len;
  var xunlie="";
  var zuimin;
  var m = [];
  var s = [];
  //声明两个数组保留轨迹坐标
  var L1;
  var L2;
   //计时器
  var timeruning;
  var over;
  var runtime = 500;
  //var fff =  setInterval(function(){console.info("fff");},100);
  $("#btn").click(function(){
      clearInterval(timeruning);
      clearInterval(over);
      $("#toptale").empty();
      $("#lefttable").empty();
      $("#righttable").empty();
      $("#top").empty();
      $("#left").empty();
      $("#right").empty();
      $("#outvalue").empty();
      $("#squer").empty();
      xunlie = "";
      var squer="";
      L1 = [];
      L2 = [];
      //len = 0;
      zuimin=0;
      var firstString = $("#firstString").val();
      if(firstString==null||firstString==""||firstString==" "){
        alert("矩阵序列不能为空！");
      }else{
        var array = [];
        array = firstString.split(",");
        //console.info("array:"+array[0]);
        for (var i = 0; i < array.length-1; i++) {
            squer += name.charAt(i)+":"+array[i]+"*"+array[i+1]+" ";
        }
        $("#kmin").css("visibility","visible");
        $("#squer").append("矩阵链：<span>"+squer+"</span>");
        a = array;
        len = a.length - 1;
        run(a);
      }
      
  });
  



  /*var isrun=true;*/
  function run(a)
  {
    //初始化二维数组
   for (var i = 0; i < a.length-1; i++) {
       if(!m[i]){
          m[i] = [];
       }
       if(!s[i]){
          s[i] = [];
       }
      for (var j = 0; j < a.length-1; j++) {
           if(!m[i][j]){
               m[i][j] = [];
           }
           if(!s[i][j]){
               s[i][j] = [];
           }
        //System.out.print(s[i][j]+" ");
        m[i][j]=0;
        s[i][j]=0;
     }
   }
   for (var i = 0; i < len; i++) {
     L1.push([i,i]);
     L2.push([i,i]);
  }

    console.info("最少需要的计算次数：");
    Compute(a, m, s);
    console.info();
    
    console.info("矩阵相乘的顺序为： ");
    Display(s, name, 0, len-1);
    console.info(xunlie);

    protable();
    start();
  }
  /*
     生成表格
  */
  function protable(){
    var _toptable="";
    var _ktoptable="";
    var _lefttable="";
    var _Klefttable="";
    var _righttable="";
    var _krighttable="";

    //顶部表格
    for (var i = 0; i < len; i++) {
        _toptable += "<td style='width:"+460/(len+1)+"px;'>"+(i+1)+"</td>";
        _ktoptable += "<td style='width:"+330/(len+1)+"px;'>"+(i+1)+"</td>";
    }
    _toptable = "<tr>"+_toptable+"</tr>";
    _ktoptable = "<tr>"+_ktoptable+"</tr>";
    $("#toptale").append(_toptable);
    $("#top").append(_ktoptable);
    //左边表格
    for (var j = 0; j < len; j++) {
       _lefttable += "<tr><td >"+(j+1)+"</td></tr>";
       _Klefttable += "<tr><td>"+(j+1)+"</td></tr>";
    }
     $("#left").append(_Klefttable);
     $("#lefttable").append(_lefttable);
    //右边表格
    for (var k = 0; k < len; k++) {
       _righttable="";
       _krighttable="";
       for (var z = 0; z < len; z++) {
            if (k==0) {
               _righttable += "<td id='"+k+z+"' style='width:"+460/(len+1)+"px;'><span id='"+k+z+"' style='visibility:hidden;'>"+m[k][z]+"</span></td>";
            }else{
              if (z==(k-1)) {
                 _righttable += "<td id='"+k+z+"' style='width:"+460/(len+1)+"px;border-left: none;border-bottom: none;'><span id='"+k+z+"' style='visibility:hidden;'>"+m[k][z]+"</span></td>";
              }else if (z<(k-1)){
                 _righttable += "<td id='"+k+z+"' style='width:"+460/(len+1)+"px;border: none;'><span id='"+k+z+"' style='visibility:hidden;'>"+m[k][z]+"</span></td>";
              }else{
                 _righttable += "<td id='"+k+z+"' style='width:"+460/(len+1)+"px;'><span id='"+k+z+"' style='visibility:hidden;'>"+m[k][z]+"</span></td>";
              }
            }
           
       }
       for (var z = 0; z < len; z++) {
            if (k==0&&z==0) {
               _krighttable += "<td id='"+k+z+1+"' style='width:"+330/(len+1)+"px;border-left: none;border-bottom: none;border-top: none;'><span id='"+k+z+1+"' style='visibility:hidden;'>"+(s[k][z]+1)+"</span></td>";
            }else if (k==len-1&&z==len-1) {
               _krighttable += "<td id='"+k+z+1+"' style='width:"+330/(len+1)+"px;border-left: none;border-bottom: none;border-right: none;'><span id='"+k+z+1+"' style='visibility:hidden;'>"+(s[k][z]+1)+"</span></td>";
            }else{
              if (z==(k)) {
                 _krighttable += "<td id='"+k+z+1+"' style='width:"+330/(len+1)+"px;border-left: none;border-bottom: none;'><span id='"+k+z+1+"' style='visibility:hidden;'>"+(s[k][z]+1)+"</span></td>";
              }else if (z<(k)){
                 _krighttable += "<td id='"+k+z+1+"' style='width:"+330/(len+1)+"px;border: none;'><span id='"+k+z+1+"' style='visibility:hidden;'>"+(s[k][z]+1)+"</span></td>";
              }else{
                 _krighttable += "<td id='"+k+z+1+"' style='width:"+330/(len+1)+"px;'><span id='"+k+z+1+"' style='visibility:hidden;'>"+(s[k][z]+1)+"</span></td>";
              }
            }
           
       }
       _righttable = "<tr>"+_righttable+"</tr>";
       _krighttable = "<tr>"+_krighttable+"</tr>";
        $("#right").append(_krighttable);
        $("#righttable").append(_righttable);
    }
  }
 
  
  //开始动画
  function start(){
    //记录位置
  var weizhi=0;
  //记录坐标位置
    var x1,y1;
    var x2,y2;
    var x3,y3;
     timeruning = setInterval(function(){
         x1= L1[weizhi][0];
         y1= L2[weizhi][1];

         //当当前坐标不一样时，修改回颜色
         if (weizhi>len) {
             $("table td[id='"+L1[weizhi-1][0]+L2[weizhi-1][1]+1+"']").css("background-color","#ffd400");
             $("table td span[id='"+L1[weizhi-1][0]+L2[weizhi-1][1]+1+"']").css("visibility","visible");
             $("table td[id='"+L1[weizhi-1][0]+L2[weizhi-1][1]+"']").css("background-color","#ffd400");
             $("table td span[id='"+L1[weizhi-1][0]+L2[weizhi-1][1]+"']").css("visibility","visible");
         }
         if (weizhi<len) {
             $("table td[id='"+L1[weizhi][0]+L2[weizhi][1]+"']").css("background-color","#33a3dc");
             $("table td[id='"+L1[weizhi][0]+L1[weizhi][1]+"']").css("background-color","#ffd400");
             $("table td[id='"+L2[weizhi][0]+L2[weizhi][1]+"']").css("background-color","#ffd400");
             $("table td span[id='"+L2[weizhi][0]+L2[weizhi][1]+"']").css("visibility","visible");
         }else{
             $("table td[id='"+L1[weizhi][0]+L2[weizhi][1]+1+"']").css("background-color","#33a3dc");
             $("table td span[id='"+L1[weizhi][0]+L2[weizhi][1]+1+"']").css("visibility","hidden");
             $("table td[id='"+L1[weizhi][0]+L2[weizhi][1]+"']").css("background-color","#33a3dc");
             $("table td span[id='"+L1[weizhi][0]+L2[weizhi][1]+"']").css("visibility","hidden");
            // $("table td span[id='"+L2[weizhi][0]+L2[weizhi][1]+"']").css("visibility","hidden");
             $("table td[id='"+L1[weizhi][0]+L1[weizhi][1]+"']").css("background-color","#1d953f");
             $("table td[id='"+L2[weizhi][0]+L2[weizhi][1]+"']").css("background-color","#1d953f");

             if (weizhi>len) {
                if (weizhi>(len+len-2)) {
                   $("table td[id='"+x3+y3+"']").css("background-color","#ffd400");
                }
                $("table td[id='"+x2+y2+"']").css("background-color","#ffd400");
                
             }
         }
          x2= L1[weizhi][0];
          y2= L1[weizhi][1];

          x3= L2[weizhi][0];
          y3= L2[weizhi][1];
          weizhi++;          
         if (weizhi==L1.length) {
          clearInterval(timeruning);
           over = setInterval(function(){
                $("table td[id='"+L1[weizhi-1][0]+L2[weizhi-1][1]+1+"']").css("background-color","#ffd400");
                $("table td span[id='"+L1[weizhi-1][0]+L2[weizhi-1][1]+1+"']").css("visibility","visible");
                $("table td[id='"+L1[weizhi-1][0]+L2[weizhi-1][1]+"']").css("background-color","#ffd400");
                $("table td span[id='"+L1[weizhi-1][0]+L2[weizhi-1][1]+"']").css("visibility","visible");
                $("table td[id='"+x2+y2+"']").css("background-color","#ffd400");
                $("table td[id='"+x3+y3+"']").css("background-color","#ffd400");
                $("#outvalue").append("<br><br><span>矩阵最优消费："+zuimin+"</span><br><span>最优加括号序列："+xunlie+"</span>");
               clearInterval(over);
          },runtime);
                /*$("table td[id='"+L1[weizhi-1][0]+L2[weizhi-1][1]+"']").css("background-color","#ffd400");
                $("table td[id='"+x2+y2+"']").css("background-color","#ffd400");
                $("table td[id='"+x3+y3+"']").css("background-color","#ffd400");*/
        }
       },runtime);
  }
  
  function loopOrOne(){

  }

  function Compute(a,m,s)
  {
    var t = 0;
    var min = 0;
    var temp = 0;
    
    for(var i=2; i<a.length; i++)
      {
          for(var j=0; j<a.length-i; j++)
          {
              t = j + i - 1;
              
              m[j][t] = Number.MAX_VALUE;
              
              for(var k=j; k<t; k++)
              {
                  temp = m[j][k] + m[k+1][t] + a[j]*a[k+1]*a[t+1];
                  L1.push([j,k]);
                  L2.push([k+1,t]);
                  if(temp < m[j][t])
                  {
                      min = temp;
                      //保存最小消费
                      m[j][t] = temp;
                      //保存最小消费处的k值
                      s[j][t] = k;
                  }
              }
          }
      }
      zuimin = min;
      /*console.info(min);
      m.forEach(function(i){
       console.log(i);
      });
      s.forEach(function(i){
       console.log(i);
      });*/
     
  }
  
  
  function Display(s,name,i,j)
  {
    if(i == j)
    {
      xunlie += name.charAt(i);
      //console.info(name.charAt(i));
    }
    else
    {
      xunlie += "(";
      //console.info("(");
      Display(s, name, i, s[i][j]);
      Display(s, name, s[i][j]+1, j);
      xunlie += ")";
      //console.info(")");
      //console.info(xunlie);
    }
  }
});
