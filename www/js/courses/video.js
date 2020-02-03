// Функция отмечает просмотренные видео, и обновляет инфу о пользователе после просмотра видео
function video_checker(){
  console.log('video_checker')
  // Перебираем видео, отмечаем просмотренные, засчитываем баллы за просмотр новых
  $(document)
  .find('#video')
  .find('.video')
  .each(function(){
    var
    block_video = $(this),
    video = block_video.find('._video video'),
    sVideoId = block_video.data().id,
    video_src = video.find('source').attr('src'),
    oVideo = video[0],
    jsonVideoPassed = {}

    // Подгружаем просмотренные видео
    if ( user.passed_video )
    jsonVideoPassed = $.parseJSON( user.passed_video )

    // Если пользователь смотрел его
    if ( jsonVideoPassed[sVideoId] > 0 ) {
      // Отмечаем как просмотренное
      block_video
      .find('._video')
      .find('._prev')
      .addClass('__chek')
    }

    // Если не смотрел
    else {
      // Если пользователь запускает видео
      oVideo.onplaying = function(){
        VideoTimer = setTimeout(function () {
          // Параметры
          var
          oData = {
            'video_checked': sVideoId
          }

          // Отправляем id видео
          $.ajax({
            url: site_url,
            data: $.extend( oData, ajax_salt ),
            method: 'POST',

          }).fail(function(data) {
            app_status( {'error': 'Ошибка соединения'} )
            return false

          }).done(function(data) {
            if ( data ) {
              var jsonUser = $.parseJSON(data)
              app_status( jsonUser )

              // Обновляем информацию о пользователе
              if ( jsonUser.id > 0 ) {
                user = jsonUser
                localStorage.setItem('user', JSON.stringify(user))
              }
            }
          })

          // Помечаем как просмотренное
          block_video
          .find('._video')
          .find('._prev')
          .addClass('__chek')
        }, 1000)
      }
    }

    block_video.delay('slow').addClass('_load_')
  })
}

function video_html(oVideo){
  // - html темы
  var
  sPassed = '',
  sVideoType = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
  sVideoHtml = ''

  sVideoHtml += '<div class="item video" data-id="' + oVideo.id + '">'
    if ( oVideo.name )
    sVideoHtml += '<div class="_name">' + oVideo.name + '</div>'
    if ( oVideo.src ) {
      sVideoHtml += '<div class="_video">'
        if ( oVideo.overlay ) {
          sVideoHtml += '<div class="_prev" style="background: url(' + site_url + oVideo.overlay +') ">'
          sVideoHtml += '</div>'
        }
        sVideoHtml += '<video width="100%" height="250" controls="controls">'
          sVideoHtml += '<source src="' + site_url + oVideo.src.substr(1) + '" type=\'' + sVideoType + '\'>'
          sVideoHtml += 'Тег video не поддерживается вашим браузером.'
        sVideoHtml += '</video>'
      sVideoHtml += '</div>'
    }
    if ( oVideo.description )
    sVideoHtml += '<div class="_description">' + oVideo.description + '</div>'
  sVideoHtml += '</div>'

  return sVideoHtml
}

function video_init(){
  // content
  // Параметры
  var
  sResultHtml = '',
  oData = {
    'theme': arrPageParams['id'],
    'video': true,
  }

  $.ajax({
    url: site_url,
    data: $.extend( oData, ajax_salt ),
    method: 'POST',

  }).fail(function(data) {
    app_status( {'error': 'Ошибка соединения'} )
    return false

  }).done(function(data) {
    var jsonTheme = $.parseJSON(data)
    app_status( jsonTheme )

    // Вставляем видео
    sResultHtml = ''
    if ( jsonTheme['video'].length > 0 ) {
      $.each( jsonTheme['video'], function( index, oVideo ){
        sResultHtml += video_html(oVideo)
      })

      // - Выводим видео темы
      $(document)
      .find('main')
      .find('.block_video')
      .addClass('_show_')

      $(document)
      .find('#video')
      .html(sResultHtml)

      // video progress
      video_checker()
    }
  })
  // content x

  // decoration
  $(document)
  .on('click', '#video .video ._video ._prev', function(){
    if (
      $(this).next('video').length > 0 &&
      ! $(this).next('video').hasClass('_active_')
    ) {
      // Убираем заставку
      $(this).parents('.video').addClass('_active_').siblings().removeClass('_active_')
      // Запускаем видео
      $(this).next('video').trigger('play')
      // Останавливаем другие видео
      $(this).parents('.video').siblings().find('video').trigger('pause')
    }
  })
}
