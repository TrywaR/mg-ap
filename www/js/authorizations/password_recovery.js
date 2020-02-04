// password-new_form
$(function(){
  // Чистка ввода логина
  $(document).on ('input', '#password_recovery_form input[name="email"]', function(){
    var text = $(this).val().replace(/\s/g, '')
    $(this).val( text.toLowerCase() )
  })
  // Чистка ввода логина х

  $(document).on('submit', '#password_recovery_form', function(){
    $.ajax({
      url: site_url,
      data: $.extend( {'form': 'password_recovery_form', 'email': $(this).find('[name="email"]').val()}, ajax_salt ),
      method: 'POST'

    })
    .fail(function(data){
      app_status({'error': 'Ошибка соединения'})

    })
    .done(function( data ){
      if ( data ) {
        ajaxResult = $.parseJSON( data )
        app_status(ajaxResult)
        authorization()
      }
    })

    return false
  })
})
// password-new_form x
