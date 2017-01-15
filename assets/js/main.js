$(document).ready(function() {
    var nav = $('#nav');
    var video = $("#logo-vid");
    var tracks = $('#tracks');

    $('.volunteer').click(function() {
      $('#volunteer-form').animate({ opacity: 1 });
      $(".volunteer-box").focus();
    });

    $(".volunteer-box").keyup(function(event){
      if(event.keyCode == 13){
          $("#volunteer-submit").click();
      }
    });

    $('#volunteer-submit').click(function() {
      var email = encodeURIComponent($('.volunteer-box').val());
      var q1ID = "entry.1391724249";

      suc = function() {
        $('#volunteer-form').fadeOut("display: none;");
        $('#volunteer-thanks').fadeIn("display: inline-block;");
      };

      var baseURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdIqZGJqFeIB-fPiXXi4TwJUj9BSkm1VI-gRuaxL-cB1jpY0Q/formResponse?';
      var submitRef = '&submit=Submit';
      var submitURL = (baseURL + q1ID + "=" + email + submitRef);
      console.log(submitURL);
      $.ajax({
            url: submitURL,
            type: "GET",
            statusCode: {
                0: function() {
                    suc();
                },
                200: function() {
                    suc();
                }
            }
        });
    });

    $.ajax({
        url: 'http://my-api.makemit.org/api/settings',
        type: "GET",
        success: function(data) {
            var obj = $.parseJSON(data);
            var timeCloses = obj['timeClose'];
            var diff = timeCloses - $.now();
            var days = Math.floor(diff / 1000 / 86400);
            $('#regclose').text("Registration closes in <b>" + days + "days.</b>");
        }
    })

    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop();
        var height = nav.height();
        var wHeight = $(window).height();
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

    window.addEventListener('touchstart', function videoStart() {
        video[0].play();
        this.removeEventListener('touchstart', videoStart);
    });

    $(video).on('play', function() {
        setTimeout(function() {
            video[0].pause(); //pause before it goes black
        },10000);
    });

    ResizeSensor($("html"), function() {
        setTimeout(function() {
            var docHeight = $(document).height();
            console.log("doc height",docHeight);
            tracks.css({
                'height': (docHeight) + 'px'
            });
            console.log('main content dimension changed');
        }, 200);
    });
});

/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */

// Only used for the dirty checking, so the event callback count is limted to max 1 call per fps per sensor.
    // In combination with the event based resize sensor this saves cpu time, because the sensor is too fast and
    // would generate too many unnecessary events.
var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (fn) {
            return window.setTimeout(fn, 20);
        };

/**
 * Iterate over each of the provided element(s).
 *
 * @param {HTMLElement|HTMLElement[]} elements
 * @param {Function}                  callback
 */
function forEachElement(elements, callback){
    var elementsType = Object.prototype.toString.call(elements);
    var isCollectionTyped = ('[object Array]' === elementsType
        || ('[object NodeList]' === elementsType)
        || ('[object HTMLCollection]' === elementsType)
        || ('undefined' !== typeof jQuery && elements instanceof jQuery) //jquery
        || ('undefined' !== typeof Elements && elements instanceof Elements) //mootools
    );
    var i = 0, j = elements.length;
    if (isCollectionTyped) {
        for (; i < j; i++) {
            callback(elements[i]);
        }
    } else {
        callback(elements);
    }
}

var ResizeSensor = function(element, callback) {
    /**
     *
     * @constructor
     */
    function EventQueue() {
        var q = [];
        this.add = function(ev) {
            q.push(ev);
        };

        var i, j;
        this.call = function() {
            for (i = 0, j = q.length; i < j; i++) {
                q[i].call();
            }
        };

        this.remove = function(ev) {
            var newQueue = [];
            for(i = 0, j = q.length; i < j; i++) {
                if(q[i] !== ev) newQueue.push(q[i]);
            }
            q = newQueue;
        }

        this.length = function() {
            return q.length;
        }
    }

    /**
     * @param {HTMLElement} element
     * @param {String}      prop
     * @returns {String|Number}
     */
    function getComputedStyle(element, prop) {
        if (element.currentStyle) {
            return element.currentStyle[prop];
        } else if (window.getComputedStyle) {
            return window.getComputedStyle(element, null).getPropertyValue(prop);
        } else {
            return element.style[prop];
        }
    }

    /**
     *
     * @param {HTMLElement} element
     * @param {Function}    resized
     */
    function attachResizeEvent(element, resized) {
        if (!element.resizedAttached) {
            element.resizedAttached = new EventQueue();
            element.resizedAttached.add(resized);
        } else if (element.resizedAttached) {
            element.resizedAttached.add(resized);
            return;
        }

        element.resizeSensor = document.createElement('div');
        element.resizeSensor.className = 'resize-sensor';
        var style = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;';
        var styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';

        element.resizeSensor.style.cssText = style;
        element.resizeSensor.innerHTML =
            '<div class="resize-sensor-expand" style="' + style + '">' +
            '<div style="' + styleChild + '"></div>' +
            '</div>' +
            '<div class="resize-sensor-shrink" style="' + style + '">' +
            '<div style="' + styleChild + ' width: 200%; height: 200%"></div>' +
            '</div>';
        element.appendChild(element.resizeSensor);

        if (getComputedStyle(element, 'position') == 'static') {
            element.style.position = 'relative';
        }

        var expand = element.resizeSensor.childNodes[0];
        var expandChild = expand.childNodes[0];
        var shrink = element.resizeSensor.childNodes[1];

        var reset = function() {
            expandChild.style.width  = 100000 + 'px';
            expandChild.style.height = 100000 + 'px';

            expand.scrollLeft = 100000;
            expand.scrollTop = 100000;

            shrink.scrollLeft = 100000;
            shrink.scrollTop = 100000;
        };

        reset();
        var dirty = false;

        var dirtyChecking = function() {
            if (!element.resizedAttached) return;

            if (dirty) {
                element.resizedAttached.call();
                dirty = false;
            }

            requestAnimationFrame(dirtyChecking);
        };

        requestAnimationFrame(dirtyChecking);
        var lastWidth, lastHeight;
        var cachedWidth, cachedHeight; //useful to not query offsetWidth twice

        var onScroll = function() {
            if ((cachedWidth = element.offsetWidth) != lastWidth || (cachedHeight = element.offsetHeight) != lastHeight) {
                dirty = true;

                lastWidth = cachedWidth;
                lastHeight = cachedHeight;
            }
            reset();
        };

        var addEvent = function(el, name, cb) {
            if (el.attachEvent) {
                el.attachEvent('on' + name, cb);
            } else {
                el.addEventListener(name, cb);
            }
        };

        addEvent(expand, 'scroll', onScroll);
        addEvent(shrink, 'scroll', onScroll);
    }

    forEachElement(element, function(elem){
        attachResizeEvent(elem, callback);
    });

    this.detach = function(ev) {
        ResizeSensor.detach(element, ev);
    };
};

ResizeSensor.detach = function(element, ev) {
    forEachElement(element, function(elem){
        if(elem.resizedAttached && typeof ev == "function"){
            elem.resizedAttached.remove(ev);
            if(elem.resizedAttached.length()) return;
        }
        if (elem.resizeSensor) {
            if (elem.contains(elem.resizeSensor)) {
                elem.removeChild(elem.resizeSensor);
            }
            delete elem.resizeSensor;
            delete elem.resizedAttached;
        }
    });
};
