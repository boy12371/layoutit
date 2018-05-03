﻿﻿var weekObjs = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
function getDay(dateStr) {
	var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    //var dateStr = "2008-08-08 08:08:08";
    var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
    return weekDay[myDate.getDay()]; 
}
function outputMoney(number) {
	if ( null == number ) {
		return "0.00";
	}
    number = number.replace(/\,/g, "");
    if (number == "") return "";
    if (number < 0) {
        return '-' + outputDollars(Math.floor(Math.abs(number) - 0) + '') + outputCents(Math.abs(number) - 0);
    } else {
        return outputDollars(Math.floor(number - 0) + '') + outputCents(number - 0);
    }
}

function outputDollars(number) {
    if (number.length <= 3) {
        return (number == '' ? '0' : number);
    } else {
        var mod = number.length % 3;
        var output = (mod == 0 ? '' : (number.substring(0, mod)));
        for (var i = 0; i < Math.floor(number.length / 3); i++) {
            if ((mod == 0) && (i == 0)) {
                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
            } else {
                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
            }
        }
        return (output);
    }
}

function outputCents(amount) {
    amount = Math.round(((amount) - Math.floor(amount)) * 100);
    return (amount < 10 ? '.0' + amount : '.' + amount);
}
// 加载赛程
function loadSchs() {
	var tagType = $("#tagType").val();
	if ( $("#subPlayId").val() == "6" ) {	// 装载胜平负赛程
		// Added for js装载赛程 at 2013/10/10 begin
		var schHtml = "";
		for ( var property in schedules ) {
			  var daySchs = schedules[property];
			  schHtml += '<tr>'+
				  	  '<td class="bg-e7e7e7 a-l p-l_10 yinBox c-3 h-25" colspan="18">'+
				  	  '<b>'+property+' '+getDay(property)+'</b>'+
				  	  '<b id="toggleTr12' + property + '">'+daySchs.length+'</b>'+
				  	  '<b>场比赛可投注</b>'+
				  	  '<a id="hideTr'+property.substring(8)+'" class="show" style="display:block" onclick="hideTr(\''+property.substring(8)+'\');">隐藏</a>'+
				  	  '<a id="showTr'+property.substring(8)+'" style="display:none" onclick="showTr(\''+property.substring(8)+'\');">显示</a>'+
				  	  '</td>'+
				  	  '</tr>';
			  for ( var i = 0; i < daySchs.length; i++ ) {
				  if( tagType == "d" && daySchs[i].spTypeDg == "" ){
						 continue;
				  }
				  if( tagType == "g" && daySchs[i].spTypeGg == "" ){
						 continue;
				  }
				  var leagName = daySchs[i].ln;
				  if ( leagName.indexOf('&nbsp') > -1 ) {
					  
				  } else {
					  leagName = leagName.length > 4 ? leagName.substring(0,4) : leagName;
				  }
				  schHtml += '<tr id="'+daySchs[i].id+'" saleclosetime="'+daySchs[i].saleCloseTime.replaceAll("-","").replace(" ","").replaceAll(":","")+'" gametype="' +daySchs[i].gameType+ '" hidetype="show" name="'+property.substring(8)+'" leagueid="'+daySchs[i].lid+'" week="'+daySchs[i].issue.substring(1)+'" no="'+daySchs[i].issue+'" issue="'+daySchs[i].issue+'" drq="0" rq="0">'+
					  		 '<td style="width:20px;"><input id="'+daySchs[i].id+'_cb" type="checkbox" checked="checked"></td>'+
					  		 '<td id="'+daySchs[i].id+'_cf" class="c-f" bgcolor="'+daySchs[i].bgColor+'" title="'+daySchs[i].lid+'">'+leagName+'</td>';
				  var weekIndex = parseInt(daySchs[i].no.substring(0,1));
				  weekIndex = weekIndex == 7 ? 0 : weekIndex;
				  schHtml += '<td id="'+daySchs[i].id+'_cc" style="width:52px;">'+weekObjs[weekIndex]+daySchs[i].no.substring(1)+'</td>'+
				  			 '<td id="'+daySchs[i].id+'_srd" saleclosetime="'+daySchs[i].saleCloseTime.substring(11)+'" dt="'+daySchs[i].dt.substring(11)+'" name="startOrEndTime" style="width:60px;">'+daySchs[i].saleCloseTime.substring(11)+'</td>'+
					  		 '<td id="'+daySchs[i].id+'_zd" class="c-0f3f94" title="'+daySchs[i].hn+'" style="width:81px;">'+daySchs[i].hn+'</td>'+
					  		 '<td id="'+daySchs[i].id+'_kd" class="c-0f3f94" title="'+daySchs[i].an+'" style="width:81px;">'+daySchs[i].an+'</td>'+
					  		 '<td style="width:60px;">'+daySchs[i].hostOdds+'</td>'+
					  		 '<td style="width:51px;">'+daySchs[i].vsOdds+'</td>'+
					  		 '<td style="width:68px;">'+daySchs[i].visitOdds+'</td>'+
					  		 '<td><a class="c-0f3f94" style="width:22px;">欧</a></td>'+
					  		 '<td><a class="c-0f3f94" style="width:22px;">亚</a></td>'+
					  		 '<td><a class="c-0f3f94" style="width:22px;">析</a></td>'+
					  		 '<td><a class="c-0f3f94" style="width:22px;">情</a></td>'+
					  		 '<td id="'+daySchs[i].id+'_s" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_s\');" onmouseover="overPeilv(\''+daySchs[i].id+'_s\');" onclick="selPeilv(\''+daySchs[i].id+'_s\');" dodds="'+outputMoney(daySchs[i].spTypeDg[0])+'" godds="'+outputMoney(daySchs[i].spTypeGg[0])+'" style="width:42px;">1.86</td>'+
					  		 '<td id="'+daySchs[i].id+'_p" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_p\');" onmouseover="overPeilv(\''+daySchs[i].id+'_p\');" onclick="selPeilv(\''+daySchs[i].id+'_p\');" dodds="'+outputMoney(daySchs[i].spTypeDg[1])+'" godds="'+outputMoney(daySchs[i].spTypeGg[1])+'" style="width:42px;">3.80</td>'+
					  		 '<td id="'+daySchs[i].id+'_f" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_f\');" onmouseover="overPeilv(\''+daySchs[i].id+'_f\');" onclick="selPeilv(\''+daySchs[i].id+'_f\');" dodds="'+outputMoney(daySchs[i].spTypeDg[2])+'" godds="'+outputMoney(daySchs[i].spTypeGg[2])+'" style="width:42px;">3.10</td>'+
					  		 '<td id="'+daySchs[i].id+'_b" baovalue="0" onclick="baoPeilv(\''+daySchs[i].id+'_b\');" style="width:20px;cursor:pointer;">包</td>'+
					  		 '</tr>';
			  }
		}
		$(schHtml).appendTo($("#jczqTable"));
		// Added for js装载赛程 at 2013/10/10 end
	} else if ( $("#subPlayId").val() == "1" ) {	// 装载让球胜平负赛程
		// Added for js装载赛程 at 2013/10/10 begin
		var schHtml = "";
		for ( var property in schedules ) {
			  var daySchs = schedules[property];
			  schHtml += '<tr>'+
				  	  '<td class="bg-e7e7e7 a-l p-l_10 yinBox c-3 h-25" colspan="17">'+
				  	  '<b>'+property+' '+getDay(property)+'</b>'+
				  	  '<b id="toggleTr12' + property + '">'+daySchs.length+'</b>'+
				  	  '<b>场比赛可投注</b>'+
				  	  '<a id="hideTr'+property.substring(8)+'" class="show" style="display:block" onclick="hideTr(\''+property.substring(8)+'\');">隐藏</a>'+
				  	  '<a id="showTr'+property.substring(8)+'" style="display:none" onclick="showTr(\''+property.substring(8)+'\');">显示</a>'+
				  	  '</td>'+
				  	  '</tr>';
			  for ( var i = 0; i < daySchs.length; i++ ) {
				  //如果赔率均为0.00则跳过此场
				  if( tagType == "d" && daySchs[i].spTypeDg == "" ){
						 continue;
				  }
				  if( tagType == "g" && daySchs[i].spTypeGg == "" ){
						 continue;
				  }
				  var leagName = daySchs[i].ln;
				  if ( leagName.indexOf('&nbsp') > -1 ) {
					  
				  } else {
					  leagName = leagName.length > 4 ? leagName.substring(0,4) : leagName;
				  }
				  schHtml += '<tr id="'+daySchs[i].id+'" saleclosetime="'+daySchs[i].saleCloseTime.replaceAll("-","").replace(" ","").replaceAll(":","")+'" gametype="' +daySchs[i].gameType+ '" hidetype="show" name="'+property.substring(8)+'" leagueid="'+daySchs[i].lid+'" week="'+daySchs[i].issue.substring(1)+'" no="'+daySchs[i].issue+'" issue="'+daySchs[i].issue+'" drq="'+daySchs[i].hand+'" rq="'+daySchs[i].hand+'">'+
					  		 '<td style="width:20px;"><input id="'+daySchs[i].id+'_cb" type="checkbox" checked="checked"></td>'+
					  		 '<td id="'+daySchs[i].id+'_cf" class="c-f" bgcolor="'+daySchs[i].bgColor+'" title="'+daySchs[i].lid+'">'+leagName+'</td>';
				  var weekIndex = parseInt(daySchs[i].no.substring(0,1));
				  weekIndex = weekIndex == 7 ? 0 : weekIndex;
				  schHtml += '<td id="'+daySchs[i].id+'_cc" style="width:52px;">'+weekObjs[weekIndex]+daySchs[i].no.substring(1)+'</td>'+
					  		 '<td id="'+daySchs[i].id+'_srd" saleclosetime="'+daySchs[i].saleCloseTime.substring(11)+'" dt="'+daySchs[i].dt.substring(11)+'" name="startOrEndTime" style="width:60px;">'+daySchs[i].saleCloseTime.substring(11)+'</td>'+
					  		 '<td id="'+daySchs[i].id+'_zd" class="c-0f3f94" title="'+daySchs[i].hn+'" style="width:81px;">'+daySchs[i].hn+'</td>'+
					  		 '<td style="width:30px;" name="rq">'+daySchs[i].hand+'</td>'+
					  		 '<td id="'+daySchs[i].id+'_kd" class="c-0f3f94" title="'+daySchs[i].an+'" style="width:81px;">'+daySchs[i].an+'</td>'+
					  		 '<td style="width:51px;">'+daySchs[i].hostOdds+'</td>'+
					  		 '<td style="width:51px;">'+daySchs[i].vsOdds+'</td>'+
					  		 '<td style="width:51px;">'+daySchs[i].visitOdds+'</td>'+
					  		 '<td><a class="c-0f3f94" style="width:22px;">欧</a></td>'+
					  		 '<td><a class="c-0f3f94" style="width:22px;">亚</a></td>'+
					  		 '<td><a class="c-0f3f94" style="width:22px;">析</a></td>'+
					  		 '<td><a class="c-0f3f94" style="width:22px;">情</a></td>'+
					  		 '<td id="'+daySchs[i].id+'_s" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_s\');" onmouseover="overPeilv(\''+daySchs[i].id+'_s\');" onclick="selPeilv(\''+daySchs[i].id+'_s\');" dodds="'+outputMoney(daySchs[i].spTypeDg[0])+'" godds="'+outputMoney(daySchs[i].spTypeGg[0])+'" style="width:42px;">1.86</td>'+
					  		 '<td id="'+daySchs[i].id+'_p" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_p\');" onmouseover="overPeilv(\''+daySchs[i].id+'_p\');" onclick="selPeilv(\''+daySchs[i].id+'_p\');" dodds="'+outputMoney(daySchs[i].spTypeDg[1])+'" godds="'+outputMoney(daySchs[i].spTypeGg[1])+'" style="width:42px;">3.80</td>'+
					  		 '<td id="'+daySchs[i].id+'_f" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_f\');" onmouseover="overPeilv(\''+daySchs[i].id+'_f\');" onclick="selPeilv(\''+daySchs[i].id+'_f\');" dodds="'+outputMoney(daySchs[i].spTypeDg[2])+'" godds="'+outputMoney(daySchs[i].spTypeGg[2])+'" style="width:42px;">3.10</td>'+
					  		 '<td id="'+daySchs[i].id+'_b" baovalue="0" onclick="baoPeilv(\''+daySchs[i].id+'_b\');" style="width:20px;cursor:pointer;">包</td>'+
					  		 '</tr>';
			  }
		}
		$(schHtml).appendTo($("#jczqTable"));
		// Added for js装载赛程 at 2013/10/10 end
	} else if ( $("#subPlayId").val() == "2" ) {	// 装载总进球赛程
		// Added for js装载赛程 at 2013/10/10 begin
		var schHtml = "";
		for ( var property in schedules ) {
			  var daySchs = schedules[property];
			  schHtml += '<tr>'+
				  	  '<td class="bg-e7e7e7 a-l p-l_10 yinBox c-3 h-25" colspan="18">'+
				  	  '<b>'+property+' '+getDay(property)+'</b>'+
				  	  '<b id="toggleTr12' + property + '">'+daySchs.length+'</b>'+
				  	  '<b>场比赛可投注</b>'+
				  	  '<a id="hideTr'+property.substring(8)+'" class="show" style="display:block" onclick="hideTr(\''+property.substring(8)+'\');">隐藏</a>'+
				  	  '<a id="showTr'+property.substring(8)+'" style="display:none" onclick="showTr(\''+property.substring(8)+'\');">显示</a>'+
				  	  '</td>'+
				  	  '</tr>';
			  for ( var i = 0; i < daySchs.length; i++ ) {
				  //如果赔率均为0.00则跳过此场
				  if( tagType == "d" && daySchs[i].spTypeDg == "" ){
						 continue;
				  }
				  if( tagType == "g" && daySchs[i].spTypeGg == "" ){
						 continue;
				  }
				  var leagName = daySchs[i].ln;
				  if ( leagName.indexOf('&nbsp') > -1 ) {
					  
				  } else {
					  leagName = leagName.length > 4 ? leagName.substring(0,4) : leagName;
				  }
				  schHtml += '<tr id="'+daySchs[i].id+'" saleclosetime="'+daySchs[i].saleCloseTime.replaceAll("-","").replace(" ","").replaceAll(":","")+'" gametype="' +daySchs[i].gameType+ '" hidetype="show" name="'+property.substring(8)+'" leagueid="'+daySchs[i].lid+'" week="'+daySchs[i].issue.substring(1)+'" no="'+daySchs[i].issue+'" issue="'+daySchs[i].issue+'" drq="'+daySchs[i].hand+'" rq="'+daySchs[i].hand+'">'+
					  		 '<td style="width:15px;"><input id="'+daySchs[i].id+'_cb" type="checkbox" checked="checked"></td>'+
					  		 '<td id="'+daySchs[i].id+'_cf" class="c-f" bgcolor="'+daySchs[i].bgColor+'" title="'+daySchs[i].lid+'" style="width:65px;">'+leagName+'</td>';
				  var weekIndex = parseInt(daySchs[i].no.substring(0,1));
				  weekIndex = weekIndex == 7 ? 0 : weekIndex;
				  schHtml += '<td id="'+daySchs[i].id+'_cc" style="width:52px;">'+weekObjs[weekIndex]+daySchs[i].no.substring(1)+'</td>'+
					  		 '<td id="'+daySchs[i].id+'_srd" saleclosetime="'+daySchs[i].saleCloseTime.substring(11)+'" dt="'+daySchs[i].dt.substring(11)+'" name="startOrEndTime" style="width:62px;">15:59</td>'+
					  		 '<td id="'+daySchs[i].id+'_zd" class="c-878686" title="'+daySchs[i].hn+'" style="width:75px;"><em id="'+daySchs[i].id+'_zd_em" class="c-0f3f94">'+daySchs[i].hn+'</em></td>'+
					  		 '<td id="'+daySchs[i].id+'_kd" class="c-878686" title="'+daySchs[i].an+'" style="width:76px;"><em id="'+daySchs[i].id+'_kd_em" class="c-0f3f94">'+daySchs[i].an+'</em></td>'+
					  		 '<td style="width:20px;"><a class="c-0f3f94" >欧</a></td>'+
					  		 '<td style="width:18px;"><a class="c-0f3f94" >亚</a></td>'+
					  		 '<td style="width:20px;"><a class="c-0f3f94" >析</a></td>'+
					  		 '<td style="width:20px;"><a class="c-0f3f94" >情</a></td>'+
					  		 '<td id="'+daySchs[i].id+'_0" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_0\');" onmouseover="overPeilv(\''+daySchs[i].id+'_0\');" onclick="selPeilv(\''+daySchs[i].id+'_0\');" dodds="'+outputMoney(daySchs[i].spTypeDg[0])+'" godds="'+outputMoney(daySchs[i].spTypeGg[0])+'" style="width:40px;">1.86</td>'+
					  		 '<td id="'+daySchs[i].id+'_1" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_1\');" onmouseover="overPeilv(\''+daySchs[i].id+'_1\');" onclick="selPeilv(\''+daySchs[i].id+'_1\');" dodds="'+outputMoney(daySchs[i].spTypeDg[1])+'" godds="'+outputMoney(daySchs[i].spTypeGg[1])+'" style="width:40px;">3.80</td>'+
					  		 '<td id="'+daySchs[i].id+'_2" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_2\');" onmouseover="overPeilv(\''+daySchs[i].id+'_2\');" onclick="selPeilv(\''+daySchs[i].id+'_2\');" dodds="'+outputMoney(daySchs[i].spTypeDg[2])+'" godds="'+outputMoney(daySchs[i].spTypeGg[2])+'" style="width:40px;">3.10</td>'+
					  		 '<td id="'+daySchs[i].id+'_3" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_3\');" onmouseover="overPeilv(\''+daySchs[i].id+'_3\');" onclick="selPeilv(\''+daySchs[i].id+'_3\');" dodds="'+outputMoney(daySchs[i].spTypeDg[3])+'" godds="'+outputMoney(daySchs[i].spTypeGg[3])+'" style="width:40px;">1.86</td>'+
					  		 '<td id="'+daySchs[i].id+'_4" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_4\');" onmouseover="overPeilv(\''+daySchs[i].id+'_4\');" onclick="selPeilv(\''+daySchs[i].id+'_4\');" dodds="'+outputMoney(daySchs[i].spTypeDg[4])+'" godds="'+outputMoney(daySchs[i].spTypeGg[4])+'" style="width:40px;">3.80</td>'+
					  		 '<td id="'+daySchs[i].id+'_5" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_5\');" onmouseover="overPeilv(\''+daySchs[i].id+'_5\');" onclick="selPeilv(\''+daySchs[i].id+'_5\');" dodds="'+outputMoney(daySchs[i].spTypeDg[5])+'" godds="'+outputMoney(daySchs[i].spTypeGg[5])+'" style="width:40px;">3.10</td>'+
					  		 '<td id="'+daySchs[i].id+'_6" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_6\');" onmouseover="overPeilv(\''+daySchs[i].id+'_6\');" onclick="selPeilv(\''+daySchs[i].id+'_6\');" dodds="'+outputMoney(daySchs[i].spTypeDg[6])+'" godds="'+outputMoney(daySchs[i].spTypeGg[6])+'" style="width:40px;">1.86</td>'+
					  		 '<td id="'+daySchs[i].id+'_7" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_7\');" onmouseover="overPeilv(\''+daySchs[i].id+'_7\');" onclick="selPeilv(\''+daySchs[i].id+'_7\');" dodds="'+outputMoney(daySchs[i].spTypeDg[7])+'" godds="'+outputMoney(daySchs[i].spTypeGg[7])+'" style="width:40px;">3.80</td>'+
					  		 '<td id="'+daySchs[i].id+'_b" baovalue="0" onclick="baoPeilv(\''+daySchs[i].id+'_b\');" style="width:15px;cursor:pointer;">包</td>'+
					  		 '</tr>';
			  }
		}
		$(schHtml).appendTo($("#jczqTable"));
		// Added for js装载赛程 at 2013/10/10 end
	} else if ( $("#subPlayId").val() == "4" ) {	// 装载半全场赛程
		// Added for js装载赛程 at 2013/10/14 begin
		var schHtml = "";
		for ( var property in schedules ) {
			  var daySchs = schedules[property];
			  schHtml += '<tr>'+
				  	  '<td class="bg-e7e7e7 a-l p-l_10 yinBox c-3 h-25" colspan="18">'+
				  	  '<b>'+property+' '+getDay(property)+'</b>'+
				  	  '<b id="toggleTr12' + property + '">'+daySchs.length+'</b>'+
				  	  '<b>场比赛可投注</b>'+
				  	  '<a id="hideTr'+property.substring(8)+'" class="show" style="display:block" onclick="hideTr(\''+property.substring(8)+'\');">隐藏</a>'+
				  	  '<a id="showTr'+property.substring(8)+'" style="display:none" onclick="showTr(\''+property.substring(8)+'\');">显示</a>'+
				  	  '</td>'+
				  	  '</tr>';
			  for ( var i = 0; i < daySchs.length; i++ ) {
				  //如果赔率均为0.00则跳过此场
				  if( tagType == "d" && daySchs[i].spTypeDg == "" ){
						 continue;
				  }
				  if( tagType == "g" && daySchs[i].spTypeGg == "" ){
						 continue;
				  }
				  var leagName = daySchs[i].ln;
				  if ( leagName.indexOf('&nbsp') > -1 ) {
					  
				  } else {
					  leagName = leagName.length > 4 ? leagName.substring(0,4) : leagName;
				  }
				  schHtml += '<tr id="'+daySchs[i].id+'" saleclosetime="'+daySchs[i].saleCloseTime.replaceAll("-","").replace(" ","").replaceAll(":","")+'" gametype="' +daySchs[i].gameType+ '" hidetype="show" name="'+property.substring(8)+'" leagueid="'+daySchs[i].lid+'" week="'+daySchs[i].issue.substring(1)+'" no="'+daySchs[i].issue+'" issue="'+daySchs[i].issue+'" drq="'+daySchs[i].hand+'" rq="'+daySchs[i].hand+'">'+
					  		 '<td style="width:20px;"><input id="'+daySchs[i].id+'_cb" type="checkbox" checked="checked"></td>'+
					  		 '<td id="'+daySchs[i].id+'_cf" class="c-f" bgcolor="'+daySchs[i].bgColor+'" title="'+daySchs[i].lid+'" >'+leagName+'</td>';
				  var weekIndex = parseInt(daySchs[i].no.substring(0,1));
				  weekIndex = weekIndex == 7 ? 0 : weekIndex;
				  schHtml += '<td id="'+daySchs[i].id+'_cc" style="width:51px;">'+weekObjs[weekIndex]+daySchs[i].no.substring(1)+'</td>'+
					  		 '<td id="'+daySchs[i].id+'_srd" saleclosetime="'+daySchs[i].saleCloseTime.substring(11)+'" dt="'+daySchs[i].dt.substring(11)+'" name="startOrEndTime" style="width:60px;">15:59</td>'+
					  		 '<td id="'+daySchs[i].id+'_zd" class="c-878686" title="'+daySchs[i].hn+'" style="width:70px;"><em id="'+daySchs[i].id+'_zd_em" class="c-0f3f94">'+daySchs[i].hn+'</em></td>'+
					  		 '<td id="'+daySchs[i].id+'_kd" class="c-878686" title="'+daySchs[i].an+'" style="width:70px;"><em id="'+daySchs[i].id+'_kd_em" class="c-0f3f94">'+daySchs[i].an+'</em></td>'+
					  		 '<td style="width:20px;"><a class="c-0f3f94" >欧</a></td>'+
					  		 '<td style="width:20px;"><a class="c-0f3f94" >亚</a></td>'+
					  		 '<td style="width:20px;"><a class="c-0f3f94" >析</a></td>'+
					  		 '<td style="width:20px;"><a class="c-0f3f94" >情</a></td>'+
					  		 '<td id="'+daySchs[i].id+'_0" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_0\');" onmouseover="overPeilv(\''+daySchs[i].id+'_0\');" onclick="selPeilv(\''+daySchs[i].id+'_0\');" dodds="'+outputMoney(daySchs[i].spTypeDg[0])+'" godds="'+outputMoney(daySchs[i].spTypeGg[0])+'" style="width:37px;">1.86</td>'+
					  		 '<td id="'+daySchs[i].id+'_1" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_1\');" onmouseover="overPeilv(\''+daySchs[i].id+'_1\');" onclick="selPeilv(\''+daySchs[i].id+'_1\');" dodds="'+outputMoney(daySchs[i].spTypeDg[1])+'" godds="'+outputMoney(daySchs[i].spTypeGg[1])+'" style="width:37px;">3.80</td>'+
					  		 '<td id="'+daySchs[i].id+'_2" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_2\');" onmouseover="overPeilv(\''+daySchs[i].id+'_2\');" onclick="selPeilv(\''+daySchs[i].id+'_2\');" dodds="'+outputMoney(daySchs[i].spTypeDg[2])+'" godds="'+outputMoney(daySchs[i].spTypeGg[2])+'" style="width:37px;">3.10</td>'+
					  		 '<td id="'+daySchs[i].id+'_3" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_3\');" onmouseover="overPeilv(\''+daySchs[i].id+'_3\');" onclick="selPeilv(\''+daySchs[i].id+'_3\');" dodds="'+outputMoney(daySchs[i].spTypeDg[3])+'" godds="'+outputMoney(daySchs[i].spTypeGg[3])+'" style="width:37px;">1.86</td>'+
					  		 '<td id="'+daySchs[i].id+'_4" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_4\');" onmouseover="overPeilv(\''+daySchs[i].id+'_4\');" onclick="selPeilv(\''+daySchs[i].id+'_4\');" dodds="'+outputMoney(daySchs[i].spTypeDg[4])+'" godds="'+outputMoney(daySchs[i].spTypeGg[4])+'" style="width:37px;">3.80</td>'+
					  		 '<td id="'+daySchs[i].id+'_5" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_5\');" onmouseover="overPeilv(\''+daySchs[i].id+'_5\');" onclick="selPeilv(\''+daySchs[i].id+'_5\');" dodds="'+outputMoney(daySchs[i].spTypeDg[5])+'" godds="'+outputMoney(daySchs[i].spTypeGg[5])+'" style="width:37px;">3.10</td>'+
					  		 '<td id="'+daySchs[i].id+'_6" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_6\');" onmouseover="overPeilv(\''+daySchs[i].id+'_6\');" onclick="selPeilv(\''+daySchs[i].id+'_6\');" dodds="'+outputMoney(daySchs[i].spTypeDg[6])+'" godds="'+outputMoney(daySchs[i].spTypeGg[6])+'" style="width:37px;">1.86</td>'+
					  		 '<td id="'+daySchs[i].id+'_7" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_7\');" onmouseover="overPeilv(\''+daySchs[i].id+'_7\');" onclick="selPeilv(\''+daySchs[i].id+'_7\');" dodds="'+outputMoney(daySchs[i].spTypeDg[7])+'" godds="'+outputMoney(daySchs[i].spTypeGg[7])+'" style="width:37px;">3.80</td>'+
					  		 '<td id="'+daySchs[i].id+'_8" class="b-ddd c-3 tdBg" onmouseout="outPeilv(\''+daySchs[i].id+'_8\');" onmouseover="overPeilv(\''+daySchs[i].id+'_8\');" onclick="selPeilv(\''+daySchs[i].id+'_8\');" dodds="'+outputMoney(daySchs[i].spTypeDg[8])+'" godds="'+outputMoney(daySchs[i].spTypeGg[8])+'" style="width:37px;">3.80</td>'+
					  		 '<td id="'+daySchs[i].id+'_b" baovalue="0" onclick="baoPeilv(\''+daySchs[i].id+'_b\');" style="width:10px;cursor:pointer;">包</td>'+
					  		 '</tr>';
			  }
		}
		$(schHtml).appendTo($("#jczqTable"));
		// Added for js装载赛程 at 2013/10/14 end
	} else if ( $("#subPlayId").val() == "3" ) {	// 装载比分赛程
		// Added for js装载赛程 at 2013/10/10 begin
		var schHtml = "";
		for ( var property in schedules ) {
			  var daySchs = schedules[property];
			  schHtml += '<tr>'+
				  	  '<td class="bg-e7e7e7 a-l p-l_10 yinBox c-3 h-25" colspan="17">'+
				  	  '<b>'+property+' '+getDay(property)+'</b>'+
				  	  '<b id="toggleTr12' + property + '">'+daySchs.length+'</b>'+
				  	  '<b>场比赛可投注</b>'+
				  	  '<a id="hideTr'+property.substring(8)+'" class="show" style="display:block" onclick="hideTr(\''+property.substring(8)+'\');">隐藏</a>'+
				  	  '<a id="showTr'+property.substring(8)+'" style="display:none" onclick="showTr(\''+property.substring(8)+'\');">显示</a>'+
				  	  '</td>'+
				  	  '</tr>';
			  for ( var i = 0; i < daySchs.length; i++ ) {
				  //如果赔率均为0.00则跳过此场
				  if( tagType == "d" && daySchs[i].spTypeDg == "" ){
						 continue;
				  }
				  if( tagType == "g" && daySchs[i].spTypeGg == "" ){
						 continue;
				  }
				  var leagName = daySchs[i].ln;
				  if ( leagName.indexOf('&nbsp') > -1 ) {
					  
				  } else {
					  leagName = leagName.length > 4 ? leagName.substring(0,4) : leagName;
				  }
				  schHtml += '<tr id="'+daySchs[i].id+'" saleclosetime="'+daySchs[i].saleCloseTime.replaceAll("-","").replace(" ","").replaceAll(":","")+'" gametype="' +daySchs[i].gameType+ '" hidetype="show" name="'+property.substring(8)+'" leagueid="'+daySchs[i].lid+'" week="'+daySchs[i].issue.substring(1)+'" no="'+daySchs[i].issue+'" issue="'+daySchs[i].issue+'" drq="'+daySchs[i].hand+'" rq="'+daySchs[i].hand+'">'+
					  		 '<td style="width:20px;"><input id="'+daySchs[i].id+'_cb" type="checkbox" checked="checked"></td>'+
					  		 '<td id="'+daySchs[i].id+'_cf" class="c-f" bgcolor="'+daySchs[i].bgColor+'" title="'+daySchs[i].lid+'">'+leagName+'</td>';
				  var weekIndex = parseInt(daySchs[i].no.substring(0,1));
				  weekIndex = weekIndex == 7 ? 0 : weekIndex;
				  schHtml += '<td id="'+daySchs[i].id+'_cc" style="width:52px;">'+weekObjs[weekIndex]+daySchs[i].no.substring(1)+'</td>'+
					  		 '<td id="'+daySchs[i].id+'_srd" saleclosetime="'+daySchs[i].saleCloseTime.substring(11)+'" dt="'+daySchs[i].dt.substring(11)+'" name="startOrEndTime" style="width:60px;">15:59</td>'+
					  		 '<td id="'+daySchs[i].id+'_zd" class="c-0f3f94" title="'+daySchs[i].hn+'" style="width:81px;"><em id="'+daySchs[i].id+'_zd_em" class="c-0f3f94">'+daySchs[i].hn+'</em></td>'+
					  		 '<td id="'+daySchs[i].id+'_kd" class="c-0f3f94" title="'+daySchs[i].an+'" style="width:81px;"><em id="'+daySchs[i].id+'_kd_em" class="c-0f3f94">'+daySchs[i].an+'</em></td>'+
					  		 '<td style="width:51px;">'+daySchs[i].hostOdds+'</td>'+
					  		 '<td style="width:51px;">'+daySchs[i].vsOdds+'</td>'+
					  		 '<td style="width:51px;">'+daySchs[i].visitOdds+'</td>'+
					  		 '<td><a class="c-0f3f94" style="width:26px;">欧</a></td>'+
					  		 '<td><a class="c-0f3f94" style="width:26px;">亚</a></td>'+
					  		 '<td><a class="c-0f3f94" style="width:26px;">析</a></td>'+
					  		 '<td><a class="c-0f3f94" style="width:26px;">情</a></td>'+
					  		 '<td style="width:163px;">'+
					  		 '<input id="'+daySchs[i].id+'_sah" class="bftzYs" type="button" value="显示比分投注区">'+
					  		 '</td>'+
					  		 '</tr>'+
				  			 '<tr id="'+daySchs[i].id+'_slave" style="display:none">'+
				  			 '<td colspan="13">'+
				  			 '<table class="bftzTable" width="100%" border="0">'+
				  			 '<tbody>'+
				  			 '<tr id="'+daySchs[i].id+'_slave_s">'+
				  			 '<td id="'+daySchs[i].id+'_slave_0" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[12])+'" godds="'+outputMoney(daySchs[i].spTypeGg[12])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_0\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_0\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_0\');">'+
				  			 '胜其它'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[12])+
				  			 '</b></td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_1" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[0])+'" godds="'+outputMoney(daySchs[i].spTypeGg[0])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_1\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_1\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_1\');">'+
				  			 '1:0'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[0])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_2" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[1])+'" godds="'+outputMoney(daySchs[i].spTypeGg[1])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_2\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_2\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_2\');">'+
				  			 '2:0'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[1])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_3" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[2])+'" godds="'+outputMoney(daySchs[i].spTypeGg[2])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_3\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_3\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_3\');">'+
				  			 '2:1'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[2])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_4" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[3])+'" godds="'+outputMoney(daySchs[i].spTypeGg[3])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_4\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_4\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_4\');">'+
				  			 '3:0'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[3])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_5" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[4])+'" godds="'+outputMoney(daySchs[i].spTypeGg[4])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_5\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_5\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_5\');">'+
				  			 '3:1'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[4])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_6" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[5])+'" godds="'+outputMoney(daySchs[i].spTypeGg[5])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_6\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_6\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_6\');">'+
				  			 '3:2'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[5])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_7" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[6])+'" godds="'+outputMoney(daySchs[i].spTypeGg[6])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_7\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_7\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_7\');">'+
				  			 '4:0'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[6])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_8" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[7])+'" godds="'+outputMoney(daySchs[i].spTypeGg[7])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_8\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_8\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_8\');">'+
				  			 '4:1'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[7])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_9" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[8])+'" godds="'+outputMoney(daySchs[i].spTypeGg[8])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_9\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_9\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_9\');">'+
				  			 '4:2'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[8])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_10" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[9])+'" godds="'+outputMoney(daySchs[i].spTypeGg[9])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_10\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_10\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_10\');">'+
				  			 '5:0'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[9])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_11" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[10])+'" godds="'+outputMoney(daySchs[i].spTypeGg[10])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_11\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_11\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_11\');">'+
				  			 '5:1'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[10])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_12" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[11])+'" godds="'+outputMoney(daySchs[i].spTypeGg[11])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_12\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_12\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_12\');">'+
				  			 '5:2'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[11])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_s_b" class="c-146ac9 w-30" baovalue="0" onclick="baoPeilv(\''+daySchs[i].id+'_slave_s_b\');" style="cursor:pointer;">包</td>'+
				  			 '</tr>'+
				  			 '<tr id="'+daySchs[i].id+'_slave_p">'+
				  			 '<td id="'+daySchs[i].id+'_slave_13" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[17])+'" godds="'+outputMoney(daySchs[i].spTypeGg[17])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_13\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_13\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_13\');" style="opacity: 1;">'+
				  			 '平其它<b>'+
				  			 outputMoney(daySchs[i].spTypeDg[17])+
				  			 '</b></td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_14" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[13])+'" godds="'+outputMoney(daySchs[i].spTypeGg[13])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_14\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_14\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_14\');" style="opacity: 1;">'+
				  			 '0:0'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[13])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_15" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[14])+'" godds="'+outputMoney(daySchs[i].spTypeGg[14])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_15\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_15\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_15\');">'+
				  			 '1:1'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[14])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_16" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[15])+'" godds="'+outputMoney(daySchs[i].spTypeGg[15])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_16\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_16\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_16\');" style="opacity: 1;">'+
				  			 '2:2'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[15])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_17" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[16])+'" godds="'+outputMoney(daySchs[i].spTypeGg[16])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_17\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_17\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_17\');" style="opacity: 1;">'+
				  			 '3:3'+
				  			'<b>'+outputMoney(daySchs[i].spTypeDg[16])+'</b>'+
				  			'</td>'+
				  			'<td> </td>'+
				  			'<td> </td>'+
				  			'<td> </td>'+
				  			'<td> </td>'+
				  			'<td> </td>'+
				  			'<td> </td>'+
				  			'<td> </td>'+
				  			'<td> </td>'+
				  			'<td id="'+daySchs[i].id+'_slave_p_b" class="c-146ac9 w-30" style="cursor:pointer;" baovalue="0" onclick="baoPeilv(\''+daySchs[i].id+'_slave_p_b\');">包</td>'+
				  			'</tr>'+
				  			 '<tr id="'+daySchs[i].id+'_slave_f">'+
				  			 '<td id="'+daySchs[i].id+'_slave_18" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[30])+'" godds="'+outputMoney(daySchs[i].spTypeGg[30])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_18\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_18\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_18\');" style="opacity: 1;">'+
				  			 '负其它<b>'+
				  			 outputMoney(daySchs[i].spTypeDg[30])+
				  			 '</b></td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_19" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[18])+'" godds="'+outputMoney(daySchs[i].spTypeDg[18])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_19\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_19\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_19\');" style="opacity: 1;">'+
				  			 '0:1'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[18])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_20" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[19])+'" godds="'+outputMoney(daySchs[i].spTypeGg[19])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_20\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_20\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_20\');" style="opacity: 1;">'+
				  			 '0:2'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[19])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_21" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[20])+'" godds="'+outputMoney(daySchs[i].spTypeGg[20])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_21\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_21\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_21\');" style="opacity: 1;">'+
				  			 '1:2'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[20])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_22" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[21])+'" godds="'+outputMoney(daySchs[i].spTypeGg[21])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_22\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_22\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_22\');" style="opacity: 1;">'+
				  			 '0:3'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[21])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_23" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[22])+'" godds="'+outputMoney(daySchs[i].spTypeGg[22])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_23\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_23\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_23\');">'+
				  			 '1:3'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[22])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_24" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[23])+'" godds="'+outputMoney(daySchs[i].spTypeGg[23])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_24\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_24\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_24\');">'+
				  			 '2:3'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[23])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_25" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[24])+'" godds="'+outputMoney(daySchs[i].spTypeGg[24])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_25\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_25\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_25\');">'+
				  			 '0:4'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[24])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_26" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[25])+'" godds="'+outputMoney(daySchs[i].spTypeGg[25])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_26\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_26\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_26\');">'+
				  			 '1:4'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[25])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_27" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[26])+'" godds="'+outputMoney(daySchs[i].spTypeGg[26])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_27\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_27\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_27\');">'+
				  			 '2:4'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[26])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_28" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[27])+'" godds="'+outputMoney(daySchs[i].spTypeGg[27])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_28\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_28\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_28\');">'+
				  			 '0:5'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[27])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_29" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[28])+'" godds="'+outputMoney(daySchs[i].spTypeDg[28])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_29\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_29\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_29\');">'+
				  			 '1:5'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[28])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_30" class="b-ddd c-3 tdBg" dodds="'+outputMoney(daySchs[i].spTypeDg[29])+'" godds="'+outputMoney(daySchs[i].spTypeGg[29])+'" onmouseout="outPeilv(\''+daySchs[i].id+'_slave_30\');" onmouseover="overPeilv(\''+daySchs[i].id+'_slave_30\');" onclick="selPeilv(\''+daySchs[i].id+'_slave_30\');">'+
				  			 '2:5'+
				  			 '<b>'+outputMoney(daySchs[i].spTypeDg[29])+'</b>'+
				  			 '</td>'+
				  			 '<td id="'+daySchs[i].id+'_slave_f_b" class="c-146ac9 w-30" baovalue="0" onclick="baoPeilv(\''+daySchs[i].id+'_slave_f_b\');" style="cursor:pointer;">包</td>'+
				  			 '</tr>'+
				  			 '</tbody>'+
				  			 '</table>'+
				  			 '</td></tr>';
			  }
		}
		$(schHtml).appendTo($("#jczqTable"));
		// Added for js装载赛程 at 2013/10/10 end
	}
	for ( var property in schedules ) {
		var daySchs = schedules[property];
		var liveCount = 0;
		for ( var i = 0; i < daySchs.length; i++ ) {
			if(daySchs[i].gameType.indexOf(tagType) > -1){
				liveCount++;
			}
		}
		$("#toggleTr12" + property).html(liveCount);
	}
}
$(document).ready(function() {
	loadSchs();
	
    var _c_arr = new Array();

    var tagType = $("#tagType").val();
    // 选中过关或单关的背景
    $("#tabBox_" + tagType).attr("class", "on");
	
    if (tagType == 'd') {
    	reGenerateDanGuan();
//        $("#lilun").hide();
        $("#lookBonusInfoId").hide();
	}

    // 过关投注和单关投注处理流程
    if (tagType == 'g' || tagType == 'd') {
        
//        loadLM("/lottery/jczq/spf/index.jhtml");

        // 停止出票时间
        var closeTime = $("#closeTime").val();
        // 当前年月日:格式为2013-09-13
        var currYMD = $("#currYMD").val();

        /**
         * <p>Desc:页面加载后自动从本页面对阵信息中抓取所需信息放到确认投注信息栏并自动隐藏
         *         计算五大联赛数量
         *         计算以截止比赛数量
         * </p>
         */
        generateTouzhuMessage();

        /**
         * <p>Desc:单击显示联赛</p>
         */
        /*$("#ls").click(function() {
        	if($("#ls_slave").is(":hidden")){
        		$("#ls_slave").slideDown(187);
        	}else{
        		$("#ls_slave").slideUp(187);
        	}
        });*/

//        /**
//         * <p>Desc:鼠标放到该区域显示联赛</p>
//         */
//        $("#ls").mouseover(function() {
//    		$("#ls_slave").slideDown(187);
//        });
//
//        /**
//         * <p>Desc:鼠标离开该区域隐藏联赛</p>
//         */
//        $("#ls").mouseout(function() {
//    		$("#ls_slave").slideUp();
//        });
//
//        /**
//         * <p>Desc:鼠标放到该区域显示联赛</p>
//         */
//        $("#ls_slave").mouseover(function() {
//    		$("#ls_slave").slideDown();
//        });
//
//        /**
//         * <p>Desc:鼠标离开该区域显示联赛</p>
//         */
//        //$("#ls_slave").mouseout(function() {
//    	//	$("#ls_slave").slideUp();
//        //});

        /**
         * <p>Desc:赛事选择复选框事件</p>
         */
        $("#ls_slave li input[type='checkbox']").click(function() {
        	var num = 0;
            if ($(this).is(":checked")){
            	var id = $(this).parent().attr("id");
            	$("#jczqTable tr[leagueId=\'"+id+"\']").each(function() {
                    $(this).show();
                    $("#"+$(this).attr("id")+"_slave").show();
                    num++;
                });
                hideNum(-num);

                // 解除引用便于js垃圾回收
                num = null;
            }else{
            	var id = $(this).parent().attr("id");
            	$("#jczqTable tr[leagueId=\'"+id+"\']").each(function() {
                    $(this).hide();
                    $("#"+$(this).attr("id")+"_slave").hide(187);
                    num++;
                });
                hideNum(num);

                // 解除引用便于js垃圾回收
                num = null;
            }
        });

        /**
         * <p>Desc:全选联赛</p>
         */
        $("#selAll").click(function() {
            $("#jczqTable tr").slideDown(187);
        });

        /**
         * <p>Desc:反选联赛</p>
         */
        $("#unSelAll").click(function() {
            $("#jczqTable tr").each(function() {
                if ($(this).attr("hideType") == "hide") {
                	if($(this).is(":hidden")){
                        $(this).slideDown(187);
                	}else{
                        $(this).slideUp(187);
                	}
                }
            });
        });

        /**
         * <p>Desc:显示全部</p>
         */
        $("#showAll").click(function() {
            $("#jczqTable tr").slideDown(187);
            $("#hidNum").html(0);
        });

        /**
         * <p>Desc:比分显示全部</p>
         */
        $("#bfShowAll").click(function() {
            $("#jczqTable tr[ms='master']").slideDown(187);
            $("#hidNum").html(0);
        });

        /**
         * <p>Desc:让球</p>
         */
        $("#rqC").click(function() {
            if ($(this).is(":checked")) {
                var num = 0;
                $("#jczqTable tr td[name='rq']").each(function() {
                    var rqNum = $(this).html();
                    if (rqNum != 0) {
                        $(this).parent().show();
                        num++;
                    }
                });
                hideNum(-num);

                // 解除引用便于js垃圾回收
                num = null;
            } else {
                var num = 0;
                $("#jczqTable tr td[name='rq']").each(function() {
                    var rqNum = $(this).html();
                    if (rqNum != 0) {
                        $(this).parent().hide();
                        num++;
                    }
                });
                hideNum(num);

                // 解除引用便于js垃圾回收
                num = null;
            }
        });

        /**
         * <p>Desc:非让球</p>
         */
        $("#frqC").click(function() {
            if ($(this).is(":checked")) {
                var num = 0;
                $("#jczqTable tr td[name='rq']").each(function() {
                    var rqNum = $(this).html();
                    if (rqNum == 0) {
                        $(this).parent().show();
                        num++;
                    }
                });
                hideNum(num);

                // 解除引用便于js垃圾回收
                num = null;
            } else {
                var num = 0;
                $("#jczqTable tr td[name='rq']").each(function() {
                    var rqNum = $(this).html();
                    if (rqNum == 0) {
                        $(this).parent().hide();
                        num++;
                    }
                });
                hideNum(-num);

                // 解除引用便于js垃圾回收
                num = null;
            }
        });

        /**
         * <p>Desc:仅五大联赛</p>
         */
        $("#liansaiC").click(function() {
            if ($(this).is(":checked")) {
                var num = 0;
                $("#jczqTable tr").each(function() {
                    var leagueId = $(this).attr("leagueId");
                    if (leagueId < 6) {
                        $(this).hide();
                        num++;
                    }
                });
                hideNum(num);

                // 解除引用便于js垃圾回收
                num = null;
            } else {
                var num = 0;
                $("#jczqTable tr").each(function() {
                    var leagueId = $(this).attr("leagueId");
                    if (leagueId < 6) {
                        $(this).show();
                        num++;
                    }
                });
                hideNum(-num);

                // 解除引用便于js垃圾回收
                num = null;
            }
        });

        /**
         * <p>Desc:已截止</p>
         */
        $("#yjzC").click(function() {
            if ($(this).is(":checked")) {
                $("#jczqTable tr").each(function() {
                    if ($(this).attr("hideType") == "hide") {
                        $(this).show();
                    }
                });
            } else {
                $("#jczqTable tr").each(function() {
                    if ($(this).attr("hideType") == "hide") {
                        $(this).hide();
                    }
                });
            }
        });

        /**
         * <p>Desc:赛事回查</p>
         */
        $("#date").change(function() {
        	loadLM("/lottery/jczq/spf/"+$(this).val()+".jhtml");
        });

        /**
         * <p>Desc:购彩截止时间以及比赛开始时间</p>
         */
        $("#startOrEndTime").change(function() {
            if ($(this).val() == "startTime") {
                $("#jczqTable tr td[name='startOrEndTime']").each(
                function() {$(this).html(
                    $(this).attr("dt"));
                });
            } else {
                $("#jczqTable tr td[name='startOrEndTime']").each(function() {
                    $(this).html($(this).attr("saleCloseTime"));
                });
            }
        });

        /**
         * <p>Desc:赛事复选框事件</p>
         */
        $(".jczqTable tr td input[type='checkbox']").click(function() {
            if (!$(this).is(":checked")) {
                $(this).attr("checked", true);
                $(this).parent().parent().slideUp(187);
                var slaveId = $(this).attr("id").replace("cb","");
                $("#"+slaveId+"slave").slideUp(187);
                hideNum(1);
                slaveId = null;
            }
        });

        /**
         * <p>Desc:隐藏比分投注区、显示比分投注区</p>
         */
        $(".jczqTable tr td input[type='button']").click(function() {
        	var showSlave = $(this).val();
            if (showSlave=="隐藏比分投注区") {
                var slaveId = $(this).attr("id").replace("sah","");
                $("#"+slaveId+"slave").slideUp(187);
                $(this).val("显示比分投注区");
            }
            if (showSlave=="显示比分投注区") {
                var slaveId = $(this).attr("id").replace("sah","");
                $("#"+slaveId+"slave").slideDown(187);
                $(this).val("隐藏比分投注区");
            }
        });
     }
});

/**
 * <p>Desc:隐藏当天的对阵</p>
 * <p>return:无返回值</p>
 */
function hideTr(obj) {
    var hidNum = 0;
    $("#jczqTable").find("tr").each(function(i) {
    var trId = $(this).attr("id");
        if (trId != undefined) {
		    if($("#"+trId).attr("name")==obj){
                $("#" + trId).find("td input").each(function(i) {
                    var inputId = $(this).attr("id");
                    if (inputId != undefined) {
                        if (inputId == trId + '_cb') {
                            if ($("#" + inputId).is(":checked")&&!$("#" + trId).is(":hidden")) {
                                $("#"+ trId).slideUp(87);
                                $("#"+trId+"_slave").slideUp(87);
                                hidNum++;
                            }
                        }
                    }
                });
			}
        }

        // 解除引用便于js垃圾回收
        trId = null;
    });
	
    hideNum(hidNum);
	$("#hideTr"+obj).hide();
	$("#showTr"+obj).show();

    // 解除引用便于js垃圾回收
    hidNum = null;
}

/**
 * <p>Desc:显示当天的对阵</p>
 * <p>return:无返回值</p>
 */
function showTr(obj) {
    var hidNum = 0;
    $("#jczqTable").find("tr").each(function(i) {
        var trId = $(this).attr("id");
        if (trId != undefined) {
		    if($("#"+trId).attr("name")==obj){
                $("#" + trId).find("td input").each(function(i) {
                    var inputId = $(this).attr("id");
                    if (inputId != undefined) {
                        if (inputId == trId + '_cb') {
                            if ($("#" + inputId).is(":checked")) {
                                $("#" + trId).slideDown(187);
                                $("#"+trId+"_slave").slideDown(87);
                                hidNum++;
                            }
                        }
                    }
                });
			}
        }
        // 解除引用便于js垃圾回收
        trId = null;
    });
	
    hideNum(-hidNum);
	$("#showTr"+obj).hide();
	$("#hideTr"+obj).show();

    // 解除引用便于js垃圾回收
    hidNum = null;
}

/**
 * <p>Desc:已隐藏比赛数量</p>
 * <p>return:无返回值</p>
 */
function hideNum(addHidNum) {
    var hidNum = $("#hidNum").html();
    if (hidNum < 0)
        hidNum == 0;
    if (addHidNum < 0)
        addHidNum == 0;
    $("#hidNum").html(parseInt(hidNum) + parseInt(addHidNum));
}

/**
 * <p>Desc:页面加载后自动从本页面对阵信息中抓取所需信息放到确认投注信息栏并自动隐藏
 *         计算五大联赛数量
 *         计算以截止比赛数量
 * </p>
 * <p>return:无返回值</p>
 */
function generateTouzhuMessage() {
	
	var subPlayId = $("#subPlayId").val();
	// 生成胜平负投注信息
	if(subPlayId=="1"  ) {
		if ( $("#brqFlagId").length > 0 ) {
			generateBrqSpf();
		} else {
			generateJczqSpf();
		}
	}
	// 生成比分投注信息
	if(subPlayId=="3") generateJczqBf();
	// 生成总进球投注信息
	if(subPlayId=="2") generateJczqZjq();
	// 生成半全场投注信息
	if(subPlayId=="4") generateJczqBqc();
	if(subPlayId=="6") generateBrqSpf();
}

function generateBrqSpf(){

    var yjzCLabelNum = 0;
    var leagueIdNum = 0;
    var toggleTrNum = 0;
    var showTrNum = 0;
    var danMaList = '';
    var lsList = "";
    var tagType = $("#tagType").val();
    var closeTime = $("#closeTime").val();
    var toggleTr = 0;
    
    var trs = $("#jczqTable").find("tr");
    //for ( var i = 0 ; i < trs.length; i++ ) {
    $("#jczqTable").find("tr").each(function(i) {
    	
        var trId = $(this).attr("id");
        if (trId != undefined) {
        	var gameType = $(this).attr("gameType");
        	if(tagType==gameType||"dg"==gameType){
                var trSaleCloseTime = $(this).attr("saleCloseTime");
                var name = $(this).attr("name");
                if (closeTime < trSaleCloseTime) {
                	toggleTr = $("#toggleTr"+name).html();
                	toggleTr++;
                	$("#toggleTr"+name).html(toggleTr);
                	 var odds = $('#' + trId + "_s").attr(tagType + "odds");
                     $('#' + trId + "_s").html(odds);
                     
                     var oddp = $('#' + trId + "_p").attr(tagType + "odds");
                     $('#' + trId + "_p").html(oddp);
                     
                     var oddf = $('#' + trId + "_f").attr(tagType + "odds");
                     $('#' + trId + "_f").html(oddf);
                    
                    danMaList = '';
                    danMaList += "<dd id='" + trId;
                    danMaList += "_dd'";
                    danMaList += " issueWeek='" + $('#' + trId).attr("id");
                    danMaList += "' saleCloseTime='" + trSaleCloseTime;
                    danMaList += "' rq='" + $('#' + trId).attr("rq");
                    danMaList += "' style='display:none'><p>";
                    $("#" + trId).find("td").each(function(i) {
                        var tdId = $(this).attr("id");
                        if (tdId != undefined) {
                            if (tdId == trId + '_cc') {
                                danMaList += "<span class='w-70'><input id='";
                                danMaList += tdId + "_t";
                                danMaList += "' type='checkbox' checked/>";
                                danMaList += $(this).text();
                                danMaList += "</span>";
                            }
                            
                            if (tdId == trId + '_cf') {
                            	var includeStr = "<li id=\""+$("#"+trId).attr("leagueId")+"\"";
                                if(lsList.indexOf(includeStr) < 0){
                                    lsList += "<li id=\""+$("#"+trId).attr("leagueId")+"\"><input type=\"checkbox\" checked=\"checked\" />"+$(this).text()+"</li>";
                                }
                            }

                            if (tdId == trId + '_srd') {
                            	var minute = $("#minute").val();
                            	if(minute>0&&minute!=''){
                                	var time = getDiffMinute(trSaleCloseTime,minute);
                                	$(this).html(time);
                                	$(this).attr("saleCloseTime",time);
                            	}
                            }
                                  
                            if (tdId == trId + '_zd') {
                                danMaList += "<span class='a-c'>";
                                danMaList += $(this).text();
                                danMaList += "vs";
                            }
                            if (tdId == trId + '_kd') {
                                danMaList += $(this).text();
                                danMaList += "</span>";
                            }
                        }
                    });

                    danMaList += "</p>";
                    danMaList += "<p>";
					if(tagType=="d"){
                        danMaList += "<span class='dan w-40'><input id='" + trId + "_cc_d'" + " type='checkbox' disabled='disabled'/></span>";
					}else{
                        danMaList += "<span class='dan w-40'><input id='" + trId + "_cc_d'" + " type='checkbox' onclick='danSetFun(this);'/></span>";
					}
                    danMaList += "<span><em id='" + trId + "_s_z'";
                    danMaList += " type='3' odd='" + odds + "' style='display:none'>主胜</em><em id='" + trId + "_p_z'";
                    danMaList += " type='1' odd='" + oddp + "' style='display:none'>平</em><em id='" + trId + "_f_z'";
                    danMaList += " type='0' odd='" + oddf + "' style='display:none'>主负</em></span>";
                    danMaList += "</p>";
                    danMaList += "</dd>";
                    $("#danMaList").append(danMaList);
 
                    // 解除引用便于js垃圾回收
                    danMaList = null;
                } else {
                	$("#"+trId).hide();
                	$("#"+trId).attr("hideType","hide");
                    toggleTrNum++;
                    yjzCLabelNum++;
                }

                // 五大联赛对阵数
                if ($(this).attr("leagueId") < 6) {
                    if ($(this).attr("hideType") == 'show') {
                        leagueIdNum++;
                    }
                }
                
                // 解除引用便于js垃圾回收
                gameType = null;
        	}else{
            	$("#"+trId).hide();
        	}
        }
    });
    
    $("#ls_slave").append(lsList);
//    $("#ls_slave").append("<li class=\"li\"><a id=\"selAll\">全选</a><a id=\"unSelAll\">反选</a></li>");

    // 解除引用便于js垃圾回收
    danMaList = null;

    // n场比赛已截止
    if (toggleTrNum > 0) {
        $("#toggleTr22").html("1场比赛已截止");
        $("#hidTr22").show();
    } else {
        $("#toggleTr22").html("1场比赛可投注");
        $("#hidTr22").hide();
        $("#showTr22").show();
    }

    $("#liansaiCLabel").html("仅五大联赛(" + leagueIdNum + ")");
    $("#yjzCLabel").html("已截止(" + yjzCLabelNum + ")");

    // 解除引用便于js垃圾回收
    leagueIdNum = null;
    yjzCLabelNum = null;
}

/**
 * <p>Desc:生成胜平负投注信息
 *         计算五大联赛数量
 *         计算以截止比赛数量
 * </p>
 * <p>return:无返回值</p>
 */
function generateJczqSpf(){

    var yjzCLabelNum = 0;
    var leagueIdNum = 0;
    var toggleTrNum = 0;
    var showTrNum = 0;
    var danMaList = '';
    var lsList = "";
    var tagType = $("#tagType").val();
    var closeTime = $("#closeTime").val();
    var toggleTr = 0;
    
    $("#jczqTable").find("tr").each(function(i) {
    	
        var trId = $(this).attr("id");
        if (trId != undefined) {
        	var gameType = $(this).attr("gameType");
        	if(tagType==gameType||"dg"==gameType){
                var trSaleCloseTime = $(this).attr("saleCloseTime");
                var name = $(this).attr("name");
                if (closeTime < trSaleCloseTime) {
                	toggleTr = $("#toggleTr"+name).html();
                	toggleTr++;
                	$("#toggleTr"+name).html(toggleTr);
                    var odds = $('#' + trId + "_s").attr(tagType + "odds");
                    $('#' + trId + "_s").html(odds);
                    
                    var oddp = $('#' + trId + "_p").attr(tagType + "odds");
                    $('#' + trId + "_p").html(oddp);
                    
                    var oddf = $('#' + trId + "_f").attr(tagType + "odds");
                    $('#' + trId + "_f").html(oddf);
                    
                    danMaList = '';
                    danMaList += "<dd id='" + trId;
                    danMaList += "_dd'";
                    danMaList += " issueWeek='" + $('#' + trId).attr("id");
                    danMaList += "' saleCloseTime='" + trSaleCloseTime;
                    danMaList += "' rq='" + $('#' + trId).attr("rq");
                    danMaList += "' style='display:none'><p>";
                    $("#" + trId).find("td").each(function(i) {
                        var tdId = $(this).attr("id");
                        if (tdId != undefined) {
                            if (tdId == trId + '_cc') {
                                danMaList += "<span class='w-70'><input id='";
                                danMaList += tdId + "_t";
                                danMaList += "' type='checkbox' checked/>";
                                danMaList += $(this).text();
                                danMaList += "</span>";
                            }
                            
                            if (tdId == trId + '_cf') {
                            	var includeStr = "<li id=\""+$("#"+trId).attr("leagueId")+"\"";
                                if(lsList.indexOf(includeStr) < 0){
                                    lsList += "<li id=\""+$("#"+trId).attr("leagueId")+"\"><input type=\"checkbox\" checked=\"checked\" />"+$(this).text()+"</li>";
                                }
                            }

                            if (tdId == trId + '_srd') {
                            	var minute = $("#minute").val();
                            	if(minute>0&&minute!=''){
                                	var time = getDiffMinute(trSaleCloseTime,minute);
                                	$(this).html(time);
                                	$(this).attr("saleCloseTime",time);
                            	}
                            }
                                  
                            if (tdId == trId + '_zd') {
                                danMaList += "<span class='a-c'>";
                                danMaList += $(this).text();
                                danMaList += "vs";
                            }
                            if (tdId == trId + '_kd') {
                                danMaList += $(this).text();
                                danMaList += "</span>";
                            }
                        }
                    });

                    danMaList += "</p>";
                    danMaList += "<p>";
					if(tagType=="d"){
                        danMaList += "<span class='dan w-40'><input id='" + trId + "_cc_d'" + " type='checkbox' disabled='disabled'/></span>";
					}else{
                        danMaList += "<span class='dan w-40'><input id='" + trId + "_cc_d'" + " type='checkbox' onclick='danSetFun(this);'/></span>";
					}
                    danMaList += "<span><em id='" + trId + "_s_z'";
                    danMaList += " type='3' odd='" + odds + "' style='display:none'>主胜["+$('#' + trId).attr("rq")+"]</em><em id='" + trId + "_p_z'";
                    danMaList += " type='1' odd='" + oddp + "' style='display:none'>平["+$('#' + trId).attr("rq")+"]</em><em id='" + trId + "_f_z'";
                    danMaList += " type='0' odd='" + oddf + "' style='display:none'>主负["+$('#' + trId).attr("rq")+"]</em></span>";
                    danMaList += "</p>";
                    danMaList += "</dd>";
                    $("#danMaList").append(danMaList);
 
                    // 解除引用便于js垃圾回收
                    danMaList = null;
                } else {
                	$("#"+trId).hide();
                	$("#"+trId).attr("hideType","hide");
                    toggleTrNum++;
                    yjzCLabelNum++;
                }

                // 五大联赛对阵数
                if ($(this).attr("leagueId") < 6) {
                    if ($(this).attr("hideType") == 'show') {
                        leagueIdNum++;
                    }
                }
                
                // 解除引用便于js垃圾回收
                gameType = null;
        	}else{
            	$("#"+trId).hide();
        	}
        }
    });
    
    $("#ls_slave").append(lsList);
//    $("#ls_slave").append("<li class=\"li\"><a id=\"selAll\">全选</a><a id=\"unSelAll\">反选</a></li>");

    // 解除引用便于js垃圾回收
    danMaList = null;

    // n场比赛已截止
    if (toggleTrNum > 0) {
        $("#toggleTr22").html("1场比赛已截止");
        $("#hidTr22").show();
    } else {
        $("#toggleTr22").html("1场比赛可投注");
        $("#hidTr22").hide();
        $("#showTr22").show();
    }

    $("#liansaiCLabel").html("仅五大联赛(" + leagueIdNum + ")");
    $("#yjzCLabel").html("已截止(" + yjzCLabelNum + ")");

    // 解除引用便于js垃圾回收
    leagueIdNum = null;
    yjzCLabelNum = null;
}

/**
 * <p>Desc:生成比分投注信息
 *         计算五大联赛数量
 *         计算以截止比赛数量
 * </p>
 * <p>return:无返回值</p>
 */
function generateJczqBf(){

    var yjzCLabelNum = 0;
    var leagueIdNum = 0;
    var toggleTrNum = 0;
    var showTrNum = 0;
    var danMaList = '';
    var lsList = "";
    var tagType = $("#tagType").val();
    var closeTime = $("#closeTime").val();
    var toggleTr = 0;
    var showNum = 0;
    
    $("#jczqTable").find("tr").each(function(i) {
        var trId = $(this).attr("id");
        if (trId != undefined) {
        	if(trId.indexOf("_")<=0){
                var trSaleCloseTime = $(this).attr("saleCloseTime");
                var name = $(this).attr("name");
                if (closeTime < trSaleCloseTime) {
                	showNum ++;
                	if(showNum==1){
                        $("#"+trId+"_slave").css("display","");
                        $("#"+trId+"_sah").val("隐藏比分投注区");                		
                	}
                	toggleTr = $("#toggleTr"+name).html();
                	toggleTr++;
                	$("#toggleTr"+name).html(toggleTr);
                    danMaList = '';
                    danMaList += "<dd id='" + trId;
                    danMaList += "_dd'";
                    danMaList += " issueWeek='" + $('#' + trId).attr("id");
                    danMaList += "' saleCloseTime='" + trSaleCloseTime;
                    danMaList += "' rq='0' style='display:none'><p>";
                    $("#" + trId).find("td").each(function(i) {
                        var tdId = $(this).attr("id");
                        if (tdId != undefined) {
                            if (tdId == trId + '_cc') {
                                danMaList += "<span class='w-70'><input id='";
                                danMaList += tdId + "_t";
                                danMaList += "' type='checkbox' checked='checked'/>";
                                danMaList += $(this).text();
                                danMaList += "</span>";
                            }
                            
                            if (tdId == trId + '_cf') {
                            	var includeStr = "<li id=\""+$("#"+trId).attr("leagueId")+"\"";
                                if(lsList.indexOf(includeStr) < 0){
                                    lsList += "<li id=\""+$("#"+trId).attr("leagueId")+"\"><input type=\"checkbox\" checked=\"checked\" />"+$(this).text()+"</li>";
                                }
                            }

                            if (tdId == trId + '_srd') {
                            	var minute = $("#minute").val();
                            	var time = getDiffMinute(trSaleCloseTime,minute);
                            	$(this).html(time);
                            	$(this).attr("saleCloseTime",time);
                            }

                            if (tdId == trId + '_zd') {
                                danMaList += "<span class='a-c'>";
                                danMaList += $(this).children("em").text();
                                danMaList += "vs";
                            }
                            if (tdId == trId + '_kd') {
                                danMaList += $(this).children("em").text();
                                danMaList += "</span>";
                            }
                        }
                    });

                    danMaList += "</p>";
                    danMaList += "<p>";
					if(tagType=="d"){
                        danMaList += "<span class='dan w-40'><input id='" + trId + "_cc_d'" + " type='checkbox' disabled='disabled'/></span>";
					}else{
                        danMaList += "<span class='dan w-40'><input id='" + trId + "_cc_d'" + " type='checkbox' onclick='danSetFun(this);'/></span>";
					}
                    danMaList += "<em type='0' id='" + trId + "_slave_0_dd' odd='" + $('#' + trId + "_slave_0").attr(tagType + "odds") + "' style='display:none'>胜其它</em>";
                    danMaList += "<em type='1' id='" + trId + "_slave_1_dd' odd='" + $('#' + trId + "_slave_1").attr(tagType + "odds") + "' style='display:none'>1:0</em>";
                    danMaList += "<em type='2' id='" + trId + "_slave_2_dd' odd='" + $('#' + trId + "_slave_2").attr(tagType + "odds") + "' style='display:none'>2:0</em>";
                    danMaList += "<em type='3' id='" + trId + "_slave_3_dd' odd='" + $('#' + trId + "_slave_3").attr(tagType + "odds") + "' style='display:none'>2:1</em>";
                    danMaList += "<em type='4' id='" + trId + "_slave_4_dd' odd='" + $('#' + trId + "_slave_4").attr(tagType + "odds") + "' style='display:none'>3:0</em>";
                    danMaList += "<em type='5' id='" + trId + "_slave_5_dd' odd='" + $('#' + trId + "_slave_5").attr(tagType + "odds") + "' style='display:none'>3:1</em>";
                    danMaList += "<em type='6' id='" + trId + "_slave_6_dd' odd='" + $('#' + trId + "_slave_6").attr(tagType + "odds") + "' style='display:none'>3:2</em>";
                    danMaList += "<em type='7' id='" + trId + "_slave_7_dd' odd='" + $('#' + trId + "_slave_7").attr(tagType + "odds") + "' style='display:none'>4:0</em>";
                    danMaList += "<em type='8' id='" + trId + "_slave_8_dd' odd='" + $('#' + trId + "_slave_8").attr(tagType + "odds") + "' style='display:none'>4:1</em>";
                    danMaList += "<em type='9' id='" + trId + "_slave_9_dd' odd='" + $('#' + trId + "_slave_9").attr(tagType + "odds") + "' style='display:none'>4:2</em>";
                    danMaList += "<em type='10' id='" + trId + "_slave_10_dd' odd='" + $('#' + trId + "_slave_10").attr(tagType + "odds") + "' style='display:none'>5:0</em>";
                    danMaList += "<em type='11' id='" + trId + "_slave_11_dd' odd='" + $('#' + trId + "_slave_11").attr(tagType + "odds") + "' style='display:none'>5:1</em>";
                    danMaList += "<em type='12' id='" + trId + "_slave_12_dd' odd='" + $('#' + trId + "_slave_12").attr(tagType + "odds") + "' style='display:none'>5:2</em>";
                    danMaList += "<em type='13' id='" + trId + "_slave_13_dd' odd='" + $('#' + trId + "_slave_13").attr(tagType + "odds") + "' style='display:none'>平其它</em>";
                    danMaList += "<em type='14' id='" + trId + "_slave_14_dd' odd='" + $('#' + trId + "_slave_14").attr(tagType + "odds") + "' style='display:none'>0:0</em>";
                    danMaList += "<em type='15' id='" + trId + "_slave_15_dd' odd='" + $('#' + trId + "_slave_15").attr(tagType + "odds") + "' style='display:none'>1:1</em>";
                    danMaList += "<em type='16' id='" + trId + "_slave_16_dd' odd='" + $('#' + trId + "_slave_16").attr(tagType + "odds") + "' style='display:none'>2:2</em>";
                    danMaList += "<em type='17' id='" + trId + "_slave_17_dd' odd='" + $('#' + trId + "_slave_17").attr(tagType + "odds") + "' style='display:none'>3:3</em>";
                    danMaList += "<em type='18' id='" + trId + "_slave_18_dd' odd='" + $('#' + trId + "_slave_18").attr(tagType + "odds") + "' style='display:none'>负其它</em>";
                    danMaList += "<em type='19' id='" + trId + "_slave_19_dd' odd='" + $('#' + trId + "_slave_19").attr(tagType + "odds") + "' style='display:none'>0:1</em>";
                    danMaList += "<em type='20' id='" + trId + "_slave_20_dd' odd='" + $('#' + trId + "_slave_20").attr(tagType + "odds") + "' style='display:none'>0:2</em>";
                    danMaList += "<em type='21' id='" + trId + "_slave_21_dd' odd='" + $('#' + trId + "_slave_21").attr(tagType + "odds") + "' style='display:none'>1:2</em>";
                    danMaList += "<em type='22' id='" + trId + "_slave_22_dd' odd='" + $('#' + trId + "_slave_22").attr(tagType + "odds") + "' style='display:none'>0:3</em>";
                    danMaList += "<em type='23' id='" + trId + "_slave_23_dd' odd='" + $('#' + trId + "_slave_23").attr(tagType + "odds") + "' style='display:none'>1:3</em>";
                    danMaList += "<em type='24' id='" + trId + "_slave_24_dd' odd='" + $('#' + trId + "_slave_24").attr(tagType + "odds") + "' style='display:none'>2:3</em>";
                    danMaList += "<em type='25' id='" + trId + "_slave_25_dd' odd='" + $('#' + trId + "_slave_25").attr(tagType + "odds") + "' style='display:none'>0:4</em>";
                    danMaList += "<em type='26' id='" + trId + "_slave_26_dd' odd='" + $('#' + trId + "_slave_26").attr(tagType + "odds") + "' style='display:none'>1:4</em>";
                    danMaList += "<em type='27' id='" + trId + "_slave_27_dd' odd='" + $('#' + trId + "_slave_27").attr(tagType + "odds") + "' style='display:none'>2:4</em>";
                    danMaList += "<em type='28' id='" + trId + "_slave_28_dd' odd='" + $('#' + trId + "_slave_28").attr(tagType + "odds") + "' style='display:none'>0:5</em>";
                    danMaList += "<em type='29' id='" + trId + "_slave_29_dd' odd='" + $('#' + trId + "_slave_29").attr(tagType + "odds") + "' style='display:none'>1:5</em>";
                    danMaList += "<em type='30' id='" + trId + "_slave_30_dd' odd='" + $('#' + trId + "_slave_30").attr(tagType + "odds") + "' style='display:none'>2:5</em>";
                    danMaList += "</span>";
                    danMaList += "</p>";
                    danMaList += "</dd>";
                    $("#danMaList").append(danMaList);
                    // 解除引用便于js垃圾回收
                    danMaList = null;
                } else {
                	$(this).hide();
                	$("#"+trId+"_slave").hide();
                	$(this).attr("hideType","hide");
                    toggleTrNum++;
                    yjzCLabelNum++;
                }

                // 五大联赛对阵数
                if ($(this).attr("leagueId") < 6) {
                    if ($(this).attr("hideType") == 'show') {
                        leagueIdNum++;
                    }
                }
                
                // 解除引用便于js垃圾回收
                gameType = null;
        	}
        }
    });
    
    $("#ls_slave").append(lsList);
//    $("#ls_slave").append("<li class=\"li\"><a id=\"selAll\">全选</a><a id=\"unSelAll\">反选</a></li>");

    // 解除引用便于js垃圾回收
    danMaList = null;

    // n场比赛已截止
    if (toggleTrNum > 0) {
        $("#toggleTr22").html("1场比赛已截止");
        $("#hidTr22").show();
    } else {
        $("#toggleTr22").html("1场比赛可投注");
        $("#hidTr22").hide();
        $("#showTr22").show();
    }

    $("#liansaiCLabel").html("仅五大联赛(" + leagueIdNum + ")");
    $("#yjzCLabel").html("已截止(" + yjzCLabelNum + ")");

    // 解除引用便于js垃圾回收
    leagueIdNum = null;
    yjzCLabelNum = null;
}

/**
 * <p>Desc:生成总进球投注信息
 *         计算五大联赛数量
 *         计算以截止比赛数量
 * </p>
 * <p>return:无返回值</p>
 */
function generateJczqZjq(){

    var yjzCLabelNum = 0;
    var leagueIdNum = 0;
    var toggleTrNum = 0;
    var toggleTrNum = 0;
    var showTrNum = 0;
    var danMaList = '';
    var lsList = "";
    var tagType = $("#tagType").val();
    var closeTime = $("#closeTime").val();
    var toggleTr = 0;
    
    $("#jczqTable").find("tr").each(function(i) {
        var trId = $(this).attr("id");
        if (trId != undefined) {
        	var gameType = $(this).attr("gameType");
        	if(tagType==gameType||"dg"==gameType){
                var trSaleCloseTime = $(this).attr("saleCloseTime");
                var name = $(this).attr("name");
                if (closeTime < trSaleCloseTime) {
                	toggleTr = $("#toggleTr"+name).html();
                	toggleTr++;
                	$("#toggleTr"+name).html(toggleTr);
                	var odds = $('#' + trId + "_0").attr(tagType + "odds");
                    $('#' + trId + "_0").html(odds);
                    var oddp = $('#' + trId + "_1").attr(tagType + "odds");
                    $('#' + trId + "_1").html(oddp);
                    var oddf = $('#' + trId + "_2").attr(tagType + "odds");
                    $('#' + trId + "_2").html(oddf);
                    oddf = $('#' + trId + "_3").attr(tagType + "odds");
                    $('#' + trId + "_3").html(oddf);
                    oddf = $('#' + trId + "_4").attr(tagType + "odds");
                    $('#' + trId + "_4").html(oddf);
                    oddf = $('#' + trId + "_5").attr(tagType + "odds");
                    $('#' + trId + "_5").html(oddf);
                    oddf = $('#' + trId + "_6").attr(tagType + "odds");
                    $('#' + trId + "_6").html(oddf);
                    oddf = $('#' + trId + "_7").attr(tagType + "odds");
                    $('#' + trId + "_7").html(oddf);
                    
                    danMaList = '';
                    danMaList += "<dd id='" + trId;
                    danMaList += "_dd'";
                    danMaList += " issueWeek='" + $('#' + trId).attr("id");
                    danMaList += "' saleCloseTime='" + trSaleCloseTime;
                    danMaList += "' rq='0' style='display:none'><p>";
                    $("#" + trId).find("td").each(function(i) {
                        var tdId = $(this).attr("id");
                        if (tdId != undefined) {
                            if (tdId == trId + '_cc') {
                                danMaList += "<span class='w-70'><input id='";
                                danMaList += tdId + "_t";
                                danMaList += "' type='checkbox' checked='checked'/>";
                                danMaList += $(this).text();
                                danMaList += "</span>";
                            }
                            
                            if (tdId == trId + '_cf') {
                            	var includeStr = "<li id=\""+$("#"+trId).attr("leagueId")+"\"";
                                if(lsList.indexOf(includeStr) < 0){
                                    lsList += "<li id=\""+$("#"+trId).attr("leagueId")+"\"><input type=\"checkbox\" checked=\"checked\" />"+$(this).text()+"</li>";
                                }
                            }

                            if (tdId == trId + '_zd') {
                                danMaList += "<span class='a-c'>";
                                danMaList += $(this).children("em").text();
                                danMaList += "vs";
                            }

                            if (tdId == trId + '_srd') {
                            	var minute = $("#minute").val();
                            	var time = getDiffMinute(trSaleCloseTime,minute);
                            	$(this).html(time);
                            	$(this).attr("saleCloseTime",time);
                            }
                            
                            if (tdId == trId + '_kd') {
                                danMaList += $(this).children("em").text();
                                danMaList += "</span>";
                            }
                        }
                    });

                    danMaList += "</p>";
                    danMaList += "<p>";
					
					if(tagType=="d"){
                        danMaList += "<span class='dan w-40'><input id='" + trId + "_cc_d'" + " type='checkbox' disabled='disabled'/></span>";
					}else{
                        danMaList += "<span class='dan w-40'><input id='" + trId + "_cc_d'" + " type='checkbox' onclick='danSetFun(this);'/></span>";
					}
                    danMaList += "<em type='0' id='" + trId + "_0_dd' odd='" + $('#' + trId + "_0").attr(tagType + "odds") + "' style='display:none'>0</em>";
                    danMaList += "<em type='1' id='" + trId + "_1_dd' odd='" + $('#' + trId + "_1").attr(tagType + "odds") + "' style='display:none'>1</em>";
                    danMaList += "<em type='2' id='" + trId + "_2_dd' odd='" + $('#' + trId + "_2").attr(tagType + "odds") + "' style='display:none'>2</em>";
                    danMaList += "<em type='3' id='" + trId + "_3_dd' odd='" + $('#' + trId + "_3").attr(tagType + "odds") + "' style='display:none'>3</em>";
                    danMaList += "<em type='4' id='" + trId + "_4_dd' odd='" + $('#' + trId + "_4").attr(tagType + "odds") + "' style='display:none'>4</em>";
                    danMaList += "<em type='5' id='" + trId + "_5_dd' odd='" + $('#' + trId + "_5").attr(tagType + "odds") + "' style='display:none'>5</em>";
                    danMaList += "<em type='6' id='" + trId + "_6_dd' odd='" + $('#' + trId + "_6").attr(tagType + "odds") + "' style='display:none'>6</em>";
                    danMaList += "<em type='7' id='" + trId + "_7_dd' odd='" + $('#' + trId + "_7").attr(tagType + "odds") + "' style='display:none'>7+</em>";
                    danMaList += "</span>";
                    danMaList += "</p>";
                    danMaList += "</dd>";
                    $("#danMaList").append(danMaList);
                    // 解除引用便于js垃圾回收
                    danMaList = null;
                } else {
                	$(this).hide();
                	$(this).attr("hideType","hide");
                    toggleTrNum++;
                    yjzCLabelNum++;
                }

                // 五大联赛对阵数
                if ($(this).attr("leagueId") < 6) {
                    if ($(this).attr("hideType") == 'show') {
                        leagueIdNum++;
                    }
                }
                
                // 解除引用便于js垃圾回收
                gameType = null;
        	}else{
        		$(this).hide();
        	}
        }
    });
    
    $("#ls_slave").append(lsList);
//    $("#ls_slave").append("<li class=\"li\"><a id=\"selAll\">全选</a><a id=\"unSelAll\">反选</a></li>");

    // 解除引用便于js垃圾回收
    danMaList = null;

    // n场比赛已截止
    if (toggleTrNum > 0) {
        $("#toggleTr22").html("1场比赛已截止");
        $("#hidTr22").show();
    } else {
        $("#toggleTr22").html("1场比赛可投注");
        $("#hidTr22").hide();
        $("#showTr22").show();
    }

    $("#liansaiCLabel").html("仅五大联赛(" + leagueIdNum + ")");
    $("#yjzCLabel").html("已截止(" + yjzCLabelNum + ")");

    // 解除引用便于js垃圾回收
    leagueIdNum = null;
    yjzCLabelNum = null;
}

/**
 * <p>Desc:生成半全场投注信息
 *         计算五大联赛数量
 *         计算以截止比赛数量
 * </p>
 * <p>return:无返回值</p>
 */
function generateJczqBqc(){

    var yjzCLabelNum = 0;
    var leagueIdNum = 0;
    var toggleTrNum = 0;
    var toggleTrNum = 0;
    var showTrNum = 0;
    var danMaList = '';
    var lsList = "";
    var tagType = $("#tagType").val();
    var closeTime = $("#closeTime").val();
    var toggleTr = 0;
    
    $("#jczqTable").find("tr").each(function(i) {
        var trId = $(this).attr("id");
        if (trId != undefined) {
        	var gameType = $(this).attr("gameType");
        	if(tagType==gameType||"dg"==gameType){
                var trSaleCloseTime = $(this).attr("saleCloseTime");
                var name = $(this).attr("name");
                if (closeTime < trSaleCloseTime) {
                	toggleTr = $("#toggleTr"+name).html();
                	toggleTr++;
                	$("#toggleTr"+name).html(toggleTr);
                	var odds = $('#' + trId + "_0").attr(tagType + "odds");
                    $('#' + trId + "_0").html(odds);
                    var oddp = $('#' + trId + "_1").attr(tagType + "odds");
                    $('#' + trId + "_1").html(oddp);
                    var oddf = $('#' + trId + "_2").attr(tagType + "odds");
                    $('#' + trId + "_2").html(oddf);
                    oddf = $('#' + trId + "_3").attr(tagType + "odds");
                    $('#' + trId + "_3").html(oddf);
                    oddf = $('#' + trId + "_4").attr(tagType + "odds");
                    $('#' + trId + "_4").html(oddf);
                    oddf = $('#' + trId + "_5").attr(tagType + "odds");
                    $('#' + trId + "_5").html(oddf);
                    oddf = $('#' + trId + "_6").attr(tagType + "odds");
                    $('#' + trId + "_6").html(oddf);
                    oddf = $('#' + trId + "_7").attr(tagType + "odds");
                    $('#' + trId + "_7").html(oddf);
                    oddf = $('#' + trId + "_8").attr(tagType + "odds");
                    $('#' + trId + "_8").html(oddf);
                   
                    danMaList = '';
                    danMaList += "<dd id='" + trId;
                    danMaList += "_dd'";
                    danMaList += " issueWeek='" + $('#' + trId).attr("id");
                    danMaList += "' saleCloseTime='" + trSaleCloseTime;
                    danMaList += "' rq='0' style='display:none'><p>";
                    $("#" + trId).find("td").each(function(i) {
                        var tdId = $(this).attr("id");
                        if (tdId != undefined) {
                            if (tdId == trId + '_cc') {
                                danMaList += "<span class='w-70'><input id='";
                                danMaList += tdId + "_t";
                                danMaList += "' type='checkbox' checked='checked'/>";
                                danMaList += $(this).text();
                                danMaList += "</span>";
                            }
                            
                            if (tdId == trId + '_cf') {
                            	var includeStr = "<li id=\""+$("#"+trId).attr("leagueId")+"\"";
                                if(lsList.indexOf(includeStr) < 0){
                                    lsList += "<li id=\""+$("#"+trId).attr("leagueId")+"\"><input type=\"checkbox\" checked=\"checked\" />"+$(this).text()+"</li>";
                                }
                            }

                            if (tdId == trId + '_srd') {
                            	var minute = $("#minute").val();
                            	var time = getDiffMinute(trSaleCloseTime,minute);
                            	$(this).html(time);
                            	$(this).attr("saleCloseTime",time);
                            }

                            if (tdId == trId + '_zd') {
                                danMaList += "<span class='a-c'>";
                                danMaList += $(this).children("em").text();
                                danMaList += "vs";
                            }
                            
                            if (tdId == trId + '_kd') {
                                danMaList += $(this).children("em").text();
                                danMaList += "</span>";
                            }
                        }
                    });

                    danMaList += "</p>";
                    danMaList += "<p>";
					
					if(tagType=="d"){
                        danMaList += "<span class='dan w-40'><input id='" + trId + "_cc_d'" + " type='checkbox' disabled='disabled'/></span>";
					}else{
                        danMaList += "<span class='dan w-40'><input id='" + trId + "_cc_d'" + " type='checkbox' onclick='danSetFun(this);'/></span>";
					}
                    danMaList += "<em type='0' id='" + trId + "_0_dd' odd='" + $('#' + trId + "_0").attr(tagType + "odds") + "' style='display:none'>胜胜</em>";
                    danMaList += "<em type='1' id='" + trId + "_1_dd' odd='" + $('#' + trId + "_1").attr(tagType + "odds") + "' style='display:none'>胜平</em>";
                    danMaList += "<em type='2' id='" + trId + "_2_dd' odd='" + $('#' + trId + "_2").attr(tagType + "odds") + "' style='display:none'>胜负</em>";
                    danMaList += "<em type='3' id='" + trId + "_3_dd' odd='" + $('#' + trId + "_3").attr(tagType + "odds") + "' style='display:none'>平胜</em>";
                    danMaList += "<em type='4' id='" + trId + "_4_dd' odd='" + $('#' + trId + "_4").attr(tagType + "odds") + "' style='display:none'>平平</em>";
                    danMaList += "<em type='5' id='" + trId + "_5_dd' odd='" + $('#' + trId + "_5").attr(tagType + "odds") + "' style='display:none'>平负</em>";
                    danMaList += "<em type='6' id='" + trId + "_6_dd' odd='" + $('#' + trId + "_6").attr(tagType + "odds") + "' style='display:none'>负胜</em>";
                    danMaList += "<em type='7' id='" + trId + "_7_dd' odd='" + $('#' + trId + "_7").attr(tagType + "odds") + "' style='display:none'>负平</em>";
                    danMaList += "<em type='8' id='" + trId + "_8_dd' odd='" + $('#' + trId + "_8").attr(tagType + "odds") + "' style='display:none'>负负</em>";
                    danMaList += "</span>";
                    danMaList += "</p>";
                    danMaList += "</dd>";
                    $("#danMaList").append(danMaList);
                    // 解除引用便于js垃圾回收
                    danMaList = null;
                } else {
                	$(this).hide();
                	$(this).attr("hideType","hide");
                    toggleTrNum++;
                    yjzCLabelNum++;
                }

                // 五大联赛对阵数
                if ($(this).attr("leagueId") < 6) {
                    if ($(this).attr("hideType") == 'show') {
                        leagueIdNum++;
                    }
                }
                
                // 解除引用便于js垃圾回收
                gameType = null;
        	}else{
        		$(this).hide();
        	}
        }
    });
    
    $("#ls_slave").append(lsList);
//    $("#ls_slave").append("<li class=\"li\"><a id=\"selAll\">全选</a><a id=\"unSelAll\">反选</a></li>");

    // 解除引用便于js垃圾回收
    danMaList = null;

    // n场比赛已截止
    if (toggleTrNum > 0) {
        $("#toggleTr22").html("1场比赛已截止");
        $("#hidTr22").show();
    } else {
        $("#toggleTr22").html("1场比赛可投注");
        $("#hidTr22").hide();
        $("#showTr22").show();
    }

    $("#liansaiCLabel").html("仅五大联赛(" + leagueIdNum + ")");
    $("#yjzCLabel").html("已截止(" + yjzCLabelNum + ")");

    // 解除引用便于js垃圾回收
    leagueIdNum = null;
    yjzCLabelNum = null;
}

/**
 * <p>Desc:竞彩足球点中赔率区域事件</p>
 * <p>return:无返回值</p>
 */
function selPeilv(obj) {

    // 当天数据才可以有包事件
    var isHistory = $("#isHistory").val();
	if(isHistory=="0"){
		
	    var className = $("#"+obj).attr("class");
	    // 选中效果
	    if(className=="b-ddd c-3 tdBg"||className=="b-ddd c-3 tdBg tdBgHover"){
		    $("#"+obj).attr("class", "b-ddd c-3 tdBg tdBgOn").fadeTo(187, 1.0);
		    
		    /** Modified by Luochang for 选中有问题 at 2013/04/28 begin */
		    var parent = $("#"+obj+"_dd").parent().parent();
		    if ( $("#"+obj+"_z").length > 0 ) {
		    	parent = $("#"+obj+"_z").parent().parent().parent();
		    }
		    
		    $(parent).show();
		    $("#"+obj+"_dd").show();
		    $("#"+obj+"_z").show();
		    /** Modified by Luochang for 选中有问题 at 2013/04/28 end */
	    }
	    // 去掉选中效果
	    if(className=="b-ddd c-3 tdBg tdBgOn"){
		    $("#"+obj).attr("class", "b-ddd c-3 tdBg").fadeTo(187, 1.0);
		    
		    /** Modified by Luochang for 选中有问题 at 2013/04/28 begin */
		    $("#"+obj+"_dd").hide();
		    $("#"+obj+"_z").hide();
		   
		    var parent = $("#"+obj+"_dd").parent().parent();
		    if ( $("#"+obj+"_z").length > 0 ) {
		    	parent = $("#"+obj+"_z").parent().parent().parent();
		    }
		    
		    if ( $(parent).find("em:visible").length == 0 ) {
		    	$(parent).hide();
		    }
		    /** Modified by Luochang for 选中有问题 at 2013/04/28 end */
	    }
	    
        // 隐藏或显示投注信息:比分业务和其它子玩法业务分开处理
	    /** Modified by Luochang for 选中有问题 at 2013/04/28 end */
		/*if($("#subPlayId").val()=="3"){
		    bfToggleTouzhuMessage(obj);
		}else{
	        toggleTouzhuMessage(obj);
		}*/
	    /** Modified by Luochang for 选中有问题 at 2013/04/28 end */
        // 重新计算场次数
        reCalcChangCiNum();
        
	    //  取得投注方式 d:单关投注;g:过关投注;ds:单式上传投注
	    var tagType = $("#tagType").val();
	    if(tagType=="g"){
            // 重新生成过关
            reGenerateGuoGuan();
		    showGgArea();
		    calcBetInfo();
		}
	
        // 单关投注重新计算注数、总金额
	    if(tagType=="d"){
	    	var betSum = $("td[class='b-ddd c-3 tdBg tdBgOn']").length;
	    	var beiTou = $("#beiTou").val();
	    	$("#betSum").html(betSum);
	    	$("#jinE").html(betSum*2*Number(beiTou));
	    	$("#lilun").show();
	    	var highest = new Map();
	    	$("td[class='b-ddd c-3 tdBg tdBgOn']").each(function(){
	    		var id = $(this).attr("id").split("_")[0];
	    		var odds = $(this).html();
	    		if(odds.indexOf("<b") > -1){
	    			odds = $(this).find("b").text();
	    		}
	    		odds = Number(odds);
	    		var value = highest.get(id);
	    		if(value == null || Number(value) < odds){
	    			 highest.put(id,odds);
	    		}
	    	});
	    	var highestValue = 0;
	    	var values = highest.values();
	    	for(var i=0; i<values.length; i++){
	    		highestValue = highestValue + (values[i] * 2);
	    		highestValue = Number(highestValue.toFixed(2));
	    	}
	    	
	    	$("#liLunJinE").html((highestValue*Number(beiTou)).toFixed(2));
		}
	}
}

/** 
 * You can use this map like this:
 * var myMap = new Map();
 * myMap.put("key","value");
 * var key = myMap.get("key");
 * myMap.remove("key");
 */
function Map(){

	this.elements = new Array();
	
	this.size = function(){
		return this.elements.length;
	}
	
	this.isEmpty = function(){
		return (this.elements.length < 1);
	}
	
	this.clear = function(){
		this.elements = new Array();
	}
	
	this.put = function(_key, _value){
		this.remove(_key);
		this.elements.push({key: _key, value: _value});
	}
	
	this.remove = function(_key){
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					this.elements.splice(i, 1);
					return true;
				}
			}
		} catch (e) {
			return false;
		}
		return false;
	}
	
	this.get = function(_key){
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) { return this.elements[i].value; }
			}
		} catch (e) {
			return null;
		}
	}
	
	this.element = function(_index){
		if (_index < 0 || _index >= this.elements.length) { return null; }
		return this.elements[_index];
	}
	
	this.containsKey = function(_key){
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					return true;
				}
			}
		} catch (e) {
			return false;
		}
		return false;
	}
	
	this.values = function(){
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].value);
		}
		return arr;
	}
	
	this.keys = function(){
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].key);
		}
		return arr;
	}
}

/**
 * <p>Desc:竞彩足球鼠标放到赔率区域事件</p>
 * <p>return:无返回值</p>
 */
function overPeilv(obj) {
	if($("#"+obj).attr("class")=="b-ddd c-3 tdBg"){
		$("#"+obj).attr("class", "b-ddd c-3 tdBg tdBgHover").fadeTo(187, 1.0);
	}
}

/**
 * <p>Desc:竞彩足球鼠标离开赔率区域事件</p>
 * <p>return:无返回值</p>
 */
function outPeilv(obj) {
	if($("#"+obj).attr("class")=="b-ddd c-3 tdBg tdBgHover"){
		$("#"+obj).attr("class", "b-ddd c-3 tdBg").fadeTo(187, 1.0);
	}
}


/**
 * <p>Desc:竞彩足球全包和取消全包事件</p>
 * <p>return:无返回值</p>
 */
function baoPeilv(obj){

    // 当天数据才可以有包事件
    var isHistory = $("#isHistory").val();
	if(isHistory=="0"){
		
	    var baovalue = $("#"+obj).attr("baovalue");
	    // 全包
	    if(baovalue=="0"){
		    $("#"+obj).parent().children("td[class='b-ddd c-3 tdBg']").attr("class","b-ddd c-3 tdBg tdBgOn");
		    $("#"+obj).attr("baovalue","1");
	    }
	    // 取消全包
	    if(baovalue=="1"){
		    $("#"+obj).parent().children("td[class='b-ddd c-3 tdBg tdBgOn']").attr("class","b-ddd c-3 tdBg");
		    $("#"+obj).attr("baovalue","0");		
	    }
	
        // 隐藏或显示投注信息:比分业务和其它子玩法业务分开处理 TODO 暂时不起作用
		if($("#subPlayId").val()=="3"){
		    bfBaoToggleTouzhuMessage(obj);
		}else{
			baoToggleTouzhuMessage(obj);
		}
	
        // 重新计算场次数
        reCalcChangCiNum();
		
	    //  取得投注方式 d:单关投注;g:过关投注;ds:单式上传投注
	    var tagType = $("#tagType").val();
	
	    if(tagType=="g"){
            // 重新生成过关 TODO 需要调试
            reGenerateGuoGuan();
		    showGgArea();			
	        // 重新计算注数、总金额以及理论最高奖金（包含定胆和不定胆的情况） TODO 需要调试
	        reCalcBetSum();
		    calcBetInfo();
		}
	
        // 单关投注重新计算注数、总金额
	    if(tagType=="d"){
	    	var betSum = $("td[class='b-ddd c-3 tdBg tdBgOn']").length;
	    	var beiTou = $("#beiTou").val();
	    	$("#betSum").html(betSum);
	    	$("#jinE").html(betSum*2*Number(beiTou));
	    	
	    	$("#lilun").show();
	    	var highest = new Map();
	    	$("td[class='b-ddd c-3 tdBg tdBgOn']").each(function(){
	    		var id = $(this).attr("id").split("_")[0];
	    		var odds = $(this).html();
	    		if(odds.indexOf("<b") > -1){
	    			odds = $(this).find("b").text();
	    		}
	    		odds = Number(odds);
	    		var value = highest.get(id);
	    		if(value == null || Number(value) < odds){
	    			 highest.put(id,odds);
	    		}
	    	});
	    	var highestValue = 0;
	    	var values = highest.values();
	    	for(var i=0; i<values.length; i++){
	    		highestValue = highestValue + (values[i] * 2);
	    		highestValue = Number(highestValue.toFixed(2));
	    	}
	    	
	    	$("#liLunJinE").html((highestValue*Number(beiTou)).toFixed(2));
		}
	}
}

/**
 * <p>Desc:隐藏或显示投注信息</p>
 * <p>return:无返回值</p>
 */
function toggleTouzhuMessage(obj) {
     var trId = $("#"+obj).parent().attr("id");
	 var tdBgOnNum = $("#"+trId).children("td[class='b-ddd c-3 tdBg tdBgOn']").length;
	 if(tdBgOnNum>0) {
	     $("#"+trId+"_dd").show();
	     if($("#"+obj+"_z").is(":hidden")){
	         $("#"+obj+"_z").show();
		 }else{
	         $("#"+obj+"_z").hide();
		 }
	 }else{
	     $("#"+trId+"_dd").hide();
	     $("#"+obj+"_z").hide();
         $("#"+trId+"_cc_d").attr("checked",false);
	 }
	 
	 if($("#"+obj+"_dd").is(":hidden")){
	     $("#"+obj+"_dd").show();
	 }else{
	     $("#"+obj+"_dd").hide();
     }
}

/**
 * <p>Desc:比分隐藏或显示投注信息</p>
 * <p>return:无返回值</p>
 */
function bfToggleTouzhuMessage(obj) {
     var len = obj.length;
     var trId = obj.substring(0,obj.lastIndexOf('_s'));
	 var tdBgOnNum = $("#"+trId+"_slave").find("td[class='b-ddd c-3 tdBg tdBgOn']").length;
	 if(tdBgOnNum>0) {
	     $("#"+trId+"_dd").show();
	     if($("#"+obj+"_z").is(":hidden")){
	         $("#"+obj+"_z").show();
		 }else{
	         $("#"+obj+"_z").hide();
		 }
	 }else{
	     $("#"+trId+"_dd").hide();
	     $("#"+obj+"_z").hide();
         $("#"+obj+"_cc_d").attr("checked",false);
	 }
	 
	 if($("#"+obj+"_dd").is(":hidden")){
	     $("#"+obj+"_dd").show();
	 }else{
	     $("#"+obj+"_dd").hide();
     }
}

/**
 * <p>Desc:包隐藏或显示投注信息</p>
 * <p>return:无返回值</p>
 */
function baoToggleTouzhuMessage(obj) {
     var trId = $("#"+obj).parent().attr("id");
     var baovalue = $("#"+obj).attr("baovalue");
     // 全包
	 if(baovalue=="1") {
	     $("#"+trId+"_dd").show();
	     $("#"+trId+"_dd").find("em").show();
	 }
	 // 取消全包
	 if(baovalue=="0"){
	     $("#"+trId+"_dd").hide();
	     $("#"+trId+"_dd").find("em").hide();
         $("#"+trId+"_cc_d").attr("checked",false);
	 }
}

/**
 * <p>Desc:比分包隐藏或显示投注信息</p>
 * <p>return:无返回值</p>
 */
function bfBaoToggleTouzhuMessage(obj) {
     var trId = $("#"+obj).parent().attr("id");
	 var flag = trId.substring(trId.length-1,trId.length);
	 var ddId = trId.substring(0,trId.length-8);
     var isBao = $("#"+obj).attr("baovalue");
	 if(isBao>0) {
	     $("#"+ddId+"_dd").show();
	     for (var i=0;i<32;i++){
	    	 if($("#"+ddId+"_slave_"+i).attr("class")=="b-ddd c-3 tdBg tdBgOn"){
	    	     $("#"+ddId+"_slave_"+i+"_dd").show();
	    	 }
	     }
	 }else{
		 var m = 0;
	     for (var i=0;i<32;i++){
	    	 if($("#"+ddId+"_slave_"+i).attr("class")=="b-ddd c-3 tdBg"){
	    	     $("#"+ddId+"_slave_"+i+"_dd").hide();
	    	 }else{
		    	 m++;	    		 
	    	 }
	     }
	     if(m==1){
		     $("#"+ddId+"_dd").hide();	    	 
	     }
         $("#"+ddId+"_cc_d").attr("checked",false);
	 }
}

/**
 * <p>Desc:赛事回查 根据html刷新对阵区域内容</p>
 * @param htmlContent 静态页面内容
 */
 function refreshLM(htmlContent){
 	$("#lotteryMainLM").html(htmlContent);
 }
 
 /**
  * <p>Desc:赛事回查 根据url加载对阵区域内容</p>
  * @param url 访问静态页面网址
  */
 function loadLM(url){
 	var options = {
 		success:function(result){
 			refreshLM(result);
 		}
 	};
 	$("#loadLMForm").remove();
 	$("<form id='loadLMForm' action='" +url+ "'></form>").appendTo("body");
 	$("#loadLMForm").ajaxSubmit(options);
 }