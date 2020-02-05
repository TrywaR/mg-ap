function schedule_time_html(oCourses, intTime){
  // - html курса
  var
  sActive = '',
  sPassed = '',
  sTimeHtml = ''

  sTimeHtml += '<div class="_text">'
    sTimeHtml += '<a class="content_upload" href="templates/courses/single.htm">'
      sTimeHtml += oCourses.name + '<br/> <small>Срок прохождения до '
      sTimeHtml += oCourses.stop_day + ' '
      sTimeHtml += oCourses.stop_month + '</small>'
    sTimeHtml += '</a>'
  sTimeHtml += '</div>'

  return sTimeHtml
}

function schedule_days_html(oCourses, intDayNumber){
  // - html курса
  var
  sActive = '',
  sPassed = '',
  sDayHtml = ''

  sDayHtml += '<div class="day">'
    sDayHtml += '<div class="_date">' + intDayNumber + '</div>'
    $.each( oCourses, function( intTime, oCourses ){
      sDayHtml += schedule_time_html(oCourses, intTime)
    })
  sDayHtml += '</div>'

  return sDayHtml
}

function schedule_months_html(oCourses, sMonthName, sActive){
  // - html курса
  var
  sActive = sActive ? sActive : '',
  sPassed = '',
  sMonthHtml = ''

  sMonthHtml += '<div class="month collaps_block ' + sActive + '">'
    sMonthHtml += '<div class="_title collaps_btn">'
      sMonthHtml += '<a href="">'
        sMonthHtml += sMonthName + '<span>+</span>'
      sMonthHtml += '</a>'
    sMonthHtml += '</div>'
    sMonthHtml += '<div class="collaps_content">'
      $.each( oCourses, function( intDayNumber, oCourses ){
        sMonthHtml += schedule_days_html(oCourses, intDayNumber)
      })
    sMonthHtml += '</div>'
  sMonthHtml += '</div>'

  return sMonthHtml
}

function schedule_init(){
  $.when(
    content_download({'schedule': 'schedule'})

  ).done( function( resultData ){
    if ( resultData ) {
      var oCourses = $.parseJSON(resultData)
      app_status( oCourses )
      var
      sResultHtml = '',
      sActive = '_active_'

      // - Обрабатываем данные
      $.each( oCourses, function( sMonthName, oCourses ){
        sResultHtml += schedule_months_html(oCourses, sMonthName, sActive)
        sActive = ''
      })

      // - Выводим данные
      $(document)
      .find('#months')
      .html(sResultHtml)
    }
  })
}
