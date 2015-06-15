var request = require('superagent')
var debug = require('debug')('Subscribe')
var url = 'http://discoveringpluto.us9.list-manage.com/subscribe/post-json?u=41366b8e11625bef94f4219be&id=0c0285ad0e&c=?'

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function subscribe(subsriber, callback){
  request
    .post(url)
    .send(data)
    .end(function(error, res){
      callback(error, res)
    })
}

function init(){
  $('#subscribe_button').click(function(e){
    e.preventDefault()
    var errors = []
    var data = ''
    var email = $('#subscribe_email').val()
    var signupForNews = $('#subscribe_for_news')

    if( !validateEmail(email) ) errors.push('email')

    debug(errors)

    if( errors.length > 0 ) {
      $('.subscribe__error--email').show()
      return false
    }
    $('.subscribe__error').hide()

    data = 'EMAIL='+email

    $.ajax({
      type: 'GET',
      url: url,
      data: data,
      cache: false,
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      error: function(err) {
        debug('ajax error')
        debug(err)
      },
      success: function(data) {
        debug('ajax success')
        debug(data.result)
        debug(data)
        if (data.result != "success") {
          if(data.msg.search('is already subscribed') > -1){
            $('.subscribe__error--email-exists').show()
          }
          else {
            $('.subscribe__error--other').show()
          }
          // Something went wrong, do something to notify the user. maybe alert(data.msg);
        } else {
          // It worked, carry on...
          $('.subscribe__form-wrapper').hide()
          $('.subscribe__thank-you-wrapper').show()
        }
      }
    })
  })
}

module.exports = init
