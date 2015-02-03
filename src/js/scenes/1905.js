var ScrollScene = require('../../vendor/ScrollMagic/js/jquery.scrollmagic').Scene

var scene = new ScrollScene({ 
  triggerElement : '.slide--1905',
})
.offset(200)
.setTween(TweenMax.from('.slide__bg--1905', 1, { 
  opacity: 0,
  scale: 1.25,
  ease: Expo.easeOut
}))

module.exports = scene