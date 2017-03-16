//全局变量
var monthLitter=['4','6','9','11'];//小月
var d = new Date();
var today = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();//现在的日期
var year = d.getFullYear();//获取现在的年份

/****************开始喽****************************/
var tableOper={};
//自定义配置
tableOper.defaultConfig={
    selectYears:['2014','2015','2016','2017','2018'],
    _mytime:[],
    _othertime:[]
};
//初始化操作建表和建下拉菜单
tableOper.init=function(config){
    this.config=$.extend(this.defaultConfig,config);//合并配置
    this.selectCreate(config.selectYears);//创建下拉列表
    this.calender(year);//创建表格
}
//td操作入口入库
tableOper.oper=function(curYear){   
    this.disabledDate(curYear);//判断在今天之前还是之后
    this.leapYear(curYear)//平年还是闰年
    this.monthCheck()//月份是大还是小
    this.Occupy(curYear,this.config._mytime,'my');//我占用
    this.Occupy(curYear,this.config._othertime,'other');//他占用
    this.operate(this.config);//操作
}

//初始化下拉列表
tableOper.selectCreate=function(selectYears){
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
//创建表格
tableOper.calender=function(curYear){
    $('#year').change(function(){//下拉列表切换
        tableOper.calender($(this).val());
    });
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
    this.oper(curYear);
}
//判断在今天之前还是之后
tableOper.disabledDate=function(curYear){
    $td=$('#tables').find('td').filter('[data-node=date]')//获取td
   if(curYear<d.getFullYear()){//今年之前，全部都是disable
       $td.each(function(i,v){
            $(v).addClass('disable pointers');
       })
   }
   else if(curYear==d.getFullYear()){//今年，今天之前全部都是disable
       $td.each(function(i,v){
            if(new Date($(v).attr('action-type'))<new Date(today)){
                $(v).addClass('disable pointers')
            }
        });
   }
}
//平年还是闰年
tableOper.leapYear=function(curYear){
    //获取表格二月那一行
    var $tr=$('#tables').find('tr:[action-type=2]')
    //判断是闰年还是平年  平年28天、闰年29天
     if((curYear % 400 == 0)||((curYear % 4 == 0)&&(curYear % 100 != 0))){//闰年
        $tr.find('td:gt(29)').each(function(i,v){
            $(v).addClass('disable pointers');
        });
    }else{//平年
        $tr.find('td:gt(28)').each(function(i,v){
            $(v).addClass('disable pointers');
        });
    }
}
//大小月份
tableOper.monthCheck=function(){
    $('#tables').find('tr').each(function(i,v){
        for(var i=0;i<monthLitter.length;i++){
           if($(v).attr('action-type')==monthLitter[i]){
                $(v).find('td:eq(31)').addClass('disable pointers');
           }
       }
    });
}
//我占用的日期，他占用的日期,同时操作
tableOper.Occupy=function(curYear,arrtime,key){
    arrtime
    for(var i=0;i<arrtime.length;i++){
        if(arrtime[i].indexOf(curYear)!=-1){
            $('#tables').find('td').filter('[action-type='+arrtime[i]+']')
            .removeClass('disable')
            .addClass(key=='my'?'my-occupy':'other-occupy');
        }
    }
}
//可操做日期
tableOper.operate=function(config){
    $('#tables').find('td').filter('[data-node=date]').click(function(){
        if(!$(this).hasClass('disable') && !$(this).hasClass('other-occupy') && new Date($(this).attr('action-type'))>=new Date(today)){
            if($(this).hasClass('my-occupy')){
                $(this).removeClass('my-occupy');
                for(var i=0;i<config._mytime.length;i++){
                    if(config._mytime[i]==$(this).attr('action-type').toString()){
                        config._mytime.splice(i,1);
                    }
                }
            }else{
                $(this).addClass('my-occupy');
               config._mytime.push($(this).attr('action-type').toString());
            }
        }
    });
}

