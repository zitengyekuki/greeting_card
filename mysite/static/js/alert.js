/**
 * Created by aix on 2015/3/14
 * 基于jquery和bootstrap
 */

;(function(window,$){
	//覆盖掉默认的alert，以便自定义且不会阻塞浏览器
	window.alert = function(msg){
		console.log(msg);
		$('#alert_win').modal().find('.modal-body').html(msg);
	};

	var ori_toast_class = 'alert-danger',
		title_arr = ['success','info','warning','danger'];
	/**
	 * toast，默认2秒后消失
	 * @param msg
	 * @param title
	 */
	window.toast = function(msg,title){
		var $this = $('.toast-content');
		if(title && title_arr.contains(title)){
			var new_class = 'alert-'+title;
//			$this.find('strong').html(title+": ");
			$this.removeClass(ori_toast_class).addClass(new_class);
			ori_toast_class = new_class;
		}else{
			$this.removeClass(ori_toast_class).addClass('alert-danger').find('strong').html('');
		}
		$this.find('span').html(msg);
		$this.fadeIn('slow');
		window.setTimeout(function(){
			$this.fadeOut();
		},2000);
	};

	/**确认对话框
	 * @options 可选参数，有默认值
	 */
	window.confirm = function(options){
		var $win = $('#confirm_win'),
			defaultOptions = {
				positiveBtn : '确认', //按钮1
				negativeBtn : '取消', //按钮2
				title : '确认对话框', //标题
				content : '确定这样操作么?', //内容
				data : [],
				positiveCheck : null,
				negativeCheck : null
			};
		options = options ? $.extend({},defaultOptions,options) : defaultOptions;
		options.data.length ? $win.find('.modal-dialog').removeClass('modal-sm').addClass('modal-mm') : void 0;

		var
			close = function(){
				$win.modal('hide');
			},
			getContentData = function(){
				var contentData = {};
				options.data.forEach(function(args){
					contentData[args] = $win.find('[name="'+args+'"]').val();
				});
				return contentData;
			},
			positiveCallback = function(){
				if(!(options.positiveCheck ? options.positiveCheck() : true)) return false;
				options.positiveCallback ? options.positiveCallback(true,getContentData()) : void(0);
				close();
			},
			negativeCallback = function(){
				if(!(options.negativeCheck ? options.negativeCheck() : true)) return false;
				options.negativeCallback ? options.negativeCallback(false,getContentData()) : void(0);
				close();
			},
			init = function(){
				$('#confirmLabel').text(options.title);
				$('#confirm_content').html(options.content);
				$('#positiveBtn').off('click',positiveCallback).text(options.positiveBtn).on('click',positiveCallback);
				$('#negativeBtn').off('click',negativeCallback).text(options.negativeBtn).on('click',negativeCallback);
				$win.modal();
			};
		$win.on('hidden.bs.modal', function (e) {
			$('#positiveBtn').off('click',positiveCallback);
			$('#negativeBtn').off('click',negativeCallback);
		});
		init();
	}

})(window,jQuery);

