// authorization
function authorization(){
  // Если пользователь авторизирован
  if ( session_key ) {
    // - Проверка ключа сесси, и обновление данных о пользователе
    var
    oData = {'form': 'session_validation'},
    oData = $.extend(user, ajax_salt, oData)

    $.when(
      content_download(oData)

    ).done( function( resultData ){
      var oData = $.parseJSON(resultData)

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

    // + Правим ссылку на страницу пользователя в меню
    $(document).find('#profile_page a').data('id', user.id)

    // + Если приложение уже запускалось, начинаем с последней открытой страницы
    if ( arrPagesHistory.length > 0 ) {
      // + Берём последнюю запись
      var oLastPageHistory = arrPagesHistory[arrPagesHistory.length - 1]
      // + Удаляем последнюю запись
      arrPagesHistory = arrPagesHistory.slice(0, arrPagesHistory.length - 2)
      // + Загружаем последнюю страницу
      content_upload(
        oLastPageHistory['url'],
        oLastPageHistory
      )
    }
    // + Если нет, смотрим что загрузить
    else {
      if ( ! user.first_name ){
        content_upload('profiles/edit.htm?pages_history_not=true')
        $('#main_menu_show').addClass('_no_active_')
      }
      else {
        content_upload('profile.htm?pages_history_not=true', {'user': user.id})
      }
    }

    return false
  }
  // Перекидываем на авторизацию
  else {
    active_buttons()
    content_upload('authorizations/authorization.htm')
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
