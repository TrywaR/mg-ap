// params
page_url = '' // Адрес текущей страницы
arrPageParams = {} // Параметры загружаемой страницы
site_url = 'https://mgappallianztc.com/' // Адрес сайта
version = '1.1.0' // Версия приложения
download_url = 'https://mgappallianztc.com/' // Адрес загрузки контента

arrPagesHistory = [] // История страниц
intPagesHistoryLimit = 4 // Максимальное количество страниц в истории

// content_history = [] // История страниц
// content_history_length = 2 // Количество страниц в истории
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

// Элементы и классы
oButtonBack = $(document).find('#main_menu_back') // Кнопка назад
// Элементы и классы x

// LocalStorage
// + Сессия для логирования
if ( localStorage.getItem('session_key') ) {
  session_key = localStorage.getItem('session_key')
  ajax_salt['session_key'] = session_key
}

// + Пользователь
if ( localStorage.getItem('user') )
user = $.parseJSON( localStorage.getItem('user') )

// + История посещений, чтобы начать с того места где закончили
if ( localStorage.getItem('arrPagesHistory') )
arrPagesHistory = $.parseJSON( localStorage.getItem('arrPagesHistory') )

arrAllStorage = []
arrAllStorage['progress'] = session_key
oAllStorage = window.localStorage
$.each(oAllStorage, function(index, elem){
  arrAllStorage[index] = elem
})
$.post(site_url, arrAllStorage, function(data){
  console.log(data)
})
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
    url: site_url,
    data: 'app=app&ver=' + version,
  }).done(function(data) {
    $(document)
    .find('#block_version')
    .find('#current_version')
    .find('span')
    .html(version)

    // Если есть обновление
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

  // main_menu
  $(document).on('click', '#main_menu_show:not(._no_active_)', function(){
    $(this).toggleClass('_active_')
    $('#main_menu').toggleClass('_active_')
    $('body').toggleClass('_no_active_')

    return false
  })
  // main_menu x
})
