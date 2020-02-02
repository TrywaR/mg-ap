function menu_add(oData){
  var
  htmlNewMenuItem =
  '<li class="page_' + oData.class + '">' +
    '<a class="content_upload" href="' + oData.href + '">' +
      oData.title +
    '</a>' +
  '</li>'

  $(document)
  .find( '#main_menu nav ul #profile_exit' )
  .before( htmlNewMenuItem )
}

// content_template
function content_template( sUrl ){
  // sUrl - Открываемая страница
  // sTemplatePath - Путь к шаблону

  sTemplatePath = 'templates/' + sUrl

  // Загружаем шаблон
  return $.post(sTemplatePath)
  .fail(function(data){
    app_status({'error': 'Шаблон не найден'})

  })
  .done(function(data){
    if ( data ) {
      var oTemplate = $('<div/>').html(data)

      // Вставляем результат
      $(document)
      .find('body header .block_header_items')
      .html( $(oTemplate).find('header').html() )

      $(document)
      .find( 'main' )
      .html( $(oTemplate).find('main').html() )
      .attr( 'class', $(oTemplate).find('main').attr('class') )

      $(document)
      .find('footer').html( $(oTemplate).find('footer').html() )
    }

  })
}
// content_template x

// content_download
function content_download( oData ){
  // oData - Какие данные запросить

  // Получаем данные
  return $.ajax({
    url: site_url,
    data: $.extend( oData, ajax_salt ),
    method: 'POST'

  })
  .fail(function(data){
    app_status({'error': 'Ошибка соединения'})

  })
  .done(function( data ){
    if ( data ) {
      ajaxResult = $.parseJSON( data )
      app_status(ajaxResult)
    }

  })
}
// content_download x

// content_upload
function content_upload( sUrl, oData ){
  // sUrl - Куда вставить
  // oData - Что загрузить
  console.log(oData)
  arrPageParams = [] // Обнуляем параметры страницы
  // Если есть параметры в урле, сохраняем их
  if (sUrl.indexOf('?') + 1) {
    var arrUrl = sUrl.split('?')
    if ( arrUrl[1] ) {
      var arrParams = arrUrl[1].split('&')
      $.each(arrParams, function(index, param){
        var arrParam = param.split('=')
        arrPageParams[arrParam[0]] = arrParam[1]
      })
    }

    oData = $.extend( oData, arrPageParams )
  }
  console.log(oData)


  $('body').addClass('_load_')
  $('#main_menu, #main_menu_show').removeClass('_active_')
  $('body').removeClass('_no_active_')

  // Получаем шаблон и данные
  $.when(
    content_template(sUrl),
    content_download(oData))

  .done( function( resultTemplate, resultData ){
    // - Вставляем данные в шаблон, если они есть
    if ( resultData[0] ) {
      jsonData = $.parseJSON( resultData[0] )
      $.each( jsonData, function(key, value){
        $( document )
        .find( '[data-key=' + key + ']' )
        .html( value )

        var data_attr = 'data-' + key
        $( document )
        .find( '[' + data_attr + ']' )
        .attr( data_attr, value )
      })

      scroll_to(0,0,0)
      page_prev(sUrl)
    }

    $('body').removeClass('_load_')
  })

  return false
}
// content_upload x

$(function(){
  // content_upload
  $(document).on('click', '.content_upload', function(){
    return content_upload( $(this).attr('href'), $(this).data() )
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
