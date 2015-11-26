$(document).ready(function(){
	$(window).on('scroll', function() {
		var scrollTop = $(this).scrollTop();
		var height = $('#home').outerHeight();
		var calc = (scrollTop / height);

		$('#nav').css({ 'opacity': calc })
		if ( calc > '1' ) {
	      	$('#nav').css({ 'opacity': 1 });
	    } else if ( calc < '0' ) {
	      	$('#nav').css({ 'opacity': 0 });
	    }
	});

	var $cogLeft = $('#cog-left'),
		$cogRight = $('#cog-right'),
	    $body = $(document.body),
	    bodyHeight = $body.height();
	$(window).scroll(function () {
	    $cogLeft.css({
	        'transform': 'rotate(' + ($body.scrollTop() / bodyHeight * -1179 + 31) + 'deg)'
	    });
	    $cogRight.css({
	        'transform': 'rotate(' + ($body.scrollTop() / bodyHeight * 1179 - 31) + 'deg)'
	    });
	});	

	setTimeout(function(){
    var docHeight = $(document).height(),
    tracks = $('#tracks');
    tracks.css({
      'height': docHeight + 'px',
      // '-webkit-animation': 'fadein 1s',
      // 'opacity': '1'
    }); 
  }, 2000);
})
