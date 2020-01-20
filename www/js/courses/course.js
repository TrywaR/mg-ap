function course_init(){
  // point saver
  $(document)
  .find('.them')
  .each(function(){
    var
    video = $(this).find('._video video'),
    video_src = video.find('source').attr('src'),
    oVideo = video[0]

    // Добавление балов за курсы
    oVideo.onplaying = function(){
      VideoTimer = setTimeout(function () {
        var new_point = parseInt( localStorage.getItem( 'user_points' ) ) + 10
        if ( ! localStorage.getItem( video_src ) ){
          localStorage.setItem( 'user_points', new_point )
          localStorage.setItem( video_src , true )

          // Сохраняем
          user.user_points = new_point

          // Info
          $.ajax({
            url: site_url + 'api/v1/accounts/profile/',
            data: user,
            method: 'POST',
            headers: {
              "Authorization": "token " + session_key
            }
          }).fail(function(data) {
            // - Парсим ошибки
            if ( data.responseJSON ) {
              // -- Ошибка, логин или пароль не подходит
              if ( data.responseJSON.detail ) {
                console.log( data.responseJSON.detail )
                authorization_message(1, '<p style="color:#ff7f7f;">' + data.responseJSON.detail + '</p>')
                return false
              }
            }
            // console.log(data)
            return false

          }).done(function(data) {
            // - Успешно вошли, 300 чашек чаю, этому господину
            // console.log(data)
          })
        }
      }, 1000);
    }

    // Отмечаем пройденные
    if ( localStorage.getItem( video_src ) ) {
      $(this)
      .find('._video')
      .find('._prev')
      .addClass('__chek')
      // .addClass('_passed_')
    }
  })

  // decoration
  $(document).find('.them ._video ._prev').on('click', function(){
    // console.log('video start')
    $(this).remove()
    $(this).addClass('_active_').siblings().removeClass('_active_')

    if ( $(this).next('video').length > 0 )
      $(this).next('video').trigger('play')

    if ( $(this).next('iframe').length > 0 )
      $(this).next('iframe').attr('src', $(this).next('iframe').attr('src') + "?autoplay=1")
  })
}
