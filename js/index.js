var apiEndpoint = 'https://wind-bow.glitch.me/twitch-api/'
var channels = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'comster404', 'myfakerthanfakeusername']
var currentList = 'all'

function updateList(channels){
  channels.forEach(function(channel){
    $.getJSON(apiEndpoint + 'streams/' + channel)
      .done(function(streamData){
        if(streamData.stream){
          checkChannelValid(true, channel, streamData)
          return
        } 

        checkChannelValid(false, channel, streamData)
      })
  })
}

function checkChannelValid(isOnline, channel, streamData) {
  $.getJSON(apiEndpoint + 'channels/' + channel)
    .done(function(channelData){
      if (channelData.status === 404) { 
        displayErrMsg(channelData)
      } else {
        renderChannel(isOnline, streamData, channelData)
      }
    })
}

function displayErrMsg(data) {
  var errorMessage = '<div class="notification is-danger">' + data.message + '</div>'
  $('#error-messages').append(errorMessage)
}

function renderChannel(isOnline, streamData, channelData) {
  // var channel = streamData.stream.channel
  // if (typeof channel === 'undefined') console.log(streamData)
  var onlineStatus = isOnline ? 'online' : 'offline'
  var streamDetails = !isOnline ? '' : channelData.status
  var channelHTML = '<article class="media is-' + onlineStatus + '">' +
                      '<figure class="media-left">' +
                        '<p class="image is-64x64"><img src="' + channelData.logo + '" alt="avatar"></p>' +
                      '</figure>' +
                      '<div class="media-content">' +
                        '<div class="content">' +
                          '<p>' +
                            '<strong>' + channelData.name + '</strong>' +
                            '<span class="icon is-small"><i class="fa fa-small fa-circle ' + onlineStatus + '"></i></span><small>' + onlineStatus + '</small>' +
                            '<br>' +
                            streamDetails +
                          '</p>' +
                        '</div>' +
                        '<nav>' +
                          '<a target="_blank" href="' + channelData.url + '" class="button is-primary is-small"><span>View Channel</span><span class="icon is-small"><i class="fa fa-arrow-right"></i></span></a>' +
                        '</nav>' +
                      '</div>' +
                    '</article>'  
  $('#channels').append(channelHTML)
}

function handleTabs(id) {
  var all = $('.is-online, .is-offline')
  var online = $('.is-online')
  var offline = $('.is-offline')
  
  if (id === 'all-tab') {
    all.each(function(){
      $(this).show('slow')
        
        // .removeClass('fadeInLeft')
        // .removeClass('fadeOutLeft')
        // .addClass('fadeOutLeft')
        // .delay(1000)
        // .removeClass('fadeOutLeft')
        // .removeAttr('style')
        // .addClass('fadeInLeft')
    })
  } else if (id === 'online-tab'){
    offline.each(function(){
      $(this).hide('fast', function(){
        $(this).css('display', 'none')
      })
        
        // .removeClass('fadeInLeft')
        // .addClass('fadeOutLeft')
        // .delay(2000)
        // .fadeIn(0)
        // .css('display','none')    
    })
    online.each(function(){
      $(this).show('slow')
        
        // .removeClass('fadeOutLeft')
        // .removeAttr('style')
        // .addClass('fadeInLeft')

    })
  } else {
    online.each(function(){
      $(this).hide('fast', function(){$(this).css('display', 'none')})
        
        // .removeClass('fadeInLeft')
        // .addClass('fadeOutLeft')
        // .delay(2000)
        // .css('display', 'none')
    })
    offline.each(function(){
      $(this).show('slow')
        
        // .removeClass('fadeOutLeft')
        // .removeAttr('style')
        // .addClass('fadeInLeft')
    })
  }
}

$(document).ready(function(){
  updateList(channels)  

  $('.panel-tabs > a').each(function(idx, el){
    $(el).on('click', function(){
      $('.is-active').each(function(idx, el){
        $(el).removeClass('is-active')
      })
      $(this).addClass('is-active')
      handleTabs($(this).attr('id'))
    })
  })
})