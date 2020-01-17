// registration_message
function registration_message(type,txt){
  type = type ? type : 0
  $(document).find('.registration_form .form_status').removeClass('_error')
  if ( type == 0 ) $(document).find('.registration_form .form_status').html('')

  // message
  if ( type == 0 ) $(document).find('.registration_form .form_status').html(txt)
  // error
  if ( type == 1 ) $(document).find('.registration_form .form_status').addClass('_error').html(txt)
}
// registration_message x

$(function(){
  $(document).on ('input', '#registration_form input[name="login"]', function(){
    var text = $(this).val()
    $(this).val( text.toLowerCase() )
  })

  $(document).on('submit', '#registration_form', function(){
    // - Получаем ключ сессии
    // - Параметры
    var
    data = [], // Отправляемые данные
    result_text = '', // Текст о результате
    validate = 0 // Если есть ошибки

    // - demo
    // login = true
    // if ( $(this).find('[name=email]').val() != 'demo' ) login = false
    // if ( $(this).find('[name=password]').val() != 'demo' ) login = false
    // if ( login ) {
    //   localStorage.setItem('session_key', session_key = 'demo')
    //   registration()
    // }else{
    //   validate = 1
    //   result_text = 'Email или пароль введён не верно!'
    //   registration_message(validate, result_text)
    // }
    // - demo x

    // - site_login
    // -- add csrftoken
    // data = $(this).serializeArray()
    // data.push({
    //   name: 'csrftoken',
    //   value: csrftoken
    // })
    // data = $.param(data)

    data = $(this).serializeArray()

    $.ajax({
      url: site_url + 'api/v1/accounts/register/',
      data: data,
      method: 'POST',
      // headers: {
      //   'X-CSRF-TOKEN': csrftoken
      // }
    }).fail(function(data) {
      // - Парсим ошибки
      if ( data.responseJSON ) {
        // -- Email уже используется
        if ( data.responseJSON.email ) {
          var
          error_messages = '<p style="color:#ff7f7f;">'

          $.each(data.responseJSON.email, function(index, value){
            error_messages += value + '<br/>'
          })

          error_messages += '</p>'
          registration_message(1, error_messages)

          return false
        }
        // -- Если пароли не совпадают
        if ( data.responseJSON.non_field_errors ) {
          var
          error_messages = '<p style="color:#ff7f7f;">'

          $.each(data.responseJSON.non_field_errors, function(index, value){
            error_messages += value + '<br/>'
          })

          error_messages += '</p>'
          registration_message(1, error_messages)

          return false
        }
        // -- Если пароль не верен, выводим месседж
        if ( data.responseJSON.password ) {
          var
          error_messages = '<p style="color:#ff7f7f;">'

          $.each(data.responseJSON.password, function(index, value){
            error_messages += value + '<br/>'
          })

          error_messages += '</p>'
          registration_message(1, error_messages)

          return false
        }
      }

      // -- Другие ошибки
      console.log(data)
      registration_message(1, '<p style="color:#ff7f7f;">' + data + '</p>')

    }).done(function(data) {
      console.log(data)
      app_status('Аккаунт зарегистрирован',1)
      content_upload('templates/authorizations/authorization.htm')
      // registration_message(1, '<p style="color:#ff7f7f;">' + '<br/>' + data.responseJSON.detail + '</p>')
    })
    // - site_login x

    return false
  })
})
