function theme_html(oTheme){
  // - html темы
  var
  sPassed = '',
  sThemeHtml = ''

  sThemeHtml += '<div class="item theme">'
    sThemeHtml += '<div class="_status"></div>'
    sThemeHtml += '<div class="_text">'
      sThemeHtml += '<a class="content_upload" href="templates/courses/course.htm?id=' + oTheme.course_id + '">'
        sThemeHtml += oTheme.name
      sThemeHtml += '</a>'
    sThemeHtml += '</div>'
  sThemeHtml += '</div>'

  return sThemeHtml
}

function course_html(oCourse, index){
  // - html курса
  var
  sActive = '',
  sPassed = '',
  sCourseHtml = ''

  if ( index == 0 ) sActive = '_active_'

  sCourseHtml += '<div class="course collaps_block ' + sActive + '">'
    sCourseHtml += '<div class="collaps_head">'
      sCourseHtml += '<div class="_icon">'
        sCourseHtml += '<img src="img/icons/courses_status.svg" alt="">'
        sCourseHtml += '<img src="img/icons/courses_status_passed.svg" alt="">'
      sCourseHtml += '</div>'
      sCourseHtml += '<div class="_title collaps_btn">'
        sCourseHtml += '<a href="">'
          sCourseHtml += oCourse.sort + '. ' + oCourse.name + '<span>+</span>'
        sCourseHtml += '</a>'
      sCourseHtml += '</div>'
    sCourseHtml += '</div>'

    sCourseHtml += '<div class="collaps_content">'
    $.each(oCourse.themes, function(index, oTheme){
      sCourseHtml += theme_html(oTheme)
    })
    sCourseHtml += '</div>'
  sCourseHtml += '</div>'

  return sCourseHtml
}

function courses_init(){
  // Параметры
  var
  sResultHtml = '',
  oData = {
    'courses': true ,
    'themes': true
  }

  // Загружаем курсы
  $.ajax({
    url: site_url,
    data: $.extend( oData, ajax_salt ),
    method: 'POST',

  }).fail(function(data) {
    app_status( {'error': 'Ошибка соединения'} )
    return false

  }).done(function(data) {
    var jsonCourses = $.parseJSON(data)
    app_status( jsonCourses )

    // - Обрабатываем данные
    $.each( jsonCourses, function( index, oCourse ){
      sResultHtml += course_html(oCourse, index)
    })

    // - Выводим данные
    $(document)
    .find('#courses')
    .html(sResultHtml)
  })
}
