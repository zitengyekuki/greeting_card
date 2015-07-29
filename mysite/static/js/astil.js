/**
*@created date 2015-3-10
*@author Asia
*@version 0.0.1 astil
/*

/**
*扩展Array原型对象，加入按索引移除元素方法
*使用Object.defineProperty使得该方法不可被枚举
*（由于数组对象经常会被枚举，而自定义的方法默认会被枚举出来，所以此处这样实现）
*@index 索引 
*/
Object.defineProperty(Array.prototype,'remove',{
    enumerable:false,
    value:function(index){
        if(isNaN(index)||index>=this.length){
            return false;
        }
        for(var i=0,n=0;i<this.length;i++){
            if(this[i]!=this[index]){
                this[n++]=this[i];
            }
        }
        this.length-=1;
    }
});

/**
*扩展Array原型对象，加入查询是否包含元素方法
*使用Object.defineProperty使得该方法不可被枚举
*（由于数组对象经常会被枚举，而自定义的方法默认会被枚举出来，所以此处这样实现）
*@item 要检索的数组元素
*add at 2015-3-25
*/
Object.defineProperty(Array.prototype,'contains',{
    enumerable:false,
    value:function(item){
        return new RegExp("\\b"+item+"\\b").test(this);
    }
});

/**
*扩展String原型对象的trim方法，清除所有空格
*@return 新的字符串
*/
String.prototype.trimAll = function(){
	var strArr = this.split(' ');
	return strArr.join('');
};