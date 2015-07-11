var ScrollScene = require('../../vendor/ScrollMagic/js/jquery.scrollmagic').Scene

var scene = new ScrollScene({ 
  triggerElement : '.slide--2006-b' 
})
.offset(200)
.setTween(TweenMax.from('.slide__background--2006-b', 1, { 
  opacity: 0,
  scale: 1.1,
  ease: Quart.easeOut
}))

module.exports = scene
