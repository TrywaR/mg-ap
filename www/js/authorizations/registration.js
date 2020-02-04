// registration_message
function registration_message( oData ){
  // - Чистим уведомления
  $(document).find('.registration_form .form_status').removeClass('_error')
  $(document).find('.registration_form .form_status').html('')

  // - Ошибка входа
  if ( oData.error )
  $(document).find('.registration_form .form_status').addClass('_error').html( oData.error )

  // - Уведомление
  if ( oData.alert )
  $(document).find('.registration_form .form_status').html( oData.alert )

  // - Успешно вошли, 300 чашек чаю, этому господину
  if ( oData.success )
  $(document).find('.registration_form .form_status').html( oData.success )
}
// registration_message x


$(function(){
  // Чистка ввода почты
  $(document).on ('input', '#registration_form input[name="email"]', function(){
    var text = $(this).val().replace(/\s/g, '')
    $(this).val( text.toLowerCase() )
  })
  // Чистка ввода почты х

  $(document).on('submit', '#registration_form', function(){
    console.log($(this).serializeArray())
    $.ajax({
      url: site_url,
      data: $.extend( $(this).serializeArray(), ajax_salt ),
      method: 'POST'

    })
    .fail(function(data){
      app_status({'error': 'Ошибка соединения'})

    })
    .done(function( data ){
      if ( data ) {
        ajaxResult = $.parseJSON( data )
        if ( ! ajaxResult.error ) {
          app_status(ajaxResult)
          authorization()
        }
        else {
          registration_message( ajaxResult )
        }
      }
    })

    return false
  })
})
