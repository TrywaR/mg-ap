// authorization
function authorization(){
  // Если пользователь авторизирован
  if ( session_key ) {
    active_buttons()
    content_upload('templates/profile.htm')
  }
  else {
    active_buttons()
    content_upload('templates/authorizations/authorization.htm')
  }
}
// authorization x

// authorization_message
function authorization_message(type,txt){
  type = type ? type : 0
  $(document).find('.authorization_forms .form_status').removeClass('_error')
  if ( type == 0 ) $(document).find('.authorization_forms .form_status').html('')

  // message
  if ( type == 0 ) $(document).find('.authorization_forms .form_status').html(txt)
  // error
  if ( type == 1 ) $(document).find('.authorization_forms .form_status').addClass('_error').html(txt)
}
// authorization_message x

$(function(){
  authorization()

  // authorization_form
  $(document).on('submit', '#authorization_form', function(){
    // - Получаем ключ сессии
    // demo
    login = true
    if ( $(this).find('[name=email]').val() != 'demo' ) login = false
    if ( $(this).find('[name=password]').val() != 'demo' ) login = false
    if ( login ) {
      localStorage.setItem('session_key', session_key = 'demo')
      authorization()
    }else{
      authorization_message(1,'Email или пароль введён не верно!')
    }

    // $.ajax({
    //   url: site_url + 'app.php',
    //   data: $(this).serialize(),
    //   xhrFields: {
    //     withCredentials: false
    //   }
    // }).fail(function(data) {
    //   $('#authorization_form_status').html('<p style="color:#ff7f7f;">' + data.status + '<br/>' + data.statusText + '</p>')
    // }).done(function(data) {
    //   $('#authorization_form_status').html('')
    //   session_key = data
    //   localStorage.setItem('session_key', session_key)
    //   ajax_salt['profile'] = 1
    //
    //   // -- Получаем инфу о профиле
    //   $.ajax({
    //     url: site_url + 'app.php',
    //     data: ajax_salt,
    //     xhrFields: {
    //       withCredentials: false
    //     }
    //   }).fail(function(data) {
    //     $('#authorization_form_status').html('<p style="color:#ff7f7f;">' + data.status + '<br/>' + data.statusText + '</p>')
    //
    //   }).done(function(data) {
    //     $('#authorization_form_status').html('')
    //     oProfile = jQuery.parseJSON(data)
    //
    //     template_parse(oProfile, 'profile/index')
    //     page_navigator(1)
    //   })
    // })

    return false
  })
  // authorization_form х

  // registration_form
  $(document).on('submit', '#registration_form', function(data){
    // if ( $(this).find('[name=code]').val() ) {
    //   if ($(this).find('[name=code]').val() == 'demo' ) {
    //     content_upload('templates/authorizations/')
    //   }
    // }
    return false
  })
  // registration_form x

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
