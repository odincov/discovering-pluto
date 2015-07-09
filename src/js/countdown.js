function calcage(secs, num1, num2, leadingZero) {
  var s = ((Math.floor(secs/num1))%num2).toString();
  if (leadingZero && s.length < 2) {
    s = "0" + s;
  }
  return s;
}

function getCountdownTime() {
  var data = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  var currentUTC = new Date().getTime();
  var targetUTC = Date.UTC(2015, 06, 14, 11, 49, 59);
  var diff = (targetUTC - currentUTC)/1000;

  if (diff > 0) {
    data.days = calcage(diff,86400,100000);
    data.hours = calcage(diff,3600,24, true);
    data.minutes = calcage(diff,60,60, true);
    data.seconds = calcage(diff,1,60, true);
  }

  return data;
}

function renderCountdown(elements,c){
  elements.days.empty().html(c.days)
  elements.hours.empty().html(c.hours)
  elements.minutes.empty().html(c.minutes)
  elements.seconds.empty().html(c.seconds)
}

function init(){
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

module.exports = init
