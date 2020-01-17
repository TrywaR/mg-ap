// authorization
function authorization(){
  // Если пользователь авторизирован
  if ( session_key ) {

    active_buttons()
    // - Получаем инфу о пользователя
    // - Параметры
    var
    data = new Object(), // Отправляемые данные
    result_text = '', // Текст о результате
    validate = 0 // Если есть ошибки
    // data.token = session_key

    $.ajax({
      url: site_url + 'api/v1/accounts/profile/',
      data: data,
      method: 'GET',
      headers: {
        "Authorization": "token " + session_key
      }
    }).fail(function(data) {
      app_status(data)
      return false

    }).done(function(data) {
      // - Подгружаем инфу о пользаке
      user = data
      localStorage.setItem('user', user)

      // - Есди информация о пользователе не заполненна, отправляем его заполнять
      if ( ! user.first_name )
      content_upload('templates/profiles/edit.htm')
      else
      content_upload('templates/profiles/index.htm')
      return false
    })
  }
  else {
    // console.log('start')
    active_buttons()
    content_upload('templates/authorizations/authorization.htm')
    // content_upload('templates/authorizations/registration.htm')
    // content_upload('https://alliance.paultik.ru/account/registration/')
    // content_upload('https://alliance.paultik.ru/api/v1/accounts/login/')
  }
}
// authorization x

// authorization_message
function authorization_message(type,txt){
  type = type ? type : 0
  $(document).find('.authorization_form .form_status').removeClass('_error')
  if ( type == 0 ) $(document).find('.authorization_form .form_status').html('')

  // message
  if ( type == 0 ) $(document).find('.authorization_form .form_status').html(txt)
  // error
  if ( type == 1 ) $(document).find('.authorization_form .form_status').addClass('_error').html(txt)
}
// authorization_message x

$(function(){
  authorization()
  console.log('detected')

  // authorization_form
  $(document).on('submit', '#authorization_form', function(){
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
    //   authorization()
    // }else{
    //   validate = 1
    //   result_text = 'Email или пароль введён не верно!'
    //   authorization_message(validate, result_text)
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
    //

    data = $(this).serializeArray()

    $.ajax({
      url: site_url + 'api/v1/accounts/login/',
      data: data,
      method: 'POST',
      // headers: {
      //   'X-CSRF-TOKEN': csrftoken
      // }
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
      console.log(data)
      return false

    }).done(function(data) {
      // - Успешно вошли, 300 чашек чаю, этому господину
      console.log(data)

      if ( data.token ) {
        localStorage.setItem('session_key', session_key = data.token)
        authorization()

        if ( data.detail )
        authorization_message(1, '<p style="color:#ff7f7f;">' + data.detail + '</p>')
      }
    })
    // - site_login x

    return false
  })
  // authorization_form х

  // password_form
  $(document).on('submit', '#password_form', function(){
    return false
  })
  // password_form x

  // password-code_form
  $(document).on('submit', '#password-code_form', function(){
    return false
  })
  // password-code_form x

  // password-new_form
  $(document).on('submit', '#password-new_form', function(){
    return false
  })
  // password-new_form x

  // exit
  $(document).on('click', '#profile_exit', function() {
    localStorage.removeItem('session_key')
    session_key = ''
    authorization()
  })
  // exit x
})
