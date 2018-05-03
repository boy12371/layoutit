
// 图表页公用函数

//***************************************************************************
//                  样式调用
//***************************************************************************

//加载样式
function LoadCss()
{
    var css=request("css");
    if(css!="")
    {
        try
        {

            Style(css);
        }
        catch(e)
        {
            Style("orange");
        }
    }
}
// 获取样式参数
function request(paras)
{  
    var url = location.href;   
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");   
    var paraObj = {}   
    for (i=0; j=paraString[i]; i++){   
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf 
        ("=")+1,j.length);   
    }   
    var returnValue = paraObj[paras.toLowerCase()];   
    if(typeof(returnValue)=="undefined"){   
        return "css=";   
    }else{   
        return returnValue;   
    }   
}

// 选择样式表
function Style(i)
{
    var css=document.getElementById('userStyle');

    css.href="../CSS/"+i+"/"+i+'.css'; 
    css.rel="stylesheet"; 
    css.type="text/css"; 
}

// ***************************************************************************


// 验证输入期号是否正确
function Checkvalue(formId)
{                                                      
    var frm1=document.getElementById("startqi");
    var frm2=document.getElementById("endqi");
    var result=frm1.value;
    var result2=frm2.value; 
    var regex=new RegExp("[0-9]{7}");
    if(!regex.test(result))
    {
        alert("输入的开始期数不正确，请重新输入");
        frm1.focus();
        return false;
    }
    if(!regex.test(result2))
    {
        alert("输入的结束期数不正确，请重新输入");
        frm2.focus();
        return false;
    }           
    
    document.getElementById("searchType").value="1";
    window.location.href = formId + '-1-' + result + '-' +  result2 + '-1.html';  
}
    
// 预测行样式
function css(td,css1,css2)
{                        
    if(td.className==css1)
    {
        td.className=css2;
    }
    else
    {
        td.className=css1;
    }
    blue_num1=document.getElementById("m1_blue").innerText;
    blue_num2=document.getElementById("m2_blue").innerText;
    blue_num3=document.getElementById("m3_blue").innerText;
    blue_num4=document.getElementById("m4_blue").innerText;
    blue_num5=document.getElementById("m5_blue").innerText;
    
	red_num1=document.getElementById("m1_red").innerText;
	red_num2=document.getElementById("m2_red").innerText;
	red_num3=document.getElementById("m3_red").innerText;
	red_num4=document.getElementById("m4_red").innerText;
	red_num5=document.getElementById("m5_red").innerText;
	
	
	int_blue1=Number(blue_num1);
	int_blue2=Number(blue_num2);
	int_blue3=Number(blue_num3);
	int_blue4=Number(blue_num4);
	int_blue5=Number(blue_num5);
	
	int_red1=Number(red_num1);
	int_red2=Number(red_num2);
	int_red3=Number(red_num3);
	int_red4=Number(red_num4);
	int_red5=Number(red_num5);
	if(td.parentNode.id=="mo1"){		
		
		if(td.className=="q_blue"){
			int_blue=int_blue1+1;		
			document.getElementById("m1_blue").innerText=int_blue;
		}else if (td.className=="q_red"){
			int_red=int_red1+1;				
			
			document.getElementById("m1_red").innerText=int_red;
		}
		else if(td.className=="SelectHtml1"){
			int_red=int_red1-1;
			
			document.getElementById("m1_red").innerText=int_red;
		}else if(td.className=="SelectHtml1_1"){
			int_blue=int_blue1-1;
			document.getElementById("m1_blue").innerText=int_blue;
		}
			
		
	}else if(td.parentNode.id=="mo2"){
		if(td.className=="q_blue"){
			int_blue=int_blue2+1;		
			document.getElementById("m2_blue").innerText=int_blue;
		}else if (td.className=="q_red"){
			int_red=int_red2+1;			
			
			document.getElementById("m2_red").innerText=int_red;
		}
		else if(td.className=="SelectHtml1"){
			int_red=int_red2-1;
			
			document.getElementById("m2_red").innerText=int_red;
		}else if(td.className=="SelectHtml1_1"){
			int_blue=int_blue2-1;
			document.getElementById("m2_blue").innerText=int_blue;
		}
	}else if(td.parentNode.id=="mo3"){
		if(td.className=="q_blue"){
			int_blue=int_blue3+1;		
			document.getElementById("m3_blue").innerText=int_blue;
		}else if (td.className=="q_red"){
			int_red=int_red3+1;				
			
			document.getElementById("m3_red").innerText=int_red;
			}
		else if(td.className=="SelectHtml1"){
			int_red=int_red3-1;
			
			document.getElementById("m3_red").innerText=int_red;
		}else if(td.className=="SelectHtml1_1"){
			int_blue=int_blue3-1;
			document.getElementById("m3_blue").innerText=int_blue;
		}
	}else if(td.parentNode.id=="mo4"){
		if(td.className=="q_blue"){
			int_blue=int_blue4+1;		
			document.getElementById("m4_blue").innerText=int_blue;
		}else if (td.className=="q_red"){
			int_red=int_red4+1;				
			
			document.getElementById("m4_red").innerText=int_red;
		}
		else if(td.className=="SelectHtml1"){
			int_red=int_red4-1;
			
			document.getElementById("m4_red").innerText=int_red;
		}else if(td.className=="SelectHtml1_1"){
			int_blue=int_blue4-1;
			document.getElementById("m4_blue").innerText=int_blue;
		}
	}else if(td.parentNode.id=="mo5"){
		if(td.className=="q_blue"){
			int_blue=int_blue5+1;		
			document.getElementById("m5_blue").innerText=int_blue;
		}else if (td.className=="q_red"){
			int_red=int_red5+1;				
			
			document.getElementById("m5_red").innerText=int_red;
			}
		else if(td.className=="SelectHtml1"){
			int_red=int_red5-1;
			
			document.getElementById("m5_red").innerText=int_red;
		}else if(td.className=="SelectHtml1_1"){
			int_blue=int_blue5-1;
			document.getElementById("m5_blue").innerText=int_blue;
		}
	} 
}

// 显示彩经网提供字样
function UrlLink()
{
    document.write("<span class='Url'>提供最新2000期数据,本图表提供方:  <a style='color:Red' href='http://www.cjcp.com.cn' target=_blank> 彩经网</a></span>");
}

// 显示隐藏高级筛选DIV
function DisplayHighSelect(temp1,temp2,lishiqihao)
{	
    document.searchform.action=temp2+"?searchType=2";
	document.getElementById("Qishu").value=temp1;
    //历史上的今天--期号
    document.getElementById("lishi_qishu").value=lishiqihao;
	
    var Hselect=document.getElementById("HighSelect");
	
    if(Hselect.style.display=="none")
    {
        Hselect.style.display="block";
    }
    else
    {
        Hselect.style.display="none";
    }
    HighSelectTopLeft(Hselect);
}
function HighSelectTopLeft(Hselect)
{
    var bodyhh=document.body.clientHeight;
    var bodyww=document.body.clientWidth;
    var objhh=Hselect.clientHeight;
    var objww=Hselect.clientWidth;
    Hselect.style.top=250;// (bodyhh-objhh)/2 - 112;
    Hselect.style.left=(bodyww-objww)/2;
}


// **********************************************************************
// 移动层SCRIPT
// **********************************************************************
// 定义移动对象和移动坐标
var Mouse_Obj="none",_x,_y;
// 拖动对象函数(自动)
function DivMoving()
{
	if(Mouse_Obj!=="none")
	{
	document.getElementById(Mouse_Obj).style.left=_x+event.x;
	document.getElementById(Mouse_Obj).style.top=_y+event.y;
	event.returnValue=false;
	}
}
// 停止拖动函数(自动)
function DivMoveStop()
{
	Mouse_Obj="none";
}
// 确定被拖动对象函数 o为被拖动对象
function DivMoveStart(obj)
{
	Mouse_Obj=obj;
	_x=parseInt(document.getElementById(Mouse_Obj).style.left)-event.x;
	_y=parseInt(document.getElementById(Mouse_Obj).style.top)-event.y;
}


// **********************************************************************
// 区间综合分析JS
function ZoneSelect(s,t1,t2)
{
    var zoneSelect=s;
    var txtParam3=document.getElementById(t1);
    var txtParam4=document.getElementById(t2);
    switch(zoneSelect.value)
    {
        case "3" :
                txtParam3.value = "";
                txtParam4.value = "";
                txtParam3.className = "input_b";
                txtParam4.className = "input_b";
                txtParam3.disabled  = true;
                txtParam4.disabled  = true;
            break;
        case "4" :
                txtParam4.value = "";
                txtParam3.className = "input_a";
                txtParam4.className = "input_b";
                txtParam3.disabled  = false;
                txtParam4.disabled  = true;
            break;
        case "5" :
                txtParam3.className = "input_a";
                txtParam4.className = "input_a";
                txtParam3.disabled  = false;
                txtParam4.disabled  = false;
            break;
    }
}
function ZoneSelect2(s,t1,t2)
{
    var zoneSelect=document.getElementById(s);
    var txtParam3=document.getElementById(t1);
    var txtParam4=document.getElementById(t2);
    switch(zoneSelect.value)
    {
        case "3" :
                txtParam3.value = "";
                txtParam4.value = "";
                txtParam3.className = "input_b";
                txtParam4.className = "input_b";
                txtParam3.disabled  = true;
                txtParam4.disabled  = true;
            break;
        case "4" :
                txtParam4.value = "";
                txtParam3.className = "input_a";
                txtParam4.className = "input_b";
                txtParam3.disabled  = false;
                txtParam4.disabled  = true;
            break;
        case "5" :
                txtParam3.className = "input_a";
                txtParam4.className = "input_a";
                txtParam3.disabled  = false;
                txtParam4.disabled  = false;
            break;
    }
}
function ZoneAllCheck(s,t1,t2,t3,t4,t5)
{
    var zoneSelect=document.getElementById(s);
    var txtParam0=document.getElementById(t1);
    var txtParam1=document.getElementById(t2);
    var txtParam2=document.getElementById(t3);
    var txtParam3=document.getElementById(t4);
    var txtParam4=document.getElementById(t5);
    var patrn=/^[0-9]{0,10}$/;   
    var reslut=true;
    switch(zoneSelect.value)
    {
        case "3" :
                for(var i=0;i<3;i++)
                {
                    if (!patrn.exec(eval("txtParam"+i+".value")))
                    {
                        alert("请输入0-9数字，并且每个栏内最多只能输入10个数字");
                        return false;
                    }
                }
                return true ;
            break;
        case "4" :
                for(var i=0;i<4;i++)
                {
                    if (!patrn.exec(eval("txtParam"+i+".value"))) 
                    {
                        alert("请输入0-9数字，并且每个栏内最多只能输入10个数字");
                        return false;
                    }
                }
                return true ;
            break;
        case "5" :
                for(var i=0;i<5;i++)
                {
                    if (!patrn.exec(eval("txtParam"+i+".value")))
                    {
                        alert("请输入0-9数字，并且每个栏内最多只能输入10个数字");
                        return false;
                    }
                }
                return true ;
            break;
    }
}
// *******************************************************************************


// ***************高级筛选
function HighJqChange(obj)
{
    var HighSelectJQ=document.getElementById("HighSelectJQ");
    HighSelectJQ.value=obj.options[obj.selectedIndex].value;
}
function MainClean()
{
    var objQishuEnd=document.getElementById("QishuEndSelect");
    objQishuEnd.value="-1";
    CleanSelect("MonthDiv","HighSelectMonth");
    CleanSelect("YangLiDiv","HighSelectYangLi");
    CleanSelect("YinLiDiv","HighSelectYinLi");
    CleanSelect("WeekDiv","HighSelectWeek");
    CleanHiddenValue("HighSelectQishuEnd");
    CleanSelect("QishuEndDiv","HighSelectQishujo");
    CleanHiddenValue("HighSelectJQ");
}


// 显示隐藏高级DIV
function Display(id)
{
    var obj=document.getElementById(id);
    var objmain=document.getElementById("HighSelectMain");
    if(obj.style.display=="none")
    {
        objmain.style.display="none";
        obj.style.display="block";
    }
    else
    {
        obj.style.display="none";
        objmain.style.display="block";
    }
    var Hselect=document.getElementById("HighSelect");
    HighSelectTopLeft(Hselect);
}

function QishuEndSelectChange(objselect)
{
    var obj=document.getElementById("HighSelectQishuEnd");
    var result=objselect.value;
    var arr;
    switch(result)
    {
        case "1":
        CleanSelect("QishuEndDiv","HighSelectQishuEnd");
        ListSelect("HighSelectQishuEnd","5,6,7,8,9","QishuEnd");
        break;
        case "2":
        CleanSelect("QishuEndDiv","HighSelectQishuEnd");
        ListSelect("HighSelectQishuEnd","0,1,2,3,4","QishuEnd");
        break;
        case "3":
        CleanSelect("QishuEndDiv","HighSelectQishuEnd");
        ListSelect("HighSelectQishuEnd","1,3,5,7,9","QishuEnd");
        break;
        case "4":
        CleanSelect("QishuEndDiv","HighSelectQishuEnd");
        ListSelect("HighSelectQishuEnd","0,2,4,6,8","QishuEnd");
        break;
        case "5":
        arr=GetPrime(0,9);
        CleanSelect("QishuEndDiv","HighSelectQishuEnd");
        ListSelect("HighSelectQishuEnd","0,1,2,3,5,7","QishuEnd");
        break;
        case "6":
        arr=GetComposite(0,9);
        CleanSelect("QishuEndDiv","HighSelectQishuEnd");
        ListSelect("HighSelectQishuEnd","4,6,8,9","QishuEnd");
        break;
        case "7":
        arr=GetZero(0,9);
        CleanSelect("QishuEndDiv","HighSelectQishuEnd");
        ListSelect("HighSelectQishuEnd",arr,"QishuEnd");
        break;
        case "8":
        arr=GetOne(0,9);
        CleanSelect("QishuEndDiv","HighSelectQishuEnd");
        ListSelect("HighSelectQishuEnd",arr,"QishuEnd");
        break;
        case "9":
        arr=GetTwo(0,9);
        CleanSelect("QishuEndDiv","HighSelectQishuEnd");
        ListSelect("HighSelectQishuEnd",arr,"QishuEnd");
        break;
    }
}



// 清除年份选择
function CleanYearSelect()
{
    var obj=document.getElementById("YearDiv");
    var objinput=obj.getElementsByTagName("div");
    for(var i=0;i<objinput.length;i++)
    {
        objinput[i].className="button_ha";
    }
    CleanHiddenValue("HighSelectYear");
}
// 年份下拉框选择
function YearSelectChange()
{
    var objselect=document.getElementById("YearSelect");
    var result=objselect.value;
    switch(result)
    {
        case "1":
        CleanYearSelect();
        ListSelect("HighSelectYear","2009,2011,2013","Year");
        break;
        case "2":
        CleanYearSelect();
        ListSelect("HighSelectYear","2008,2010,2012","Year");
        break;
        case "3":
        CleanYearSelect();
        ListSelect("HighSelectYear","2011,2012,2013","Year");
        break;
        case "4":
        CleanYearSelect();
        ListSelect("HighSelectYear","2008,2009,2010","Year");
        break;
        case "5":
        CleanYearSelect();
        ListSelect("HighSelectYear","2009,2010,2013","Year");
        break;
        case "6":
        CleanYearSelect();
        ListSelect("HighSelectYear","2011","Year");
        break;
        case "7":
        CleanYearSelect();
        ListSelect("HighSelectYear","2008,2012","Year");
        break;
    }
}

// 清除月份选择
function CleanSelect(DivId,HiddenId)
{
    var obj=document.getElementById(DivId);
    var objinput=obj.getElementsByTagName("div");
    for(var i=0;i<objinput.length;i++)
    {
        objinput[i].className="button_ha";
    }
    CleanHiddenValue(HiddenId);
}

// 月份下拉框选择
function MonthSelectChange()
{
    var objselect=document.getElementById("MonthSelect");
    var result=objselect.value;
    switch(result)
    {
        case "1":
        CleanSelect("MonthDiv","HighSelectMonth");
        ListSelect("HighSelectMonth","1,3,5,7,9,11","Month");
        break;
        case "2":
        CleanSelect("MonthDiv","HighSelectMonth");
        ListSelect("HighSelectMonth","2,4,6,8,10,12","Month");
        break;
        case "3":
        CleanSelect("MonthDiv","HighSelectMonth");
        ListSelect("HighSelectMonth","1,2,3,5,7,11","Month");
        break;
        case "4":
        CleanSelect("MonthDiv","HighSelectMonth");
        ListSelect("HighSelectMonth","4,6,8,9,10,12","Month");
        break;
        case "5":
        CleanSelect("MonthDiv","HighSelectMonth");
        ListSelect("HighSelectMonth","3,6,9,12","Month");
        break;
        case "6":
        CleanSelect("MonthDiv","HighSelectMonth");
        ListSelect("HighSelectMonth","1,4,7,10","Month");
        break;
        case "7":
        CleanSelect("MonthDiv","HighSelectMonth");
        ListSelect("HighSelectMonth","2,5,8,11","Month");
        break;
    }
}
// 阳历下拉框选择
function YangLiSelectChange()
{
    var objselect=document.getElementById("YangLiSelect");
    var result=objselect.value;
    var arr;
    switch(result)
    {
        case "1":
        CleanSelect("YangLiDiv","HighSelectYangLi");
        arr=GetOdd(1,31);
        ListSelect("HighSelectYangLi",arr,"YangLi");
        break;
        case "2":
        CleanSelect("YangLiDiv","HighSelectYangLi");
        arr=GetEven(1,31);
        ListSelect("HighSelectYangLi",arr,"YangLi");
        break;
        case "3":
        CleanSelect("YangLiDiv","HighSelectYangLi");
        arr=GetPrime(1,31);
        ListSelect("HighSelectYangLi",arr,"YangLi");
        break;
        case "4":
        arr=GetComposite(1,31);
        CleanSelect("YangLiDiv","HighSelectYangLi");
        ListSelect("HighSelectYangLi",arr,"YangLi");
        break;
        case "5":
        arr=GetZero(1,31);
        CleanSelect("YangLiDiv","HighSelectYangLi");
        ListSelect("HighSelectYangLi",arr,"YangLi");
        break;
        case "6":
        arr=GetOne(1,31);
        CleanSelect("YangLiDiv","HighSelectYangLi");
        ListSelect("HighSelectYangLi",arr,"YangLi");
        break;
        case "7":
        arr=GetTwo(1,31);
        CleanSelect("YangLiDiv","HighSelectYangLi");
        ListSelect("HighSelectYangLi",arr,"YangLi");
        break;
    }
}

// 阳历下拉框选择
function YinLiSelectChange()
{
    var objselect=document.getElementById("YinLiSelect");
    var result=objselect.value;
    var arr;
    switch(result)
    {
        case "1":
        CleanSelect("YinLiDiv","HighSelectYinLi");
        arr=GetOdd(1,30);
        ListSelect("HighSelectYinLi",arr,"YinLi");
        break;
        case "2":
        CleanSelect("YinLiDiv","HighSelectYinLi");
        arr=GetEven(1,30);
        ListSelect("HighSelectYinLi",arr,"YinLi");
        break;
        case "3":
        CleanSelect("YinLiDiv","HighSelectYinLi");
        arr=GetPrime(1,30);
        ListSelect("HighSelectYinLi",arr,"YinLi");
        break;
        case "4":
        arr=GetComposite(1,30);
        CleanSelect("YinLiDiv","HighSelectYinLi");
        ListSelect("HighSelectYinLi",arr,"YinLi");
        break;
        case "5":
        arr=GetZero(1,30);
        CleanSelect("YinLiDiv","HighSelectYinLi");
        ListSelect("HighSelectYinLi",arr,"YinLi");
        break;
        case "6":
        arr=GetOne(1,30);
        CleanSelect("YinLiDiv","HighSelectYinLi");
        ListSelect("HighSelectYinLi",arr,"YinLi");
        break;
        case "7":
        arr=GetTwo(1,30);
        CleanSelect("YinLiDiv","HighSelectYinLi");
        ListSelect("HighSelectYinLi",arr,"YinLi");
        break;
    }
}

// 设置控件样式列表
function ListSelect(id,strList,strID)
{
    var obj=document.getElementById(id);
    var arrID=strList.split(',');
    for(var i=0;i<arrID.length;i++)
    {
        var cr=document.getElementById(strID+arrID[i]);// 设置控件状态样式
        if(cr){
            cr.className="button_hb";
        }
    }
    
    obj.value=strList;
}

// 清除隐藏域值
function CleanHiddenValue(id)
{
    var obj=document.getElementById(id);
    obj.value="";
}


function Select(id,str,obj)
{
    if(obj.className=="button_ha")
    {
        obj.className="button_hb";
    }
    else
    {
        obj.className="button_ha";
    }
    InsertValueHidden(id,str);
}



// 当前值存入隐藏域
function InsertValueHidden(id,str)
{
    var obj=document.getElementById(id);
    if(obj.value=="")
    {
        obj.value=str;
        return;
    }
    var arr=obj.value.split(',');
    var index=-1;
    for(var i=0;i<arr.length;i++)
    {
        if(arr[i]!==""&&arr[i]==str)
        {
            index=i;
        }
    }
    if(index==-1)
    {
        arr.push(str); 
    }
    else
    {
        arr.splice(index,1);
    }
    obj.value=arr.join();
	
}

// 奇数
function GetOdd(start,end)
{
    var arr=new Array();
    for(var i=start;i<=end;i++)
    {
        if(i%2==1)
        {
            arr.push(i);
        }
    }
    return arr.join();
}
// 偶数
function GetEven(start,end)
{
    var arr=new Array();
    for(var i=start;i<=end;i++)
    {
        if(i%2==0)
        {
            arr.push(i);
        }
    }
    return arr.join();
}
// 质数
function GetPrime(start,end)
{
    var i,k;
    var arr = [];
    for(i=start; i<=end; i++){
      arr.push(i);
    }
    for(i=0; i<arr.length; i++){
      for(k=i+1; k<arr.length; k++){
        if(arr[k]%arr[i]==0&&i!=0){
          arr.splice(k,1);
        }
      }
    }
    return arr.join();
}
// 合数
function GetComposite(start,end)
{
    var i,k;
    var arr = [];
    var newarr=[];
    for(i=start; i<=end; i++){
      arr.push(i);
    }
    for(i=0; i<arr.length; i++){
      for(k=i+1; k<arr.length; k++){
        if(arr[k]%arr[i]==0&&i!=0){
          newarr.push(arr.splice(k,1));
        }
      }
    }
    return newarr.join();
}

// 0路
function GetZero(start,end)
{
    var arr=new Array();
    for(var i=start;i<=end;i++)
    {
        if(i%3==0)
        {
            arr.push(i);
        }
    }
    return arr.join();
}
// 1路
function GetOne(start,end)
{
    var arr=new Array();
    for(var i=start;i<=end;i++)
    {
        if(i%3==1)
        {
            arr.push(i);
        }
    }
    return arr.join();
}
// 2路
function GetTwo(start,end)
{
    var arr=new Array();
    for(var i=start;i<=end;i++)
    {
        if(i%3==2)
        {
            arr.push(i);
        }
    }
    return arr.join();
}


// 底部显示历史与现有数据统计
function showshiorcurrdata2(temp){
	if(temp.id=="lishi"){
		document.getElementById("yilouceng").style.display="none";
		document.getElementById("lishiyilouceng").style.display="";
		}else{
			document.getElementById("yilouceng").style.display="";
			document.getElementById("lishiyilouceng").style.display="none";
			}
	   // 如果是显示篮球区域
	  if(document.getElementById("lqfbxs").checked==true){
	        if(temp.value=="1"){
				areaDisplayOrnot('t',34,clonum,endclum+1,endclum+5,2);
	            areaDisplayOrnot('t',34,clonum,endclum-4,endclum,1); 
	        }else{
	            areaDisplayOrnot('t',34,clonum,endclum+1,endclum+5,1);
				areaDisplayOrnot('t',34,clonum,endclum-4,endclum,2);
	        }
	        
	    }else{
	    
	        // 不显示篮球区域
	            areaDisplayOrnot('t',34,clonum,endclum-4,endclum,2); 
	            areaDisplayOrnot('t',34,clonum,endclum+1,endclum+5,2);
	    }
	    
}

// 模拟选号显示控制
// 模拟选号的显示控制
function moxuan(obj1){
    obj=document.getElementById("moxuan");
    if(obj.style.display==""){
        obj.style.display="none";
    }else{
        obj.style.display=""
    }
    
    if(obj1.className == "mx_open"){
        obj1.className = "mx_close";
    }else if(obj1.className == "mx_close"){
        obj1.className = "mx_open";
    }
}
// 模拟选号的显示控制
function moxuan_label_xia(xia){
    if (xia == "1") {
        document.getElementById("mo3").style.display="";
        document.getElementById("mo4").style.display="";
        document.getElementById("mo5").style.display="";
        document.getElementById("moxuan2").style.display = "none";
    } else {
        document.getElementById("mo3").style.display="none";
        document.getElementById("mo4").style.display="none";
        document.getElementById("mo5").style.display="none";
        document.getElementById("moxuan2").style.display = "";
    }     
}
// 排序按钮功能
function paixu(img_obj){
	
	
	obj=document.getElementById("paixu_img")
	
	if(obj.value==""){		
		// alert("xia");
		window.location.href="?paixu=xia";		
	}else{
		// alert("aa");
		window.location.href="?paixu=";			
	}
	
}
function fan_qishu_img(obj,div_id){
	
	if(obj.src.indexOf("bg1.jpg")==-1){
		
		obj.src="../imgs/zoushi/bg1.jpg"
		
		}
		else{
			
			obj.src="../imgs/zoushi/bg2.jpg";
			}
	// alert(div_id);
	var menu=document.getElementById(div_id)
// if ( menu.style.display == "")
// {
// menu.style.display = "none"
// }
// else {
// menu.style.display = "inline"
// }
// }
	if   (   menu.style.display   ==   "inline")
    {   
    menu.style.display   =   "none"   
    }   
    else   {   
    menu.style.display   =   "inline"
    } 
	}

// 模拟选号按钮位置初实话
function mn_weizhi(){
	 document.getElementById("mn").style.left=document.getElementById("t").offsetWidth-23;
}

// 期号箭头初始化
function qh_jiantou(){
	var obj= new Array();
	obj=document.getElementsByName("img1");
	arrlenth=document.getElementsByName("img1").length;
	if(obj[0].style.display==""){
		for(i=0;i<arrlenth;i++){
			obj[i].style.display="none";
		}		
	}else{
		for(i=0;i<arrlenth;i++){
			obj[i].style.display="";
		}
	}
}

// 图表表格宽度赋值
function tb_width(t_width){
	var obj;
	obj=document.getElementById("t");
	// alert(screen.width );
	if(screen.width!=1440){
		obj.setAttribute("width",t_width); 
	}
	
}
// 广告条效果随鼠标滚动
/*
 * 参数说明 No1：控件的名称，需要不一样，爱加多少个随你喜欢 No2:控件初始时的top值
 * No3:控件初始时的left值，正值为相对左的left，负数为相对右边的值 new couplet("id",14,24);
 */
function couplet(){
	if(arguments.length>=1) this.objID = document.getElementById(arguments[0]);
	if(arguments.length>=2) this.divTop = arguments[1]-145;
	if(arguments.length>=3) this.divPlane = arguments[2];
	if(arguments.length>=4) this.scrollDelay = arguments[4];
	if(arguments.length>=5) this.waitTime = arguments[5];
	if(!this.objID){
	alert("对象名【"+ arguments[0] +"】无效，对联无法初始化，请检查对象名称是否正确！");
	this.objID = null; return;
	}else{
	this.objID.style.position="absolute";
	this.objID.style.display="block";
	this.objID.style.zIndex=9999;
	}
	if("" == this.objID.style.top){
	if(isNaN(this.divTop)){
	alert("对象垂直位置(top)参数必须为数字。"); return;
	}else{
	this.objID.style.top = this.divTop+"px";
	}
	}
	if("" == this.objID.style.left && "" == this.objID.style.right){
	if(isNaN(this.divPlane)){
	alert("对象水平位置(left||right)参数必须为数字。"); return;
	}
	if(this.divPlane>0) this.objID.style.left = this.divPlane+"px";
	if(this.divPlane<0) this.objID.style.right = Math.abs(this.divPlane)+"px";
	}
	if(this.scrollDelay<15 || isNaN(this.scrollDelay)) this.scrollDelay = 15;
	if(this.waitTime<500 || isNaN(this.waitTime)) this.waitTime = 500;
	if(arguments.length>=1) this.start();
	}
	couplet.prototype.start = function(){
	if(null == this.objID) return;
	var objCouplet = this;
	timer = this.scrollDelay;
	objCouplet.lastScrollY = 0;
	objCouplet.timerID = null;
	objCouplet.startID = function(){
	if("block" == objCouplet.objID.style.display){
	objCouplet.run();
	}else{
	clearInterval(objCouplet.timerID);
	}
	}
	objCouplet.Begin = function(){
	objCouplet.timerID = setInterval(objCouplet.startID,timer);
	}

	setTimeout(objCouplet.Begin,this.waitTime);
	}
	couplet.prototype.run = function(){
	if(parent.document.documentElement && parent.document.documentElement.scrollTop){
	uu_scrY = parseFloat(parent.document.documentElement.scrollTop);
		if(uu_scrY>1114){
			uu_scrY=1114;
		}
	}else if(parent.document.body){
	uu_scrY = parseFloat(parent.document.body.scrollTop);
		if(uu_scrY>1114){
			uu_scrY=1114;
		}
	}
	uu_divX = parseFloat(this.objID.style.top.replace("px",""));
	uu_curTop = .1 * (uu_scrY - this.lastScrollY);
	uu_curTop = uu_curTop>0?Math.ceil(uu_curTop):Math.floor(uu_curTop);
	this.objID.style.top = parseFloat(uu_divX + uu_curTop) + "px";
	this.lastScrollY += uu_curTop;
	}
	
	var updateTR="";
// 表格点击行变色
function overClass(trName) { 
    if (updateTR != "") {
        var tn1 = document.getElementById(updateTR);

        var tdlength1 = tn1.cells.length;
        for (var i = 0; i < tdlength1; i++) {
            var className = tn1.cells[i].className;
            tn1.cells[i].className = className.replace("backChange ", "");

            }
    }

    var tn = document.getElementById(trName);
    var tdlength = tn.cells.length;
    for (var i = 0; i < tdlength; i++) {
        tn.cells[i].className ="backChange " + tn.cells[i].className ;
    }
    updateTR = trName;
}

// 遗漏数据的显示控制
function showdata(startRow,regulate,startTd,endTd){
    var isBall="GoldBack BlackFont,GreenBack WhiteFont,BlueBack WhiteFont,RedBack WhiteFont,MaroonBack WhiteFont,backChange z_font_evendarkblue,backChange z_font_green,backChange z_font_orange,backChange z_font_ls,backChange z_font_red,backChange z_font_red,backChange z_font_hs_red,backChange z_font_hs_blue,backChange z_font_hs_orange,backChange z_font_cs,backChange z_font_hs,backChange z_font_ls,backChange z_bg_01,backChange z_bg_02,backChange z_bg_19,backChange z_font_ligtred,backChange z_font_darkblue,backChange z_font_purple,backChange q_red_ji,backChange q_red_fenlie,backChange z_font_green,backChange z_font_orange,backChange z_font_ls,backChange z_font_red,z_font_red,z_font_hs_red,z_font_hs_blue,z_font_hs_orange,z_font_cs,z_font_hs,z_font_ls,z_bg_01,z_bg_02,backChange z_bg_16,z_bg_19,backChange z_bg_blue_04_2,z_bg_19,z_font_ligtred,z_font_darkblue,z_font_purple,z_font_evendarkblue";
    var trs =document.getElementById("t").rows;
    var vtablebb = document.getElementById("t");    
    if (regulate == "") {
        regulate = 15;
    } 
               
    if(document.getElementById("bdylsj").checked==true){
        my_array=new Array();
        //不带遗漏数据
        var k=0;
        for(var i=startRow;i<trs.length-regulate;i++){
            for(var j=startTd;j<endTd;j++){
                var tmp = vtablebb.rows[i].cells[j];
                //判断是否是一个球
                if(isBall.indexOf(tmp.className)>=0){
                    continue;
                }else{
                    if(tmp.childNodes.length > 0 && isBall.indexOf(tmp.childNodes[0].className)>=0){
                        continue; 
                    } else {
                        k++;
                        tdAreaDisplayOrnot('t',i,j,1,k);
                    }
                }
            }
       }
   }else{
        var k=0;
        for(var i=startRow;i<trs.length-regulate;i++){
            for(var j=startTd;j<endTd;j++){
                var tmp = vtablebb.rows[i].cells[j];
                //判断是否是一个球
                if(isBall.indexOf(tmp.className)>=0){
                    continue;
                }else{
                    if(tmp.childNodes.length > 0 && isBall.indexOf(tmp.childNodes[0].className)>=0){
                        continue; 
                    } else {
                        k++;
                        tdAreaDisplayOrnot('t',i,j,2,k);
                    }
                }
           }          
       } 
   }
} 

// 遗漏分层
function yiloufenceng(tbodyId,startRow,regulate,startTd,endTd){
    var  vtablebb =document.getElementById("t"); 
    //取得当前的排序
    var isSort = isSortOrNot(tbodyId);    
    if(document.getElementById("ylfc").checked==true){
        //开始列,结束列 开始行,结束行    
        ylfcDisplayOrnot('t',startTd,endTd,vtablebb.rows.length - regulate,startRow,1, isSort);    
    }else{                     
        ylfcDisplayOrnot('t',startTd,endTd,vtablebb.rows.length - regulate,startRow,2, isSort);   
    }
}
 //隐藏或显示辅助线
function showspaceLine(tbodyId, startIndex, len, cssName){     
    var trs =document.getElementById(tbodyId).rows;     
    if(document.getElementById("fzx").checked == true){
        spaceLineshow=0;
    }else{
        spaceLineshow=1;
    }                           
    //取得当前的排序 
    var isSort = isSortOrNot(tbodyId);     
    if (!isSort) {
        for (var i = 0; i < trs.length; i++) {       
            if(trs[i].className == 'z_tr_hui_top' || trs[i].className == 'tdbckno_top'){
                if(spaceLineshow == 1){
                    lineDisplayOrnot(tbodyId,i,i,1,"top");
                }else{
                    lineDisplayOrnot(tbodyId,i,i,2,"top");
                }
            }
        } 
    } else {
        for (var i = trs.length - 1; i >= 0; i--) {   
            if(trs[i].className == 'z_tr_hui_top' || trs[i].className == 'tdbckno_top' ||
               trs[i].className == 'z_tr_hui_bottom' || trs[i].className == 'tdbckno_bottom') {
                if(spaceLineshow == 1){
                    lineDisplayOrnot(tbodyId,i,i,1,"bottom");
                }else{
                    lineDisplayOrnot(tbodyId,i,i,2,"bottom");
                }                        
            }
        } 
    }
    
    //分析参数
    var indexParam = getArrayFormString(startIndex);     
    var lenParam = getArrayFormString(len);
    var cssParam = getCssArrayFormString(cssName);      
    if (document.getElementById("dzx").checked == true
     && startIndex != "" && startIndex != undefined && startIndex != null) {
        //把页面上的线清空
        oZXZ.clear();
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

//判断是否是升序还是降序 
//返回值： true:降序，false:升序
function isSortOrNot(tbodyId) {
    var tbody =document.getElementById(tbodyId);
    var isSort = false;
    if (tbody.rows.length > 0) {
        var value = tbody.rows[0].cells[0].innerText; 
        if (value == "1") {
            //值为1时，是降序

            isSort = false;
        } else {
            //值不为1时，是升序

            isSort = true;
        }
    }
    return isSort;
} 

//隐藏或显示辅助线
function showspaceLine2(tbodys,showFlag){
    var spaceLineshow = showFlag;
    var trs =document.getElementById(tbodys).rows;
    
    for(i = 0; i < trs.length; i++)
　　{    
             
         if((trs[i].className=='z_tr_hui_bottom'||trs[i].className=='z_tr_fen_bottom')){
              if(spaceLineshow==1){
                  lineDisplayOrnot(tbodys.id,trs[i].id,trs[i].className,1);
                    
              }else{
                  lineDisplayOrnot(tbodys.id,trs[i].id,trs[i].className,2);
              }
         } else if ((i + 1 )%6==0 
            && (trs[i].className=='z_tr_hui'||trs[i].className=='z_tr_fen')){ 
              
              if(spaceLineshow==1){
                    lineDisplayOrnot(tbodys.id,trs[i].id,trs[i].className,1);
                    
              }else{  
                    lineDisplayOrnot(tbodys.id,trs[i].id,trs[i].className,2);
              }
         }
     } 
}

//隐藏辅助线
function unshowspaceLine(tbodyId){
    var tbodys = tbodyId.split(","); 
    
    for(var k=0;k<tbodys.length;k++) { 
        var tbody = document.getElementById(tbodys[k]);
        var colRows = tbody.rows;
        for(i = 0; i < colRows.length; i++)
    　　{   
            colRows[i].className='';
        } 
         
    }
}

//显示辅助线
function doshowspaceLine(tbodyId){
    
    var tbodys = tbodyId.split(",");      
    
    for(var k=0;k<tbodys.length;k++) { 
        var tbody = document.getElementById(tbodys[k]);
        var colRows = tbody.rows;
        for(i = 0; i < colRows.length; i++)
    　　{   
             if (i != 0 && i % 6 == 0)
                 colRows[i].className='tdbck';
         } 
         
    }                  
   
} 

// 带折现
function zhexian(tbody,startIndex, len, cssName){
    if (document.getElementById("dzx").checked == true) {
        onLoadLine(tbody, startIndex, len, cssName, 'clickCheckBox'); 
    } else {  
        objectZXZ.clear();
    }
}    	
function overClassDLC(trName) {
    if (updateTR != '') {
        var tn1 = document.getElementById(updateTR);
        var tdlength1 = tn1.cells.length;
        if(fenceng==1){
            for (var i = 0; i < tdlength1; i++) {
                var className = tn1.cells[i].className;
                if(className ==" b10 "){
                    tn1.cells[i].style.backgroundColor="";
                    tn1.cells[i].style.backgroundColor="#d6e1f6";
                }else if(tn1.cells[i].className =="borbottom b10 "){
                    tn1.cells[i].style.backgroundColor="";
                    tn1.cells[i].style.backgroundColor="#d6e1f6";
                }else{
                    var className = tn1.cells[i].className;
                    tn1.cells[i].className = className.replace("backChange", "");
                } 
            }
        }else{
            for (var i = 0; i < tdlength1; i++) {
                var className = tn1.cells[i].className;
                if(className ==" b10 "){
                    tn1.cells[i].style.backgroundColor="";
                    tn1.cells[i].style.backgroundColor="#FFF3E2";
                }else if(tn1.cells[i].className =="borbottom b10 "){
                    tn1.cells[i].style.backgroundColor="";
                    tn1.cells[i].style.backgroundColor="#FFF3E2";
                }else{
                    tn1.cells[i].className = className.replace("backChange", "");
                }
            }
        }
    }
    var tn = document.getElementById(trName);
    var tdlength = tn.cells.length;

    for (var i = 0; i < tdlength; i++) {
        if(tn.cells[i].className==" b10 "){
            tn.cells[i].style.backgroundColor="";
            tn.cells[i].style.backgroundColor="#DDDDDD";
        }else if(tn.cells[i].className =="borbottom b10 "){
            tn.cells[i].style.backgroundColor="";
            tn.cells[i].style.backgroundColor="#DDDDDD";
        }else{
            tn.cells[i].className = tn.cells[i].className + " backChange";
        }
    } 
    updateTR = trName;
} 

// 显示历史统计或是当前统计		
function showHisOrCurData(obj){
    if(obj.value==0){
        for(var i = 1;i<=5;i++){
           var currentId = 'currentData' + i;
           var historyDataId = 'historyData' + i;
           var current = document.getElementById(currentId);
           var history = document.getElementById(historyDataId);
           
           current.style.display="";
           history.style.display="none"; 
        } 	
    }else if(obj.value==1){
        for(var i = 1;i<=5;i++){
           var currentId = 'currentData' + i;
           var historyDataId = 'historyData' + i; 
           var current = document.getElementById(currentId);
           var history = document.getElementById(historyDataId);
           
           current.style.display="none";
           history.style.display="";
        }  
    }
}

             
// 预览代码的拷贝             
function docopy(){
    var Url2=document.getElementById("copytext");
    Url2.select();
    document.execCommand("Copy"); //执行浏览器复制命令
}

// 图表嵌套的预览            
function doPreview(){
    window.open("preview.html","","");//打开预览画面
}

//点击历史上的今天的按钮
function lishiSubmit(type) {
    var pageHtml = document.getElementById("pageHtml").value;                                                                        
    if ("qishu" == type) {
        var lishi_qishu = document.getElementById("lishi_qishu").value;
        var re = /^[0-9]*$/;            
        if (!re.test(lishi_qishu)) {
            alert("请输入0-9的数字！");
            document.getElementById("lishi_qishu").select();
            return false;
        }
        window.location.href = pageHtml + '-2-4-' + lishi_qishu + '.html'; 
    } else if ("riqi" == type) {
        var month = document.getElementById("lishi_yue").value;
        var day = document.getElementById("lishi_ri").value;
        var lishi_riqi = month + "_" + day; 
        window.location.href = pageHtml + '-2-5-' + lishi_riqi + '.html';
    } else if ("xingqi" == type) {
        var xingqiji = new Array("一", "二", "三", "四", "五", "六", "日");    
        var lishi_xingqi = document.getElementById("lishi_xingqi").value; 
        var index = 0;
        for (var i = 0; i < xingqiji.length; i++) {
            if (lishi_xingqi == xingqiji[i]) {
                index = i;
                break;
            }
        }
        window.location.href = pageHtml + '-2-6-' + index + '.html'; 
    } else if ("yinli_riqi" == type) {
        var lishi_yinli_yue = document.getElementById("lishi_yinli_yue").selectedIndex + 1;
        var lishi_yinli_ri = document.getElementById("lishi_yinli_ri").selectedIndex + 1;
        window.location.href = pageHtml + '-7-'+lishi_yinli_yue+'-' + lishi_yinli_ri + '.html'; 
    }
              
}

//月的下拉框
function monthChangedEvent() {
 
    var year = document.getElementById("lishi_nian").value;
    var month = document.getElementById("lishi_yue").value;
    
    var riArray = Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31");
    var tempArray = new Array("04", "06", "09", "11");
    
    var count = riArray.length;
    var isXiaoYue = false;
    for (var i = 0; i < tempArray.length; i++) {
        if (month == tempArray[i]) {
            isXiaoYue = true;
            break;
        }
    }
    if (isXiaoYue) {
        //30天的月的计算
        count = riArray.length - 1;
    } else if (month == "02") {
        //2月的计算
        if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
            //闰年
            count = riArray.length - 2;  
        } else {
            count = riArray.length - 3;  
        }
    }
    document.getElementById("lishi_ri").options.length = 0;
    for(var i = 0; i < count; i++){
        var item = document.createElement("OPTION"); 
        item.value = riArray[i];   
        item.text = riArray[i];
        document.getElementById("lishi_ri").options.add(item); 
    }
}

//屏蔽js错误
function killErrors() {
	return true;
	}
	window.onerror = killErrors;
    
//重加载线
function dlteasytabs( lineReloadParam) {
                      
        if (lineReloadParam != undefined && lineReloadParam != null && lineReloadParam != "") {
            
            var lineParam = lineReloadParam.split("#");
            var tbodyId = lineParam[0];
            var startIndex = lineParam[1];
            var len = lineParam[2];
            var cssName = lineParam[3];
            
            //分析参数
            var indexParam = getArrayFormString(startIndex);     
            var lenParam = getArrayFormString(len);
            var cssParam = getCssArrayFormString(cssName);
        
            //把页面上的线清空
            oZXZ.clear();
            if (document.getElementById("dzx").checked == true) {
                //重新加载线
                objectZXZ = oZXZ.bind(tbodyId, cssParam);
                for (var i = 0; i < indexParam.length; i++) {
                    objectZXZ.add(indexParam[i], 0, lenParam[i], 0);
                }
                objectZXZ.draw(ESUNChart.ini.default_has_line);
            }
        }
    }