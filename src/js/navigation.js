var ScrollMagic = require('../vendor/ScrollMagic/js/jquery.scrollmagic').Controller
var ScrollToPlugin = require('./lib/ScrollToPlugin.min.js')
var debug = require('debug')('Navigation')
var domready = require('domready')
var waypoints = require('../vendor/waypoints/lib/jquery.waypoints.min')

var controller = new ScrollMagic()

controller.scrollTo(function(offset){
  TweenMax.to(window, .5, {
    scrollTo: {
      y: offset,
      autokill: true
    },
    ease: Cubic.easeInOut
  })
})

function getNext(direction){
  var $next
  $blocks = $('.js-nav-block')
  $active = $('.js-nav-block-active')
  switch(direction){
    case 'down':
      $next = $blocks.eq($blocks.index($active)+1)
      if($next.length == 0) $next = $blocks.eq(0)
      break
    case 'prev':
      $next = $blocks.eq($blocks.index($active)-1)
      if($next.length == 0) $next = $blocks.eq($blocks.length)
      break
  }
  $active.removeClass('js-nav-block-active')
  $next.addClass('js-nav-block-active')
  return $next
}

function adjustOffsetPosition () {
  var wScrollTop = $(window).scrollTop()
  var wHeight = $(window).height()
  $('.js-nav-block').each(function(){
    var offset = $(this).offset().top
    var height = $(this).height()
    if( offset-height/2 <= wScrollTop && offset+height/2 >= wScrollTop) {
      if(height <= wHeight){
        controller.scrollTo(offset)
      }
      $('.js-nav-block-active').removeClass('js-nav-block-active')
      $(this).addClass('js-nav-block-active')
      window.location.hash = $(this).attr('id').replace('block-','')
    }
  })
}

function adjustTimeline () {
  var $timeline = $('.timeline')
  var $cursor = $('.timeline__date-cursor')
  var $blocks = $('.js-nav-block')
  var $slides = $('section.slide')
  var $active = $('.js-nav-block-active')
  var $date = $('.timeline__date')

  var l = $slides.length
  var p = $slides.index($active)
  var t = p/l*100
  var cbi = $blocks.index($active)

  if( t < 0 ) {
    $timeline.css({ 'opacity': '0' })
    t = (cbi === 0) ? 0 : 100
  }
  else {
    setTimeout(function () {
      $timeline.css('opacity','1')
    }, 500)
  }

  $cursor.css('top', t+'%')
  var date = $active.attr('id').replace('block-','').split('-')[0]
  if(date === '1848' || date === '2015') date = ''
  $date.empty().html(date)

}

function init(app){
  $(window).keydown(function(e){
    e.preventDefault()

    if (e.which == 40 || e.which == 39 || e.which == 32) {
      var $next = getNext('down')
    } else if (e.which == 38 || e.which == 37) {
      var $next = getNext('prev')
    }
    var offset = $next.offset().top
    controller.scrollTo(offset)
    adjustTimeline()
  })

  window.scrollQueue.push(adjustTimeline)
  window.scrollQueue.push(adjustOffsetPosition)
}

module.exports = init
