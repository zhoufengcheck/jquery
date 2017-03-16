var _mytime=['2015-1-17','2016-1-19','2016-2-3','2017-6-4'];//我占用的时间
var _othertime=['2015-2-18','2016-2-12','2016-3-17','2016-6-3','2017-9-4'];//他占用的时间
var selectYears=['2014','2015','2016','2017'];//下拉列表的值
var d = new Date();
var today = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();//现在的日期
var year = d.getFullYear();

//初始化下拉列表
function selectCreate(selectYears){
    var option='';
    for(var i=0;i<selectYears.length;i++){
        if(selectYears[i]==year){
            option=option+'<option value='+selectYears[i]+' selected>'+selectYears[i]+'</option>';
        }else{
            option=option+'<option value='+selectYears[i]+'>'+selectYears[i]+'</option>';
        }
    }
     $('#year').empty().append(option);
}
//初始化表格
function calender(curYear){
    // alert(curYear);
    var th = '',td = '';
    var _th = '';
    for(var i = 0;i <= 12;i++){//行
        var _td = '';
        for(j = 0;j <= 31;j++){//列
            if(i == 0){//第一行
                if(j == 0){//第一行第一列
                    _th = '<th class="table-head">月/日</th>';
                }else{
                    j = j < 10 ? '0' + j : j;
                    _th += '<th>'+ j +'</th>'
                }
            }else{
                if(j == 0){//第一列
                    _td = '<td action-type="" class="table-head">'+ i +'月</td>'
                }else{
                    _td += '<td data-node="date" action-type="'+ curYear + '-' + i + '-' + j +'"></td>';
                }
            }
        }
        if(i != 0){
            td += '<tr  data-node="month" action-type="'+ i +'">' + _td + '</tr>';
        }
        th = '<thead>' + _th + '</thead>';
    }
    _table = '<table>'+ th + td + '</table>'
    $('#tables').empty().append(_table);
    disableMonthDay(curYear);
}
//整体操作
function disableMonthDay(curYear){
    disabledDate(curYear);//判断在今天之前还是之后
    leapYear(curYear)//平年还是闰年
    monthCheck()//月份是大还是小
    myOccupy(curYear);//我占用
    otherOccupy(curYear);//他占用
    operate();//操作
}
//判断在今天之前还是之后
function disabledDate(curYear){
   if(curYear<d.getFullYear()){//今年之前，全部都是disable
       $('#tables').find('td').filter('[data-node=date]').each(function(i,v){
            $(v).addClass('disable pointers');
       })
   }
   else if(curYear==d.getFullYear()){//今年，今天之前全部都是disable
       $('#tables').find('td').filter('[data-node=date]').each(function(i,v){
            if(new Date($(v).attr('action-type'))<new Date(today)){
                $(v).addClass('disable pointers');
            }
        });
   }
}
//平年还是闰年
function leapYear(curYear){
    //判断是闰年还是平年  平年28天、闰年29天
     if((curYear % 400 == 0)||((curYear % 4 == 0)&&(curYear % 100 != 0))){//闰年
        $('#tables').find('tr').filter('[action-type=2]').find('td:gt(29)').each(function(i,v){
            $(v).addClass('disable pointers');
        });
    }else{//平年
        $('#tables').find('tr').filter('[action-type=2]').find('td:gt(28)').each(function(i,v){
            $(v).addClass('disable pointers');
        });
    }
}
//大小月份
function monthCheck(){
    var monthLitter=['4','6','9','11'];
    $('#tables').find('tr').each(function(i,v){
        for(var i=0;i<monthLitter.length;i++){
           if($(v).attr('action-type')==monthLitter[i]){
                $(v).find('td:eq(31)').addClass('disable pointers');
           }
       }
    });
}
//我占用的日期，如果日期过了，你还是不能进行操做
function myOccupy(curYear){
    for(var i=0;i<_mytime.length;i++){
        if(_mytime[i].indexOf(curYear)!=-1){
            $('#tables').find('td').filter('[action-type='+_mytime[i]+']')
            .removeClass('disable')
            .addClass('my-occupy');
        }
    }
}
//他占用的日期，你都不能进行操做
function otherOccupy(curYear){
    var str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    for(var i=0;i<_othertime.length;i++){
        if(_othertime[i].indexOf(curYear)!=-1){
            $('#tables').find('td').filter('[action-type='+_othertime[i]+']').removeClass('disable').addClass('other-occupy');
        }
    }
}
//可操做日期
function operate(){
    $('#tables').find('td').filter('[data-node=date]').click(function(){
        if(!$(this).hasClass('disable') && !$(this).hasClass('other-occupy') && new Date($(this).attr('action-type'))>=new Date(today)){
            if($(this).hasClass('my-occupy')){
                $(this).removeClass('my-occupy');
                for(var i=0;i<_mytime.length;i++){
                    if(_mytime[i]==$(this).attr('action-type').toString()){
                        _mytime.splice(i,1);
                    }
                }
            }else{
                $(this).addClass('my-occupy');
                _mytime.push($(this).attr('action-type').toString());
            }
        }
    });
}
//获取年份
function getYears(){   
    $('#year').change(function(){
        calender($(this).val());
    });
}
$(function(){
    selectCreate(selectYears);
    calender(year);
    getYears();
});