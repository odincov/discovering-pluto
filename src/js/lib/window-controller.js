var internals = {}
  , win = $(window)
  , debounce = require('debounce')

function call(fn) {
  return typeof fn === 'function'
    ? fn()
    : false
}

function doResize() {
  window.resizeQueue.forEach(call)
}

function doScroll() {
  window.scrollQueue.forEach(call)
}

internals.init = function(app){
  win.on('resize', debounce(function() { doResize() }, 50))
  win.on('scroll', debounce(function() { doScroll() }, 50))

  app.msgs.once('ready', function(){
    doResize()
    doScroll()
  })
}

module.exports = internals.init
