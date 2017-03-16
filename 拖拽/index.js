
/*	
*@auto:grace
*@time:2017/3/16
*@content一个简单的拖拽，就这样愉快的实现了
*/ 
//获取浏览器支持transform的方法
function getTransform(){
	var transform="",
		divStyle=document.createElement('div').style,
		transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],
		i=0;
		len=transformArr.length;
		for(;i<len;i++){
			if(transformArr[i] in divStyle){
				return transform=transformArr[i];
			}
		}
	return transform;
}
//获取初始位置
function getStyle(elem,property){
	return document.defaultView.getComputedStyle?
	document.defaultView.getComputedStyle(elem,null)[property]:elem.currentStyle[property];
}
function getTargetPos(elem){
	var pos={x:0,y:0};
	var transform=getTransform();
	if(transform){
		var transformValue=getStyle(elem,transform);
		if(transformValue=='none'){
			elem.style[transform]='translate(0,0)';
		}else{
			var temp = transformValue.match(/[0-9,\s\.]+/)[0].split(',');
			return pos={
				x:parseInt(temp[4].trim()),
				y:parseInt(temp[5].trim())
			};
		}
	}else{
		if(getStyle(elem,'position')=='static'){
			elem.style.position='relative'
			return pos;
		}else{
			var x=parseInt(getStyle(elem,'left')?getStyle(elem,'left'):0)
			var y=parseInt(getStyle(elem,'top')?getStyle(elem,'top'):0)
			return pos={
				x:x,
				y:y
			}
		}
	}
}

function setTargetPos(elem, pos) {
    var transform = getTransform();
    if(transform) {
        elem.style[transform] = 'translate('+ pos.x +'px, '+ pos.y +'px)';
    } else {
        elem.style.left = pos.x + 'px';
        elem.style.top = pos.y + 'px';
    }
    return elem;
}
// 绑定在mousedown上的回调，event为传入的事件对象
function start(event) {
    // 获取鼠标初始位置
    startX = event.pageX;
    startY = event.pageY;

    // 获取元素初始位置
    var pos = getTargetPos(oElem);

    sourceX = pos.x;
    sourceY = pos.y;

    // 绑定
    document.addEventListener('mousemove', move, false);
    document.addEventListener('mouseup', end, false);
}

function move(event) {
	// alert(2)
    // 获取鼠标当前位置
    var currentX = event.pageX;
    var currentY = event.pageY;

    // 计算差值
    var distanceX = currentX - startX;
    var distanceY = currentY - startY;

    // 计算并设置元素当前位置
    setTargetPos(oElem, {
    	// toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
    	// 必需。规定小数的位数，是 0 ~ 20 之间的值，包括 0 和 20，
    	    //有些实现可以支持更大的数值范围。如果省略了该参数，将用 0 代替。
        x: (sourceX + distanceX).toFixed(),
        y: (sourceY + distanceY).toFixed()
    })
}

function end(event) {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', end);
    // do other things
}



// 声明2个变量用来保存鼠标初始位置的x，y坐标
	var startX = 0;
	var startY = 0;

	// 声明2个变量用来保存目标元素初始位置的x，y坐标
	var sourceX = 0;
	var sourceY = 0;
	var oElem
$(function(){
	// 获取目标元素对象
	oElem = document.getElementById('target');
	oElem.onmousedown=function(e){
		start(e)
	}
	
})