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
Array.prototype.unique3=function(){
	var result=[this[0]];
	this.sort()
	for(var i=1;i<this.length;i++){
		if(this[i]!=result[result.length-1]){
			result.push(this[i]);
		}
	}
	return result;
}
Array.prototype.unique4=function(){
			var arr=[];    //定义一个临时数组  
	        for(var i = 0; i < this.length; i++){           
	            if(this.indexOf(this[i])==i){  
	                arr.push(this[i]);  
	            }  
	        }  
	        return arr;  
		}
Array.prototype.unique2=function(){//
	var arr=[];    //定义一个临时数组  
    for(var i = 0; i < this.length; i++){    //循环遍历当前数组  
        //判断当前数组下标为i的元素是否已经保存到临时数组  
        //如果已保存，则跳过，否则将此元素保存到临时数组中  
        if(arr.indexOf(this[i]) == -1){  
            arr.push(this[i]);  
        }  
    }  
    return arr;  
}
function Unique1(arr){
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
String.prototype.findMaxDuplicateChar=function(){
	var max=0;//个数
	var result_char="";//返回值
	var obj={};
	if(this.length==0){
		return this
	}
	for(var i=0;i<this.length;i++){
		if(obj[this.charAt(i)]==undefined){
			obj[this.charAt(i)]=1
		}else{
			obj[this.charAt(i)]=obj[this.charAt(i)]+1
		}
		if(max<obj[this.charAt(i)]){
			max=obj[this.charAt(i)];
			result_char=this.charAt(i);
		}
	}
	console.log(max)
	return result_char
}

//Q4 冒泡排序算法 小到大 每比较一次，就把最小的提到最前面去（后续的的每一个数都和第一个数比较，小就交换）
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
//Q4 快速排序  从小到大
function quickSort(arr,left,right){
	var i=left;
	var j=right;
	var temp=arr[left];
	if(left>=right){
　　　　return;
	}
	while(i!=j){
	　   while(i<j&&arr[j]>=temp){
		  j--;
	    }　
　　　　if(j>i){
　　　　　　arr[i]=arr[j];
		}
　　　　while(i<j&&arr[i]<=temp){
			i++;
		}　　　
　　　　if(i<j){
　　　　　　arr[j]=arr[i];
		}

	}
	arr[i]=temp;
　　quickSort(arr,left,i-1);
　　quickSort(arr,i+1,right);//递归右边
}

var arr=[5,3,1,2,4,6,0]
// checkPalindrom('12321');
// Unique(arr);
// findMaxDuplicateChar('aaaaaaaaavdasdadsf')
// bubbleSort(arr)
// insertSort(arr)
//quickSort(arr,0,arr.length-1);
