/*! jQuery v@1.8.1 jquery.com | jquery.org/license */
$(document).ready(function(){
	var $cog = $('#cog'),
	    $body = $(document.body),
	    bodyHeight = $body.height();
	$(window).scroll(function () {
	    $cog.css({
	        'transform': 'rotate(' + ($body.scrollTop() / bodyHeight * 180) + 'deg)'
	    });
	});	
})
