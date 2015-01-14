var ScrollMagic = require('../vendor/ScrollMagic/js/jquery.scrollmagic').Controller
  , ScrollScene = require('../vendor/ScrollMagic/js/jquery.scrollmagic').Scene

var internals = {}


internals.init = function(app){
  var controller = new ScrollMagic() 
  controller.addScene([
    require('./scenes/1848'),
    require('./scenes/1905')
  ])
}

module.exports = internals.init

