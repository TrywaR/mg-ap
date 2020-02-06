function menu_add(oData){
  var
  htmlNewMenuItem =
  '<li class="page_' + oData.class + '">' +
    '<a class="content_upload" data-pages_history_clear="true" href="' + oData.href + '">' +
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
      .html( '' )
      .html( $(oTemplate).find('header').html() )

      $(document)
      .find( 'main' )
      .html( '' )
      .html( $(oTemplate).find('main').html() )
      .attr( 'class', $(oTemplate).find('main').attr('class') )

      $(document)
      .html( '' )
      .find('footer').html( $(oTemplate).find('footer').html() )
    }

  })
}
// content_template x

// content_download
function content_download( oData ){
  // oData - Какие данные запросить
  if (
    session_key
    && oData
  ) {
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
  else {
    return false
  }
}
// content_download x

// content_upload
function content_upload( sUrl, oData ){
  // sUrl - Куда вставить
  // oData - Что загрузить

  arrPageParams = [] // Обнуляем параметры страницы

  // Добавляем текущий адрес, в настройки страницы
  arrPageParams['url'] = sUrl

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

  // Добавляем преедаваемые параметры в параметры страницы
  if ( oData )
  arrPageParams = $.extend( oData, arrPageParams )

  // Сохраняем страницу в историю
  content_history()

  $('body').addClass('_load_')
  $('#main_menu, #main_menu_show').removeClass('_active_')
  $('body').removeClass('_no_active_')

  // Получаем шаблон и данные
  $.when(
    content_template(sUrl),
    content_download(oData)
  ).done( function( resultTemplate, resultData ){
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
    }

    $('body').removeClass('_load_')
  })

  return false
}
// content_upload x

// content_history
function content_history(){
  // arrPagesHistory - Массив со страницами на которых был пользователь
  // arrPageHistory - массив с данными о новой странице
  // intPagesHistoryLimit - Максимальное количество страниц в истории
  // oButtonBack - Кнопка назад

  // + Скрываем кнопку назад, до выяснения обстоятельств
  oButtonBack.removeClass('_active_')

  // + Если сохранять историю не нужно
  if ( arrPageParams['pages_history_not'] ) {
    arrPageParams['pages_history_not'] = false
    return false
  }

  // Добавление нового адреса и параметров в историю
  if ( arrPageParams['url'] ) {
    // + Если страница открыта с кнопок меню, обнуляем историю
    if ( arrPageParams['pages_history_clear'] ) {
      // arrPageParams['pages_history_clear'] = false
      arrPagesHistory = []
    }

    // + Если больше лимита страниц, удаляем старую запись
    if ( arrPagesHistory.length >= intPagesHistoryLimit ) {
      var
      start = arrPagesHistory.length - parseInt(intPagesHistoryLimit) + 1,
      stop = arrPagesHistory.length

      arrPagesHistory = arrPagesHistory.slice(start, stop)
    }


    // + Добавляем новую страницу в историю
    arrPageHistory = arrPageParams
    arrPagesHistory.push( arrPageHistory )

    // + Сохраняем историю, чтобы продолжить с того же места при запуске
    localStorage.setItem('arrPagesHistory', JSON.stringify(arrPagesHistory) )

  }

  // Показываем кнопку назад
  if ( arrPagesHistory.length > 1 )
  oButtonBack.addClass('_active_')
}
// content_history x

$(function(){
  // content_upload
  $(document).on('click', '.content_upload', function(){
    return content_upload( $(this).attr('href'), $(this).data() )
  })
  // content_upload x

  // content_history
  oButtonBack.on('click', function(){
    // + Берём пред последнюю запись истории
    var oPrevPageHistory = arrPagesHistory[ arrPagesHistory.length - 2 ]
    // + Удаляем последнюю и последнюю запись истории
    arrPagesHistory = arrPagesHistory.slice(0, arrPagesHistory.length - 2)
    // + Загружаем пред последнюю запись истории
    content_upload(
      oPrevPageHistory['url'],
      oPrevPageHistory
    )
  })
  // content_history x

  // collaps_block
  $(document).on('click', '.collaps_block .collaps_btn a', function(){
    $(this)
      .parents('.collaps_block').toggleClass('_active_')

    return false
  })
  // collaps_block x
})
