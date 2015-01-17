var ScrollScene = require('../../vendor/ScrollMagic/js/jquery.scrollmagic').Scene

var scene = new ScrollScene({ 
  triggerElement : '.slide--1915',
})
.offset(300)
.setTween(TweenMax.from('.slide__bg--1915', 1.5, { 
  opacity: 0,
  ease: Expo.easeOut
}))

module.exports = scene
