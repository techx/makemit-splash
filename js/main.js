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
      $window = $(window),
      windowHeight = $(window).height();

  var rotateCog = function($cog, amount) {
    $cog.css({
      'transform': 'rotate(' + amount + 'deg)'
    });
  };
  $(window).scroll(function () {
      var amount = ($window.scrollTop() / windowHeight * -1200 + 31);
      rotateCog($cogLeft, amount);
      rotateCog($cogRight, -amount);
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
