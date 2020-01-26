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

    $.ajax({
      url: site_url,
      data: $(this).serializeArray(),
      method: 'POST',
    }).fail(function(data) {
      var oData = {}
      oData.error = 'Ошибка соединения'
      registration_message( oData )
      return false

    }).done(function(data) {
      var oData = $.parseJSON(data)

      // - Успешно вошли, 300 чашек чаю, этому господину
      if ( ! oData.error ) {
        app_status( oData )
        content_upload('templates/authorizations/authorization.htm')
      }
      // - Выводим ошибки
      else {
        registration_message( oData )
      }
    })

    return false
  })
})
