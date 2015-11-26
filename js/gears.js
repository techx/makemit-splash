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
