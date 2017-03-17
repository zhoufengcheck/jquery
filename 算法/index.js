//判断参数是否正确
function typeOf(param,type){
	if(type=="Array"){
		return (param instanceof Array)
	}
	else if(type=="String"){
		return (typeof(param)=='string')
	}
}

//Q1 判断一个字符串是否是回文
function checkPalindrom(str) {
	//1->stringObject.split(separator,howmany)
			// separator(怎么分割),howmany(返回长度，可以不写)
    //2->Array.reverse()
			// 数组反转
	//3->Array.join(str)
			//数组变成字符串
	if(!typeOf(str,'String')){
		console.log('参数问题，请从新传参数');
		return
	}


 	var flag= str==str.split('').reverse().join('');
    console.log(flag)
    return flag
}


//Q2 去掉一组整型数组重复的值
function Unique(arr){
	if(!typeOf(arr,'Array')){
		console.log('参数问题，请从新传参数');
		return
	}
	if(arr.length==1){
		return arr;
	}
	var obj={};
	var result=Array();
	for(var i=0;i<arr.length;i++){
		if(obj[arr[i]]==undefined){
			obj[arr[i]]=0;
			result.push(arr[i]);
		}
	}
	console.log(result)
	return result
}
//Q3 统计一个字符串出现最多的字母
function findMaxDuplicateChar(str){
	var max=0;
	var result_char="";
	var obj={};
	if(!typeOf(str,'String')){
		console.log('参数问题，请从新传参数');
		return
	}
	if(str.length==0){
		return str
	}
	for(var i=0;i<str.length;i++){
		if(obj[str.charAt(i)]==undefined){
			obj[str.charAt(i)]=1
		}else{
			obj[str.charAt(i)]=obj[str.charAt(i)]+1
		}
	}
	for (chars in obj){
		if(max<obj[chars]){
			max=obj[chars]
			result_char=chars
		}
	}
	console.log(result_char)
	return result_char
}


//Q4 冒泡排序算法 小到大 每比较一次，就把最小的提到最前面去
function bubbleSort(arr){
	var temp
	for(var i=0;i<arr.length;i++){
		for(j=i+1;j<arr.length-1;j++){
			if(arr[i]>arr[j]){
				temp=arr[i];
				arr[i]=arr[j];
				arr[j]=temp;
			}
		}
	}
	console.log(arr)
	return arr
}
//Q4 插入排序算法 小到大 有序数组里面再插入一个新的数，插入后仍然有序
function insertSort(arr){
	for(var i=1;i<arr.length;i++){
		for(var j=i;j>0;j--){
			if(arr[j]<arr[j-1]){
				//TODO:
				var temp=arr[j];
				arr[j]=arr[j-1];
				arr[j-1]=temp;
			}else{
			//接下来是无用功
				break;
			}
		}
	}
	console.log(arr)
	return arr;
}


var arr=[1,2,3,4,4,2,1,4,6,7]
// checkPalindrom('12321');
// Unique(arr);
// findMaxDuplicateChar('aaaaaaaaavdasdadsf')
// bubbleSort(arr)
// insertSort(arr)