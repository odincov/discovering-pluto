var EventEmitter = require('events').EventEmitter
var domready = require('domready')

window.myDebug = require('debug')

window.resizeQueue = []
window.scrollQueue = []

var app = {
  msgs : new EventEmitter,
  dimensions : {
    height : 0,
    width : 0
  }
}

require('./lib/window-controller')(app)
require('./lib/dimensions-controller')(app)

require('./animations')(app)
require('./countdown')(app)
require('./subscribe-form')(app)
var Navigation = require('./navigation')

domready(function(){
  app.msgs.emit('ready')
  var navigation = new Navigation()
  navigation.init()
})
