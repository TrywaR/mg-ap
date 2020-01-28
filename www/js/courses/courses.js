function courses_init(){
  // var courses = {'courses': ''}
  //
  // $.ajax({
  //   url: site_url,
  //   data: $.extend( courses, ajax_salt ),
  //   method: 'POST',
  //
  // }).fail(function(data) {
  //   var oData = {}
  //   oData.error = 'Ошибка соединения'
  //   app_status( oData )
  //   return false
  //
  // }).done(function(data) {
  //   var oData = $.parseJSON(data)
  //   content_parse(oData, 'templates/courses/item.htm', 'course collaps_block')
  // })

  // content
  // -- Парамтеры
  // var
  // courses_template = {}, // Шаблон курса
  // courses_date = {}, // Данные курса
  // courses_date_all_html = '' // Данные курса

  // -- Подтягиваем шаблон для курса
  // $.post('templates/courses/item.htm', function(data){
  //   courses_template = $.parseHTML(data)
  //
  //   // --- Получаем данные
  //   var courses = {'courses': ''}
  //   $.ajax({
  //     url: site_url,
  //     data: $.extend( courses, ajax_salt ),
  //     method: 'POST',
  //
  //   }).fail(function(data) {
  //     var oData = {}
  //     oData.error = 'Ошибка соединения'
  //     app_status( oData )
  //     return false
  //
  //   }).done(function(data) {
  //     var oData = $.parseJSON(data)
  //
  //     // ---- Обрабатываем результат
  //     if ( ! oData.error ) {
  //       courses_date = oData
  //
  //       // ----- Вставляем данные в шаблон
  //       var active = '_active_' // Раскрыт только первый элемент
  //       $.each(courses_date, function(index, item){
  //         var course = courses_template
  //
  //         // ------ Заполняем данные
  //         $.each(item, function(key, value){
  //           $(course)
  //           .find( '[data-key=' + key + ']' )
  //           .html( value )
  //         })
  //
  //         // ------ Выводим данные
  //         $(document)
  //         .find( '#courses' )
  //         .append( '<div class="course collaps_block ' + active + '">' + $(course).html() + '</div>' )
  //
  //         // ------ Раскрыт только первый элемент
  //         active = ''
  //       })
  //     }
  //     else
  //     // Ошбика
  //     app_status( oData )
  //   })
  // })
  // content x

  // - Парамтеры
  // oData - Данные курсы
  // sTemplatePath - Путь к шаблону
  // sWrapClass - Классы | Класс обёртки результатов
  // var
  // oTemplate = {} // Шаблон курса
  // sResultHtml = '' // Возвращаемый результат
  //
  // // -- Подтягиваем шаблон для курса
  // sResultHtml = $.post(sTemplatePath, function(data){
  //   oTemplate = $.parseHTML(data)
  //
  //   // --- Обрабатываем данные
  //   if ( ! oData.error ) {
  //     // ---- Вставляем данные в шаблон
  //     var sActive = '_active_' // Раскрыт только первый элемент
  //     $.each(oData, function(index, elem){
  //       var oTemplateTemp = oTemplate
  //
  //       // ----- Заполняем данные
  //       $.each(elem, function(key, value){
  //         $(oTemplateTemp)
  //         .find( '[data-key=' + key + ']' )
  //         .html( value )
  //       })
  //
  //       // ----- Выводим данные
  //       // console.log(oTemplateTemp)
  //       sResultHtml += '<div class="' + sWrapClass + ' ' + sActive + '">'
  //       sResultHtml += $(oTemplateTemp).html()
  //       sResultHtml += '</div>'
  //       // console.log(sResultHtml)
  //
  //       // ----- Раскрыт только первый элемент
  //       sActive = ''
  //     })
  //   }
  //   else
  //   // Ошбика
  //   app_status( oData )
  // })
  // return sResultHtml
}
