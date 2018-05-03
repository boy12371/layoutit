/**
 * <p>Desc:竞彩公用js</p>
 * <p>Author: luochang</p>
 * <p>Copyright: Copyright (c) 2012</p> 
 * <p>Company: 87.cn</p>
 * Added by Luochang at 2012/3/27 Version 1.0
 * Update by Wang YiLong at 2013/2/13 Version 1.0
 */
 
var combCrMap = new HashTable();                                                    // 使用一个全局Hashtable存储组合过关串长
 
 /** 选择3场比赛 */
combCrMap.put("3c3", new Array("2c1"));								                // 3串3
combCrMap.put("3c4", new Array("3c1", "2c1"));						                // 3串4

/** 选择4场比赛 */
combCrMap.put("4c4", new Array("3c1"));								                // 4串4
combCrMap.put("4c5", new Array("4c1", "3c1"));						                // 4串5
combCrMap.put("4c6", new Array("2c1"));								                // 4串6
combCrMap.put("4c11", new Array("4c1", "3c1", "2c1"));				                // 4串11

/** 选择5场比赛 */
combCrMap.put("5c5", new Array("4c1"));								                // 5串5
combCrMap.put("5c6", new Array("5c1", "4c1"));						                // 5串6
combCrMap.put("5c10", new Array("2c1"));							                // 5串10
combCrMap.put("5c16", new Array("5c1", "4c1", "3c1"));				                // 5串16
combCrMap.put("5c20", new Array("3c1", "2c1"));						                // 5串20
combCrMap.put("5c26", new Array("5c1", "4c1", "3c1", "2c1"));		                // 5串26

/** 选择6场比赛 */
combCrMap.put("6c6", new Array("5c1"));								                // 6串6
combCrMap.put("6c7", new Array("6c1", "5c1"));						                // 6串7
combCrMap.put("6c15", new Array("2c1"));							                // 6串15
combCrMap.put("6c20", new Array("3c1"));							                // 6串20
combCrMap.put("6c22", new Array("6c1", "5c1", "4c1"));				                // 6串22
combCrMap.put("6c35", new Array("3c1", "2c1"));						                // 6串35
combCrMap.put("6c42", new Array("6c1", "5c1", "4c1", "3c1"));		                // 6串42
combCrMap.put("6c50", new Array("4c1", "3c1", "2c1"));				                // 6串50
combCrMap.put("6c57", new Array("6c1", "5c1", "4c1", "3c1", "2c1"));                // 6串57

/** 选择7场比赛 */
combCrMap.put("7c7", new Array("6c1"));										        // 7串7
combCrMap.put("7c8", new Array("7c1", "6c1"));								        // 7串8
combCrMap.put("7c21", new Array("5c1"));									        // 7串21
combCrMap.put("7c35", new Array("4c1"));									        // 7串35
combCrMap.put("7c120", new Array("7c1", "6c1", "5c1", "4c1", "3c1", "2c1"));        // 7串120

/** 选择8场比赛 */
combCrMap.put("8c8", new Array("7c1"));												// 8串8
combCrMap.put("8c9", new Array("8c1", "7c1"));										// 8串9
combCrMap.put("8c28", new Array("6c1"));											// 8串28
combCrMap.put("8c56", new Array("5c1"));											// 8串56
combCrMap.put("8c70", new Array("4c1"));											// 8串70
combCrMap.put("8c247", new Array("8c1", "7c1", "6c1", "5c1", "4c1", "3c1", "2c1")); // 8串247

/** 球赛显示样式 */
//var colorClassBuf = new Array("lanBlock01_z","ziBlock_z","lanBlock02_z","juBlock_z","luBlock_z");	

/** 竞彩页面，当重新或再次选择彩果时，保持原有过关方式（如果存在）不变 Added by Luochang at 2012/11/20 */
var betSelectedBuffer = new Array();

/**
 *	计算自由过关注数
 *  参数
 *		_n_arr,存储比赛场次，二维数组，如：_n_arr = new Array(new Array("3"),new Array("3","1"),new Array("3","1","0"));
 *		_c_arr,存储串长，一维数组，如：_c_arr = new Array("2c1","3c1");
 *	reuturn 注数
 */
function calcBetSum( _n_arr, _c_arr ) {
	/** 定义返回值 */
	var betSum = 0;	
	/** 首先取出串长 */
	for ( var i = 0; i < _c_arr.length; i++ ) {
		var cLen = _c_arr[i].split("")[0];
		var oResult = findJcComb( _n_arr, _n_arr.length, parseInt(cLen) );
		
		for ( var j = 0; j < oResult.length; j++ ) {
			var oSum = 1;
			for ( var k = 0; k < oResult[j].length; k++ ) {
				oSum *= oResult[j][k].length;
			}
			betSum += oSum;

		    // 解除引用便于js垃圾回收
			oSum = null;
		}

	    // 解除引用便于js垃圾回收
		cLen = null;
		oResult = null;
	}
	return betSum;
}

/**
 *	计算自由过关注数(定胆)
 *  参数
 *		_n_arr,存储比赛场次，二维数组，如：_n_arr = new Array(new Array("3"),new Array("3","1"),new Array("3","1","0"));
 *		_c_arr,存储串长，一维数组，如：_c_arr = new Array("2c1","3c1");
 *	reuturn 注数
 */
function calcBetSum2( _n_arr, _n_arr_dan,_c_arr ) {
	/** 定义返回值 */
	var betSum = 0;	
	/** 首先取出串长 */
	for ( var i = 0; i < _c_arr.length; i++ ) {
		var cLen = _c_arr[i].split("")[0];		
		var oResult = findJcComb( _n_arr, _n_arr.length, parseInt(cLen)-_n_arr_dan.length );
			
		for ( var j = 0; j < oResult.length; j++ ) {
			var oSum = 1;
			for ( var k = 0; k < oResult[j].length; k++ ) {
				oSum *= oResult[j][k].length;
			}
			for ( var k = 0; k < _n_arr_dan.length; k++ ) {
				oSum *= _n_arr_dan[k].length;
			}
			betSum += oSum;

	        // 解除引用便于js垃圾回收
			oSum = null;
		}

        // 解除引用便于js垃圾回收
		cLen = null;
		oResult = null;	
	}

    // 解除引用便于js垃圾回收
	//betSum = null;
	
	return betSum;
}

/**
 *	计算组合过关注数
 *	参数
 *		cl,串长，如"3c4"等
 *		_n_arr,存储比赛场次，二维数组，如：_n_arr = new Array(new Array("3"),new Array("3","1"),new Array("3","1","0"));
 *	reuturn 注数
 */
function calcCombCrBetSum( cl, _n_arr ) {
	var _c_arr = combCrMap.get(cl);
	return calcBetSum( _n_arr, _c_arr );
}

/**
 *	计算组合过关理论最高奖金
 *	参数
 *		_h_bonus,参考指数，一维数组，如：_n_arr = new Array(1.70,9.10,2.01);
 *		cl,串长，如"3c4"等
 *		mul,投注倍数
 *	reuturn 理论最高奖金 highestBonus
 */
function calcCombCrHighestBonus( _h_bonus, cl, mul) {
	var _c_arr = combCrMap.get(cl);
	return calcHighestBonus( _h_bonus, _c_arr, mul);
}

/**
 *	计算总金额
 *	参数
 *		betSum：注数
 *		wageBase：基本投注是2，追加投注是3;
 *		mul：倍投数
 *	reuturn 总金额
 */
function calcBonus(betSum, wageBase, mul) {
	var bns = new Number(betSum*wageBase*mul);
	return bns.toFixed(2);	/** 保留两个小数位 */
}

/**
 *	计算自由过关理论最高奖金
 *  参数
 *		_h_bonus,参考指数，一维数组，如：_n_arr = new Array(1.70,9.10,2.01);
 *		_c_arr,存储串长，一维数组，如：_c_arr = new Array("2c1","3c1");
 *		mul,投注倍数
 *	reuturn 奖金
 */
function calcHighestBonus( _h_bonus, _c_arr, mul) {
	var highestBns = 0;
	for ( var i = 0; i < _c_arr.length; i++ ) {
		var cLen = _c_arr[i].split("")[0];
		var oResult = findJcComb( _h_bonus, _h_bonus.length, parseInt(cLen));
		for ( var j = 0; j < oResult.length; j++ ) {
			var oSum = 1;
			for ( var k = 0; k < oResult[j].length; k++ ) {
				oSum *= oResult[j][k];
			}
			highestBns += oSum * mul;

	        // 解除引用便于js垃圾回收
			oSum = null;
		}

        // 解除引用便于js垃圾回收
		cLen = null;
		oResult = null;
	}
	var bns = new Number(highestBns*2);

    // 解除引用便于js垃圾回收
	highestBns = null;
	
	return bns.toFixed(2);	/** 保留两个小数位 */
}

/**
 *	计算理论最高奖金(定胆)
 *  参数
 *		_h_bonus,参考指数，一维数组，如：_h_bonus = new Array(1.70,9.10,2.01);
 *		_h_bonus_dan,参考指数，一维数组，如：_h_bonus_dan = new Array(1.70,9.10,2.01);
 *		_c_arr,存储串长，一维数组，如：_c_arr = new Array("2c1","3c1");
 *		mul,投注倍数
 *	reuturn 奖金
 */
function calcHighestBonus2( _h_bonus,_h_bonus_dan, _c_arr, mul ) {
	var highestBns = 0;
	for ( var i = 0; i < _c_arr.length; i++ ) {
		var cLen = _c_arr[i].split("")[0];
		var oResult = findJcComb( _h_bonus, _h_bonus.length, parseInt(cLen)-_h_bonus_dan.length );
		for ( var j = 0; j < oResult.length; j++ ) {
			var oSum = 1;
			for ( var k = 0; k < oResult[j].length; k++ ) {
				oSum *= oResult[j][k];
			}
			for ( var k = 0; k < _h_bonus_dan.length; k++ ) {
				oSum *= _h_bonus_dan[k];
			}
			highestBns += carry(oSum * mul) * 2;

		    // 解除引用便于js垃圾回收
			oSum = null;
		}

	    // 解除引用便于js垃圾回收
		cLen = null;
		oResult = null;
	}

    // 解除引用便于js垃圾回收
	//highestBns = null;
    
	var bns = new Number(highestBns);
	return bns.toFixed(2);	/** 保留两个小数位 */
}
/**
 * 对传入金额做四舍六入五成双处理
 * @param money
 * @return
 */
function carry(money) {
	var string = money + "";
	var point = string.indexOf('.');
	if (point == -1) {
		return money; // 没有小数点
	} else if (string.length - 1 < point + 3) {
		return money; // 小数不足3位
	} else {
		var milli = string.charAt(point + 3);
		if (milli < '5') {
			return parseFloat(string.substring(0, point + 3)); // 第3位小于5, 保留2位
		} else if (milli > '5'){
			return parseFloat(string.substring(0, point + 3)) + 0.01; // 第3位大于6, 进位
		} else { // 第3位是5
			var cent = string.charAt(point + 2);
			if (((cent - '0') & 1) == 0) {
				return parseFloat(string.substring(0, point + 3)); // 第2位是偶数, 不进位
			} else {
				return parseFloat(string.substring(0, point + 3)) + 0.01; // 第2位是奇数, 进位
			}
		}
	}
}

/**
 *	组合串转换成单式串	added at 2012/06/18
 *  参数
 *		_n_arr,存储比赛场次，二维数组，如：_n_arr = new Array(new Array("3"),new Array("3","1"),new Array("3","1","0"));
 *		_c_arr,存储串长，一维数组，如：_c_arr = new Array("2c1","3c1");
 *	reuturn 单式串列表,二维数组
 */
function toSingleBetStr( _n_arr, _c_arr ) {
	var result = new Array();
	for ( var i = 0; i < _c_arr.length; i++ ) {
		var cLen = _c_arr[i].split("")[0];
		var oResult = findJcComb( _n_arr, _n_arr.length, parseInt(cLen) );
		for ( var j = 0; j < oResult.length; j++ ) {
			var singleStr = findNmComb(oResult[j]);
			for ( var k = 0; k < singleStr.length; k++ ) {
				result.push(singleStr[k]);
			}
		}
	}
	return result;
}

/**
 *	竞彩类查找组合
 *	参数
 *		ops,二维数组
 *		n,选择n场比赛
 *		k,k种组合
 *	return 3维数组，存储二维数组的组合
 */
function findJcComb( ops, n, k ) {
	var buffer = new Array();	
	var result = new Array();	
	var top = -1, tmp = 1;		
	var counter = 0;
	do {
		buffer[++top] = tmp++;
	} while (top < k - 1);
	if (top == k - 1) {
		var tp = new Array();
		for (var i = 0; i < buffer.length; i++ ) {			
			tp.push(ops[buffer[i] - 1]);
		}		
		result.push(tp);
	}
	do {
		if (top == k - 1) {
			do {
				tmp = buffer[top--];
			} while (tmp > n - (k - (top + 1)) && top > -1);
		}
		if (tmp <= n - (k - (top + 1))) { 
			do {
				buffer[++top] = ++tmp;
			} while (top < k - 1); 
		}
		if (top == k - 1) {
			var tp = new Array();
			for (var i = 0; i < buffer.length; i++ ) {
				tp.push(ops[buffer[i] - 1]);
			}			
			result.push(tp);
		}
	} while (top > -1); 
	return result;
}

/**
 * 只算注数，调用此方法 added at 2012/4/26
 * @param n
 * @param k
 * @return
 */
function findCombNum( n, k ) {
	if ( k > n / 2 ) {
		k = n - k;
	}
	var counter = 1,mod = 1;
	for ( var i = 0; i < k; i++ ) {
		counter *= n--;
		mod *= (i + 1);
	}
	return counter / mod;
}

/**
 *	查找组合，只对排列3，排列5，七星彩使用./递归生成 
 *	参数
 *		result,返回值，为数组对象
 *		ops,二维数组
 *	return 2维数组，存储二维数组的组合
 */
function findNmComb( ops ) {
	var result = new Array();
	for ( var i = 0; i < ops[0].length; i++ ) {
		var _tArr = new Array();
		_tArr.push(ops[0][i]);
		findSubNmComb( result, _tArr, ops, ops.length-1 );
	}
	return result;
}

function findSubNmComb( result, tArr, ops, n ) {
	if ( n == 0 ) {
		result.push(tArr);
	} else {
		for ( var i = 0; i < ops[ops.length-n].length; i++ ) {
			var _tArr = new Array(tArr);
			_tArr.push(ops[ops.length-n][i]);
			findSubNmComb( result, _tArr, ops, n-1 );
		}
	}
}

/**
 *	数组降序排序函数，在算奖页面中调用
 *	P:Array.sort(compare);
 */
function compare(_val1,_val2) {
	if ( parseFloat(_val1) < parseFloat(_val2) ) {
		return 1;
	} else if ( parseFloat(_val1) > parseFloat(_val2) ) {
		return -1;
	} else {
		return 0;
	}
}

/**
 *	组合过关注数显示
 */
function changeCombCrBetSum( obj ) {
	betCount = calcCombCrBetSum($(obj).val(),_n_arr);
	$("#bet_sumcount_id").html(betCount);
	$("#bet_sumcount_id").html(betCount);
	
	var val = $("#std_mul_bet_id").val();
	if ( val == "" ) {
		val = 1;
		$("#std_mul_bet_id").val("1")
	}
	$("#std_sumamt_id").html(parseInt(val)*betCount*2);
	
	/** 计算理论最高奖金 */
	var val = $("#std_mul_bet_id").val();
	if ( val == "" ) {
		val = 1;
		$("#std_mul_bet_id").val("1")
	}
	__c_arr = new Array();
	__c_arr = combCrMap.get($(obj).val());
	var hb = calcHighestBonus( _h_bonus, combCrMap.get($(obj).val()), val);
	$("#lilun_zuigao_amt_id").html(hb);
	
	/* Modified at 2012/11/20 */
	betSelectedBuffer.length = 0;
	betSelectedBuffer.push($(obj).val());
}

/**
 * <p>Desc:重新计算场次数量</p>
 * <p>return:无返回值</p>
 */
function reCalcChangCiNum() {
    var showNum = 0;
    $("#danMaList").find("dd").each(function(i) {
        var ddId = $(this).attr("id");
        if (!$("#" + ddId).is(":hidden")) {
            showNum++;
        }
    });
    $("#changCiNum").html(showNum);

    // 解除引用便于js垃圾回收
    showNum = null;
}

/**
 * <p>Desc:重新生成单关</p>
 * <p>return:无返回值</p>
 */
function reGenerateDanGuan(){
    $("#danguan").show();
    $("#zy").hide();
    $("#zyChuanBox").hide();
    $("#zh").hide();
    $("#zhChuanBox").hide();
}

/**
 * <p>Desc:重新生成过关[仅自由过关]</p>
 * <p>return:无返回值</p>
 */
function reGenerateZyGuoGuan(){
    var changCiNum = $("#changCiNum").val();
    for(var i=2;i<=Number(changCiNum);i++){
    	switch (i) {
            case 2:
        	    showZyChuan2c1();
                break;
            case 3:
            	showZyChuan3c1();
                break;
            case 4:
            	showZyChuan4c1();
                break;
            case 5:
            	showZyChuan5c1();
                break;
            case 6:
            	showZyChuan6c1();
                break;
            case 7:
            	showZyChuan7c1();
                break;
            case 8:
            	showZyChuan8c1();
                break;
            default:
                break;            
        }
    }
    for(var i=Number(changCiNum)+1;i<=8;i++){    	
    	switch (i) {
            case 2:
        	    hideZyChuan2c1();
                break;
            case 3:
            	hideZyChuan3c1();
                break;
            case 4:
            	hideZyChuan4c1();
                break;
            case 5:
            	hideZyChuan5c1();
                break;
            case 6:
            	hideZyChuan6c1();
                break;
            case 7:
            	hideZyChuan7c1();
                break;
            case 8:
            	hideZyChuan8c1();
                break;
            default:
                break;
        }
    }
	 	 
    // 解除引用便于js垃圾回收
    changCiNum = null;
}

/**
 * <p>Desc:重新生成过关[包括组合过关和自由过关]</p>
 * <p>return:无返回值</p>
 */
function reGenerateGuoGuan(){
    var changCiNum = $("#changCiNum").html();
    for(var i=2;i<=Number(changCiNum);i++){
    	switch (i) {
            case 2:
        	    showZyChuan2c1();
                break;
            case 3:
            	showZyChuan3c1();
            	showZhChuan3c();
                break;
            case 4:
            	showZyChuan4c1();
            	showZhChuan4c();
                break;
            case 5:
            	showZyChuan5c1();
            	showZhChuan5c();
                break;
            case 6:
            	showZyChuan6c1();
            	showZhChuan6c();
                break;
            case 7:
            	showZyChuan7c1();
            	showZhChuan7c();
                break;
            case 8:
            	showZyChuan8c1();
            	showZhChuan8c();
                break;
            default:
                break;            
        }    	
    }
    for(var i=Number(changCiNum)+1;i<=8;i++){    	
    	switch (i) {
            case 2:
        	    hideZyChuan2c1();
                break;
            case 3:
            	hideZyChuan3c1();
            	hideZhChuan3c();
                break;
            case 4:
            	hideZyChuan4c1();
            	hideZhChuan4c();
                break;
            case 5:
            	hideZyChuan5c1();
            	hideZhChuan5c();
                break;
            case 6:
            	hideZyChuan6c1();
            	hideZhChuan6c();
                break;
            case 7:
            	hideZyChuan7c1();
            	hideZhChuan7c();
                break;
            case 8:
            	hideZyChuan8c1();
            	hideZhChuan8c();
                break;
            default:
                break;            
        }    	
    }
	 	 
    // 解除引用便于js垃圾回收
    changCiNum = null;
}

/**
 * <p>Desc:显示全部的过关选项[包括组合过关和自由过关]</p>
 * <p>return:无返回值</p>
 */
function addAllGuoGuan(){	
    var changCiNum = $("#changCiNum").html();
    for(var i=2;i<=Number(changCiNum);i++){    	
    	switch (i) {
            case 2:
        	    showZyChuan2c1();
                break;
            case 3:
            	showZyChuan3c1();
            	showZhChuan3c();
                break;
            case 4:
            	showZyChuan4c1();
            	showZhChuan4c();
                break;
            case 5:
            	showZyChuan5c1();
            	showZhChuan5c();
                break;
            case 6:
            	showZyChuan6c1();
            	showZhChuan6c();
                break;
            case 7:
            	showZyChuan7c1();
            	showZhChuan7c();
                break;
            case 8:
            	showZyChuan8c1();
            	showZhChuan8c();
                break;
            default:
                break;            
        }    	
    }
	 	 
    // 解除引用便于js垃圾回收
    changCiNum = null;
}

/**
 * <p>Desc:隐藏掉自由串2c1</p>
 */
function hideZyChuan2c1(){
	$("#chuan2c1").hide();
	$("#2c1").attr("checked",false);
	$("#2c1").removeAttr("disabled");
}

/**
 * <p>Desc:隐藏掉自由串3c1</p>
 */
function hideZyChuan3c1(){   	
	$("#chuan3c1").hide(187);
	$("#3c1").attr("checked",false);
	$("#3c1").removeAttr("disabled");
}

/**
 * <p>Desc:隐藏掉组合串3c*</p>
 */
function hideZhChuan3c(){
	$("#chuan3c3").hide(187);
	$("#3c3").attr("checked",false);
	$("#3c3").removeAttr("disabled");
	$("#chuan3c4").hide(187);
	$("#3c4").attr("checked",false);
	$("#3c4").removeAttr("disabled");
}

/**
 * <p>Desc:隐藏掉自由串4c1</p>
 */
function hideZyChuan4c1(){
	$("#chuan4c1").hide(187);
	$("#4c1").attr("checked",false);
	$("#4c1").removeAttr("disabled");
}

/**
 * <p>Desc:隐藏掉组合串4c*</p>
 */
function hideZhChuan4c(){
	$("#chuan4c4").hide(187);
	$("#4c4").attr("checked",false);
	$("#4c4").removeAttr("disabled");
	$("#chuan4c5").hide(187);
	$("#4c5").attr("checked",false);
	$("#4c5").removeAttr("disabled");
	$("#chuan4c6").hide(187);
	$("#4c6").attr("checked",false);
	$("#4c6").removeAttr("disabled");
	$("#chuan4c11").hide(187);
	$("#4c11").attr("checked",false);
	$("#4c11").removeAttr("disabled");
}

/**
 * <p>Desc:隐藏掉自由串5c1</p>
 */
function hideZyChuan5c1(){
	$("#chuan5c1").hide(187);
	$("#5c1").attr("checked",false);
	$("#5c1").removeAttr("disabled");
}

/**
 * <p>Desc:隐藏掉组合串5c*</p>
 */
function hideZhChuan5c(){
	$("#chuan5c5").hide(187);
	$("#5c5").attr("checked",false);
	$("#5c5").removeAttr("disabled");
	$("#chuan5c6").hide(187);
	$("#5c6").attr("checked",false);
	$("#5c6").removeAttr("disabled");
	$("#chuan5c10").hide(187);
	$("#5c10").attr("checked",false);
	$("#5c10").removeAttr("disabled");
	$("#chuan5c16").hide(187);
	$("#5c16").attr("checked",false);
	$("#5c16").removeAttr("disabled");
	$("#chuan5c20").hide(187);
	$("#5c20").attr("checked",false);
	$("#5c20").removeAttr("disabled");
	$("#chuan5c26").hide(187);
	$("#5c26").attr("checked",false);
	$("#5c26").removeAttr("disabled");
}

/**
 * <p>Desc:隐藏掉自由串6c1</p>
 */
function hideZyChuan6c1(){
	$("#chuan6c1").hide(187);
	$("#6c1").attr("checked",false);
	$("#6c1").removeAttr("disabled");
}

/**
 * <p>Desc:隐藏掉组合串6c*</p>
 */
function hideZhChuan6c(){
	$("#chuan6c6").hide(187);
	$("#6c6").attr("checked",false);
	$("#6c6").removeAttr("disabled");
	$("#chuan6c7").hide(187);
	$("#6c7").attr("checked",false);
	$("#6c7").removeAttr("disabled");
	$("#chuan6c15").hide(187);
	$("#6c15").attr("checked",false);
	$("#6c15").removeAttr("disabled");
	$("#chuan6c20").hide(187);
	$("#6c20").attr("checked",false);
	$("#6c20").removeAttr("disabled");
	$("#chuan6c22").hide(187);
	$("#6c22").attr("checked",false);
	$("#6c22").removeAttr("disabled");
	$("#chuan6c35").hide(187);
	$("#6c35").attr("checked",false);
	$("#6c35").removeAttr("disabled");
	$("#chuan6c42").hide(187);
	$("#6c42").attr("checked",false);
	$("#6c42").removeAttr("disabled");
	$("#chuan6c50").hide(187);
	$("#6c50").attr("checked",false);
	$("#6c50").removeAttr("disabled");
	$("#chuan6c57").hide(187);
	$("#6c57").attr("checked",false);
	$("#6c57").removeAttr("disabled");
}

/**
 * <p>Desc:隐藏掉自由串7c1</p>
 */
function hideZyChuan7c1(){
	$("#chuan7c1").hide(187);
	$("#7c1").attr("checked",false);
	$("#7c1").removeAttr("disabled");
}

/**
 * <p>Desc:隐藏掉组合串7c*</p>
 */
function hideZhChuan7c(){
	$("#chuan7c7").hide(187);
	$("#7c7").attr("checked",false);
	$("#7c7").removeAttr("disabled");
	$("#chuan7c8").hide(187);
	$("#7c8").attr("checked",false);
	$("#7c8").removeAttr("disabled");
	$("#chuan7c21").hide(187);
	$("#7c21").attr("checked",false);
	$("#7c21").removeAttr("disabled");
	$("#chuan7c35").hide(187);
	$("#7c35").attr("checked",false);
	$("#7c35").removeAttr("disabled");
	$("#chuan7c120").hide(187);
	$("#7c120").attr("checked",false);
	$("#7c120").removeAttr("disabled");
}

/**
 * <p>Desc:隐藏掉自由串8c1</p>
 */
function hideZyChuan8c1(){
	$("#chuan8c1").hide(187);
	$("#8c1").attr("checked",false);
	$("#8c1").removeAttr("disabled");
}

/**
 * <p>Desc:隐藏掉组合串8c*</p>
 */
function hideZhChuan8c(){
	$("#chuan8c8").hide(187);
	$("#8c8").attr("checked",false);
	$("#8c8").removeAttr("disabled");
	$("#chuan8c9").hide(187);
	$("#8c9").attr("checked",false);
	$("#8c9").removeAttr("disabled");
	$("#chuan8c28").hide(187);
	$("#8c28").attr("checked",false);
	$("#8c28").removeAttr("disabled");
	$("#chuan8c56").hide(187);
	$("#8c56").attr("checked",false);
	$("#8c56").removeAttr("disabled");
	$("#chuan8c70").hide(187);
	$("#8c70").attr("checked",false);
	$("#8c70").removeAttr("disabled");
	$("#chuan8c247").hide(187);
	$("#8c247").attr("checked",false);
	$("#8c247").removeAttr("disabled");
}

/**
 * <p>Desc:显示自由串2c1</p>
 */
function showZyChuan2c1(){
	$("#chuan2c1").css("display","");
}

/**
 * <p>Desc:显示自由串3c1</p>
 */
function showZyChuan3c1(){   	
	$("#chuan3c1").css("display","");
}

/**
 * <p>Desc:显示组合串3c*</p>
 */
function showZhChuan3c(){
	$("#chuan3c3").css("display","");
	$("#chuan3c4").css("display","");
}

/**
 * <p>Desc:显示自由串4c1</p>
 */
function showZyChuan4c1(){
	$("#chuan4c1").css("display","");
}

/**
 * <p>Desc:显示组合串4c*</p>
 */
function showZhChuan4c(){
	$("#chuan4c4").css("display","");
	$("#chuan4c5").css("display","");
	$("#chuan4c6").css("display","");
	$("#chuan4c11").css("display","");
}

/**
 * <p>Desc:显示自由串5c1</p>
 */
function showZyChuan5c1(){
	$("#chuan5c1").css("display","");
}

/**
 * <p>Desc:显示组合串5c*</p>
 */
function showZhChuan5c(){
	$("#chuan5c5").css("display","");
	$("#chuan5c6").css("display","");
	$("#chuan5c10").css("display","");
	$("#chuan5c16").css("display","");
	$("#chuan5c20").css("display","");
	$("#chuan5c26").css("display","");
}

/**
 * <p>Desc:显示自由串6c1</p>
 */
function showZyChuan6c1(){
	$("#chuan6c1").css("display","");
}

/**
 * <p>Desc:显示组合串6c*</p>
 */
function showZhChuan6c(){
	$("#chuan6c6").css("display","");
	$("#chuan6c7").css("display","");
	$("#chuan6c15").css("display","");
	$("#chuan6c20").css("display","");
	$("#chuan6c22").css("display","");
	$("#chuan6c35").css("display","");
	$("#chuan6c42").css("display","");
	$("#chuan6c50").css("display","");
	$("#chuan6c57").css("display","");
}

/**
 * <p>Desc:显示自由串7c1</p>
 */
function showZyChuan7c1(){
	$("#chuan7c1").css("display","");
}

/**
 * <p>Desc:显示组合串7c*</p>
 */
function showZhChuan7c(){
	$("#chuan7c7").css("display","");
	$("#chuan7c8").css("display","");
	$("#chuan7c21").css("display","");
	$("#chuan7c35").css("display","");
	$("#chuan7c120").css("display","");
}

/**
 * <p>Desc:显示自由串8c1</p>
 */
function showZyChuan8c1(){
	$("#chuan8c1").css("display","");
}

/**
 * <p>Desc:显示组合串8c*</p>
 */
function showZhChuan8c(){
	$("#chuan8c8").css("display","");
	$("#chuan8c9").css("display","");
	$("#chuan8c28").css("display","");
	$("#chuan8c56").css("display","");
	$("#chuan8c70").css("display","");
	$("#chuan8c247").css("display","");
}


/**
 * <p>Desc:重新计算注数、总金额以及理论最高奖金（包含定胆和不定胆的情况）</p>
 * <p>return:无返回值</p>
 */
function reCalcBetSum() {

    // 注数
    var betSum = 0;
    // 总金额
    var jinE = 0.00;
    // 理论最高奖金
    var liLunJinE = 0.00;

    // 取得过关方式
    var ggmethod = $("#ggmethod").val();

    // 取得定胆个数
    var danNum = $("#danNum").val();

    // 二维数组，结果如：_h_bonus = new(new Array(2.01),new Array(2.01));
    var _h_bonus = new Array();

    // 二维数组，结果如：_h_bonus_dan = new(new Array(2.01),new Array(2.01));
    var _h_bonus_dan = new Array();

    // 二维数组，结果如：_n_arr = new(new Array(3),new Array(1),new Array(3,1,0));
    var _n_arr = new Array();

    // 二维数组，结果如：_n_arr_dan = new(new Array(3),new Array(1),new Array(3,1,0));
    var _n_arr_dan = new Array();
    // 临时数组排序用
    var _sub_tmp = new Array();

    // 定胆处理流程
    if (danNum > 0) {
        // 自由过关处理流程
        if (ggmethod == 1) {
            // 自由过关所选串的结果
            var check = $("#zyChuanBox span input[name='zyChuan']:checked");
            var len = check.length;

            // 选了串关的处理
            if (len > 0) {
                /**
                 * 拼装选中的场次赛果赔率二维数组_h_bonus以及赛果二维数组_h_bonus_dan
                 * 场次赛果赔率二维数组_n_arr以及赛果二维数组_n_arr_dan 
                 * _h_bonus结果为：_h_bonus = new Array(new Array("1.7"),new Array("1.5","1.9"),new Array("1.6","1.7","2.5")); 
                 * _h_bonus_dan结果为：_h_bonus_dan = new Array(new Array("1.7"),new Array("1.5","1.9"),new Array("1.6","1.7","2.5"));
                 *  _n_arr结果为：_n_arr = new Array(new Array("3"),new Array("3","1"),new Array("3","1","0"));
                 * _n_arr_dan结果为：_n_arr_dan = new Array(new Array("3"),new Array("3","1"),new Array("3","1","0"));
                 */
                var h_bonus = null;
                var h_bonus_dan = null;
                var n_arr = null;
                var n_arr_dan = null;
                var m = 0;
                var m_dan = 0;
                var n = 0;
                $("#danMaList").find("dd p span[class='w-70'] input").each(function(i) {
                    if (!$(this).is(":hidden")) {
                        h_bonus = new Array();
                        h_bonus_dan = new Array();
                        n_arr = new Array();
                        n_arr_dan = new Array();
                        _sub_tmp =  new Array();
                        var danId = $(this).attr("id").replace("t", "d");
                        if ($("#" + danId).is(":checked")) {
                            n = 0;
                            $(this).parent().parent().parent().find("span em").each(function(i) {
                                if (!$(this).is(":hidden")) {
                                    n_arr_dan[n] = $(this).attr("type");
                                    _sub_tmp.push($(this).attr("odd"));
                                    n++;
                                }
                            });
                            _sub_tmp.sort(compare);
                            _h_bonus_dan[m_dan] = _sub_tmp[0];
                            _n_arr_dan[m_dan] = n_arr_dan;
                            m_dan++;
                        } else {
                            n = 0;
                            $(this).parent().parent().parent().find("span em").each(function(i) {
                                if (!$(this).is(":hidden")) {
                                    _sub_tmp.push($(this).attr("odd"));
                                    n_arr[n] = $(this).attr("type");
                                    n++;
                                }
                            });
                            _sub_tmp.sort(compare);
                            _h_bonus[m] = _sub_tmp[0];
                            _n_arr[m] = n_arr;
                            m++;
                        }

                        // 解除引用便于js垃圾回收
                        _sub_tmp = null;
                        h_bonus = null;
                        h_bonus_dan = null;
                        n_arr = null;
                        n_arr_dan = null;
                        danId = null;
                    }
                });

                // 拼装串关数组，结果如：_c_arr = new Array("2c1","3c1");
                var opts = $("#zyChuanBox span input[name='zyChuan']:checked");
                var _c_arr = new Array();
                for ( var i = 0; i < opts.length; i++) {
                    _c_arr.push($(opts[i]).attr("id"));
                }

                // 计算注数
                betSum = calcBetSum2(_n_arr, _n_arr_dan, _c_arr);
                var val = 1;
                if ($("#beiTou").val() == undefined) {
                    $("#beiTou").val("1");
                } else {
                    val = $("#beiTou").val();
                    if (val == "") {
                        val = 1;
                        $("#beiTou").val("1");
                    }
                }

                // 计算总金额
                jinE = calcBonus(betSum, 2, val);
                // 计算理论最高奖金
                liLunJinE = calcHighestBonus2(_h_bonus, _h_bonus_dan, _c_arr, val);

                // 解除引用便于js垃圾回收
                h_bonus = null;
                h_bonus_dan = null;
                n_arr = null;
                n_arr_dan = null;
                m = 0;
                m_dan = 0;
                n = 0;
                opts = null;
                _c_arr = null;
                val = null;
            }

            // 解除引用便于js垃圾回收
            check = null;
            len = null;
        }
        // 组合过关处理流程:注数、总金额以及理论最高奖金清零
        if (ggmethod == 2) {
            // 这里的数据都是初始化的数据
        }

    // 未定胆处理流程
    } else {
        // 自由过关处理流程
        if (ggmethod == 1) {

            // 取得自由过关的串关数
            var opts = $("#zyChuanBox span input[name='zyChuan']:checked");
            var len = opts.length;

            // 选了串关的处理
            if (len > 0) {
                // 拼装选中的串关二维数组_c_arr，如果选了2c1和3c1 结果为：_c_arr = new
                // Array("2c1","3c1");
                var _c_arr = new Array();
                for ( var i = 0; i < len; i++) {
                    _c_arr.push($(opts[i]).attr("id"));
                }

                /**
                 * 拼装选中的场次赛果赔率二维数组_h_bonus以及赛果二维数组_n_arr 
                 * _h_bonus结果为：_h_bonus = new Array(new Array("1.7"),new Array("1.5","1.9"),new Array("1.6","1.7","2.5")); 
                 * _n_arr结果为：_n_arr = new Array(new Array("3"),new Array("3","1"),new Array("3","1","0"));
                 */
                var h_bonus = null;
                var n_arr = null;
                var m = 0;
                var n = 0;
                $("#danMaList").find("dd p span[class='w-70'] input").each(function(i) {
                    if (!$(this).is(":hidden")) {
                        h_bonus = new Array();
                        n_arr = new Array();
                        _sub_tmp =  new Array();
                        n = 0;
                        $(this).parent().parent().parent().find("span em").each(function(i) {
                            if (!$(this).is(":hidden")) {
                                _sub_tmp.push($(this).attr("odd"));
                                n_arr[n] = $(this).attr("type");
                                n++;
                            }
                        });
            			_sub_tmp.sort(compare);
                        _h_bonus[m] = _sub_tmp[0];
                        _n_arr[m] = n_arr;
                        m++;

                        // 解除引用便于js垃圾回收
            			_sub_tmp = null;
                        h_bonus = null;
                        n_arr = null;
                        n = null;
                    }
                });

                // 计算注数
                betSum = calcBetSum(_n_arr, _c_arr);

                // 取得倍数
                var beiTou = $("#beiTou").val();
                if (beiTou == "") {
                    beiTou = 1;
                    $("#beiTou").val("1");
                }

                // 计算总金额
                jinE = calcBonus(betSum, 2, beiTou);

                // 计算理论最高奖金
                liLunJinE = calcHighestBonus(_h_bonus, _c_arr, beiTou);

                // 解除引用便于js垃圾回收
                _c_arr = null;
                h_bonus = null;
                n_arr = null;
                m = null;
                n = null;
                beiTou = null;
                _h_bonus = null;
                beiTou = null;
            }

            // 解除引用便于js垃圾回收
            opts = null;
            len = null;
        }
        // 组合过关处理流程
        if (ggmethod == 2) {

            // 取得组合过关的串关数
            var cl = $("input[name='zhChuan']:checked").attr("id");

            // 选了串关的处理
            if (cl != "") {
                /**
                 * 拼装选中的场次赛果赔率二维数组_h_bonus以及赛果二维数组_n_arr 
                 * _h_bonus结果为：_h_bonus = new Array(new Array("1.7"),new Array("1.5","1.9"),new Array("1.6","1.7","2.5")); 
                 * _n_arr结果为：_n_arr = new Array(new Array("3"),new Array("3","1"),new Array("3","1","0"));
                 */
                var h_bonus = null;
                var n_arr = null;
                var m = 0;
                var n = 0;
                $("#danMaList").find("dd p span[class='w-70'] input").each(function(i) {
                    if (!$(this).is(":hidden")) {
                        h_bonus = new Array();
                        _sub_tmp =  new Array();
                        n_arr = new Array();
                        n = 0;
                        $(this).parent().parent().parent().find("span em").each(function(i) {
                            if (!$(this).is(":hidden")) {
                                _sub_tmp.push($(this).attr("odd"));
                                n_arr[n] = $(this).attr("type");
                                n++;
                            }
                        });
                        _h_bonus[m] = _sub_tmp[0];
                        _n_arr[m] = n_arr;
                        m++;

                        // 解除引用便于js垃圾回收
                        _sub_tmp = null;
                        h_bonus = null;
                        n_arr = null;
                        n = null;
                    }
                });

                // 计算注数
                betSum = calcCombCrBetSum(cl, _n_arr);

                // 取得倍数
                var beiTou = $("#beiTou").val();
                if (beiTou == "") {
                    beiTou = 1;
                    $("#beiTou").val("1");
                }

                // 计算总金额
                jinE = calcBonus(betSum, 2, beiTou);

                // 计算理论最高奖金
                liLunJinE = calcCombCrHighestBonus(_h_bonus, cl, beiTou);

                // 解除引用便于js垃圾回收
                beiTou = null;
                h_bonus = null;
                n_arr = null;
                m = null;
                n = null;
            }

            // 解除引用便于js垃圾回收
            cl = null;
        }

        // 注数
        $("#betSum").html(betSum);
        // 总金额
        $("#jinE").html(jinE);
        // 理论最高奖金
        $("#liLunJinE").html(liLunJinE);

        // 解除引用便于js垃圾回收
        betSum = null;
        jinE = null;
        liLunJinE = null;
        ggmethod = null;
        danNum = null;
        _h_bonus = null;
        _h_bonus_dan = null;
        _n_arr = null;
        _n_arr_dan = null;
    }
}

/**
 * <p>Desc:控制浮动jczqTable_fd和touzhu_box 基于/tangram-min.js库</p>
 */

//2013-10-12 modify by liuxu
//function controlFloat(){
//	$(window).scroll(function(){
//		var scrollH = $(document).scrollTop();
//		var tabH = $("#jczqTable").height();
//		if($(".EmInfo").is(':visible')){
//			if(scrollH > 360){
//				$(".jczqTable_fd").css({"top":scrollH - 360});
//			}else{
//				$(".jczqTable_fd").css({"top":""});
//			}
//		}else{
//			if(scrollH > 332){
//				$(".jczqTable_fd").css({"top":scrollH - 332});
//			}else{
//				$(".jczqTable_fd").css({"top":""});
//			}
//		}
		
//	});
//}

function controlFloat() {
    $(window).scroll(function () {
        var scrollH = $(document).scrollTop();
        var tabH = $("#jczqTable").height();
        if ($(".EmInfo").is(':visible')) {
            if (scrollH > 360) {
                $(".jczqTable_fd").css({ "position": "fixed" });
            } else {
                $(".jczqTable_fd").css({ "position": "static" });
            }
        } else {
            if (scrollH > 332) {
                $(".jczqTable_fd").css({ "position": "fixed" });
            } else {
                $(".jczqTable_fd").css({ "position": "static" });
            }
        }

    });
}

/*function controlFloat(){
    var jczqTable_fd = baidu(".jczqTable_fd");
    var jczqTable_fd_offset = jczqTable_fd.offset();
    var jczqTable_fd_top_def = parseInt(jczqTable_fd_offset.top);

    // var touzhu_box = baidu("#touzhu_box");
    // var touzhu_box_offset = touzhu_box.offset();
    // var touzhu_box_top_def = parseInt(touzhu_box_offset.top);

    baidu(window).scroll(function(){
	    var _top = baidu(this).scrollTop();
	    if(_top > jczqTable_fd_top_def){
		    jczqTable_fd.css("top",_top - jczqTable_fd_top_def);
	    }else{
		    jczqTable_fd.css("top","");
	    }
	
	    // var touzhu_box_height = parseInt(touzhu_box.height());
	
	    // if(_top > touzhu_box_top_def){
		// touzhu_box.css("position","absolute");
		// touzhu_box.css("left","0px");
		// touzhu_box.css("top",_top - touzhu_box_top_def);
		// if(parseInt(document.body.offsetHeight) - (touzhu_box_height + _top)
		// < parseInt( baidu(".footer").height())){
		// touzhu_box.css("top",parseInt( baidu(".footer").offset().top) -
		// touzhu_box_height - 35);
		// }
	    // }else{
		// touzhu_box.css("position","");
		// touzhu_box.css("left","");
		// touzhu_box.css("top","");
	    // }
    });
}*/
(function(di,cd,bY){
	if(di.JS){
		return
		}
	var cA,
	bO=Function,
	bR=[].slice,
	b0=[].concat,
	cC=+new Date(),
	by={}.toString,
	bw=Math.random,
	b9={}.hasOwnProperty,
	de=/[^, ]+/g;
	function c4(a,b){
		return b9.call(a,b)
		}
	function dz(a){
		return a
		}
	function cc(a){
		return parseInt(a,10)
		}
	function cJ(){
		return bR.call.apply(bR,arguments)
		}
	function dm(a){
		return function(b){
			return by.call(b)==="[object "+a+"]"}
		}
	var cr=dm("Object"),b2=dm("String"),bz=dm("Function"),
	cl=function(a){return bz(a)&&a.call},cX=dm("Number"),ca=dm("Boolean"),bN=dm("Date"),dC=dm("RegExp"),bV=dm("Array");
	function dl(b,a){return cl(b)?b:(cl(a)?a:dz)}
	function bI(a){return a===null||a===bY}
	function cK(a,b){return a&&typeof a==="object"&&(b=a.nodeType)&&(b===1||b===9)}
	function cu(a){return !!a&&cr(a)&&cl(a.isPrototypeOf)}
	function cY(a){return typeof a==="object"&&isFinite(a.length)&&a.nodeType===bY&&!a.setInterval}
	function cs(d,b,a){if(d){for(var c=0,e=d.length;c<e;c++){if(false===b.call(a||d[c],d[c],c,d,e)){break}}}return a||d}
	function df(d,b,a){var e,c=0;if(d){for(e in d){if(c4(d,e)&&false===b.call(a||d[e],d[e],e,d,c++)){break}}}return a||d}
	function bW(a,c,b){return(a&&cY(a))?cs(a,c,b):df(a,c,b)}
	function cT(a){var b={};df(a,function(c,d){b[c]=d});return b}
	function du(a,b){if(a){if(b in a){delete a[b]}else{a[b]=1}return b in a}}
	function b5(a,b){var c=cJ(arguments,2);return function(){return b.apply(a,c.concat(cJ(arguments)))}}
	function cH(c,b,a){return bW(c,function(f,g,e,d){this.push(b.call(a||f,f,g,e,d))},[])}function ct(c,b,a){return cs(c,function(f,g,e,d){if(b.call(a||f,f,g,e,d)){this.push(f)}},[])}function bH(e,d,c){var b=e.length,a=0;for(;a<b;a++){if((a in e)&&(c?e[a]===d:e[a]==d)){return a}}return -1}function cv(e,a,d){for(var b=0,c=e.length;b<c;b++){if(a.call(d||e[b],e[b],b,e,c)){return true}}return false}function dE(e,a,d){for(var b=0,c=e.length;b<c;b++){if(!a.call(d||e[b],e[b],b,e,c)){return false}}return true}function bK(c,b,d,a){bW(c,function(f,g,h,e){if(d===bY){d=f}else{d=b.call(a||f,d,f,g,h,e)}});return d}function c5(a){return df(a||{},function(b,c){this.push(c)},[])}function cw(a){return df(a||{},function(b,c){this.push(b)},[])}function cM(b,c,a){return(a?ct:dE)(bV(b)?b:[b],function(d){return bH(c,d)>-1})}function cV(e,a,d){var b=dl(a,function(f){return a===f});for(var c=e.length;c--;){if(b.call(d||e[c],e[c],c,e,d)){e.splice(c,1)}}return e}function bL(a){return cs(a,function(c,b){this[b]=c},[])}function cq(){return b0.apply([],cs(arguments,function(a){this.push(cY(a)?bL(a):a)},[]))}function dk(){var a=cJ(arguments),b=a.pop();return cs(a,function(c){this[c]=b},{})}function dy(c,b){var a=0;return cs(c,function(d,e){if(bV(d)){a=cX(d[1])?cc(d[1]):a;d=d[0]}this[d]=a++},b||di)}function bE(a){return(a||"guid")+"_"+cc(bw()*900000).toString(16)+"_"+(++cC).toString(16)}function bx(b,a){var e={},c=[],h=[],g=bE("unique"),f="|string|boolean|number";cs(b,function(j,k,l){if(!bI(j)){k=typeof j;if(f.indexOf(k)>0){l=(a?"":k)+j;if(!(l in e)){e[l]=1;h.push(j)}}else{if(!j[g]){j[g]=1;c.push(j);h.push(j)}}}});for(var d=c.length;d--;){try{delete c[d][g]}catch(i){c[d][g]=null}}return h}function b4(b,a){b=dl(b,bO());b.fn=b.prototype=a||{};return b}function cb(d,a,b){var c;b=bV(b)?b:[];cs(d,function(e){if(cl(e)){c=e.apply(a,b);if(c===false){return c}}});return c}function dn(c){var e,f,d;function a(g,h){if(!d||!(h in c)){c[h]=g}}if(c){e=arguments;f=e.length;d=false===e[f-1];for(var b=1;b<f;b++){df(e[b],a)}}return c}function b8(c,a,b){c=bI(c)?(a||[]):c;if(bV(c)){return c.slice()}if(b2(c)&&b!==false){return c.match(de)||[]}if(cY(c)){return bL(c)}return[c]}function cW(a){df(a,function(c,d,b){delete b[d]})}function db(a,b){return dn(this,b2(a)?dk(a,b):(cl(a)?a.apply(this,cJ(arguments,1)):a))}function c3(b,a){this.__cache__={};if(b!==bY){this.def=b;this.isVF=a}}dn(c3.prototype,{has:function(a){return c4(this.__cache__,a)},set:function(a,b){this.__cache__[a]=b},get:function(d,b,a){var e=arguments.length,c=this.__cache__;if(e){if(!this.has(d)){if(e<2){b=this.def;a=this.isVF}if(b!==bY){this.set(d,0);this.set(d,(a&&cl(b))?b.call(this,d):b)}}}return e?c[d]:c},clear:function(b){var a=this.__cache__;if(arguments.length){delete a[b]}else{cW(a)}}});function cG(d,b,a,c){a=cA.arrayLike(a)?a:false;return cA.forEach(b8(d),function(f,e){if(b&&c4(b,f)){this[f]=b[f];if(c){delete b[f]}}else{if(a&&(e in a)){this[f]=a[e]}}},{})}function c6(a){return bI(a)?0:(a.length===+a.length?a.length:c5(a).length)}function dj(c,b){b=b||"";var d=cl(b),a=function(e){return d?b.call(e,e):(b in e?e[b]:"__nogroup__")};return cs(c,function(e){this.get(a(e)).push(e)},new c3(function(){return[]},true)).get()}function cP(){return df(dj.apply(null,arguments),function(a,b){this[b]=a.length},{})}function cU(e,a,c,b){var d=cA.arrayify(e),f=d[0];if(d.length>1){f=cA.assy(f,d[1])}else{if(b2(f)||cX(f)){return a.call(b,f)}}cA.forIn(f,function(g,h){c.call(b,h,g)});return b}var cn,cR=/^\s+|\s+$/g,c0=/[\w@\-\$\*!~\:>#]+/g,dA=/^[A-Z]\w*$/,b1=/msie\s*(\d+)/i,cI=/\{\{([\w%]+)\}\}/g,bA=/([^=;&?# ]+)\s*=\s*([^=;&?# ]+)/g,ck=/(\d)(?=(\d{3})+($|\.))/g,c9=/\r?\n/g,b3=/'/g,dv={toString:bO("return '[object Namespace]'"),IS_NAMESPACE:true};function bP(d,c,a,b){var e=cJ(arguments,1);return cl(d)?d(c):(d+"").replace(a||cI,function(g,h){var f=cA.result(h.indexOf("%")===0?e[h.slice(1)]:c[h],c);return bI(f)?"":f})}function dt(a,c){var b=a.indexOf(c);b=b>-1?b:a.length;return[a.slice(0,b),a.slice(b+2)]}function bB(c){var e="",f,a,d;if(!(c in dt)){a=c.replace(c9," ");while(a){f=dt(a,"<@");e+="_+='"+f[0].replace(b3,"\\'")+"';\n";f=dt(f[1],"@>");e+=((f[0].indexOf("=")===0)?("_+="+f[0].slice(1)+";"):f[0])+"\n";a=f[1]}try{d=dt[c]=bO("$0",'var _="",args=arguments,data=$0||"";'+e+"\nreturn _;")}catch(b){bD("\u6A21\u677F\u9519\u8BEF\n"+c,"error");d=dt[c]=function(){return""}}d.renderTo=function(h,g){$$(h).html(d.apply(this,cJ(arguments,1)))}}return dt[c]}function cj(a){return a.replace(cR,"")}function bG(){function a(b){if(cl(b)){a.ready(b);return a}return db.apply(a,arguments)}return dn(a,dv)}function bX(a){return a&&cl(a)&&a.IS_NAMESPACE}function dD(a){var c=di,b=b2(a);if(b){cs(a.match(c0)||[],function(d){if(c4(c,d)){if(!bX(c[d])){throw Error('Invalid namespace "'+d+'"')}}else{c[d]=bG()}c=c[d]})}else{c=bG()}return db.apply(c,cJ(arguments,b?1:0))}cA=dD("JS");cn={STATES:dy(["done","error",["progress",1],"stop"],{}),update:function(d,e,b){var a=this.thens,c=e>this.STATES.error?[]:b8(a[e]);this.data=d;this.state=b;if(b!=="progress"){c=c.concat(a[2]);a.length=0;this.update=function(){return this};this.isEnd=true}cb(c,this.context,d);return this},then:function(b,c,a){return bW([b,c,a],function(e,d){if(cl(e)){if(this.isEnd){if(d===this.STATES[this.state]||d>1){e.apply(this.context,this.data)}}else{this.thens[d].push(e)}}},this)}};df(cn.STATES,function(b,a){cn[a]=function(){return this.update(cJ(arguments),b,a)}});function dp(a){var b=function(){return b.then.apply(b,arguments)};b.context=a||b;b.thens=[[],[],[]];return dn(b,cn)}var dF,da,cf,cm=document,bF=di.ActiveXObject,cN=/^([^\?]+)(?:(\?[^#]+)?(#.*)?)?$/,cB=/^(#|html|body)/,cp=navigator.userAgent,cZ=bF?cc(b8(cp.match(b1),[0,48])[1]):false;function dg(a,d,e){var b=e.sender,c;e.sender=this;c=a.apply(e,d);e.sender=b;return c}da={__initBefore__:dz,__initAfter__:dz,initialize:function(){this.callSuper.apply(this,cq("initialize",arguments))},callSuper:function(d){var c="!turn-point",b=cJ(arguments,1),a,e;if(!(c in this)){this[c]=this}e=this[c]["super"];while(e&&!c4(e,d)){e=e["super"]}if(e){this[c]=e;a=e[d].apply(this,b)}delete this[c];return a},toString:function(){return"[object "+this.__guid__+"]"},on:function(c,a,e){if(b2(c)){var f=b8(c);if(f.length>1){return cs(f,function(g){this.on(g,a,e)},this)}c=f[0];var d=this.__callbacks__.get(c),b=this.bind(a);d.push([a,b]);if("lastCall" in d&&e){b.apply(this,d.lastCall)}}else{if(cl(c)){this.__NotListening__=c}else{if(cr(c)){df(c,function(g,h){this.on(h,g,e)},this)}}}return this},once:function(a,c,b){var d=function(e){this.off(a,d);c.call(this,e)};return this.on(a,d,b)},off:function(b,a){var c=this.__callbacks__;if(!arguments.length){c.clear()}else{cs(b8(b),function(e){var d=c.get(e);if(a){cV(d,function(f){return f[0]===a})}else{d.length=0}})}return this},trigger:function(d){var e=arguments,b=cJ(e,1),c=this.__NotListening__,a=this.__callbacks__.get(d);a.lastCall=b;if(b2(this.name)&&dF&&this!==dF){dF.send.apply(dF,cq(this.name+":"+d,this,b))}return a.length?cb(cH(a,function(f){return f[1]}),this,b):(c?c.apply(this,e):bY)},change:function(b,c,a){return b2(b)?this.on("change:"+b,c,a):(cl(b)?this.on("change",b,c):df(b,function(d,e){this.change(e,d,a)},this))},destroy:function(){this["class"]._INSTANCE=null;this.trigger("destroy");cW(this);this.__isdestroyed__=cA.now()},extend:db,bind:function(a){var b=this;return cl(a)?function(){return dg.call(this,a,arguments,b)}:this.__bindCache__.get(a,function(){if(cl(b[a])){return dg.call(this,b[a],arguments,b)}bD('\u627E\u4E0D\u5230\u5BF9\u8C61\u65B9\u6CD5"'+a+'"',"error")})},set:function(b,d,c){if(b2(b)){var e=this.__attributes__,a=e[b];e[b]=d=dl(this.set[b]).call(this,d,a);this.__attributes2__[b]=a;if(!c){this.trigger("change:"+b,d,a);this.trigger("change");if(this.db&&this.db.trigger){this.db.trigger("change:"+b,this,d,a)}}return this}else{return df(dn.apply(null,arguments),function(g,f){this.set(f,g,d)},this)}},get:function(b,d){var c=d?this.__attributes2__:this.__attributes__,a;if(arguments.length){return cA.result(dl(this.get[b]).call(this,c[b]),this)}else{a={};cA.forIn(c,function(e,f){a[f]=cA.result(e,this)},this);return a}},has:function(a){return c4(this.__attributes__,a)},addUI:function(a,b,c){if(b2(a)){a=dk(a,b);b=c}return df(a,function(e,d){this.ui[d]=cA.domEngine(e,b2(e)&&cB.test(e)?null:b)},this).ui}};function cL(b,a){function c(){var e=cJ(arguments);if(e[0]!==cL){return new c(cL,e)}var d=this["class"];if(a){if(d._INSTANCE){return d._INSTANCE}else{d._INSTANCE=this}}this.__guid__=bE(b);this.__callbacks__=new c3(function(){return[]},true);this.__bindCache__=new c3();this.__attributes__=dn({},this.defaults);this.__attributes2__=dn({},this.defaults);this.ui={};this.__initBefore__.apply(this,e[1]);this.initialize.apply(this,e[1]);this.__initAfter__.apply(this,e[1])}c.toString=bO('return "[class '+b+']"');c.extend=function(d){return b6(cA.extend(d,{Extends:c}))};return c}function b6(){var h,g,a,b,d,f="",i=this,e=da,c=[];cs(arguments,function(j){if(b2(j)){f=j}else{if(bV(j)||j===cA.ready){d=j}else{if(cl(j)){c.push({initialize:j})}else{if(j===true){h=true}else{if(cu(j)){c.push(j);g=g||j.Extends}}}}}});if(f&&!dA.test(f)){throw Error('Invalid class name "'+f+'"')}if(g){e=cl(g)?g.fn:g;if(!cA.isStdObject(e)){throw Error("Invalid super class")}}a=new (b4(0,e))();b=b4(cL(f||"*",h),a);dn(a,{"super":e,"class":b});if(f){if(c4(i,f)){throw Error('class "'+f+'" is exists')}i[f]=b}dn.apply(0,cq(a,c));if(d){cA.when(d).then(function(){b()})}return b}dn(cA,{Cache:function(a,b){return new c3(a,b)},fire:cb,ie:function(a,b){return cZ?[cZ,cZ===a,cZ>=a&&cZ<=b][arguments.length]:false},alert:function(b){try{b=JSON.stringify(b,false,"\t")}catch(a){b=cA.toJSON(b,0,1)}alert(b)},isOldMode:/BackCompat/i.test(document.compatMode),getDoc:function(){return cA.isOldMode?document.body:document},match:function(b,a){var d=[],c;a.lastIndex=0;do{c=a.exec(b);if(c){d.push(c)}}while(c&&a.global);return d},parseParam:function(a,d,c){var b=dl(d);return cs(cA.match(a,c||bA),function(f,e){this[f[1]]=b(f[2])},{})},toParam:function(a,c,b){c=dl(c);return cH(a,function(e,d){return d+"="+c(e)}).join(b||"&")},addParam:function(b,a){return b.replace(cN,function(c,e,d,f){c=cA.toParam(dn({},cA.parseParam(d),a));return e+(c?("?"+c):"")+(f||"")})},addVersion:function(a,b){return cA.addParam(a,{_ver:(cj(b)=="no-cache"?(cA.now()+bw()):b)+""})},stringf:bP,tmpl:function(a){return bB(a)},prefix:function(b,a,c){b+="";a=cc(a)||2;c=b2(c)?c.charAt(0):"0";while(b.length<a){b=c+b}return b},datef:(function(){var b="\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d",a="yy,yyyy,M,MM,d,dd,H,HH,h,hh,m,mm,s,ss,ms,w,a".split(",");return function(f,h){var c=cA.toDate(f),d=cA.prefix,e=[0,c.getFullYear(),c.getMonth()+1,3,c.getDate(),5,c.getHours(),7,8,9,c.getMinutes(),11,c.getSeconds(),13,d(c.getMilliseconds(),3),b.charAt(c.getDay())],g=e[6]>12;e[0]=(e[1]+"").slice(-2);e[8]=e[6]-(g?12:0);for(var i=13;i>2;i-=2){e[i]=d(e[i-1])}e[16]=(g?"\u4e0b":"\u4e0a")+"\u5348";e=cA.subObj(a,false,e);return b2(h)?cA.stringf(h,e):e}})(),toDiff:function(a){return cA.subObj("d,dd,h,hh,m,mm,s,ss,ms",0,bK([86400000,3600000,60000,1000,1],function(c,e,d){var b=Math.floor(a/e);a%=e;return c.concat(d==4?cc(b/100):b,cA.prefix(b))},[]))},toDate:function(a){return cA.isDate(a)?a:(new Date(b2(a)?a.replace(/-/g,"/"):a))},result:function(b,a){return cl(b)?b.apply(a,cJ(arguments,2)):b},toRmb:function(a,b,d){var c=parseFloat(a).toFixed(d===bY?2:d).toString().split(".");c[0]=c[0].replace(ck,"$1,");return(b===false?"":"\uffe5")+c.join(".")},isStdObject:function(a){return da===a||da.isPrototypeOf(a)},unicode:function(a){return a.replace(/[^\u0000-\u00FF]/g,function(b){return"\\"+escape(b).slice(1)})},toJSON:function(a,c,b){if(cu(a)){return"{"+cH(a,function(e,d){return'"'+d+'":'+cA.toJSON(b?(e+""):e,c,b)})+"}"}else{if(bV(a)){return"["+cH(a,function(d){return cA.toJSON(d,c,b)}).join(",")+"]"}}return b2(a)?('"'+(c?cA.unicode(a):a)+'"'):(cX(a)||ca(a)||dC(a)?a:(bN(a)?a.getTime():null))},parseJSON:function(b){try{return bO("return ("+b+")")()}catch(a){}},intString:function(a,c,d){var b=(a+"").replace(/^0|\D/g,"");if(b==""){return c===false?b:(c+"")}if(d!==false){b=Math.min(d,b)||0}if(c!==false){b=Math.max(c,b)||0}return b+""},random:function(a){return cs(a,function(c,e,d,b){d=Math.floor(bw()*b);a[e]=a[d];a[d]=c},a)},range:function(a,d,e,c,b){if(d>e){b=d;d=e;e=b}return a>e?(c?d:e):(a<d?(c?e:d):a)},now:function(){return new Date().getTime()},trim:cj,aop:function(d,c,e){var a,b=cl;if(!b(d)){throw Error("aop target is not a function")}a=function(){var f=cJ(arguments),g;if(b(c)){g=c.call(this,f)}if(g&&g.stop===true){return g.returnValue}g=d.apply(this,f);if(b(e)){g=e.call(this,f,g)}return g};a._AOP_ORIGIN=d._AOP_ORIGIN||d;return a},wait:function(c,a){var d,b;b=function(){var e=this,f=cA.args(arguments);b.stop();d=setTimeout(function(){if(!b.disabled){c.apply(e,f)}},a||72)};b.stop=function(){clearTimeout(d)};return b},iterator:function(e,d){var c=0,a=e.length;function b(){return c<a}b.next=function(){return e[c++]};b.index=function(){return c};b.id=d;return b},task:function(a,b){var c=dp(b);if(cl(a)){a.call(b,c,b)}return c},isTask:function(a){return a&&a.update===cn.update},toTask:function(b,a){if(!cA.isTask(b)){if(cX(b)){return cA.task(function(c){setTimeout(function(){c.done()},b)},a)}else{if(cl(b)){b=b.call(a)}else{if(b&&(b2(b)||b.url)){b=cA.load(b)}else{if(bV(b)){b=cA.when(b,a)}}}}}return b},when:function(b,a){return cA.task(function(i){var f,c=b8(b),d=bH(c,true)>-1||c.async,h=c.length,g=0;function e(){var j=cA.toTask(c.shift(),a);if(d&&c.length){e()}return cA.isTask(j,a)?j.then(0,0,f):f(cJ)}f=function(j){g++;if(j!==cJ){i.progress(j,cc(g/h*100),g,h)}if(!d){return c.length?e():i.done(g,h)}else{if(g>=h){i.done(g,h)}}};e()},a)},domEngine:function(a,b){return cl(a)?a():cA.find(a,b)},find:function(a,b){if(b){b=cA.find(b);if(bV(b)){b=b[0]}}else{b=document}if(b2(a)){if(!b){return[]}a=cj(a);if(a.charAt(0)=="#"){return b.getElementById(a.slice(1))}var d=a.split("."),c=d[1]?(" "+d[1]+" "):0;return cA.filter(b.getElementsByTagName(d[0]),function(e){return c?(" "+e.className+" ").indexOf(c)>-1:true})}return a},some:cv,every:dE,forEach:cs,map:cH,indexOf:bH,reduce:bK,filter:ct,remove:cV,forIn:df,each:bW,inArray:cM,has:c4,size:c6,func:dl,assy:dk,noop:dz,intt:cc,args:cJ,arrayify:bL,flatten:cq,groupBy:dj,countBy:cP,subObj:cG,get_set:cU,clearObj:cW,keys:c5,values:cw,invert:cT,toggle:du,Enum:dy,classify:b4,extend:dn,toArray:b8,bind:b5,getGuid:bE,unique:bx,arrayLike:cY,isString:b2,isObject:cr,isArray:bV,isNode:cK,isNumber:cX,isDate:bN,isRegExp:dC,isBoolean:ca,isFunction:cl,isPlainObject:cu,isEmpty:bI,log:bD});b6.call(cA,"StdClass",function(){db.apply(this,arguments);dn(this.__attributes__,this.defaults)});dF=cA.StdClass();dF.send=dF.trigger;var bS,bU,co,dB,bC,cF=cd||"stdlib",cz=cA.find("head").pop()||cm.documentElement,b7=new c3(),bJ=new c3(),cE=/[^?#]*\//,ch=/\/\.\//g,dw=/([^:\/])\/\/+/g,bT=/\/[^\/]+\/\.\.\//g,cy=/:\//,bM=/^\./,c1=/^\//,dG=/^.*?\/\/.*?\//,ce=/^([^\/\:]+)(\/.+)$/,c8=/\.(css|js|php|jps|aspx?)(?=\?|$)/,dx=/#$/,dr=/\.css(?:\?|$)/i,cQ=/^(loaded|complete|undefined)$/,cg="^.*?\\/(?=("+cF+"[^\\/]*\\/)?"+cF+"[^\\/]*\\.js)",cS=(cp.replace(/.*AppleWebKit\/(\d+)\..*/,"$1"))*1<536;function bD(b,c){try{return cA._log?cA._log(b):console[c||"log"](b)}catch(a){}}function dd(a){return b8(a.match(cE))[0]}function bZ(c,d,b){var a=c=="text"?cm.createTextNode(d):df(d||{},function(e,f){this.setAttribute(f,e)},cm.createElement(c));return b?b.appendChild(a):a}bS=dd(location.href);bU=cA.find("#stdlib_node")||cA.find("script").pop();bC=bU.getAttribute("data-main");cf=di[bU.getAttribute("data-lib")||"jQuery"];co=b8((bU.hasAttribute?bU.src:bU.getAttribute("src",4)).match(cg),[bS])[0];if(cf){cA.domEngine=function(){return cf.apply(di,arguments)}}dB={timeout:7,charset:"utf-8",alias:{},vars:{},paths:{"~":bS},map:[],autoload:[]};function dq(a,b){if(b2(a)){a=dk(a,b)}df(a,function(c,e){var d=dB[e];if(cu(d)){if(cu(c)){return dn(d,c)}}else{if(bV(d)){dB[e]=ct(d.concat(c),dz)}else{dB[e]=c}}});return dB}function ds(a){return b8(a.match(dG),["/"])[0]}function ci(a){a=a.replace(ch,"/").replace(dw,"$1/");while(a.match(bT)){a=a.replace(bT,"/")}return a}function c2(a,b,c){if(!cy.test(a)){if(c1.test(a)){a=ds(bS)+a.slice(1)}else{if(bM.test(a)||b){a=dd(b||bS)+a}else{a=co+a}}}if(c){if(dx.test(a)){a=a.slice(0,-1)}else{if(!c8.test(a)){a=a.split("?");a[0]+="."+c.replace(/\.+/g,"");a=a.join("?")}}}return a}function cx(b,a){cs(a,function(c,d){b=cl(c)?c(b):(bV(c)&&dC(c[0])&&c[0].test(b)?cA.addVersion(b,c[1]):b)});return b}function dc(a,b,c){if(!b2(a)){return""}a=cj(a);b=b||"";c=c||"js";return a?b7.get(b+a+c,function(){var d=dB.alias[a]||a;d=d.replace(ce,function(f,e,g){return(dB.paths[e]||e)+g});d=ci(c2(cA.stringf(d,dB.vars,false),b,c));d=cx(d,dB.map);b7.set(d,d);return d},true):""}function cO(b,c,a){if(!c){cz.removeChild(b)}b.onload=b.onerror=b.onreadystatechange=null;a()}function dh(b,d){var e,c=b.sheet;if(cS){e=!!c}else{if(c){try{e=!!c.cssRules}catch(a){e=a.name==="NS_ERROR_DOM_SECURITY_ERR"}}}setTimeout(function(){return e?d():dh(b,d)},10)}function cD(c,a,d){if(d&&(cS||!("onload" in c))){return setTimeout(function(){dh(c,a)},1)}var b=setTimeout(function(){cO(c,d,a)},dB.timeout*1000);c.onload=c.onerror=c.onreadystatechange=function(){if(cQ.test(c.readyState)){clearTimeout(b);cO(c,d,a);c=bY}}}function c7(b,a){return bJ.get(b,function(){var e=cz.firstChild,d=dr.test(b),c=bZ(d?"link":"script");return cA.task(function(f){cD(c,function(){f.done(b)},d);c.charset=a||dB.charset;if(d){c.rel="stylesheet";c.href=b}else{c.async=true;c.src=b}c=e?cz.insertBefore(c,e):cz.appendChild(c)})},true)}function bQ(c,b,a){return cA.when(cH(cq(dB.autoload,b8(c,false,false)),function(d){if(cl(d)){d=d()}if(b2(d)&&cj(d)){d=dk("url",d)}return d&&d.url?function(){return c7(dc(d.url),d.charset)}:d===true}),a).then(b)}dn(cA,{config:dq,getRoot:ds,dirname:dd,trimPath:ci,formatURI:dc,getFullPath:c2,element:bZ,style:function(a){if(cm.createStyleSheet){cm.createStyleSheet().cssText+=a}else{bZ("text",a,bZ("style",{type:"text/css"},cz))}},cwd:function(a){return bS+(a||"")},base:function(a){return co+(a||"")},load:bQ});dn(dv,{Class:b6,message:dF,ready:function(a){return cA.task(function(c,b){bQ([],function(){function d(){dl(a).call(b,b);c.done()}return cA.domEngine(d)})},this)}});dn(cA,dv,false);dn(di,{namespace:dD,log:bD,imports:function(a,b){return b?bQ(a):dq("autoload",b8(a))}});if(bC){bQ(bC)}log("JS-Stdlib 1.0.9")})(this,"yclass");var pagestarttime=+new Date();(function(){var ah,aJ,aA=/^(?:\s*[^#\s]*)#(\w+)[^\S>]*\s*$/,ac=/<(\w+)[^>]*>/,ai=/^<\w+>$/,al=/\s*,\s*/,ad=/^(?:src|href|action)$/i,at=/#([^.#\[\]]+)/,ap=/\[([\w\-]+)(?:([!~\^\*\$]?=)([^=]*))?\]/g,aB=/\[([\w\-]+)(?:([!~\^\*\$]?=)([^=]*))?\]/,an=/\.((?:[\w\u0128-\uFFFF_\-]|\\.)+)/,aw=/(?:^|\s+)((?:[\w\u0128-\uFFFF\*_\-]|\\.)+)/,X=/:([\w\-]+)/,U=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]+\]|[^\[\]]+)+\]|\\.|[^ >+~,(\[]+)+|[>+~])(\s*,\s*)?/g,aq=/^(button|text|radio|checkbox|image|submit|reset|password|file|hidden|checked)$/i,aK=/^(use|style|ready|single|Extends)$/,au=/[^\.0-9+\-]/,aF=/width|height|margin|padding|left|top|bottom|right|size|spacing|indent|radius/i,az={},ay={},V={},ag={},ao={},aG={},ax=[],aN={},e=Function,aa=Object.prototype.toString,aI=Array.prototype.slice,aj=document.createElement("DIV"),Z=/^(tr|table|tbody|tfoot|thead|caption|col|colgroup)$/i;function aC(a,c,b){return V.isFunction(a)?a.call(this,c,b):(V.isArray(a)?((b in a)?a[b]:c):a)}function ae(a){return a}var aD=function(){};az.newSub=function(a){aD.prototype=a;return new aD()};az.getObj=function(){return(function(d,a){for(var b=1,c=d.length;b<c;b+=2){a[d[b-1]]=d[b]}return a})(arguments,{})};ah=az.getObj("tbody",["table"],"thead",["table"],"tfoot",["table"],"tr",["table","tbody"],"td",["table","tbody","tr"],"th",["table","thead","tr"],"caption",["table"],"colgroup",["table"],"col",["table","colgroup"]);aJ=az.getObj("getparent","parentNode","getnext","nextSibling","getchild","childNodes","getprev","previousSibling");az.error=function(a,b,c){if(arguments.length===1||b){throw new Error("<"+(this.Type||"YClass")+"> "+a)}return c};az.mix=function(b,c,d,a){return JS.extend(b,a?JS.subObj(JS.toArray(a),c):c,d)};az.aop=function(){var a=JS.filter(arguments,function(b){return JS.isFunction(b)});return function(){var f,c=aI.call(arguments);for(var b=0,d=a.length;b<d;b++){f=a[b].apply(this,c.concat(f));if(false===f){break}}return f}};function av(c,a,b){az.mix(this,az.getObj("x",c||0,"y",a||0,"z",b||0))}av.prototype={offset:function(c,a,b){return new av(this.x+~~c,this.y+~~a,this.z+~~b)},distance:function(a){return Math.sqrt(Math.pow((this.x-a.x),2)+Math.pow((this.y-a.y),2))},polar:function(c,a){var b=-a*Math.PI/180;return new av(this.x+~~(Math.cos(b)*c),this.y+~~(Math.sin(b)*c))}};function ar(c,f,b,d,a){az.mix(this,az.getObj("x",c||0,"y",f||0,"z",a||0,"width",b||0,"height",d));this.left=this.x;this.top=this.y}ar.prototype={toPoint:function(c,a,b){return new av(this.x+~~c,this.y+~~a,this.z+~~b)},offset:function(d,f,c,b,a){return new ar(this.x+~~d,this.y+~~f,this.width+~~c,this.height+~~b,this.z+~~a)},getXArea:function(a){return(function(c,b,d){return b(0,b(0,d(c.x+c.width,a.x+a.width)-b(c.x,a.x))*b(0,d(c.y+c.height,a.y+a.height)-b(c.y,a.y)))})(this,Math.max,Math.min)}};az.mix(Function.prototype,{proxy:function(a){return JS.bind(a,this)},slow:function(b){var a,c=this;return function(){var d=aI.call(arguments),f=this;clearTimeout(a);a=setTimeout(function(){c.apply(f,d)},~~b||16);return a}}},false);Array.up=e("a, b","return parseFloat(a) - parseFloat(b) > 0 ? 1 : -1");az.mix(Array.prototype,{each:function(a,b){return JS.forEach(this,a,b)},random:function(){JS.random(this);return aI.apply(this,arguments)},remove:function(c,a){var b=c;if(JS.isArray(c)){b=function(d){return JS.indexOf(c,d)>-1}}return JS.remove(this,b,a)},indexOf:function(b,a){return JS.indexOf(this,b,true)},map:function(a,b){return JS.map(this,a,b)},filter:function(a,b){return JS.filter(this,a,b)},reduce:function(a){return JS.reduce.apply(JS,JS.flatten(this,arguments))},$$:function(){return $$(this)}},false);String.zero=e("s, n",'n = ~~n || 2; return s.toString().replace(/\\b\\d\\b/g,"0$&")');az.mix(String.prototype,{trim:function(){return JS.trim(this)},tpl:function(a,b){b=b===undefined?"":b;return this.replace(/\{\$([^$\}]+?)\}/g,function(c,d){d=d.trim().split(".");var f=a;try{while(d.length){f=f[d.shift()]}}catch(g){f=b}return f===undefined?b:f})},format:function(){var a=arguments;return this.replace(/\{(\d+)\}/g,function(b,c){return a[c-1]===undefined?"":a[c-1]})},like:function(a){return !a&&a!==""?false:this.trim().toLowerCase()===a.toString().trim().toLowerCase()}},false);az.mix(Date.prototype,{format:function(b,a){var c=/(YY|Y|MM|M|DD|D|hh|h|mm|m|ss|s|dd|d)/g;b=((b||"YY\u5e74MM\u6708DD\u65e5 \u661f\u671fdd")+"").replace(c,"{{$1}}").replace(/\bYY\b/g,"yyyy").replace(/\b\Y\b/g,"yy").replace(/\bdd?\b/g,"w").replace(/\bDD?\b/g,function(d){return d.toLowerCase()});return JS.datef(this,b)},diff:function(a,b){return(JS.toDate(a)-this).toTimeDiff(b)}});az.mix(Number.prototype,{rmb:function(b,a){return JS.toRmb(this,b,a)},toTimeDiff:function(b){var a=JS.toDiff(this),c=[a.d,a.h,a.m,a.s,a.ms];return b?JS.map("\u5929,\u65f6,\u5206,\u79d2,\u6beb\u79d2".split(","),function(d,f){return c[f]+d}):c},range:function(a,b){return JS.range(this,a,b||0)}});(function(d,a,b){a=/msie/.test(d)&&!/opera/.test(d)?"ie":(/firefox/.test(d)?"firefox":(/webkit/.test(d)&&!/chrome/.test(d)?"safari":(/opera/.test(d)?"opera":(/chrome/.test(d))?"chrome":"unknown")));b=a=="safari"?"version":a;ay[a]=parseInt(b&&RegExp("(?:"+b+")[\\/: ]([ \\d.]+)").test(d)?RegExp.$1:"0",10);ay.browserName=a;var c=d.match(/(trident.*rv\D+)([\d.]+)/i);if(c){ay.ie=parseInt(c[2],10);ay.browserName="ie"}})(navigator.userAgent.toLowerCase());az.mix(Math,{c:function(a,b){return(function(g,h,d,c,f){for(;d<=b;){h*=d++;g*=c--}return g/h})(1,1,1,a,a)},cl:function(d,f,a){var b=[];function c(h,j,g){if(g===0||a&&b.length==a){b[b.length]=h;return h}for(var i=0,l=j.length-g;i<=l;i++){if(!a||b.length<a){var k=h.slice();k.push(j[i]);c(k,j.slice(i+1),g-1)}}}c([],d,f);return b},p:function(a,d){for(var c=a-d,b=1;c<a;){b*=++c}return b},pl:function(d,f,a){var b=[];function c(h,k,g){if(g===0||a&&b.length==a){b[b.length]=h;return h}for(var i=0,j=k.length;i<j;i++){if(!a||b.length<a){c(h.concat(k[i]),k.slice(0,i).concat(k.slice(i+1)),g-1)}}}c([],d,f);return b},dt:function(a,b,c){return a>=c?0:Math.c(b,c-a)},dtl:function(g,c,f,a){var b=[];if(g.length<=f){b=Math.cl(c,f-g.length,a);for(var d=b.length;d--;){b[d]=g.concat(b[d])}}return b},bl:function(g,c){var f,b,d=0,h=[];for(var a=g.length;a--;){d+=(1/g[a])}f=c/d;for(a=g.length;a--;){b=f/g[a];h[a]=b}return h},round2:function(a){if(/\d+\.\d\d5/.test(a.toString())){var b=a.toString().match(/\d+\.\d(\d)/);return(b&&b[1]%2==1)?parseFloat(a).toFixed(2):parseFloat(b[0])}else{return parseFloat(parseFloat(a).toFixed(2))}},a:function(b){var c=1;for(var a=0,d=b.length;a<d;a++){c*=b[a]}return d?c:0},al:function(b,a){var g=0,c=[],h=[],f=JS.isFunction(a);function d(m,i){if(i>=m.length){if(!f||false!==a(h)){c.push(h.slice())}h.length=i-1}else{var j=m[i];for(var k=0,l=j.length;k<l;k++){h.push(j[k]);d(m,i+1)}if(i){h.length=i-1}}}if(b.length){d(b,g)}return c}});["String","Number","Boolean","Array","Object","RegExp","Date","Function"].each(function(a){V["is"+a]=function(b){return aa.call(b).indexOf(a)>-1&&b!==null&&b!==undefined&&!b.nodeType&&!b.alert}});var am=!!window.addEventListener;az.mix(az,{getNoop:function(){return ae},parseVal:aC,getInt:function(a,c){var b=JS.intt(a);return isNaN(b)?(c||0):b},getDate:function(b,a){b=JS.toDate(b);return isNaN(b)?a:b},sliceB:function(h,c,g){var f=/[^\x00-\xff]/,a=h,d,i=0,b=h.length;for(;i<b;i++){d=h.charAt(i);c-=f.test(d)?2:1;if(c<=0){a=h.slice(0,i+1);break}}return JS.isFunction(g)?g.call(this,h,a.length>b):a},repeat:function(f,g){var a=JS.func(g,e("a,b","return a+(~~b)"));for(var b=0,d=[],c=f>>>0;b<c;b++){d[b]=a.call(this,b,g)}return d},dejson:function(a){return JS.parseJSON(a)},getMapPath:function(a,b){if(b&&a.indexOf(".")<0){return JS.base("lib/"+a+"/"+a.split("/").pop()+".js")}return a.replace(/@(\/)?/,JS.base()).replace(/([^:])\/+/g,"$1/").trim()},getGuid:function(a){if(a){a=this.one(a);if(a.yclassuid===undefined){a.yclassuid=JS.getGuid(a.nodeName||(a.Type?a.Type:typeof a))}return a.yclassuid}return"_"+JS.getGuid()},Point:function(c,a,b){return new av(c,a,b)},Rect:function(d,f,c,b,a){return new ar(d,f,c,b,a)},$:function(c,d,r){var i,k,f,n,p,l,o,a,b,g,h,m;m=document;i=[];if(!JS.isString(c)){if(c){if(d==="toArray"||JS.arrayLike(c)){i=JS.arrayify(c)}else{if(c instanceof aH){i=c.nodes}else{if(c){i=[c]}}}}}else{g=c.match(aA);if(g){g=m.getElementById(g[1]);if(g){i=[g]}}else{if(ac.test(c)){var j,q;j=RegExp.$1.toLowerCase();a=ai.test(c)?c.replace(/<(\w+)>/,"<$1></$1>"):c;q=ah[j];if(q){a="<"+q.join("><")+">"+a+"</"+q.slice().reverse().join("></")+">"}aj.innerHTML=a;return q?this.$(j,aj.firstChild):this.$(aj.childNodes,"toArray")}else{k=c.split(al);f=d?this.$(d):[m];(function(s){for(var u=0,y=f.length;u<y;u++){d=f[u];for(var v=0,t=k.length;v<t;v++){n=k[v].match(U);b=d;h=n?n.length:0;if(h){g=n[0].match(aA);if(g){b=m.getElementById(g[1]);n.shift();h--}}if(h&&b){p=[];l=s._parseRule(n[h-1]);if(b==m&&(n[0].indexOf(".")>-1||n[0].indexOf(":")>-1)){b=m.body}o=(l["."]&&b.getElementsByClassName)?b.getElementsByClassName(l["."]):b.getElementsByTagName(l.tag?l.tag:l.type?(aq.test(l.type)?"input":"*"):"*");for(var w=0,x=o.length;w<x;w++){if(p.length>0&&r){i=p;return i}else{if(s._isMatchNode(o[w],n,b)){p[p.length]=o[w]}}}}else{p=(b===m||!b)?[]:b}i=i.concat(p)}}})(this);if((k.length>1||f.length>1)&&!r){i=az._uniqueObj(i)}}}}return i},get:function(){return new aH(this.$.apply(this,arguments),this)},_uniqueObj:function(g){var f,h,b;f={};h=[];for(var a=0,d=0,c=g.length;a<c;a++){b=this.getGuid(g[a]);if(!(b in f)){f[b]=true;h[d++]=g[a]}}return h},_parseRule:(function(a){return function(g){var d,c,f=a[g],h=g;if(!f){f={};h=h.replace(at,"[id=$1]");d=h.match(ap);if(d){f.attr=[];for(var b=d.length;b--;){c=d[b].match(aB);f.attr[b]={k:c[1],q:c[2]||"",v:c[3]||""}}h=h.replace(ap," ")}d=h.match(X);if(d){f.type=d[1].toLowerCase()}d=h.match(an);if(d){f.klass=d[1]}d=h.match(aw);if(d){f.tag=d[1].toLowerCase()}a[g]=f}return f}})({}),_isMatchNode:function(b,a,c){var f,d=a.length;f=a[d-1];if(f&&this._isMatchSelf(b,f)){return d>1?this._isMatchParent(b,a,c):true}},_isMatchParent:function(g,f,a){var d,b,c;for(b=f.length-1;b--;){d=f[b];c=d==">";g=g.parentNode;while(g){if(g!==a){if(c){if(b--===0){return false}d=f[b]}if(this._isMatchSelf(g,d)){break}else{if(c){return false}}}else{return c&&!b}g=g.parentNode}}return true},_isMatchSelf:function(c,a){var b=this._parseRule(a);return(!b.tag||c.nodeName.toLowerCase()===b.tag)&&(!b.klass||(" "+c.className+" ").indexOf(" "+b.klass+" ")>-1)&&(!b.type||this._isMatchType(c,b.type))&&(!b.attr||this._isMatchAttrs(c,b.attr))},_isMatchType:function(b,c){if(aq.test(c)&&c!="checked"){return b.type&&b.type.toLowerCase()===c}switch(c){case"empty":return b.childNodes.length===0;case"checked":return b.checked;case"disabled":return b.disabled;case"visited":return b.style.display!="none";default:var a=aG[c];return a?a(b):false}},_isMatchAttrs:function(b,d){for(var c=d.length;c--;){var a=d[c];if(!this._isMatchAttr(b,a.k,a.q,a.v)){return false}}return true},_isMatchAttr:function(b,c,g,h){var f=b.getAttribute(c)||"",d=b[c]||"";switch(g){case"":return !!f;case"=":return f===h||d===h;case"^=":return f.indexOf(h)===0||d.indexOf(h)===0;case"$=":var a=RegExp(h+"$");return a.test(f)||a.test(d);case"*=":return f.indexOf(h)>-1||d.indexOf(h)>-1;case"~=":h=" "+h+" ";return(" "+f+" ").indexOf(h)>-1||(" "+d+" ").indexOf(h)>-1}},one:function(c,b,a){return this.$(c,b,true)[0]||null},need:function(a){return this.get.apply(this,arguments)},clearEvents:function(){var a=this.__Events;JS.forIn(a,function(b){for(var c=0,d=b.length;c<d;c++){this.__removeEvent.apply(this,b[c])}},this);JS.clearObj(a);return this},addNoop:function(a){return JS.each(JS.toArray(a),function(b){if(!(b in this)){this[b]=ae}},this)},__addEvent:am?function(a,b,c,d){return a.addEventListener(b,c,!!d)}:function(a,b,c){return a.attachEvent("on"+b,c)},__removeEvent:am?function(a,b,c){return a.removeEventListener(b,c,false)}:function(a,b,c){return a.detachEvent("on"+b,c)},fixEvent:function(b,a){b=b||window.event;b.el=a;if(!b.stopPropagation){b.target=b.srcElement;b.stopPropagation=function(){b.cancelBubble=true};b.preventDefault=function(){b.returnValue=false}}b.stop=b.stopPropagation;b.end=b.preventDefault;return b},on:function(g,c,j,b){var h,d,i,f,a=this;return this.$(g).each(function(k){a.error("on("+j+"):\u4e8b\u4ef6\u53e5\u67c4\u5fc5\u987b\u662f\u4e00\u4e2a\u51fd\u6570 ",!V.isFunction(j));var l=c;if(l=="wheel"){return a.wheel(k,j)}else{if(k.nodeName&&k.nodeName.like("iframe")&&l=="load"){return a.loadIframe(k,j)}}d=a.getGuid(k);if(!a.__Events[d]){a.__Events[d]=[]}h=a.__Events[d];i=false;if(l.match("^focusin|focusout$")&&!a.ie){l=l=="focusin"?"focus":"blur";i=true}if(l.match("^mouseenter|mouseleave$")&&!a.ie){l=l=="mouseenter"?"mouseover":"mouseout";f=function(m){if(b){a.un(k,l,f)}var n=m.relatedTarget;if(!n||!k.contains(n)){return j.call(k,a.fixEvent(m,this),a)}}}else{f=function(m){if(b){a.un(k,l,f)}return j.call(k,a.fixEvent(m,this),a)}}h.push([k,l,f,j]);a.__addEvent(k,l,f,i)},this)},un:function(i,a,b){var h,d,g,f,c;d=e("return true");g=e("a, b","return a === b");f=a?g:d;c=this.isFunction(b)?g:d;return this.$(i).each(function(j){h=this.__Events[this.getGuid(j)];if(h){h.remove(function(k){if(f(k[1],a)&&c(k[3],b)){this.__removeEvent.apply(this,k);return true}},this);if(h.length===0){delete this.__Events[this.getGuid(j)]}}},this)},clearRange:function(){try{return window.getSelection?window.getSelection().removeAllRanges():document.selection.empty()}catch(a){}},attr:function(b,c,a){var d=this.getGuid(b),f=this.__DomDatas[d];return JS.get_set(JS.args(arguments,1),function(g){return f?(g===undefined?this.mix({},f):f[g]):undefined},function(h,g){if(!this.isObject(f)){f=this.__DomDatas[d]={}}f[c]=a},this)},_super:(function(b,a){return function(c){if(this.__CSLEVEL===b){this.__CSLEVEL=this.__YProto__}if(this.__CSLEVEL&&V.isFunction(this.__CSLEVEL[c])){a=this.__CSLEVEL[c];this.__CSLEVEL=this.__CSLEVEL.__YProto__||null;a.apply(this,aI.call(arguments,1))}delete this.__CSLEVEL}})(),base:function(){return this._super.apply(this,["index"].concat(aI.call(arguments)))},nav:function(h,g,a,b){var f,d,c;c=[];f=this.isString(g)?aJ[g.toLowerCase()]||"nextSibling":"nextSibling";d=this.isFunction(a)?a:function(i){return V.isString(a)?az._isMatchSelf(i,a):true};h=f=="childNodes"?h.firstChild:h[f];f=f=="childNodes"?"nextSibling":f;if(h){do{if(!/SCRIPT|BR/i.test(h.nodeName)&&h.nodeType==1&&d(h)){c[c.length]=h;if(!b){return h}}h=h[f]}while(h)}return b?c:(c.length?c[0]:[])},__fixClass:function(a){return a.trim().replace(/\s+/g," ")},hasClass:function(a,b){return !b||(" "+a.className+" ").indexOf(" "+aC.call(a,b,a.className)+" ")!=-1},addClass:function(a,b){if(!this.hasClass(a,b)){a.className=az.__fixClass(a.className+" "+b)}},removeClass:function(a,c,b){if(az.hasClass(a,c)){a.className=az.__fixClass((" "+a.className+" ").replace(RegExp(" "+c+"(?= )","g"),""))}},swapClass:function(g,f,d,b){var c=g.className,a=(b===undefined||!b)?[f,d]:[d,f];c=(a[0]&&az.hasClass(g,a[0]))?c.replace(RegExp(a[0],"g"),""):c;c+=(a[1]&&!az.hasClass(g,a[1]))?" "+a[1]:"";g.className=az.__fixClass(c)},toggleClass:function(b,a){this[this.hasClass(b,a)?"removeClass":"addClass"](b,a)},createNode:function(c,b){var a=document.createElement(c||"DIV");if(b){this.one(b).appendChild(a)}return new aH([a],this.bindUnload(a))},bindUnload:function(a){return aI.call(arguments).each(function(b,c){if(!/STYLE|SCRIPT|LINK/i.test(az.one(b).nodeName)){this.__UnNodes[az.getGuid(b)]=b}},this)},removeNode:function(a,b){this.$(a).each(function(c){if(b){while(c.firstChild){c.removeChild(c.firstChild)}}else{if(c.parentNode){aj.appendChild(c.parentNode.removeChild(c))}aj.innerHTML=""}},this)},addStyle:function(b,a){if(/\.css/.test(b)){JS.load(this.getMapPath(b))}else{JS.style(b)}return this},getCursorXY:function(b,d){var c,f,a;c=this.getSize();f=this.Point(b.clientX+c.scrollLeft,b.clientY+c.scrollTop);d=this.get(d).nodes[0];if(d){a=this.get(d).getXY();f=f.offset(-a.x,-a.y)}else{if(this.ie){f=f.offset(-~~document.body.offsetLeft,-~~document.body.offsetTop)}}return f},__addPx:function(a,b){return(!au.test(b)&&aF.test(a))?(b+"px"):b},setStyle:(function(){var d="progid:DXImageTransform.Microsoft.Alpha(opacity=",c=/[A-Z]/g,a=e("i",'return "-"+i.toLowerCase()');function b(f){return f.replace(/-([a-z])/g,function(h,g){return g.toUpperCase()})}return function(h,g,f){var i=this.__addPx;this.$(h).each(function(j){var k=j.style;if(f===undefined){if(!V.isString(g)){g=JS.map(g,function(l,m){return m.replace(c,a)+":"+i(m,l)+(m=="opacity"?";filter:"+(l==1?"":(d+l*100+")")):"")}).join(";")}k.cssText+=";"+g}else{g=b(g);k[g]=i(g,f);if(g==="opacity"&&ay.ie){k.filter=f<1?d+az.getInt(f*100)+")":"";k.zoom=1}}})}})(),getStyle:function(a,b,c){return a.style[b]==""||c?(a.currentStyle||document.defaultView.getComputedStyle(a,null))[b]:a.style[b]},getDisplayVal:function(a){var f,d,b,c;c=this.attr(a,"-style-display-cache");if(c){return c}else{c=this.getStyle(a,"display");if(c!="none"){this.attr(a,"-style-display-cache",c);return c}}f=a.nodeName;d=ag[f];if(!d){b=this.createNode(f,document.body);ag[f]=d=b.getStyle("display");b.empty(true)}return d==""||d=="none"?"block":d},setNodeDisplay:function(h,c,a,b){var g=b===undefined?this.getDisplayVal(h):b,f=a?[g,"none"]:["none",g],d=c?f[0]:f[1];if(d!=this.getStyle(h,"display")){h.style.display=d}},showNode:function(a,c,b){return this.setNodeDisplay(a,arguments.length===1||c,true,b)},hideNode:function(a,c,b){return this.setNodeDisplay(a,arguments.length===1||c,false,b)},setXY:function(a,h,b){var c,g,f,d;c=h.origin?this.getXY(this.one(h.origin)):this.Point(0,0);f=a.offsetParent;if(f&&f!==document.documentElement&&f!==document.body){d=this.getXY(f);c=c.offset(-d.x,-d.y)}g=this.getObj("left",c.x+~~h.x+"px","top",c.y+~~h.y+"px");return b?g:this.setStyle(a,g)},getXY:function(d,f){var a,b,c;a=d.getBoundingClientRect();f=this.get(f).nodes[0];if(f){b=f.getBoundingClientRect();return this.Point(a.left-b.left,a.top-b.top)}else{c=this.getSize();return this.Point(a.left+c.scrollLeft,a.top+c.scrollTop)}},getRect:function(f,d){var g,a,b;if(arguments.length===0){g=this.getSize();return this.Rect(g.scrollLeft,g.scrollTop,g.offsetWidth,g.offsetHeight)}else{f=this.one(f);b=f.style.cssText;f.style.cssText+=(this.get(f).getStyle("display")=="none"?";display:"+this.getDisplayVal(f):"")+(d?";height:auto;float:left":"");a=d?{}:this.get(f).getXY();var c=this.Rect(a.x,a.y,f.offsetWidth,f.offsetHeight,a.z);f.style.cssText=b;return c}},getSize:function(a,f){var c,g,d,b;c=this.ie<9?2:0;f=f||window;d=f.document.documentElement;b=f.document.body;g=f.document.compatMode=="CSS1Compat"?d:b;if(a===undefined||a==d||a==document.body){return{scrollLeft:Math.max(d.scrollLeft,b.scrollLeft)-c,scrollTop:Math.max(d.scrollTop,b.scrollTop)-c,scrollWidth:g.scrollWidth,scrollHeight:Math.max(g.clientHeight,g.scrollHeight),offsetWidth:g.clientWidth,offsetHeight:g.clientHeight}}return this.one(a)},wheel:function(a,b){var c="onmousewheel" in document?"mousewheel":"DOMMouseScroll";return this.get(a).on(c,function d(h,g){var f,i;f=h.wheelDelta?h.wheelDelta/120:-(h.detail||0)/3;i=window.opera&&window.opera.version()<10?-1:1;h.end();h.offset=Math.round(f)*i;b.call(h.target,h,g)})},loadIframe:function(a,b){a=this.one(a);function c(){b.call(a.contentWindow);if(a.detachEvent){a.detachEvent("onload",c)}else{a.onload=null}}if(a.attachEvent){a.attachEvent("onload",c)}else{a.onload=c}return this},fx:function(l,c){var g,k,f,i,a,d,b,m,n,h;d=this;c=Object(c);h=this.getInt(c.time,480);g=new Date();k=c.mx;n=c.over;i=c.tween instanceof Function?c.tween:function(o){return 0.5-Math.cos(o*Math.PI)/2};b=c.end||this.getNoop();function j(s,o,p,q){var r=+s+(o-s)*Math.min(1,(q||i)(m));return p?r.toFixed(2):~~r}if(!c.init||false!==c.init.call(d)){if(k&&k in this.__FxMutexs){if(n||n===undefined){this.endFx(this.__FxMutexs[k])}else{return this.__FxMutexs[k]}}f=setInterval(function(){if(d.$_pause||aM.config("$_pause")){g=new Date()-a}else{a=new Date()-g;m=Math.min(1,a/h);if(false===l.call(d,j,m)||m===1){d.endFx(f,true)}}},this.getInt(this.$_hz,10));this.addTimer(f,b,k)}return f},addTimer:function(a,c,b){this.__FxTimers[a]=this.getObj("end",c,"mutex",b);if(b){this.__FxMutexs[b]=a}return a},endFx:function(a,c){if(this.__FxTimers){if(a){var b=Object(this.__FxTimers[a]);if(b.end&&c){b.end.call(this)}delete this.__FxMutexs[b.mutex];delete this.__FxTimers[a];clearInterval(a);clearTimeout(a)}else{JS.forIn(this.__FxTimers,function(d){this.endFx(d,c)},this)}}return this},cookie:function(c,f,d){if(arguments.length===1){var a=JS.parseParam(document.cookie);return c in a?decodeURIComponent(a[c]):null}else{if(JS.isNumber(d)){d=JS.assy("expires",d)}var b=JS.extend({expires:900000000000000000000},d);b.expires=new Date(JS.now()+b.expires*1000).toGMTString();document.cookie=c+"="+encodeURIComponent(f)+";"+JS.toParam(b,false,";");return this}},param:function(a,b){return b?JS.addParam(b,a):JS.toParam(a)},qForm:function(b,c){var a=this.one(b);return a?JS.forEach(a.elements,function(d){var f=false;if(d.name){if(/select/i.test(d.type)){f=d.selectedIndex>-1?d.value:false}else{if(/checkbox|radio/i.test(d.type)){f=d.checked!==false?d.value:false}else{f=d.value}}if(false!==f){this[d.name]=c?encodeURIComponent(f):f}}},{}):{}},sendForm:function(i){var a,j,d,g,f,c,b,h;g=this;if(i.form){d=g.need(i.form)}else{c=d=this.get('<form method="'+(i.type||"POST")+'" '+(i.isupload?' enctype="multipart/form-data"':"")+"></form>").insert()}if(!i.target){a=document.getElementById("yclass_send_iframe");if(!a){a=this.get('<div style="position:absolute;left:-9999px"><iframe id="yclass_send_iframe" name="yclass_send_iframe" src="about:blank"></iframe></div>').insert().find("iframe").one()}i.target="yclass_send_iframe"}d.prop("target",i.target).prop("action",function(k){return i.url||k});h=d.prop("action");b=i.data;if(b){f=this.createNode("div",d);JS.forIn(b,function(k,l){az.__insertInput(this,l,k)},f.one())}i.end=i.end||i.success;if(i.end){j=function(){var n,l;try{l=a.contentWindow.document}catch(k){l={}}n=g.getObj("error",!l.body,"url",h);try{n.text=l.body.innerHTML}catch(m){n.text=""}try{n.xml=g.ie?l.XMLDocument||null:l}catch(o){n.xml=null}i.end.call(g,n);if(a.detachEvent){a.detachEvent("onload",j)}else{a.onload=null}};if(a.attachEvent){a.attachEvent("onload",j)}else{a.onload=j}}d.one().submit();if(f){f.empty(true)}if(c){c.empty(true)}},__insertInput:function(b,c,a){JS.element("INPUT",{tyep:"hidden",name:c,value:a},b)},getXHR:(function(a){return window.ActiveXObject?function(){try{return new ActiveXObject(a)}catch(b){return new ActiveXObject(a="Microsoftf.XMLHTTP")}}:function(){return new XMLHttpRequest()}})("Msxml2.XMLHTTP"),ajaxQuery:function(d){var h,k,b,c,g,a,f,i;h=this.getXHR();k=JS.extend({type:"GET",data:null,encode:"UTF-8",__nextQuery:this.getNoop(),time:0,cache:!!this.C("$_ajaxCache"),retry:1,retime:200},d);k.end=k.end||k.success||noop;k.url=d.url||location.href;k.async=!!d.end||!!d.success;b=k.type.toUpperCase()=="POST";c=b?this.param(k.data):null;g=b?k.url:this.param(k.data,k.url);h.open(k.type,g,k.async);try{h.responseType="msxml-document"}catch(l){}if(b){h.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset="+k.encode)}a=k.cache?(aN[k.url]||0):0;h.setRequestHeader("If-Modified-Since",a);if(aN[k.url+"ETag"]){h.setRequestHeader("If-None-Match",aN[k.url+"ETag"])}if(!k.hideType){h.setRequestHeader("X-Requested-With","XMLHttpRequest")}f=this;function j(){h.onreadystatechange=ae;h.abort();h=null}if(k.async){h.onreadystatechange=function(){var m,n;if(h.readyState==4){clearTimeout(k.timer);m=h.status==200;if(m&&k.cache){aN[k.url]=h.getResponseHeader("Last-Modified");aN[k.url+"ETag"]=h.getResponseHeader("ETag")}n={url:d.url,text:h.responseText,xml:h.responseXML,status:h.status,error:h.status!=200?h.status:false,date:Date.parse(h.getResponseHeader("Date")),type:k.type,xhr:h,returnValue:k.returnValue};if(h.status!=200&&h.status!=304&&(--k.retry)>0){setTimeout(function(){f.ajaxQuery(k)},k.retime)}else{k.__nextQuery(k.end.call(f,n,d))}j()}};if(k.time>0){k.timer=setTimeout(function(){j();k.__nextQuery(k.end.call(f,{error:"timeout"}))},k.time)}}h.send(c);if(!k.async){i={xml:h.responseXML,text:h.responseText,date:Date.parse(h.getResponseHeader("Date")),error:h.status!=200?h.status:false,status:h.status};h.abort();h=null}return k.async?this:i},ajax:(function(b,a){return function(){var d,i,f;i=d=aI.call(arguments);f=this;if(this.isString(d[0])){i=[this.getObj("url",d[0],"end",d[1],"data",Object(d[2]),"type",d[3]||"GET")]}if(b>=f.ajaxQuery.max){a[a.length]=i;return i}function h(j){var k,l;k=i.shift();if(k&&j!==false){k.returnValue=j;f.ajaxQuery(k)}else{b--;l=a.shift();if(l){f.ajax.apply(f,l)}}}for(var g=0,c=i.length;g<c;g++){i[g].__nextQuery=h}b+=(i.end?1:0);return this.ajaxQuery(i.shift())}})(0,[]),XMLNode:function(a,b){return(function(h,g,d,f,i,c){if(a&&a.nodeType==1){if(b){JS.forEach(a.childNodes,function(j){if(j.nodeType==1){g[j.nodeName]=j.text||j.textContent||""}})}else{JS.forEach(a.attributes,function(j){g[j.nodeName]=j.nodeValue})}h=a.text||a.textContent||""}return{node:a,items:g,text:h}})("",{},{})},qXml:function(a,b,c,d){return(function(j,i,k,g,f,h){if(b){if("selectNodes" in i){k=i.selectNodes(a)}else{h=b.evaluate(a,i,b.createNSResolver(b.documentElement),XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);if(h){for(f=h.iterateNext();f;f=h.iterateNext()){k[k.length]=f}}}if(c){JS.forEach(k,function(m,l){return c.call(j,j.XMLNode(m,g),l)})}}j.qXml.tagMode=false;return k})(this,d||b,[],this.qXml.tagMode)},loadScript:function(c,b,d,f){c=this.getMapPath(c,true);if(d){d=JS.subObj("url,data,charset",d,[c]);if(d.data){d.url=JS.addParam(d.url,d.data)}}var a=d||c;return f?a:JS.load(a,b)},use:function(b,c,d){var a=this;if(this.isString(b)){b=JS.toArray(b)}else{if(this.isFunction(b)){return this.ready(b)}}this.ready(function(){JS.load(JS.map(b,function(f){return a.loadScript(f,false,d,true)}),c,a)});return this},remove:function(){this.__Unload()},onMsg:function(a,b){ao[a]=this.isArray(ao[a])?ao[a]:[];ao[a].push({guid:this.getGuid(this),fn:b,yobj:this})},postMsg:function(a){return(function(h,c,f,b,g,d,i){JS.forEach(c[a],function(j,k,l){f++;i=j.fn.apply(j.yobj,b);if(undefined!==i){g={from:j.yobj+"",data:i};return false}});return h.mix(g,{length:f})})(this,ao,0,aI.call(arguments,1),{})},toString:e('return this.Type+""')});az.mix(az,ay);az.mix(az,V);az.data=az.attr;function aH(c,b,a){this.lastNodes=V.isArray(a)?a:[];this.nodes=V.isArray(c)?c:[];this.ns=b}var aL=aH.prototype;az.mix(aL,{each:function(a,b){return JS.forEach(this.nodes,a,b||this)},map:function(a,b){return JS.map(this.nodes,a,b||this)},size:function(){return this.nodes.length},closest:function(a){return this.parent(a)},siblings:function(a){return this.prevAll(a).add(this.nextAll(a))},addSelf:function(){return this.add(new aH(this.lastNodes,this.ns))},first:function(){return this.eq(0)},last:function(){return this.size()?this.eq(this.size()-1):this.eq(0)},one:function(a){if(JS.isString(a)){return this.get(a).one()}a=~~a;return this.nodes[a<0?Math.max(0,this.nodes.length+a):a]},eq:function(a){var b=this.one(a);return new aH(b?[b]:[],this.ns,this.nodes)},on:function(b,c,d){if(JS.isString(b)){var a={};JS.forEach(JS.toArray(b),function(f){a[f]=c});b=a}else{d=c}JS.forIn(b,function(f,g){this.ns.on(this.nodes,g,f,d)},this);return this},un:function(a,b){this.ns.un(this.nodes,a,b);return this},live:function(d,b,c){var a=d.match(U);b=b=="focus"?"focusin":b=="blur"?"focusout":b;return this.on(b,function(h,g){var f=h.target;do{if(az._isMatchNode(f,a,this)){h.el=f;return c.call(f,h,g)}}while((f=f.parentNode)&&f!==this)})},fireEvent:function(b,a){return this.nodes.each(function(d){if(document.createEventObject){return d.fireEvent("on"+b,az.mix(document.createEventObject(),a))}else{var c=document.createEvent("HTMLEvents");c.initEvent(b,true,true);return !d.dispatchEvent(az.mix(c,a))}},this)},hasClass:function(a){return this.size()?this.nodes.filter(function(b){return !az.hasClass(b,a)}).length===0:false},getBgXY:(function(){var a="backgroundPosition";return ay.ie?function(){return az.Point.apply(this,[this.getStyle(a+"X"),this.getStyle(a+"Y")])}:function(){return az.apply(this,this.getStyle(a).split(" "))}})(),getStyle:function(a,b){return this.size()?this.ns.getStyle(this.one(),a,b):undefined},setStyle:function(b,a){return this.each(function(c,d){this.ns.setStyle(c,b,a)})},css:function(a,b){return JS.get_set(arguments,this.getStyle,this.setStyle,this)},setTopmost:function(a){var b=aM.C("-sys-topmoust-z");a=~~a||1;if(!b){aM.C("-sys-topmoust-z",b=50*10000)}b+=a;this.setStyle("zIndex",b);if(a>0){aM.C("-sys-topmoust-z",b)}return this},getSize:function(){return az.getSize(this.one())},setCenter:function(g,k){var f,i,a,h,c,l,d,j,b;f=this.nodes[0];if(f){this.setStyle("position:absolute");d=f.offsetParent!=document.body&&f.offsetParent!=document.documentElement?this.get(f.offsetParent).getXY():az.Point(0,0);l=c=az.getSize();j=0;try{if(parent!=window){l=az.getSize(undefined,parent);b=window.frameElement;if(b){do{j+=b.offsetTop;b=b.offsetParent}while(b)}}}catch(m){}i=f.offsetWidth;a=f.offsetHeight;h=az.Point(az.getInt((c.offsetWidth-i)/2+c.scrollLeft-d.x),Math.min(c.scrollHeight-a-10,Math.max(0,az.getInt((l.offsetHeight-a)*(k?0.5:0.382)+l.scrollTop-d.y-j))))}return g?h:this.setXY(h)},fade:function(b){if(arguments.length===0){var a=this.getStyle("opacity");return ay.ie?a===undefined?1:a:a}return this.setStyle("opacity",b)},fadeTo:function(a,c,b){return this.each(function(f){var d=this.fade();this.ns.fx(function(h,g){this.setStyle(f,"opacity",h(d,a,true))},az.getObj("end",c,"time",b,"mx",this.ns.getGuid(f),"tween",ae))})},setXY:function(a){return this.each(function(b,c){this.ns.setXY(b,a)})},getXY:function(a){return this.size()?this.ns.getXY(this.one(),a):this.ns.Point(0,0)},getRect:function(){return this.nodes.length?this.ns.getRect(this.one()):this.ns.Rect()},width:function(a){return arguments.length?this.css("width",a):this.getRect().width},height:function(a){return arguments.length?this.css("height",a):this.getRect().height},insert:function(d,f){var b,a,c;a=this.ns;b=document.createDocumentFragment();d=d===undefined?document.body:a.one(d);d=d.nodeName.like("table")?d.getElementsByTagName("TBODY")[0]:d;c=d.childNodes?d.childNodes.length:0;this.nodes.each(function(h,g){b.appendChild(h);if(f=="wrap"){d.parentNode.insertBefore(h,d);h.appendChild(d)}else{if(f=="inwrap"){a.get(d.childNodes).insert(h);d.appendChild(h)}}});if((f+"").indexOf("wrap")==-1){if(f=="prev"){d.parentNode.insertBefore(b,d)}else{if(f=="next"){if(d.nextSibling){d.parentNode.insertBefore(b,d.nextSibling)}else{d.parentNode.appendChild(b)}}else{if(f===undefined||c===0||f===-1||f>=c){d.appendChild(b)}else{d.insertBefore(b,d.childNodes[~~f])}}}}return this},appendTo:function(a){return this.insert(a)},append:function(a){return this.get(a).insert(this)},after:function(a){return this.get(a).insert(this,"next")},before:function(a){return this.get(a).insert(this,"prev")},insertAfter:function(a){return this.insert(a,"next")},insertBefore:function(a){return this.insert(a,"prev")},wrap:function(a){return this.get(a).insert(this,"wrap")},wrapInner:function(a){return this.get(a).insert(this,"inwrap")},html:function(a){return arguments.length===0?(this.size()?this.one().innerHTML:""):this.nodes.each(function(b,c){if(ay.ie&&Z.test(b.nodeName)){b=b.nodeName.like("table")?b.getElementsByTagName("TBODY")[0]:b;while(b.firstChild){b.removeChild(b.firstChild)}return this.get(aC.call(b,a,b.innerHTML,c)).insert(b)}b.innerHTML=aC.call(b,a,b.innerHTML,c)},this)},data:function(){var a=this.ns;return JS.get_set(arguments,function(b){return this.size()?a.attr(this.one(),b):undefined},function(b,c){return this.each(function(f,d){a.attr(f,b,c)})},this)},attr:function(){return JS.get_set(arguments,function(a){return this.size()?this.one().getAttribute(a,ad.test(a)?2:0):undefined},function(a,b){return this.each(function(c,d){c.setAttribute(a,aC.call(c,b,c.getAttribute(a,ad.test(a)?2:0),d))})},this)},attrs:function(a){var b={};a=a||JS.noop;if(this.size()){JS.each(this.nodes[0].attributes,function(d,c){b[d.nodeName]=a(d.nodeValue,d.nodeName)})}return b},prop:function(){return JS.get_set(arguments,function(a){return this.size()?this.one()[a]:undefined},function(a,b){return this.each(function(c,d){c[a]=aC.call(c,b,c[a],d)})},this)},doProp:function(a,b,c,d,f,h,g,i){return this.each(function(j){if(j[a]&&(j[a]+"").indexOf("function")>-1){j[a](b,c,d,f,h,g,i)}})},val:function(a,b){return arguments.length===0?(this.size()?this.one().value:""):this.each(function(f,c){var d=/input|textarea|script/i.test(f.nodeName)?"value":"innerHTML";f[d]=aC.call(f,a,f[d],c)})},empty:function(a){this.ns.removeNode(this.nodes,!a);if(a){this.nodes.length=0}return this},remove:function(){return this.empty(true)},get:function(){return new aH(this.ns.$.apply(this.ns,arguments),this.ns,this.nodes)},find:function(d){for(var a=0,b=[],c=this.nodes.length;a<c;a++){b=b.concat(this.ns.$(d,this.nodes[a]))}return new aH(az._uniqueObj(b),this.ns,this.nodes)},end:function(){return new aH(this.lastNodes,this.ns,this.nodes)},and:function(){return this.get(this.nodes.concat(this.ns.$.apply(this.ns,arguments)))},index:function(){return this.prevAll().size()}});("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error losecapture wheel").split(" ").each(function(a){this[a]=function(b,c){return this.on.call(this,a,b,c)}},aL);aL.delegate=aL.live;aL.add=aL.and;aL.hover=function(a,c,b){return this.on("mouseenter",JS.func(a),b).on("mouseleave",JS.func(c),b)};aL.highRender=function(a,d){if(this.size()){var f=this.nodes[0],c=f.parentNode,b=document.createDocumentFragment();b.appendChild(f);a.call(d,f);c.appendChild(b)}return this};"next,nexts,nextAll,prev,prevs,prevAll,child,childs,children,parent,parents".split(",").each(function(a,b){this[a]=function(d){var c,g=[],f=a.match("^([a-z]+?)(s|All|ren)?$");this.nodes.each(function(h){c=az.nav(h,"get"+f[1],d,!!f[2]);if(c){g=g.concat(c)}});return new aH(az._uniqueObj(g),this.ns,this.nodes)}},aL);"slice,concat,filter,sort,reverse,splice".split(",").each(function(a,b){this[a]=function(){return new aH(this.nodes[a].apply(this.nodes.slice(),arguments),this.ns,this.nodes)}},aL);"addClass,removeClass,toggleClass,swapClass".split(",").each(function(a,b){this[a]=function(c,d,f){return this.each(function(h,g){this.ns[a](h,aC.call(h,c,h.className,g),aC.call(h,d,h.className,g),f)})}},aL);"show,hide".split(",").each(function(a,b){this[a]=function(){var c=aI.call(arguments);return this.each(function(f,d){this.ns[a+"Node"].apply(this.ns,[f].concat(c))})}},aL);"scrollLeft,scrollTop".split(",").each(function(a,b){this[a]=function(){return this.prop.apply(this,[a].concat(aI.call(arguments)))}},aL);aL.hoverClass=function(a){a=a||"hover";return this.hover(function(){Yobj.get(this).addClass(a)},function(){Yobj.get(this).removeClass(a)})};aL.toggleClasssBy=function(b,a){var c=a?"addClass":"removeClass";return this[c](b)};if(window.Node&&Node.prototype&&!Node.prototype.contains){Node.prototype.contains=function(a){do{if(a==this){return true}}while(a&&(a=a.parentNode));return false}}aL.offset=aL.getRect;aL.off=aL.un;aL.position=function(){if(this.size()){var a=this.nodes[0];return{left:a.offsetLeft,top:a.offsetTop}}return{left:0,top:0}};az.ajaxQuery.max=2;az.addNoop("index,onunload,indexBefore");az.__DomDatas={};(function(g){var b=JS.task(),f=g.documentElement.doScroll;az.ready=function(i){return b.then(JS.bind(this,i))};function c(){b.done()}if(g.readyState==="complete"){c()}if(g.addEventListener){var a=function(){g.removeEventListener("DOMContentLoaded",a,false);c()};g.addEventListener("DOMContentLoaded",a,false);window.addEventListener("load",c,false)}else{var d=function(){if(g.readyState==="complete"){c();g.detachEvent("onreadystatechange",d)}};g.attachEvent("onreadystatechange",d);window.attachEvent("onload",c);if(window==window.top){var h=function(){try{f("left");setTimeout(c,72)}catch(i){setTimeout(h,1)}};h()}}})(document);try{document.namespaces.add("v","urn:schemas-microsoft-com:vml");document.execCommand("BackgroundImageCache",false,true)}catch(W){}function ak(){}var aM=function(b,n){var a,m,c,d,g,l,i={},j={},h=[];switch(arguments.length){case 0:var k=aM({});return new k();case 1:n=V.isString(b)?{}:b;b=V.isString(b)?b:""}if(n instanceof Function){n=az.getObj("index",n)}for(var f in n){if(aK.test(f)){i[f]=n[f]}else{j[f]=n[f]}}az.error("Class name need a String",!V.isString(b));l=[false].concat(b.replace(/\s+/g,"").split(">")).slice(-2);g=l[1]||"None";if(g in aM.lib){JS.log(g+" \u7C7B\u91CD\u590D\u5B9A\u4E49\uFF0C\u5DF2\u8DF3\u8FC7","error");return aM.lib[g]}m=i.Extends?i.Extends:l[0];if(JS.isString(m)){m=aM.lib[m];az.error('not found Class "'+l[0]+'" in Lib',!m)}az.error('Class():"'+g+'"\u7684\u7236\u7c7b\u5fc5\u987b\u4e3a\u51fd\u6570\u7c7b\u578b',m&&!(m instanceof Function));a=function(p,o){if(p!==ak){return new a(ak,JS.args(arguments))}if(i.single&&h.length>0){return h[0]}h.push(this);this.Class=a;this.Type=g;this.__Events={};this.__UnNodes={};this.__FxTimers={};this.__FxMutexs={};if(i.use&&(this.isString(i.use)||this.isArray(i.use))){this.use(i.use,function(){this.index.apply(this,o);this.indexBefore()})}else{this.index.apply(this,o);this.indexBefore()}};if(g!="None"){aM.lib[g]=a}az.mix(j,{index:function(){this.base.apply(this,arguments)}},false);c=m?m.prototype:az;d=az.newSub(c);d.__Unload=function(){if(("__Events" in this)&&false!==this.onunload()){this.endFx().clearEvents();if("yclassuid" in this){delete this.__DomDatas[this.yclassuid]}JS.forIn(this.__UnNodes,function(o,p,q){this.removeNode(this.__UnNodes[p])},this);JS.clearObj(this);h.remove(this)}};j.__YProto__=c;a.prototype=az.mix(d,j);a.each=function(o,p){return o?h.slice().each(o,p):h.slice()};ax.push(a);if(i.ready){i.single=true;az.ready(a)}if(i.style){az.addStyle(i.style)}return a};az.lib=aM.lib={};aM.createFactory=function(b,a){az.error('FactoryClass "'+b+'" exists',b in aM.lib);az.lib[b]=a.proxy(az.mix(az.newSub(az),{Type:b}))};(function(a){a.CorePath=JS.base();aM.config=aM.C=az.C=function(b,c){if(arguments.length==1){if(JS.isString(b)){return a[b]}else{JS.extend(a,b)}}else{a[b]=c}};aM.extend=az.extend=function(c,d,b){az[c]=az.error((this.Type||"Class")+'.extend("'+c+'"): key exists',!b&&(c in az),d)};aM.fn=az.fn=aL;aM.addExpr=az.addExpr=function(b,c){aG[b]=c}})({});var ab=new aM(),af=window;JS.Y=new aM();af.Y=af.Yobj=ab;JS.ajax=function(){return Yobj.ajax.apply(Y,arguments)};JS.msg={on:function(){return ab.onMsg.apply(ab,arguments)},send:function(){return ab.postMsg.apply(ab,arguments)}};JS.fx=function(){return Yobj.fx.apply(Yobj,arguments)};JS.vals=function(){return Yobj.C.apply(Yobj,arguments)};JS.use=function(){return Yobj.loadScript.apply(Yobj,arguments)};JS.parseXml=function(c,d,a){var b=[];Yobj.qXml.tagMode=a;Yobj.qXml(d,c,function(f,g){b.push(f.items)});Yobj.qXml.tagMode=false;return b};Yobj.version="3.0";af.Class=af.yclass=af.YClass=aM;af.$$=JS.domEngine=function(a){if(JS.isFunction(a)){ab.ready(a)}else{return new aH(ab.$.apply(ab,arguments),ab)}};JS.Class("Model",{__initBefore__:function(a){JS.extend(this,a);this.set(this.defaults,true)},getCache:JS.noop,defaults:{},charset:"utf-8",dataType:"xml",XPath:"//row",type:"GET",callback:false,formatText:JS.noop,parse:JS.noop,load:function(b){var a=this.getCache();if(a){this._parseData(a)}else{if(this.type=="jsonp"){this._jsonp(b)}else{if(this.type=="form"){this._sendForm(b)}else{this._ajax(b)}}}},_findVar:function(a){var b=this;if(a in window){this._parseData(window[a])}else{if(!this._findVar.re){this._findVar.re=1;setTimeout(function(){b._findVar(a);b._findVar.re=0},200)}}},_jsonp:function(g){var b=this,f=this.callback,a,c;if(this._isLoading()){return false}a=JS.isString(f);c=a&&f.charAt(0)!=="@";if(c){window[f]=function(h){b._parseData(h)}}var d=JS.load({url:JS.addVersion(JS.result(this.url,this),"no-cache"),charset:this.charset},JS.extend({_ver:JS.now()},this.data,g)).then(function(){b.loading=false});if(a&&!c){d.then(function(){b._findVar(f.slice(1))})}},_isLoading:function(){if(this.loading){this.trigger("loading");return true}this.loading=true},_parseData:function(a){var b;a=this.parse(a);if(a!==b){this.set("datas",a);this.trigger("load",a)}else{this.trigger("error",a)}},_sendForm:function(a){var b=this;if(this._isLoading()){return false}JS.Y.sendForm({url:this.url,data:JS.extend({},this.data,a),form:this.form,target:this.target,success:function(c){b.loading=false;b._parseData(c)}})},_ajax:function(a){var c=this,b;if(this._isLoading()){return false}b=JS.extend({url:this.url,type:this.type,data:{_ver:JS.now()},success:function(d){c.loading=false;var f=d.text;if(c.dataType=="json"){f=JS.parseJSON(c.formatText(d.text))}else{if(c.dataType=="xml"){f=(c.parseXml||JS.parseXml).call(c,d.xml,c.XPath,c.isTreeAttr)}}c._parseData(f)}});JS.extend(b.data,this.data,a);b.url=JS.result(b.url,this);JS.ajax(b)}});JS.Class("DB",{initialize:function(a,b){JS.extend(this,a);this.index=0;this.userKey=b||"_id";this.__dbItems__=[];this.__dbUserIndexs__={};this.__dbIndexs__={}},tempDB:function(a){var b=JS.DB(false,this.userKey);JS.forEach(a,function(c){b.append(c)});return b},each:function(b){var a=this.__dbItems__;for(var c=0,d=a.length;c<d;c++){if(false===b.call(this,a[c],c)){break}}return this},_isMatch:function(b,a,c){if(a=="*"){return true}if(JS.isFunction(a)){return a.call(b,b,c)}else{if(JS.isPlainObject(a)){for(var d in a){if(b.get(d)!=a[d]){return false}}}else{return b.get(this.userKey)===a}}return true},_filter:function(f,d){var b=[],g=this.__dbItems__;for(var a=0,c=g.length;a<c;a++){if(this._isMatch(g[a],f,a)){b[b.length]=g[a];if(b.length>=d){break}}}return b},append:function(a){if(!JS.isPlainObject(a)){throw Error("\u63D2\u5165\u6570\u636E\u5FC5\u987B\u662F\u4E00\u4E2AJSON\u7C7B\u578B")}if(!(a instanceof JS.Model)){a=JS.Model({db:this,defaults:JS.extend({_id:JS.getGuid("db")},a)})}this.index++;this.__dbItems__.push(a);this.__dbIndexs__[a.get("_id")]=a;this.__dbUserIndexs__[a.get(this.userKey)]=a;this.trigger("append",a);this._change();return a},getModelById:function(a){return this.__dbUserIndexs__[a]},find:function(a,b,c){var d;if(arguments.length===0){d=this.__dbItems__}else{d=this._filter(a,c||Number.MAX_VALUE)}return this.tempDB(b?JS.map(d,b):d)},set:function(b,c,a){return this.each(function(d){d.set(b,c,a)})},get:function(b,a){if(this.__dbItems__.length){return this.__dbItems__[0].get(b,a)}},getAll:function(){return JS.map(this.__dbItems__,function(b,a){return b.get()})},even:function(a){a=a||-1;return this.find(function(c,b){return b>a&&(b%2)})},remove:function(){var a,g,c,f,d,b,h=this.userKey;if(this.size()){c=this.__dbItems__[0].db;g=c.__dbItems__;for(a=g.length;a--;){f=g[a];c=f.db;d=f.get("_id");b=f.get(h);if(d in this.__dbIndexs__){delete c.__dbIndexs__[d];delete c.__dbUserIndexs__[b];c.trigger("remove",f);g.splice(a,1)}}c._change()}return this},_change:function(){this.trigger("change",this.__dbItems__.length);this.hasChange=true},size:function(){return this.__dbItems__.length},group:function(c,a){var b={};this.each(function(f,g){var d=f.get(c);if(!(d in b)){b[d]=[]}b[d].push(a?a.call(f,f):f)});return b}});var aE=/^(\S+)\s*(.*)$/;JS.Class("View",{__initBefore__:function(a){this.tmpls={};JS.extend(this,a);this.addUI(this.elements);this.addTmpls(this.templates)},__initAfter__:function(){this._initDelegate(this);this._bindMessage(this)},addTmpls:function(a){var b=this.tmpls;JS.forIn(a,function(c,d){if(!JS.isString(c)||c.indexOf("<@")===-1){var f=$$(c);c=f[/script/i.test(f.prop("nodeName"))?"html":"val"]()}b[d]=JS.tmpl(c)})},_initDelegate:function(b){this.el=this.el?$$(JS.result(this.el,this)):$$("body");var a=this.el;JS.forIn(this.events,function(i,c){var h=JS.trim(c).match(aE),d=h[1],f=h[2],g=b.bind(i);if(f===""){a.on(d,g)}else{if(d.charAt(0)==="@"){$$(f).on(d.slice(1),g)}else{if(f==="this"){b.on(d,g)}else{if(f.indexOf("this.")===0){b[f.slice(5)].on(d,g)}else{if(f.indexOf("ui.")===0){b.ui[f.slice(3)].on(d,g)}else{a.delegate(f,d,g)}}}}}})},_bindMessage:function(a){JS.forIn(this.messages,function(f,b){var c=a.bind(f),d;if(b.slice(-1)=="!"){b=b.slice(0,-1);d=true}if(b.indexOf("#")==0){JS.msg.on(b.slice(1),c,d)}else{JS.message.on(b,c,d)}})}})})();

//window.NameSpace = {
//		reg:function(fullName,obj){
//			var arr = fullName.split(".");
//			var namespace = window;
//			for(var i=0,l=arr.length-1; i<l; i++){
//				var curr = arr[i];
//				namespace[curr] = namespace[curr] || {};
//				namespace = namespace[curr];
//			}
//			namespace[arr[arr.length-1]] = obj;
//		},
//		del:function(fullName){
//			var arr = fullName.split(".");
//			var namespace = window;
//			for(var i=0,l=arr.length-1; i<l; i++){
//				var curr = arr[i];
//				namespace[curr] = namespace[curr] || {};
//				namespace = namespace[curr];
//			}
//			delete namespace[arr[arr.length-1]];
//		}
//};
namespace("Cn87.helper", function (){
	var cache = {}, NM2N1={'1*1':[1],'2*1':[2],'3*1':[3],'4*1':[4],'5*1':[5],'6*1':[6],'7*1':[7],'8*1':[8],'3*3':[2],'3*4':[2,3],'4*6':[2],'4*11':[2,3,4],'5*10':[2],'5*20':[2,3],'5*26':[2,3,4,5],'6*15':[2],'6*35':[2,3],'6*50':[2,3,4],'6*57':[2,3,4,5,6],'4*4':[3],'4*5':[3,4],'5*16':[3,4,5],'6*20':[3],'6*42':[3,4,5,6],'5*5':[4],'5*6':[4,5],'6*22':[4,5,6],'6*6':[5],'6*7':[5,6],'7*7':[6],'7*8':[6,7],'7*21':[5],'7*35':[4],'7*120':[2,3,4,5,6,7],'8*8':[7],'8*9':[7,8],'8*28':[6],'8*56':[5],'8*70':[4],'8*247':[2,3,4,5,6,7,8]};
	function getN1(nm){
		if (nm=='单关') {nm='1*1';}else{nm = nm.replace('c','*');}
		return NM2N1[nm];
	}
	this.getMinGgNum = function (types){
		var ntypes = [];
		for (var i =  types.length; i--;) {ntypes = ntypes.concat(getN1(types[i]));}
		ntypes.sort();
		return parseInt(ntypes[0], 10);
	};
	function parseNM(nm){
		if (!(nm in cache)) {
			if (nm == '单关') {
				cache[nm] = [1, 1, [1]];
			}else{
				var tmp = $.trim(nm).split('c');
				cache[nm] = [parseInt(tmp[0]), parseInt(tmp[1]), getN1(nm)];
			}
		}
		return cache[nm];
	}
	function countNM(code, n1s){
		code = JS.map(code, function (){return JS.intt(this);});
		return JS.reduce(n1s, function (zs, type){
			var cl = Math.cl(code, JS.intt(type));
			return zs + JS.reduce(cl, function (zs, g){return zs + Math.a(g);}, 0);
		}, 0);
	}
	this.getCodesCount = function (d, t, n, del){
		if (n == '单关') {
			return JS.reduce(t, function (s, l){return s + JS.reduce(l, function (s, t){return s + JS.intt(t);}, 0);}, 0);
		}
		var nm = parseNM(n), 
			group = Math.dtl(d, t, nm[0]);
		return JS.reduce(group, function (zs, g){
			var al = del ? Math.al(g, function (c){
				var flag = '-' + c[0].split('-')[1];
				return JS.some(c, function (){return this.indexOf(flag) === -1;});
			}) : Math.al(g);
			return zs + JS.reduce(al, function (zs, g){return zs + countNM(g, nm[2]);}, 0);
		}, 0);
	};
	this.getAllc1 = function (types){
		var g={}, g2=[];
		types.each(function (type){getN1(type).each(function (t){g[t] = true;});});
		for(var k in g){g2.push(k == 1 ? '单关' : (k +'c'+1));}
		g2.sort(function (a, b){return parseInt(a, 10) > parseInt(b, 10) ? 1 : -1;});
		return g2;
	};
	function splitNM(code, n1s){
		return JS.reduce(n1s, function (r, type){return r.concat(Math.cl(code, JS.intt(type)));}, []);
	}
	this.getSigleCodes = function (d, t, n, del){
		var nm = parseNM(n), group, len = nm[0], diff = len - (d.length + t.length);
		if (nm[1] > 1 && diff > 0) {for (var i =  diff; i--;) {t.push([0]);}}//多c中有子c，用0sp值的补全。
		group = Math.dtl(d, t, len);
		return JS.reduce(group, function (codes, g){
			var al = Math.al(g);
			return codes.concat(JS.reduce(al, function (rc, c){return rc.concat(splitNM(c, nm[2]));}, []));
		}, []);
	};
	return this;
}());
namespace("cn87.algo.bonus", function (){
	var minRec, maxRec, ggTypes, beishu = 1, cache = [], pl_bs;
    function getPlBs(){
        if (!pl_bs) {
            pl_bs = Yobj.get('#ggtype').val() == '40' ? 1 : 2;
        }
        return pl_bs;
    }
    function num2Max(n){
        switch(n){
            case 1:
                return 500*10000;
            break;
            case 2:
            case 3:
                return 20*10000;
            case 4:
            case 5:
                return 50*10000;
            default:
                return 100*10000;
        }
    }
    function getMaxVal(max, ggType){
        var mv = 0;
        for (var i = 0, j = ggType.length; i < j; i++) {
            var n = parseInt(ggType[i], 10) || 1;
            mv += num2Max(n);
        }
        return Math.min(max, mv);
    }
	function getBonusSum(list){
		var cl = {}, sum = 0, bs = beishu,  j = list.length;
		for (var i = 0; i < j; i++) {
			var code = list[i], b = 1, len = code.length, max=num2Max(len);		
			for (var x = code.length; x--;) {b *= code[x];}
			if (b) {
				sum+=Math.round2(Math.min(max, b*getPlBs()))*bs;
				if (!(len in cl)) {cl[len] = 0;}
				cl[len]++;
			}			
		}
		return {bonus: Math.round2(sum), codeCount: cl};
	}
	function getHitSingleCodes(n, min){
		var HR = Cn87.helper, list = [], dl = [], tl = [], danSort = min ? minRec.slice() : maxRec.slice(), dir = min ? 1 : -1;
		danSort.sort(function (a, b){
			if (a.isdan === b.isdan) {return (a[0] > b[0] ? 1 : -1)*dir;}
				else{return a.isdan ? -1 : 1;}
		});
		JS.forEach(danSort, function (o,i){
			if (i >= n) {
				var t = [0];
				t.isdan = o.isdan;
				t.sum = o.sum;
				o = t;
			}
			if (o.isdan) {dl.push(o);}else{tl.push(o);}
		});
		JS.forEach(ggTypes, function (type){list = list.concat(HR.getSigleCodes(dl, tl, type));});
		return list;
	}
	this.getMaxBonus = function (opts, ggType){
		if (opts.length < 2 && ggType.indexOf('单关') == -1) {return 0;}
		ggTypes = ggType;
		maxRec = opts;
		return getBonusSum(getHitSingleCodes(opts.length)).bonus;
	};
	this.setBeishu = function (bs){
		beishu = bs;
		return this;
	};
	this.getHitList = function (min, max, ggType){
		var list = [], freeTypes, maxCodes, maxSum, minCodes, minSum;
		minRec = min;
		maxRec = max;
		ggTypes = ggType;
		freeTypes = Cn87.helper.getAllc1(ggTypes);
		cache = [];
		var i = Math.max(maxRec.length, minRec.length), ii=i,
			isSlide=document.getElementById('isjprizesuc'),
			min_hit = Cn87.helper.getMinGgNum(ggTypes);
		function getHitNums(c){
			return maxSum.codeCount[parseInt(c, 10) || 1]||0;
		}
		for (; i >= min_hit; i--) {
			if (isSlide && i<ii && i>min_hit) {continue;}
			maxCodes = getHitSingleCodes(i);
			maxSum = getBonusSum(maxCodes);
			minCodes = getHitSingleCodes(i, true);
			minSum = getBonusSum(minCodes);
			if (isSlide) {
				list.push({min: minSum.bonus,max: maxSum.bonus});
			}else{
				cache[i] = [minCodes, minSum, maxCodes, maxSum];
				list.push({
					num: i,
					hitNum: JS.map(freeTypes, getHitNums),
					bs: beishu,
					min: minSum.bonus,
					max: maxSum.bonus
				});
			}
		}
		list.ggTypes = freeTypes;
		return list;
	};
	return this;
}());
namespace("cn87.algo.jc",function(){
	var algo = this, allBf = [], len = 0, bfCheckMap = {};
	for (var i = 0; i<6;i++) {
		for (var j = 0;j<6; j++) {
			if (i==3 && j > 3 || i > 3 && j > 2) {continue;}
			allBf[len++]= {
				name: i+''+j,
				sum: i+j,
				diff: Math.abs(i-j),
				spf: i>j ? 3 : (i<j ? 0 : 1)
			};
		}
	}
	allBf.push({name: '3A',sum: 7, spf: 3}, {name: '1A',sum: 7,spf: 1},{name: '0A',sum: 7,spf: 0});
	for (i = allBf.length; i--;) {
		var conf = allBf[i], item = {}, jqs = conf.sum, spf = conf.spf;
		item['bf-'+conf.name] = 1;
		item['jqs-'+jqs]=1;
		item['nspf-'+spf]=1;
		if (spf === 3) {
			if (jqs>2) {item['bqc-03']=1;}
			item['bqc-13']=1;
			item['bqc-33']=1;
		}else if(spf===1){
			if (jqs>1) {
				item['bqc-01']=1;
				item['bqc-31']=1;
			}
			item['bqc-11']=1;			
		}else if(spf===0){
			item['bqc-00']=1;
			item['bqc-10']=1;
			if (jqs>2) {item['bqc-30']=1;}		
		}
		bfCheckMap[conf.name] = item;
	}
	function testRqSpfByBf(str, bf){
		var rq = parseInt(str.split('#')[0].split('@')[1], 10);
		if (rq > 0) {
			if(bf.name == '0A'){
				if (rq === 1) {
					return str.indexOf('spf-0') === 0 || str.indexOf('spf-1') === 0;
				}
				return str.indexOf('spf-') === 0;
			}
			if (bf.spf < 1) {
				if (rq < bf.diff) {
					return str.indexOf('spf-0') === 0;
				}else if(rq === bf.diff){
					return str.indexOf('spf-1') === 0;
				}
			}
			return str.indexOf('spf-3') === 0;
		}else{
			rq = Math.abs(rq);
			if(bf.name == '3A'){
				if (rq === 1) {
					return str.indexOf('spf-3') === 0 || str.indexOf('spf-1') === 0;
				}
				return str.indexOf('spf-') === 0;
			}
			if (bf.spf>0) {
				if (bf.diff > rq) {
					return str.indexOf('spf-3') === 0;
				}else if(bf.diff === rq){
					return str.indexOf('spf-1') === 0;
				}
			}
			return str.indexOf('spf-0') === 0;
		}		
	}
	function filterInvalidOpts(single, bf){
		var ret  = [], len = 0, filter=bfCheckMap[bf.name];
		function test(str){
			if (str.indexOf('spf') === 0) {return testRqSpfByBf(str, bf);}
			return str.split('#')[0] in filter;
		}
		for (var i = 0, j = single.length; i < j; i++) {
			var types = single[i].split(',').filter(test);
			if (types.length) {ret[len++] = types;}
		}
		return ret;
	}
	function getSgBound(str){
		var single = str.split('|'), minSum=9e9, maxSum=-1, isHhgg = !algo.noHhgg,
		minOpts, maxOpts, minBf, maxBf, dan = str.indexOf('D') > -1;
		if (isHhgg) {
			JS.forEach(allBf, function (bf){
				var optsAl =  Math.al(filterInvalidOpts(single, bf)), hits, sum;
				for (var i = 0, j = optsAl.length; i < j; i++) {
					hits = optsAl[i];
					sum = 0;
					for (var k =  hits.length; k--;) {
						hits[k] = parseFloat(hits[k].split('#')[1])||1;
						sum += hits[k];
					}
					if (sum > maxSum) {maxSum = sum; maxOpts=hits.slice();maxBf = bf.name;}
					if (sum < minSum) {minSum = sum; minOpts=hits.slice();minBf = bf.name;}
				}
			});
		}else{
			var optsAl = str.split(','), sp;
			for (var i = 0, j = optsAl.length; i < j; i++) {
				sp = parseFloat(optsAl[i].split('#')[1])||1;
				if (sp > maxSum) {maxSum = sp; maxOpts=[sp];}
				if (sp < minSum) {minSum = sp; minOpts=[sp];}
			}
		}
		minOpts.sum = minSum;
		minOpts.bf = minBf;
		maxOpts.sum = maxSum;
		maxOpts.bf = maxBf;
		minOpts.isdan = maxOpts.isdan = dan;
		return [minOpts, maxOpts];
	}
	function getLimitOpts(opts){
		var minOpts=[], maxOpts=[], j = 0;
		JS.forEach(opts, function (opt){
			if (opt) {
				var real = getSgBound(opt);
				minOpts[j] = real[0];
				maxOpts[j++] = real[1];
			}
		});
		minOpts.sort(function (a, b){return a.sum > b.sum ? 1 : -1;});
		maxOpts.sort(function (a, b){return a.sum > b.sum ? -1 : 1;});
		return {min: minOpts, max: maxOpts};
	}
	algo.setBeishu = function (bs){
		cn87.algo.bonus.setBeishu(bs);
		return algo;
	};
	algo.getBonusRange = function (opts, ggType, noMin, bs){
		if (bs) {this.setBeishu(bs);}
		if (noMin) {
			return [0, cn87.algo.bonus.getMaxBonus(getLimitOpts(opts).max, ggType)];	
		}else{
			var info = cn87.algo.jc.getHitList(opts, ggType);
			return [info[info.length-1].min,info[0].max];
		}
	};
	algo.getHitList = function (opts, ggType){
		var real = getLimitOpts(opts);
		return cn87.algo.bonus.getHitList(real.min, real.max, ggType);
	};
	return algo;
}());