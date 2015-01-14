var ScrollScene = require('../../vendor/ScrollMagic/js/jquery.scrollmagic').Scene

var scene = new ScrollScene({ 
  triggerElement : '.slide--1848' 
})
.setTween(TweenMax.from('.slide__bg--1848', .5, { 
  opacity: 0 
}))

module.exports = scene
