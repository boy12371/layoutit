//全局变量，控制当前排序是升序还是降序
//0:升序，1：降序，初始时为升序
var count = 0; 
           
/*
* 描述：排序
* 给当前页面的数据排序
* 参数：
*   tableId: 当前数据Table的ID
*   paramId: 有线的部分的td的ID，如果有多条线，ID用","分隔，如果没有线，用空字符串""
*/  
function sortAble(tbodyId, startIndex, len, cssName){
     
     var tbody = document.getElementById(tbodyId);
     var colRows = tbody.rows;      
     var aTrs = new Array;
     
     //分析参数
     var indexParam = getArrayFormString(startIndex);     
     var lenParam = getArrayFormString(len);
     var cssParam = getCssArrayFormString(cssName);
     
      //循环所有的行
     for (var i = 0; i < colRows.length; i++) { 
          
          //取得该行数据，赋值给数组
          aTrs[i] = colRows[i];  
          
          //控制辅助线的样式
          if (aTrs[i].className == "z_tr_hui_top") {
              aTrs[i].className = "z_tr_hui_bottom";
          } else if (aTrs[i].className == "tdbckno_top") {
              aTrs[i].className = "tdbckno_bottom";  
          } else if (aTrs[i].className == "z_tr_hui_bottom") {
              aTrs[i].className = "z_tr_hui_top";  
          } else if (aTrs[i].className == "tdbckno_bottom") {
              aTrs[i].className = "tdbckno_top";  
          }
     } 
     
     if(aTrs != null && aTrs.length > 0){
         //反转数组
         aTrs.reverse();
         
         var strSrc = document.getElementById("imgSort").src;
         var srcArray = strSrc.split("/");
         //alert(srcArray[srcArray.length - 1]);  
         if (srcArray[srcArray.length - 1] == "sort_xia.gif") {
             document.getElementById("imgSort").src = "../CSS/" + srcArray[srcArray.length - 2] + "/sort_shang.gif";  
         } else {
             document.getElementById("imgSort").src = "../CSS/" + srcArray[srcArray.length - 2] + "/sort_xia.gif"; 
         }
         
         var oFragment = document.createDocumentFragment();     
         for (var i=0; i < aTrs.length; i++) {
             oFragment.appendChild(aTrs[i]);
         }
         tbody.appendChild(oFragment);
     }
     
     if (startIndex != "" && startIndex != undefined && startIndex != null) {   
         //把页面上的线清空
         oZXZ.clear();
         if (document.getElementById("dzx").checked == true) {
             //重新加载线
             objectZXZ = oZXZ.bind(tbodyId, cssParam);
             for (var i = 0; i < indexParam.length; i++) {
                 objectZXZ.add(indexParam[i], 0, lenParam[i], 0);
                 //从左边开始第几个单元格
                 //从上边开始第几个单元格
                 //单元格个数
                 //离下面的行数(0：到最后一行)
             }
             objectZXZ.draw(ESUNChart.ini.default_has_line);
         }
     }
}

/*
* 描述：跨浏览器的设置 innerHTML 方法
* 允许插入的 HTML 代码中包含 script 和 style
* 参数：
*   el: DOM 树中的节点，设置它的 innerHTML
*   htmlCode: 插入的 HTML 代码
* 经测试的浏览器：ie5+, firefox1.5+, opera8.5+
*/
var set_innerHTML = function (el, htmlCode){
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('msie') >= 0 && ua.indexOf('opera') < 0) 
    {
        htmlCode = '<div style="display:none">for IE</div>' + htmlCode;
        htmlCode = htmlCode.replace(/<script([^>]*)>/gi,'<script$1 defer="true">');
        el.innerHTML = htmlCode;
        el.removeChild(el.firstChild);
    } else {
        var el_next = el.nextSibling;
        var el_parent = el.parentNode;
        el_parent.removeChild(el);
        el.innerHTML = htmlCode;
        if (el_next)
           el_parent.insertBefore(el, el_next)
        else
           el_parent.appendChild(el); 
    }
}