var ScrollMagic = require('../vendor/ScrollMagic/js/jquery.scrollmagic').Controller
  , ScrollScene = require('../vendor/ScrollMagic/js/jquery.scrollmagic').Scene

var internals = {}


internals.init = function(app){
  var c = new ScrollMagic() 

  console.log( c )
}

module.exports = internals.init

