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

    return false
  })
  // form_support x
}
