//用户给的参数(如果用户给的数据重复了，也没有关系，后面会有处理)
var _mytime=['2016-11-1','2016-1-17','2016-2-3','2017-6-4'];//我占用的时间
var _othertime=['2015-2-18','2016-2-12','2016-3-17','2016-6-3','2017-9-4'];//他占用的时间
var selectYears=['2014','2015','2016','2017','2018'].sort();//下拉列表的值
//格式匹配
var flag=true;
function formatMatch(arrtime){
	for(var i=0;i<arrtime.length;i++){
		var result=arrtime[i].match(/^\d{4}-\d{1,2}-\d{1,2}$/);//基本的格式
		if(result!=null){
			var result1=parseInt(arrtime[i].match(/^\d{4}/)[0]);
			if(result1>=1990&&result1<=2020){//年
				var result2=arrtime[i].match(/-(\d{1,2})-/)[1];
				if(parseInt(result2)>=1&&parseInt(result2)<=12){//月
					var result3=arrtime[i].match(/-(\d{1,2})$/)[1];
					if (parseInt(result3)>31||parseInt(result3)<=0){
						alert('第'+(i+1)+'个数日期时间范围有误')
					 	flag=false;
					}else if(parseInt(result2)==4||parseInt(result2)==6||parseInt(result2)==9||parseInt(result2)==11){//不是二月,大的月份
						if (parseInt(result3)>30){
							alert('第'+(i+1)+'个数日期时间范围有误');
						 	flag=false;
						 }
					}else{//二月份
						if((result1 % 400 == 0)||((result1 % 4 == 0)&&(result1 % 100 != 0))){//闰年
					       if(parseInt(result3)>29){
						      alert('第'+(i+1)+'个数日期时间范围有误')
							  flag=false;	
					       } 
					    }else{//平年
					       if(parseInt(result3)>28){
						      alert('第'+(i+1)+'个数日期时间范围有误')
							  flag=false;	
					       }  
    					}
					}
				}else{
					alert('第'+(i+1)+'个数月份时间范围有误');
					flag=false;
				}
			}else{
				alert('第'+(i+1)+'个数年份时间范围有误')
				flag=false;
			}
		}else{
			alert('第'+(i+1)+'个数格式有误');
			flag=false;
		}
	}
	return flag;
}
$(function(){
	var result1=formatMatch(_mytime);
	var result2=formatMatch(_othertime);
	if(result1==false||result2==false){
		alert('error');
	}else{
	    tableOper.init({
				_mytime:_mytime,
				_othertime:_othertime,
				selectYears:selectYears
			});
	}
});