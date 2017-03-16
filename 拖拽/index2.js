
/*	
*@auto:grace
*@time:2017/3/16
*@content封装拖拽对象
我们的目标是，只要我们声明一个拖拽实例，那么传入的目标元素将自动具备可以被拖拽的功能。
*/ 

;
(function(){
	var transform=getTransform();
	function Drag(selector){
		this.elem=typeof selector=="Object"?selector:document.getElementById(selector);
		this.startX=0;
		this.startY=0;
		this.sourceX=0;
		this.sourceY=0;
		this.init();
	}
	Drag.prototype={
		constructor: Drag,
		init:function(){
			this.setDrag();
		},
		//获取该元素style里面  transform的数据信息
		 getStyle(property){
			return document.defaultView.getComputedStyle?
			document.defaultView.getComputedStyle(this.elem,null)[property]:this.elem.currentStyle[property];
		},
		//获取该元素当前的位置
		getPosition:function(){
			var pos={x:0,y:0}
			var transform=getTransform();
			if(transform){//如果该元素有transform属性
				var transformValue=this.getStyle(transform);
				if(transformValue=='none'){//为空时
					this.elem.style[transform]='translate(0,0)';
				}else{//不为空时
					var temp = transformValue.match(/[0-9||,||\s||\.||\-]+/)[0].split(',');
					return pos={
						x:parseInt(temp[4].trim()),
						y:parseInt(temp[5].trim())
					};
				}
			}else{//如果该元素有transform属性
				if(this.getStyle('position')=='static'){
					this.elem.style.position='relative'
					return pos;
				}else{
					var x=parseInt(this.getStyle('left') ? this.getStyle('left') : 0)
					var y=parseInt(this.getStyle('top') ? this.getStyle('top') :0 )
					return pos={
						x:x,
						y:y
					}
				}
			}
		},
		 // 用来设置当前元素的位置
        setPostion: function(pos) {
            if(transform) {
                this.elem.style[transform] = 'translate('+ pos.x +'px, '+ pos.y +'px)';
            } else {
                this.elem.style.left = pos.x + 'px';
                this.elem.style.top = pos.y + 'px';
            }
        },

        // 该方法用来绑定事件
        setDrag: function() {
            var self = this;
            this.elem.addEventListener('mousedown', start, false);
            function start(event) {
                self.startX = event.pageX;
                self.startY = event.pageY;

                var pos = self.getPosition();

                self.sourceX = pos.x;
                self.sourceY = pos.y;

                document.addEventListener('mousemove', move, false);
                document.addEventListener('mouseup', end, false);
            }

            function move(event) {
                var currentX = event.pageX;
                var currentY = event.pageY;

                var distanceX = currentX - self.startX;
                var distanceY = currentY - self.startY;

                self.setPostion({
                    x: (self.sourceX + distanceX).toFixed(),
                    y: (self.sourceY + distanceY).toFixed()
                })
            }

            function end(event) {
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', end);
                // do other things
            }
        }
	}
	// 私有方法，仅仅用来获取transform的兼容写法
    function getTransform() {
        var transform = '',
            divStyle = document.createElement('div').style,
            transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],
            i = 0,
            len = transformArr.length;

        for(; i < len; i++)  {
            if(transformArr[i] in divStyle) {
                return transform = transformArr[i];
            }
        }

        return transform;
    }

    // 一种对外暴露的方式
    window.Drag = Drag;
})()
$(function(){
	new Drag('target');
})