/*
*@autor:zhoufeng
*@content:jquery版本 事件
*/
$(function(){
	//注意.on()的描述中第二个可选参数：selector。如下图，添加了第二个参数，选择符button：
	$('body').on("click","#item",fun)
	$('body').off('click',fun)
	//解除绑定.off
	function fun(){
		console.log("回调函数")
	}
	$('#show').click(function(){
		$('#item').toggle('slow',fun)
	})
	$('#fadein').click(function(){
		$('#item').fadeIn('slow',fun)
	})
	$('#fadeout').click(function(){
		$('#item').fadeOut('slow',fun)
	})
	$('#fadeto').click(function(){
		$('#item').fadeTo('slow',0.4)
	})
	$('#slidedown').click(function(){
		$('#item').slideToggle(3000)
	})
	$("#animate").click(function(){
	  $("#item").animate({
	    left:'250px',
	    opacity:'0.5',
	    height:'150px',
	    width:'150px'
	  },3000);
	});
	console.log(1+'2'+'2');
	// 第一个+"2"中的加号是一元加操作符，+"2"会变成数值2，因此1+ +"2"相当于1+2=3.
	console.log(1+ +"2"+"2");
})
