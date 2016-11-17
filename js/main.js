$(document).ready(function(){

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
document.getElementById('gears').style.visibility='hidden';
document.getElementById('tracks').style.visibility='hidden';
 $('.nav').css('display', 'none');

// android / ios autoplay video
 var video = document.querySelector('#logo-vid');
 $("#logo-vid").css("margin-left", "-420px");
 window.addEventListener('touchstart', function videoStart() {
   video.play();
   this.removeEventListener('touchstart', videoStart);
 });

  } else {
    $(window).on('scroll', function() {
      var scrollTop = $(this).scrollTop();
      var height = $('.nav').height();
      var wHeight = $(window).height();
      console.log({"st": scrollTop, "comp": wHeight-height});
      if (scrollTop>wHeight-height) {
        $(".nav").removeClass("nav-abs");
        $(".nav").addClass("nav-fixed");
      }
      else {
        $(".nav").removeClass("nav-fixed");
        $(".nav").addClass("nav-abs");
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
      var amount = ($window.scrollTop() / 101.9 + 0);
      // var amount = ($window.scrollTop() / 40.13 + 0.55);
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
