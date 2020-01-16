// profile_init
function profile_init(){
  // - Получаем инфу о пользователя
  // - Параметры
  var
  data = new Object(), // Отправляемые данные
  result_text = '', // Текст о результате
  validate = 0 // Если есть ошибки

  data.token = session_key

  console.log(data)

  $.ajax({
    url: site_url + 'api/v1/accounts/profile/',
    data: data,
    method: 'POST',
    // headers: {
    //   'X-CSRF-TOKEN': csrftoken
    // }
  }).fail(function(data) {
    console.log(data)
    app_status(data)

    return false

  }).done(function(data) {
    console.log(data,1)
    return false
  })
}
// profile_init x

// profile_progress
function profile_progress(){
  var lenght = $(document).find('.profile_progress .step.__yes').length
  if ( lenght > 0 )
    $(document)
      .find('.profile_progress .step')
        .each(function(index, elem){
          if ( index ) {
            if ($(this).hasClass('.__yes'))
              $(this).find('._tree span:eq(1)').css({
                'animation-delay': index + 's'
              })

            $(this).find('._desc').css({
              'animation-delay': index + 's'
            })
          }
        })

  // Если на странице пользователя, собираем его инфу
  if ( $(document).find('.main_profile').length > 0 )
    $(document)
      .find('.main_profile ._profile_info ._points span')
        .html( localStorage.getItem('user_points') )
}
// profile_progress x
