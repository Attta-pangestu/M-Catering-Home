;(function($){
	'use strict';
	$(document).ready(function() {
		$("body").on("submit", ".exwoofood-woocommerce form.cart, .product form.cart", function(e){
			if(!$(this).find('.exrow-group.ex-required').length && !$(this).find('.exrow-group.ex-required-min').length ){ return;}
			var $validate = true;
			$('.ex-required-message, .ex-required-min-message, .ex-required-max-message').fadeOut();
			$(this).find('.exrow-group.ex-required:not(.ex-required-min)').each(function(){
				var $this_sl = $(this);
				if($this_sl.hasClass('exwf-offrq')){
				}else{
					if($this_sl.hasClass('ex-radio') || $this_sl.hasClass('ex-checkbox')){
						if(!$this_sl.find('.ex-options').is(":checked")){
							$this_sl.find('.ex-required-message').fadeIn();
							$this_sl.find('.exfood-label:not(.exwo-active)').trigger('click');
							$validate = false;
						}
					}else{
						if($this_sl.find('.ex-options').val() == ''){
							$this_sl.find('.exfood-label:not(.exwo-active)').trigger('click');
							$this_sl.find('.ex-required-message').fadeIn();
							$validate = false;
						}
					}
				}
			});
			$(this).find('.exrow-group.ex-checkbox.ex-required-min').each(function(){
				var $this_sl = $(this);
				if($this_sl.hasClass('exwf-offrq')){
				}else{
					var $minsl = $this_sl.data('minsl');
					var $nbsl = $this_sl.find('.ex-options:checked').length;
					if( $nbsl < $minsl ){
						$this_sl.find('.exfood-label:not(.exwo-active)').trigger('click');
						$this_sl.find('.ex-required-min-message').fadeIn();
						$validate = false;
					}
				}
			});	
			if($validate != true){
				e.preventDefault();
				e.stopPropagation();
				$(document).trigger('exwfqv_validate_unsuccessfully');
				return;
			}
			return true;	
		});
		$('body').on('change', '.ex-checkbox.ex-required-max .ex-options', function() {
	    	var $this_sl = $(this);
	    	if($this_sl.hasClass('exwf-offrq')){
			}else{
		    	var $maxsl = $this_sl.closest(".ex-checkbox.ex-required-max").data('maxsl');
		    	var $nbsl = $this_sl.closest(".ex-checkbox.ex-required-max").find('.ex-options:checked').length;
		    	if( $nbsl > $maxsl ){
		    		$this_sl.closest(".ex-checkbox.ex-required-max").find('.ex-required-max-message').fadeIn();
			    	this.checked = false;
			    	event.preventDefault();
			    }else{
			    	$this_sl.closest(".ex-checkbox.ex-required-max").find('.ex-required-max-message').fadeOut();
			    }
			}
	    });
	    //min max total qty
	    function minopqty($this_sl){
	    	if(!$this_sl.closest(".ex-checkbox.ex-required-min-opqty").length){return;}
	    	if($this_sl.hasClass('exwf-offrq')){
			}else{
		    	var $minopqty = $this_sl.closest(".ex-checkbox.ex-required-min-opqty").data('minopqty');
		    	var $nbqty = 0;
		    	$this_sl.closest(".ex-checkbox.ex-required-min-opqty").find('.ex-options:checked').each(function(){
		    		$nbqty = $nbqty  + $(this).closest('span').find('.ex-qty-op').val()*1;
		    	});
		    	if($nbqty > 0 && $nbqty < $minopqty ){
		    		$this_sl.closest(".ex-checkbox.ex-required-min-opqty").find('.ex-required-minqty-message').fadeIn();
			    	event.preventDefault();
			    }else{
			    	$this_sl.closest(".ex-checkbox.ex-required-min-opqty").find('.ex-required-minqty-message').fadeOut();
			    }
			}
	    }
	    $('body').on('change', '.ex-checkbox.ex-required-min-opqty .ex-options', function() {
	    	var $this_sl = $(this);
	    	minopqty($this_sl);
	    	
	    });
	    function maxopqty($this_sl){
	    	if(!$this_sl.closest(".ex-checkbox.ex-required-max-opqty").length){return;}
	    	if($this_sl.hasClass('exwf-offrq')){
			}else{
		    	var $maxopqty = $this_sl.closest(".ex-checkbox.ex-required-max-opqty").data('maxopqty');
		    	var $nbqty = 0;
		    	$this_sl.closest(".ex-checkbox.ex-required-max-opqty").find('.ex-options:checked').each(function(){
		    		$nbqty = $nbqty  + $(this).closest('span').find('.ex-qty-op').val()*1;
		    	});
		    	if( $nbqty > $maxopqty ){
		    		$this_sl.closest(".ex-checkbox.ex-required-max-opqty").find('.ex-required-maxqty-message').fadeIn();
			    	event.preventDefault();
			    }else{
			    	$this_sl.closest(".ex-checkbox.ex-required-max-opqty").find('.ex-required-maxqty-message').fadeOut();
			    }
			}
	    }
	    $('body').on('change', '.ex-checkbox.ex-required-max-opqty .ex-options', function() {
	    	var $this_sl = $(this);
	    	maxopqty($this_sl);
	    	
	    });
	    
		$("body").on("click",".exwo-accordion-style .exrow-group .exfood-label" ,function(e){
			var $this = $(this);
			$($this).next(".exwo-container").slideToggle(200);
			if($this.hasClass('exwo-active')){ 
				$this.removeClass('exwo-active');
			}else{
				$this.addClass('exwo-active');
			}
		});
		jQuery('body').on('click', '.ex-quantity .ion-chevron-down',function() {
			var value = parseInt(jQuery(this).closest(".ex-quantity").find('input[type=number]').val()) - 1;
			//var min = jQuery(this).closest(".ex-quantity").find('input[type=number]').attr('min');
			//min = min!='' ? parseInt(min) : '';
			//if(isNaN(min) || value >= min || min ==''){
				if(value>=0){
					jQuery(this).closest(".ex-quantity").find('input[type=number]').val(value);
				}
			//}
		});
		jQuery('body').on('click', '.ex-quantity .ion-chevron-up',function() {
			var value = jQuery(this).closest(".ex-quantity").find('input[type=number]').val();
			//var max = jQuery(this).closest(".ex-quantity").find('input[type=number]').attr('max');
			value = value!='' ? parseInt(value) : 0;
			//max = max!='' ? parseInt(max) : '';
			//if(isNaN(max) || value < max || max=='' ){
				value = value + 1;
				jQuery(this).closest(".ex-quantity").find('input[type=number]').val(value);
			//}
		});
		jQuery('body').on('keyup change paste', '.exwo-product-options  .ex-qty-op', function(){
			var $this_ops = $(this).closest(".exwo-qty-option").find('.ex-options');
			maxopqty($this_ops);
			minopqty($this_ops);
			var min = jQuery(this).attr('min');
			var max = jQuery(this).attr('max');
			var qty = parseInt(jQuery(this).val());
			if(min!='' && !isNaN(min) && min > qty ){
				jQuery(this).val(min);
			}else if(min=='' && qty < 1){jQuery(this).val('1');}
			if(max!='' &&  !isNaN(max) && max < qty ){
				jQuery(this).val(max);
			}

		});
    });
}(jQuery));