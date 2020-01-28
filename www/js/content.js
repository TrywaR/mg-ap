// template_parse
function template_parse(data, template_url){
  // Парсим шаблон
  var data = $('<div/>').html(data)
  var header = $(data).find('header').length > 0 ? $(data).find('header').html() : ''
  var main = $(data).find('main').length > 0 ? $(data).find('main').html() : ''
  var main_class = $(data).find('main').length > 0 ? $(data).find('main').attr('class') : ''
  var footer = $(data).find('footer').length > 0 ? $(data).find('footer').html() : ''

  // Передаём параметры из урла
  arrPageParams = [] // Обнуляем параметры страницы
  var arrUrl = template_url.split('?')
  if ( arrUrl[1] ) {
    // - Если есть параметры
    var arrParams = arrUrl[1].split('&')
    $.each(arrParams, function(index, param){
      arrParam = param.split('=')
      arrPageParams[arrParam[0]] = arrParam[1]
    })
  }

  // Вставляем результат
  $(document).find('body header .block_header_items').html(header)
  $(document).find('body main').html(main).attr('class', '')
  $(document).find('body main').addClass(main_class)
  $(document).find('body footer').html(footer)

  // Подсвечиваем пункт в меню
  $(document).find('#main_menu li.' + main_class).addClass('_active_').siblings().removeClass('_active_')
}
// template_parse x

// content_parse
function content_parse( oElem ){
  // - Вставляем шаблоны и данные
  if ( $( oElem ).find( '[data-items]' ).length > 0 ) {
    $( oElem )
    .find( '[data-items]' )
    .each( function( index, dataItemsElem ){
      // - Парамтеры
      var
      sResultHtml = '',
      sTemplatePath = 'templates/' + $( this ).data().template + '.htm',
      sElemName = $( this ).data().items,
      sWrapClass = '',
      oData = { 'items': sElemName }

      // - Получаем шаблон
      $.ajax({
        url: sTemplatePath,
        method: 'POST',

      }).fail(function(data) {
        app_status( {'error': 'Шаблон не найден'} )
        return false

      }).done(function(data) {
        oTemplate = $.parseHTML(data)
        sWrapClass = $( oTemplate ).attr('class')

        // -- Получаем данные
        $.ajax({
          url: site_url,
          data: $.extend( oData, ajax_salt ),
          method: 'POST',

        }).fail(function(data) {
          app_status( {'error': 'Ошибка соединения'} )
          return false

        }).done(function(data) {
          var oData = $.parseJSON(data)
          jsonResult = oData
          app_status( oData )

          // - Вводим данные в шаблон
          var sActive = '_active_' // Раскрыт только первый элемент
          $.each( jsonResult, function( index, oFindElem ){
            // -- Подставляем в шаблон
            var oTemplateTemp = oTemplate

            $.each( oFindElem, function(key, value) {
              $( oTemplateTemp )
              .find( '[data-key=' + key + ']' )
              .html( value )

              var data_attr = 'data-' + key
              $( oTemplateTemp )
              .find( '[' + data_attr + ']' )
              .attr( data_attr, value )
            })


            sResultHtml += '<div class="' + sWrapClass + ' ' + sActive + '">'
            sResultHtml += $(oTemplateTemp).html()
            sResultHtml += '</div>'

            $(document)
            .find( '[data-items="' + sElemName + '"]' )
            .html( sResultHtml )

            sActive = ''

          })
        })
      })
    })
  }
}
// content_parse x

// content_template
// function content_template( sTemplatePath ){
//   var oTemplate = {}
//
//   $.ajax({
//     url: sTemplatePath,
//     method: 'POST',
//
//   }).fail(function(data) {
//     app_status( {'error': 'Шаблон не найден'} )
//     return false
//
//   }).done(function(data) {
//     oTemplate = $.parseHTML(data)
//
//   })
//
//   return oTemplate
// }
// content_template x

// content_download
// function content_download( oData ){
//   jsonResult = ''
//
//   $.ajax({
//     url: site_url,
//     data: $.extend( oData, ajax_salt ),
//     method: 'POST',
//
//   }).fail(function(data) {
//     app_status( {'error': 'Ошибка соединения'} )
//     return false
//
//   }).done(function(data) {
//     var oData = $.parseJSON(data)
//     jsonResult = oData
//     app_status( oData )
//   })
//   console.log(jsonResult)
//   return jsonResult
// }
// content_download x

// content_upload
function content_upload(upload_url){
  $('body').addClass('_load_')

  console.log('content_upload: ' + upload_url)
  console.log(upload_url.indexOf('http'))
  if (upload_url.indexOf('http') >= 0) {
    console.log('С сайта')

    $.ajax({
      url: upload_url,
      data: $(this).serialize(),
      xhrFields: {
        withCredentials: false
      }
    }).done(function(data) {
      $(document).find('body').html(data)
      scroll_to(0,0,0)
      page_prev(upload_url)
      $('body').removeClass('_load_')
    })
  }
  else{
    console.log('С приложения')

    $.post(upload_url, function(data){
      template_parse(data, upload_url)
      scroll_to(0,0,0)
      page_prev(upload_url)
      $('body').removeClass('_load_')
    })
  }


  return false
}
// content_upload х

$(function(){
  // content_upload
  $(document).on('click', '.content_upload', function(){
    page_url = $(this).attr('href')

    if ( $(this).data('content') ) {

      if ( $(this).data('params') ) {
        content_upload(page_url, $(this).data('content'), $(this).data('params'))
      }else{
        content_upload(page_url, $(this).data('content'))
      }

    }else{
      content_upload(page_url)
    }

    $('#main_menu_show').removeClass('_active_')
    $('#main_menu').removeClass('_active_')
    $('body').removeClass('_no_active_')

    return false
  })
  // content_upload x


  // collaps_block
  $(document).on('click', '.collaps_block .collaps_btn a', function(){
    $(this)
      .parents('.collaps_block').toggleClass('_active_')

    return false
  })
  // collaps_block x
})
