function course_html(oCourse){
  // - html курса
  var
  sActive = '',
  sPassed = '',
  sCourseHtml = ''

  if (oCourse.passed == 100)
  sPassed = '_passed_'

  sCourseHtml += '<div class="course collaps_block ' + sActive + ' ' + sPassed + '">'
    sCourseHtml += '<div class="collaps_head">'
      sCourseHtml += '<div class="_icon">'
        sCourseHtml += '<img src="img/icons/courses_status.svg" alt="">'
        sCourseHtml += '<img src="img/icons/courses_status_passed.svg" alt="">'
      sCourseHtml += '</div>'
      sCourseHtml += '<div class="_title collaps_btn">'
        sCourseHtml += '<a class="content_upload" href="courses/course.htm?id=' + oCourse.id + '">'
          sCourseHtml += oCourse.sort + '. ' + oCourse.name
        sCourseHtml += '</a>'
      sCourseHtml += '</div>'
    sCourseHtml += '</div>'
  sCourseHtml += '</div>'

  return sCourseHtml
}

function courses_init(){
  // Параметры
  var
  sResultHtml = '',
  oData = {
    'courses': true,
    'progress': true
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
