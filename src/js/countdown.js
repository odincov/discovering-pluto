var internals = {}

function calcage(secs, num1, num2, leadingZero) {
  var s = ((Math.floor(secs/num1))%num2).toString();
  if (leadingZero && s.length < 2)
    s = "0" + s
  return s
}

function getCountdownTime(){
//   var currentDate = new Date()
//       , currentLocalTime = currentDate.getTime()
//       , currentLocalOffset = currentDate.getTimezoneOffset()*60000
//       , currentUTC = currentLocalTime + currentLocalOffset

  var currentUTC = new Date().getTime()

  var targetUTC = Date.UTC(2015, 06, 14, 11, 49, 59)

  var diff = (targetUTC - currentUTC)/1000
  
  var days = calcage(diff,86400,100000)
  var hours = calcage(diff,3600,24, true)
  var minutes = calcage(diff,60,60, true)
  var seconds = calcage(diff,1,60, true)

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

function renderCountdown(elements,c){
  elements.days.empty().html(c.days)
  elements.hours.empty().html(c.hours)
  elements.minutes.empty().html(c.minutes)
  elements.seconds.empty().html(c.seconds)
}

internals.init = function(app){
  var elements = {
    days : $('.timer__number--days'),
    hours: $('.timer__number--hours'),
    minutes: $('.timer__number--minutes'),
    seconds: $('.timer__number--seconds')
  }
  setInterval(function(){
    renderCountdown(elements,getCountdownTime())
  },1000)
}

module.exports = internals.init
