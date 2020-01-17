// profile_edit_validate
function profile_edit_validate() {
  var
  validate = true

  // input_name
  if ( $(document).find('#input_name').val().length > 1 ) {
  }
  else
  validate = false

  // input_last_name
  if ( $(document).find('#input_last_name').val().length > 1 ) {
  }
  else
  validate = false

  if ( validate )
  $(document).find('#profile_info_save').addClass('_active_')
  else
  $(document).find('#profile_info_save').removeClass('_active_')
}
// profile_edit_validate x

// profile_edit_init
function profile_edit_init(){
  $(document).find('#input_name').val( user.first_name )
  $(document).find('#input_name').attr( 'placeholder', user.first_name )
  $(document).find('#input_last_name').val( user.last_name )
  $(document).find('#input_last_name').attr( 'placeholder', user.last_name )
  $(document).find('#input_email').val( user.email )

  if ( user.img_path ) {
    var profile_img = '<img src="' + user.img_path + '">'
    $(document).find('#profile_img label').append( profile_img )
    $(document).find('#profile_img input').val( user.img_path )
  }

  profile_edit_validate()
}
// profile_edit_init x

$(function(){
  $(document).on('change', '#profile_img input', function(){
    $(this).next('._name').html(this.files[0].name)
  })

  $(document).on('input', '.profile_info input', function(){
    profile_edit_validate()
  })

  $(document).on('click', '#profile_info_save', function(){
    // Сохраняем
    if ( $(this).hasClass('_active_') ) {
      user.first_name = $(document).find('#input_name').val()
      user.last_name = $(document).find('#input_last_name').val()

      if ( $(document).find('#profile_img input').val() )
      user.img_path = $(document).find('#profile_img input').val()

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
    // Не сохраняем
    else
    return false
  })
})
