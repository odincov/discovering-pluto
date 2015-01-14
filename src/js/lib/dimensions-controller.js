var internals = {}
  , win = $(window)
  , app

internals.init = function(_app){
  app = _app 

  app.dimensions = {
    width : 0,
    height: 0,
    scrollTop: 0
  }

  window.resizeQueue.push(internals.resize)
  window.scrollQueue.push(internals.scroll)
}

internals.resize = function(){
  app.dimensions.width = win.width()
  app.dimensions.height = win.height()
}

internals.scroll = function(){
  app.dimensions.scrollTop = win.scrollTop()
}

module.exports = internals.init