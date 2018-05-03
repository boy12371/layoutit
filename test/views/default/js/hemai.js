/**
 * <p>Desc:合买js</p>
 * <p>Author: zhanghaibin</p>
 * <p>Copyright: Copyright (c) 2013</p> 
 * <p>Company: 北京九彩科技有限公司</p>
 * Midified by Luochang at 2013/05/22 for 事件调整，表单提交
 */

$(document).ready(function() {
	// init prompt ,defalut hide
	fqhmPrompt();
	
	/** Added by Luochang for 合买初始化事件 at 2013/05/22 */
	initEvent();
	
//	hmFormSubmitEvent();
	
//	lotterySubmitLogin();
	
//	// 切换tab页
//	$(".hm_list ul li").each(function () {  
//		curLi=$(this);
//		intervalID=setInterval(onMouseOver,250);//鼠标移入的时候有一定的延时才会切换到所在项，防止用户不经意的操作
//        $(this).click(function () {  
//        	$("li").removeClass("sele");
//        	$(this).addClass("sele");
//        	var obj = $(this).attr("bindTab");
//        	if (obj == "dqfa") {
//        		$("table[name='dqfaTab'])").show();
//        		$("table:not(table[name='dqfaTab'])").hide();
//        		$("#dzgdDiv").hide();
//        	} else if (obj == "dzgd") {
//        		$("table[name='dzgdTab']").show();
//        		$("table:not(table[name='dzgdTab'])").hide();
//        	}
//        });  
//    });  
//    
//	function onMouseOver(){
//		$("li").removeClass("cur-sub-con");
//		$(".sub-con").eq($(".nav li a").index(curLi)).addClass("cur-sub-con");
//		$(".cur").removeClass("cur");
//		curLi.addClass("cur");
//	}
//	
//    $("#dzgdBtn").click(function() {
//    	var obj = $(this).parent().parent().next();
//    	obj.show();
//    	obj.find("td").html($("#dzgdDiv").html());
//    });

	
});

/* 表单提交事件 */
function hmFormSubmitEvent() {

		if( $("#agree").length > 0 ){
			if ( !$("#agree").is(":checked") ) {
				alert("请同意购彩交易须知！");
				return false;
			}
		}
		if ( $("#betSum").html() == "0" ) {
			openMessage("您好，请选择正确赛程投注！");
			return false;
		}
		if ( notNullVilidate($("#hemaititle")) || notNullVilidate($("#sharenumber")) || notNullVilidate($("#buynumber")) || notNullVilidate($("#baodinumber"))) {
			alert("请输入完整合买信息！");
			return false;
		}
		/* 登录判断 */
		if ( $("#jcFilterHemaiFlagId").val() == "1" ) {
			
		} else if ( $("#currAmount").length < 1 ) {
			loginPop();
			lotterySubmitLogin();
			return false;
		}
		
		var errorShareInfo = $("#ErrorShareInfo").html().replace(/\s+/g,"");
		var errorBuyInfo = $("#ErrorBuyInfo").html().replace(/\s+/g,"");
		var errorBaodiInfo = $("#ErrorBaodiInfo").html().replace(/\s+/g,"");
		// 根据错误信息判断认购是否能发起合买
		if(errorShareInfo) {
			alert($("#ErrorShareInfo").html());
			return false;
		}
		if(errorBuyInfo) {
			alert($("#ErrorBuyInfo").html());
			return false;
		}
		if(errorBaodiInfo) {
			alert($("#ErrorBaodiInfo").html());
			$("#ErrorBaodiInfo").html("");
			return false;
		}
		if( $("#hemaiFormId").length > 0 ){
			$("#hemaiFormId").remove();
		}
		var hemaiForm = $("<form action='/hemai/launch.jhtml' method='post' id='hemaiFormId' target='_blank'></form>");
		/*用户昵称*/
		$("<input type='hidden' name='membername' value='"+$("#numberUsernaeme").val()+"'>").appendTo($(hemaiForm));
		/* 方案标题 */
		$("<input type='hidden' name='hemaititle' value='"+$("#hemaititle").val()+"'>").appendTo($(hemaiForm));
		/* 方案描述 */
		$("<input type='hidden' name='hemaidesc' value='"+$("#hemaidesc").val()+"'>").appendTo($(hemaiForm));
		/* 合买方式:子玩法类别 */
		$("<input type='hidden' name='hemaitype' value='"+$("#subPlayId").val()+"'>").appendTo($(hemaiForm));
		/* 总金额 */
		$("<input type='hidden' name='allmoney' value="+new Number(parseFloat($("#sharePrice").html() * $("#sharenumber").val()).toFixed(2))+">").appendTo($(hemaiForm));
		/* 合买详细号码 */
		if ( $("#jcFilterHemaiFlagId").val() == "1" ) { // 过滤单
			var betCodes = "";
			var multDesc = "";
			
			if ( $("#subPlayId").val() == "5" ) {
				for ( var i = 0; i < singArray.length; i++ ) {
					//var _bcode = toStdString(singArray[i]);
					betCodes += toBetString(singArray[i]) + "|";
				}
			}
			else if ( $("#licenseDescId").val() == "228" && ($("#subPlayId").val() == "1" || $("#subPlayId").val() == "2") ) {
				for ( var i = 0; i < singArray.length; i++ ) {
					var _bcode = toStdString(singArray[i]);
					betCodes += toBetString(_bcode) + ",";
				}
			} else {
				for ( var i = 0; i < singArray.length; i++ ) {
					if ( $("#licenseDescId").val() == "227" && $("#subPlayId").val() == "4" ) {//半全场改动
						var code = toStdString(singArray[i]).split("");
						for ( var j = 0; j < code.length; j=j+2) {
							betCodes += toBetCode(code[j]+code[j+1]);
						}
						betCodes += ",";
					} else {
						betCodes += toStdString(singArray[i]) + ",";
					}
				}
			}
			if ( $("#bonusFixedBtnId").is(":checked") || $("#subPlayId").val() == "5") {
				for ( var i = 0; i < multArray.length; i++ ) {
					multDesc += multArray[i] + ",";
				}
			} else {
				var multiple = $("#totalMultipleId").val();
				if ( isNaN(multiple) ) {
					$("#totalMultipleId").val("1");
					multiple = 1;
				}
				for ( var i = 0; i < singArray.length; i++ ) {
					multDesc += multiple + ",";
				}
			}
			
			multDesc = multDesc.substring(0, multDesc.length - 1);
			/* 倍数 */
			$("<input type='hidden' name='hemaimult' value=-1>").appendTo($(hemaiForm));
			$("<input type='hidden' name='successdesc' value='"+multDesc+"'>").appendTo($(hemaiForm));
			betCodes = betCodes.substring(0, betCodes.length - 1);
			$("<input type='hidden' name='hemaidetail' value="+betCodes+">").appendTo($(hemaiForm));
			/* 彩种 */
			$("<input type='hidden' name='licenseId' value="+$("#licenseDescId").val()+">").appendTo($(hemaiForm));
			$("<input type='hidden' name='eventId' value="+$("#licenseDescId").val()+">").appendTo($(hemaiForm));
			
			var schInfo = "";
			var strs = $("#schInfoId").children();
			
			if ( $("#subPlayId").val() == "5") {
				for ( var i = 0; i < strs.length; i=i+2 ) {
					schInfo += $(strs[i]).attr("schid")+",";
				}
			} else {
				for ( var i = 0; i < strs.length; i++ ) {
					schInfo += $(strs[i]).attr("schid")+",";
				}
			}
			schInfo = schInfo.substring(0, schInfo.length - 1);
			
			$("<input type='hidden' name='paydesc' value="+schInfo+">").appendTo($(hemaiForm));
		}else if ( $("#fromToId").length > 0 ) {
			var betCodes = "";
			var multDesc = "";
			
			var trs = $("#pBetAreaId").find("tr");
			var betNum = 0;
			for ( var i = 0; i < trs.length; i++ ) {
				if ( $("#subPlayId").val() == "5" ) {
					betCodes += $(trs[i]).attr("code") + "|";
				} else {
					betCodes += $(trs[i]).attr("code") + ",";
				}
				if ( parseInt($(trs[i]).find("td[name=betNum]").eq(0).html()) < 1 ) {
					alert("存在倍数为负数，请调整优化单！");
					return false;
				}
				multDesc += $(trs[i]).find("td[name=betNum]").eq(0).html()+",";
				betNum += parseInt($(trs[i]).find("td[name=betNum]").eq(0).html());
			}
			
			multDesc = multDesc.substring(0, multDesc.length - 1);
			/* 倍数 */
			$("<input type='hidden' name='hemaimult' value=-1>").appendTo($(hemaiForm));
			$("<input type='hidden' name='successdesc' value='"+multDesc+"'>").appendTo($(hemaiForm));
			betCodes = betCodes.substring(0, betCodes.length - 1);
			$("<input type='hidden' name='hemaidetail' value="+betCodes+">").appendTo($(hemaiForm));
			/* 彩种 */
			$("<input type='hidden' name='licenseId' value="+$("#licenseDescId").val()+">").appendTo($(hemaiForm));
			$("<input type='hidden' name='eventId' value="+$("#licenseDescId").val()+">").appendTo($(hemaiForm));
			
			var schInfo = "";
			var strs = $("#schInfoId").children();
			if ( $("#licenseDescId").val() == "228" && $("#subPlayId").val() != "5" ) {
				strs = $("#lqschInfoId").children();
			}
			for ( var i = 0; i < strs.length; i++ ) {
				schInfo += $(strs[i]).attr("schid")+",";
			}
			schInfo = schInfo.substring(0, schInfo.length - 1);
			
			$("<input type='hidden' name='paydesc' value="+schInfo+">").appendTo($(hemaiForm));
		} else {
			/* 倍数 */
			if ( $("#subPlayId").val() == "5"  ) {
				$("<input type='hidden' name='hemaimult' value="+$("#beiTouId").val()+">").appendTo($(hemaiForm));
				$("<input type='hidden' name='hemaidetail' value="+getBetCodes()+">").appendTo($(hemaiForm));
			} else {
				$("<input type='hidden' name='hemaimult' value="+$("#beiTou").val()+">").appendTo($(hemaiForm));
				$("<input type='hidden' name='hemaidetail' value="+hemaidetail+">").appendTo($(hemaiForm));
			}
			/* 彩种 */
			$("<input type='hidden' name='licenseId' value="+$("#licenseId").val()+">").appendTo($(hemaiForm));
			$("<input type='hidden' name='eventId' value="+$("#licenseId").val()+">").appendTo($(hemaiForm));
		}
		/* 份数 */
		$("<input type='hidden' name='sharenumber' value="+$("#sharenumber").val()+">").appendTo($(hemaiForm));
		/* 保底份数 */
		$("<input type='hidden' name='baodinumber' value="+$("#baodinumber").val()+">").appendTo($(hemaiForm));
		/* 发起人认购份数 */
		$("<input type='hidden' name='buynumber' value="+$("#buynumber").val()+">").appendTo($(hemaiForm));
		/* 是否显示:0-完全公开,1-参与者公开,2-完全保密 */
		$("<input type='hidden' name='isshow' value="+$(".bm").find(".sele").eq(0).attr("val")+">").appendTo($(hemaiForm));
		/* 佣金(提成比例) */
		$("<input type='hidden' name='brokerage' value="+$(".zjyj").find(".sele").eq(0).attr("val")+">").appendTo($(hemaiForm));
		
		$("<input type='hidden' name='programDesc' value="+$("#licenseId").val()+">").appendTo($(hemaiForm));
		
		/* 赔率数据 */
		$("<input type='hidden' name='odds' value="+match_text.join(",")+">").appendTo($(hemaiForm));

		
		
		/* 单式/复式 */
		if ( $("#jcFilterHemaiFlagId").val() == "1" ) { // 过滤单
			$("<input type='hidden' name='uploadstate' value='1'>").appendTo($(hemaiForm));
			/* 过关方式 */
			$("<input type='hidden' name='reserved1' value="+$("#passTypeId").val()+">").appendTo($(hemaiForm));
		} else if ( $("#fromToId").length > 0 ) {
			$("<input type='hidden' name='uploadstate' value='1'>").appendTo($(hemaiForm));
			/* 过关方式 */
			$("<input type='hidden' name='reserved1' value="+$("#playTypeId").val()+">").appendTo($(hemaiForm));
		} else {
			/* 过关方式 */
			if ( $("#subPlayId").val() == "5"  ) {
				$("<input type='hidden' name='reserved1' value="+getPassTypes()+">").appendTo($(hemaiForm));
			} else {
				$("<input type='hidden' name='reserved1' value="+getPassType()+">").appendTo($(hemaiForm));
			}
			$("<input type='hidden' name='uploadstate' value='0'>").appendTo($(hemaiForm));
		}
		if ($("#currAmount").length > 0) {
			if ( parseFloat($("#payPriceId").html()) > parseFloat($("#currAmount").html().replaceAll(",","")) ) {
				//openHemaiBox("<p><font>余额不够，请先充值！</font></p>", null, null, false);
				openMessage("抱歉, 余额不够，请先充值！");
				return;
			}
		}
		$(hemaiForm).appendTo("body");
}

/**
 * 合买操作确认窗口
 */
var rmObj = null;
function openHemaiBox(message, formId, callback, isCancel){	
	if(isCancel == null || isCancel == false) {
		rmObj = $("#hemaiCancel").detach();
	}
	$("#hemaiconfirm").unbind("click");
	$("#hemaiCancel").unbind("click");
	$("#hemaiCloseBox").unbind("click");
	$("#hemaiBoxContent").html(message);
	$.blockUI({
    	message: $("#hemaiBox"),
        css: {
	       width: '380px',
	       height: '150px',
	       left: ($(window).width() - 380) / 2 + 'px',
	       top: ($(window).height() - 300) / 2 + 'px',
	       border: 'none',
	       cursor:'default'
        }
    });
	if(formId){ 
		$("#hemaiconfirm").click(function (){
			if(typeof(formId) == "string") {
			    $("#" + formId).submit();
			} else {
				$(formId).submit();
			}
		});
	} 

	if(callback) {
		$("#hemaiconfirm").click(function () {
			callback();
		});
	} else {
		$("#hemaiconfirm").click(function () {
			$.unblockUI();
		});
	}
    
	$("#hemaiCancel, #hemaiCloseBox").click(function () {
		$.unblockUI();
	});

}

function hemaiFullRefreshPage() {
	window.location = "/hemai/planDetail.jhtml?slwId=" + $("#slwId").val() + "&licenseId=" + $("#licenseId").val();
}

function hemaidetails() {
	var em = thisBuy.parent().parent().find("em[name='subNum']");
	var total = $(em).attr("total");
	var val = $(em).attr("value");
	if(parseInt(total) - parseInt(val) <= 0) {
	    window.location = "/hemai/planDetail.jhtml?slwId=" + $("#slwId").val() + "&licenseId=" + $("#licenseId").val();
    }
	$.unblockUI();
}

/* 竞彩过关方式 */
function getPassType() {
	var ptTypes = "";
	var ggFlag = $("#tagType").val();
	if ( ggFlag == "g" ) {	// 过关
		for ( var i = 0; i < $(freeBox).length; i++ ) {
			ptTypes += $(freeBox[i]).val() + ",";
		}			
		for ( var i = 0; i < $(combBox).length; i++ ) {
			ptTypes += $(combBox[i]).val() + ",";
		}
		ptTypes = ptTypes.substring(0, ptTypes.length - 1);
	} else {
		ptTypes = "1c1";	// 单关
	}
	return ptTypes;
}

/* 投注号码 */
function getBetCode() {
	var betCodes = "";
	var danLen = 0;
	var schInfo_code = $("#danMaList dd:visible");
	for ( var i = 0; i < schInfo_code.length; i++ ) {
		var pSchInfo = $(schInfo_code[i]).attr("issueweek") + ":";
		var opt = $(schInfo_code[i]).find("em:visible");
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
		pSchInfo = pSchInfo.substring(0, pSchInfo.length - 1);
		if ( $(schInfo_code[i]).find("input[type=checkbox]").eq(1).attr("checked") ) {
			pSchInfo += ":2";
			danLen++;
		} else {
			pSchInfo += ":1";	
		}
		betCodes += pSchInfo + "|";
	}	
	if ( danLen == 0 ) {
		betCodes = "";
		for ( var i = 0; i < schInfo_code.length; i++ ) {
			var pSchInfo = $(schInfo_code[i]).attr("issueweek") + ":";
			var opt = $(schInfo_code[i]).find("em:visible");
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
	return betCodes;
}

/* 不为空校验 */
function notNullVilidate(obj) {
	if ( $(obj).val() == "" ) {
		return true;
	}
	return false;
}

function buyEvent() {
	// 认购份数对象
	var buyNum = thisBuy.parent().parent().find("input[name=joinNumber]");
	// 认购金额
	//var payMoney = new Number(parseFloat($.trim(thisBuy.parent().parent().find("lable[name=everMoney]").html()))
	//		* parseInt(buyNum.val())).toFixed(2);
	
	var payMoney = new Number(parseFloat($("#permoney").val() * parseInt(buyNum.val()).toFixed(2)));
	/* 参与合买异步请求 */
	$.ajax({
	    type: "post",
	    url: "/hemai/join.json",
	    async: false,
	    dataType: "json",
	    data: "codeid=" + thisBuy.attr("join")+"&joinnumber="+buyNum.val()+"&joinmoney="+payMoney,
	    error: function(xMLHttpRequest, textStatus, errorThrown){
	    	
		},
	    success: function (data){
	    	
			if ( data.status == "0" ) {	// 参与成功
				var em = thisBuy.parent().parent().find("em[name=subNum]");
				var total = em.attr("total");
				var val = em.attr("value");
				
				// 剩余份数
				var balNum =  parseInt(thisBuy.parent().parent().find("input[name='balNum']").val());
				var joinNumber = parseInt(thisBuy.parent().parent().find("input[name = 'joinNumber']").val());
				var surplusNumber = parseInt(balNum - joinNumber);
				// 更新进度
				$(em).attr("value", parseInt(val) + parseInt(buyNum.val()));
				// 目前已认购份数
				var subscribednumber = parseInt(val) + parseInt(buyNum.val());
				$(em).html(new Number((subscribednumber / parseInt(total))*100).toFixed(0) + "%");
				thisBuy.parent().parent().find(".sp").css("width", new Number((subscribednumber / parseInt(total))*100).toFixed(0) + "%");
				thisBuy.parent().parent().find("input[name=balNum]").val(surplusNumber);
				// 更新剩余份数
//				thisBuy.parent().parent().find("input[name=joinNumber]").val("剩" + surplusNumber + "份");
				$("#Number").html(surplusNumber);
				$("#countprice").html(0.00);
				//openHemaiBox("<p><font>参与合买成功！</font></p>", null, hemaidetails, false);
				openMessage("谢谢, 参与合买成功!");
				if(parseInt(total) - parseInt(em.attr("value")) <= 0) {
				    window.location = "/hemai/planDetail.jhtml?slwId=" + $("#slwId").val() + "&licenseId=" + $("#licenseId").val();
			    }
				//$.unblockUI();
			} else if (data == "2") {
				openMessage("对不起，账户可用余额不足!");
			} else if(data=="3"){
				openHemaiBox("<p><font>对不起，参与单已满或已超过合买份数，请刷新页面重试！</font></p>", null, hemaiFullRefreshPage, false);
			} else if(data=="1"){
				openMessage("对不起, 您参与的合买单已满员或截止!");
			} else {
				openMessage(data.message);
			}
	    }
	});
}


var thisBuy = null;
function initEvent() {
	// 文本框光标事件
	$("input[name='joinNumber']").focus(function(){
	    $(this).val("").blur(function(){
	    	if($(this).val() == "") {
	    	   if($("input[name='joinNumber']").attr("shengyu")==null){
	    		   $(this).val($(this).parent().parent().find("input[name = 'balNum']").val()); 
	    	   }
	    	}
	    });
	});
	
	$("input[name='joinNumber']").keyup(function(){  
		    $(this).val($(this).val().replace(/\D|^/g,''));
	        if($(this).val() == "0") {
	 		   $(this).val(1);
	 	    }
	        //var payMoney = new Number(parseFloat($("#permoney")).val()) * parseInt(buyNum.val()).toFixed(2);
	        $("#countprice").html(parseFloat($("#permoney").val() * $(this).val()).toFixed(2));
	    }).bind("paste",function(){  // CTR+V事件处理

	    	 $(this).val($(this).val().replace(/\D|^/g,''));   

	 }).css("ime-mode", "disabled");  // CSS设置输入法不可用
	
	/* 保密设置 */
	$(".bm a").click(function() {
		$(".bm a").removeClass("sele");
		$(this).addClass("sele");
	});
	
	/* 中奖佣金 */
	$(".zjyj a").click(function() {
		$(".zjyj a").removeClass("sele");
		$(this).addClass("sele");
	});
	
	/* 合买标题输入begin */
	$("#hemaititle").keydown(function(event) {
		if ( $(this).val().length == 20 && event.keyCode != 8 ) {
			return false;
		}
	});
	$("#hemaititle").keyup(function() {
		if ( $(this).val().length > 20 ) {
			$(this).val($(this).val().substring(0,20));
		}
		$("#showPromptTitleId").html("您还可以输入"+(20-$(this).val().length)+"个字符");
	});
	/* 合买标题输入end */
	
	/* 合买方案描述输入begin */
	$("#hemaidesc").keydown(function(event) {
		if ( $(this).val().length == 50 && event.keyCode != 8 ) {
			return false;
		}
	});
	$("#hemaidesc").keyup(function() {
		if ( $(this).val().length > 50 ) {
			$(this).val($(this).val().substring(0,50));
		}
		$("#showPromptDescId").html("您还可以输入"+(50-$(this).val().length)+"个字符");
	});
	/* 合买方案描述输入end */
	
	/* 合买分成份数输入begin */
    $("#sharenumber").keyup(function(){  
    	$(this).val($(this).val().replace(/\D|^/g,''));  
		countSharenumber();
		viewPayInfo();
    }).bind("paste",function(){  //CTR+V事件处理 

    	$(this).val($(this).val().replace(/\D|^/g,''));  

    }).css("ime-mode", "disabled");  //CSS设置输入法不可用

	/* 合买分成份数输入end */
	
	/* 我要认购输入begin */	
	$("#buynumber").keyup(function(){  
        $(this).val($(this).val().replace(/\D|^/g,''));  
    	countBuynumber();
		viewPayInfo();
    }).bind("paste",function(){  //CTR+V事件处理 

        $(this).val($(this).val().replace(/\D|^/g,''));  

    }).css("ime-mode", "disabled");  //CSS设置输入法不可用
	
	/* 我要认购输入end */
	
	/* 保底输入begin */
	 $("#baodinumber").keyup(function(){
	        $(this).val($(this).val().replace(/\D|^/g,''));
	    	countBaodinumber();
			viewPayInfo();
	    }).bind("paste",function(){  //CTR+V事件处理 

	        $(this).val($(this).val().replace(/\D|^/g,''));  

	    }).css("ime-mode", "disabled");  //CSS设置输入法不可用
	/* 保底输入end */
	
	
	/* 参与合买事件 added at 2013/05/31 */
	$(".a_buy, #goumai").click(function() {
		var oBuy = $(this);
		thisBuy = oBuy;
		// 登录判断
		if ( $("#currAmount").length < 1 ) {
			loginPop();
			rightPop();
			return;
		}
	    if(thisBuy.attr("id") != "goumai") {
			if ( $("#isAgree").attr("checked") != "checked") {
				alert("请同意购彩交易须知！");
				return;
			}
	    }
		
		// 认购份数对象
		var buyNum = oBuy.parent().parent().find("input[name=joinNumber]");
		if ( buyNum.val() == "" ) {
			//openHemaiBox("<p><font>认购份数不能为空</font></p>", null, null, false);
			openMessage("请填写份数再购买!");
			return;
		}
		
		// 剩余份数对象
		var balNum = oBuy.parent().parent().find("input[name=balNum]");
		if ( parseInt(buyNum.val()) > parseInt(balNum.val()) ) {
			//openHemaiBox("<p><font>认购份数不能大于剩余份数！</font></p>", null, null, false);
			openMessage("认购份数不能大于剩余份数!");
			return;
		}
		
		// 是否为整数
		if(!$.isNumeric(new Number(buyNum.val())) || buyNum.val().replace(/[ ]/g,"").length == 0) {
			//openHemaiBox("<p><font>认购份数为整数！</font></p>", null, null, false);
			openMessage("认购份数必须为整数!");
			return;
		}
		
		// 份数必须大于0
		if ( parseInt(buyNum.val()) < 1) {
			//openHemaiBox("<p><font>认购份数为大于0！</font></p>", null, null, false);
			openMessage("抱歉, 认购份数为大于0!");
			return;
		}
		
		// 认购金额
		var payMoney = new Number(parseFloat(oBuy.parent().parent().find("font[name=everMoney]").eq(0).html())
				* parseInt(buyNum.val())).toFixed(2);
		
//		var payMoney = new Number(parseFloat($("#permoney").val() * parseInt(buyNum.val()).toFixed(2)));
		
		if ( payMoney > parseFloat($("#currAmount").html().replaceAll(",","")) ) {
			//openHemaiBox("<p><font>余额不够，请先充值！</font></p>", null, null, false);
			openMessage("您的可投注余额不足，请充值！");
			
			return;
		}
		
		openHemaiBox("<p><font>确认购买?</font></p>"
				+ "<p><font style='color: red'>购买份数:"+ buyNum.val() +"份</font></p>"
				+ "<p><font style='color: red'>认购金额:" + payMoney + "元</font></p>", null, buyEvent, true);
	});
}

String.prototype.replaceAll  = function(s1,s2){
	return this.replace(new RegExp(s1,"gm"),s2);
};

/* 展示付款信息 */
function viewPayInfo() {
//	$("#finalPayId").html(parseFloat($("#sharePrice").html() * $("#buynumber").val()).toFixed(2));
//    $("#finalBdId").html(parseFloat($("#sharePrice").html() * $("#baodinumber").val()).toFixed(2));
	$("#confirm_money_me").html("￥" + (new Number(parseFloat($("#sharePrice").html() * $("#buynumber").val()).toFixed(2)) +
			 new Number(parseFloat($("#sharePrice").html() * $("#baodinumber").val()).toFixed(2))).toFixed(2));

}

/* 置空页面元素 */
function setNull(obj) {
	$(obj).val("");
}

/** show div */
var freeBox;
var combBox;
var hemaidetail = "";
//存赛程
var match_text = new Array();
function fqhmPrompt() {
	// show
	$("#fqhmBtn").click(function() {
		
		/** by:guoxiaosheng 2013/10/11 合买标识**/
		if( $("#confirm_hm_state").length > 0 ){
			$("#confirm_hm_state").remove();
		}
		$("<input hidden='hidden' id='confirm_hm_state' value='1'/>").appendTo($("body"));
		
		if( $("#betSum").html() == "0" ){
			openMessage("您好，请选择赛程进行投注。");
			return false;
		}
//		if ($("#currAmount").length < 1 ) {
//			loginPop();
//			return false;
//		}
		/**
		 * 竞彩过滤-合买 by:guoxiaosheng 2013/10/11
		 */
		if ( $("#jcFilterHemaiFlagId").val() == "1" ) {
//			if ($("#loginFlagId").length > 0 ) {
//				
//			} else {
//				openMessage("您好，请登录后重新进入页面！");
//				return false;
//			}
			//判断是否生成过滤单
			if ( parseFloat($("#filbetAmtId").html()) < 2 ) {
				openMessage("您好，请选择赛程进行投注。");
				return false;
			}
			setNull($("#sharenumber"));
			setNull($("#buynumber"));
			setNull($("#baodinumber"));
		}else if ( $("#fromToId").length > 0 ) {
			/**
			 * 竞彩优化单-合买 by:guoxiaosheng 2013/10/11
			 */
			/* Added by Luochang for 优化单合买 at 2013/08/06 */
			setNull($("#sharenumber"));
			setNull($("#buynumber"));
			setNull($("#baodinumber"));
		}else{
			// init value for form
			//setNull($("#hemaititle"));
			//setNull($("#hemaidesc"));
			if( parseInt($("#jinE").html(),10) == 0 ) {
				openMessage("您好，请选择赛程进行投注。");
				return false;
			}
			setNull($("#sharenumber"));
			setNull($("#buynumber"));
			setNull($("#baodinumber"));
		}
		
		/**
		 * 竞彩足球-合买将右侧表单数据放入全局。
		 */
//		var schInfo_code = $("#danMaList dd:visible").clone();
		freeBox = $("#zyChuanBox input[type=checkbox]:checked:visible").clone();
		combBox = $("#zhChuanBox input[type=checkbox]:checked:visible").clone();
		var danguan = $("#danguan input[type=checkbox]:checked:visible").clone();
		match_text = new Array();
		
		if( $("#danMaList dd:visible").length > 0 ){
			if( $(freeBox).length == 0 && $(combBox).length == 0 && $(danguan).length == 0 ){
				openMessage("您好，请选择正确过关方式。");
				return false;
			}
			$("#danMaList dd:visible").each(function ( index ,value ){
				var match_text_ = "";
				$(this).find("p:eq(1) em:visible").each(function (){
					match_text_ += $(this).html() + "(" + $(this).attr("odd") + ")";
				});
				match_text.push(match_text_);
			});
			hemaidetail = getBetCode();
		}
		
		
		
		lotteryFormSubmit();
	});
	// hidden
//	$("#closeHemaiPrompt").click(function() {
//		$.unblockUI();
//	});
}

/**
 * 判断是否为整数
 */
function isInt(val) {
	var r = /^\+?[1-9][0-9]*$/;
	return r.test(val);
}

/**计算份数*/
function countSharenumber() {
	var totalAmt = 0;
	if ( $("#jinE").length > 0 ) {
		totalAmt = $("#jinE").html();
	} else if ( $("#orderMoneyId").length > 0 ) {
		totalAmt = $("#orderMoneyId").html();
	} else if ( $("#filbetAmtId").length > 0 ) {
		totalAmt = $("#filbetAmtId").html();
	} 
	// 总份数对象
	var shareVal = parseInt( $("#sharenumber").val() == "" ? 0 : $("#sharenumber").val() , 10 );
	var perAmt = parseInt(totalAmt , 10) / shareVal;
	var most =  parseInt(totalAmt , 10) / 1;
	var defaultBuyNum = (shareVal * 0.05).toFixed(2) < 1 ? 1 : (shareVal * 0.05).toFixed(2);
	var lessBuyNum = (shareVal * 0.01).toFixed(2) < 1 ? 1 : (shareVal * 0.01).toFixed(2);
	// 保底对象 
	var oBaodi = $("#baodinumber");
	// 认购份数对象
	var oBuy = $("#buynumber");
	var error = $("#ErrorShareInfo");
	error.html("");
	if (shareVal !== 0) {
	    $("#sharePrice").html(perAmt.toFixed(2));
	    $("#PrePrice").html(1);
	}else {
	    $("#sharePrice").html("<b style='color:#BA2636;margin:auto 4px;'>--</b>");
	    $("#PrePrice").html(1);
	}
	if(shareVal < 1 ){
    	error.html('分配份数至少为1份!');
    	$("#sharePrice").html(0);
    	$("#PrePrice").html(1);
	}
	else if( shareVal > most) {
		$("#sharenumber").val(most);
		$("#sharePrice").html(1.00);
		$("#PrePrice").html(1);
	}
	else if( shareVal > 1 ) {
		if(perAmt > 1 && (perAmt + "").split(".").length > 1 ){
			if( (perAmt + "").split(".")[1].length > 2 ){
				$("#ErrorShareInfo").html("每份金额不能整除到分");
				$("#ErrorShareInfo").show();
			}
		}else if(perAmt < 1) {
			$("#ErrorShareInfo").html('每份金额至少为1元!');
			$("#ErrorShareInfo").show();
		}
		else{
			$("#ErrorShareInfo").html("");
			$("#ErrorShareInfo").hide();
		}
		if(shareVal<parseInt(oBuy.val())||shareVal<parseInt(oBaodi.val()) + parseInt(oBuy.val())) {//总份数<保底+认购
	    	$("#buynumber").val("");
	 		$("#buyNum").html(lessBuyNum);
	 		$("#defaultBuy").html("至少购买1%");
	 		$("#buynumberPrice").html(0);
	 		$("#ErrorBuyInfo").html("认购份数至少为" + lessBuyNum + "份!");
			$("#ErrorBuyInfo").show();
			$("#baodinumber").val(0);
			$("#baodinumberPrice").html(0);
			$("#baodiPercent").html("0%");
	  	}
	else{
		$("#buyNum").html(oBuy.val());//实际份数
		$("#defaultBuy").html(infactbuy+"%"); //实际百分比
	    $("#ErrorBuyInfo").html("");
	    $("#ErrorBuyInfo").hide();
	}
    }
	if(error.html().length > 0){
		error.show();
	}else{
		error.hide();
	}
	
	
}

/**
 *  计算全额保底
 */
function selBaodiAll(){
	if($("#baodiAll").attr("checked")){
		
		// 总份数对象
		var oShare = $("#sharenumber");
		// 认购份数对象
		var oBuy = $("#buynumber");
		
		if(oShare.val() && oBuy.val()){
			$("#baodinumber").val(parseInt(oShare.val()) - parseInt(oBuy.val()));
		}else{
			$("#baodinumber").val(0);
			$("#baodinumberPrice").html(0);
			$("#baodiPercent").html("0%");	
			$("#ErrorBaodiInfo").html("请确认分成和认购份数");
			$("#ErrorBaodiInfo").show();
			return false;
		}
		
		// 保底对象 
		var oBaodi = $("#baodinumber");
		var defaultBuyNum = Math.ceil(new Number(oShare.val() * 0.05));// 默认购买5%
		var lessBuyNum = Math.ceil(new Number(oShare.val() * 0.01));	// 最少购买1%
		var baodiAmt = parseFloat($("#sharePrice").html() * parseInt($("#baodinumber").val())).toFixed(2);//保底金额
		//保底百分比计算
		var baodiPercent= parseFloat(parseInt($("#baodinumber").val())/oShare.val()*100).toFixed(2);
		if(oShare.val()==""||oShare.val()==0){//分成份数为空
			$("#baodinumber").val("");
			$("#baodinumberPrice").html(0);
			$("#baodiPercent").html("0%");
		    return false;
		}
		else if ( oBaodi.val() == "") {//保底为空
				$("#baodinumberPrice").html(0);
				$("#baodiPercent").html("默认0%");		
				$("#ErrorBaodiInfo").html("保底不能为空，请至少填写0");
				$("#ErrorBaodiInfo").show();
				return false;
		}
		else if(oBuy.val()!=""){
			if (parseInt(oShare.val()) < (parseInt(oBaodi.val()) + parseInt(oBuy.val()))){
				$("#ErrorBaodiInfo").html("认购与保底份数之和不能大于所分成份数");
				$("#baodinumberPrice").html(0);
				$("#baodiPercent").html("默认购买0%"); 
				$("#ErrorBaodiInfo").show();
				return false;
			}else{
				$("#baodiPercent").html(""); 
				$("#ErrorBaodiInfo").html("");
				$("#ErrorBaodiInfo").hide();
			}
		}
		else if(oBuy.val()==""){
			if((parseInt(oBaodi.val())>=parseInt(oShare.val()) ||parseInt(oBaodi.val())==parseInt(oShare.val())) ){
				$("#baodinumber").val(0);
				$("#baodinumberPrice").html(0);
				$("#baodiPercent").html("0%");	
				$("#ErrorBaodiInfo").html("认购与保底份数之和不能大于所分成份数");
				$("#ErrorBaodiInfo").show();
				return false;
			}else{
				$("#baodiPercent").html(""); 
				$("#ErrorBaodiInfo").html("");
				$("#ErrorBaodiInfo").hide();
			}
		}
	else{
			$("#ErrorBaodiInfo").html("");
		    $("#ErrorBaodiInfo").hide();
		}
		$("#baodinumberPrice").html( baodiAmt);
		$("#baodiPercent").html(baodiPercent+"%");	
	}else{
		$("#baodinumber").val(0);
	}
}

/**
 *  计算保底
 * @returns {Boolean}
 */
function countBaodinumber() {
	// 总份数对象
	var oShare = $("#sharenumber");
	// 保底对象 
	var oBaodi = $("#baodinumber");
	// 认购份数对象
	var oBuy = $("#buynumber");
	var defaultBuyNum = Math.ceil(new Number(oShare.val() * 0.05));// 默认购买5%
	var lessBuyNum = Math.ceil(new Number(oShare.val() * 0.01));	// 最少购买1%
	var baodiAmt = parseFloat($("#sharePrice").html() * parseInt($("#baodinumber").val())).toFixed(2);//保底金额
	//保底百分比计算
	var baodiPercent= parseFloat(parseInt($("#baodinumber").val())/oShare.val()*100).toFixed(2);
	
	if(parseInt(oBaodi.val()) + parseInt(oBuy.val()) == parseInt(oShare.val())){
		$("#baodiAll").attr("checked", true);
	}else{
		$("#baodiAll").removeAttr("checked");
	}
	
	if(oShare.val()==""||oShare.val()==0){//分成份数为空
		$("#baodinumber").val("");
		$("#baodinumberPrice").html(0);
		$("#baodiPercent").html("0%");
	    return false;
	}
	else if ( oBaodi.val() == "") {//保底为空
			$("#baodinumberPrice").html(0);
			$("#baodiPercent").html("默认0%");		
			$("#ErrorBaodiInfo").html("保底不能为空，请至少填写0");
			$("#ErrorBaodiInfo").show();
			return false;
	}
	else if(oBuy.val()!=""){
		if (parseInt(oShare.val()) < (parseInt(oBaodi.val()) + parseInt(oBuy.val()))){
			$("#ErrorBaodiInfo").html("认购与保底份数之和不能大于所分成份数");
			$("#baodinumberPrice").html(0);
			$("#baodiPercent").html("默认购买0%"); 
			$("#ErrorBaodiInfo").show();
			return false;
		}else{
			$("#baodiPercent").html(""); 
			$("#ErrorBaodiInfo").html("");
			$("#ErrorBaodiInfo").hide();
		}
	}
	else if(oBuy.val()==""){
		if((parseInt(oBaodi.val())>=parseInt(oShare.val()) ||parseInt(oBaodi.val())==parseInt(oShare.val())) ){
			$("#baodinumber").val(0);
			$("#baodinumberPrice").html(0);
			$("#baodiPercent").html("0%");	
			$("#ErrorBaodiInfo").html("认购与保底份数之和不能大于所分成份数");
			$("#ErrorBaodiInfo").show();
			return false;
		}else{
			$("#baodiPercent").html(""); 
			$("#ErrorBaodiInfo").html("");
			$("#ErrorBaodiInfo").hide();
		}
	}
else{
		$("#ErrorBaodiInfo").html("");
	    $("#ErrorBaodiInfo").hide();
	}
	$("#baodinumberPrice").html( baodiAmt);
	$("#baodiPercent").html(baodiPercent+"%");	
}

/**
 *计算认购份数
 */
function countBuynumber() {
	// 份数对象
	var oShare = $("#sharenumber");
	// 认购对象
	var oBuy = $("#buynumber");
	// 保底对象 
	var oBaodi = $("#baodinumber");
	var lessBuyNum = Math.ceil(new Number(oShare.val() * 0.01));// 最少购买1%
	var infactbuy = parseFloat(new Number(oBuy.val()/oShare.val()* 100)).toFixed(2);//实际购买X%
    var buyAmt = parseFloat($("#sharePrice").html() * parseInt(oBuy.val())).toFixed(2);// 购买金额	
     if(oBaodi.val() == "") {//保底为空
    		$("#baodinumber").val(0);
    		$("#baodinumberPrice").html(0);
    		$("#ErrorBaodiInfo").html("");
    		$("#ErrorBaodiInfo").hide();
    	}
     else if(oShare.val() == ""||oShare.val()==0) {//总分数为空
 		$("#buynumber").val("");
 		$("#buyNum").html(0);
 		$("#defaultBuy").html("0%");
 		$("#buynumberPrice").html(0);
 	    return false;
 	}
    else if(parseInt(oShare.val()) <parseInt(oBuy.val())||parseInt(oShare.val()) < parseInt(oBaodi.val()) + parseInt(oBuy.val())) {//总份数<保底+认购
    	$("#buynumber").val("");
 		$("#buyNum").html(lessBuyNum);
 		$("#defaultBuy").html("至少购买1%");
 		$("#buynumberPrice").html(0);
 		$("#ErrorBuyInfo").html("认购份数至少为" + lessBuyNum + "份!");
		$("#ErrorBuyInfo").show();
 	    return false;
  	}
	else if((parseInt(oBuy.val()) >=Math.ceil(lessBuyNum))&&oBuy.val()<=oShare.val()){//大于最小购买份数小于分成份数
		$("#defaultBuy").html(infactbuy+"%");
		$("#buyNum").html(oBuy.val());
		$("#buynumberPrice").html(buyAmt);
		$("#ErrorBuyInfo").html("");
	    $("#ErrorBuyInfo").hide();
	}
    else if(oBuy.val()==0||oBuy.val() == "") {//份数为空	
 			$("#defaultBuy").html("至少购买1%");
			$("#buynumberPrice").html(0);
			$("#buyNum").html(lessBuyNum);
			$("#ErrorBuyInfo").html("认购份数至少为" + lessBuyNum + "份!");
			 $("#ErrorBuyInfo").show();
 	    return false;
	}
	else if (parseInt(oBuy.val()) <lessBuyNum) {//认购份数小于最少需购买份数
		$("#defaultBuy").html("至少购买1%");
		$("#buyNum").html(lessBuyNum);
		$("#ErrorBuyInfo").html("认购份数最少为" + lessBuyNum + "份");
	    $("#ErrorBuyInfo").show();
	    return false;
	}
    else{
    		$("#defaultBuy").html(infactbuy+"%");
    		$("#buyNum").html(oBuy.val());
    		$("#buynumberPrice").html(buyAmt);
    		$("#ErrorBuyInfo").html("");
    	    $("#ErrorBuyInfo").hide();
    	}	
	$("#finalPayId").html(buyAmt);
}

/**
 * 初始化表单值
 */
function initFormVal() {
	// 份数对象
	var oShare = $("#sharenumber");
	// 认购对象
	var oBuy = $("#buynumber");
	
	//-------------------------------份数初始化-----------------------------------
	$("#ErrorShareInfo").html('');
	$("#sharePrice").html(1);
	if(oShare.val() == "") {
		var  initShare = $("#jinE").html();
		if ( $("#fromToId").length > 0 ) {
			initShare = $("#orderMoneyId").html();
		} else if ( $("#jcFilterHemaiFlagId").val() == "1" ) {
			initShare = $("#filbetAmtId").html();
		}
		// 多少钱分成多少分(10元10份)
		oShare.val(initShare);
		if(initShare == "0" || initShare == "" || initShare == "undefined") {
			$("#ErrorShareInfo").html('份数最少为1份!');
		}
	}
	//-------------------------------认购初始化-----------------------------------
	
	// 认购金额
    if(oBuy.val() == "") {
    	// 最少认购5%, 认购份数
    	var lessBuyNum  = Math.ceil(new Number(oShare.val() * 0.05));
		$("#buyNum").html(lessBuyNum);
		//if((parseInt(oBuy.val()) < Math.ceil(lessBuyNum))) {
			oBuy.val(lessBuyNum);
		//}
		$("#buynumberPrice").html(parseInt($("#sharePrice").html()) * parseInt(oBuy.val()));
    }
    
    //-------------------------------保底初始化-----------------------------------
    $("#baodinumber").val(0);
    //-------------------------------事件初始化-----------------------------------
    $("#sharenumber").change(function() {
    	if($("#sharenumber").val == "") {
    	    $("#sharenumber").val(0);
    	}
    });
    
    $("#buynumber").change(function() {
    	if($("#buynumber").val == "") {
    	    $("#buynumber").val(0);
    	}
    });
    
    $("#baodinumber").change(function() {
    	if($("#baodinumber").val == "") {
    	    $("#baodinumber").val(0);
    	}
    });
    
    var hemaititle = "";
    var licenseId = $("#licenseId").val();

}

$(document).ready(function() {
	/*** 合买详情 */
	$("a[name='hmxq']").bind("click",function() {
		var codeid = $(this).parent().find("input[name='codeId']").val();
		var programDesc = $(this).parent().find("input[name='programDesc']").val();
//		var licenseId = $(this).parent().find("#licenseType").val();//定制跟单的
		var licenseId = $(this).parent().find("input[name='licenseId']").val();
		// 登录判断
		if ( $("#currAmount").length < 1 ) {
			loginPop();
			rightPop();
			return;
		} else {
//		    if($(this).parent().find("input[name='isshow']").val() == 2 ) { //0-完全公开,1-参与者公开,2-完全保密 
//				alert('该方案完全保密');
//				return;
//			} else if($(this).parent().find("input[name='isshow']").val() == 1) {  // 参与者公开
//				/* 参与合买异步请求 */
//				$.ajax({
//				    type: "post",
//				    url: "/hemai/isJoinHemai.jhtml",
//				    async: false,
//				    dataType: "json",
//				    data: "codeid="+codeid+"&joinmemberid=" + $("#memberid").val(),
//				    error: function(xMLHttpRequest, textStatus, errorThrown){
//				    	alert('查询失败');
//					},
//				    success: function (data){
//						if (data == "1") {	
//							window.location = "/hemai/details.jhtml?codeId="+codeid
//							+ "&lotteryTicketType=" + $("input[name='licenseId']").val() + "&programDesc=" 
//							+ programDesc;
//						} else {  // 该方案无此用户参与
//							alert("只对参与者公开");
//						}
//				    }
//				});
//			} else {  // 完全公开
				window.open("/hemai/details.jhtml?codeId="+ codeid
				+ "&lotteryTicketType=" + licenseId + "&programDesc=" 
				+programDesc);
//			}
	   }
});
	
	
	$("#hmjl").bind("click",function() {
		// 登录判断
		window.location = "/hemai/myHemaiPlan.jhtml?slwId=" + $("#slwId").val()
					+ "&memberid=" + $(this).attr("memberid") + "&licenseId=" + $("#licenseId").val();
	});
	
});


$(document).ready(function() {
	/*** 合买详情 */
	$("a[name='hmgd']").bind("click",function() {
		var codeid = $(this).parent().find("input[name='codeId']").val();
		var programDesc = $(this).parent().find("input[name='programDesc']").val();
		var licenseId = $(this).parent().find("#licenseType").val();//定制跟单的
//		var licenseId = $("input[name='licenseId']").val();
		// 登录判断
		if ( $("#currAmount").length < 1 ) {
			loginPop();
			rightPop();
			return;
		} else {
//		    if($(this).parent().find("input[name='isshow']").val() == 2 ) { //0-完全公开,1-参与者公开,2-完全保密 
//				alert('该方案完全保密');
//				return;
//			} else if($(this).parent().find("input[name='isshow']").val() == 1) {  // 参与者公开
//				/* 参与合买异步请求 */
//				$.ajax({
//				    type: "post",
//				    url: "/hemai/isJoinHemai.jhtml",
//				    async: false,
//				    dataType: "json",
//				    data: "codeid="+codeid+"&joinmemberid=" + $("#memberid").val(),
//				    error: function(xMLHttpRequest, textStatus, errorThrown){
//				    	alert('查询失败');
//					},
//				    success: function (data){
//						if (data == "1") {	
//							window.location = "/hemai/details.jhtml?codeId="+codeid
//							+ "&lotteryTicketType=" + $("input[name='licenseId']").val() + "&programDesc=" 
//							+ programDesc;
//						} else {  // 该方案无此用户参与
//							alert("只对参与者公开");
//						}
//				    }
//				});
//			} else {  // 完全公开
				window.open("/hemai/details.jhtml?codeId="+ codeid
				+ "&lotteryTicketType=" + licenseId + "&programDesc=" 
				+programDesc);
//			}
	   }
});
	
	
	$("#hmjl").bind("click",function() {
		// 登录判断
		window.location = "/hemai/myHemaiPlan.jhtml?slwId=" + $("#slwId").val()
					+ "&memberid=" + $(this).attr("memberid") + "&licenseId=" + $("#licenseId").val();
	});
	
});

/**
 * 合买方案查询
 */
$(document).ready(function() {
	$("a[name = 'searchPlanBtn']").click(function() {
		$("#planForm").submit();
	});
});


/**
* 开奖倒计时
*/

function formatDate_(dateStr){
	return new Date(dateStr.replace(/[\-\u4e00-\u9fa5]/g, "/"));
}
//倒计时
var reverTime = {
	//@parameters 相差天数,相差时间,服务器时间,截止时间
	init : function (dayObj, timeObj, serverTime, stopTime){
		if(typeof serverTime === 'undefined' || typeof stopTime === 'undefined') {
			return;
		}
		this.offset = formatDate_(serverTime).getTime() - new Date().getTime();
		this.obj = {
			day : $(dayObj),
			time : $(timeObj)
		};
		this.f = function(n){ return formatNo(n,2) ;};
		this.timer = null;
		this.start(stopTime);
	},
	//倒计时开始
	start : function(st){
		window.clearInterval(this.timer);
		var now = new Date().getTime() + this.offset;
		this.count = Math.floor((formatDate_(st).getTime()-now)/1000)+1;	//总秒数
		//this.run();
		this.timer = window.setInterval(bind(this,this.run), 1000);
	},
	//运行倒计时
	run : function (){
   		o = this.diff(this.count--);
   		if( $("#remainTime").length > 0 ){
   		var html = "<tr>";
	   		    html += "<td>";
		   		    html += '<span class="hm_red">' + o.day + '</span>';
		   		    html += '<span class="hm_b">天</span>';
		   		html += "</td>";
		   	    html += "<td>";
		   		    html += '<span class="hm_red">' + o.hour + '</span>';
		   		    html += '<span class="hm_b">小时</span>';
		   		html += "</td>";
		   	    html += "<td>";
		   		    html += '<span class="hm_red">'+ o.minute +'</span>';
		   		    html += '<span class="hm_b">分</span>';
		   		html += "</td>";
		   	    html += "<td>";
		   		    html += '<span class="hm_red">' + o.second + '</span>';
		   		    html += '<span class="hm_b">秒</span>';
		   		html += "</td>";
   		    html += "</tr>";
   		
//   		$('#remainTime').html("<i class='first'>" + o.day + "天</i>" + "<i>" + o.hour + "小时</i>" + "<i>" 
//   				+ o.minute + "分</i>" + "<i>" + o.second + "秒</i>");
   			$('#remainTime').html(html);
   	   		if((o.day == 0) && (o.hour == 0) && (o.minute == 0) && (o.second == 0)){
   	   			window.clearInterval(this.timer);
   	   			showGameChange();
   	   		}
   		}
   		
   		//alert((o.day) && (o.hour) && (o.minute) && (o.second));
	},
	//返回日期差距
	diff : function (t){
		return t>0 ? {
			day : Math.floor(t/86400),
			hour : Math.floor(t%86400/3600),
			minute : Math.floor(t%3600/60),
			second : Math.floor(t%60)
		} : {day:0,hour:0,minute:0,second:0};
	}
};

function showGameChange(){
	$.blockUI({
	  message: $("#gameChange"),
	  css: {
	      left: ($(window).width() - 420) / 2 + 'px',
	      top: ($(window).height() - 230) / 2 + 'px',
	      backgroundColor:'none',
	      border: 'none',
	      cursor:'default'
	  }
	});	
	var formObj = $('#lotteryBuyForm');
	var gameName = formObj.find("input[name=gameName]").val();	  
	var gameIssue = formObj.find("input[name=gameIssue]").val();	     
	
	$("#gameChangeMessage").html(gameName + " " + gameIssue + " 期游戏已截止");
}



$(document).ready(function(){
	 var serverTime_ = $("#serverTime_").val();
	 var stopTime_ahead = $("#stopTime_ahead").val();
	 reverTime.init('','',serverTime_, stopTime_ahead);//初始化倒计时控件'','',服务器时间,截止时间

	 //loginClick();
});
//var millisecond;
//var sysSecond;
//$(document).ready(function() { 
//	  millisecond = parseInt($("#remainSeconds").val()); // 这里获取倒计时的起始时间
//	  sysSecond = (millisecond / 1000); // 秒
//	  InterValObj = window.setInterval(SetRemainTime, 1000); // 间隔函数，1秒执行
//}); 
//	 
//function SetRemainTime() { 
//  if (millisecond > 0) { 
//	  // 将时间减去1秒，计算天、时、分、秒
//	   sysSecond = sysSecond - 1;
//	   var second = Math.floor(Math.floor(sysSecond) % 60);  // 计算秒
//	   var minite = Math.floor((sysSecond / 60) % 60);      // 计算分
//	   var hour = Math.floor((sysSecond / (60 * 60)) % 24);      // 计算小时
//	   var day = Math.floor((sysSecond / (60 * 60 * 24)));        // 计算天
//	 
//	   $("#remainTime").html("<i class='first'>" + day + "天</i>" + "<i>" + hour + "小时</i>" + "<i>" + minite + "分</i>" + "<i>" + second + "秒</i>"); 
//  } else {    // 剩余时间小于或等于0的时候，就停止间隔函数
//   window.clearInterval(InterValObj); 
//   // 这里可以添加倒计时时间为0后需要执行的事件
//  } 
// } 
//
//function kaijiangTime() {
//	var time = $("#kaijiangTime").val();
//}

// 判断键盘输入只能输入数字和退格键
function invalidateEvent(event) {
	var code = event.keyCode;
	if((((95 < code && code < 106) || (47 < code && code < 59) || code == 8))) {
		return true;
	}
	return false;
}

function checkChar(str) {
    var reg=new RegExp("r[ ,\\`,\\~,\\!,\\@,\#,\\$,\\%,\\^,\\+,\\*,\\&,\\\\,\\/,\\?,\\|,\\:,\\.,\\<,\\>,\\{,\\},\\(,\\),\\',\\;,\\=,\"]");
	var s = reg.test(str);
	return s;
}

$(document).ready(function () {
	// 查看所有用户
	$("#showUser").click(function () {
		 var oTable = $(this).parent().parent().find("#usersTb");
		 var oFenye = $(".hm_list_f");

		 if(oTable.css("display") == "none") {
			 pagination.request();
			 oTable.show();
			 oFenye.show();
			 $(this).addClass("xh_btn_open");
	     } else {
	    	 oTable.hide();
	    	 oFenye.hide();
	    	 $(this).removeClass("xh_btn_open");
	     }
	});
	//方案展开 by jianglin
	$("#showxuanhao").click(function () {
		 var oTable = $(".hmxq_table_all:eq(0)");
		 if(oTable.is(":hidden")) {
			 oTable.show();
			 $(this).addClass("xh_btn_open");
	     } else {
	    	 oTable.hide();
	    	 $(this).removeClass("xh_btn_open");
	     }
	});	
	//中奖情况
	var totalprize = $("#prizDetail").attr("detail");//中奖总金额
	var html="";
	if(totalprize!=undefined){
		if(totalprize!=""){
			tp =totalprize.split(",");
			var allmoney = $("#allmoney").attr("allmoney");//本金
			var percentage=$("#percentage").attr("ticheng");//提成
			var sharenumber=$("#sharenumber").attr("sharenumber");//分成份数
			if(tp[1]*1>allmoney){
				ticheng=parseFloat((tp[1]*1-allmoney)*percentage).toFixed(2);
			}else{
				ticheng="0.00";
			}
			//每份派奖金额
			var PerPrize=parseFloat((tp[1]*1-ticheng)/sharenumber).toFixed(2);
			html+="中奖情况：共计￥";
			html+="<font>"+tp[1]+"</font>元,发起人提成";
			html+="<font>"+ticheng+"</font>元,每份派奖金额";
			html+="<font>"+PerPrize+"</font>元";
			$("#prizDetail").html(html);
		}else{
			html+="";
			$("#prizDetail").html(html);
			}			
		}

});
/**
 * 参与合买记录明细
 * jianglin修改
 * 加入中奖金额（如果中奖则显示中奖金额）
 * @param data
 */
function handleFenye(data) {
	var oTable = $("#usersTb");
	var oFenye = $(".hm_list_f");
	var oI = oTable.find("i");
    var k = 0, len = 0, i = 0, len1 = 0, j = 0, len2 = 0;
    var html = "", fenye = "";
    html += "<tr>";
        html+= "<th>用户名</th>";
	    html+= "<th>用户名</th>";
	    html+= "<th>购买份数</th>";
	    html+= "<th>购买金额</th>";
	    if( data[0][0].prizeMoney!=""){//如果中奖金额不为空则显示
			   html+= "<th>中奖金额</th>";
		   }
	    html+= "<th>参与时间</th>";
    html+= "</tr>";
    var totalCount;
    for(len = data.length; k < len; k++) {
	    for(len1 = data[0].length; i < len1; i++) {
    		html += "<tr>";
    		   html += "<td>" + (i + 1) + "</td>";
			   html += "<td>" + data[0][i].joinmembername + "</td>";
			   html += "<td>" + data[0][i].joinnumber + "</td>";
			   html += "<td><font>" + data[0][i].joinmoney + "</font>元</td>";
			   if( data[0][0].prizeMoney!=""){//如果中奖金额不为空则显示
				   	var priz = data[0][i].prizeMoney.split(",");
					  html += "<td><font>" +parseFloat(priz[0]).toFixed(2)+ "</font>元</td>";
				  }
			   html += "<td>" +data[0][i].joinDate +"</td>";
		    html += "</tr>";
	    }
	    for(len2 = data[1].length; j < len2; j++) {
	    	totalCount = data[1][j].totalCount;
	    	fenye += '<span class="sp_l">记录' + data[1][j].totalCount+ '条&nbsp;&nbsp;'+ '每页' +  data[1][j].pageSize + '&nbsp;&nbsp;共' + data[1][j].totalPage + '页&nbsp;&nbsp;' + '第' + data[1][j].pageNo  + '页&nbsp;&nbsp;';
    	    fenye += '<span>';
	    	    fenye += '<a href="javascript:;" onclick=\'pagination.first()\'>首页</a>';	
	    	    fenye += '<a href="javascript:;" onclick=\'pagination.prev()\'>上一页</a>';	
				fenye += '<a href="javascript:;" onclick=\'pagination.next()\'>下一页</a>';
			    fenye += '<a href="javascript:;" onclick=\'pagination.last()\'>尾页</a>';
			fenye += '</span>';
	    }
    }
	pagination.init(totalCount);
    oTable.html(html);
	oFenye.html(fenye);
}

// 分页请求
function fenyeRequest(url, param) {
	 $.ajax({
		    type: "post",
		    url: url,
		    async: false,
		    dataType: "json",
		    data: param,
		    error: function(xMLHttpRequest, textStatus, errorThrown){
		    	alert("查询失败");
			},
			
		    success: function (data){
		    	handleFenye(data);
		    }
		 });
}

// 分页对象
var pagination = {
		 url : false,
		 // 总页数
		 pageCount : 1,
		 // 页码
		 pageNo: 1,
		 pageSize: 1,
		 totalCount: 1,
		 url: "/hemai/joinUser.json",
		 param : "codeid=" + parseInt($("#codeid").val()) + "&pageNo=" + parseInt(this.pageNo),
		 request: function(url, param) {
			 this.url = url || this.url;
			 this.param = param || "codeid=" + parseInt($("#codeid").val()) + "&pageNo=" + parseInt(this.pageNo);
			 fenyeRequest(this.url, this.param);
		 },
	     // 下一页 
		 next: function() {
			 this.pageNo++;
			 this.pageNo = this.pageNo > this.pageCount ? parseInt(this.pageCount) : parseInt(this.pageNo);
			 this.param = "codeid=" + parseInt($("#codeid").val()) + "&pageNo=" + parseInt(this.pageNo);
			 this.request(this.url, this.param);
		 },
		 
		 // 上一页
		 prev: function() {
			 this.pageNo--;
			 this.pageNo = this.pageNo < 1 ? 1 : parseInt(this.pageNo);
			 this.param = "codeid=" + parseInt($("#codeid").val()) + "&pageNo=" + parseInt(this.pageNo);
			 this.request(this.url, this.param);
		 },
		 
		 // 首页
		 first: function() {
			 this.pageNo = 1;
			 this.param = "codeid=" + parseInt($("#codeid").val()) + "&pageNo=" + 1;
			 this.request(this.url, this.param);
		 },
		 
		 // 最后一页
		 last: function() {
			 this.pageNo = Math.round(this.pageCount);
			 this.param = "codeid=" + parseInt($("#codeid").val()) + "&pageNo=" + parseInt(this.pageNo);
			 this.request(this.url, this.param);
		 },
		 
		 
		 // 初始化
		 init: function(totalCount) {
			 this.totalCount = totalCount || 1;
			 this.pageCount = (this.totalCount % 10) > 0 ? (this.totalCount / 10) + 1 : (this.totalCount / 10);
		 } 
};

//参与合买金额不够时候弹出此窗口13-11-1 jianglin
function rechargeMessage(message){
	$.blockUI({
    message: $("#rechargeBox"),
    css: {
        left: ($(window).width() - 420) / 2 + 'px',
        top: ($(window).height() - 230) / 2 + 'px',
        backgroundColor:'none',
        border: 'none',
        cursor:'default'
    }
  });
  $("#messageshow").html(message);
}
//点x关闭此窗口 充值rechargeBox
$("#closeBtn2").click(function(){		
	setTimeout(function () {$.unblockUI();}, 187);
});

/*function alterMessage(message){
	var html = '<div class="popBoxBg" id="alertMessage" style="display:none">'
			+		'<div class="popBox p_b_6">'
			+			'<h4><a name="closeBtn" class="closeBtn">×</a>温馨提示</h4>'
			+			'<div class="popCon">'
			+				'<br/><br/>'
			+				'<p class="w_200">'
			+					'<b id="messageContent"></b>'
			+					'<br />'
			+					'<a href="javascript:void(0);" name="closeBtn">确定</a>'
			+				'</p>'
			+				'<br/><br /><br />'
			+			 '</div>'
			+	    ' </div>'
			+    '</div';
	
	$.blockUI({
	    message: $(html),
	    css: {
	        left: ($(window).width() - 420) / 2 + 'px',
	        top: ($(window).height() - 230) / 2 + 'px',
	        backgroundColor:'none',
	        border: 'none',
	        cursor:'default'
	    }
    });
	
	$("a[name ='closeBtn']").click(function() {
		$.unblockUI();
	});
	
  $("#messageContent").html(message);
}*/
