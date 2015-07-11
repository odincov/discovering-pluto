var ScrollScene = require('../../vendor/ScrollMagic/js/jquery.scrollmagic').Scene

var timeline = new TimelineMax()
timeline
  .from('.slide__background--1915', 1, { opacity: 0, ease: Expo.easeOut })
  .from('.slide--1915 h2', 0.5, { opacity: 0, y: 50 }, "-=0.5")
  .from('.slide--1915 p', 0.5, { opacity: 0, y: 50 })

var scene = new ScrollScene({ 
  triggerElement : '.slide--1915',
})
// .offset(300)
.setTween(timeline)

module.exports = scene
