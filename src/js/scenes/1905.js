var ScrollScene = require('../../vendor/ScrollMagic/js/jquery.scrollmagic').Scene

var scene = new ScrollScene({ 
  triggerElement : '.slide--1905' 
})
.setTween(TweenMax.from('.slide__bg--1905', .5, { 
  opacity: 0,
  scale: 1.1
}))

module.exports = scene
