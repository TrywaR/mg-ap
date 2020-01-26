// profile_edit_validate
function profile_edit_validate() {
  var
  validate = true

  // input_name
  if ( $(document).find('#input_name').val().length <= 1 )
  validate = false

  // input_last_name
  if ( $(document).find('#input_last_name').val().length <= 1 )
  validate = false

  if ( $(document).find('#input_name').val() == user.first_name )
  if ( $(document).find('#input_last_name').val() == user.last_name )
  if ( $(document).find('#profile_img input').attr('val') == user.image )
  validate = false

  if ( validate )
  $(document).find('#profile_info_save').addClass('_active_ content_upload')
  else
  $(document).find('#profile_info_save').removeClass('_active_ content_upload')
}
// profile_edit_validate x

// profile_edit_init
function profile_edit_init(){
  $(document).find('#input_name').val( user.first_name )
  $(document).find('#input_name').attr( 'placeholder', user.first_name )
  $(document).find('#input_last_name').val( user.last_name )
  $(document).find('#input_last_name').attr( 'placeholder', user.last_name )
  $(document).find('#input_email').val( user.email )

  if ( user.image ) {
    var profile_img = '<img src="' + site_url + user.image.substring(1).replace('/image/', '/image_min/') + '">'
    $(document).find('#profile_img label').removeClass('__default')
    $(document).find('#profile_img label').append( profile_img )
    $(document).find('#profile_img input').attr('val', user.image)
  }

  profile_edit_validate()
}
// profile_edit_init x

$(function(){
  $(document).on('click', '#profile_img label', function(){
    $(document).find('#profile_img input').click()
  })

  $(document).on('change', '#profile_img input', function(){
    if ( $(this).val() != user.image ) {
      var
      input_file = $(this).prop('files')[0],
      arrLoad = ['Будим программистов', 'Нагружаем сервер', 'Освобождаем место', 'Ускоряем интернет'],
      form_data = new FormData,
      profile_img = $(this).parents('#profile_img')

      profile_img.addClass('_loading_')
      var oData = {}
      oData.alert = arrLoad[Math.floor(Math.random() * arrLoad.length)]
      app_status( oData )

      form_data.append('file_image', input_file)
      form_data.append('app', 'app')
      form_data.append('session_key', session_key)

      $.ajax({
        url: site_url,
        data: form_data,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        method: "POST",
      }).fail(function(data) {
        profile_img.removeClass('_loading_')
        var oData = {}
        oData.error = 'Ошибка соединения'
        app_status( oData )
        return false

      }).done(function(data) {
        $(document).find('#profile_img').removeClass('_loading_')

        // - Успех
        if ( data.indexOf('uploads') + 1 ) {
          // user.image = oData;
          // localStorage.setItem('user', JSON.stringify(user))

          $(document).find('#profile_img').find('input').attr('val', data)
          $(document).find('#profile_img').find('img').attr('src', site_url + data.substring(1).replace('/image/', '/image_min/') )

          var oData = {}
          oData.success = 'Изображение успешно загруженно'
          app_status( oData )
          oData.success = 'Не забудьте сохранить изменения'
          app_status( oData )
          profile_edit_validate()
        }
        // - Ошибка
        else {
          var oData = $.parseJSON(data)
          app_status( oData )
        }
      })
    }

    return false
  })

  $(document).on('input', '.profile_info input', function(){
    profile_edit_validate()
  })

  $(document).on('click', '#profile_info_save', function(){
    // Сохраняем
    if ( $(this).hasClass('_active_') ) {
      user.first_name = $(document).find('#input_name').val()
      user.last_name = $(document).find('#input_last_name').val()
      user.image = $(document).find('#profile_img input').attr('val')
      var form = {'form': 'form_user_edit'}

      // Info
      $.ajax({
        url: site_url,
        data: $.extend(user, ajax_salt, form),
        method: 'POST',

      }).fail(function(data) {
        var oData = {}
        oData.error = 'Ошибка соединения'
        authorization_message( oData )
        return false

      }).done(function(data) {
        var oData = $.parseJSON(data)

        // - Сообщаем результат
        app_status( oData )

        if ( ! oData.error )
        localStorage.setItem('user', JSON.stringify(user))
      })
    }
    // Не сохраняем

    return false
  })
})
