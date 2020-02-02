function theme_html(oTheme){
  // - html темы
  var
  sPassed = '',
  sThemeHtml = ''

  sThemeHtml += '<div class="item theme">'
    sThemeHtml += '<div class="_status"></div>'
    sThemeHtml += '<div class="_text">'
      sThemeHtml += oTheme.name
    sThemeHtml += '</div>'
    // Если есть видео, добавляем ссылки
    if ( oTheme.video_length ) {
      sThemeHtml += '<div class="_buttons">'
      sThemeHtml += '<a class="content_upload button theory_href" href="courses/theory.htm?id=' + oTheme.id + '">Пройти теорию</a>'
      // sThemeHtml += '<a class="content_upload button practice_href" href="templates/courses/course/practice.htm">Пройти практику</a>'
      sThemeHtml += '</div>'
    }
  sThemeHtml += '</div>'

  return sThemeHtml
}

function course_init(){
  if ( arrPageParams['id'] ) {
    // Параметры
    var
    sResultHtml = '',
    oData = {
      'course': arrPageParams['id'],
      'themes': true,
      'video_length': true,
    }

    // Загружаем курс
    $.ajax({
      url: site_url,
      data: $.extend( oData, ajax_salt ),
      method: 'POST',

    }).fail(function(data) {
      app_status( {'error': 'Ошибка соединения'} )
      return false

    }).done(function(data) {
      var jsonCourse = $.parseJSON(data)
      app_status( jsonCourse )

      // Подставляем данные о курсе
      $(document)
      .find('main')
      .find('> ._title')
      .html(jsonCourse.sort + '. ' + jsonCourse.name)

      $(document)
      .find('main')
      .find('.block_course')
      .find('._description')
      .html(jsonCourse.description)

      // Втсавляем темы
      sResultHtml = ''
      if ( jsonCourse['themes'].length > 0 ) {
        $.each( jsonCourse['themes'], function( index, oTheme ){
          sResultHtml += theme_html(oTheme)
        })
        // - Выводим темы курса
        $(document)
        .find('main')
        .find('.block_themes')
        .addClass('_show_')

        $(document)
        .find('#themes')
        .html(sResultHtml)
      }
    })
  }
}
