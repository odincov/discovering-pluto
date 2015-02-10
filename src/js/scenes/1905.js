var ScrollScene = require('../../vendor/ScrollMagic/js/jquery.scrollmagic').Scene

var timeline = new TimelineMax()
timeline
  .from('.slide__bg--1905', 1, { opacity: 0, scale: 1.25, ease: Expo.easeOut })
  .from('.slide--1905 h2', 0.5, { opacity: 0, x: 50 }, "-=0.5")
  .from('.slide--1905 p', 0.5, { opacity: 0, x: 50 })

var scene = new ScrollScene({ 
  triggerElement: '.slide--1905',
  // duration: 500
})
.setTween(timeline)

module.exports = scene
