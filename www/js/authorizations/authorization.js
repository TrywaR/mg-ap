// authorization
function authorization(){
  // Если пользователь авторизирован
  if ( session_key ) {
    // - Проверка ключа сесси, и обновление данных о пользователе
    var
    form = {'form': 'session_validation'},
    data = $.extend(user, ajax_salt, form)

    $.ajax({
      url: site_url,
      data: data,
      method: 'POST',

    }).fail(function(data) {
      var oData = {}
      oData.error = 'Ошибка соединения'
      app_status( oData )
      return false

    }).done(function(data) {
      var oData = $.parseJSON(data)

      // - Успешно вошли, 300 чашек чаю, этому господину
      if ( ! oData.error ) {
        user = oData
        localStorage.setItem('user', JSON.stringify(user))
      }
      // - Сессия устарела
      else {
        app_status( oData )
        localStorage.clear()
        session_key = ''
        user = {}
        authorization()
      }
    })

    active_buttons()

    $(document).find('#profile_page a').data('id', user.id)

    if ( ! user.first_name )
    content_upload('profiles/edit.htm')
    else
    content_upload('profile.htm', {'form': 'session_validation'})
    // content_upload('templates/profiles/index.htm')
    // content_upload('templates/profiles/index.htm')
    return false

  }
  else {
    active_buttons()
    content_upload('templates/authorizations/authorization.htm')
  }
}
// authorization x

// authorization_message
function authorization_message( oData ){
  // - Чистим уведомления
  $(document).find('.authorization_form .form_status').removeClass('_error')
  $(document).find('.authorization_form .form_status').html('')

  // - Ошибка входа
  if ( oData.error )
  $(document).find('.authorization_form .form_status').addClass('_error').html( oData.error )

  // - Уведомление
  if ( oData.alert )
  $(document).find('.authorization_form .form_status').html( oData.alert )

  // - Успешно вошли, 300 чашек чаю, этому господину
  if ( oData.success )
  $(document).find('.authorization_form .form_status').html( oData.success )
}
// authorization_message x

$(function(){
  authorization()

  // Чистка ввода логина
  $(document).on ('input', '#authorization_form input[name="login"]', function(){
    var text = $(this).val().replace(/\s/g, '')
    $(this).val( text.toLowerCase() )
  })
  // Чистка ввода логина х

  // authorization_form
  $(document).on('submit', '#authorization_form', function(){

    // - Получаем ключ сессии, и информацию о пользователе
    $.ajax({
      url: site_url,
      data: $(this).serializeArray(),
      method: 'POST',

    }).fail(function(data) {
      var oData = {}
      oData.error = 'Ошибка соединения'
      authorization_message( oData )
      return false

    }).done(function(data) {
      var oData = $.parseJSON(data)

      // - Сообщаем результат
      authorization_message( oData )

      // - Успешно вошли, 300 чашек чаю, этому господину
      if ( ! oData.error ) {
        user = oData
        session_key = user.session_key
        ajax_salt['session_key'] = session_key

        localStorage.setItem('session_key', session_key)
        localStorage.setItem('user', JSON.stringify(user))

        authorization()
      }
    })

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
    localStorage.clear()
    session_key = ''
    user = {}
    authorization()
  })
  // exit x
})
