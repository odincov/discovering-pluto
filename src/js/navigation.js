var ScrollMagic = require('../vendor/ScrollMagic/js/jquery.scrollmagic').Controller;
var ScrollToPlugin = require('./lib/ScrollToPlugin.min.js');
var debug = require('debug')('Navigation');
var debounce = require('debounce');

function Navigation () {
  this.controller = new ScrollMagic()
  this.controller.scrollTo(function (offset) {
    TweenMax.to(window, .5, {
      scrollTo: {
        y: offset,
        autokill: true
      },
      ease: Cubic.easeInOut
    });
  });

  this.$els = {
    timeline: $('.timeline'),
    cursor: $('.timeline__date-cursor'),
    blocks: $('.js-nav-block'),
    slides: $('section.slide'),
    date: $('.timeline__date')
  }
}

Navigation.prototype.getNext = function (direction) {
  var $next;
  switch(direction){
    case 'down':
      $next = this.$els.blocks.eq(this.$els.blocks.index(this.$els.active)+1);
      if($next.length == 0) $next = this.$els.blocks.eq(0);
      break;
    case 'prev':
      $next = this.$els.blocks.eq(this.$els.blocks.index(this.$els.active)-1);
      if($next.length == 0) $next = this.$els.blocks.eq(this.$els.blocks.length);
      break;
  }
  this.$els.active = $next;
  return $next;
}

Navigation.prototype.adjustOffsetPosition = function () {
  var that = this

  var wScrollTop = $(window).scrollTop();
  var wHeight = $(window).height();

  this.$els.blocks.each(function(){
    var offset = $(this).offset().top;
    var height = $(this).height();
    if( offset-height/2 <= wScrollTop && offset+height/2 >= wScrollTop) {
      if(height <= wHeight){
        debounce( that.controller.scrollTo(offset), 100);
        console.log('blah');
      }
      that.$els.active = $(this);
      window.location.hash = $(this).attr('id').replace('block-','');
    }
  })
}

Navigation.prototype.checkHash = function () {
  var hash = window.location.hash
  if( hash.length > 0 ){
    hash  = hash.replace('#','#block-')
    this.$els.active = this.$els.blocks.filter( hash )
  } else {
    this.$els.active = this.$els.blocks[0]
    this.setDocumentTitle( $(this.$els.active).data('title') )
  }

  this.controller.scrollTo(this.$els.active.offset().top)
}

Navigation.prototype.scrollTimeline = function () {
  var date = '';
  var currentScroll = $(window).scrollTop();
  var firstSlideOffsetTop = $(this.$els.slides[0]).offset().top;
  var lastSlideOffsetTop = $(this.$els.slides[this.$els.slides.length-1]).offset().top;
  var slidesHeight = 0;

  this.$els.slides.each(function(){
    slidesHeight += $(this).height();
  })

  var l = lastSlideOffsetTop-firstSlideOffsetTop;
  var p = currentScroll-firstSlideOffsetTop;
  var t = p/l*100;

  if( t < 0  || t > 100) {
    this.$els.timeline.css({ 'opacity': '0' });
  }
  else {
    this.$els.timeline.css('opacity','1');
  }

  this.$els.cursor.css('top', t+'%');

  var i = this.$els.slides.index(this.$els.active);

  if ( i > 0 && i < (this.$els.slides.length-1)) {
    date = this.$els.active.attr('id').replace('block-','').split('-')[0];
  }

  this.setCursorDate( date );
  this.setDocumentTitle( $( this.$els.active ).data('title') );
}

Navigation.prototype.setCursorDate = function (date) {
  this.$els.date.empty().html(date);
}

Navigation.prototype.setDocumentTitle = function (title) {
  document.title = title.replace('<br>',' ');
}

Navigation.prototype.handleKeys = function (e) {
  var direction = 'down';

  if (e.which == 40 || e.which == 39 || e.which == 32) {
    e.preventDefault();
    direction = 'down';
  } else if (e.which == 38 || e.which == 37) {
    e.preventDefault();
    direction = 'prev';
  }

  var $next = this.getNext(direction);
  var offset = $next.offset().top;
  this.controller.scrollTo(offset);
}

Navigation.prototype.init = function (){
  $(window).on('keydown', this.handleKeys.bind(this));
  $(window).on('scroll', this.scrollTimeline.bind(this));
  window.scrollQueue.push(this.adjustOffsetPosition.bind(this));
  this.checkHash();
}

module.exports = Navigation;
