$(document).ready(function(){

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
document.getElementById('gears').style.visibility='hidden';
document.getElementById('tracks').style.visibility='hidden';
  } else {
    $('#nav').hide();
    $(window).on('scroll', function() {
      var scrollTop = $(this).scrollTop();
      var height = $('#home').outerHeight();
      var calc = (scrollTop / height);

      $('#nav').show();
      $('#nav').css({ 'opacity': calc });
      if (calc <= '0') {
        $('#nav').hide();
      }
      if ( calc > '1' ) {
        $('#nav').css({ 'opacity': 1 });
      } else if ( calc < '0' ) {
        $('#nav').css({ 'opacity': 0 });
      }
    });

    var $cogLeft = $('#cog-left'),
    $cogRight = $('#cog-right'),
    $window = $(window),
    windowHeight = $(window).height();

    var rotateCog = function($cog, amount) {
      $cog.css({
        'transform': 'rotate(' + amount + 'rad)'
      });
    };
    $(window).scroll(function () {
      var amount = ($window.scrollTop() / 47.13 + 0.25);
      rotateCog($cogLeft, -amount);
      rotateCog($cogRight, amount);
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

    $(window).resize(function() {
      tracks = $('#tracks');
      tracks.css({
        'height': '0px'
      });
      var docHeight = $(document).height();
      tracks.css({
        'height': docHeight + 'px',
      });
    });
  }
});


/*
* Email interest list for volunteering
*/



