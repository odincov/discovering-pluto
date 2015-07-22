var ScrollMagic = require('../vendor/ScrollMagic/js/jquery.scrollmagic').Controller
  , ScrollScene = require('../vendor/ScrollMagic/js/jquery.scrollmagic').Scene

var internals = {}

internals.init = function(app){
  var controller = new ScrollMagic() 
  controller.addScene([
    require('./scenes/timeline'),
    require('./scenes/1848'),
    require('./scenes/1905'),
    require('./scenes/1915'),
    require('./scenes/2006-b')
  ])
}

module.exports = internals.init

