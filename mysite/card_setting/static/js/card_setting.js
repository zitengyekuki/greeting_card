function createCard(){
	$.ajax({
		url:'create_card/',
		type:'post',
		data:$('#create_form').serialize(),
		success:function(resp){
            toast('生成贺卡成功','success');
            window.open('/card_setting/show_card/?name='+resp.data.name+'&year='+resp.data.year);
            setTimeout(function(){
                location.href = '/card_setting/';
            },1000);
		},
		error:function(){
			console.log('createCard_fail');
		}
	});
}