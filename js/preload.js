;(function($){
	function PreLoad(imgs,options){
		this.imgs = (typeof imgs==='string' ? [imgs]:imgs);
		this.opts = $.extend({},PreLoad.DEFAULTS,options);
		if(this.opts.type === 'ordered'){
			this._ordered();
		}else{
			this._unordered();
		}
	}
	PreLoad.DEFAULTS = {
		type:'unordered',//默认下执行无序
		each:null,//每一张图片加载完毕后执行
		all:null//所有图片加载完毕后执行
	}
	PreLoad.prototype = {
		_unordered:function(){
			var imgs = this.imgs,
			count = 0,
			len = imgs.length,
			opts = this.opts;
			$.each(imgs,function(i,src){
				if(typeof src != 'string') return;
				var imgObj = new Image();
				$(imgObj).on('load error',function(){
					opts.each && opts.each(count);
					if(count>=len-1){
						opts.all && opts.all();
					}
					count ++;
				})
				imgObj.src = src;
			})
		},
		_ordered:function(){//有序加载
			var imgs = this.imgs,
			count = 0,
			len = imgs.length,
			opts = this.opts;
			load();
			function load(){
				var imgObj = new Image();
				$(imgObj).on('load error',function(){
					opts.each && opts.each(count);
					if(count>=len){
						opts.all && opts.all();
					}else{
						load();
					}
					count++;
				})
			}
		}
	}
	$.extend({
		preload:function(imgs,opts){
			new PreLoad(imgs,opts);
		}
	});
})(jQuery)