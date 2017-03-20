/*
*@autor:zhoufeng
*@content:js   dom0 dom2级绑定事件 
*/
window.onload=function(){

/***************************dom2级事件****************************************/

	/*************绑定  兼容写法*****************/
	function addEvent(obj, eventType, callback, bubble){
		if(obj.addEventListener){
		 	obj.addEventListener(eventType, callback, bubble);
		}else{//如果不兼容就用attachEvent
			obj.attachEvent(eventType, callback, bubble);
		}
	}
		/*************取消绑定  兼容写法*****************/
	function removeEvent(obj, eventType, callback, bubble){
		if(obj.removeEventListener){
		 	obj.removeEventListener(eventType, callback, bubble);
		}else{//如果不兼容就用attachEvent
			obj.detachEvent(eventType, callback, bubble);
		}
	}
	/*************阻止冒泡  兼容写法*****************/
	function stopBubble(e){
		　　if(e&&e.stopPropagation){//非IE
		　　   e.stopPropagation();
		　　}
		　　else{//IE
		　　   window.event.cancelBubble=true;
		　　}
　　}
	function grandsonparen(e){
		alert('我是grandchild上绑定的第一个方法,我要阻止冒泡啦')
		stopBubble(e)//阻止冒泡
	    e.stopImmediatePropagation();//我会阻止方法grandsonparen1()的运行
		// removeEvent(grandchild,'click',grandsonparen,false)//取消绑定事件
	}
	function grandsonparen1(e){
		alert('我是grandchild上绑定的第二个方法')
		// removeEvent(grandchild,'click',grandsonparen,false)
	}
	var father = document.getElementById('father'); 
  	var child = document.getElementById('child'); 
  	var grandchild = document.getElementById('grandchild'); 
  	// 这两个方法都有三个参数，分别为：事件类型，事件函数，最后一个是布尔值，true或者是false。
        //true表示在事件捕获阶段执行，false表示在事件冒泡阶段执行。 

  //1点击inner时，触发顺序为：inner-------middle------out
	  // father.addEventListener('click',function(){alert("我是最外面的");},false);   
	  //  child.addEventListener('click',function(){alert("我是中间的");},false);    
	  //  grandchild.addEventListener('click',function(){alert("我是最里面的");},false);

  //2点击inner时，触发顺序为：out------inner-------middle
	  // father.addEventListener('click',function(){alert("我是最外面的");},true);   
	  // child.addEventListener('click',function(){alert("我是中间的");},true);  
	  // grandchild.addEventListener('click',function(){alert("我是最里面的");},true);

   //3点击inner时，触发顺序为：middle-------inner-------out  
	  // father.addEventListener('click',function(){alert("我是最外面的");},false);   
	  // child.addEventListener('click',function(){alert("我是中间的");},true);  
	  // grandchild.addEventListener('click',function(){alert("我是最里面的");},true);
	//4默认为false  及冒泡
	  father.addEventListener('click',function(){alert("我是最外面的");});   
	  child.addEventListener('click',function(){alert("我是中间的");});  
	  grandchild.addEventListener('click',grandsonparen);
	   grandchild.addEventListener('click',grandsonparen1);
	   //后面就依次类推了，根据ture和false来判断顺序就好了，
	  //true是捕获（从外到里），false是冒泡（从里到外）
	  //如果不是特别需要，不建议在事件捕获阶段注册事件处理程序。






/**************dom0级事件****************************************/
      // 、同一个标签的同一个事件只能绑定一个函数，如果绑定多个，则后绑定的会覆盖前边绑定的函数
	  var dom0 = document.getElementById('dom0'); 
	  dom0.onclick=function(){
	  	alert(1)
	  }
	  dom0.onclick=function(){
	  	alert(2)
	  }


}