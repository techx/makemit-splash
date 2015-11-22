/*! jQuery v@1.8.1 jquery.com | jquery.org/license */
$(document).ready(function(){
	var $cogLeft = $('#cog-left'),
		$cogRight = $('#cog-right'),
	    $body = $(document.body),
	    bodyHeight = $body.height();
	$(window).scroll(function () {
	    $cogLeft.css({
	        'transform': 'rotate(' + ($body.scrollTop() / bodyHeight * -1210.5 + 31) + 'deg)'
	    });
	    $cogRight.css({
	        'transform': 'rotate(' + ($body.scrollTop() / bodyHeight * 1210.5 - 31) + 'deg)'
	    });
	});	
})
