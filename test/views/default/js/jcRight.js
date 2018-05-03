﻿/**
 * <p>Desc:竞彩右边投注公用js</p>
 * <p>Author: luochang</p>
 * <p>Copyright: Copyright (c) 2013</p> 
 * <p>Company: 北京九彩科技有限公司</p>
 * Added by Luochang at 2013/03/05 Version 1.0
 */

$(document).ready(function () {
	
	ggWinedEvent();		//	注数计算事件
	lookBonusEvent();	//	查看奖金明细事件
	// showGgArea();	//	过关方式展示，单击彩果的时候调用
	formSubmitEvent();	//	表单提交事件
	gotoFilterEvent();	//	在线过滤触发事件
	showOrHideCombPassEvent();
	deleteAllMessage(); // 投注信息全删
	deleteMessage(); // 投注信息删除
	
	init();	// 页面初始化
	
	bottomBetMultEvent();

});

//倍数控制
function bottomBetMultEvent() {
	$("#beiTouId").keyup(function() {
		var beiTou = $(this).val();
	    if (isNaN(beiTou)) {
	    	$(this).val("1");
	    }
		calcBetInfo2();
    });
	
	$("#betMultSubId").click(function(){
		var beiTou = $("#beiTouId").val();
	    if (isNaN(beiTou)) {
	    	$("#beiTouId").val("1");
	    } else if (parseInt(beiTou)>1) {
	    	$("#beiTouId").val(parseInt(beiTou)-1);
	    }  
	    calcBetInfo2();
	});
	
	$("#betMultAddId").click(function(){
		var beiTou = $("#beiTouId").val();
	    if (isNaN(beiTou)) {
	    	$("#beiTouId").val("1");
	    } else {
	    	$("#beiTouId").val(parseInt(beiTou)+1);
	    }  
	    calcBetInfo2();
	});
}

/**
 * 初始化操作
 * @return
 */
function init() {
	
	// 单关隐藏“ 请至少选择2场比赛进行投注”提示 Added at 2013/10/23
	if ( $("#tagType").val() == "d" ) {
		$("#yjzCLabel").next().hide();
	}
	
	// 联赛选择
	$("#ls").click(function() {
		if ( $("#ls_slave").css("display") == "none" ) {
			$("#ls_slave").show();
			$("#ls").css({"background-position":"0 -23px"});
		} else {
			$("#ls_slave").hide();
			$("#ls").css({"background-position":"0 0"});
		}
		
	});
	
	/**
     * <p>Desc:倍投值改变后处理流程</p>
     */
    $("#beiTou").keyup(function() {
    	var re = /^[1-9]+[0-9]*]*$/; 
    	  
        var beiTou = $("#beiTou").val();
        if (isNaN(beiTou)) {
        	$("#beiTou").val("1");
        } else if (parseInt(beiTou)<1) {
        	$("#beiTou").val("1");
        } else if (!re.test(beiTou) && beiTou.replaceAll("\\s+","") != ""){
        	$("#beiTou").val(parseInt(beiTou));
        }
        calcBetInfo();
    });
	
	
	$("#delAll").click(function(){
		$("#jczqTable").find(".tdBgOn").removeClass("tdBgOn");
		$("#danMaList").find("dd").attr("style", "display:none");
		$("#danMaList").find("em").attr("style", "display:none");
		$("#zyChuanBox").find("span").attr("style", "display:none");
		$("#zhChuanBox").find("span").attr("style", "display:none");
		calcBetInfo();
	});
	
	// 删除一行
	var ddCs = $("#danMaList").find("dd");
	for ( var i = 0; i < ddCs.length; i++ ) {
		$(ddCs[i]).find("input[type=checkbox]").eq(0).click(function() {
			if ( !$(this).attr("checked")) {
				$(this).parent().parent().parent().hide();
				$(this).parent().parent().parent().find("em").attr("style", "display:none");
				if ( $("#subPlayId").val() == "3" ) {
					$("#"+$(this).parent().parent().parent().attr("issueweek")).next().find(".tdBgOn").removeClass("tdBgOn");
				} else {
					$("#"+$(this).parent().parent().parent().attr("issueweek")).find(".tdBgOn").removeClass("tdBgOn");
				}
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
			    	
			    	if($("#licenseId").val() == "227"){
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
		});
	}
    
	// 竞彩足球胜平负先展示过滤功能
	if ( $("#subPlayId").val() == "1" || $("#subPlayId").val() == "2" 
		|| $("#subPlayId").val() == "4" || $("#subPlayId").val() == "6" 
			|| ($("#subPlayId").val() == "5"&&$("#licenseId").val() == "227") ) {
		$("#filterBtnId").show();
	}
	
	if ( ($("#subPlayId").val() == "1" && $("#licenseId").val() == "227") 
			|| ($("#subPlayId").val() == "6" && $("#licenseId").val() == "227") 
			|| ($("#subPlayId").val() == "5"  ) 
			|| ($("#subPlayId").val() == "2" && $("#licenseId").val() == "228") 
			|| ($("#subPlayId").val() == "1" && $("#licenseId").val() == "228") ) {
		$("#bonusSuperbId").show();
		$("#newImgViewId").show();
	}
	// 单关不显示在线过滤和奖金优化(竞彩篮球单关奖金优化隐藏)
	if ( $("#tagType").val() == "d" ) {
		$("#filterBtnId").hide();
		$("#bonusSuperbId").hide();
	}
	
	if ( $("#tagType").val() == "d" && $("#licenseId").val() == "227") {
		$("#bonusSuperbId").show();
	}
	
	/* Modified by Luochang for 混串奖金预测明细暂时不做展示，后续需要改动 at 2013/07/02  */
	if ( $("#subPlayId").val() == "5" ) {
		$("#lookBonusInfoId").hide();
		$("#lookBonusInfoId").next().hide();
	}
	
	// 奖金优化
	$("#bonusSuperbId").click(function() {
		/* 让球不投注 */
		/*if( $("#subPlayId").val() == "1"  ) {
			if ( $("#brqFlagId").length > 0 ) {
				
			} else {
				alert("让球暂停投注！");
				return false;
			}
		}*/
		
		if ( $("#zhChuanBox").find("input[type=checkbox]:checked").length > 0 ) {
			alert("奖金优化不支持组合过关！");
			return false;
		}
		
		/*var freeBox = $("#zyChuanBox input[type=checkbox]:checked:visible");
		if ( freeBox.length == 0 ) {
			alert("请选择过关方式！");
			return false;
		} */
		
		var url = "/lottery/jczq/superp.jhtml";
		var playType = "";
		if ( $("#tagType").val() == "d" && $("#licenseId").val() == "227") {
			playType = "1c1";
			if($("#subPlayId").val() == "1"){//让球
				url = "/lottery/jczq/superp_rqspfdg.jhtml";
			}else if($("#subPlayId").val() == "6"){//不让球
				url = "/lottery/jczq/superp_spfdg.jhtml";
			}else if($("#subPlayId").val() == "3"){//比分
				url = "/lottery/jczq/superp_bfdg.jhtml";
			}else if($("#subPlayId").val() == "4"){//半全场
				url = "/lottery/jczq/superp_bqcdg.jhtml";
			}else if($("#subPlayId").val() == "2"){//总进球
				url = "/lottery/jczq/superp_zjqdg.jhtml";
			}
		} else {
			var freeBox = $("#zyChuanBox input[type=checkbox]:checked:visible");
			if ( freeBox.length == 0 ) {
				alert("请选择过关方式！");
				return false;
			} 
			
			for ( var i = 0; i < freeBox.length; i++ ) {
				playType += $(freeBox[i]).val() + ",";
			}
			playType = playType.substring(0, playType.length - 1);
		}
		
		var schInfo = $("#danMaList dd:visible");
		
		var schDesc = "[";
		for ( var i = 0; i < schInfo.length; i++ ) {
			var sch = $(schInfo[i]).children().eq(0).children().eq(0).html();
			
			schDesc += "{sname:'"+sch.substring(sch.indexOf('>')+1)+"',";
			schDesc += "holn:'"+ $(schInfo[i]).children().eq(0).children().eq(1).html()+"',";
			var opt = $(schInfo[i]).find("em");
			//var _sType = $(schInfo[i]).find("em:visible").eq(0).attr("play");
			var pSchInfo = "";
			if ( $("#subPlayId").val() == "5"  ) {
				for ( var j = 0; j < opt.length; j++ ) {
					//if ( $(opt[j]).attr("play") == _sType ) {
						pSchInfo += $(opt[j]).attr("odd") + "-";
					//}
				} 
				
			}	else {
				for ( var j = 0; j < opt.length; j++ ) {
					pSchInfo += $(opt[j]).attr("odd") + "-";
				} 
			}
			schDesc += "odds:'"+pSchInfo.substring(0,pSchInfo.length-1)+"',";
			opt = $(schInfo[i]).find("em:visible");
			pSchInfo = "";
			
			var isSingleDesc = $(opt[0]).attr("play");
			for ( var j = 0; j < opt.length; j++ ) {
				if ( $("#subPlayId").val() != "5" ) {
					pSchInfo += $(opt[j]).attr("type") + "-";
				} else {
					pSchInfo += $(opt[j]).attr("play") + "-" + $(opt[j]).attr("type") + ",";
				}
				/*if ( $("#subPlayId").val() == "5" ) {
					if ( isSingleDesc != $(opt[j]).attr("play") ) {
						alert("奖金优化暂不支持复合投注！");
						return false;
					}
				}*/
			} 
			schDesc += "opt:'"+pSchInfo.substring(0,pSchInfo.length-1)+"',";
			/*if ( $("#subPlayId").val() == "5" ) {
				if ( $(opt[0]).attr("play") == 6 ) {
					schDesc += "schid:'"+$(schInfo[i]).attr("issueweek")+"',rq:'0'},";
				} else {
					schDesc += "schid:'"+$(schInfo[i]).attr("issueweek")+"',rq:'"+$(schInfo[i]).attr("rq")+"'},";	
				}
			} else {*/
				schDesc += "schid:'"+$(schInfo[i]).attr("issueweek")+"',rq:'"+$(schInfo[i]).attr("rq")+"'},";
			//}
		}	
		
		schDesc = schDesc.substring(0, schDesc.length-1);
		schDesc += "]";

		var subType = $("#subPlayId").val();
		var licenseId = $("#licenseId").val();
		
		//var url = "/lottery/jczq/superp.jhtml";
	
		$("#bonusFormId").remove();
		$("<form id='bonusFormId' action='"+url+"' method='post' target='_blank'>" +
				"<input type='hidden' name='subType' value='"+subType+"'>" +
				"<input type='hidden' name='schDesc' value=\""+schDesc+"\">" +
				"<input type='hidden' name='licenseId' value=\""+licenseId+"\">" +
				"<input type='hidden' name='playType' value=\""+playType+"\">" +
				"</form>").appendTo($("body"));
		
		//alert($("#filterFormId").html());
		$("#bonusFormId").submit();
	});
	
	/* Added for 亚欧析事件 */
	$("a[class=c-0f3f94]").click(function() {
		var url = "http://odds.87.cn:8084";
		
		if( "情" == $(this).text() ){
			var id = $(this).parent().parent().attr("id");
			url = "http://87cn.fox008.com/analysis/detail/" + id + ".html";
			window.open(url , "_target");
			return;
		}
		
		if("欧" == $(this).text()){
			url += "/collect/ou.lhtml";
		}else if("亚" == $(this).text()){
			url += "/collect/handicap.lhtml";
		}else if("析" == $(this).text()){
			url += "/collect/analysis.lhtml";
		}
		var gameType = $("#licenseId").val() == 227 ? "jczq" : "jclq";
		var td = $(this).parent().parent();
		var guestName = "";
		var hostName = td.children().eq(4).html();
		if ( $("#licenseId").val() == 227 ) {
			var _type = $("#subPlayId").val();
			switch ( _type ) {
			case "1":
				guestName = td.children().eq(6).html();
				break;
			case "6":
				guestName = td.children().eq(5).html();
				break;
			case "2":
				guestName = td.children().eq(5).html();
				break;
			case "3":
				guestName = td.children().eq(5).html();
				break;
			case "4":
				guestName = td.children().eq(5).html();
				break;
			case "5":
				guestName = td.children().eq(6).html();
				if ( $("#ht2x1Id").length > 0 ) {
					hostName = td.children().eq(4).children().eq(0).html();
					guestName = td.children().eq(4).children().eq(1).html();
				} else {
					guestName = td.children().eq(6).html();
				}
				break;
			}
		} else if ( $("#licenseId").val() == 228 ) {
			var _type = $("#subPlayId").val();
			switch ( _type ) {
			case "1":
				guestName = hostName;
				hostName = td.children().eq(5).html();
				break;
			case "2":
				guestName = hostName;
				hostName = td.children().eq(6).html();
				break;
			case "3":
				guestName = hostName;
				hostName = td.children().eq(5).html();
				break;
			case "4":
				guestName = hostName;
				hostName = td.children().eq(5).html();
				break;
			case "5":
				guestName = hostName;
				hostName = td.children().eq(6).html();
				break;
			}
		}
		
		var form = "<form id='ouyaxiForm' action='" +url+ "' method='post' target='_blank'>";
			form += "<input type='hidden' value='" +td.attr("issue")+getToDay(td.attr("id").substring(0,8))+td.attr("id").substring(8)+ "' name='gsId' />";
			form += "<input type='hidden' value='" +hostName+ "' name='gsHostName' />";
			form += "<input type='hidden' value='" +gameType+ "' name='gsGameType' />";
			form += "<input type='hidden' value='" +guestName+ "' name='gsGuestName' />";
			form += "<input type='hidden' value='" +td.attr("saleclosetime")+ "' name='gsGameTime' />";
			form += "<input type='hidden' value='" +td.children().eq(1).html()+ "' name='gsLeagueName' />";
			form += "</form>";
		$(form).appendTo("body");
		$("#ouyaxiForm").submit();
		$("#ouyaxiForm").remove();

	});
}

function getToDay(dateStr) {
	dateStr = dateStr.substring(0,4)+"-"+dateStr.substring(4,6)+"-"+dateStr.substring(6);
    var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
    var result = myDate.getDay() == 0 ? 7 : myDate.getDay();
    return result; 
}


/**
 * 投注信息栏目全删
 * @return
 */
function deleteAllMessage() {
	$("#delAll").click(function() {
		$("#danMaList a").each(function() {
			var ddId = $(this).attr("id").replace("cc_t","dd");
	        if (!$("#" + ddId).is(":hidden")) {
				$("#"+ddId).hide();
				$("#"+ddId.replace("dd","s")).attr("class", "b-ddd c-3 tdBg").fadeTo(187, 1.0);
				$("#"+ddId.replace("dd","p")).attr("class", "b-ddd c-3 tdBg").fadeTo(187, 1.0);
				$("#"+ddId.replace("dd","f")).attr("class", "b-ddd c-3 tdBg").fadeTo(187, 1.0);
	        }
		});
	});
}

/**
 * 投注信息栏目删除
 * @return
 */
function deleteMessage() {
	$("#danMaList a").click(function() {
		var ddId = $(this).attr("id").replace("cc_t","dd");
		$("#"+ddId).hide();
		$("#"+ddId.replace("dd","s")).attr("class", "b-ddd c-3 tdBg").fadeTo(187, 1.0);
		$("#"+ddId.replace("dd","p")).attr("class", "b-ddd c-3 tdBg").fadeTo(187, 1.0);
		$("#"+ddId.replace("dd","f")).attr("class", "b-ddd c-3 tdBg").fadeTo(187, 1.0);
	});
}

/**
 * 显示/隐藏组合过关
 * @return
 */
function showOrHideCombPassEvent() {
	$("#hideCombBtnId").click(function() {
		$("#zhChuanBox input[type=checkbox]").removeAttr("checked");
		$("#showCombBtnId").show();
		$(this).hide();
		$("#zhChuanBox").hide();
		
		calcBetInfo();
	});
	$("#showCombBtnId").click(function() {
		$("#zhChuanBox input[type=checkbox]").removeAttr("checked");
		$("#zhChuanBox").show();
		$("#hideCombBtnId").show();
		$(this).hide();
		
		calcBetInfo();
	});
}

/**
 *	奖金明细事件
 */
function lookBonusEvent() {
	$("#lookBonusInfoId").click(function() {
		if ( $("#betSum").html() == "0" ) {
			alert("没有可查看的奖金明细，请先选择过关方式！");
			return false;
		}
		var betMap = getBetInfo();
		
		var _n_arr = betMap.get("nAr");
		var _n_arr_dan = betMap.get("nArDa");
		var _c_arr = betMap.get("cAr");
		
		var _n_bonus_arr = betMap.get("nArBo");
		var _n_bonus_arr_dan = betMap.get("nArBoDa");				
		
		var multiple = $("#beiTou").val();
		if ( isNaN(multiple) ) {
			$("#beiTou").val("1");
			multiple = 1;
		}
		
		$("#bonusMultipleId").html(multiple);
		
		$("#bonusAmtId").html($("#jinE").html());
		
		var passInfo = "";
		for ( var i = 0; i < _c_arr.length; i++ ) {
			passInfo += _c_arr[i].replace("c", "串") + ",";
		}
		passInfo = passInfo.substring(0, passInfo.length - 1);
		$("#bonusPassId").html(passInfo);
	
		var schInfo = $("#danMaList dd:visible");
		$("#bonusSchNumId").html(schInfo.length);
		
		var bonusHtml = "";
		for ( var i = 0; i < schInfo.length; i++ ) {
			var schNo = $(schInfo[i]).find(".w-70").eq(0).html();
			bonusHtml += "<tr><td>" + schNo.substring(schNo.indexOf(">") + 1)+"</td>";	// 赛事编号
			bonusHtml += "<td>" + $(schInfo[i]).find("p").eq(0).find("span").eq(1).html() + "</td>";	// 对阵
			/* 彩果 */
			bonusHtml += "<td>"
			var opt = $(schInfo[i]).find("em:visible");	
			var oddArray = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				bonusHtml += "<font><b>" + $(opt[j]).html() + "</b>(" + $(opt[j]).attr("odd") + ")</font>";
				oddArray.push($(opt[j]).attr("odd"));
			} 
			bonusHtml += "</td>"
			oddArray.sort(compare);
			bonusHtml += "<td>" + oddArray[0] + "</td>"	// 最大SP
			bonusHtml += "<td>" + oddArray[oddArray.length - 1] + "</td>"	// 最小SP
			
			if ( $(schInfo[i]).find("input[type=checkbox]").eq(1).attr("checked") ) {
				bonusHtml += "<td>是</td>";	// 胆
			} else {
				bonusHtml += "<td>否</td>";	
			}
		}	
		$("#bonusSchId").empty();
		$(bonusHtml).appendTo($("#bonusSchId"));
		
		var freePs = new Array();	// 2串1到8串1
		for ( var i = 0; i < _c_arr.length; i++ ) {
			if ( _c_arr[i].split("c")[1] == "1" ) {
				var nexist = 0;
				for ( var j = 0; j < freePs.length; j++ ) {
					if ( freePs[j] == _c_arr[i] ) {
						nexist = 1;
						break;
					}
				}
				if ( nexist == 0 ) {
					freePs.push(_c_arr[i]);
				}
			} else {
				var cArray = combCrMap.get(_c_arr[i]);
				for ( var k = 0; k < cArray.length; k++ ) {
					var nexist = 0;
					for ( var j = 0; j < freePs.length; j++ ) {
						if ( freePs[j] == cArray[k] ) {
							nexist = 1;
							break;
						}
					}
					if ( nexist == 0 ) {
						freePs.push(cArray[k]);
					}
				}
			}
		}
		$("#bonusSplitId").attr("colspan", freePs.length);
		$("#bonusYueCeId").attr("colspan", 4 + freePs.length);
		
		$("#bonusCsId").empty();
		var psHtml = "";
		freePs.sort();
		for ( var i = 0; i < freePs.length; i++ ) {
			psHtml += "<td class=\"thead\"><strong>" + freePs[i].replace("c", "串") +"</strong></td>";
		}
		psHtml += "<td class=\"thead\"><strong>最小</strong></td><td class=\"thead\"><strong>最大</strong></td>";
		$(psHtml).appendTo($("#bonusCsId"));
		
		var startWinSch = parseInt(freePs[0].split("c")[0]);
		
		var calcHighBonusArray = new Array();	//	用于计算最高奖金
		var calcLowBonusArray = new Array();	//	用于计算最低奖金
		var calcDanHighBonusArray = new Array();//	用于计算最高奖金
		var calcDanLowBonusArray = new Array();	//	用于计算最低奖金
		
		var totalHBonusArray = new Array();	//	用于计算最高奖金
		var totalLBonusArray = new Array();	//	用于计算最低奖金
		
		for ( var i = 0; i < _n_bonus_arr.length; i++ ) {
			_n_bonus_arr[i].sort(compare);
			calcHighBonusArray.push(_n_bonus_arr[i][0]);
			totalHBonusArray.push(_n_bonus_arr[i][0]);
			calcLowBonusArray.push(_n_bonus_arr[i][_n_bonus_arr[i].length-1]);
			totalLBonusArray.push(_n_bonus_arr[i][_n_bonus_arr[i].length-1]);
		}
		calcHighBonusArray.sort(compare);
		calcLowBonusArray.sort();
		for ( var i = 0; i < _n_bonus_arr_dan.length; i++ ) {
			_n_bonus_arr_dan[i].sort(compare);
			calcDanHighBonusArray.push(_n_bonus_arr_dan[i][0]);
			totalHBonusArray.push(_n_bonus_arr_dan[i][0]);
			calcDanLowBonusArray.push(_n_bonus_arr_dan[i][_n_bonus_arr_dan[i].length-1]);
			totalLBonusArray.push(_n_bonus_arr_dan[i][_n_bonus_arr_dan[i].length-1]);
		}
		totalHBonusArray.sort(compare);
		totalLBonusArray.sort();
		
		$("#bonusDetailId").empty();
		var bsdHtml = "";
		var bonusTA = new Array();
		for ( var i = startWinSch; i <= schInfo.length; i++ ) {
			var lowestBonus = 0.0;	//	最小奖金
			var highestBonus = 0.0;	//	最高奖金
			bsdHtml += "<tr><td>" + i + "</td>";
			for ( var j = 0; j < freePs.length; j++ ) {
				var betNum = 0;
				if ( parseInt(freePs[j].split("c")[0]) <= i ) {
					for ( var k = 0; k < _c_arr.length; k++ ) {
						if ( _c_arr[k].split("c")[1] == "1" ) {	// 自由过关
							if ( _c_arr[k] == freePs[j] ) {
								betNum += findCombNum(i-_n_bonus_arr_dan.length, parseInt(freePs[j].split("c")[0])-_n_bonus_arr_dan.length);
								var calcA = new Array()
								for ( var jj = 0; jj < i - calcDanHighBonusArray.length; jj++ ) {
									calcA.push(calcHighBonusArray[jj]);
								}
								var bonusHA = findJcComb(calcA, i - calcDanHighBonusArray.length, parseInt(freePs[j].split("c")[0]) - calcDanHighBonusArray.length);
								
								for ( var jj = 0; jj < bonusHA.length; jj++ ) {
									var subLB = 1;
									for ( var jjj = 0; jjj < calcDanHighBonusArray.length; jjj++ ) {
										subLB *= parseFloat(calcDanHighBonusArray[jjj]);
									}
									for ( var jjj = 0; jjj < bonusHA[jj].length; jjj++ ) {
										subLB *= parseFloat(bonusHA[jj][jjj]);
									}
									highestBonus += subLB * 2 * multiple;
								}
								
								var calcLA = new Array()
								for ( var jj = 0; jj < i - calcDanLowBonusArray.length; jj++ ) {
									calcLA.push(calcLowBonusArray[jj]);
								}
								var bonusLA = findJcComb(calcLA, i - calcDanLowBonusArray.length, parseInt(freePs[j].split("c")[0]) - calcDanLowBonusArray.length);
								
								for ( var jj = 0; jj < bonusLA.length; jj++ ) {
									var subLB = 1;
									for ( var jjj = 0; jjj < calcDanLowBonusArray.length; jjj++ ) {
										subLB *= parseFloat(calcDanLowBonusArray[jjj]);
									}
									for ( var jjj = 0; jjj < bonusLA[jj].length; jjj++ ) {
										subLB *= parseFloat(bonusLA[jj][jjj]);
									}
									lowestBonus += subLB * 2 * multiple;
								}
								
							}
						} else {	//	组合过关,不能设置胆
							if ( schInfo.length > parseInt(_c_arr[k].split("c")[0]) ) {
								var cLen = findCombNum(schInfo.length - parseInt(freePs[j].split("c")[0]), parseInt(_c_arr[k].split("c")[0]) - parseInt(freePs[j].split("c")[0]));
								for ( var kkk = 0; kkk < cLen; kkk++ ) {
									var cArray = combCrMap.get(_c_arr[k]);
									for ( var kk = 0; kk < cArray.length; kk++ ) {
										if ( cArray[kk] == freePs[j] ) {
											betNum += findCombNum(i, parseInt(freePs[j].split("c")[0]));
											var calcHA = new Array();
											for ( var jj = 0; jj < calcDanHighBonusArray.length; jj++ ) {
												calcHA.push(calcDanHighBonusArray[jj]);
											}
											for ( var jj = 0; jj < i-calcDanHighBonusArray.length; jj++ ) {
												calcHA.push(calcHighBonusArray[jj]);
											}
											calcHA.sort(compare);
											var bonusHA = findJcComb(calcHA, i, parseInt(freePs[j].split("c")[0]));
											for ( var jj = 0; jj < bonusHA.length; jj++ ) {
												var calcHB = 1;
												
												for ( var jjj = 0; jjj < bonusHA[jj].length; jjj++ ) {
													calcHB *= parseFloat(bonusHA[jj][jjj]);
												}
												highestBonus += calcHB * 2 * multiple;
											}
											
											var calcLA = new Array();
											for ( var jj = 0; jj < calcDanLowBonusArray.length; jj++ ) {
												calcLA.push(calcDanLowBonusArray[jj]);
											}
											for ( var jj = 0; jj < i-calcDanLowBonusArray.length; jj++ ) {
												calcLA.push(calcLowBonusArray[jj]);
											}
											calcLA.sort(compare);
											var bonusLA = findJcComb(calcLA, i, parseInt(freePs[j].split("c")[0]));
											for ( var jj = 0; jj < bonusLA.length; jj++ ) {
												var calcHB = 1;
												
												for ( var jjj = 0; jjj < bonusLA[jj].length; jjj++ ) {
													calcHB *= parseFloat(bonusLA[jj][jjj]);
												}
												lowestBonus += calcHB * 2 * multiple;
											}
											
										}
									}
								}
							} else {
								var cArray = combCrMap.get(_c_arr[k]);
								for ( var kk = 0; kk < cArray.length; kk++ ) {
									if ( cArray[kk] == freePs[j] ) {
										betNum += findCombNum(i, parseInt(freePs[j].split("c")[0]));
										
										var bonusHA = findJcComb(totalHBonusArray, i, parseInt(freePs[j].split("c")[0]));
										
										for ( var jj = 0; jj < bonusHA.length; jj++ ) {
											var subLB = 1;
											
											for ( var jjj = 0; jjj < bonusHA[jj].length; jjj++ ) {
												subLB *= parseFloat(bonusHA[jj][jjj]);
											}
											highestBonus += subLB * 2 * multiple;
										}
										
										
										var bonusLA = findJcComb(totalLBonusArray, i , parseInt(freePs[j].split("c")[0]));
										
										for ( var jj = 0; jj < bonusLA.length; jj++ ) {
											var subLB = 1;
											
											for ( var jjj = 0; jjj < bonusLA[jj].length; jjj++ ) {
												subLB *= parseFloat(bonusLA[jj][jjj]);
											}
											lowestBonus += subLB * 2 * multiple;
										}
									}
								}
							}
						}
					}
				}
				
				bsdHtml += "<td>" + betNum + "</td>";	// 中奖注数
			}
			bsdHtml += "<td>" + multiple + "</td>";
			var _bnsl = new Number(lowestBonus);
			var _bnsh = new Number(highestBonus);
			bonusTA.push(_bnsl.toFixed(2));
			bonusTA.push(_bnsh.toFixed(2));
			bsdHtml += "<td><font><b>" + _bnsl.toFixed(2) + "</b></font>[<a href=\"javascript:void 0\" onclick=\"lookLowDetailBonus(" + i + ",0);\">详情</a>]</td>";
			bsdHtml += "<td><font><b>" + _bnsh.toFixed(2) + "</b></font>[<a href=\"javascript:void 0\" onclick=\"lookLowDetailBonus(" + i + ",1);\">详情</a>]</td></tr>";
		}
		$(bsdHtml).appendTo($("#bonusDetailId"));
		
		bonusTA.sort(compare);
		$("#bonusRangeId").html(bonusTA[bonusTA.length-1]+"-"+bonusTA[0]);
		
		/* 弹出奖金明细层 */
		showBonusDetail();
		
		$("#bonusDetailTableId").hide();
	});
	
	$("#closeBonusInfoId").click(function () {
		$.unblockUI();
	});
}

function lookLowDetailBonus(winedSch, type) {
	
	var betMap = getBetInfo();
		
	var _n_arr = betMap.get("nAr");
	var _n_arr_dan = betMap.get("nArDa");
	var _c_arr = betMap.get("cAr");				
	
	var multiple = $("#beiTou").val();
	if ( isNaN(multiple) ) {
		$("#beiTou").val("1");
		multiple = 1;
	}
	var freePs = new Array();	// 2串1到8串1
	for ( var i = 0; i < _c_arr.length; i++ ) {
		if ( _c_arr[i].split("c")[1] == "1" ) {
			var nexist = 0;
			for ( var j = 0; j < freePs.length; j++ ) {
				if ( freePs[j] == _c_arr[i] ) {
					nexist = 1;
					break;
				}
			}
			if ( nexist == 0 ) {
				freePs.push(_c_arr[i]);
			}
		} else {
			var cArray = combCrMap.get(_c_arr[i]);
			for ( var k = 0; k < cArray.length; k++ ) {
				var nexist = 0;
				for ( var j = 0; j < freePs.length; j++ ) {
					if ( freePs[j] == cArray[k] ) {
						nexist = 1;
						break;
					}
				}
				if ( nexist == 0 ) {
					freePs.push(cArray[k]);
				}
			}
		}
	}
	
	var _n_bonus_arr = betMap.get("nArBo");
	var _n_bonus_arr_dan = betMap.get("nArBoDa");
	var calcHighBonusArray = new Array();	//	用于计算最高奖金
	var calcLowBonusArray = new Array();	//	用于计算最低奖金
	var calcDanHighBonusArray = new Array();//	用于计算最高奖金
	var calcDanLowBonusArray = new Array();	//	用于计算最低奖金
	
	var totalHBonusArray = new Array();	//	用于计算最高奖金
	var totalLBonusArray = new Array();	//	用于计算最低奖金
	for ( var i = 0; i < _n_bonus_arr.length; i++ ) {
		_n_bonus_arr[i].sort(compare);
		calcHighBonusArray.push(_n_bonus_arr[i][0]);
		totalHBonusArray.push(_n_bonus_arr[i][0]);
		calcLowBonusArray.push(_n_bonus_arr[i][_n_bonus_arr[i].length-1]);
		totalLBonusArray.push(_n_bonus_arr[i][_n_bonus_arr[i].length-1]);
	}
	calcHighBonusArray.sort(compare);
	calcLowBonusArray.sort();
	for ( var i = 0; i < _n_bonus_arr_dan.length; i++ ) {
		_n_bonus_arr_dan[i].sort(compare);
		calcDanHighBonusArray.push(_n_bonus_arr_dan[i][0]);
		totalHBonusArray.push(_n_bonus_arr_dan[i][0]);
		calcDanLowBonusArray.push(_n_bonus_arr_dan[i][_n_bonus_arr_dan[i].length-1]);
		totalLBonusArray.push(_n_bonus_arr_dan[i][_n_bonus_arr_dan[i].length-1]);
	}
	totalHBonusArray.sort(compare);
	totalLBonusArray.sort();	
	var schInfo = $("#danMaList dd:visible");
	var pHtml = "";
	var totalHa = 0.0;
	var betN = 0;
	for ( var j = 0; j < freePs.length; j++ ) {
		if ( parseInt(freePs[j].split("c")[0]) <= winedSch ) {
			pHtml += "<tr><td>"+freePs[j].replace("c","串")+"</td>";
			var betNum = 0;
			var jhtml = "";
			var bn = 0;
			for ( var k = 0; k < _c_arr.length; k++ ) {
				if ( _c_arr[k].split("c")[1] == "1" ) {
					if ( freePs[j] == _c_arr[k] ) {
						//betNum += findCombNum(winedSch, parseInt(freePs[i].split("c")[0]));
						if ( type == 0 ) {
							calcHighBonusArray = calcLowBonusArray;
							calcDanHighBonusArray = calcDanLowBonusArray;
						}
						var bA = findJcComb(calcHighBonusArray, winedSch - calcDanHighBonusArray.length, parseInt(freePs[j].split("c")[0])- calcDanHighBonusArray.length);
						betNum += bA.length;
						betN += bA.length;
						for ( var jj = 0; jj < bA.length; jj++ ) {
							var subBa = 1;
							for ( var jjj = 0; jjj < calcDanHighBonusArray.length; jjj++ ) {
								jhtml += calcDanHighBonusArray[jjj]+" × ";
								subBa *= calcDanHighBonusArray[jjj];
							}
							for ( var jjj = 0; jjj < bA[jj].length; jjj++ ) {
								jhtml += bA[jj][jjj]+" × ";
								subBa *= bA[jj][jjj];
							}
							_bnsl = new Number(subBa*2*multiple);	
							jhtml += "2 × " + multiple +"倍 = " + _bnsl.toFixed(2) + " 元<br>";
							bn += subBa*2;
						}
					}
				} else {	// 组合
					
					if ( schInfo.length > parseInt(_c_arr[k].split("c")[0]) ) {
						var cLen = findCombNum(schInfo.length - parseInt(freePs[j].split("c")[0]), parseInt(_c_arr[k].split("c")[0]) - parseInt(freePs[j].split("c")[0]));
						for ( var kkk = 0; kkk < cLen; kkk++ ) {
							var cArray = combCrMap.get(_c_arr[k]);
							for ( var kk = 0; kk < cArray.length; kk++ ) {
								if ( cArray[kk] == freePs[j] ) {
									//betNum += findCombNum(winedSch, parseInt(freePs[j].split("c")[0]));
									if ( type == 0 ) {
										calcHighBonusArray = calcLowBonusArray;
										calcDanHighBonusArray = calcDanLowBonusArray;
									}
									var calcHA = new Array();
									for ( var jj = 0; jj < calcDanHighBonusArray.length; jj++ ) {
										calcHA.push(calcDanHighBonusArray[jj]);
									}
									for ( var jj = 0; jj < winedSch-calcDanHighBonusArray.length; jj++ ) {
										calcHA.push(calcHighBonusArray[jj]);
									}
									calcHA.sort(compare);
									var bonusHA = findJcComb(calcHA, winedSch, parseInt(freePs[j].split("c")[0]));
									
									
									for ( var jj = 0; jj < bonusHA.length; jj++ ) {								
									
										var subBa = 1;
										
										for ( var jjj = 0; jjj < bonusHA[jj].length; jjj++ ) {
											jhtml += bonusHA[jj][jjj]+" × ";
											subBa *= bonusHA[jj][jjj];
										}
										_bnsl = new Number(subBa*2*multiple);	
										jhtml += "2 × " + multiple +"倍 = " + _bnsl.toFixed(2) + " 元<br>";
										bn += subBa*2;
									}
									betNum += bonusHA.length;
									betN += bonusHA.length;
									
								}
							}
						}
					} else {
						var cArray = combCrMap.get(_c_arr[k]);
						for ( var kk = 0; kk < cArray.length; kk++ ) {
							if ( cArray[kk] == freePs[j] ) {
								//betNum += findCombNum(winedSch, parseInt(freePs[j].split("c")[0]));
								if ( type == 0 ) {
									totalHBonusArray = totalLBonusArray;
									//calcDanHighBonusArray = calcDanLowBonusArray;
								}
								var bonusHA = findJcComb(totalHBonusArray, winedSch, parseInt(freePs[j].split("c")[0]));
								
								for ( var jj = 0; jj < bonusHA.length; jj++ ) {								
									
									var subBa = 1;
									
									for ( var jjj = 0; jjj < bonusHA[jj].length; jjj++ ) {
										jhtml += bonusHA[jj][jjj]+" × ";
										subBa *= bonusHA[jj][jjj];
									}
									_bnsl = new Number(subBa*2*multiple);	
									jhtml += "2 × " + multiple +"倍 = " + _bnsl.toFixed(2) + " 元<br>";
									bn += subBa*2;
								}
								betNum += bonusHA.length;
								betN += bonusHA.length;
								
							}
						}
					}
					
					
					
				}
			}
			var _bnsl = new Number(bn*multiple);		
			pHtml += "<td>"+betNum+"注</td>";
			pHtml += "<td>"+jhtml+"</td>";
			pHtml += "<td><font><b>"+_bnsl.toFixed(2)+"</b></font>元</td>";
			pHtml += "</tr>";
			totalHa += bn;
		}
	}
	var _bnsl = new Number(totalHa*multiple);		
	pHtml += "<tr><td>合计</td><td>"+betN+"注</td><td>&nbsp;</td><td><font><b>"+_bnsl.toFixed(2)+"</b></font>元</td>";
	
	$("#pBonusDetailId").empty();
	$(pHtml).appendTo($("#pBonusDetailId"));
	
	$("#bonusDetailTableId").show();
}

/**
 *	单击自由过关，设胆复选框改变
 */
function changeDanStyle() {
	var minSel = 0;
	var fp = $("#zyChuanBox input[type=checkbox]:checked");
	for ( var i = 0; i < fp.length; i++ ) {
		if ( minSel == 0 ) {
			minSel = parseInt($(fp[i]).val().split("c")[0]);
		} else if ( parseInt($(fp[i]).val().split("c")[0]) < minSel ) {
			minSel = parseInt($(fp[i]).val().split("c")[0]);
		}
	}
	var cLen = 0;	
	var dan = $("#danMaList").find("input[type=checkbox]");
	for ( var i = 1; i < dan.length; i = i + 2 ) {
		if ( $(dan[i]).attr("checked") ) {
			cLen++;
		}
	}
	
	if ( cLen == minSel - 1 ) {
		
		for ( var i = 1; i < dan.length; i = i + 2 ) {
			if ( !$(dan[i]).attr("checked") ) {
				$(dan[i]).attr("disabled", "disabled");
			}
		}
	} else {
		for ( var i = 1; i < dan.length; i = i + 2 ) {
			
			$(dan[i]).removeAttr("disabled", "disabled");
			
		}
	}
	
	if ( fp.length == 0 ) {
		var schInfo = $("#danMaList dd:visible");
		var pLen = parseInt($("#maxPassId").val());	// 此值在胜平负中为8,比分为4，总进球为6，半全场为4，胜负为8，让分胜负为8，大小分为8，胜分差为4
		var maxDan = schInfo.length > pLen ? pLen - 1 : schInfo.length - 1;
		if ( cLen == maxDan ) {
			// 置灰
			for ( var i = 1; i < dan.length; i = i + 2 ) {
				if ( !$(dan[i]).attr("checked") ) {
					$(dan[i]).attr("disabled", "disabled");
				}
			} 
		}
		
	}
}

/**
 *	单击设胆，改变自由过关
 */
function changeZyCheck(obj) {
	var dan = $("#danMaList").find("input[type=checkbox]");
	var cLen = 0;
	var schInfo = $("#danMaList dd:visible");
	var pLen = parseInt($("#maxPassId").val());	// 此值在胜平负中为8,比分为4，总进球为6，半全场为4，胜负为8，让分胜负为8，大小分为8，胜分差为4
	var maxDan = schInfo.length > pLen ? pLen - 1 : schInfo.length - 1;
	for ( var i = 1; i < dan.length; i = i + 2 ) {
		if ( $(dan[i]).attr("checked") ) {
			cLen++;
		}
	}
	
	if ( cLen > maxDan ) {
		alert("最大设置个" + maxDan + "胆");
		cLen--;
		$(obj).removeAttr("checked");			
	}
	var fp = $("#zyChuanBox input[type=checkbox]");
	
	for ( var i = 0; i < fp.length; i++ ) {
		if ( parseInt($(fp[i]).val().split("c")[0]) <= cLen ) {
			$(fp[i]).attr("disabled", "disabled");
		}
	}
	
	
}

/**
 *	单击设胆
 */
function danSetFun( obj ) {
	$("#zyChuanBox input[type=checkbox]").removeAttr("disabled");
	if ( $(obj).attr("checked") ) {					
		$("#zhChuanBox input[type=checkbox]").removeAttr("checked");		
	}
	changeZyCheck(obj);
	changeDanStyle();
	calcBetInfo();
}

/**
 *	显示奖金明细
 */
function showBonusDetail() {
	$.blockUI({
		message: $("#bonusInfoId"),
		css: {
			width: '612px',
			height: '520px',
			left: ($(window).width() - 618) / 2 + 'px',
			top: 50 + 'px',
			border: 'none',
			cursor:'default'
		}
	});		
}

/**
 *	过关区域展示
 */
function showGgArea() {
	var schInfo = $("#danMaList dd:visible");
	var pLen = parseInt($("#maxPassId").val());;	// 此值在胜平负中为8,比分为4，总进球为6，半全场为4，胜负为8，让分胜负为8，大小分为8，胜分差为4
	var maxPass = schInfo.length > pLen ? pLen : schInfo.length;
	
	$("#zyChuanBox span").hide();
	var freeBox = $("#zyChuanBox").find("span");
	for ( var i = 0; i < freeBox.length; i++ ) {		
		if ( parseInt($(freeBox[i]).attr("value")) <= maxPass ) {
			$(freeBox[i]).show();
		}
	}
	
	$("#zhChuanBox span").hide();
	var combBox = $("#zhChuanBox").find("span");
	for ( var i = 0; i < combBox.length; i++ ) {		
		if ( parseInt($(combBox[i]).attr("value")) <= maxPass ) {
			$(combBox[i]).show();
		}
	}
	
	$("#changCiNum").html(schInfo.length);
}

/**
 *	取得各种用于计算的数组
 */
function getBetInfo() {
	var _c_arr = new Array();	// 过关方式
	var freeBox = $("#zyChuanBox input[type=checkbox]:checked:visible");
	for ( var i = 0; i < freeBox.length; i++ ) {
		_c_arr.push($(freeBox[i]).val());
	}
	
	var combBox = $("#zhChuanBox input[type=checkbox]:checked:visible");
	for ( var i = 0; i < combBox.length; i++ ) {
		_c_arr.push($(combBox[i]).val());
	}
	
	var _n_arr = new Array();	//	存放胜平负等（非胆）
	var _n_arr_dan = new Array();	// 存放胜平负等彩果（胆）
	
	var _n_bonus_arr = new Array();	// 存放赔率（非胆）
	var _n_bonus_arr_dan = new Array();	// 存放赔率（胆）
	
	var schInfo = $("#danMaList dd:visible");
	$("#changCiNum").html(schInfo.length);
	
	var bfconversion = ["3A","10","20","21","30","31","32","40","41","42","50","51","52",
	                    "1A","00","11","22","33",
	                    "0A","01","02","12","03","13","23","04","14","24","05","15","25"];
	var bqcconversion = ["33","31","30","13","11","10","03","01","00"];
	highopts = new Array();
	for ( var i = 0; i < schInfo.length; i++ ) {
		var single = new Array();
		var spfopts="",nspfopts="",bfopts="",bqcopts="",jqsopts="";
		var isDan = $(schInfo[i]).find("input[type=checkbox]").eq(1).attr("checked");
		if ( isDan ) {
			var opt = $(schInfo[i]).find("em:visible");
			var sub_arr_dan = new Array();
			var sub_bonus_arr_dan = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				var item = $(opt[j]);
				if ( $("#subPlayId").val() == 5 ) {//这个判断做什么?混合过关没进来啊
					sub_arr_dan.push(item.attr("play")+"-"+item.attr("type"));
				} else {
					sub_arr_dan.push(item.attr("type"));
				}
				sub_bonus_arr_dan.push(item.attr("odd"));
				if($("#subPlayId").val() == 1){
					spfopts += "spf-" + item.attr("type") + "@" + $(schInfo[i]).attr("rq") + "#" + item.attr("odd") + ","	
				}else if($("#subPlayId").val() == 2){
					jqsopts += "jqs-" + item.attr("type") + "#" + item.attr("odd") + ","
				}else if($("#subPlayId").val() == 3){
					bfopts += "bf-" + bfconversion[item.attr("type")] + "#" + item.attr("odd") + ","					
				}else if($("#subPlayId").val() == 4){
					bqcopts += "bqc-" + bqcconversion[item.attr("type")] + "#" + item.attr("odd") + ","
				}else if($("#subPlayId").val() == 6){
					nspfopts += "nspf-" + item.attr("type") + "#" + item.attr("odd") + ","					
				}
			}
			_n_arr_dan.push(sub_arr_dan);
			_n_bonus_arr_dan.push(sub_bonus_arr_dan);
		} else {
			var opt = $(schInfo[i]).find("em:visible");
			var sub_arr = new Array();
			var sub_bonus_arr = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				var item = $(opt[j]);
				if ( $("#subPlayId").val() == 5 ) {
					sub_arr.push(item.attr("play")+"-"+item.attr("type"));
				} else {
					sub_arr.push(item.attr("type"));
				}
				sub_bonus_arr.push(item.attr("odd"));
				if($("#subPlayId").val() == 1){
					spfopts += "spf-" + item.attr("type") + "@" + $(schInfo[i]).attr("rq") + "#" + item.attr("odd").replace(/,/g,"") + ","	
				}else if($("#subPlayId").val() == 2){
					jqsopts += "jqs-" + item.attr("type") + "#" + item.attr("odd").replace(/,/g,"") + ","
				}else if($("#subPlayId").val() == 3){
					bfopts += "bf-" + bfconversion[item.attr("type")] + "#" + item.attr("odd").replace(/,/g,"") + ","					
				}else if($("#subPlayId").val() == 4){
					bqcopts += "bqc-" + bqcconversion[item.attr("type")] + "#" + item.attr("odd").replace(/,/g,"") + ","
				}else if($("#subPlayId").val() == 6){
					nspfopts += "nspf-" + item.attr("type") + "#" + item.attr("odd").replace(/,/g,"") + ","					
				}
			}
			_n_arr.push(sub_arr);
			_n_bonus_arr.push(sub_bonus_arr);
		}
		if(spfopts != ""){
			single.push(spfopts.substring(0,spfopts.length-1) + (isDan?"D":""));
		}
		if(nspfopts != ""){
			single.push(nspfopts.substring(0,nspfopts.length-1) + (isDan?"D":""));
		}
		if(bfopts != ""){
			single.push(bfopts.substring(0,bfopts.length-1) + (isDan?"D":""));
		}
		if(bqcopts != ""){
			single.push(bqcopts.substring(0,bqcopts.length-1) + (isDan?"D":""));
		}
		if(jqsopts != ""){
			single.push(jqsopts.substring(0,jqsopts.length-1) + (isDan?"D":""));
		}
		highopts.push(single.join("|"));
	}	
	var betMap = new HashTable();
	betMap.put("cAr", _c_arr);
	betMap.put("nAr", _n_arr);
	betMap.put("nArDa", _n_arr_dan);
	betMap.put("nArBo", _n_bonus_arr);
	betMap.put("nArBoDa", _n_bonus_arr_dan);
	return betMap;
}

/**
 *	取得新界面各种用于计算的数组 Added at 2013/08/18
 */
function getBetInfo2() {
	var _c_arr = new Array();	// 过关方式
	//var zyViews = $("#ggTypeAreaId").find("span[class='w-50 f-l']");
	for ( var i = 0 ; i < zyViews.length; i++ ) {
		if (  $(zyViews[i]).find("input[type=checkbox]").eq(0).attr("checked") ) {
			_c_arr.push($(zyViews[i]).attr("value"));
		} 
	}
	
	//var zhViews = $("#zhAreaId").find("td");
	for ( var i = 0 ; i < zhViews.length; i++ ) {
		if ( $(zhViews[i]).attr("value") ) {
			if ( $(zhViews[i]).find("input[type=checkbox]").eq(0).attr("checked") ) {
				_c_arr.push($(zhViews[i]).attr("value"));
			}
		}
	}
	
	var _n_arr = new Array();	//	存放胜平负等（非胆）
	var _n_arr_dan = new Array();	// 存放胜平负等彩果（胆）
	
	var _n_bonus_arr = new Array();	// 存放赔率（非胆）
	var _n_bonus_arr_dan = new Array();	// 存放赔率（胆）
	
	//var trs = $("#jczqTable").find("tr[hidetype=show]");
	var trs = schInfo;
	
	if ( $("#licenseId").val() == "227" ) {
		if ( $("#ht2x1Id").length > 0 ) {
			for ( var i = 0; i < trs.length; i++ ) {
				var spfbets = $(trs[i]).find("td.tdBgOn");
				if ( spfbets.length > 0 ) {
					var sub_arr_dan = new Array();
					var sub_bonus_arr_dan = new Array();
					if ( $(trs[i]).find("input[type=checkbox]").eq(1).attr("checked") ) {
						if ( spfbets.length > 0 ) {
							var sub_arr_dan_spf = new Array();
							var sub_arr_dan_rqspf = new Array();
							var sub_bonus_arr_dan_spf = new Array();
							
							for ( var j = 0; j < spfbets.length; j++ ) {
								if ( $(spfbets[j]).attr("play") == "6" ) {
									sub_arr_dan_spf.push($(spfbets[j]).attr("play")+"-"+$(spfbets[j]).attr("type"));
									if ( $(spfbets[j]).attr("type") == "3" ) {
										sub_bonus_arr_dan_spf.push($(spfbets[j]).children().eq(0).children().eq(1).html());
									} else {
										sub_bonus_arr_dan_spf.push($(spfbets[j]).children().eq(0).children().eq(0).html());
									}
								} else {
									sub_arr_dan_rqspf.push($(spfbets[j]).attr("play")+"-"+$(spfbets[j]).attr("type"));
									if ( $(spfbets[j]).attr("type") == "3" ) {
										sub_bonus_arr_dan_spf.push($(spfbets[j]).children().eq(0).children().eq(1).html());
									} else {
										sub_bonus_arr_dan_spf.push($(spfbets[j]).children().eq(0).children().eq(0).html());
									}
								}
							} 
							if ( sub_arr_dan_spf.length > 0 ) {
								sub_arr_dan.push(sub_arr_dan_spf);
								sub_bonus_arr_dan.push(sub_bonus_arr_dan_spf);
							}
							if ( sub_arr_dan_rqspf.length > 0 ) {
								sub_arr_dan.push(sub_arr_dan_rqspf);
							}
							
						}
						
						_n_arr_dan.push(sub_arr_dan);
						_n_bonus_arr_dan.push(sub_bonus_arr_dan);
					} else {
						
						if ( spfbets.length > 0 ) {
							var sub_arr_dan_spf = new Array();
							var sub_arr_dan_rqspf = new Array();
							var sub_bonus_arr_dan_spf = new Array();
							
							for ( var j = 0; j < spfbets.length; j++ ) {
								if ( $(spfbets[j]).attr("play") == "6" ) {
									sub_arr_dan_spf.push($(spfbets[j]).attr("play")+"-"+$(spfbets[j]).attr("type"));
									if ( $(spfbets[j]).attr("type") == "3" ) {
										sub_bonus_arr_dan_spf.push($(spfbets[j]).children().eq(0).children().eq(1).html());
									} else {
										sub_bonus_arr_dan_spf.push($(spfbets[j]).children().eq(0).children().eq(0).html());
									}
								} else {
									sub_arr_dan_rqspf.push($(spfbets[j]).attr("play")+"-"+$(spfbets[j]).attr("type"));
									if ( $(spfbets[j]).attr("type") == "3" ) {
										sub_bonus_arr_dan_spf.push($(spfbets[j]).children().eq(0).children().eq(1).html());
									} else {
										sub_bonus_arr_dan_spf.push($(spfbets[j]).children().eq(0).children().eq(0).html());
									}
								}
							} 
							if ( sub_arr_dan_spf.length > 0 ) {
								sub_arr_dan.push(sub_arr_dan_spf);
								sub_bonus_arr_dan.push(sub_bonus_arr_dan_spf);
							}
							if ( sub_arr_dan_rqspf.length > 0 ) {
								sub_arr_dan.push(sub_arr_dan_rqspf);
							}
						}
						
						_n_arr.push(sub_arr_dan);
						_n_bonus_arr.push(sub_bonus_arr_dan);
					}
					
				}
				
			}	
		} else {
			for ( var i = 0; i < trs.length; i++ ) {
				var spfbets = $(trs[i]).find("td[class='tdBg c-3 tdBgOn']");
				var bfbets = $(trs[i]).next().find("td[class='tdBg tdBgOn']");
				var zjqbets = $(trs[i]).next().next().find("td[class='tdBg tdBgOn']");
				var bqcbets = $(trs[i]).next().next().next().find("td[class='tdBg tdBgOn']");
				
				if ( spfbets.length > 0 || bfbets.length > 0 || zjqbets.length > 0 || bqcbets.length > 0 ) {
					var sub_arr_dan = new Array();
					var sub_bonus_arr_dan = new Array();
					if ( $(trs[i]).find("input[type=checkbox]").eq(1).attr("checked") ) {
						if ( spfbets.length > 0 ) {
							var sub_arr_dan_spf = new Array();
							var sub_arr_dan_rqspf = new Array();
							var sub_bonus_arr_dan_spf = new Array();
							var sub_bonus_arr_dan_rqspf = new Array();
							
							for ( var j = 0; j < spfbets.length; j++ ) {
								if ( $(spfbets[j]).attr("play") == "6" ) {
									sub_arr_dan_spf.push($(spfbets[j]).attr("play")+"-"+$(spfbets[j]).attr("type"));
									sub_bonus_arr_dan_spf.push($(spfbets[j]).html());
								} else {
									sub_arr_dan_rqspf.push($(spfbets[j]).attr("play")+"-"+$(spfbets[j]).attr("type"));
									sub_bonus_arr_dan_rqspf.push($(spfbets[j]).html());
								}
							} 
							if ( sub_arr_dan_spf.length > 0 ) {
								sub_arr_dan.push(sub_arr_dan_spf);
								sub_bonus_arr_dan.push(sub_bonus_arr_dan_spf);
							}
							if ( sub_arr_dan_rqspf.length > 0 ) {
								sub_arr_dan.push(sub_arr_dan_rqspf);
								sub_bonus_arr_dan.push(sub_bonus_arr_dan_rqspf);
							}
						}
						if ( bfbets.length > 0 ) {
							var sub_arr_dan_bf = new Array();
							var sub_bonus_arr_dan_bf = new Array();
							for ( var j = 0; j < bfbets.length; j++ ) {
								sub_arr_dan_bf.push($(bfbets[j]).find("b").eq(0).attr("play")+"-"+$(bfbets[j]).find("b").eq(0).attr("type"));
								sub_bonus_arr_dan_bf.push($(bfbets[j]).find("b").eq(0).html());
							} 
							if ( sub_arr_dan_bf.length > 0 ) {
								sub_arr_dan.push(sub_arr_dan_bf);
								sub_bonus_arr_dan.push(sub_bonus_arr_dan_bf);
							}
						}
						if ( zjqbets.length > 0 ) {
							var sub_arr_dan_zjq = new Array();
							var sub_bonus_arr_dan_zjq = new Array();
							for ( var j = 0; j < zjqbets.length; j++ ) {
								sub_arr_dan_zjq.push($(zjqbets[j]).find("b").eq(0).attr("play")+"-"+$(zjqbets[j]).find("b").eq(0).attr("type"));
								sub_bonus_arr_dan_zjq.push($(zjqbets[j]).find("b").eq(0).html());
							} 
							if ( sub_arr_dan_zjq.length > 0 ) {
								sub_arr_dan.push(sub_arr_dan_zjq);
								sub_bonus_arr_dan.push(sub_bonus_arr_dan_zjq);
							}
						}
						if ( bqcbets.length > 0 ) {
							var sub_arr_dan_bqc = new Array();
							var sub_bonus_arr_dan_bqc = new Array();
							for ( var j = 0; j < bqcbets.length; j++ ) {
								sub_arr_dan_bqc.push($(bqcbets[j]).find("b").eq(0).attr("play")+"-"+$(bqcbets[j]).find("b").eq(0).attr("type"));
								sub_bonus_arr_dan_bqc.push($(bqcbets[j]).find("b").eq(0).html());
							} 
							if ( sub_arr_dan_bqc.length > 0 ) {
								sub_arr_dan.push(sub_arr_dan_bqc);
								sub_bonus_arr_dan.push(sub_bonus_arr_dan_bqc);
							}
						}
						
						_n_arr_dan.push(sub_arr_dan);
						_n_bonus_arr_dan.push(sub_bonus_arr_dan);
					} else {
						
						if ( spfbets.length > 0 ) {
							var sub_arr_dan_spf = new Array();
							var sub_arr_dan_rqspf = new Array();
							var sub_bonus_arr_dan_spf = new Array();
							var sub_bonus_arr_dan_rqspf = new Array();
							
							for ( var j = 0; j < spfbets.length; j++ ) {
								if ( $(spfbets[j]).attr("play") == "6" ) {
									sub_arr_dan_spf.push($(spfbets[j]).attr("play")+"-"+$(spfbets[j]).attr("type"));
									sub_bonus_arr_dan_spf.push($(spfbets[j]).html());
								} else {
									sub_arr_dan_rqspf.push($(spfbets[j]).attr("play")+"-"+$(spfbets[j]).attr("type"));
									sub_bonus_arr_dan_rqspf.push($(spfbets[j]).html());
								}
							} 
							if ( sub_arr_dan_spf.length > 0 ) {
								sub_arr_dan.push(sub_arr_dan_spf);
								sub_bonus_arr_dan.push(sub_bonus_arr_dan_spf);
							}
							if ( sub_arr_dan_rqspf.length > 0 ) {
								sub_arr_dan.push(sub_arr_dan_rqspf);
								sub_bonus_arr_dan.push(sub_bonus_arr_dan_rqspf);
							}
						}
						if ( bfbets.length > 0 ) {
							var sub_arr_dan_bf = new Array();
							var sub_bonus_arr_dan_bf = new Array();
							for ( var j = 0; j < bfbets.length; j++ ) {
								sub_arr_dan_bf.push($(bfbets[j]).find("b").eq(0).attr("play")+"-"+$(bfbets[j]).find("b").eq(0).attr("type"));
								sub_bonus_arr_dan_bf.push($(bfbets[j]).find("b").eq(0).html());
							} 
							if ( sub_arr_dan_bf.length > 0 ) {
								sub_arr_dan.push(sub_arr_dan_bf);
								sub_bonus_arr_dan.push(sub_bonus_arr_dan_bf);
							}
						}
						if ( zjqbets.length > 0 ) {
							var sub_arr_dan_zjq = new Array();
							var sub_bonus_arr_dan_zjq = new Array();
							for ( var j = 0; j < zjqbets.length; j++ ) {
								sub_arr_dan_zjq.push($(zjqbets[j]).find("b").eq(0).attr("play")+"-"+$(zjqbets[j]).find("b").eq(0).attr("type"));
								sub_bonus_arr_dan_zjq.push($(zjqbets[j]).find("b").eq(0).html());
							} 
							if ( sub_arr_dan_zjq.length > 0 ) {
								sub_arr_dan.push(sub_arr_dan_zjq);
								sub_bonus_arr_dan.push(sub_bonus_arr_dan_zjq);
							}
						}
						if ( bqcbets.length > 0 ) {
							var sub_arr_dan_bqc = new Array();
							var sub_bonus_arr_dan_bqc = new Array();
							for ( var j = 0; j < bqcbets.length; j++ ) {
								sub_arr_dan_bqc.push($(bqcbets[j]).find("b").eq(0).attr("play")+"-"+$(bqcbets[j]).find("b").eq(0).attr("type"));
								sub_bonus_arr_dan_bqc.push($(bqcbets[j]).find("b").eq(0).html());
							} 
							if ( sub_arr_dan_bqc.length > 0 ) {
								sub_arr_dan.push(sub_arr_dan_bqc);
								sub_bonus_arr_dan.push(sub_bonus_arr_dan_bqc);
							}
						}
						
						_n_arr.push(sub_arr_dan);
						_n_bonus_arr.push(sub_bonus_arr_dan);
					}
					
				}
				
			}	
		
		}
	} else {
		for ( var i = 0; i < trs.length; i++ ) {
			var spfbets = $(trs[i]).find("td[class='tdBg tdBgOn']");
			var bfbets = $(trs[i]).next().find("td[class='tdBg tdBgOn']");
			
			if ( spfbets.length > 0 || bfbets.length > 0  ) {
				var sub_arr_dan = new Array();
				var sub_bonus_arr_dan = new Array();
				if ( $(schInfo[i]).find("input[type=checkbox]").eq(1).attr("checked") ) {
					if ( spfbets.length > 0 ) {
						var sub_arr_dan_spf = new Array();
						var sub_arr_dan_rqspf = new Array();
						var sub_arr_dan_dxf = new Array();
						var sub_bonus_arr_dan_spf = new Array();
						var sub_bonus_arr_dan_rqspf = new Array();
						var sub_bonus_arr_dan_dxf = new Array();
						
						for ( var j = 0; j < spfbets.length; j++ ) {
							if ( $(spfbets[j]).attr("play") == "1" ) {
								sub_arr_dan_spf.push($(spfbets[j]).attr("play")+"-"+$(spfbets[j]).attr("type"));
								sub_bonus_arr_dan_spf.push($(spfbets[j]).html());
							} else if ( $(spfbets[j]).attr("play") == "2" ) {
								sub_arr_dan_rqspf.push($(spfbets[j]).attr("play")+"-"+$(spfbets[j]).attr("type"));
								sub_bonus_arr_dan_rqspf.push($(spfbets[j]).html());
							} else {
								sub_arr_dan_dxf.push($(spfbets[j]).attr("play")+"-"+$(spfbets[j]).attr("type"));
								sub_bonus_arr_dan_dxf.push($(spfbets[j]).html());
							}
						} 
						if ( sub_arr_dan_spf.length > 0 ) {
							sub_arr_dan.push(sub_arr_dan_spf);
							sub_bonus_arr_dan.push(sub_bonus_arr_dan_spf);
						}
						if ( sub_arr_dan_rqspf.length > 0 ) {
							sub_arr_dan.push(sub_arr_dan_rqspf);
							sub_bonus_arr_dan.push(sub_bonus_arr_dan_rqspf);
						}
						if ( sub_arr_dan_dxf.length > 0 ) {
							sub_arr_dan.push(sub_arr_dan_dxf);
							sub_bonus_arr_dan.push(sub_bonus_arr_dan_dxf);
						}
					}
					if ( bfbets.length > 0 ) {
						var sub_arr_dan_bf = new Array();
						var sub_bonus_arr_dan_bf = new Array();
						for ( var j = 0; j < bfbets.length; j++ ) {
							sub_arr_dan_bf.push($(bfbets[j]).find("b").eq(0).attr("play")+"-"+$(bfbets[j]).find("b").eq(0).attr("type"));
							sub_bonus_arr_dan_bf.push($(bfbets[j]).find("b").eq(0).html());
						} 
						if ( sub_arr_dan_bf.length > 0 ) {
							sub_arr_dan.push(sub_arr_dan_bf);
							sub_bonus_arr_dan.push(sub_bonus_arr_dan_bf);
						}
					}
					
					_n_arr_dan.push(sub_arr_dan);
					_n_bonus_arr_dan.push(sub_bonus_arr_dan);
				} else {
					
					if ( spfbets.length > 0 ) {
						var sub_arr_dan_spf = new Array();
						var sub_arr_dan_rqspf = new Array();
						var sub_arr_dan_dxf = new Array();
						var sub_bonus_arr_dan_spf = new Array();
						var sub_bonus_arr_dan_rqspf = new Array();
						var sub_bonus_arr_dan_dxf = new Array();
						
						for ( var j = 0; j < spfbets.length; j++ ) {
							if ( $(spfbets[j]).attr("play") == "1" ) {
								sub_arr_dan_spf.push($(spfbets[j]).attr("play")+"-"+$(spfbets[j]).attr("type"));
								sub_bonus_arr_dan_spf.push($(spfbets[j]).html());
							} else if ( $(spfbets[j]).attr("play") == "2" ) {
								sub_arr_dan_rqspf.push($(spfbets[j]).attr("play")+"-"+$(spfbets[j]).attr("type"));
								sub_bonus_arr_dan_rqspf.push($(spfbets[j]).html());
							} else {
								sub_arr_dan_dxf.push($(spfbets[j]).attr("play")+"-"+$(spfbets[j]).attr("type"));
								sub_bonus_arr_dan_dxf.push($(spfbets[j]).html());
							}
						} 
						if ( sub_arr_dan_spf.length > 0 ) {
							sub_arr_dan.push(sub_arr_dan_spf);
							sub_bonus_arr_dan.push(sub_bonus_arr_dan_spf);
						}
						if ( sub_arr_dan_rqspf.length > 0 ) {
							sub_arr_dan.push(sub_arr_dan_rqspf);
							sub_bonus_arr_dan.push(sub_bonus_arr_dan_rqspf);
						}
						if ( sub_arr_dan_dxf.length > 0 ) {
							sub_arr_dan.push(sub_arr_dan_dxf);
							sub_bonus_arr_dan.push(sub_bonus_arr_dan_dxf);
						}
					}
					if ( bfbets.length > 0 ) {
						var sub_arr_dan_bf = new Array();
						var sub_bonus_arr_dan_bf = new Array();
						for ( var j = 0; j < bfbets.length; j++ ) {
							sub_arr_dan_bf.push($(bfbets[j]).find("b").eq(0).attr("play")+"-"+$(bfbets[j]).find("b").eq(0).attr("type"));
							sub_bonus_arr_dan_bf.push($(bfbets[j]).find("b").eq(0).html());
						} 
						if ( sub_arr_dan_bf.length > 0 ) {
							sub_arr_dan.push(sub_arr_dan_bf);
							sub_bonus_arr_dan.push(sub_bonus_arr_dan_bf);
						}
					}
					
					_n_arr.push(sub_arr_dan);
					_n_bonus_arr.push(sub_bonus_arr_dan);
				}
				
			}
			
		}	
	}
	
	var betMap = new HashTable();
	betMap.put("cAr", _c_arr);
	betMap.put("nAr", _n_arr);
	betMap.put("nArDa", _n_arr_dan);
	betMap.put("nArBo", _n_bonus_arr);
	betMap.put("nArBoDa", _n_bonus_arr_dan);
	return betMap;
}

/**
 *	取得新界面各种用于计算的数组 Added at 2013/08/18
 */
function getBetInfo2ZyGg() {
	var _c_arr = new Array();	// 过关方式
	//var zyViews = $("#ggTypeAreaId").find("span[class='w-50 f-l']");
	for ( var i = 0 ; i < zyViews.length; i++ ) {
		if (  $(zyViews[i]).find("input[type=checkbox]").eq(0).attr("checked") ) {
			_c_arr.push($(zyViews[i]).attr("value"));
		} 
	}
	
	//var zhViews = $("#zhAreaId").find("td");
	for ( var i = 0 ; i < zhViews.length; i++ ) {
		if ( $(zhViews[i]).attr("value") ) {
			if ( $(zhViews[i]).find("input[type=checkbox]").eq(0).attr("checked") ) {
				_c_arr.push($(zhViews[i]).attr("value"));
			}
		}
	}
	var betMap = new HashTable();
	betMap.put("cAr", _c_arr);
	
	if ( _c_arr.length == 0 ) {
		return betMap;
	}
	
	var _n_arr = new Array();	//	存放胜平负等（非胆）
	var _n_arr_dan = new Array();	// 存放胜平负等彩果（胆）
	
	var _n_bonus_arr = new Array();	// 存放赔率（非胆）
	var _n_bonus_arr_dan = new Array();	// 存放赔率（胆）
	
	//var trs = $("#jczqTable").find("tr[hidetype=show]");
	trs = schInfo;
	highopts = new Array();
	if ( $("#licenseId").val() == "227" ) {
		if ( $("#ht2x1Id").length > 0 ) {
			for ( var i = 0; i < trs.length; i++ ) {
				var spfbets = $(trs[i]).find("td.tdBgOn");
				var rq = $(trs[i]).attr("drq");
				if ( spfbets.length > 0) {
					var sub_arr_dan = new Array();
					var sub_bonus_arr_dan = new Array();
					var single = new Array();
					var isDan = $(trs[i]).find("input[type=checkbox]").eq(1).attr("checked");
					var spfopts = "",nspfopts = "";
					if ( isDan ) {
						for ( var j = 0; j < spfbets.length; j++ ) {
							var item = $(spfbets[j]);
							sub_arr_dan.push(item.attr("play")+"-"+item.attr("type"));
							var index = 0;
							if ( item.attr("type") == "3" ) {
								index = 1;
							}
							var opts = item.children().eq(0).children().eq(index).html();
							sub_bonus_arr_dan.push(opts);
							if(item.attr("play") === "1"){
								spfopts += "spf-" + item.attr("type") + "@" + rq + "#" + opts.replace(/,/g,"") + ","
							}else{
								nspfopts += "nspf-" + item.attr("type") + "#" + opts.replace(/,/g,"") + ","
							}
						}
						_n_arr_dan.push(sub_arr_dan);
						_n_bonus_arr_dan.push(sub_bonus_arr_dan);
					} else {
						for ( var j = 0; j < spfbets.length; j++ ) {
							var item = $(spfbets[j]);
							sub_arr_dan.push(item.attr("play")+"-"+item.attr("type"));
							var index = 0;
							if ( item.attr("type") == "3" ) {
								index = 1;
							}
							var opts = item.children().eq(0).children().eq(index).html();
							sub_bonus_arr_dan.push(opts);
							if(item.attr("play") === "1"){
								spfopts += "spf-" + item.attr("type") + "@" + rq + "#" + opts.replace(/,/g,"") + ","
							}else{
								nspfopts += "nspf-" + item.attr("type") + "#" + opts.replace(/,/g,"") + ","
							}
						} 
						_n_arr.push(sub_arr_dan);
						_n_bonus_arr.push(sub_bonus_arr_dan);
					}
					if(spfopts != ""){
						single.push(spfopts.substring(0,spfopts.length-1) + (isDan?"D":""));
					}
					if(nspfopts != ""){
						single.push(nspfopts.substring(0,nspfopts.length-1) + (isDan?"D":""));
					}
					highopts.push(single.join("|"));
				}
			}
		} else {
			for ( var i = 0; i < trs.length; i++ ) {
				var spfbets = $(trs[i]).find("td[class='tdBg c-3 tdBgOn']");
				var bfbets = $(trs[i]).next().find("td[class='tdBg tdBgOn']");
				var zjqbets = $(trs[i]).next().next().find("td[class='tdBg tdBgOn']");
				var bqcbets = $(trs[i]).next().next().next().find("td[class='tdBg tdBgOn']");
				var bfconversion = ["3A","10","20","21","30","31","32","40","41","42","50","51","52",
				                    "1A","00","11","22","33",
				                    "0A","01","02","12","03","13","23","04","14","24","05","15","25"];
				var bqcconversion = ["33","31","30","13","11","10","03","01","00"];
				var isDan = $(trs[i]).find("input[type=checkbox]").eq(1).attr("checked");
				var single = new Array();
				if ( spfbets.length > 0 || bfbets.length > 0 || zjqbets.length > 0 || bqcbets.length > 0 ) {
					var sub_arr_dan = new Array();
					var sub_bonus_arr_dan = new Array();
					if ( isDan ) {
						if ( spfbets.length > 0 ) {
							var spfopts = "";
							var nspfopts = "";
							for ( var j = 0; j < spfbets.length; j++ ) {
								var item = $(spfbets[j]);
								sub_arr_dan.push(item.attr("play")+"-"+item.attr("type"));
								sub_bonus_arr_dan.push(item.html());
								if($(spfbets[j]).attr("play") === "1"){
									spfopts += "spf-" + item.attr("type") + "@" + $(trs[i]).find("td:eq(13)").text() + "#" + item.text().replace(/,/g,"") + ","
								}else{
									nspfopts += "nspf-" + item.attr("type") + "#" + item.text().replace(/,/g,"") + ","
								}
							}
							if(spfopts != ""){
								single.push(spfopts.substring(0,spfopts.length-1) + "D");
							}
							if(nspfopts != ""){
								single.push(nspfopts.substring(0,nspfopts.length-1) + "D");
							}
						}
						if ( bfbets.length > 0 ) {
							var bfopts = "";
							for ( var j = 0; j < bfbets.length; j++ ) {
								var item = $(bfbets[j]).find("b").eq(0);
								sub_arr_dan.push(item.attr("play")+"-"+item.attr("type"));
								sub_bonus_arr_dan.push(item.html());
								bfopts += "bf-" + bfconversion[item.attr("type")] + "#" + item.text().replace(/,/g,"") + ","
							} 
							single.push(bfopts.substring(0,bfopts.length-1) + "D");
						}
						if ( zjqbets.length > 0 ) {
							var jqsopts = "";
							for ( var j = 0; j < zjqbets.length; j++ ) {
								var item = $(zjqbets[j]).find("b").eq(0);
								sub_arr_dan.push(item.attr("play")+"-"+item.attr("type"));
								sub_bonus_arr_dan.push(item.html());
								jqsopts += "jqs-" + item.attr("type") + "#" + item.text().replace(/,/g,"") + ","
							} 
							single.push(jqsopts.substring(0,jqsopts.length-1) + "D");
						}
						if ( bqcbets.length > 0 ) {
							var bqcopts="";
							for ( var j = 0; j < bqcbets.length; j++ ) {
								var item = $(bqcbets[j]).find("b").eq(0);
								sub_arr_dan.push(item.attr("play")+"-"+item.attr("type"));
								sub_bonus_arr_dan.push(item.html());
								bqcopts += "bqc-" + bqcconversion[item.attr("type")] + "#" + item.text().replace(/,/g,"") + ","
							} 
							single.push(bqcopts.substring(0,bqcopts.length-1) + "D");
						}
						
						_n_arr_dan.push(sub_arr_dan);
						_n_bonus_arr_dan.push(sub_bonus_arr_dan);
					} else {
						if ( spfbets.length > 0 ) {
							var spfopts = "";
							var nspfopts = "";
							for ( var j = 0; j < spfbets.length; j++ ) {
								var item = $(spfbets[j]);
								sub_arr_dan.push(item.attr("play")+"-"+item.attr("type"));
								sub_bonus_arr_dan.push(item.html());
								if($(spfbets[j]).attr("play") === "1"){
									spfopts += "spf-" + item.attr("type") + "@" + $(trs[i]).find("td:eq(13)").text() + "#" + item.text().replace(/,/g,"") + ","
								}else{
									nspfopts += "nspf-" + item.attr("type") + "#" + item.text().replace(/,/g,"") + ","
								}
							}
							if(spfopts != ""){
								single.push(spfopts.substring(0,spfopts.length-1));
							}
							if(nspfopts != ""){
								single.push(nspfopts.substring(0,nspfopts.length-1));
							}
						}
						if ( bfbets.length > 0 ) {
							var bfopts = "";
							for ( var j = 0; j < bfbets.length; j++ ) {
								var item = $(bfbets[j]).find("b").eq(0);
								sub_arr_dan.push(item.attr("play")+"-"+item.attr("type"));
								sub_bonus_arr_dan.push(item.html());
								bfopts += "bf-" + bfconversion[item.attr("type")] + "#" + item.text().replace(/,/g,"") + ","
							} 
							single.push(bfopts.substring(0,bfopts.length-1));
						}
						if ( zjqbets.length > 0 ) {
							var jqsopts = "";
							for ( var j = 0; j < zjqbets.length; j++ ) {
								var item = $(zjqbets[j]).find("b").eq(0);
								sub_arr_dan.push(item.attr("play")+"-"+item.attr("type"));
								sub_bonus_arr_dan.push(item.html());
								jqsopts += "jqs-" + item.attr("type") + "#" + item.text().replace(/,/g,"") + ","
							} 
							single.push(jqsopts.substring(0,jqsopts.length-1));
						}
						if ( bqcbets.length > 0 ) {
							var bqcopts = "";
							for ( var j = 0; j < bqcbets.length; j++ ) {
								var item = $(bqcbets[j]).find("b").eq(0);
								sub_arr_dan.push(item.attr("play")+"-"+item.attr("type"));
								sub_bonus_arr_dan.push(item.html());
								bqcopts += "bqc-" + bqcconversion[item.attr("type")] + "#" + item.text().replace(/,/g,"") + ","
							} 
							single.push(bqcopts.substring(0,bqcopts.length-1));
						}
						_n_arr.push(sub_arr_dan);
						_n_bonus_arr.push(sub_bonus_arr_dan);
					}
					highopts.push(single.join("|"));
				}
			}
		}
	} else {
		for ( var i = 0; i < schInfo.length; i++ ) {
			var spfbets = $(trs[i]).find("td[class='tdBg tdBgOn']");
			var bfbets = $(trs[i]).next().find("td[class='tdBg tdBgOn']");
			
			if ( spfbets.length > 0 || bfbets.length > 0  ) {
				var sub_arr_dan = new Array();
				var sub_bonus_arr_dan = new Array();
				if ( $(schInfo[i]).find("input[type=checkbox]").eq(1).attr("checked") ) {
					if ( spfbets.length > 0 ) {
						for ( var j = 0; j < spfbets.length; j++ ) {
							sub_arr_dan.push($(spfbets[j]).attr("play")+"-"+$(spfbets[j]).attr("type"));
							sub_bonus_arr_dan.push($(spfbets[j]).html());
						} 
						
					}
					if ( bfbets.length > 0 ) {
						for ( var j = 0; j < bfbets.length; j++ ) {
							sub_arr_dan.push($(bfbets[j]).find("b").eq(0).attr("play")+"-"+$(bfbets[j]).find("b").eq(0).attr("type"));
							sub_bonus_arr_dan.push($(bfbets[j]).find("b").eq(0).html());
						} 
						
					}
					
					_n_arr_dan.push(sub_arr_dan);
					_n_bonus_arr_dan.push(sub_bonus_arr_dan);
				} else {
					if ( spfbets.length > 0 ) {
						for ( var j = 0; j < spfbets.length; j++ ) {
							sub_arr_dan.push($(spfbets[j]).attr("play")+"-"+$(spfbets[j]).attr("type"));
							sub_bonus_arr_dan.push($(spfbets[j]).html());
						} 
					}
					if ( bfbets.length > 0 ) {
						for ( var j = 0; j < bfbets.length; j++ ) {
							sub_arr_dan.push($(bfbets[j]).find("b").eq(0).attr("play")+"-"+$(bfbets[j]).find("b").eq(0).attr("type"));
							sub_bonus_arr_dan.push($(bfbets[j]).find("b").eq(0).html());
						} 
					}
					
					_n_arr.push(sub_arr_dan);
					_n_bonus_arr.push(sub_bonus_arr_dan);
				}
				
			}
			
		}
	}
	
	betMap.put("nAr", _n_arr);
	betMap.put("nArDa", _n_arr_dan);
	betMap.put("nArBo", _n_bonus_arr);
	betMap.put("nArBoDa", _n_bonus_arr_dan);
	return betMap;
}

/**
 *	取得混串各种用于计算的数组 added at 2013/06/28
 */
function getHhBetInfo() {
	
	var _n_arr = new Array();	//	存放胜平负等（非胆）
	var _n_arr_dan = new Array();	// 存放胜平负等彩果（胆）
	
	var schInfo = $("#danMaList dd:visible");
	
	for ( var i = 0; i < schInfo.length; i++ ) {
		if ( $(schInfo[i]).find("input[type=checkbox]").eq(1).attr("checked") ) {
			var sub_arr_dan = new Array();
			
			var opt = $(schInfo[i]).find("em[play=1]:visible");
			
			var sub_arr1 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr1.push($(opt[j]).attr("odd"));
			} 		
			if ( opt.length > 0 ) {	// 让球胜平负玩法
				sub_arr_dan.push(sub_arr1);
			}
			
			opt = $(schInfo[i]).find("em[play=2]:visible");
			var sub_arr2 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr2.push($(opt[j]).attr("odd"));
			} 		
			if ( opt.length > 0 ) {	// 总进球玩法
				sub_arr_dan.push(sub_arr2);
			}
			
			opt = $(schInfo[i]).find("em[play=3]:visible");
			var sub_arr3 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr3.push($(opt[j]).attr("odd"));
			} 		
			if ( opt.length > 0 ) {	// 比分玩法
				sub_arr_dan.push(sub_arr3);
			}
			
			opt = $(schInfo[i]).find("em[play=4]:visible");
			var sub_arr4 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr4.push($(opt[j]).attr("odd"));
			} 		
			if ( opt.length > 0 ) {	// 半全场玩法
				sub_arr_dan.push(sub_arr4);
			}
			
			opt = $(schInfo[i]).find("em[play=6]:visible");
			var sub_arr6 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr6.push($(opt[j]).attr("odd"));
			} 		
			if ( opt.length > 0 ) {	// 比分玩法
				sub_arr_dan.push(sub_arr6);
			}
			
			_n_arr_dan.push(sub_arr_dan);
		} else {
			var sub_arr = new Array();
			
			var opt = $(schInfo[i]).find("em[play=1]:visible");
			var sub_arr1 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr1.push($(opt[j]).attr("odd"));
			} 		
			if ( opt.length > 0 ) {	// 让球胜平负玩法
				sub_arr.push(sub_arr1);
			}
			
			opt = $(schInfo[i]).find("em[play=2]:visible");
			var sub_arr2 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr2.push($(opt[j]).attr("odd"));
			} 		
			if ( opt.length > 0 ) {	// 总进球玩法
				sub_arr.push(sub_arr2);
			}
			
			opt = $(schInfo[i]).find("em[play=3]:visible");
			var sub_arr3 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr3.push($(opt[j]).attr("odd"));
			} 		
			if ( opt.length > 0 ) {	// 比分玩法
				sub_arr.push(sub_arr3);
			}
			
			opt = $(schInfo[i]).find("em[play=4]:visible");
			var sub_arr4 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr4.push($(opt[j]).attr("odd"));
			} 		
			if ( opt.length > 0 ) {	// 半全场玩法
				sub_arr.push(sub_arr4);
			}
			
			opt = $(schInfo[i]).find("em[play=6]:visible");
			var sub_arr6 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr6.push($(opt[j]).attr("odd"));
			} 		
			if ( opt.length > 0 ) {	// 比分玩法
				sub_arr.push(sub_arr6);
			}
			
			_n_arr.push(sub_arr);
		}
	}	
	
	var betMap = new HashTable();
	betMap.put("nAr", _n_arr);
	betMap.put("nArDa", _n_arr_dan);
	
	return betMap;
}

function getHhggBetInfo() {
	
	var _n_arr = new Array();	//	存放胜平负等（非胆）
	var _n_arr_dan = new Array();	// 存放胜平负等彩果（胆）
	
	var schInfo = $("#danMaList dd:visible");
	
	for ( var i = 0; i < schInfo.length; i++ ) {
		if ( $(schInfo[i]).find("input[type=checkbox]").eq(1).attr("checked") ) {
			var sub_arr_dan = new Array();
			
			var opt = $(schInfo[i]).find("em[play=1]:visible");
			
			var sub_arr1 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr1.push($(opt[j]).attr("type"));
			} 		
			if ( opt.length > 0 ) {	// 让球胜平负玩法
				sub_arr_dan.push(sub_arr1);
			}
			
			opt = $(schInfo[i]).find("em[play=2]:visible");
			var sub_arr2 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr2.push($(opt[j]).attr("type"));
			} 		
			if ( opt.length > 0 ) {	// 总进球玩法
				sub_arr_dan.push(sub_arr2);
			}
			
			opt = $(schInfo[i]).find("em[play=3]:visible");
			var sub_arr3 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr3.push($(opt[j]).attr("type"));
			} 		
			if ( opt.length > 0 ) {	// 比分玩法
				sub_arr_dan.push(sub_arr3);
			}
			
			opt = $(schInfo[i]).find("em[play=4]:visible");
			var sub_arr4 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr4.push($(opt[j]).attr("type"));
			} 		
			if ( opt.length > 0 ) {	// 半全场玩法
				sub_arr_dan.push(sub_arr4);
			}
			
			opt = $(schInfo[i]).find("em[play=6]:visible");
			var sub_arr6 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr6.push($(opt[j]).attr("type"));
			} 		
			if ( opt.length > 0 ) {	// 比分玩法
				sub_arr_dan.push(sub_arr6);
			}
			
			_n_arr_dan.push(sub_arr_dan);
		} else {
			var sub_arr = new Array();
			
			var opt = $(schInfo[i]).find("em[play=1]:visible");
			var sub_arr1 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr1.push($(opt[j]).attr("type"));
			} 		
			if ( opt.length > 0 ) {	// 让球胜平负玩法
				sub_arr.push(sub_arr1);
			}
			
			opt = $(schInfo[i]).find("em[play=2]:visible");
			var sub_arr2 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr2.push($(opt[j]).attr("type"));
			} 		
			if ( opt.length > 0 ) {	// 总进球玩法
				sub_arr.push(sub_arr2);
			}
			
			opt = $(schInfo[i]).find("em[play=3]:visible");
			var sub_arr3 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr3.push($(opt[j]).attr("type"));
			} 		
			if ( opt.length > 0 ) {	// 比分玩法
				sub_arr.push(sub_arr3);
			}
			
			opt = $(schInfo[i]).find("em[play=4]:visible");
			var sub_arr4 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr4.push($(opt[j]).attr("type"));
			} 		
			if ( opt.length > 0 ) {	// 半全场玩法
				sub_arr.push(sub_arr4);
			}
			
			opt = $(schInfo[i]).find("em[play=6]:visible");
			var sub_arr6 = new Array();
			for ( var j = 0; j < opt.length; j++ ) {
				sub_arr6.push($(opt[j]).attr("type"));
			} 		
			if ( opt.length > 0 ) {	// 比分玩法
				sub_arr.push(sub_arr6);
			}
			
			_n_arr.push(sub_arr);
		}
	}	
	
	var betMap = new HashTable();
	betMap.put("nAr", _n_arr);
	betMap.put("nArDa", _n_arr_dan);
	
	return betMap;
}

/**
 * 计算注数，金额、新界面调用，投注区位于底部 Added at 2013/08/18
 * @return
 */
function calcBetInfo2() {
	var betMap = getBetInfo2ZyGg();
	var _c_arr = betMap.get("cAr");
	if ( _c_arr.length == 0 ) {
		//$("#betSum").html("0");
		$("#jinE").html("0");
		$("#liLunJinE").html("0.00");
		return;
	}
	var _n_bonus_arr = betMap.get("nArBo");
	var _n_bonus_arr_dan = betMap.get("nArBoDa");
	var multiple = $("#beiTouId").val();
	if ( isNaN(multiple) ) {
		$("#beiTouId").val("1");
		multiple = 1;
	}
	
	var _n_arr = betMap.get("nAr");
	var _n_arr_dan = betMap.get("nArDa");
	
	var freeArray = new Array();
	var zhArray = new Array();
	var betNum = 0;
	for ( var i = 0; i < _c_arr.length; i++ ) {
		// 组合过关于自由过关分开计算
		
		if ( _c_arr[i].split("c")[1] == "1" ) {
			freeArray.push(_c_arr[i]);
		} else {
			zhArray.push(_c_arr[i]);
		}
		
	}
	
	if ( freeArray.length > 0 ) {
		betNum += calcBetNum(_n_arr, _n_arr_dan, freeArray);
	}
	var hhBetMap = {};
	if ( zhArray.length > 0 ) {	// 组合没有胆拖
		
		hhBetMap = getBetInfo2();
		var _n_arr = hhBetMap.get("nAr");
		
		//var _n_arr_dan = hhBetMap.get("nArDa");
		for ( var i = 0; i < zhArray.length; i++ ) {
			var calcZhArray = new Array();
			calcZhArray.push(zhArray[i]);
			if ( _n_arr.length  > parseInt(zhArray[i].split("c")[0]) ) {
				var splitArray = findJcComb(_n_arr, _n_arr.length, parseInt(zhArray[i].split("c")[0]));
				for ( var j = 0; j < splitArray.length; j++ ) {
					var perArray = findNmComb2(splitArray[j]);
					for ( var k = 0; k < perArray.length; k++ ) {
						betNum += calcBetNum(perArray[k], new Array(), calcZhArray);
					}
				}
			} else {
				var perArray = findNmComb2(_n_arr);
				for ( var k = 0; k < perArray.length; k++ ) {
					betNum += calcBetNum(perArray[k], new Array(), calcZhArray);
				}
			}
		}
	}
	//$("#betSum").html(betNum);
	$("#jinE").html(betNum * 2 * multiple);

	var freeArray = new Array();
	var zhArray = new Array();
	var betNum = 0;
	for ( var i = 0; i < _c_arr.length; i++ ) {
		// 组合过关于自由过关分开计算
		
		if ( _c_arr[i].split("c")[1] == "1" ) {
			freeArray.push(_c_arr[i]);
		} else {
			zhArray.push(_c_arr[i]);
		}
	}
	if(highopts.length > 0){
		var bb = cn87.algo.jc.getBonusRange(highopts,freeArray.concat(zhArray),false,multiple);
		$("#liLunJinE").html(bb[0]+"～"+bb[1]);
	}else{	
		var highestBonus = 0;
		var lowestBonus = 0;
		
		if ( freeArray.length > 0 ) {
			//hhBetMap = getBetInfo2ZyGg();
			highestBonus += parseFloat(calcBetHighestBonus(_n_bonus_arr, _n_bonus_arr_dan, freeArray, multiple));
			lowestBonus += parseFloat(calcBetLowestBonus(_n_bonus_arr, _n_bonus_arr_dan, freeArray, multiple));
		}
		
		if ( zhArray.length > 0 ) {	// 组合没有胆拖
			//hhBetMap = getBetInfo2();
			var _n_arr = hhBetMap.get("nArBo");
			var _n_arr_dan = hhBetMap.get("nArBoDa");
			var perArray = findNmComb2(_n_arr);
			
			var zhHighest = 0;
			var zhLowest = 0;
			if ( _n_arr_dan.length == 0 ) {
				for ( var i = 0; i < perArray.length; i++ ) {
					var tempHighest = parseFloat(calcBetHighestBonus(perArray[i], new Array(), zhArray, multiple));
					var tempLowest = parseFloat(calcBetLowestBonus(perArray[i], new Array(), zhArray, multiple));
					if(tempHighest > zhHighest){
						zhHighest = tempHighest;
					}
					if(tempLowest < zhLowest || zhLowest == 0){
						zhLowest = tempLowest;
					}
				}
			} else {
				var perArrayDan = findNmComb2(_n_arr_dan);
				for ( var i = 0; i < perArray.length; i++ ) {
					for ( var j = 0; j < perArrayDan.length; j++ ) {
						var tempHighest = parseFloat(calcBetHighestBonus(perArray[i], perArrayDan[j], zhArray, multiple));
						var tempLowest = parseFloat(calcBetLowestBonus(perArray[i], perArrayDan[j], zhArray, multiple));
						if(tempHighest > zhHighest){
							zhHighest = tempHighest;
						}
						if(tempLowest < zhLowest || zhLowest == 0){
							zhLowest = tempLowest;
						}
					}
				}
			}
			highestBonus += zhHighest;
			lowestBonus = lowestBonus > zhLowest || lowestBonus == 0?zhLowest:lowestBonus;
		}
		highestBonus = new Number(highestBonus).toFixed(2);
		lowestBonus = new Number(lowestBonus).toFixed(2);
		$("#liLunJinE").html(lowestBonus+"～"+highestBonus);
	}
	betMap = null;
	hhBetMap = null;
}

/*
 *	计算最高奖金
 */
function calcBetLowestBonus(_n_arr, _n_arr_dan, _c_arr, mul) {
	var betNum = 0.0;
	var freeArray = new Array();
	for ( var i = 0; i < _c_arr.length; i++ ) {
		var pLen = parseInt(_c_arr[i].split("c")[1]);
		var cLen = parseInt(_c_arr[i].split("c")[0]);
		if ( pLen > 1 ) {	//	组合过关
			var __c_arr = combCrMap.get(_c_arr[i]);
			freeArray.push(__c_arr[__c_arr.length-1]);
			
		} else {
			freeArray.push(_c_arr[i]);
		}
	}
	
	if ( freeArray.length > 0 ) {
		var calcArray = new Array();
		var _calcArray = new Array();
		var len = parseInt(freeArray[0].split("c")[0]) - 1;
		var counter = 0;
		var calcArrayDan = new Array();
		for ( var i = 0; i < _n_arr_dan.length; i++ ) {
			_n_arr_dan[i].sort(compare);
			calcArrayDan.push(_n_arr_dan[i][_n_arr_dan[i].length-1]);
			counter++;
		}
		for ( var i = 0; i < _n_arr.length; i++ ) {
			_n_arr[i].sort(compare);
			_calcArray.push(_n_arr[i][_n_arr[i].length-1]);
		}
		_calcArray.sort();
		for ( var i = 0; i < _calcArray.length; i++ ) {
			calcArray.push(_calcArray[i]);
			if ( counter == len ) {
				break;
			}
			counter++;
		}
		
		var nfreeArray = new Array();
		nfreeArray.push(freeArray[0]);
		betNum += parseFloat(calcHighestBonus2(calcArray, calcArrayDan, nfreeArray, mul));
	}
	var bns = new Number(betNum);
	return bns.toFixed(2);	/** 保留两个小数位 */
}


/**
 * 计算注数/金额/最高奖金等
 */

function calcBetInfo() {
		
	var ggFlag = $("#tagType").val();
	if ( ggFlag == "g" ) { // 过关
		var betMap = getBetInfo();
		var _c_arr = betMap.get("cAr");
		var _n_bonus_arr = betMap.get("nArBo");
		var _n_bonus_arr_dan = betMap.get("nArBoDa");
		var multiple = $("#beiTou").val();
		if ( isNaN(multiple) ) {
			$("#beiTou").val("1");
			multiple = 1;
		}
		
		var _n_arr = betMap.get("nAr");
		var _n_arr_dan = betMap.get("nArDa");
		
		if ( $("#subPlayId").val() == 5 ) {
			var freeArray = new Array();
			var zhArray = new Array();
			var betNum = 0;
			for ( var i = 0; i < _c_arr.length; i++ ) {
				// 组合过关于自由过关分开计算
				
				if ( _c_arr[i].split("c")[1] == "1" ) {
					freeArray.push(_c_arr[i]);
				} else {
					zhArray.push(_c_arr[i]);
				}
				
			}
			
			if ( freeArray.length > 0 ) {
				betNum += calcBetNum(_n_arr, _n_arr_dan, freeArray);
			}
			if ( zhArray.length > 0 ) {	// 组合没有胆拖
				
				var hhBetMap = getHhggBetInfo();
				var _n_arr = hhBetMap.get("nAr");
				
				//var _n_arr_dan = hhBetMap.get("nArDa");
				for ( var i = 0; i < zhArray.length; i++ ) {
					var calcZhArray = new Array();
					calcZhArray.push(zhArray[i]);
					if ( _n_arr.length  > parseInt(zhArray[i].split("c")[0]) ) {
						var splitArray = findJcComb(_n_arr, _n_arr.length, parseInt(zhArray[i].split("c")[0]));
						for ( var j = 0; j < splitArray.length; j++ ) {
							var perArray = findNmComb2(splitArray[j]);
							for ( var k = 0; k < perArray.length; k++ ) {
								betNum += calcBetNum(perArray[k], new Array(), calcZhArray);
							}
						}
					} else {
						var perArray = findNmComb2(_n_arr);
						for ( var k = 0; k < perArray.length; k++ ) {
							betNum += calcBetNum(perArray[k], new Array(), calcZhArray);
						}
					}
				}
			}
			$("#betSum").html(betNum);
			$("#jinE").html(betNum * 2 * multiple);
		} else {
			var betNum = calcBetNum(_n_arr, _n_arr_dan, _c_arr);
			$("#betSum").html(betNum);
			$("#jinE").html(betNum * 2 * multiple);
		}
		
		//jinE = betNum * 2 * multiple;
//		if ( $("#subPlayId").val() == 5 ) {	// 混合串奖金需要特别处理
//			var hhBetMap = getHhBetInfo();
//			var _n_arr = hhBetMap.get("nAr");
//			var _n_arr_dan = hhBetMap.get("nArDa");
//			var perArray = findNmComb2(_n_arr);
//			var highestBonus = 0;
//			if ( _n_arr_dan.length == 0 ) {
//				for ( var i = 0; i < perArray.length; i++ ) {
//					highestBonus += parseFloat(calcBetHighestBonus(perArray[i], new Array(), _c_arr, multiple));
//				}
//			} else {
//				var perArrayDan = findNmComb2(_n_arr_dan);
//				for ( var i = 0; i < perArray.length; i++ ) {
//					for ( var j = 0; j < perArrayDan.length; j++ ) {
//						highestBonus += parseFloat(calcBetHighestBonus(perArray[i], perArrayDan[j], _c_arr, multiple));
//					}
//				}
//			}
//			highestBonus = new Number(highestBonus).toFixed(2);
//			$("#liLunJinE").html(highestBonus);
//		} else {
//			var highestBonus = calcBetHighestBonus(_n_bonus_arr, _n_bonus_arr_dan, _c_arr, multiple);
//			$("#liLunJinE").html(highestBonus);
//		}
		var bb = cn87.algo.jc.getBonusRange(highopts,_c_arr,true,multiple);
		$("#liLunJinE").html(bb[1]);
	} else {
		var schInfo = $("#danMaList dd:visible");
		$("#changCiNum").html(schInfo.length);
		var betNum = 0;
		for ( var i = 0; i < schInfo.length; i++ ) {
			var opt = $(schInfo[i]).find("em:visible");
			for ( var j = 0; j < opt.length; j++ ) {
				betNum++;
			} 		
		
		}	
		$("#betSum").html(betNum);
		var multiple = $("#beiTou").val();
		if ( isNaN(multiple) ) {
			$("#beiTou").val("1");
			multiple = 1;
		}
		$("#jinE").html(betNum * 2 * multiple);
		
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
    	
    	$("#liLunJinE").html((highestValue*Number(multiple)).toFixed(2));
	}
}

function findNmComb2( ops ) {
	var result = new Array();
	for ( var i = 0; i < ops[0].length; i++ ) {
		var _tArr = new Array();
		_tArr.push(ops[0][i]);
		findSubNmComb2( result, _tArr, ops, ops.length-1 );
	}
	return result;
}
function findSubNmComb2( result, tArr, ops, n ) {
	if ( n == 0 ) {
		result.push(tArr);
	} else {
		for ( var i = 0; i < ops[ops.length-n].length; i++ ) {
			var _tArr = new Array();
			for ( var j = 0; j < tArr.length; j++ ) {
				_tArr.push(tArr[j]);
			}
			_tArr.push(ops[ops.length-n][i]);
			findSubNmComb2( result, _tArr, ops, n-1 );
		}
	}
}

/*
 *	计算最高奖金
 */
function calcBetHighestBonus(_n_arr, _n_arr_dan, _c_arr, mul) {
	var betNum = 0.0;
	var freeArray = new Array();
	for ( var i = 0; i < _c_arr.length; i++ ) {
		var pLen = parseInt(_c_arr[i].split("c")[1]);
		var cLen = parseInt(_c_arr[i].split("c")[0]);
		if ( pLen > 1 ) {	//	组合过关
			if ( cLen < (_n_arr.length + _n_arr_dan.length) ) {
				var tuoArray = findJcComb(_n_arr, _n_arr.length, cLen - _n_arr_dan.length);
				
				for ( var j = 0; j < tuoArray.length; j++ ) {
					var calcArray = new Array();
					for ( var K = 0; K < _n_arr_dan.length; K++ ) {
						_n_arr_dan[K].sort(compare);
						calcArray.push(_n_arr_dan[K][0]);
					}
					for ( var k = 0; k < tuoArray[j].length; k++ ) {
						tuoArray[j][k].sort(compare);
						calcArray.push(tuoArray[j][k][0]);
					}
					betNum += parseFloat(calcCombCrHighestBonus(calcArray, _c_arr[i], mul));
					
				}
			} else {
				var calcArray = new Array();
				for ( var K = 0; K < _n_arr_dan.length; K++ ) {					
					_n_arr_dan[K].sort(compare);					
					calcArray.push(_n_arr_dan[K][0]);					
				}
				for ( var k = 0; k < _n_arr.length; k++ ) {
					_n_arr[k].sort(compare);
					calcArray.push(_n_arr[k][0]);
				}
				betNum += parseFloat(calcCombCrHighestBonus(calcArray, _c_arr[i], mul));
			}
		} else {
			freeArray.push(_c_arr[i]);
		}
	}
	
	if ( freeArray.length > 0 ) {
		var calcArray = new Array();
		for ( var i = 0; i < _n_arr.length; i++ ) {
			_n_arr[i].sort(compare);
			calcArray.push(_n_arr[i][0]);
		}
		var calcArrayDan = new Array();
		for ( var i = 0; i < _n_arr_dan.length; i++ ) {
			_n_arr_dan[i].sort(compare);
			calcArrayDan.push(_n_arr_dan[i][0]);
		}
		
		betNum += parseFloat(calcHighestBonus2(calcArray, calcArrayDan, freeArray, mul));
	}
	var bns = new Number(betNum);
	return bns.toFixed(2);	/** 保留两个小数位 */
}

function calcBetNum(_n_arr, _n_arr_dan, _c_arr) {
	var betNum = 0;
	var freeArray = new Array();
	for ( var i = 0; i < _c_arr.length; i++ ) {
		var pLen = parseInt(_c_arr[i].split("c")[1]);
		var cLen = parseInt(_c_arr[i].split("c")[0]);
		if ( pLen > 1 ) {	//	组合过关
			if ( cLen < (_n_arr.length + _n_arr_dan.length) ) {
				var tuoArray = findJcComb(_n_arr, _n_arr.length, cLen - _n_arr_dan.length);
				
				for ( var j = 0; j < tuoArray.length; j++ ) {
					var calcArray = new Array();
					for ( var K = 0; K < _n_arr_dan.length; K++ ) {
						calcArray.push(_n_arr_dan[K]);
					}
					for ( var k = 0; k < tuoArray[j].length; k++ ) {
						calcArray.push(tuoArray[j][k]);
					}
					betNum += calcCombCrBetSum(_c_arr[i], calcArray);
				}
			} else {
				var calcArray = new Array();
				for ( var K = 0; K < _n_arr_dan.length; K++ ) {
					calcArray.push(_n_arr_dan[K]);
				}
				for ( var k = 0; k < _n_arr.length; k++ ) {
					calcArray.push(_n_arr[k]);
				}
				betNum += calcCombCrBetSum(_c_arr[i], calcArray);
			}
		} else {
			freeArray.push(_c_arr[i]);
		}
	}
	/* 计算自由过关 */
	betNum += calcBetSum2(_n_arr, _n_arr_dan, freeArray);
	return betNum;
}

/**
 *	过关选中触发注数计算事件
 */
function ggWinedEvent() {
	$("#zhChuanBox input[type=checkbox]").click(function() {
		// 组合过关不允许定胆
		$("#zyChuanBox input[type=checkbox]").removeAttr("disabled");
		if ( $(this).attr("checked") ) {
			var dans = $("#danMaList").find("input[type=checkbox]");
			
			for ( var i = 1; i < dans.length; i = i + 2 ) {
				$(dans[i]).removeAttr("checked");
				$(dans[i]).removeAttr("disabled");
			}
		}
		calcBetInfo();
	});
	$("#zyChuanBox input[type=checkbox]").click(function() {
		changeDanStyle();
		calcBetInfo();
	});
}

function formSubmitEvent() {
	$("#btnSubmitId").click(function() {
		
		/**
		 * 加载彩种提交专用登录
		 */
//		lotterySubmitLogin();
		
		/** by:guoxiaosheng 2013/10/11 合买标识**/
		if( $("#confirm_hm_state").length > 0 ){
			$("#confirm_hm_state").remove();
		}
		
		var lotteryBuyForm = $("#lotteryBuyForm");
		
		//20130612
		if($.trim($("#beiTou").val())=="" || $.trim($("#beiTou").val())<=0){
		   openMessage("您好，倍投输入不正确！");
		   return false;
		
		}
		if ( $("#betSum").html() == "0" ) {
			openMessage("您好，请选择正确赛程投注！");
			return false;
		}
		
		/* 让球不投注 */
		/*if( $("#subPlayId").val() == "1"  ) {
			if ( $("#brqFlagId").length > 0 ) {
				if ( $("#tagType").val() == "d" ) {
					alert("暂不支持单关投注！");
					return false;
				}
			} else {
				alert("让球暂停投注！");
				return false;
			}
		}
		
		if( $("#subPlayId").val() == "5"  ) {
			alert("混合暂停投注！");
			return false;
		}*/
		
		
		var schInfo = $("#danMaList dd:visible");
		if ( $("#subPlayId").val() == "5"  ) {
			/* 单一玩法识别 */
			var discount = 1;
			var disc = $(schInfo[0]).find("em:visible").eq(0).attr("play");
			for ( var i = 1; i < schInfo.length; i++ ) {
				var pSchInfo = $(schInfo[i]).attr("issueweek") + ":";
				if ( $(schInfo[i]).find("em:visible").eq(0).attr("play") != disc ) {
					discount++;
				}
			}
			/*if ( discount == 1 ) {
				alert("投注号码不是混合串！");
				return false;
			}*/
		}
		
		lotteryBuyForm.find("input[name=mult]").val($("#beiTou").val());
		lotteryBuyForm.find("input[name=betNum]").val($("#betSum").html());
		lotteryBuyForm.find("input[name=betPrice]").val($("#jinE").html());
		lotteryBuyForm.find("input[name=systemId]").val($("#subPlayId").val());
		//lotteryBuyForm.find("input[name=licenseId]").val(227);
		
		
		if ( $("#subPlayId").val() == "5" ) {
			//$(" <input type='hidden' name='poolId' id='poolDescId' value='1'/>").appendTo($(lotteryBuyForm));
			lotteryBuyForm.find("input[name=poolId]").val(1);
		} else if ( $("#subPlayId").val() == "6" ) {
			lotteryBuyForm.find("input[name=poolId]").val(7);
		} else {
			lotteryBuyForm.find("input[name=poolId]").val($("#subPlayId").val());
		}
		
		
		lotteryBuyForm.find("input[name=gameId]").val($("#licenseId").val());
		
		lotteryBuyForm.find("input[name=singleOrMult]").val(0);
		
		var ptTypes = "";
		var ggFlag = $("#tagType").val();
		if ( ggFlag == "g" ) {	// 过关
			var freeBox = $("#zyChuanBox input[type=checkbox]:checked:visible");
			for ( var i = 0; i < freeBox.length; i++ ) {
				ptTypes += $(freeBox[i]).val() + ",";
			}			
			var combBox = $("#zhChuanBox input[type=checkbox]:checked:visible");
			for ( var i = 0; i < combBox.length; i++ ) {
				ptTypes += $(combBox[i]).val() + ",";
			}
			ptTypes = ptTypes.substring(0, ptTypes.length - 1);
		} else {
			ptTypes = "1c1";	// 单关
		}
		lotteryBuyForm.find("input[name=betDetailDesc]").val(ptTypes);
		
		
		var betCodes = "";
		
		/* Added for 让球、让分、预设总分及其赔率往后台送，格式：20130613001:2.5@3.0  at 2013/06/13 */
		var rqOrRf = "";
		var oddDesc = "";
		
		var danLen = 0;
		for ( var i = 0; i < schInfo.length; i++ ) {
			/* Modified for 大小分预设总分获取 at 2013/08/06 begin */
			if ( $("#subPlayId").val() == "5" && $("#licenseId").val() == "228" ) {
				var opt = $(schInfo[i]).find("em:visible");
				var rqFlag = 0;
				for ( var j = 0; j < opt.length; j++ ) {
					if ( $(opt[j]).attr("play") == "2" ) {
						rqFlag++;
					}
				}
				if ( rqFlag > 0 ) {
					rqOrRf += $(schInfo[i]).attr("issueweek") + ":" + $(schInfo[i]).attr("rq") + "|";
				} else {
					rqOrRf += $(schInfo[i]).attr("issueweek") + ":" + $(schInfo[i]).attr("yszf") + "|";
				}
			} else {
				rqOrRf += $(schInfo[i]).attr("issueweek") + ":" + $(schInfo[i]).attr("rq") + "|";
			}
			/* Modified for 大小分预设总分获取 at 2013/08/06 end */
			var pSchInfo = $(schInfo[i]).attr("issueweek") + ":";
			var opt = $(schInfo[i]).find("em:visible");
			
			var _oddDesc = $(schInfo[i]).attr("issueweek") + ":"
			for ( var j = 0; j < opt.length; j++ ) {
				/** Modified by Lixiaojun for 赔率超过3位时替换,号为空 at 2013/09/29 begin*/
//				_oddDesc += $(opt[j]).attr("odd") + "@";
				_oddDesc += $(opt[j]).attr("odd").replace(",","") + "@";
				/** Modified by Lixiaojun for 赔率超过3位时替换,号为空 at 2013/09/29 end*/
				
				// Modified for 混合过关
				if ( $("#subPlayId").val() == "5" ) {
					if ( ($(opt[j]).attr("play") == "1" || $(opt[j]).attr("play") == "2") &&  $(opt[j]).attr("type") == "3" && $("#licenseId").val() == "228" ) {
						pSchInfo += $(opt[j]).attr("play") + "-1"+",";
					} else {
						pSchInfo += $(opt[j]).attr("play") + "-" + $(opt[j]).attr("type")+",";
					}
				} else {
					// 胜负与让分胜负需要转换
					if ( $("#licenseId").val() == "228" && ($("#subPlayId").val() == "1" || $("#subPlayId").val() == "2") ) {
						if ( $(opt[j]).attr("type") == "3" ) {
							pSchInfo += "1,";
						} else {
							pSchInfo += $(opt[j]).attr("type") + ",";
						}
					} else {
						pSchInfo += $(opt[j]).attr("type") + ",";
					}
				}
			} 
			_oddDesc = _oddDesc.substring(0, _oddDesc.length - 1);
			pSchInfo = pSchInfo.substring(0, pSchInfo.length - 1);
			if ( $(schInfo[i]).find("input[type=checkbox]").eq(1).attr("checked") ) {
				pSchInfo += ":2";
				danLen++;
			} else {
				pSchInfo += ":1";	
			}
			oddDesc += _oddDesc + "|";
			betCodes += pSchInfo + "|";
		}	
		oddDesc = oddDesc.substring(0, oddDesc.length - 1);
		rqOrRf = rqOrRf.substring(0, rqOrRf.length - 1);
		lotteryBuyForm.find("input[name=oddsDesc]").val(oddDesc);
		lotteryBuyForm.find("input[name=rqDesc]").val(rqOrRf);
		if ( danLen == 0 ) {
			betCodes = "";
			for ( var i = 0; i < schInfo.length; i++ ) {
				var pSchInfo = $(schInfo[i]).attr("issueweek") + ":";
				var opt = $(schInfo[i]).find("em:visible");
				for ( var j = 0; j < opt.length; j++ ) {
					// Modified for 混合过关
					if ( $("#subPlayId").val() == "5" ) {
						if ( ($(opt[j]).attr("play") == "1" || $(opt[j]).attr("play") == "2") &&  $(opt[j]).attr("type") == "3" && $("#licenseId").val() == "228" ) {
							pSchInfo += $(opt[j]).attr("play") + "-1"+",";
						} else {
							pSchInfo += $(opt[j]).attr("play") + "-" + $(opt[j]).attr("type")+",";
						}
					} else {
						// 胜负与让分胜负需要转换
						if ( $("#licenseId").val() == "228" && ($("#subPlayId").val() == "1" || $("#subPlayId").val() == "2") ) {
							if ( $(opt[j]).attr("type") == "3" ) {
								pSchInfo += "1,";
							} else {
								pSchInfo += $(opt[j]).attr("type") + ",";
							}
						} else {
							pSchInfo += $(opt[j]).attr("type") + ",";
						}
					}
				} 
				pSchInfo = pSchInfo.substring(0, pSchInfo.length - 1) + ":0";			
				betCodes += pSchInfo + "|";
			}	
		}
		betCodes = betCodes.substring(0, betCodes.length - 1);
		lotteryBuyForm.find("input[name=betCodes]").val(betCodes);
		
		var betName = "";
		if ( $("#licenseId").val() == "227" ) {
			betName += "竞彩足球";
			var ptl = $("#subPlayId").val();
			switch (ptl) {
			case "1":
				betName += "让球胜平负";
				break;
			case "2":
				betName += "总进球";
				break;
			case "3":
				betName += "比分";
				break;
			case "4":
				betName += "半全场";
				break;
			case "5":
				betName += "混合串";
				break;
			case "6":
				betName += "胜平负";
				break;
			}
		} else {
			betName += "竞彩篮球";
			var ptl = $("#subPlayId").val();
			switch (ptl) {
			case "1":
				betName += "胜负";
				break;
			case "2":
				betName += "让分胜负";
				break;
			case "3":
				betName += "胜分差";
				break;
			case "4":
				betName += "大小分";
				break;
			case "5":
				betName += "混合串";
				break;
			}
		}
		betName += "("+ptTypes.replaceAll("c", "串")+")";
		lotteryBuyForm.find("input[name=systemTypeDesc]").val(betName);
		
		
		if($("#agree").is(":checked") ){
			lotteryFormSubmit();
		} else{
			alert("您好，请阅读条款，并同意！");
			return false;
		}
			
		
	});
}

String.prototype.replaceAll  = function(s1,s2){
	return this.replace(new RegExp(s1,"gm"),s2);
}

function gotoFilterEvent() {
	$("#filterBtnId").click(function() {
		var schInfo = $("#danMaList dd:visible");
		if ( schInfo.length == 0 ) {
			alert("请先选择对阵！");
			return false;
		}
		var schDesc = "[";
		for ( var i = 0; i < schInfo.length; i++ ) {
			var sch = $(schInfo[i]).children().eq(0).children().eq(0).html();
			
			schDesc += "{sname:'"+sch.substring(sch.indexOf('>')+1)+"',";
			schDesc += "holn:'"+ $(schInfo[i]).children().eq(0).children().eq(1).html()+"',";
			var opt = $(schInfo[i]).find("em");
			var pSchInfo = "";
			for ( var j = 0; j < opt.length; j++ ) {
				pSchInfo += $(opt[j]).attr("odd") + "-";
			} 
			schDesc += "odds:'"+pSchInfo.substring(0,pSchInfo.length-1)+"',";
			opt = $(schInfo[i]).find("em:visible");
			pSchInfo = "";
			for ( var j = 0; j < opt.length; j++ ) {
				if ( $("#subPlayId").val() == "5" ) {
					pSchInfo += $(opt[j]).attr("play") + "-" + $(opt[j]).attr("type") + ",";
				} else {
					pSchInfo += $(opt[j]).attr("type") + "-";
				}
			} 
			schDesc += "opt:'"+pSchInfo.substring(0,pSchInfo.length-1)+"',";
			schDesc += "schid:'"+$(schInfo[i]).attr("issueweek")+"',rq:'"+$(schInfo[i]).attr("rq")+"'},";
		}	
		schDesc = schDesc.substring(0, schDesc.length-1);
		schDesc += "]";

		var subType = $("#subPlayId").val();
		
		var url = "/lottery/jczq/filter.jhtml";
		var licenseId = $("#licenseId").val();
		if ( licenseId == "227" ) {
			
		} else {
			url = "/lottery/jclq/filter.jhtml";
		}
	
		$("#filterFormId").remove();
		$("<form id='filterFormId' action='"+url+"' method='post' target='_blank'>" +
				"<input type='hidden' name='subType' value='"+subType+"'>" +
				"<input type='hidden' name='schDesc' value=\""+schDesc+"\">" +
				"</form>").appendTo($("body"));
		
		//alert($("#filterFormId").html());
		$("#filterFormId").submit();
	});
}
