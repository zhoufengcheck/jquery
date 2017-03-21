//数组sort排序  1就是换，-1就是不交换
var desc = function(x,y)
{     
        if (x > y)       
                return -1;  //返回一个小于0 的数即可  
        else         
                return 1;  //返回一个大于0 的数即可  
}     
//升序函数  
var asc = function(x,y)     
{     
        if (x > y)       
                return 1;  //返回一个大于0 的数即可  
        else             
                return -1;  //返回一个小于0 的数即可  
} 
//9 保留指定小数位
function tofix(num){
	num = num.toFixed(4);
	console.log(num)
}
//10 不要直接使用delete来删除数组中的元素
//数组在js中也是对象，有时候我们可能会通过delete来删除数组中的元素，
//但是其实仅仅是将数组的元素的值赋值为了undefined。
//可以通过splice来删除数组中的某一项
function deleArrItem(arr){
	delete arr[3]
	console.log(arr,arr.length)
}

//11 null 与 undefined
//null == undefined,null == null 返回true,
//有时候我们为了排除null 和 undefined可以使用如下的代码
function test(obj){
	if(obj!=null){// obj除了undefined 和 null 之外都会走这里
	//....这里写代码逻辑
	}
}
//12生成指定长度的随机字母数字字符串

function getRandomStr(len) {
	var str = "";
	for( ; str.length < len; str += Math.random().toString(36).substr(2));
	return str.substr(0, len);
}
var arr1=[3,4,2,7,1,8,9];
arr1.sort(desc)
console.log("降序"+arr1)
var arr2=[3,4,2,7,1,8,9];
arr2.sort(asc)
console.log("升序"+arr2)

var num =4.345678;
tofix(num)
deleArrItem(arr2)
