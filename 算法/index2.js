//判断参数是否正确
function typeOf(param,type){
	if(type=="Array"){
		return (param instanceof Array)
	}
	else if(type=="Number"){
		return (typeof(param)=='number')
	}else if(type=="String"){
		return (typeof(param)=='string')
	}
}
//Q5 不借助临时变量，进行两个整数的交换
function swap(a,b){
	console.log("改变前a:"+a+"     b:"+b)
	if(!typeOf(a,"Number")){
		console.log('参数wrong')
		return
	}
	if(!typeOf(b,"Number")){
		console.log('参数wrong')
		return
	}
	b = b - a;
  	a = a + b;
  	b = a - b;
	console.log("改变后a:"+a+"     b:"+b)	
}
//Q6 使用canvas 绘制一个有限度的斐波那契数列的曲线？

function getFibonacci(n){
	 var fibarr =new Array();
	 var i=0;
	 while(i<n){
	 	if(i<=1){
	 		fibarr.push(i);
	 	}else{
	 		fibarr.push(fibarr[i-1]+fibarr[i-2])
	 	}
	 	i++
	 }
	 console.log(fibarr)
	 return fibarr
}
//Q7 找出下列正数组的最大差值比如:
  function getMaxProfit(arr) {

    var minPrice = arr[0];
    var maxProfit = 0;

    for (var i = 0; i < arr.length; i++) {
        var currentPrice = arr[i];

        minPrice = Math.min(minPrice, currentPrice);//获取最小的一个数

        var potentialProfit = currentPrice - minPrice;//当前数与最小数的差距

        maxProfit = Math.max(maxProfit, potentialProfit);//获取最大差距
    }
	console.log(maxProfit)
    return maxProfit;
}
//Q8 随机生成指定长度的字符串
function randomString(n){
	var allChar="abcdefghijklmnopqrstuvwxyz1234567890";
	var str="";
	if(n==0){
		return str;
	}
	for(var i=0;i<n;i++){
		str=str+allChar.charAt(Math.floor(Math.random() * allChar.length))
		//Math.floor(5.1) -- 5
		//Math.floor(-5.1) -- -6
	}
	console.log(str)
}
//Q9 实现类似getElementsByClassName 的功能
function queryClassName(node, name) {  
	console.log(node)
  	var starts = '(^|[ \n\r\t\f])',
  	//\t 制表符
	//\r 回车符
	//\n 换行符
	//\f 换页符
   	ends = '([ \n\r\t\f]|$)';
  	var array = [],
        regex = new RegExp(starts + name + ends),
        elements = node.getElementsByTagName("*"),
        length = elements.length,
        i = 0,
        element;
    while (i < length) {
        element = elements[i];
        if (regex.test(element.className)) {
        	console.log(element.className)
            array.push(element);
        }

        i += 1;
    }
	console.log(array)
    return array;
}

//Q10 获取指定范围内的随机数
function getRadomNum(min,max){
	var result=Math.floor(Math.random()*(max-min+1)+min)
	console.log("result:"+result)
	return result
}
//Q11 对象转换为数组
//call apply说明白一点其实就是更改对象的内部指针，
//即改变对象的this指向的内容。这在面向对象的js编程过程中有时是很有用的。

//区别
/*
 * 对于第一个参数意义都一样，但对第二个参数：
 * apply传入的是一个参数数组，也就是将多个参数组合成为一个数组传入，而call则作为call的参数传入（从第二个参数开始）。
 * 如 func.call(func1,var1,var2,var3)对应的apply写法为：func.apply(func1,[var1,var2,var3])
 */

function toArray(obj){
	var arr=new Array();
	objArr=Array.prototype.slice.call(obj,1,2);
	console.log(objArr)
	return arr
}
function slicetext(){
	var arr=[1,2,3,4,4,5]
	//输出 [2,3]从index为1(包括1)开始截取。截取到index为3（不包括3）
	console.log(arr.slice(1,3))
}
function splicetext(){
	var arr=[1,2,3,4,5,6]
	//arrayObject.splice(index,howmany,item1,.....,itemX)从index开始截取howmany个,把item1和item2等等从index后面开始插入
	arr.splice(1,4,"123")//截取了2,3,4,5，把123插入
	console.log(arr)//1,6
}

//打乱数组数据
function breakSort(arr){
	console.log('原来的顺序'+arr)
	arr.sort(function(){
		return Math.random()-0.5
	})
	console.log('打乱的顺序'+arr)
}


var arr=[1,2,8,4,7]
var a=1,b=4
//swap(a,b)
//getFibonacci(6)
//getMaxProfit(arr)
//randomString(3)
//getRadomNum(1,17)
window.onload=function(){
	var obj={
		0:'qian',
		1:'long',
		2:'chu',
		3:'tian',
		length:4
	}
//	toArray(obj)
//	slicetext()
//	splicetext()
//	queryClassName(document.getElementsByTagName('body')[0],'qwe')
//  var arr1 = [1,2,3,4,5,6,7,'a','dsfs',8,9,'v'];
//	breakSort(arr1)
}
