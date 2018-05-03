
var $finalForm = null;
var declarationDefault = "中奖宣言！(30字以内)";
$(function(){
	
	$("#allowFollowBtn").click(function(){
		if($("#allowFollowBtn").is(":checked")){
			$("#declarationTxt").show();
		}else{
			$("#declarationTxt").hide();
		}
	});
	$("#declarationTxt").focus(function(){
		if($(this).text() == declarationDefault){
			$(this).text("");
		}
	}).blur(function(){
		if($(this).text() == ""){
			$(this).text(declarationDefault);
		}
	}).bind("copy cut paste",function(e){
		if($(this).val().length > 30){
			return false;
		}
    }).keyup(function(){
    	if($(this).val().length > 30){
			$(this).val($(this).val().substring(0,30));
		}
	});
	/**
	 * 数字彩表单提交
	 */
	submitForm();
	
	/**
	 * 竞彩单式上传表单提交
	 */
	$("#jcdsBtnSubmit").click(function (){
		if($("#agree").is(":checked")){
			jcdsLotteryFormSubmit();
		}else{
			alert("您好，请阅读条款，并同意！");
			return false;
		}
	});
	
	$("#closeLoginBtn").click(function(){
		$("#username").val("");
		$("#password").val("");
		$("#loginError").html("");
		setTimeout(function () {$.unblockUI();}, 187);
    });
	
	$("#cz").html($(".lottery_t b-a0c0e9 h6 img").attr("alt"));
});

/**
 * 彩种提交专用登录
 */
function lotterySubmitLogin(reloadOrNot){
	reloadOrNot = reloadOrNot || false;
	$("#loginSubmit").unbind("click");
	$("#loginSubmit").click(function(){
    	$("#loginError").hide();
		if($("#username").val() == ""){
			$("#loginError").html("请输入用户名。").show();
			return false;
		}
		if($("#password").val() == ""){
			$("#loginError").html("请输入密码。").show();
			return false;
		}
		$.ajax({
		    type: "post",
		    url: "/login",
		    data: eval("({'username':'" + $("#username").val() + "','password':'" + $("#password").val() + "','flag':'1'})"),
		    async: false,
		    dataType: "json",
		    loginError: function(xMLHttpRequest, textStatus, loginErrorThrown){
		    	$("#loginError").html("登录失败请重试。").show();
			},
		    success: function (data){
		    	//登录成功
		    	if(data.status == "0") {
		    		if(data.isDomain){
						location.href = "http://" + data.stationUrl + "/?u=" + data.u;
					}else{
						$.unblockUI();
						var html = data.userName + "，欢迎来到" + data.slwName +
						"！您的可用余额：<font color='red' id='currAmount'>" + formatCurrency(data.slwAccount) +  
						"</font>&nbsp;<a class='aBg' href='/account/index.jhtml?flag='" + data.flag + ">【我的账户】</a>" +
						"&nbsp;<a class='aBg' href='/account/wy/recharge.jhtml?ron=1'>【彩店充值】</a>" + 
						"&nbsp;<a id='loginOut_' class='aBg' style='cursor:pointer;' onclick='loginOut();'>【安全退出】</a>" +
						"<input type='hidden' id='memberid' value='"+data.membership.numberId+"'/>" + 
						"<input type='hidden' id='numberUsernaeme' value='"+data.userName+"'/>"+
		               	"<a href='/account/letterList.jhtml' title='' ><img src='../../images/account/icoLetter.png' alt='ico' style='vertical-align:middle;margin-top:-2px;'/></a>"
						+ "<a href='/account/letterList.jhtml' title=''>站内信</a>"
						+ "<span id='letter' style='color:red'></span>";
						$("#header").html(html);
						$("b[name=currAmount]").html(formatCurrency(data.slwAccount));
						if( $("#agree").length > 0 ){
							if($("#agree").is(":checked") ){
								if( $("#loginBtn").length > 0 ){
									$("#loginBtn").attr("content","1");
								}
								if( $("#loginRight").length > 0 ){
									$("#loginRight").attr("content","1");
								}
								lotteryFormSubmit();
							}else{
								alert("您好，请阅读条款，并同意！");
								return false;
							}
						}else{
							if( $("#loginBtn").length > 0 ){
								$("#loginBtn").attr("content","1");
							}
							if( $("#loginRight").length > 0 ){
								$("#loginRight").attr("content","1");
							}
						}
						if(reloadOrNot){
							window.location.reload();
						}
					}
		    	}else if(data.status == "2") {
		    		
    		    	var form = document.createElement("form");
    		    	document.body.appendChild(form);
    		    	var mobileInput = document.createElement("input");
    		    	mobileInput.type = "hidden";
    		    	mobileInput.name = "mobile";
    		    	mobileInput.value = data.busiParams.mobile;
    		    	form.appendChild(mobileInput);
    		    	
    		    	var slwIdInput = document.createElement("input");
    		    	slwIdInput.type = "hidden";
    		    	slwIdInput.name = "slwId";
    		    	slwIdInput.value = data.busiParams.slwId;
    		    	form.appendChild(slwIdInput);
    		    	
    		    	var secretKeyInput = document.createElement("input");
    		    	secretKeyInput.type = "hidden";
    		    	secretKeyInput.name = "secretKey";
    		    	secretKeyInput.value = data.secretKey;
    		    	form.appendChild(secretKeyInput);
    		    	
    		    	form.action = "/account/toBind";
    		    	form.method = "POST";
    		    	form.submit();
		    		
		    	}else{
		    		$("#loginError").html(data.message).show();
		    	}
		    }
		});
	});
	
}

/**
 * 按彩种类别验证投注号码
 * @returns {Boolean}
 */
function lotteryFormSubmit() {

	if($("#playType").val()=='jc'){
    	var serverTime = $("#closeTime").val();
        $("#danMaList dd").each(function() {
        	if(!$(this).is(":hidden")){
            	var stopBuyTime = $(this).attr("saleCloseTime");
            	if(isOver(serverTime,stopBuyTime)){
        			alterMessage("您好，有过期比赛，请重新投注!");
        			document.location.reload();
            	}        		
        	}
        });
	}
	
	if( $("input[name=addRadio]").length > 0 ){
		var radio = $("input[name=addRadio]:checked").val();
		/**
		 * 追号验证是否选择追号期次
		 */
		if( radio == "4" || radio == "2" ){
			if( $("input[name=checked_zhui]").length > 0 && $("input[name=checked_zhui]:checked").length == 0 ){
				alterMessage("投注异常,请选择您要投注的期次!");
				return false;
			}else if( $("input[name='addCheck']").length > 0 && $("input[name='addCheck']:checked").length == 0 ){
				alterMessage("投注异常,请选择您要投注的期次!");
				return false;
			}
			testFormSubmit( $('#plan_code').val().length );
		}else if( radio == "3" ){
			testFormSubmit( $("#hemaiFormId input[name='hemaidetail']").val().length );
		}else if( radio == "5" ){
			testFormSubmit( $('#plan_code').val().length );
		}else{
			testFormSubmit( $('#betCodes').val().length );
		}
	}else if( $("#confirm_hm_state").length > 0 ){
		testFormSubmit($("#confirm_hm_state").val().length);
	}else{
		testFormSubmit( $('#betCodes').val().length );
	}
}

/**
 * 验证是否选择号码
 * @param fn true已经选号；false未选号。
 */
function testFormSubmit( fn ){
	var result = $("#loginRight").attr("content") == "1" || $("#loginBtn").attr("content") == "1" ? true : false;
	if( result ){
		var html = "<a href='/account/index.jhtml' class='dlBtn'>我的账户</a>" +
				   "<a href='/account/zjjl.jhtml' id='jiang'>中奖记录</a>";
				$("#loginBox_first").html(html);
	}
	if( fn > 0 ){
		ajaxFormSubmit();
	}else{
		alterMessage("投注异常,请选择您要投注的号码!");	
		return;
	}
}

function jcdsLotteryFormSubmit() {
	if($("#licenseId").val()=='227'||$("#licenseId").val()=='228'){
    	var serverTime = $("#closeTime").val();
    	var stopBuyTime = getTime2($("#stopBuyTime").html())+"00";
    	if(isOver(serverTime,stopBuyTime)){
			alterMessage("有过期比赛，请重新投注!");
			document.location.reload();
    	}else{	
    		lotteryFormSubmit();    		
    	}
	}
}

/**
 * 表单提交
 */
function ajaxFormSubmit(){
	$.ajax({
		type:'post',
	    url: "/common/getCurrAmount.json",
	    async: false,
	    dataType: "json",
	    success: function (data){
//    		alert("isLogin："+data.isLogin);
	    	if(data.isLogin){
	    		
	    		//添加判断
	    		try {
	    			
	    			if(data.userType == '1'){
	    				var $choseType = $("#choseYHType");
	    				
	    				if(typeof $choseType != 'undefined' && typeof $choseType.val() != 'undefined' && $choseType.val() != '0'  ){
	    					$.unblockUI();
		    				setTimeout(function(){
		    					alert("发单账户只能进行 平均优化 ，请刷新重试！");
							}, 500);
		    				return;
	    				}

	    			}
	    			
	    		} catch (e) {
	    			
	    		}
	    		
	    		var currAmount = data.currAmount;
	    		var buyAmount = $('#betPrice').val();
	    		var radio = $.trim( $("input[name=addRadio]:checked").val() );
	    		var licenseId = $("#licenseId").val();
	    		//奖金优化彩种id获取
	    		if( $("#licenseDescId").length > 0 ){
	    			licenseId = $("#licenseDescId").val();
	    		}
	    		
	    		/**
	    		 * 竞彩合买标识 有此对象值为1为合买
	    		 */
	    		var hm_state = $("#confirm_hm_state").val();
	    		
	    		/**
	    		 * 竞彩投注框
	    		 */
	    		if( ( licenseId == "227" || licenseId == "228" ) && radio.length == 0 ){
    				$("#isMergeBtn").attr("checked",true);
	    			//判断为竞彩合买
	    			if( hm_state == "1" ){
	    				$("#allowFollowBtn").attr("checked",false).hide().next("span").hide();
	    				var hm_form = "<td>合买设置</td><td><div class=\"chose_hm_box cf\" style=\"border:0;\">" +
	    						"<div class=\"chose_hm_d cf\"><label>发起标题：</label><span>" +
	    						"<input id=\"hemaititle\" name=\"hemaititle\" type=\"text\" value=\"我要中大奖\"/>" +
	    						"<em id=\"showPromptTitleId\">您还可以输入15个字符</em></span></div>" +
	    						"<div class=\"chose_hm_d cf\"><label>方案描述：</label><span>" +
	    						"<textarea id=\"hemaidesc\" name=\"hemaidesc\">大家一起来合买!</textarea>" +
	    						"<em id=\"showPromptDescId\">您还可以输入42个字符</em></span></div>" +
	    						"<div class=\"chose_hm_d cf\"><label>保密设置：</label>" +
	    						"<span id=\"bmsz\" class=\"bm\">" +
	    						"<a val=\"0\" href=\"javascript:;\" class=\"sele\"><b>完全公开</b></a>" +
	    						"<a val=\"1\" href=\"javascript:;\"><b>对参与者公开</b></a>" +
	    						"<a val=\"2\" href=\"javascript:;\"><b>开奖后可见</b></a></span></div>" +
	    						"<div class=\"chose_hm_d cf\"><label>中奖佣金：</label>" +
	    						"<span id=\"zjyj\" class=\"zjyj\">" +
	    						"<a val=\"0.00\" href=\"javascript:;\"><b>无</b></a>" +
	    						"<a val=\"0.01\" href=\"javascript:;\"><b>1%</b></a>" +
	    						"<a val=\"0.02\" href=\"javascript:;\"><b>2%</b></a>" +
	    						"<a val=\"0.03\" href=\"javascript:;\"><b>3%</b></a>" +
	    						"<a val=\"0.04\" href=\"javascript:;\"><b>4%</b></a>" +
	    						"<a val=\"0.05\" href=\"javascript:;\"><b>5%</b></a>" +
	    						"<a val=\"0.06\" href=\"javascript:;\"><b>6%</b></a>" +
	    						"<a val=\"0.07\" class=\"sele\" href=\"javascript:;\"><b>7%</b></a>" +
	    						"<a val=\"0.08\" href=\"javascript:;\"><b>8%</b></a>" +
	    						"<a val=\"0.09\" href=\"javascript:;\"><b>9%</b></a>" +
	    						"<a val=\"0.1\" href=\"javascript:;\"><b>10%</b></a>" +
	    						"</span><p>【盈利提成 = （税后奖金 - 方案金额） × 提成比例】</p></div>" +
	    						"<div class=\"chose_hm_d cf\"><!-- 总份数 --><label>我要分成：</label><span>" +
	    						"<input id=\"sharenumber\" name=\"sharenumber\" type=\"text\" value=\"\" class=\"ipt\" />&nbsp;份" +
	    						"<font>每份：<b id=\"sharePrice\">1</b>元</font>每份至少1元,且必须能整除到分</span>" +
	    						"<span class='mfje' id=\"ErrorShareInfo\" style=\"display: none;\"></span></div>" +
	    						"<div class=\"chose_hm_d cf\"><label>我要认购：</label><span>" +
	    						"<input id=\"buynumber\" name=\"buynumber\" type=\"text\" value=\"\" class=\"ipt\" />&nbsp;份" +
	    						"<font>共计：<b id=\"buynumberPrice\">0</b>元</font><font id=\"defaultBuy\" style=\"color:#626262;font-weight:normal;\">默认购买5%</font>，即<font id=\"buyNum\" style=\"padding: 0\">0</font>份</span>" +
	    						"<span class=\"mfje\" id=\"ErrorBuyInfo\" style=\"display: none;\"></span></div>" +
	    						"<div class=\"chose_hm_d cf\"><label>保底：</label><span>" +
	    						"<input id=\"baodinumber\" name=\"baodinumber\" type=\"text\" value=\"\" class=\"ipt\" />&nbsp;份" +
	    						"<font>共计：<b id=\"baodinumberPrice\">0</b>元</font><font id=\"baodiPercent\">0%</font></span>" +
	    						"<span class=\"mfje\" id=\"ErrorBaodiInfo\" style=\"display: none;\"></span><label class=\"fully clearfix\"><input type=\"checkbox\" name=\"baodiAll\" id=\"baodiAll\" onclick=\"selBaodiAll();\" value=\"\">全额保底</label></div>" +
	    						"<p style=\"text-align:left;margin-left:90px;\">注：方案进度+保底＞＝100%，即可出票</p></div></td>";
	    				$("#confirm_message_hm").html(hm_form);
	    				viewPayInfo();
	    				initEvent();
	    				$("#confirm_submit").html("<input id='submitForm' class='qrgmBtn f-l' type='button'>" +
						"<a href='javascript:;' id='tab_div' class='f-l'>返回修改&gt;&gt;</a><div class='clear'></div>");
	    				$("#submitForm").die("click").live("click",function (){
		    					if ( !$("#agree").is(":checked") ) {
			    					openMessage("您好，请同意购彩协议！");
			    					return false;
			    				}
	    						if(hmFormSubmitEvent() == false){
	    							return false;
	    						}else{
			    					var price = $("#buynumber").val() * $("#sharePrice").html();
			    					if( currAmount >= price ){
			    						$("#isMerge").remove();
					    				$("#allowFollow").remove();

			    						if($("#isMergeBtn").is(":checked")){
					    					$("<input type='hidden' id='isMerge' name='isMerge' value='1' />").appendTo($("#hemaiFormId"));
					    				}else{
					    					$("<input type='hidden' id='isMerge' name='isMerge' value='0' />").appendTo($("#hemaiFormId"));
					    				}
			    						$("#hemaiFormId").submit();
			    					}else{
			    						$("#jc_recharge").die("click").live("click",function (){
			    							window.open("/account/wy/recharge.jhtml?ron=1");
			    						});
			    						$.blockUI({
			    							message:$("#jc_confirm_message").clone(),
			    							css:{
			    								left: $(window).width() / 3 + 'px',
			    								top: $(window).height() / 4 + 'px',
			    								backgroundColor:'none',
			    								border: 'none',
			    								cursor:'default'
			    							}
			    						});
			    						return false;
			    					}
	    						};
	    				});
	    			}else{
	    				$("#allowFollowBtn").show().next("span").show();
	    				$("#confirm_message_hm").empty();
		    			if(currAmount >= buyAmount){
		    				$("#confirm_submit").html("<input id='submitForm' class='qrgmBtn f-l' type='button'>" +
		    						"<a href='javascript:;' id='tab_div' class='f-l'>返回修改&gt;&gt;</a><div class='clear'></div>");
		    			}else{
		    				$("#confirm_submit").html("<b>您的账户余额不足，请充值后完成本订单的支付。</b><input id='cancelSubmitForm' class='ljczBtn f-l' type='button'>" +
		    						"<a href='javascript:;' id='tab_div' class='f-l'>返回修改&gt;&gt;</a></a><div class='clear'></div>");
		    			}
		    			//竞彩代购提交
		    			$("#submitForm").die("click").live("click",function(){
		    				if ( !$("#agree").is(":checked") ) {
		    					openMessage("您好，请同意购彩协议！");
		    					return false;
		    				}
		    				$.unblockUI();
		    				
		    				$finalForm.appendTo("body");

		    				$("#isMerge").remove();
		    				$("#allowFollow").remove();
		    				$("#declaration").remove();
		    				if($("#allowFollowBtn").is(":checked")){
		    					$("<input type='hidden' id='allowFollow' name='allowFollow' value='1' />").appendTo($finalForm);
		    					if($("#declarationTxt").val() != declarationDefault){
			    					$("<input type='hidden' id='declaration' name='declaration' value='" +$("#declarationTxt").val()+ "' />").appendTo($finalForm);		    						
		    					}
		    				}else{
		    					$("<input type='hidden' id='allowFollow' name='allowFollow' value='0' />").appendTo($finalForm);
		    				}
		    				if($("#isMergeBtn").is(":checked")){
		    					$("<input type='hidden' id='isMerge' name='isMerge' value='1' />").appendTo($finalForm);
		    				}else{
		    					$("<input type='hidden' id='isMerge' name='isMerge' value='0' />").appendTo($finalForm);
		    				}
		    				if( $finalForm.find("input[name=expectBonus]").length > 0 ){
		    					$finalForm.find("input[name=expectBonus]").remove();
		    				}
		    				if( $("#liLunJinE").length > 0 ){
		    					$("<input type='hidden' name='expectBonus' value='" + $("#liLunJinE").html() + "' />").appendTo($finalForm);
		    				}
		    				$("#finalForm").submit();
		    				if( $("#tab_div").length > 0 ){
		    					$("#tab_div").click();
		    				}
		    			});
	    			}
	    			
	    			/**
	    			 * 总金额
	    			 */
	    			var price = hm_state == "1" ? $("#jinE").html() : $("#betPrice").val();
	    			
	    			/**
	    			 * 方案注数
	    			 */
	    			var num = hm_state == "1" ? $("#betSum").html() : $("#betNum").val();
	    			
	    			$("#confirm_lotteryMoney").html( "￥" + formatCurrency(currAmount) );
	    			/**
	    			 * 竞彩子玩法
	    			 */
	    			var systemId = hm_state == "1" ? $("#subPlayId").val() : $("#systemId").val();
	    			/**
	    			 * 方案倍数
	    			 */
	    			var mult = hm_state == "1" ? $("#beiTou").val() : $("#mult").val();
	    			/**
	    			 * 彩种玩法
	    			 */
	    			var typeDesc = $("#systemTypeDesc").val();
	    			if( hm_state == "1" ){
	    				typeDesc = getLotteryTypeName( licenseId , systemId ) + "发起合买";
	    			}
	    			$("#confirm_desc").html(typeDesc);
	    			
	    			/**
	    			 * 过关方式
	    			 */
	    			var array_gg = new Array();
	    			
	    			/**
	    			 * 竞彩主客队信息
	    			 */
	    			var array = new Array();
	    			
	    			/**
	    			 * 竞彩确认框标头
	    			 */
	    			var tab_header = $("#confirm .tabLCont .tabL thead");
	    			
	    			//在线过滤
	    			if( $("#submitFormBtnId").length > 0 ){
	    				$("#allowFollowBtn").attr("checked",false).hide().next("span").hide();
	    				var schInfoId = $("#schInfoId tr");
	    				if( systemId == 5 ){
	    					schInfoId = $("#schInfoId tr:even");
	    				}
	    				switch(licenseId){
		    				case "227":{
		    					if( systemId == 1 || systemId == 6 ){
		    						//对阵信息
		    						schInfoId.each(function (){
		    							var td = $(this).find("td");
					    				var html = "<tr><td>" + td.eq(0).text() + "</td><td style='width:180px;'>" +
										"<span>" + td.eq(1).text() + "</span> VS <span>" + td.eq(3).text() + "</span></td>" +
										"<td>" + td.eq(2).text() + "</td></tr>";
		    							array.push(html);
		    						});
		    						tab_header.html("<tr><th>赛事 </th><th style='width:180px;'>对阵 </th><th>让球数 </th></tr>");
		    					}else{
		    						schInfoId.each(function (){
			    						var td = $(this).find("td");
		    							var match = td.eq(1).text().split("vs");
					    				var html = "<tr><td style='width:163px;'>" + td.eq(0).text() + "</td><td style='width:354px;'>" +
										"<span>" + match[0] + "</span> VS <span>" + match[1] + "</span></td></tr>";
		    							array.push(html);
		    						});
		    						tab_header.html("<tr><th style='width:163px;'>赛事 </th><th style='width:354px;'>对阵 </th></tr>");
		    					}
		    					break;
		    				}
		    				case "228":{
		    					if( systemId == 5 ){
		    						schInfoId.each(function (){
			    						var td = $(this).find("td");
		    							var match = td.eq(1).text().split("vs");
					    				var html = "<tr><td style='width:163px;'>" + td.eq(0).text() + "</td><td style='width:354px;'>" +
										"<span>" + match[0] + "</span> VS <span>" + match[1] + "</span></td></tr>";
		    							array.push(html);
		    						});
		    					}else{
		    						schInfoId.each(function (){
			    						var td = $(this).find("td");
					    				var html = "<tr><td style='width:163px;'>" + td.eq(0).text() + "</td><td style='width:354px;'>" +
										"<span>" + td.eq(1).text() + "</span> VS <span>" + td.eq(2).text() + "</span></td></tr>";
		    							array.push(html);
		    						});
		    					}
	    						tab_header.html("<tr><th style='width:163px;'>赛事 </th><th style='width:354px;'>对阵 </th></tr>");
		    					break;
		    				}
	    				}
	    				
	    				/**
	    				 * 过滤倍数
	    				 */
	 	    			mult = $("#totalMultipleId").val();
	 	    			
		    			/**
		    			 * 过关方式
		    			 */
	 	    			$("#passTypeId option:selected").each(function (){
	 	    				array_gg.push($(this).html());
	 	    			});
	 	    			/**
	 	    			 * 过滤合买总金额，总注数
	 	    			 */
	    				if( hm_state == "1" ){
	    					price = $("#filbetAmtId").html();
	    					num = $("#filbetNumId").html();
	    				}
	    				
	    			}else if($("#gotoBetFormId").length > 0){
	    				$("#allowFollowBtn").attr("checked",false).hide().next("span").hide();
	    				/**
	    				 * 优化对阵信息
	    				 */
	    				if( licenseId == "227" ){
		    				if( systemId == 1 || systemId == 6 ){
		    					$("#schInfoId > tr").each(function (){
			    					var td = $(this).find("td");
				    				var html = "<tr><td>" +td.eq(0).text() + "</td><td style='width:180px;'>" +
												"<span>" + td.eq(1).text() + "</span> VS <span>" + td.eq(3).text() + "</span></td><td>" +
												td.eq(2).text() +
												"</td></tr>";
				    				array.push(html);
			    				});
			    				tab_header.html("<tr><th>赛事 </th><th style='width:180px;'>对阵 </th><th>让球数</th></tr>");
		    				}else{
		    					$("#schInfoId > tr").each(function (){
			    					var td = $(this).find("td");
				    				var html = "<tr><td style='width:152px;'>" + td.eq(0).text() + "</td><td style='width:348px;'>" +
												"<span>" + td.eq(1).text() + "</span> VS <span>" + td.eq(2).text() + "</span></td></tr>";
				    				array.push(html);
			    				});
			    				tab_header.html("<tr><th>赛事 </th><th style='width:180px;'>对阵 </th></tr>");
		    				}
	    				}else if( licenseId == "228" ){
	    					if ( systemId == 5 ) {	/* Added by Luochang for 篮球奖金优化展示  at 2013/10/31*/
	    						$("#schInfoId > tr").each(function (){
			    					var td = $(this).find("td");
				    				var html = "<tr><td style='width:152px;'>" + td.eq(0).text() + "</td><td style='width:348px;'>" +
												"<span>" + td.eq(1).text() + "</span> VS <span>" + td.eq(2).text() + "</span></td></tr>";
				    				array.push(html);
			    				});
			    				tab_header.html("<tr><th>赛事 </th><th style='width:180px;'>对阵 </th></tr>");
	    					} else {
		    					$("#lqschInfoId > tr").each(function (){
				    				var td = $(this).find("td");
					    			var html = "<tr><td>" +td.eq(0).text() + "</td><td style='width:180px;'>" +
												"<span>" + td.eq(1).text() + "</span> VS <span>" + td.eq(3).text() + "</span></td><td>" +
												td.eq(2).text() +
												"</td></tr>";
					    			array.push(html);
				    			});
				    			tab_header.html("<tr><th>赛事 </th><th style='width:180px;'>对阵 </th><th>让分数</th></tr>");
	    					}
	    				}
	    				/**
	    				 * 优化倍数
	    				 */
	    				mult = "*";
	    				
	    				/**
	    				 * 优化过关方式
	    				 */
//	    				var betDetailDesc = $("#betDetailDesc").val();
	    				var betDetailDesc = $("#playTypeId").val();
	    				$.each(betDetailDesc.replace(new RegExp("C|c","gm"),"串").split(",") , function (index , value){
	    					array_gg.push(value);
	    				});
	 	    			/**
	 	    			 * 优化单合买总金额，总注数
	 	    			 */
	    				if( hm_state == "1" ){
	    					price = $("#orderMoneyId").html();
	    					num = 0;
	    					$("#pBetAreaId tr td[name=betNum]").each(function (index,value){
	    						num += parseInt($(this).html(),10);
	    					});
	    				}
	    				
	    			}else if( $("#fileuplodidUploader").length > 0 ){
	    				/** 竞彩单式上传赛程显示 by:guoxiaosheng 2013/11/29**/
	    				$(".lotteryMainL input[name='jczq']:checked").each(function (){
	    					var match = $(this).next("label").children("span");
		    				var html = "<tr><td style=\"width:75px;\">" 
		    							+ $(this).next("label").contents().filter(function() {return this.nodeType == 3;}).text() 
	    						  		+ "</td><td style=\"width:170px;\">" 
	    						  		+ "<span>" + match.eq(0).html() + "</span> VS <span>" + match.eq(1).html() + "</span></td></tr>";
		    				array.push(html);
	    				});
	    				$(".dierRadioBox input[type='radio']:checked").each(function (){
	    					array_gg.push($(this).next("label").html());
	    				});
	    				tab_header.html("<tr><th style=\"width:75px;\">赛事 </th><th style=\"width:170px;\">对阵 </th></tr>");
	    				/** 竞彩单式上传赛程显示 by:guoxiaosheng 2013/11/29**/
	    			}
	    			//首页竞彩代购赛程展示
	    			else if( $(".zcIndexBox.m-t").length > 0 ){
	    				$(".zcIndexBox.m-t table:visible tbody tr:has(td.tdBg.tdBgOn)").each(function ( index , value ){
	    					var td = $(this).children("td");
	    					var html = "<tr><td style=\"width:75px;\">" 
    							+ td.eq(1).html()
						  		+ "</td><td style=\"width:180px;\">" 
						  		+ "<span>" + td.eq(4).html() + "</span> VS <span>" 
						  		+ td.eq(6).html() + "</span></td><td>" 
						  		+ td.eq(5).html()
						  		+ "</td></tr>";
						  	array.push(html);
	    				});
	    				$(".zcIndexBox.m-t table:visible tbody tr input[type='checkbox']:checked").each(function (){
	    					array_gg.push($(this).next("label").html());
	    				});
	    				tab_header.html("<tr><th>赛事 </th><th style='width:180px;'>对阵 </th><th>让分数</th></tr>");
	    			}else{
	    				/**
	    				 * 代购投注与合买赛程展示
	    				 */
	    			    if (systemId == 7 || systemId == 8) {
	    			        var html="";
	    			        var bh, qd;
	    				    var vls = $("#betCodes").val().replaceAll(",", "_");
	    				    vls = vls.split("_");
	    				    for (var i = 0; i < vls.length; i++) {
	    				        bh = vls[i];
	    				        qd = vls[i + 1];
	    				        i = i + 1;
	    				        html +=  "<tr><td >" + bh + "</td><td>" + qd + "</td></tr>";
	    				    }
	    				    array.push(html);
	    				}
	    				else if( systemId == 5 ){
		    				$("#betAreaId > tr").each(function (){
		    					var match = $(this).find("td");
		    					var match_a = match.eq(4).find("a");
		    					var match_array = new Array();
		    					for( var i = 0 ; i < match_a.length ; i++ ){
		    						match_array.push(match_a.eq(i).html());
		    					}
		    					var dan = match.eq(5).html().length > 0 ? "√" : "X";
			    				var html = "<tr><td style=\"width:75px;\">" + match.eq(0).html() + "</td><td style=\"width:170px;\">" +
											"<span>" + match.eq(1).html() + "</span> VS <span>" + match.eq(3).html() + "</span></td><td style=\"width:240px;\">" +
											match_array.join(",") +
											"</td><td style=\"width:30px;\">" + dan + "</td></tr>";
			    				array.push(html);
		    				});
		    				mult = $("#beiTouId").val();
		    			}else{
			    			$("#danMaList dd:visible").each(function (){
			    				var match = $(this).find("p:eq(0) span:eq(1)").html().split("vs");
			    				var match_text = $(this).find("p:eq(1) em:visible").map(function (){
			    					return $(this).html() + "(" + $(this).attr("odd") + ")";
			    				});
			    				var match_text_ = "";
								for(var i = 0 ; i < match_text.length ; i++ ){
									match_text_ += match_text[i];
								}
								//判断选择胆码
								var dan = $(this).find("p:eq(1) span:eq(0) input[type=checkbox]:checked").length > 0 ? "√" : "X";
			    				var html = "<tr><td style=\"width:75px;\">" + $(this).find("p:eq(0) span:eq(0)").text() + "</td><td style=\"width:170px;\">" +
			    							"<span>" + match[0] + "</span> VS <span>" + match[1] + "</span></td><td style=\"width:240px;\">" +
			    							match_text_ +
			    							"</td><td style=\"width:30px;\">" + dan + "</td></tr>";
			    				array.push(html);
			    			});
		    			}
	 	    			
		    			//混合过关过关方式
		    			if( systemId == 5 ){
		    				$("#ggTypeAreaId input[type='checkbox']:checked").each(function (){
		    					array_gg.push($(this).next("label").text());
		    				});
		    			}else{
			    			//单关
			    			if($("#danguan").is(":visible")){
			    				array_gg.push($("input[name='danChuan']").next("label").text());
			    			}
			    			//自由
			    			$("input[name='zyChuan']:checked").each(function (){
			    				array_gg.push($(this).next("label").text());
			    			});
			    			//组合
			    			$("input[name='zhChuan']:checked").each(function (){
			    				array_gg.push($(this).next("label").text());
			    			});
		    			}
		    			if ( systemId == 7 || systemId == 8 ) {
		    			    tab_header.html("<tr><th >编号</th><th >球队</th></tr>");
		    				$(".tabRCont").hide();
		    			} else {
		    				$(".tabRCont").show();
		    				tab_header.html("<tr><th style=\"width:75px;\">赛事 </th><th style=\"width:170px;\">对阵 </th><th style=\"width:240px;\">您的选择 </th><th style=\"width:30px;\">胆</th></tr>");
		    			}
		    			$("#confirm_money_me").html("￥" +  formatCurrency(price));
	    			}
	    			
	    			array.push("<tr><td colspan='" + $("#confirm .tabLCont .tabL thead tr th").length + "' style='padding: 5px 0;*+width:100%;'>" +
						"<span class='c-red'>注：页面中投注固定奖金仅供参考，实际奖金以店主出票时刻奖金为准。</span></td></tr>");
		    		$("#confirm .tabLBody .tabL tbody").html(array.join(""));
	    			
 	    			/**
 	    			 * 倍数
 	    			 */
 	    			$("#confirm_mult").html(mult);
 	    			
	    			/**
	    			 * 过关方式
	    			 */
	    			$("#gg_type").html(array_gg.join(","));
	    			
    				/**
    				 * 方案总金额
    				 */
	    			$("span[name='confirm_money']").html("￥" + formatCurrency(price));
	    			
	    			/**
	    			 * 合买分成份数展示(默认显示值)
	    			 */
	    			if(hm_state == "1"){
	    				var sharenumber = parseInt(price,10);
	    				var buynumber =  Math.ceil(new Number(sharenumber * 0.05));
	    				$("#sharenumber").val(sharenumber);
	    				$("#sharePrice").html("1.00");
	    				$("#buynumber").val(buynumber);
	    				$("#buyNum").html(buynumber);	    				
	    				$("#buynumberPrice").html(formatCurrency(parseFloat(buynumber).toFixed(2)));
	    				$("#baodinumber").val(0);
	    				$("#confirm_money_me").html("￥" + formatCurrency(parseFloat(buynumber).toFixed(2)));
	    			}else{
	    				$("#confirm_money_me").html("￥" + formatCurrency(price));
	    			}
	    			
	    			if ( systemId == 7 || systemId == 8 ) {
	    				$("#confirm_message").html(
		                        "<p>方案注数<span class='c-red'>" + num + "</span>注，倍数<span class='c-red'>" + mult + 
		                        "</span>倍，总金额<span class='c-red'>￥" + formatCurrency(price) + "</span>元。</p>"
		                );
	    			}
	    			else {
		    			/**
		    			 * 方案信息
		    			 */
		    			$("#confirm_message").html(
		    					"<p>您选择的方案为" + ( array.length - 1 ) + "场比赛(" + array_gg.join(",") + ")的过关方式。</p>" +
		                        "<p>方案注数<span class='c-red'>" + num + "</span>注，倍数<span class='c-red'>" + mult + 
		                        "</span>倍，总金额<span class='c-red'>￥" + formatCurrency(price) + "</span>元。</p>"
		                );
	    			}
	    			/**
	    			 * 弹出确认窗口
	    			 */
	    			var css = "";
	    			if( $(".main.lottery.bg-w").length > 0 ){
	    				css = ".main.lottery.bg-w";
	    			}else if( $("#submitFormBtnId").length > 0 ){
		    			css = ".filter_main.cf";
		    			$("#up,#down").show();
	    			}else if( $("#gotoBetFormId").length > 0 ){
	    				css = ".main.jczq_jjyh.cf";
	    				if($(".parent").length > 0 ){
	    					css = ".parent";
	    				}
	    			}
	    			//首页竞彩确认页面切换
	    			else if( $("#jctab").length > 0 ){
	    				css = ".main.bg-w";
	    			}    			
	    			$("#confirm").insertAfter($(css));
	    			$("#confirm").show().siblings(css).hide();
	    			$("#tab_div").live("click",function (){
	    				if( $("#up,#down").length > 0 ){
	    					$("#up,#down").hide();
	    				}
	    				$("#confirm").hide().siblings(css).show();
	    			});

	    			/**
	    			 * 当前页面打开成功窗口
	    			 */
//	    			$("#lotteryBuyForm").removeAttr("target");
	    			
	    		}else if( radio == 2 || radio == 4 || radio == 5 ){
//	    			$("#currAmount,[name='currAmount']").html( "￥" + formatCurrency(currAmount) );
    				buyAmount = $("#all_money").val();
    				if( currAmount >= buyAmount ){
    					$("#zhuihao_submit").html("<a href='javascript:void(0);' id='submitForm'>确认投注</a>");
    				}else{
    					$("#zhuihao_submit").html("<b>您的账户余额不足，请充值后完成本订单的支付。</b><br /><a href='/account/wy/recharge.jhtml?ron=1'>立即充值</a>");
    				}
    			}else{
    				$("#szc_confirm_balance").html( "￥" + formatCurrency(currAmount) );
    				if(radio == 3){
	    				buyAmount = parseFloat($('#buynumberPrice').html()) + parseFloat($('#baodinumberPrice').html());
	    			}
		    		if(currAmount >= buyAmount){
		    			$("#szc_confirm_submit").html("<input id='submitForm' class='ljtzBtn f-l' type='button'>" +
			    					"<a href='javascript:;' class='f-l' name='closeBtn'>返回修改&gt;&gt;</a>" +
			    					"<div class='clear'></div>").prev("b").remove();
		    		}else{
		    			$("#szc_confirm_submit").html("<input id='cancelSubmitForm' class='ljczBtn f-l' type='button'>" +
			    					"<a href='javascript:;' class='f-l' name='closeBtn'>返回修改&gt;&gt;</a>" +
			    					"<div class='clear'></div>").prev("b").remove();
		    			$("#szc_confirm_submit").before("<b>您的账户余额不足，请充值后完成本订单的支付。</b>");
		    		}
	    		}
	    		lotteryBuyMessage( radio );
	    		$("#allowFollow").remove();
	    		$("#declaration").remove();
				if($("#allowFollowBtn").is(":checked") && (radio == 1 || radio == "")){
					$("<input type='hidden' id='allowFollow' name='allowFollow' value='1' />").appendTo($finalForm);
					if($("#declarationTxt").val() != declarationDefault){
						$("<input type='hidden' id='declaration' name='declaration' value='" +$("#declarationTxt").val()+ "' />").appendTo($finalForm);
					}
				}else{
					$("<input type='hidden' id='allowFollow' name='allowFollow' value='0' />").appendTo($finalForm);
				}
	    	}else{
	    		loginPop();
	    		lotterySubmitLogin();
//	    		$(document).keydown(function(e){
//	    			if(e.keyCode == 13) {
//	    				$('#loginSubmit').click();
//	    			}
//	    		});
//	    		lotterySubmitLogin();
	    	}
	    }
	});
}

/**
 * 购买彩种弹出窗口属性
 * @param obj 公共，数字彩代购default，追号2.
 */
function lotteryBuyMessage( obj ){
	
	if( $("#finalForm").length > 0 ){
		$("#finalForm").remove();
	}
	var licenseId = $("#licenseId").val();
	if( $("#licenseDescId").length > 0 ){
		licenseId = $("#licenseDescId").val();
	}
	var systemId = $("#systemId").val();
	switch( obj ){
//		case 1:{
		//			var content = "本次购买<b>" + $('#gameName').val() + "</b>第<b>" + $("#gameIssue").val() 
		//			+ "</b>期<br>投注<b>" + $("#mult").val() + "</b>倍，";
				//$("#lotteryBuy").find("label[name=lotteryBuy_title]").html(title);
				//$("#lotteryBuyCz").find("label[name=lotteryBuy_titleCz]").html(title);
				//$("#lotteryBuy_yuan").html(formatCurrency($('#betPrice').val()));
				//$("#lotteryBuy_yuanCz").html(formatCurrency($('#betPrice').val()));
				//$("label[name=lotteryBuy_content]").html(content);
				//$("label[name=lotteryBuy_contentCz]").html(content);
//		}
		case "2":{
			var title = "个人追号";
			var content = "本次购买<b>" + $('#plan_title').val() + "</b>追号方案<br>";
			$("#lotteryBuy").find("label[name=lotteryBuy_title]").html(title);
			$("#lotteryBuy_yuan").html(formatCurrency($('#all_money').val()));
			$("#lotteryBuy").find("label[name=lotteryBuy_content]").html(content);
			$("#lotteryBuyCz").find("label[name=lotteryBuy_titleCz]").html(title);
			$("#lotteryBuy_yuanCz").html(formatCurrency($('#all_money').val()));
			$("#lotteryBuyCz").find("label[name=lotteryBuy_contentCz]").html(content);
			$.blockUI({
				message:$("#lotteryBuy").clone(),
				css: {
					left: $(window).width() / 3 + 'px',
					top: $(window).height() / 4 + 'px',
					backgroundColor:'none',
					border: 'none',
					cursor:'default'
				}
			});
			$finalForm = $("#LotteryBuyForm_fdm").clone();
			break;
		}
		case "3":{
//			var title = "合买发起";
//			var content = "确认发起<b>" + $('#gameName').val() + "</b>第<b>" + 
//					$("#hemaiFormId input[name='programDesc']").val() + "</b>合买方案<br>方案金额<b>" + 
//					formatCurrency($("#hemaiFormId input[name='allmoney']").val()) + "</b>元<br>";
//			$("#lotteryBuy").find("label[name=lotteryBuy_title]").html(title);
//			$("#lotteryBuy label[name='lotteryBuy_type']").html("需支付金额");
//			$("#lotteryBuy_yuan").html(formatCurrency(parseFloat($('#buynumberPrice').html()) + parseFloat($('#baodinumberPrice').html())));
//			$("#lotteryBuy").find("label[name=lotteryBuy_content]").html(content);
//			$("#lotteryBuyCz").find("label[name=lotteryBuy_titleCz]").html(title);
//			$("#lotteryBuy label[name='lotteryBuy_typeCz']").html("需支付金额");
//			$("#lotteryBuy_yuanCz").html(formatCurrency(parseFloat($('#buynumberPrice').html()) + parseFloat($('#baodinumberPrice').html())));
//			$("#lotteryBuyCz").find("label[name=lotteryBuy_contentCz]").html(content);
			var span = "发起合买";
			var num = "";
			var mult= "";
			$("#szc_confirm_money").html("￥" + formatCurrency(parseFloat($('#buynumberPrice').html()) + parseFloat($('#baodinumberPrice').html())));
			$("[name='szc_confirm_td']").attr("colspan","9");
			var title = "";
			var codes = $("input[name='hemaidetail']").val();
			systemId = $("input[name='hemaitype']").val();
			var match_codes = "";
			var header = "<tr><th rowspan='2'>方案信息</th><th>玩法</th><th>注数</th><th>倍数</th><th>追加</th><th>总金额</th><th>份数</th><th>保底</th><th>提成</th><th>保密类型</th></tr>";
			if( licenseId == "171" || licenseId == "172" || licenseId == "174" ){
				num = $("#zhushu_").html();
				mult = $("#sfc_mul_id").val();
				title = $("#gameName").val() + "第(" + $("#gameIssue").val() + ")期" + span;
				var match_number = "";
				var match_up = "";
				var match_down = "";
				var match_vs = "";
				//event_xml
				$.post("/lottery/sfc/gameissue.jhtml", {"licenseId":licenseId}, function(data){
					data = eval(data);
					switch ( licenseId ){
						case "171":{
							$.each(schedules,function ( index , value ){
								var team = eval(value);
								match_up += "<td colspan='2'>" + team.hostName + "</td>";
								match_number += ("<th colspan='2'>" + (index + 1) + "</th>");
								match_vs += "<td colspan='2'>VS</td>";
								match_down += "<td colspan='2'>" + team.guestName + "</td>";
							});
							break;
						}
						case "172":{
							if( systemId == "2" || systemId == "4" ){
								title = "任选九第(" + $("#gameIssue").val() + ")期" + span;
							}
							$.each(schedules,function ( index , value ){
								var team = eval(value);
								match_up += ("<td>" + team.hostName + "</td>");
								match_number += ("<th>" + (index + 1) + "</th>");
								match_vs += "<td>VS</td>";
								match_down += ("<td>" + team.guestName + "</td>");
							});
							break;
						}
						case "174":{
							$.each(schedules,function ( index , value ){
								var team = eval(value);
								match_up += "<td colspan='2'>" + team.hostName + "</td>";
								match_number += ("<th colspan='2'>" + (index + 1) + "</th>");
								match_vs += "<td colspan='2'>VS</td>";
								match_down += "<td colspan='2'>" + team.guestName + "</td>";
							});
							break;
						}
					}
					if( $("input[name='uploadTab']:checked").index() != 2 ){
						codes = codes.split(";");
						if( systemId == "4" ){
							$.each(codes,function (index , value){
								var match_code = "";
								$.each(value.split(","),function (i , v){
									var number = v.split(":");
									match_code += "<td>" + number[1].split("`")[0] + "</td>";
								});
								match_codes += ("<tr>" + match_code + "</tr>");
							});
						}else{
							$.each(codes,function (index , value){
								var match_code = "";
								$.each(value.split(","),function (i , v){
									match_code += ("<td>" + v + "</td>");
								});
								match_codes += ("<tr>" + match_code + "</tr>");
							});
						}
					}
					var match = "<table class='tznr_tab'><thead>" +
								"<tr><th style='width:34px;'>场次</th>" + match_number + "</tr>" +
								"</thead><tbody><tr>" +
								"<td rowspan='3' style='padding:0;'>对阵</td>" + match_up +
								"</tr><tr class='trG'>" + match_vs + "</tr><tr>" + match_down + "</tr>" +
								"<tr><td class='ndxz' style='padding:0;' rowspan='" + codes.length + 1 + "'>选号</td>" + match_codes + "</tr>" +
								"</tbody></table>";
					$("#szc_confirm_codes").html(match).attr("style","border:3px solid #dce6f4;max-height:250px;");
					header += "<tr id='szc_confirm_title'>" +
								"<th style='border-right:0;color:#333;'>" + getLotteryTypeName( licenseId , systemId ) + "</th>" +
								"<th>" + num + "</th>" + 
								"<th>" + mult + "</th>" +
								"<th>" + ($("#isAppend").val() == 0 ? "否" : "是") + "</th>" +
								"<th>￥" + formatCurrency(parseFloat($('#buynumberPrice').html()) + parseFloat($('#baodinumberPrice').html())) + "元</th>" +
								"<th>" + $("#buynumber").val() + "</th>" + 
								"<th>" + parseInt($("#baodinumber").val() , 10) + "</th>" + 
								"<th>" + $("#hemaiDivViewId .zjyj a.sele").text() + "</th>" + 
								"<th>" + $("#hemaiDivViewId .bm a.sele").text() + "</th>" + 
							  "</tr>";
	
					$("#szc_confirm_span").html(span);
					$("#szc_confirm_title").html(title);
					$("#szc_confirm_fdm").html(header);
					$.blockUI({
						message: $("#szc_confirm_dg").clone(),
						css: {
						    left: $(window).width() / 4 + 'px',     //改动
						    top: $(window).height() / 8 + 'px',      //改动
							backgroundColor:'none',
							border: 'none'
						}
					});
				});
//				if( licenseId == "174" ){
//					var count = 1;
//					$("#sfcTable tr:gt(0)").each(function (index){
//						var td = $(this).find("td");
//						if(index % 2 == 0){
//							match_up += "<td colspan='2'>" + td.eq(3).text() + "</td>";
//							match_number += ("<th colspan='2'>" + count++ + "</th>");
//							match_vs += "<td colspan='2'>VS</td>";
//						}else{
//							match_down += "<td colspan='2'>" + td.eq(0).text() + "</td>";
//						}
//					});
//				}else if(licenseId == "171"){
//					$("#sfcTable tr:odd").each(function (index){
//						var td = $(this).find("td");
//						match_number += ("<th colspan='2'>" + (index + 1) + "</th>");
//						match_up += "<td colspan='2'>" + td.eq(3).text() + "</td>";
//						match_down += "<td colspan='2'>" + td.eq(5).text() + "</td>";
//						match_vs += "<td colspan='2'>VS</td>";
//					});
//				}else{
//					if( systemId == "3" || systemId == "4" ){
//						title = "任选九第(" + $("#gameIssue").val() + ")期" + span;
//					}
//					$("#sfcTable tr:gt(0)").each(function (index){
//						var td = $(this).find("td");
//						match_number += ("<th>" + (index + 1) + "</th>");
//						match_up += "<td>" + td.eq(3).text() + "</td>";
//						match_down += "<td>" + td.eq(5).text() + "</td>";
//						match_vs += "<td>VS</td>";
//					});
//				}
			}else{
				num = $("#finalzhu").html();
				mult = $("#betMult").val();
				title = $("#gameName").val() + "第(" + $("#gameIssue").val() + ")期" + span;
				$.each(codes.split(";"),function (index , value){
					match_codes += ("<li>" + value + "</li>");
				});
				$("#szc_confirm_codes").html("<ul class='tznr'>" + match_codes + "</ul>");
				header += "<tr id='szc_confirm_title'>" +
							"<th style='border-right:0;color:#333;'>" + getLotteryTypeName( licenseId , systemId ) + "</th>" +
							"<th>" + num + "</th>" + 
							"<th>" + mult + "</th>" +
							"<th>" + ($("#isAppend").val() == 0 ? "否" : "是") + "</th>" +
							"<th>￥" + formatCurrency(parseFloat($('#buynumberPrice').html()) + parseFloat($('#baodinumberPrice').html())) + "元</th>" +
							"<th>" + $("#buynumber").val() + "</th>" + 
							"<th>" + parseInt($("#baodinumber").val() , 10) + "</th>" + 
							"<th>" + $("#hemaiDivViewId .zjyj a.sele").text() + "</th>" + 
							"<th>" + $("#hemaiDivViewId .bm a.sele").text() + "</th>" + 
						"</tr>";

			$("#szc_confirm_span").html(span);
			$("#szc_confirm_title").html(title);
			$("#szc_confirm_fdm").html(header);
			$.blockUI({
				message: $("#szc_confirm_dg").clone(),
				css: {
				    left: $(window).width() / 4 + 'px',  //改动
				    top: $(window).height() / 8 + 'px',    //改动
					backgroundColor:'none',
					border: 'none'
				}
			});
			}
			
			$finalForm = $("#hemaiFormId").clone();
			break;
		}
		case "4":{
			var title = "高级追号";
			var content = "本次购买<b>" + $('#plan_title').val() + "</b>追号方案<br>";
			$("#lotteryBuy").find("label[name=lotteryBuy_title]").html(title);
			$("#lotteryBuy_yuan").html(formatCurrency($('#all_money').val()));
			$("#lotteryBuy").find("label[name=lotteryBuy_content]").html(content);
			$("#lotteryBuyCz").find("label[name=lotteryBuy_titleCz]").html(title);
			$("#lotteryBuy_yuanCz").html(formatCurrency($('#all_money').val()));
			$("#lotteryBuyCz").find("label[name=lotteryBuy_contentCz]").html(content);
			$.blockUI({
				message:$("#lotteryBuy").clone(),
				css: {
					left: $(window).width() / 3 + 'px',
					top: $(window).height() / 4 + 'px',
					backgroundColor:'none',
					border: 'none',
					cursor:'default'
				}
			});
			$finalForm = $("#LotteryBuyForm_fdm").clone();
			break;
		}
		case "5":{
			var title = "追号套餐";
			var content = "本次购买<b>" + $('#plan_title').val() + "</b>追号方案<br>";
			$("#lotteryBuy").find("label[name=lotteryBuy_title]").html(title);
			$("#lotteryBuy_yuan").html(formatCurrency($('#all_money').val()));
			$("#lotteryBuy").find("label[name=lotteryBuy_content]").html(content);
			$("#lotteryBuyCz").find("label[name=lotteryBuy_titleCz]").html(title);
			$("#lotteryBuy_yuanCz").html(formatCurrency($('#all_money').val()));
			$("#lotteryBuyCz").find("label[name=lotteryBuy_contentCz]").html(content);
			$.blockUI({
				message:$("#lotteryBuy").clone(),
				css: {
					left: $(window).width() / 3 + 'px',
					top: $(window).height() / 4 + 'px',
					backgroundColor:'none',
					border: 'none',
					cursor:'default'
				}
			});
			$finalForm = $("#LotteryBuyForm_fdm").clone();
			break;
		}
		default:{
			if( licenseId != "227" && licenseId != "228"){
//		    	$("b[name=lotteryBuy_gameName]").html($('#gameName').val());
//		    	var multiple = $('#mult').val();
//			    multiple = multiple.split(",").length > 1 ? "*" : multiple;
//		    	$("#lotteryBuy_bei").html(multiple);
//		    	$("#lotteryBuy_qi").html($('#gameIssue').val());
//		    	$("#lotteryBuy_yuan").html($('#betPrice').val());
//			    $("#lotteryBuy_money").html(formatCurrency(currAmount));
//		    	$("#lotteryBuy_beiCz").html(multiple);
//		    	$("#lotteryBuy_qiCz").html($('#gameIssue').val());
//		    	$("#lotteryBuy_yuanCz").html($('#betPrice').val());
//			    $("#lotteryBuy_moneyCz").html(formatCurrency(currAmount));
				var span = "个人代购";
				var header = "<tr><th rowspan='2'>方案信息</th><th>玩法</th><th>注数</th><th>倍数</th><th>追加</th><th>总金额</th></tr>" +
								"<tr id='szc_confirm_title'>" +
									"<th style='border-right:0;color:#333;'>" + getLotteryTypeName( licenseId , systemId ) + "</th>" +
									"<th>" + $("#betNum").val() + "</th>" + 
									"<th>" + $("#mult").val() + "</th>" +
									"<th>" + ($("#isAppend").val() == 0 ? "否" : "是") + "</th>" +
									"<th>￥" + formatCurrency($("#betPrice").val()) + "元</th>" +
								"</tr>";
				$("#szc_confirm_money").html("￥" + formatCurrency($("#betPrice").val()));
				$("td[name='szc_confirm_td']").attr("colspan","5");
				var title = "";
				var codes = $("#betCodes").val();
				var match_codes = "";
				if( licenseId == "171" || licenseId == "172" || licenseId == "174" ){
					title = $("#gameName").val() + "第(" + $("#gameIssue").val() + ")期" + span;
					var match_number = "";
					var match_up = "";
					var match_down = "";
					var match_vs = "";
					//event_xml
					$.post("/lottery/sfc/gameissue.jhtml", {"licenseId":licenseId}, function(data){
						data = eval(data);
						switch ( licenseId ){
							case "171":{
								$.each(schedules,function ( index , value ){
									var team = eval(value);
									match_up += "<td colspan='2'>" + team.hostName + "</td>";
									match_number += ("<th colspan='2'>" + (index + 1) + "</th>");
									match_vs += "<td colspan='2'>VS</td>";
									match_down += "<td colspan='2'>" + team.guestName + "</td>";
								});
								break;
							}
							case "172":{
								if( systemId == "2" || systemId == "4" ){
									title = "任选九第(" + $("#gameIssue").val() + ")期" + span;
								}
								$.each(schedules,function ( index , value ){
									var team = eval(value);
									match_up += ("<td>" + team.hostName + "</td>");
									match_number += ("<th>" + (index + 1) + "</th>");
									match_vs += "<td>VS</td>";
									match_down += ("<td>" + team.guestName + "</td>");
								});
								break;
							}
							case "174":{
								$.each(schedules,function ( index , value ){
									var team = eval(value);
									match_up += "<td colspan='2'>" + team.hostName + "</td>";
									match_number += ("<th colspan='2'>" + (index + 1) + "</th>");
									match_vs += "<td colspan='2'>VS</td>";
									match_down += "<td colspan='2'>" + team.guestName + "</td>";
								});
								break;
							}
						}
						if( $("input[name='uploadTab']:checked").index() != 2 ){
							codes = codes.split(";");
							if( systemId == "4" ){
								$.each(codes,function (index , value){
									var match_code = "";
									$.each(value.split(","),function (i , v){
										var number = v.split(":");
										match_code += "<td>" + number[1].split("`")[0] + "</td>";
									});
									match_codes += ("<tr>" + match_code + "</tr>");
								});
							}else{
								$.each(codes,function (index , value){
									var match_code = "";
									$.each(value.split(","),function (i , v){
										match_code += ("<td>" + v + "</td>");
									});
									match_codes += ("<tr>" + match_code + "</tr>");
								});
							}
						}
						var match = "<table class='tznr_tab'><thead>" +
									"<tr><th style='width:34px;'>场次</th>" + match_number + "</tr>" +
									"</thead><tbody><tr class='noborder'>" +
									"<td rowspan='3' class='bor'>对阵</td>" + match_up +
									"</tr><tr class='trG noborder'>" + match_vs + "</tr><tr>" + match_down + "</tr>" +
									"<tr><td class='ndxz' style='padding:0;' rowspan='" + codes.length + 1 + "'>选号</td>" + match_codes + "</tr>" +
									"</tbody></table>";
						$("#szc_confirm_codes").html(match).attr("style","border:3px solid #dce6f4;max-height:250px;");
						$("#szc_confirm_span").html(span);
						$("#szc_confirm_title").html(title);
						$("#szc_confirm_fdm").html(header);
			    		$.blockUI({
			    			message: $("#szc_confirm_dg").clone(),
			    			css: {
			    			    left: $(window).width() / 4 + 'px',       //改动
			    			    top: $(window).height() / 8 + 'px',         //改动
			    				backgroundColor:'none',
			    				border: 'none'
			    			}
			    		});
					});
					
					/**
					 * 确认投注显示传统彩对阵
					 */
//					if( licenseId == "174" ){
//						var count = 1;
//						$("#sfcTable tr:gt(0)").each(function (index){
//							var td = $(this).find("td");
//							if(index % 2 == 0){
//								match_up += "<td colspan='2'>" + td.eq(3).text() + "</td>";
//								match_number += ("<th colspan='2'>" + count++ + "</th>");
//								match_vs += "<td colspan='2'>VS</td>";
//							}else{
//								match_down += "<td colspan='2'>" + td.eq(0).text() + "</td>";
//							}
//						});
//					}else if(licenseId == "171"){
//						$("#sfcTable tr:odd").each(function (index){
//							var td = $(this).find("td");
//							match_number += ("<th colspan='2'>" + (index + 1) + "</th>");
//							match_up += "<td colspan='2'>" + td.eq(3).text() + "</td>";
//							match_down += "<td colspan='2'>" + td.eq(5).text() + "</td>";
//							match_vs += "<td colspan='2'>VS</td>";
//						});
//					}else{
//						if( systemId == "2" || systemId == "4" ){
//							title = "任选九第(" + $("#gameIssue").val() + ")期" + span;
//						}
//						$("#sfcTable tr:gt(0)").each(function (index){
//							var td = $(this).find("td");
//							match_number += ("<th>" + (index + 1) + "</th>");
//							match_up += "<td>" + td.eq(3).text() + "</td>";
//							match_down += "<td>" + td.eq(5).text() + "</td>";
//							match_vs += "<td>VS</td>";
//						});
//					}
				}else{
					/**
					 * 数字彩
					 */
					title = $("#gameName").val() + "第(" + $("#gameIssue").val() + ")期" + span;
					$.each(codes.split(";"),function (index , value){
						match_codes += ("<li>" + value + "</li>");
					});
					$("#szc_confirm_codes").html("<ul class='tznr'>" + match_codes + "</ul>");
					$("#szc_confirm_span").html(span);
					$("#szc_confirm_title").html(title);
					$("#szc_confirm_fdm").html(header);
		    		$.blockUI({
		    			message: $("#szc_confirm_dg").clone(),
		    			css: {
		    			    left: $(window).width() / 4 + 'px',      //改动（325）
		    			    top: $(window).height() / 8 + 'px',       //改动
		    				backgroundColor:'none',
		    				border: 'none'
		    			}
		    		});
				}
			}
//	    	$("b[name=lotteryBuy_gameName]").html($('#gameName').val());
//	    	var multiple = $('#mult').val();
//		    multiple = multiple.split(",").length > 1 ? "*" : multiple;
//	    	$("#lotteryBuy_bei").html(multiple);
//	    	$("#lotteryBuy_qi").html($('#gameIssue').val() + "===");
//	    	$("#lotteryBuy_yuan").html($('#betPrice').val());
//		    $("#lotteryBuy_money").html(formatCurrency(currAmount));
//	    	$("#lotteryBuy_beiCz").html(multiple);
//	    	$("#lotteryBuy_qiCz").html($('#gameIssue').val());
//	    	$("#lotteryBuy_yuanCz").html($('#betPrice').val());
//		    $("#lotteryBuy_moneyCz").html(formatCurrency(currAmount));
//		    $finalForm = $("#lotteryBuyForm").clone();
//			var 
//			$("#danMaList dd:visible").each(function (){
//				
//			});
			$finalForm = $("#lotteryBuyForm").clone();
		    break;
		}
	}
		$finalForm.attr("id","finalForm");
		$finalForm.attr("name","finalForm");
		
//		$("#submitForm").removeAttr("hasSumbit");
}

function alterMessage(message){
	$.blockUI({
    message: $("#alertMessage"),
    css: {
        left: ($(window).width() - 420) / 2 + 'px',
        top: ($(window).height() - 230) / 2 + 'px',
        backgroundColor:'none',
        border: 'none',
        cursor:'default'
    }
  });
  $("#messageContent").html(message);
}

/**
 * 数字彩表单提交
 */
function submitForm(){
	
	//传统彩提交
	$("#lotteryFormSmtId").click(function() {
		
		/**
		 * 加载彩种提交专用登录
		 */
//		lotterySubmitLogin();
		var index = $("input[name='addRadio']:checked").val();
		if ( index == "1" ) {	// 代购
			if ( $("#danshiFlagId").length > 0 ) {
				doSubmit_();
			} else {
				doSubmit();
			}
		} else if ( index == "3" ) {	// 合买
			if(hmFormSubmit() != false){
				if($("#agree").is(":checked")){
					lotteryFormSubmit();
				}else{
					alterMessage("您好,请先阅读《彩民与彩站交易须知》!");
					return false;
				}
			}
		}
	});
	//数字彩提交
	$("#doSubmit").click(function (){
		
		/**
		 * 加载彩种提交专用登录
		 */
//		lotterySubmitLogin();
		
		var radio = $("input[name=addRadio]:checked").val();
		if( radio == 2 || radio == 4 ){
			addSubmitForm();//追号表单插入数据
		}else if( radio == 5 ){
			mealSubmitForm();
		}else if( radio == 3){
			if( hmFormSubmit() == false ){
				return false;
			};
		}else{
			if(agentSubmitForm() == false){
				return false;
			}
		}	

		if($("#agree").is(":checked")){
			lotteryFormSubmit();
		}else{
			openMessage("您好,请先阅读《彩民与彩站交易须知》!");
			return false;
		}
	});
	
	//传统彩，数字彩确认投注
	$("#submitForm").live("click",function(){
		
		$.unblockUI();
//		if ( $(this).attr("hasSumbit") == "1" ) {
//			openMessage("您好，您已经进行投注操作！");
//			return false;
//		}
//		$(this).attr("hasSumbit", "1");
//		if ( $("#poolId").val() == "5" && ( $("#licenseId").val() == 227 || $("#licenseId").val() == 228 ) ) {
//			$("#lotteryBuyForm").submit();
//		} else {
			$finalForm.appendTo("body");
			$("#finalForm").submit();
//		}
	});
	
	/**
	 * 立即充值跳转
	 */
	$("#cancelSubmitForm").live("click",function (){
		window.open("/account/wy/recharge.jhtml?ron=1" , "target");
	});
	
	/**
	 * 确认投注关闭窗口操作
	 */
	$("[name='closeBtn']").live("click",function (){
		$.unblockUI();
	});
	
	/**
	 * 投注提交按钮(追加)登录操作
	 */
	$("#dltSubmitBtn,#plsSubmitBtn,#ssqSubmitBtn,#sdSubmitBtn,#btnBottomSubmitId,#gotoBetFormId,#btnSubmitId").live("click",function (){
		/**
		 * 加载彩种提交专用登录
		 */
		lotterySubmitLogin();
	});
}

/**
 * 竞彩单式上传表单提交
 */
function jcdsSubmitForm(){
	$("#btnSubmit").click(function (){
		if($("#agree").is(":checked")){
			jcdsLotteryFormSubmit();
		}else{
			alert("您好，请阅读条款，并同意！");
			return false;
		}
	});
}

/**
 * 彩种子玩法
 * @param licenseId
 * @param systemId
 */
function getLotteryTypeName( licenseId , systemId ){
	var result = "";
	var type = "";
	switch( licenseId ){
	case "227":{
			result = "竞彩足球";
			switch (systemId) {
				case "1":
					result += "让球胜平负";
					break;
				case "2":
					result += "总进球";
					break;
				case "3":
					result += "比分";
					break;
				case "4":
					result += "半全场";
					break;
				case "5":
					if ( $("#ht2x1Id").length > 0 ) {
						result += "混投2选1";
					} else {
						result += "混合串";
					}
					break;
				case "6":
					result += "胜平负";
					break;
			}
		break;
	}
	case "228":{
		result += "竞彩篮球";
		switch (systemId) {
			case "1":
				result += "胜负";
				break;
			case "2":
				result += "让分胜负";
				break;
			case "3":
				result += "胜分差";
				break;
			case "4":
				result += "大小分";
				break;
			case "5":
				result += "混合串";
				break;
		}
		break;
	}
		case "210":{
			result = "上海11选5";
			type = "2";
			break;
		}
		case "211":{
			result = "十一运夺金";
			type = "2";
			break;
		}
		case "215":{
			result = "江西11选5";
			type = "2";
			break;
		}
		case "216":{
			result = "黑龙江11选5";
			type = "2";
			break;
		}
		case "163":{
			result = "排列三";
			type = "0";
			break;
		}
		case "167":{
			result = "福彩3D";
			type = "0";
			break;
		}
		case "166":{
			result = "双色球";
			type = "1";
			break;
		}
		case "188":{
			result = "大乐透";
			type = "1";
			break;
		}
		case "186":{
			result = "七乐彩";
			type = "1";
			break;
		}
		case "164":{
			result = "排列五";
			type = "1";
			break;
		}
		case "165":{
			result = "七星彩";
			type = "1";
			break;
		}
		case "172":{
			result = "胜负彩";
				switch( systemId ){
				case "1":{
					result += "单式";
					break;
				}
				case "2":{
					result = "任选九单式";
					break;
				}
				case "3":{
					result += "复式";
					break;
				}
				case "4":{
					result = "任选九复式";
					break;
				}
			}
			break;
		}
		case "171":{
			result = "六场半全场";
				switch( systemId ){
				case "1":{
					result += "单式";
					break;
				}
				case "2":{
					result += "复式";
					break;
				}
			}
			break;
		}
		case "174":{
			result = "四场进球";
				switch( systemId ){
				case "1":{
					result += "单式";
					break;
				}
				case "2":{
					result += "复式";
					break;
				}
			}
			break;
		}
	}
	switch(type){
		//福彩3D|排列三
		case "0":{
			switch( systemId ){
				case "0":{
					result += "直选普通";
					break;
				}
				case "10":{
					result += "直选组合";
					break;
				}
				case "1":{
					result += "直选和值";
					break;
				}
				case "2":{
					result += "直选胆拖";
					break;
				}
				case "9":{
					result += "组三单式";
					break;
				}
				case "3":{
					result += "组三复式";
					break;
				}
				case "4":{
					result += "组三和值";
					break;
				}
				case "5":{
					result += "组三胆拖";
					break;
				}
				case "6":{
					result += "组六普通";
					break;
				}
				case "7":{
					result += "组六和值";
					break;
				}
				case "8":{
					result += "组六胆拖";
					break;
				}
			}
			break;
		}
		case "1":{
			switch( systemId ){
				case "1":{
					result += testLotterySingle();
					break;
				}
				case "2":{
					result += "胆拖";
					break;
				}
			}
			break;
		}
		case "2":{
			result += getBetName();
			break;
		}
	}
	return result;
}

/**
 * 直选普通判断直选单复式
 */
function testLotterySingle(){
	var result = "直选普通";
	var radio = $("input[name='addRadio']:checked").val();
	if( radio == "3" ){
		var codes = $("#hemaiFormId input[name='hemaidetail']").val();
		var length = codes.split(";").length;
		if( length == parseInt( $("#finalzhu").html() , 10 ) ){
			result = "直选单式";
		}else{
			result = "直选复式";
		}
	}else{
		var codes = $("#betCodes").val();
		var length = codes.split(";").length;
		if( length == parseInt( $("#betNum").val() , 10 ) ){
			result = "直选单式";
		}else{
			result = "直选复式";
		}
	}
	return result;
}