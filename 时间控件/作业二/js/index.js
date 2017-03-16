

//单个
//1开始年份选了过后，结束年份加限制
//2:结束年份选了后，开始年份是有限制的
//3:开始月份选了后，结束月份就有限制
//4:结束月份选了后，开始月份也要有限制

//两个
//开始年份，开始月份，结束年份有限制，结束月份有限制
//结束年份，结束月份，开始年份有限制，结束月份有限制

//三个

var d=new Date()
function yearCreate(){
	var min_year=2010;
	var max_year=d.getFullYear();
	var _html='';
	_html=initHtml(min_year,max_year,'年','year');
	return _html;
}
function monthCreate(){
	var _html='';
	_html=initHtml(0,12,'月','month');
	return _html;
}
function lastCheck(){

	var begin_year=parseInt($('[data-type=beginY]').val());
	var end_year=parseInt($('[data-type=endY]').val());//开始年份
	var begin_month=parseInt($('[data-type=beginM]').val());
	var end_month=parseInt($('[data-type=endM]').val());
	if(begin_year==end_year&&begin_year!=-1){
		if(begin_month!=-1&&end_month!=-1){
			$('[data-type=endM]').val('-1');
			$('[data-type=beginM]').val('-1');
			monthCheckInit();
		}
	}
}
function initHtml(begin,end,type,type_english){
	var _html='';
	for(var i=begin;i<=end;i++){
		if(i==begin){
			_html=_html+'<option selected value="-1">请选择'+type+'份</option>'
		}
		else{
			_html=_html+'<option value='+i+' data-action='+i+' data-type='+type_english+'>'+i+type
			+'</option>'
		}
	}
	return _html;
}
function init(){
	var begin_year='<select data-type="beginY">'+yearCreate()+'</select>';
	var begin_month='<select data-type="beginM">'+monthCreate()+'</select>';
	var end_year='<select data-type="endY">'+yearCreate()+'</select>';
	var end_month='<select data-type="endM">'+monthCreate()+'</select>';
	var all=begin_year+begin_month+'<span>到</span>'+end_year+end_month;
	$('#main').append(all);
}
function monthCheckInit(){
	$('[data-type=beginM]').find('[data-type=month]').each(function(i,v){
		$(v).attr('disabled',false);
	});
	$('[data-type=endM]').find('[data-type=month]').each(function(i,v){
		$(v).attr('disabled',false);
	});
}
function beginYearChange(){
	var check_val=parseInt($(this).val());
	var end_year=parseInt($('[data-type=endY]').val());//开始年份
	var begin_month=parseInt($('[data-type=beginM]').val());
	var end_month=parseInt($('[data-type=endM]').val());
	//首先就要把结束年份控制好
	$('[data-type=endY]').find('[data-type=year]').each(function(i,v){
		$(v).attr('disabled',false);
		if($(v).val()<check_val){
			$(v).attr('disabled',true);
		}
	});
	//重置
	monthCheckInit();
	if(end_year==check_val){
		if(begin_month!=-1){
			$('[data-type=endM]').find('[data-type=month]').each(function(i,v){
				$(v).attr('disabled',false);
				if($(v).val()<begin_month){
					$(v).attr('disabled',true);
				}
			});
		}else if(end_month!=-1){
			$('[data-type=beginM]').find('[data-type=month]').each(function(i,v){
				$(v).attr('disabled',false);
				if($(v).val()>end_month){
					$(v).attr('disabled',true);
				}
			});
		}
	}
	lastCheck();
}
function beginMonthChange(){
	var check_val=parseInt($(this).val());
	var begin_year=parseInt($('[data-type=beginY]').val());//开始年份
	var end_year=parseInt($('[data-type=endY]').val());//开始年份
	var end_month=parseInt($('[data-type=endM]').val());
	//重置
	monthCheckInit();
	var $endm=$('[data-type=endM]').find('[data-type=month]')
	if(end_year==begin_year&&(end_year==-1||begin_year==-1)){
		// $endm.each(function(i,v){
		// 	$(v).attr('disabled',false);
		// 	if(parseInt($(v).val())<check_val){
		// 		$(v).attr('disabled',true);
		// 	}
		// });
	}else if(end_year==begin_year){
		$endm.each(function(i,v){
			$(v).attr('disabled',false);
			if(parseInt($(v).val())<check_val){
				$(v).attr('disabled',true);
			}
		});
	}
	lastCheck();
}
function endYearChange(){
	var check_val=parseInt($(this).val());
	var begin_year=parseInt($('[data-type=beginY]').val());//开始年份
	var begin_month=parseInt($('[data-type=beginM]').val());
	var end_month=parseInt($('[data-type=endM]').val());
	//首先就要把结束年份控制好
	$('[data-type=beginY]').find('[data-type=year]').each(function(i,v){
		$(v).attr('disabled',false);
		if($(v).val()>check_val){
			$(v).attr('disabled',true);
		}
	});
	//重置
	monthCheckInit();
	if(begin_year==check_val){
		if(begin_month!=-1){
			$('[data-type=endM]').find('[data-type=month]').each(function(i,v){
				$(v).attr('disabled',false);
				if($(v).val()<begin_month){
					$(v).attr('disabled',true);
				}
			});
		}else if(end_month!=-1){
			$('[data-type=beginM]').find('[data-type=month]').each(function(i,v){
				$(v).attr('disabled',false);
				if($(v).val()>begin_month){
					$(v).attr('disabled',true);
				}
			});
		}
	}
	lastCheck();
}
function endMonthChange(){
	var check_val=parseInt($(this).val());
	var begin_year=parseInt($('[data-type=beginY]').val());//开始年份
	var end_year=parseInt($('[data-type=endY]').val());//开始年份
	var begin_month=parseInt($('[data-type=beginM]').val());
	//重置
	monthCheckInit();
	var $beginm=$('[data-type=beginM]').find('[data-type=month]')
	if(end_year==begin_year&&(end_year==-1||begin_year==-1)){
		$beginm.each(function(i,v){
			$(v).attr('disabled',false);
			if(parseInt($(v).val())>check_val){
				$(v).attr('disabled',true);
			}
		});
	}else if(end_year==begin_year){
		$beginm.each(function(i,v){
			$(v).attr('disabled',false);
			if(parseInt($(v).val())>check_val){
				$(v).attr('disabled',true);
			}
		});
	}
	lastCheck();
}
$(function(){
	init();
	$('[data-type=beginY]').on('change',beginYearChange);
	$('[data-type=beginM]').on('change',beginMonthChange);
	$('[data-type=endY]').on('change',endYearChange);
	$('[data-type=endM]').on('change',endMonthChange);
})

