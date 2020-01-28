function course_init(){
  if ( arrPageParams['id'] ) {
    // Параметры
    var
    sResultHtml = '',
    oData = {
      'course': true,
      'id': arrPageParams['id']
    }

    // Загружаем курс
    $.ajax({
      url: site_url,
      data: $.extend( oData, ajax_salt ),
      method: 'POST',

    }).fail(function(data) {
      app_status( {'error': 'Ошибка соединения'} )
      return false

    }).done(function(data) {
      var jsonCourse = $.parseJSON(data)
      app_status( jsonCourse )

      // Подставляем данные в страницу
      $.each( jsonCourse, function(key, value) {
        $( document )
        .find( '[data-key=' + key + ']' )
        .html( value )

        var data_attr = 'data-' + key
        $( document )
        .find( '[' + data_attr + ']' )
        .attr( data_attr, value )
      })
    })
  }
}

function video_init(){
  // content
  var courses = {'courses': ''}

  $.ajax({
    url: site_url,
    data: $.extend(user, ajax_salt, courses),
    method: 'POST',

  }).fail(function(data) {
    var oData = {}
    oData.error = 'Ошибка соединения'
    app_status( oData )
    return false

  }).done(function(data) {
    console.log(data)
    var oData = $.parseJSON(data)

    // - Сообщаем результат
    // app_status( oData )
  })
  // content x

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
        if ( ! localStorage.getItem( video_src ) ){
          user.user_points = parseInt( user.user_points ) + 10
          localStorage.setItem( video_src , true )

          // Сохраняем
          data = {}
          data.user_points = user.user_points
          data.email = user.email
          data.id = user.id

          // Info
          $.ajax({
            url: site_url + 'api/v1/accounts/profile/',
            data: data,
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
    // $(this).remove()
    $(this).addClass('_active_').siblings().removeClass('_active_')

    if ( $(this).next('video').length > 0 )
      $(this).next('video').trigger('play')

    if ( $(this).next('iframe').length > 0 )
      $(this).next('iframe').attr('src', $(this).next('iframe').attr('src') + "?autoplay=1")
  })
}
