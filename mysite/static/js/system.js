/**
 * 全局js
 */

//时间控件初始化
$('.datepicker').datetimepicker({
	format:'yyyy-mm-dd',
//	startDate:new Date(),
	language:  'zh-CN',
    weekStart: 1,
    todayBtn:  1,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	minView: 2,
	forceParse: 0
});

//绑定change事件，比较前后日期范围
$('.datepicker').datetimepicker().on('changeDate',function(ev){
	var nameArr = this.name.split('_');
	var ex = nameArr[0];
	var fromDateStr,toDateStr;
	if(nameArr[1] == 'from'){
		toDateStr = $('input[name = "'+ex+'_to"]').val();
		if(toDateStr == '')return;
		toDateStr = new Date(toDateStr).getTime();
		fromDateStr = ev.date.valueOf()-1000*60*60*24;
	}else{
		fromDateStr = $('input[name = "'+ex+'_from"]').val();
		if(fromDateStr == '')return;
		fromDateStr = new Date(fromDateStr).getTime();
		toDateStr = ev.date.valueOf();
	}
	if(toDateStr - fromDateStr <= 1000*60*60*24){
		toast('时间范围出错，请重新选择！');
		this.value = '';
	}
});

//清除表单验证附加的样式
function clearError(){
	var $form = $('form');
	$form.validate().resetForm();
	$form.find('input').removeClass('error');
}
