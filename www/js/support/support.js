function support_init(){
  // form_support
  $(document).find('#form_support').on('submit', function(){
    // - Параметры
    var
    data = new Object(), // Отправляемые данные
    result_text = '', // Текст о результате
    validate = 0 // Если есть ошибки

    data.token = session_key
    $.ajax({
      url: site_url + 'api/support/',
      data: data,
      method: 'POST',
      // headers: {
      //   'X-CSRF-TOKEN': csrftoken
      // }
    }).fail(function(data) {
      console.log(data)
      app_status(data)

      return false

    }).done(function(data) {
      console.log(data)
      app_status(data,1)
      return false
    })

    // telegram bot
    // - Отправляем месседж
    // - Параметры
    var
    bot_data = {}
    bot_data.user_name = user.name
    bot_data.user_lastName = user.lastName
    bot_data.user_email = user.email
    bot_data.app = 'app'
    bot_data.telegram_bot = '0'
    bot_data.messages = $(this).find('[name="text"]').val()

    $.ajax({
      url: '/app/app.php',
      data: bot_data,
      method: 'POST'
    }).fail(function(data) {
      console.log(data)
      app_status(data)
      
      return false

    }).done(function(data) {
      console.log(data)
      app_status(data,1)
      return false
    })

    // telegram bot x

    return false
  })
  // form_support x
}
