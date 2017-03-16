$(function(){
	document.oncontextmenu=new Function('event.returnValue=false;');
document.onselectstart=new Function('event.returnValue=false;');
	var range = { x: 0, y: 0 };//鼠标元素偏移量
	var lastPos = { x: 0, y: 0, x1: 0, y1: 0 }; //拖拽对象的四个坐标
	var tarPos = { x: 0, y: 0, x1: 0, y1: 0 }; //目标元素对象的坐标初始化
	var theDiv = null, move = false;//拖拽对象 拖拽状态
	var theDivId =0, theDivHeight = 0,theDivWidth= 0, theDivHalfW = 0,theDivHalfH = 0;
	var move=false
  var bijiao1,bijiao2;
	function loopbox(){ //循环初始化
	 $(".contentBox").each(function(){
	     console.log( 'find' );
	   $(this).mousedown(function (event){
	     //当鼠标指针移动到元素上方,并按下鼠标按键时,会发生 mousedown 事件
	     //拖拽对象
	     theDiv = $(this);
	     //鼠标元素相对偏移量
	     range.x = event.pageX - theDiv.offset().left;
	     range.y = event.pageY - theDiv.offset().top;
	     theDivId = theDiv.index();
	     theDivWidth = theDiv.width();
	     theDivHeight = theDiv.height();
	     theDivHalfW = theDivWidth/2;
	     theDivHalfH = theDivHeight/2;
	     theDiv.attr("class","contentBoxMove");
	     // 创建新元素 插入拖拽元素之前的位置(虚线框)
	     var $moves=$('<div class="contentBoxBorder"></div>');
	     $moves.insertBefore(theDiv);
	     move=true;
	   });
	  });
	}

	loopbox();	
	var last=null;
  $(".container").mousemove(function(event) {
    console.log( 'mousemove' );
     if (!move) return false;
     lastPos.x = event.pageX - range.x;
     lastPos.y = event.pageY - range.y;
     lastPos.x1 = lastPos.x + theDivHalfW;
     lastPos.y1 = lastPos.y + theDivHalfH;
     // 拖拽元素随鼠标移动
     theDiv.css({left: lastPos.x + 'px',top: lastPos.y + 'px'});
     // 拖拽元素随鼠标移动 查找插入目标元素
     var $main = $('.contentBox'); // 其他没有移动的变量
     tempDiv = $(".contentBoxMove"); //对象移动的
     $main.each(function (i,v) {
       tarDiv = $(this);
       console.log(tarDiv)
       tarPos.x = tarDiv.offset().left;
       tarPos.y = tarDiv.offset().top;   
       tarPos.x1 = tarPos.x + tarDiv.width()/2;
       tarPos.y1 = tarPos.y + tarDiv.height()/2;
       bijiao1=(lastPos.x1-tarPos.x1)>0?(lastPos.x1-tarPos.x1):(-lastPos.x1+tarPos.x1)
       bijiao2=(lastPos.y1-tarPos.y1)>0?(lastPos.y1-tarPos.y1):(-lastPos.y1+tarPos.y1)     
        if (bijiao1<=tarDiv.width()/2) {
           if(bijiao2<=tarDiv.height()/2){
              tempDiv.insertBefore(tarDiv);
              last=tarDiv;
           }
        }
     });
 }).mouseup(function(event) { //当在元素上放松鼠标按钮时,会发生 mouseup 事件。
    if(theDiv==null) return false;
     theDiv.attr("class", "contentBox"); //恢复对象的初始样式
     if(last!=null){
     	last.insertBefore($('.contentBoxBorder'))
     }
     $('.contentBoxBorder').remove(); // 删除新建的虚线div
     move=false;
   });

   
});
