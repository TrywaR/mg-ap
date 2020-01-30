function theory_init(){
  // Информация о теме
  // Параметры
  var
  sResultHtml = '',
  oData = {
    'theme': arrPageParams['id'],
  }

  $.ajax({
    url: site_url,
    data: $.extend( oData, ajax_salt ),
    method: 'POST',

  }).fail(function(data) {
    app_status( {'error': 'Ошибка соединения'} )
    return false

  }).done(function(data) {
    var jsonTheme = $.parseJSON(data)
    app_status( jsonTheme )

    // Подставляем данные о теме
    $(document)
    .find('main')
    .find('> ._title')
    .html(jsonTheme.name)

    $(document)
    .find('main')
    .find('.block_themes')
    .find('._description')
    .html(jsonTheme.description)

  })

  // Подключаем видео
  video_init()
}
