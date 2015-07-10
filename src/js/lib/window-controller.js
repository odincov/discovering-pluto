var internals = {};
var win = $(window);
var debounce = require('debounce');
// var throttle = require('lodash.throttle');

function call(fn) {
  return typeof fn === 'function'
    ? fn()
    : false;
}

function doResize() {
  window.resizeQueue.forEach(call);
}

function doScroll() {
  window.scrollQueue.forEach(call);
}

internals.init = function(app){
  win.on('resize', debounce(function() { doResize() }, 50));
  win.on('scroll', debounce(function() { doScroll() }, 100));

  app.msgs.once('ready', function(){
    doResize();
    doScroll();
  })
}

module.exports = internals.init
