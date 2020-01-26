// params
page_url = '' // Адрес текущей страницы
site_url = 'https://mgappallianztc.com/' // Адрес сайта
version = '1.1.0' // Версия приложения
download_url = 'https://mgappallianztc.com/' // Адрес загрузки контента
pages_history = [] // История страниц
pages_history_length = 2 // Количество страниц в истории
session_key = '' // Ключ авторизации
user = {} // Обьект с информацией о пользователе
ajax_salt = {
  'app': 'app'
}  // Необходимые параметры для ajax

// user = {} // Пользователь
// if ( ! localStorage.getItem('user') ) {
//   localStorage.setItem('user', user)
// }
// params x

// LocalStorage
// Сессия для логирования
if ( localStorage.getItem('session_key') ) {
  session_key = localStorage.getItem('session_key')
  ajax_salt['session_key'] = session_key
}

if ( localStorage.getItem('user') )
user = $.parseJSON(localStorage.getItem('user'))
// LocalStorage x

// num2str
function num2str(n, text_forms) {
  var
    n1 = n % 10,
    n = Math.abs(n) % 100

  if (n > 10 && n < 20)
    return text_forms[2]
  if (n1 > 1 && n1 < 5)
    return text_forms[1]
  if (n1 == 1)
    return text_forms[0]

  return text_forms[2]
}
// num2str(1, ['минута', 'минуты', 'минут'])
// num2str

// active_buttons
function active_buttons(show){
  if ( show != false )
    show = true

  if ( localStorage.getItem('session_key') && show ) {
    $('body > header').show()
    $('body > footer').show()
  }
  else{
    $('body > header').hide()
    $('body > footer').hide()
  }
}
// active_buttons

// scroll_to
function scroll_to(elem, fix_size, scroll_time){
  scroll_val = elem ? elem.offset().top : 0
  scroll_val = fix_size ? fix_size : scroll_val
  scroll_time = scroll_time != null ? scroll_time : 500

  $(document).find('main').animate({
    scrollTop: scroll_val
  }, scroll_time)
}
// scroll_to x

// page_prev
function page_prev(href, data){
  // href - Шаблон предыдущей страницы
  // data - Данные предыдущей страницы

  if ( href ) {
    // Проверяем урвоень вложенности
    arrInner = href.split('/')

    // Если вложенная то добавляем в историю
    if ( arrInner.length > 2 ) {
      // Если больше 1 в истории, ввыодим кнопку назад
      if ( pages_history.length > 1 ) {
        // Пишем историю
        pages_history.push( href )

        // Если в истории больше чем нужно, обрезаем историю
        if ( pages_history.length >= pages_history_length ) {
          // Обрезаем массив
          pages_history = pages_history.slice(pages_history_length * - 1)
          // Выводим кнопку
          $(document).find('#main_menu_back').addClass('_active_')
        }
      }
      // Если нет
      else {
        // Если 1, то добавляем ссылочку и скрываем кнопку
        if ( pages_history.length == 1 ) {
          // Добавляем в массив
          pages_history.push( href )
          // Скрываем кнопку
          $(document).find('#main_menu_back').addClass('_active_')
        }
      }
    }
    // Если нет удаляеи из истории
    else {
      // Чистим историю
      pages_history = []
      // Скрываем кнопку назад
      $(document).find('#main_menu_back').removeClass('_active_')
    }

    // Если массив пустой но ссылка есть, добавляем ссыль в историю
    if ( pages_history.length == 0 && href.length > 0 ) {
      pages_history.push( href )
      // Скрываем кнопку
      $(document).find('#main_menu_back').removeClass('_active_')
    }
  }
  else{
    pages_history = []
    // Скрываем кнопку
    $(document).find('#main_menu_back').removeClass('_active_')
  }
}
// page_prev x

// template_parse
function template_parse(data, template_url){
  var data = $('<div/>').html(data)
  var header = $(data).find('header').length > 0 ? $(data).find('header').html() : ''
  var main = $(data).find('main').length > 0 ? $(data).find('main').html() : ''
  var main_class = $(data).find('main').length > 0 ? $(data).find('main').attr('class') : ''
  var footer = $(data).find('footer').length > 0 ? $(data).find('footer').html() : ''

  $(document).find('body header .block_header_items').html(header)
  $(document).find('body main').html(main).attr('class', '')
  $(document).find('body main').addClass(main_class)
  $(document).find('body footer').html(footer)

  content_parse(data, template_url)

  // // parse
  // $.each(data, function(key, value){
  //   $(template_htm).find('main [data-key='+key+']').prepend(value)
  // })

  $(document).find('#main_menu li.' + main_class).addClass('_active_').siblings().removeClass('_active_')
}
// template_parse x

// content_parse
function content_parse(data, template){
  var
  arrTemplate = template.split('/'),
  sTemplatesPath = arrTemplate[arrTemplate.length - 1],
  sTemplatePath = sTemplatesPath + '/item.htm',
  sTemplateName = sTemplatesPath.substr(0, sTemplatesPath.length - 4),
  sDataPath = '',
  oJsonData = '',
  templateHtml = $('<div/>').html($.post(sTemplatePath)),
  contentHtml = ''

  for (var i = 0; i < arrTemplate.length; i++)
  if ( i === arrTemplate.length - 1 ) sDataPath += sTemplateName + '.json'
  else sDataPath += arrTemplate[i] + '/'

  $.post(sDataPath, function(sData){
    oJsonData = $.parseJSON(sData)
  })

  $.each(oJsonData.items, function(index, item){
    $.each(item, function(key, value){
      if ( $(templateHtml).find('[data-key='+key+']').length > 0 )
      $(templateHtml).find('[data-key='+key+']').prepend(value)
    })
    contentHtml += templateHtml
  })

  return contentHtml
}
// content_parse x

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

// app_status
// - Уведомления пользователю в приложухе
function app_status( oData ){
  var message = ''

  // - Ошибка входа
  if ( oData.error )
  message = '<div class="error">' + oData.error + '</div>'

  // - Уведомление
  if ( oData.alert )
  message = '<div class="success">' + oData.alert + '</div>'

  // - Успех
  if ( oData.success )
  message = '<div class="success">' + oData.success + '</div>'

  $(document)
  .find('#app_status')
  .append(message)
  .addClass('_active_')

  setTimeout(function () {
    $(document)
    .find('#app_status')
    .removeClass('_active_')
    .find('*')
    .remove()
  }, 5000);
}
// app_status x

$(function(){
  // Проверка версии
  $.ajax({
    url: download_url  + 'app/app.php',
    data: 'app=app&ver=' + version,
    xhrFields: {
      withCredentials: false
    }
  }).done(function(data) {
    $(document)
    .find('#block_version')
    .find('#current_version')
    .find('span')
    .html(version)

    // Если есть обновление
    console.log(data)
    if ( data ) {
      $(document)
      .find('#block_version')
      .find('#actual_version')
      .addClass('_active_')
      .find('span')
      .html(data)
      $(document)

      .find('#main_menu_show')
      .addClass('_status_')

      // $(document)
      // .find('#block_version')
      // .find('#actual_version')
      // .find('a')
      // .attr( 'href', download_url + 'app/app.php?update=' + version )
    }
  })
  // Проверка версии x

  // fix_size
  $(document)
    .find('main')
      .height(
        $(document).height() - $(document).find('header').height()
      ).css({
        'padding-top': $(document).find('header').height() + 'px'
      })
  // fix_size x

  // page_prev
  $(document).on('click', '#main_menu_back', function(){
    if (pages_history.length) {
      content_upload(pages_history[pages_history.length - pages_history_length])
      page_prev()
      $(document).find('#main_menu_back').removeClass('_active_')
    }
    else {
      // console.log('ne ok 2')
    }
  })
  // page_prev x

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

  // main_menu
  $(document).on('click', '#main_menu_show', function(){
    $(this).toggleClass('_active_')
    $('#main_menu').toggleClass('_active_')
    $('body').toggleClass('_no_active_')

    return false
  })
  $(document).on('click', '#main_menu li a', function(){
    $(this).parents('li').addClass('_active_').siblings().removeClass('_active_')
    $('#main_menu_show').removeClass('_active_')
    $('#main_menu').removeClass('_active_')
    $('body').removeClass('_no_active_')

    return false
  })
  // main_menu x
})
