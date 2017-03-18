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
	}
	console.log(str)
}
var arr=[1,2,8,4,7]
var a=1,b=4
//swap(a,b)
//getFibonacci(6)
getMaxProfit(arr)
randomString(3)