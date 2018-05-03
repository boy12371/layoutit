/*
确定一个td是否是一个球  是：返回球的classname 否：返回""
clsname:一个td所具有的样式
*/
function CertainBeBall(clsname){
	if(clsname==undefined || clsname=="")
		return "";
	//判断区域内球所有可能的样式
	var arrayObj = new Array('z_font_red','z_font_hs_red','z_font_hs_blue','z_font_hs_orange','z_font_cs','z_font_hs','z_font_ls','z_bg_01','z_bg_02','z_bg_19','z_font_ligtred','z_font_darkblue','z_font_purple','z_font_evendarkblue');
	for(m=0;m<arrayObj.length;m++){
		tmp = arrayObj[m];
		if(clsname.indexOf(tmp)!=-1){
			return tmp;
		}
	}
	return "";
}
/*
直连函数
tableid:表的id
begincol:开始列
endcol:结束列
beginclum:开始行
endclum:结束行
Hclsnam:横方向classname
Sclsnam:竖方向classname
*/
function zhilian(tableid,begincol,endcol,beginclum,endclum,Hclsnam,Sclsnam,qiushu){
	var vtable = document.getElementById(tableid);
	 //开始行
	/*for(i=beginclum;i<=endclum;i++){
		for(j=begincol;j<=endcol;j++){ //开始列
			var tmpa = vtable.rows[i].cells[j];   //rows cell 从0开始
			
			var tmpacn = CertainBeBall(tmpa.className);
			
			if(tmpacn==Hclsnam || tmpacn==""){
				continue;
			}else if(tmpacn!=Hclsnam){
				
				zhiliansetH(vtable,i,j,1,Hclsnam,endcol,qiushu);
				
			}
		}
	}*/
	//开始行到结束行
	
	for(ki=beginclum;ki<=endclum;ki++){
		//开始列
		for(kj=begincol;kj<=endcol;kj++){
			var tmpb = vtable.rows[ki].cells[kj];
			var tmpbcn = CertainBeBall(tmpb.className);
			
			if(tmpbcn==Sclsnam ||tmpbcn==""){
				continue;
			}else if(tmpbcn!=Sclsnam){
				zhiliansetS(vtable,ki,kj,1,Sclsnam,endclum,qiushu);
			}
		}
	}
}
/*
直连横坐标探索
*/
function zhiliansetH(vtable,vi,vj,num,Hclsnam,endcol,qiushu){
	try{
		if(vj+1>endcol) throw "border";
		var vt = vtable.rows[vi].cells[vj+1];
		var vtcn = CertainBeBall(vt.className);
		var trc= vtable.rows[vi];
         
		if(vtcn!=""){   //找到 继续探索
			zhiliansetH(vtable,vi,vj+1,num+1,Hclsnam,endcol,qiushu);	
		}else{   //没有找到指定calssname
			if(num>=qiushu){  //替换样式
				for(j=vj;j>vj-num;j--){
					tmpH = (vtable.rows[vi].cells[j]).className;
					//(vtable.rows[vi].cells[j]).className = tmpH.replace(CertainBeBall(tmpH),Hclsnam);
					vtable.rows[vi].cells[j].className=Hclsnam;
					
				}
			}
		}
	}catch(e){
		//alert(e.name + ": " + e.message);
		if(num>=qiushu){  //替换样式
			for(j=vj;j>vj-num;j--){
				tmpH = (vtable.rows[vi].cells[j]).className;
				//(vtable.rows[vi].cells[j]).className = tmpH.replace(CertainBeBall(tmpH),Hclsnam);
				vtable.rows[vi].cells[j].className=Hclsnam;
			}
		}
	}
	return;
}
/*
直连竖坐标探索
*/ //qiushu当
function zhiliansetS(vtable,vi,vj,num,Sclsnam,endclum,qiushu){
	try{
		 //如果是有辅助线的话num的值要相对减少一个
		if(vi+1>endclum) throw "border";
		var vt = vtable.rows[vi+1].cells[vj]; //看看下一行的同列是否是个出球号
		var vtcn = CertainBeBall(vt.className);
		//if("tdbck"==vtable.rows[vi].className){
		//		qiushu++;
		//	 }
		if(vtcn!=""){   //找到 继续探索
			
			zhiliansetS(vtable,vi+1,vj,num+1,Sclsnam,endclum,qiushu);
			
		}else{   //没有找到指定calssname   
			if(num>=qiushu){  //替换样式
				for(i=vi;i>vi-num;i--){ 
					tmpS = (vtable.rows[i].cells[vj]).className;
					//(vtable.rows[i].cells[vj]).className = tmpS.replace(CertainBeBall(tmpS),Sclsnam);
					vtable.rows[i].cells[vj].className=Sclsnam;
				}
			}
		}
	}catch(e){
		if(num>=qiushu){  //替换样式
			for(i=vi;i>vi-num;i--){
				tmpS = (vtable.rows[i].cells[vj]).className;
				//(vtable.rows[i].cells[vj]).className = tmpS.replace(CertainBeBall(tmpS),Sclsnam);
				vtable.rows[i].cells[vj].className=Sclsnam;
			}
		}
	}	
	return;
}
/////////////////////////////////
/*
斜连函数
tableid:表的id
begincol:开始列
endcol:结束列
beginclum:开始行
endclum:结束行
Rclsnam:右下方classname
Lclsnam:左下方classname
*/

function xielian(tableid,begincol,endcol,beginclum,endclum,Rclsnam,Lclsnam,qiushu){
var vtable = document.getElementById(tableid);

	for(i=beginclum;i<=endclum;i++){//开始行
		for(j=begincol;j<=endcol;j++){ //开始列
			var tmpa = vtable.rows[i].cells[j];
			var tmpacn = CertainBeBall(tmpa.className);     
			if(tmpacn==Rclsnam || tmpacn==""){
				continue;
			}else if(tmpacn!=Rclsnam){
				xieliansetR(vtable,i,j,1,Rclsnam,endcol,endclum,qiushu);
			}
			
		}
	}
	for(ki=beginclum;ki<=endclum;ki++){
		for(kj=begincol;kj<=endcol;kj++){
			var tmpb = vtable.rows[ki].cells[kj];
			var tmpbcn = CertainBeBall(tmpb.className);
			if( tmpbcn==""){
				continue;
			}else{
				xieliansetL(vtable,ki,kj,1,Lclsnam,begincol,endclum,qiushu);
			}
		}
	}
}
/*
右下135度坐标探索
*/
function xieliansetR(vtable,vi,vj,num,Rclsnam,endcol,endclum,qiushu){
	try{
		//如果大与结束列 或者大于结束行
		if(vj+1>endcol || vi+1>endclum) throw "border";
		var vt = vtable.rows[vi+1].cells[vj+1]; //下一行的的下一个列
		var vtcn = CertainBeBall(vt.className); //判断是否是球
		  //如果下一行为辅助线球数就加一
		//if("tdbck"==vtable.rows[vi+1].className){
		//		qiushu++;
				//alert("aaaaaaa");
		//}
		
       
		if(vtcn!=""){   //找到 继续探索
			
			xieliansetR(vtable,vi+1,vj+1,num+1,Rclsnam,endcol,endclum,qiushu);	
			
		}else{   //没有找到指定calssname
		     //alert("num--->"+num+"qiushu--->"+qiushu);
			if(num>=qiushu){  //替换样式
			 
				for(k=0;k<num;k++){
					
					tmpH = vtable.rows[vi-k].cells[vj-k].className;
					(vtable.rows[vi-k].cells[vj-k]).className = tmpH.replace(CertainBeBall(tmpH),Rclsnam);
					//vtable.rows[vi-k].cells[vj-k].className=Rclsnam;
					
				}
			}
		}
	}catch(e){
		
		if(num>=qiushu){  //替换样式
			for(k=0;k<num;k++){
				tmpH = vtable.rows[vi-k].cells[vj-k].className;
				(vtable.rows[vi-k].cells[vj-k]).className = tmpH.replace(CertainBeBall(tmpH),Rclsnam);
				//vtable.rows[vi-k].cells[vj-k].className=Rclsnam;
			}
		}
	}	
	return;
}
/*
左下225度坐标探索
*/
function xieliansetL(vtable,vi,vj,num,Lclsnam,begincol,endclum,qiushu){
	try{
		if(vj-1<begincol || vi+1>endclum) throw "border";
		var vt = vtable.rows[vi+1].cells[vj-1];
		var vtcn = CertainBeBall(vt.className);
		if(vtcn!=""){   //找到 继续探索
		
			xieliansetL(vtable,vi+1,vj-1,num+1,Lclsnam,begincol,endclum,qiushu);	
		}else{   //没有找到指定calssname
			if(num>=qiushu){  //替换样式
				for(k=0;k<num;k++){
					tmpH = vtable.rows[vi-k].cells[vj+k].className;
					(vtable.rows[vi-k].cells[vj+k]).className = tmpH.replace(CertainBeBall(tmpH),Lclsnam);
					//vtable.rows[vi-k].cells[vj+k].className=Lclsnam;
				}
			}
		}
	}catch(e){
		if(num>=qiushu){  //替换样式
			for(k=0;k<num;k++){
				tmpH = vtable.rows[vi-k].cells[vj+k].className;
				(vtable.rows[vi-k].cells[vj+k]).className = tmpH.replace(CertainBeBall(tmpH),Lclsnam);
				//vtable.rows[vi-k].cells[vj+k].className=Lclsnam;
			}
		}
	}
	return;
}
////////////////////////////
/*
奇数偶数连函数
tableid:表的id
begincol:开始列（从1开始）
endcol:结束列
beginclum:开始行
endclum:结束行
Rclsnam:右下方classname
Lclsnam:左下方classname
pluscol：奇数偶数偏移(奇数为0，偶数为1）
*/
function OddEvenlian(tableid,begincol,endcol,beginclum,endclum,Rclsnam,Lclsnam,pluscol,qiushu){
    var vtable = document.getElementById(tableid);
    for(i=beginclum;i<=endclum;i++){
        for(j=(begincol+pluscol);j<=endcol;j=j+2){
            var tmpa = vtable.rows[i].cells[j];
            var tmpacn = CertainBeBall(tmpa.className);
            if(tmpacn==Rclsnam || tmpacn==""){    
                continue;
            }else if(tmpacn!=Rclsnam){   
                OddEvenliansetR(vtable,i,j,1,Rclsnam,endcol,endclum ,qiushu);
            }  
        }
    }
    for(ki = beginclum; ki <= endclum; ki++){
        for(kj = (begincol+pluscol); kj <= endcol; kj=kj+2){
            var tmpa = vtable.rows[ki].cells[kj];
            var tmpacn = CertainBeBall(tmpa.className);                                  
            if(tmpacn==Lclsnam || tmpacn==""){   
                continue;
            }else{                    
                OddEvenliansetL(vtable,ki,kj,1,Lclsnam,begincol,endclum,qiushu);
            } 
        } 
    }
}
/*
右下坐标探索
*/
function OddEvenliansetR(vtable,vi,vj,num,Rclsnam,endcol,endclum,qiushu){
	try{
		if(vj+2>endcol || vi+1>endclum) throw "border";
		var vt = vtable.rows[vi+1].cells[vj+2];
		var vtcn = CertainBeBall(vt.className);
		if(vtcn!=""){   //找到 继续探索
			OddEvenliansetR(vtable,vi+1,vj+2,num+1,Rclsnam,endcol,endclum,qiushu);	
		}else{   //没有找到指定calssname
			if(num>=qiushu){  //替换样式
				for(k=0;k<num;k++){
					tmpH = (vtable.rows[vi-k].cells[vj-2*k]).className;
					(vtable.rows[vi-k].cells[vj-2*k]).className = tmpH.replace(CertainBeBall(tmpH),Rclsnam);
					//vtable.rows[vi-k].cells[vj-2*k].className=Rclsnam;
				}
			}
		}
	}catch(e){
		if(num>=qiushu){  //替换样式
			for(k=0;k<num;k++){
				tmpH = (vtable.rows[vi-k].cells[vj-2*k]).className;
				(vtable.rows[vi-k].cells[vj-2*k]).className = tmpH.replace(CertainBeBall(tmpH),Rclsnam);
				//vtable.rows[vi-k].cells[vj-2*k].className=Rclsnam;
			}
		}
	}	
	return;
}
/*
左下坐标探索
*/
function OddEvenliansetL(vtable,vi,vj,num,Lclsnam,begincol,endclum,qiushu){
	try{
		if(vj-2<begincol || vi+1>endclum) throw "border";
		var vt = vtable.rows[vi+1].cells[vj-2];
		var vtcn = CertainBeBall(vt.className);
		if(vtcn!=""){   //找到 继续探索
			OddEvenliansetL(vtable,vi+1,vj-2,num+1,Lclsnam,begincol,endclum,qiushu);	
		}else{   //没有找到指定calssname
			if(num>=qiushu){  //替换样式
				for(k=0;k<num;k++){
					tmpH = (vtable.rows[vi-k].cells[vj+2*k]).className;
					(vtable.rows[vi-k].cells[vj+2*k]).className = tmpH.replace(CertainBeBall(tmpH),Lclsnam);
					//vtable.rows[vi-k].cells[vj+2*k].className=Lclsnam;
				}
			}
		}
	}catch(e){
		if(num>=qiushu){  //替换样式
			for(k=0;k<num;k++){
				tmpH = (vtable.rows[vi-k].cells[vj+2*k]).className;
				(vtable.rows[vi-k].cells[vj+2*k]).className = tmpH.replace(CertainBeBall(tmpH),Lclsnam);
				//vtable.rows[vi-k].cells[vj+2*k].className=Lclsnam;
			}
		}
	}
	return;
}
///////////////////////////////
/*
清除连函数
tableid:表的id
begincol:开始列
endcol:结束列
beginclum:开始行
endclum:结束行
oldclsnam:被替换classname
newclsnam:用来替换的classname
*/
function clearlian(tableid,begincol,endcol,beginclum,endclum,oldclsnam,newclsnam){
	var vtable = document.getElementById(tableid);
	for(i=beginclum;i<=endclum;i++){
		for(j=begincol;j<=endcol;j++){
			var tmpa = vtable.rows[i].cells[j];
			var tmpacn = CertainBeBall(tmpa.className);
			//alert("new"+tmpacn);
			//alert(oldclsnam);
			if(tmpacn==oldclsnam){
				tmpH = tmpa.className;
				tmpa.className = tmpH.replace(CertainBeBall(tmpH),newclsnam);
				tmpa.className=newclsnam;
			}
		}
	}
}
/*
对指定表格的指定范围内做显示和隐藏操作
tableid:表的id
begincol:开始列
endcol:结束列
beginclum:开始行
endclum:结束行
suclsnam:被替换classname的后缀
flag: 1显示 0隐藏
*/
function BallDisplayornot(tableid,begincol,endcol,beginclum,endclum,suclsnam,flag){
	var vtable = document.getElementById(tableid);
	if(flag==1){
		for(i=beginclum;i<=endclum;i++){
			for(j=begincol;j<=endcol;j++){
				var tmpa = vtable.rows[i].cells[j];
				if(tmpa.className!=""){
					tmp = tmpa.className ;
					tmp = tmp.substring(0,tmp.lastIndexOf(suclsnam));
					tmpa.className = tmp;
				}else{
					continue;
				}
			}
		}
	}else{
		for(i=beginclum;i<=endclum;i++){
			for(j=begincol;j<=endcol;j++){
				var tmpa = vtable.rows[i].cells[j];
				if(tmpa.className!=""){
					tmp = tmpa.className + suclsnam;
					tmpa.className = tmp;
				}else{
					continue;
				}
			}
		}
	}	
}

/////////////////////////
/*
同出号函数
tableid:表的id
begincol:开始列
endcol:结束列
beginclum:开始行
endclum:结束行
num:当前号
*/
function tongchu(tableid,begincol,endcol,beginclum,endclum,num){
	var vtable = document.getElementById(tableid);
	var numlength = endcol-begincol+1;
	var allnums=new Array(numlength);
	for(si=0;si<numlength;si++)
		allnums[si]=0;
	for(i=beginclum;i<=endclum;i++){
		var tmpa = vtable.rows[i].cells[num+begincol-1];
		var tmpacn = CertainBeBall(tmpa.className);
		if(tmpacn!=""){
			for(k=begincol;k<=endcol;k++){
				var tmpb = vtable.rows[i].cells[k];
				var tmpbcn = CertainBeBall(tmpb.className);
				if(tmpbcn!=""){
					allnums[k-begincol] = allnums[k-begincol] +1;
				}
			}
		}else{
			continue;
		}
	}
	return allnums;
}
/*
相斥号函数
tableid:表的id
begincol:开始列
endcol:结束列
beginclum:开始行
endclum:结束行
num:当前号
*/
function xiangchi(tableid,begincol,endcol,beginclum,endclum,num){
	var vtable = document.getElementById(tableid);
	var numlength = endcol-begincol+1;
	var allnums=new Array(numlength);
	for(si=0;si<numlength;si++)
		allnums[si]=0;
	for(i=beginclum;i<=endclum;i++){
		var tmpa = vtable.rows[i].cells[num+begincol-1];
		var tmpacn = CertainBeBall(tmpa.className);
		if(tmpacn!=""){
			for(k=begincol;k<=endcol;k++){
				var tmpb = vtable.rows[i].cells[k];
				var tmpbcn = CertainBeBall(tmpb.className);
				if(tmpbcn=="" || k==(num+begincol-1)){
					allnums[k-begincol] = allnums[k-begincol] +1;
				}
			}
		}else{
			continue;
		}
	}
	return allnums;
}
/*
获得本期遗漏的值
tableid:表的id
begincol:开始列
endclum:最近行
offset:偏移量
*/
function getCurrentMiss(tableid,begincol,endclum,offset){
	var vtable = document.getElementById(tableid);
	var tmp = vtable.rows[endclum].cells[begincol+offset];
	var tmpcn = CertainBeBall(tmp.className);
	if(tmpcn!="")
		return 0;
	else
		return tmp.innerText;	
} 
/*
获得最大遗漏值
tableid:表的id
begincol:开始列
beginclum:开始行
endclum:结束行
offset:偏移量
*/
function getMaxMiss(tableid,begincol,beginclum,endclum,offset){
	var rnum = 0;
	var vtable = document.getElementById(tableid);
	for(i=beginclum;i<=endclum;i++){
		var tmp = vtable.rows[i].cells[begincol+offset];
		var tmpcn = tmp.className;
		if(tmpcn!=" backTD7" && tmpcn!="borbottom backTD7")
		{
			continue;
		}
		else{
			var vv = parseInt(tmp.innerText);
			if(vv>rnum)
			{
				rnum = vv;
			}
		}	
	}
	return rnum;
}
/*
获得最大遗漏连的次数 （通过计算Text为1获得）
tableid:表的id
begincol:开始列
beginclum:开始行
endclum:结束行
offset:偏移量
*/
function getMisslinkNum(tableid,begincol,beginclum,endclum,offset){
	var rnum = 0;
	var vtable = document.getElementById(tableid);
	for(i=beginclum;i<=endclum;i++){
		var tmp = vtable.rows[i].cells[begincol+offset];
		var tmpcn = CertainBeBall(tmp.className);
		if(tmpcn!="")
			continue;
		else{
			var vv = parseInt(tmp.innerText);
			if(vv==1)
				rnum = rnum + 1;
		}	
	}
	return rnum;
}
/*
获得球在本期出现次数 或 未出现次数
tableid:表的id
begincol:开始列
beginclum:开始行
endclum:结束行
offset:偏移量
showflag: 1:统计出现 2:统计未出现
*/
function getShowOrNotNum(tableid,begincol,beginclum,endclum,offset,showflag){
	var rnum = 0;
	var vtable = document.getElementById(tableid);
	for(i=beginclum;i<=endclum;i++){
		var tmp = vtable.rows[i].cells[begincol+offset];
		var tmpcn = CertainBeBall(tmp.className);
		if(tmpcn!="" && showflag==1){
			rnum = rnum +1;
		}
		else if(tmpcn=="" && showflag==2){
			rnum = rnum + 1;
		}	
	}
	return rnum;
}
/*
去一个数返回指定的几位小数
numberRound:一个小数
roundDigit:指定小数位数
*/
function roundFun(numberRound,roundDigit)
{
    var digit;
	digit=1;
	digit=Math.pow(10,roundDigit)
	return (Math.round(numberRound*digit)/digit);
}
/////////////////////////////////
/*
获得热号,并统计出现次数
tableid:表的id
begincol:开始列
endcol:结束列
beginclum:开始行
endclum:结束行
colsize:计算几期
showtimes:出现次数要求  红球3次
*/
function getHotNum(tableid,begincol,endcol,beginclum,endclum,colsize,showtimes){
	var vtable = document.getElementById(tableid);
	var numlength = endcol-begincol+1;
	var allnums=new Array(numlength);
	for(i=begincol;i<=endcol;i++){
		var tt = 0;
		for(j=endclum;j>endclum-colsize;j--){
			var tmpa = vtable.rows[j].cells[i];
			var tmpacn = CertainBeBall(tmpa.className);
			if(tmpacn!=""){
				tt = tt+1;
			}
		}
		if(tt>=showtimes){
			tt = getBallShowNum(tableid,begincol,beginclum,endclum,i-begincol);
		}
		allnums[i-begincol]=tt;
	}
	return allnums;
}
/*
获得冷号,并统计出现次数
tableid:表的id
begincol:开始列
endcol:结束列
beginclum:开始行
endclum:结束行
colsize:计算几期
showtimes:未出现次数要求  
*/
function getColdNum(tableid,begincol,endcol,beginclum,endclum,colsize,showtimes){
	var vtable = document.getElementById(tableid);
	var numlength = endcol-begincol+1;
	var allnums=new Array(numlength);
	for(xx=0;xx<numlength;xx++)
		allnums[xx]=0;
	for(i=begincol;i<=endcol;i++){
		var tt = 0;
		for(j=endclum;j>endclum-colsize;j--){
			var tmpa = vtable.rows[j].cells[i];
			var tmpacn = CertainBeBall(tmpa.className);
			if(tmpacn==""){
				tt = tt+1;
			}
		}
		if(tt>=showtimes){   //为出现次数达到要求
			tt = getBallShowNum(tableid,begincol,beginclum,endclum,i-begincol);
			allnums[i-begincol]=tt;
		}
	}
	return allnums;
}
/*
获得横连号,并统计出现次数
tableid:表的id
begincol:开始列
endcol:结束列
beginclum:开始行
endclum:结束行
*/
function getHengNum(tableid,begincol,endcol,beginclum,endclum){
	var vtable = document.getElementById(tableid);
	var numlength = endcol-begincol+1;
	var allnums=new Array(numlength);
	for(xx=0;xx<numlength;xx++)
		allnums[xx]=0;
	for(i=begincol;i<=endcol;i++){
		var tmp = vtable.rows[endclum].cells[i];
		var tmpcn = CertainBeBall(tmp.className);
		if(tmpcn!=""){
			var tx = 1;
			while(true){
				if(i+tx>endcol){  //超出边界
					if(tx>=3){
						for(kk=0;kk<tx;kk++){
							allnums[i-begincol+kk]=getBallShowNum(tableid,begincol,beginclum,endclum,i-begincol+kk);
						}
						i = i + tx - 1 ;
					}
					break;
				}
				var tmpa = vtable.rows[endclum].cells[i+tx];
				var tmpacn = CertainBeBall(tmpa.className);
				if(tmpacn!=""){
					tx++;
					continue;
				}else{   //结束
					if(tx>=3){
						for(kk=0;kk<tx;kk++){
							allnums[i-begincol+kk]=getBallShowNum(tableid,begincol,beginclum,endclum,i-begincol+kk);
						}
						i = i + tx - 1 ;
					}
					break;
				}
			}	
		}
	}
	return allnums;
}
/*
获得竖连号,并统计出现次数
tableid:表的id
begincol:开始列
endcol:结束列
beginclum:开始行
endclum:结束行
neednum:需要重复次数
*/
function getShuNum(tableid,begincol,endcol,beginclum,endclum,neednum){
	var vtable = document.getElementById(tableid);
	var numlength = endcol-begincol+1;
	var allnums=new Array(numlength);
	for(xx=0;xx<numlength;xx++)
		allnums[xx]=0;
	for(i=begincol;i<=endcol;i++){
		var tmp = vtable.rows[endclum].cells[i];
		var tmpcn = CertainBeBall(tmp.className);
		var tx = 1;
		if(tmpcn!=""){
			while(true){
				var tmpa = vtable.rows[endclum-tx].cells[i];
				var tmpacn = CertainBeBall(tmpa.className);
				if(tmpacn!=""){
					tx++;
					continue;
				}else{
					break;
				}
			}
		}
		if(tx>=neednum){
			allnums[i-begincol]=getBallShowNum(tableid,begincol,beginclum,endclum,i-begincol);
		}
	}
	return allnums;	
}
/*
获得斜连号,并统计出现次数
tableid:表的id
begincol:开始列
endcol:结束列
beginclum:开始行
endclum:结束行
neednum:需要重复次数
*/
function getXieNum(tableid,begincol,endcol,beginclum,endclum,neednum){
	var vtable = document.getElementById(tableid);
	var numlength = endcol-begincol+1;
	var allnums=new Array(numlength);
	for(xx=0;xx<numlength;xx++)
		allnums[xx]=0;
	for(i=begincol;i<=endcol;i++){
		var tmp = vtable.rows[endclum].cells[i];
		var tmpcn = CertainBeBall(tmp.className);
		var tx = 1;
		if(tmpcn!=""){
			while(true){
				var tmpa = vtable.rows[endclum-tx].cells[i-tx];
				var tmpacn = CertainBeBall(tmpa.className);
				if(tmpacn!=""){
					tx++;
					if(tx==3) break;
					else continue;
				}else{
					break;
				}
			}
		}
		if(tx>=neednum){
			allnums[i-begincol]=getBallShowNum(tableid,begincol,beginclum,endclum,i-begincol);
		}
	}
	for(i=begincol;i<=endcol;i++){
		var tmp = vtable.rows[endclum].cells[i];
		var tmpcn = CertainBeBall(tmp.className);
		var tx = 1;
		if(tmpcn!=""){
			while(true){
				var tmpa = vtable.rows[endclum-tx].cells[i+tx];
				var tmpacn = CertainBeBall(tmpa.className);
				if(tmpacn!=""){
					tx++;
					if(tx==3) break;
					else continue;
				}else{
					break;
				}
			}
		}
		if(tx>=neednum){
			allnums[i-begincol]=getBallShowNum(tableid,begincol,beginclum,endclum,i-begincol);
		}
	}
	return allnums;	
}
/*
获得某个球的出现次数
tableid:表的id
begincol:开始列
beginclum:开始行
endclum:结束行
offset:偏移量
*/
function getBallShowNum(tableid,begincol,beginclum,endclum,offset){
	var vtablebb = document.getElementById(tableid);
	var rnum = 0;
	for(ki=beginclum;ki<=endclum;ki++){
		var tmpb = vtablebb.rows[ki].cells[begincol+offset];
		var tmpbcn = CertainBeBall(tmpb.className);
		if(tmpbcn!=""){
			rnum = rnum+1;
		}
	}
	return rnum;
}

///////////////////////////////////

/*
在table的指定范围内 做显示或隐藏操作
tableid:表的id
begincol:开始列
endcol:结束列
beginclum:开始行
endclum:结束行
showflag: 1显示 2隐藏
*/
function areaDisplayOrnot(tableid,begincol,endcol,beginclum,endclum,showflag){
	var vtablebb = document.getElementById(tableid);
	
	if(showflag==1){   //显示
		for(i=beginclum;i<=endclum;i++){
			for(j=begincol;j<=endcol;j++){
				var tmp = vtablebb.rows[i].cells[j];
				tmp.style.display="";
			}
		}
	}else{   //隐藏
		for(i=beginclum;i<=endclum;i++){
			for(j=begincol;j<=endcol;j++){
				var tmp = vtablebb.rows[i].cells[j];                         
				 tmp.style.display="none";
			}
		}
	}
}

function objDisplayOrnot(yiquObjName,yiquObjCount,erquObjName,erquObjCount,showflag){ 
    var showObg =  document.getElementById(showflag);
       
    if(showObg.checked){   //显示
        for(var i = 0;i < erquObjCount;i++){
            var obj = erquObjName + i;
            var tmp = document.getElementById(obj); 
            tmp.style.display=""; 
        }
        for(var i = 0;i < yiquObjCount;i++){
            var obj = yiquObjName + i;
            var tmp = document.getElementById(obj); 
            tmp.style.display="none"; 
        }
    }else{   //隐藏
        for(var i = 0;i < erquObjCount;i++){
            var obj = erquObjName + i;
            var tmp = document.getElementById(obj); 
            tmp.style.display="none"; 
        }
        for(var i = 0;i < yiquObjCount;i++){
            var obj = yiquObjName + i;
            var tmp = document.getElementById(obj); 
            tmp.style.display=""; 
        }
    }
}

///////////////////
/*
确定一个td是否是一个蓝球  是：返回球的classname 否：返回""
clsname:一个td所具有的样式
*/
function CertainBlueBall(clsname){
	if(clsname==undefined || clsname=="")
		return "";
	//判断区域内球所有可能的样式
	var arrayObj = new Array('ballBlue');
	for(m=0;m<arrayObj.length;m++){
		tmp = arrayObj[m];
		if(clsname.indexOf(tmp)!=-1){
			return tmp;
		}
	}
	return "";
}
/*
蓝球竖直连接
tableid:表的id
begincol:开始列
endcol:结束列
beginclum:开始行
endclum:结束行
Sclsnam:竖方向classname
*/
function Blueshulian(tableid,begincol,endcol,beginclum,endclum,Sclsnam){
	var vtable = document.getElementById(tableid);
	for(i=beginclum;i<=endclum;i++){
		for(j=begincol;j<=endcol;j++){
			var tmpa = vtable.rows[i].cells[j];   //rows cell 从0开始
			var tmpacn = CertainBlueBall(tmpa.className);
			if(tmpacn==""){
				continue;
			}else{
				shulianB(vtable,i,j,1,Sclsnam,endclum);
			}
		}
	}
}

/*
蓝球竖直连接探索
*/
function shulianB(vtable,vi,vj,num,Sclsnam,endclum){
	try{
		if(vi+1>endclum) throw "border";
		var vt = vtable.rows[vi+1].cells[vj];
		var vtcn = CertainBlueBall(vt.className);
		if(vtcn!="" ){   //找到 继续探索
			shulianB(vtable,vi+1,vj,num+1,Sclsnam,endclum);	
		}else{   //没有找到指定calssname
			if(num>=2){  //替换样式
				for(k=vi;k>vi-num;k--){
					tmpS = (vtable.rows[k].cells[vj]).className;
					(vtable.rows[k].cells[vj]).className = tmpS.replace(CertainBlueBall(tmpS),Sclsnam);
					//vtable.rows[i].cells[vj].className=Sclsnam;
				}
			}
		}
	}catch(e){
		if(num>=2){  //替换样式
			for(k=vi;k>vi-num;k--){
				tmpS = (vtable.rows[k].cells[vj]).className;
				(vtable.rows[k].cells[vj]).className = tmpS.replace(CertainBlueBall(tmpS),Sclsnam);
				//vtable.rows[i].cells[vj].className=Sclsnam;
			}
		}
	}	
	return;
}


/*
在table的指定范围内 做显示或隐藏操作
tableid:表的id
col:列
clum:行
showflag: 1显示 2隐藏
*/
function tdAreaDisplayOrnot(tableid,clum,col,showflag,k){
	
    var vtablebb = document.getElementById(tableid);
     if(showflag==1){
		//隐藏
		var tmp = vtablebb.rows[clum].cells[col];			
		my_array[k]=tmp.innerHTML;
        tmp.innerHTML="&nbsp;";        
	 }else{		
		var tmp = vtablebb.rows[clum].cells[col];
        tmp.innerHTML=my_array[k];			
	 } 
}

/*
在table的指定范围内 
tableid:表的id
begincol:开始列
endcol:结束列
beginclum:开始行
endclum:结束行
showflag: 1显示 2隐藏
*/
function ylfcDisplayOrnot(tableid,begincol,endcol,beginclum,endclum,showflag, isSort){
	var vtablebb = document.getElementById(tableid); 
	var isBall="z_font_red,z_font_hs_red,z_font_hs_blue,z_font_hs_orange,z_font_cs,z_font_hs,z_font_ls,z_bg_01,z_bg_02,z_bg_19,z_font_ligtred,z_font_darkblue,z_font_purple,z_font_evendarkblue,z_bg_blue_04_2";
	
    if (!isSort) { 
        //降序时
        if(showflag==1){   //显示
            for (var k = 0; k < begincol.length; k++) {   
		        for(j=begincol;j<endcol;j++){
			        for(i=beginclum-1 ;i>endclum-1;i--){
				        
				        var tmp = vtablebb.rows[i].cells[j];
				        if(isBall.indexOf(tmp.className)>=0){
                            
					        if(tmp.innerHTML!="")
					            break;
				        }else{
                            tmp.style.backgroundColor='#9999CC';
				        }
			        }
		        }
            }
	    }else{   //隐藏
		    for(i=beginclum-1;i>endclum-1;i--){
                for (var k = 0; k < begincol.length; k++) {
			        for(j=begincol;j<endcol;j++){
				        var tmp = vtablebb.rows[i].cells[j];
                        tmp.style.backgroundColor="";//color;
                    }
                }
		    }
	    }                            
    }else{                        
        if(showflag==1){   //显示
            for (var k = 0; k < begincol.length; k++) {
                for(j=begincol;j<endcol;j++){
                    for(i=endclum-1;i<beginclum-1;i++){
                        
                        var tmp = vtablebb.rows[i].cells[j];
                        if(isBall.indexOf(tmp.className)>=0){
                            
                            if(tmp.innerHTML!="")
                                break;
                        }else{
                            tmp.style.backgroundColor='#9999CC';
                        }
                    }
                }
            }
        }else{   //隐藏        
            for(i=endclum-1;i<beginclum-1;i++){     
                for (var k = 0; k < begincol.length; k++) {
                    for(j=begincol;j<endcol;j++){
                        var tmp = vtablebb.rows[i].cells[j];         
                        tmp.style.backgroundColor="";//color;
                    }
                }
            }                    
        }                                                                    
    }
}

/*
在table的指定范围内  zhouec 2010/06/10
tbodyId:表Body的id
beginrow:开始列数组
endrow:结束列数组
showflag: 1显示 2隐藏 
*/
function lineDisplayOrnot(tbodyId, beginrow, endrow, showflag, css){
    
    var vtablebb = document.getElementById(tbodyId);
    
    if(showflag == 1){   
        //显示
        for(i = beginrow; i <= endrow; i++){ 
            var tmp = vtablebb.rows[i];
            tmp.className="tdbckno_" + css;
        }
    }else{   
        //隐藏
        for(i = beginrow; i <= endrow; i++){
            var tmp = vtablebb.rows[i];
            tmp.className="z_tr_hui_" + css;
        }
    }
}  
//断区分布
function duangcengDisplayOrnot(tableid,begincol,endcol,clum,showflag){
	var vtablebb = document.getElementById(tableid);
	var isBall="backChange z_font_evendarkblue,backChange z_font_green,backChange z_font_orange,backChange z_font_ls,backChange z_font_red,backChange z_font_red,backChange z_font_hs_red,backChange z_font_hs_blue,backChange z_font_hs_orange,backChange z_font_cs,backChange z_font_hs,backChange z_font_ls,backChange z_bg_01,backChange z_bg_02,backChange z_bg_19,backChange z_font_ligtred,backChange z_font_darkblue,backChange z_font_purple,backChange q_red_ji,backChange q_red_fenlie,backChange z_font_green,backChange z_font_orange,backChange z_font_ls,backChange z_font_red,z_font_red,z_font_hs_red,z_font_hs_blue,z_font_hs_orange,z_font_cs,z_font_hs,z_font_ls,z_bg_01,z_bg_02,z_bg_19,z_font_ligtred,z_font_darkblue,z_font_purple,z_font_evendarkblue,z_bg_blue_04_2";
	if(showflag==1){   //显示
        for(i=begincol;i<endcol;i++){	
			var tmp = vtablebb.rows[clum].cells[i];
			
			if(isBall.indexOf(tmp.className)>=0){
				if(tmp.innerHTML!="")
					break;
			}else if(i==endcol-1){
				for(k=begincol;k<endcol;k++){
					var tmp = vtablebb.rows[clum].cells[k];
					tmp.style.backgroundColor='#999999';
				}
			}
		} 
	}else{   //隐藏
		for(i=begincol;i<endcol;i++){	
				var tmp = vtablebb.rows[clum].cells[i];

				tmp.style.backgroundColor="";//color;
			}
		}
	
} 

/*
斜连函数
tableid:表的id
begincol:开始列
endcol:结束列
beginclum:开始行
endclum:结束行
Rclsnam:右下方classname
Lclsnam:左下方classname
*/ 
function newoddxielian(tableid,begincol,endcol,beginclum,endclum,Rclsnam,Lclsnam,qiushu,ojvalue){
var vtable = document.getElementById(tableid);
  
	for(i=beginclum;i<=endclum;i++){//开始行
		for(j=begincol;j<=endcol;j++){ //开始列
			var tmpa = vtable.rows[i].cells[j];
			var tmpacn = CertainBeBall(tmpa.className);
			//alert(ojvalue==2);
		  if(ojvalue==2){//如果是偶数斜连
		     
				if(tmpacn==Rclsnam || tmpacn==""){
					continue;
				}else if(tmpacn!=Rclsnam&&tmpa.innerHTML%2==0){
					
					newxieliansetR(vtable,i,j,1,Rclsnam,endcol,endclum,qiushu,ojvalue);
				}
		  }else{//如果是奇数斜连
			
			  if(tmpacn==Rclsnam || tmpacn==""){
					continue;
				}else if(tmpacn!=Rclsnam&&tmpa.innerHTML%2==1){
					
					newxieliansetR(vtable,i,j,1,Rclsnam,endcol,endclum,qiushu,ojvalue);
				}
		  }
			
		}
	}
	for(ki=beginclum;ki<=endclum;ki++){
		for(kj=begincol;kj<=endcol;kj++){
			var tmpb = vtable.rows[ki].cells[kj];
			var tmpbcn = CertainBeBall(tmpb.className);
			if(ojvalue==2){  //如果是偶数斜连
				if(tmpbcn==Lclsnam || tmpbcn==""){
					continue;
				}else if(tmpbcn!=Lclsnam&&tmpb.innerHTML%2==0){
					newxieliansetL(vtable,ki,kj,1,Lclsnam,begincol,endclum,qiushu,ojvalue);
				}
			}else{
				if(tmpbcn==Lclsnam || tmpbcn==""){
					continue;
				}else if(tmpbcn!=Lclsnam&&tmpb.innerHTML%2==1){
					newxieliansetL(vtable,ki,kj,1,Lclsnam,begincol,endclum,qiushu,ojvalue);
				}
			
			}
		}
	}
}



/*
右下135度坐标探索
*/
function newxieliansetR(vtable,vi,vj,num,Rclsnam,endcol,endclum,qiushu,ojvalue){
	try{
		//如果大与结束列 或者大于结束行
		if(vj+1>endcol || vi+1>endclum) throw "border";
		var vt = vtable.rows[vi+1].cells[vj+1]; //下一行的的下一个列
		var vtcn = CertainBeBall(vt.className); //判断是否是球
		var ojbool=false;//判断是否是奇数或偶数
		if(ojvalue==2){//如果是偶数斜连
			if(vt.innerHTML%2==0)
				ojbool=true;
				
		}else{
			if(vt.innerHTML%2==1)
				ojbool=true;
		}
        
		if(vtcn!=""&&ojbool){   //找到 继续探索
			
			newxieliansetR(vtable,vi+1,vj+1,num+1,Rclsnam,endcol,endclum,qiushu,ojvalue);	
			
		}else{   //没有找到指定calssname
		   //  alert("num--->"+num+"qiushu--->"+qiushu);
			if(num>=qiushu){  //替换样式
			 
				for(k=0;k<num;k++){
					
					tmpH = vtable.rows[vi-k].cells[vj-k].className;
					(vtable.rows[vi-k].cells[vj-k]).className = tmpH.replace(CertainBeBall(tmpH),Rclsnam);
					//vtable.rows[vi-k].cells[vj-k].className=Rclsnam;
					
				}
			}
		}
	}catch(e){
		
		if(num>=qiushu){  //替换样式
			for(k=0;k<num;k++){
				tmpH = vtable.rows[vi-k].cells[vj-k].className;
				(vtable.rows[vi-k].cells[vj-k]).className = tmpH.replace(CertainBeBall(tmpH),Rclsnam);
				//vtable.rows[vi-k].cells[vj-k].className=Rclsnam;
			}
		}
	}	
	return;
}
/*
左下225度坐标探索
*/
function newxieliansetL(vtable,vi,vj,num,Lclsnam,begincol,endclum,qiushu,ojvalue){
	try{
		if(vj-1<begincol || vi+1>endclum) throw "border";
		var vt = vtable.rows[vi+1].cells[vj-1];
		var vtcn = CertainBeBall(vt.className);
		var ojbool=false;//判断是否是奇数或偶数
		if(ojvalue==2){//如果是偶数斜连
			if(vt.innerHTML%2==0)
				ojbool=true;
		}else{
			if(vt.innerHTML%2==1)
				ojbool=true;
		}
		if(vtcn!=""&&ojbool){   //找到 继续探索
		
			newxieliansetL(vtable,vi+1,vj-1,num+1,Lclsnam,begincol,endclum,qiushu,ojvalue);	
		}else{   //没有找到指定calssname
			if(num>=qiushu){  //替换样式
				for(k=0;k<num;k++){
					tmpH = vtable.rows[vi-k].cells[vj+k].className;
					(vtable.rows[vi-k].cells[vj+k]).className = tmpH.replace(CertainBeBall(tmpH),Lclsnam);
					//vtable.rows[vi-k].cells[vj+k].className=Lclsnam;
				}
			}
		}
	}catch(e){
		if(num>=qiushu){  //替换样式
			for(k=0;k<num;k++){
				tmpH = vtable.rows[vi-k].cells[vj+k].className;
				(vtable.rows[vi-k].cells[vj+k]).className = tmpH.replace(CertainBeBall(tmpH),Lclsnam);
				//vtable.rows[vi-k].cells[vj+k].className=Lclsnam;
			}
		}
	}
	return;
}






