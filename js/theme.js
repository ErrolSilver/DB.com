(function ($) {
  'use strict';
  
  var $navIcon = $('#navIcon'),
    $navBar = $('.primary-nav'),
    i = 0,
    $slides = $('.slide'),
    pastSlides = $('.slide').last().offset().top + $('.slide').last().outerHeight(),
    $indicators = $('#slideIndicators').find('ul'),
    $elementsToIndicate = [];

     // Declare slide layers
    // IF ADDING A SLIDE://///////////
   // declare it here in this format:
    var $slide1BG = $('.slide-1').find('.slide-layer--background');
    var $slide1FG = $('.slide-1').find('.slide-layer--foreground');
    var $slide2BG = $('.slide-2').find('.slide-layer--background');
    var $slide2FG = $('.slide-2').find('.slide-layer--foreground');
    var $slide3BG = $('.slide-3').find('.slide-layer--background');
    var $slide3FG = $('.slide-3').find('.slide-layer--foreground');

// and then call a function on the newly declared slide here in this format:
// moveSlide($slidename, speed).
// When setting a number for speed, '1' would be equal to the normal scrolling speed,
// 0.5 would be half scrolling speed, negative would make the layer move upwards, etc.
  $(window).scroll(function() {
    if ($(window).width() > 992) {
////////////////////////////////////////
      moveSlide($slide1BG, 0.35);
      moveSlide($slide1FG, -0.2);

      moveSlide($slide2BG, 0.4);
      moveSlide($slide2FG, 0.2);

      moveSlide($slide3BG, 0.3);
      moveSlide($slide3FG, 0.3);
////////////////////////////////////////

      activateIndicator();
    }
  });

/*
 * This function takes parameters of an element
 * and a speed for the x-axis, in order to modify the scroll
 * speed of that element and create a parallax effect.
 */
  function moveSlide(element, xspeed) {
    var scrolled = $(window).scrollTop(),
      boundryTop = element.parent().offset().top,
      boundryBottom = boundryTop + element.parent().outerHeight();

    if (boundryTop <= scrolled && boundryBottom > scrolled) {
      $('.about-section').removeClass('active');
      element.parent().addClass('active');

      element.css({
        transform: 'translateY(' + ((scrolled - $('.active').offset().top) * xspeed) + 'px) translateX(0px)',
      });

    } else {
      element.parent().removeClass('active');
      element.css({
        transform: 'translateY(0px) translateX(0px)',
      });
    }
  }

// Other, non-animation related things
  $navIcon.click(function(){
    $(this).toggleClass('open');
    $navBar.toggleClass('show-menu');
    $navBar.find('h1').toggleClass('open-menu');
  });

// Dynamic z-index to prevent dynamic number of slides from over-lapping
  $slides.each(function(i) {
    $(this).css('z-index', i);
    i++;

    $indicators.prepend('<li><a href="#"></a></li>');
  });

  // Indicator functionality
  function activateIndicator() {
    var aboutBoundryTop = $('.about-section').offset().top,
      aboutBoundryBottom = aboutBoundryTop + $('.about-section').outerHeight(),
      scrolled = $(window).scrollTop(),
      $totalLength = $slides.length + 1; // account for about section


    if (aboutBoundryTop <= scrolled && aboutBoundryBottom > scrolled) {
      $('.about-section').addClass('active');
    }

    for (var i = 0; i < $totalLength; i++) {
      if ($('.active').hasClass('slide-' + i)) {
       var $activeIndicator = $('#slideIndicators').find('li').eq(i - 1);
       $activeIndicator.addClass('active-indicator');
       $('#slideIndicators').find('li').not($activeIndicator).removeClass('active-indicator');
      } else if ($('.active').hasClass('about-section')) {
        $('#slideIndicators').find('li').removeClass('active-indicator');
        $('#slideIndicators').find('li').last().addClass('active-indicator');
      }
    }
  }
  activateIndicator();

  $indicators.find('a').click(function(e) {
    var targetIndex = $(this).parent().index(),
      $targetElem = $slides.eq(targetIndex).offset().top;

    $('html, body').animate({scrollTop: $targetElem}, 1000);
    e.preventDefault();
  });

// Down arrow scrollto functionality
  $('.down-arrow').click(function(e) {
    var target = $(this).closest('section').next('section').offset().top;
    $('html, body').animate({scrollTop: target}, 1000);
    e.preventDefault();
  });

// Social icons hover
  $navBar.find('li').hover(function() {
    /* Stuff to do when the mouse enters the element */
    $navBar.find('li').not($(this)).addClass('inactive');
  }, function() {
    /* Stuff to do when the mouse leaves the element */
    $navBar.find('li').removeClass('inactive');
  });
  
}(jQuery));
