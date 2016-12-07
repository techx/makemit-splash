$(document).ready(function() {
    var nav = $('#nav');
    var video = $("#logo-vid");
    var tracks = $('#tracks');

    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
      console.log("safari");
      replaceStatic();
    }

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.getElementById('gears').style.visibility='hidden';
        document.getElementById('tracks').style.visibility='hidden';
        nav.css('display', 'none');

        // android / ios autoplay video
        video.css("margin-left", "-420px");
        window.addEventListener('touchstart', function videoStart() {
            video.play();
            this.removeEventListener('touchstart', videoStart);
        });

        replaceStatic();

    } else {
        nav.css('display', 'none');
        console.log("nav css is display none");
        $(window).on('scroll', function() {
            var scrollTop = $(this).scrollTop();
            var height = nav.height();
            var wHeight = $(window).height();
            console.log({"st": scrollTop, "comp": wHeight+height});
            if (scrollTop>wHeight+height+20) {
                nav.removeClass("nav-abs");
                nav.addClass("nav-fixed");
                nav.css("top", "0px");
            }
            else {
                nav.removeClass("nav-fixed");
                nav.addClass("nav-abs");
                nav.css("top", $($(".hsContainer")[1]).position().top + "px");
            }
        });

        var $cogLeft = $('#cog-left'),
            $cogRight = $('#cog-right'),
            $window = $(window);

        var rotateCog = function($cog, amount) {
            $cog.css({
                'transform': 'rotate(' + amount + 'rad)'
            });
        };
        $(window).scroll(function () {
            var amount = $window.scrollTop() / 101.9;
            // var amount = ($window.scrollTop() / 40.13 + 0.55);
            rotateCog($cogLeft, -amount);
            rotateCog($cogRight, amount);
        });

        setTimeout(function(){
            var docHeight = $(document).height();

            tracks.css({
                'height': docHeight + 'px'
                // '-webkit-animation': 'fadein 1s',
                // 'opacity': '1'
            });
        }, 2000);

        $(window).resize(function() {
            tracks.css({
                'height': '0px'
            });
            var docHeight = $(document).height();
            tracks.css({
                'height': docHeight + 'px'
            });
        });
    }
});

function replaceStatic() {
  var video = $(".logo-vid-cont");
  var staticImg = $("#staticimg");
  staticImg.css("display", "block");
  staticImg.css("margin", "0 auto");
  video.css("display", "none");
}

/*
 * Email interest list for volunteering
 */
