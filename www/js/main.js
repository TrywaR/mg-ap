// params
page = 0 // Текущая страница
page_url = '' // Адрес текущей страницы
// site_url = 'https://alliance.paultik.ru' // Адрес сайта
site_url = 'http://m97731yi.beget.tech/' // Адрес сайта
session_key = '' // Ключ авторизации
ajax_salt = {
  'app': 'app'
}  // Необходимые параметры для ajax
// params x

// CSRF
// function CSRF(){
//   $.post(site_url, function(data){
//     var data = $('<div/>').html(data)
//     console.log(data)
//   })
// }
// CSRF()
// CSRF x

// LocalSWtorage
if ( localStorage.getItem('page') ) page = localStorage.getItem('page')
if ( localStorage.getItem('session_key') ) {
  session_key = localStorage.getItem('session_key')
  ajax_salt['session_key'] = session_key
}
// LocalStorage x

// page_navigator
function page_navigator(page){
  console.log('page_navigator page: '+page)
  $(document).find('#pages').css({
    left: (page * -100) + 'vw'
  })
  localStorage.setItem('page', page)
}
// page_navigator(page)

// content_upload
function content_parse(data, fix_page){
  current_page = fix_page ? fix_page : page
  console.log('content_parse')
  console.log('current_page: '+current_page)
  // Если вложенный ресурс
  if ( current_page > 1 ) {

    // Определяем ссыль родителя
    arrPage_url = page_url.split('/')
    arrPage_url[arrPage_url.length - 1] = 'index.htm'
    parent_page_url = arrPage_url.join('/')

    // Подтягиваем контент родителя
    $.post(parent_page_url, function(parent_data){
      content_parse(parent_data, 1)
    })

    // Возвращяем как было и далее тянем внутряк
    // page = 2
  }

  var data = $('<div/>').html(data)
  var header = $(data).find('header').length > 0 ? $(data).find('header').html() : ''
  var main = $(data).find('main').length > 0 ? $(data).find('main').html() : ''
  var main_class = $(data).find('main').length > 0 ? $(data).find('main').attr('class') : ''
  var footer = $(data).find('footer').length > 0 ? $(data).find('footer').html() : ''

  $(document).find('#pages .page._' + current_page + ' header .block_header_items').html(header)
  $(document).find('#pages .page._' + current_page + ' main').html(main)
  $(document).find('#pages .page._' + current_page + ' main').addClass(main_class)
  $(document).find('#pages .page._' + current_page + ' footer').html(footer)

  $(document).find('#main_menu li.' + main_class).addClass('_active_').siblings().removeClass('_active_')
}
// content_upload x

// template_parse
function template_parse(data, template){
  arrTemplate = template.split('/')
  sTemplatePath = 'templates/' + template + '.htm'

  $.post(sTemplatePath, function(template_htm){
    var template_htm = $('<div/>').html(template_htm)
    $.each(data, function(key, value){
      $(template_htm).find('main [data-key='+key+']').prepend(value)
    })
    content_parse(template_htm)
  })
}
// template_parse x

// profile_progress
function profile_progress(){
  if ( $(document).find('.profile_progress').length > 0 ) {
    // progress

    $(document).find('.profile_progress .step._yes').each(function(index, elem){
      height = 100
      if ( $(this).find('._tree').data().progress )
        height = $(this).find('._tree').data().progress

      $(this).find('._tree span:eq(1)').css({
        'height': height + '%',
        'transition-delay': index + 's'
      })
    })
  }
}
// profile_progress x

// authorization
function authorization(){
  // authorization_form
}
// authorization x

$(function(){
  // page_navigator
  $(document).on('click', '#main_menu_back', function(){
    page--
    page_navigator(page)
  })
  // page_navigator x

  // upload_content
  $(document).on('click', '.content_upload', function(){
    page_url = $(this).attr('href')
    page = $(this).data().page ? $(this).data().page : 1
    console.log('upload_content : '+page)

    if (page_url.indexOf('http') >= 0) {
      console.log('С сайта')

      $.ajax({
        url: page_url,
        data: $(this).serialize(),
        xhrFields: {
          withCredentials: false
        }
      }).done(function(data) {
        $(document).find('#pages .page._' + page + '').html(data)
        page_navigator(page)
      })

    }
    else{
      console.log('С приложения')
      $.post(page_url, function(data){
        content_parse(data)
        console.log(page)
        page_navigator(page)
      })
    }

    $('#main_menu_show').removeClass('_active_')
    $('#main_menu').removeClass('_active_')
    $('body').removeClass('_no_active_')

    return false
  })
  // upload_content x

  // main_menu
  $(document).on('click', '#main_menu_show', function(){
    $(this).toggleClass('_active_')
    $('#main_menu').toggleClass('_active_')
    $('body').toggleClass('_no_active_')
  })
  $(document).on('click', '#main_menu li a', function(){
    $(this).parents('li').addClass('_active_').siblings().removeClass('_active_')
    $('#main_menu').removeClass('_active_')
    $('body').removeClass('_no_active_')
  })
  // main_menu x

  // profile
  $(document).on('click', '#profile_exit', function() {
    page_navigator(0)
  })
  // profile x

  // authorization_form
  $(document).find('#authorization_form').on('submit', function(){
    // - Получаем ключ сессии
    $.ajax({
      url: site_url + 'app.php',
      data: $(this).serialize(),
      xhrFields: {
        withCredentials: false
      }
    }).fail(function(data) {
      $('#authorization_form_status').html('<p style="color:#ff7f7f;">' + data.status + '<br/>' + data.statusText + '</p>')
    }).done(function(data) {
      $('#authorization_form_status').html('')
      session_key = data
      localStorage.setItem('session_key', session_key)
      ajax_salt['profile'] = 1

      // -- Получаем инфу о профиле
      $.ajax({
        url: site_url + 'app.php',
        data: ajax_salt,
        xhrFields: {
          withCredentials: false
        }
      }).fail(function(data) {
        $('#authorization_form_status').html('<p style="color:#ff7f7f;">' + data.status + '<br/>' + data.statusText + '</p>')

      }).done(function(data) {
        $('#authorization_form_status').html('')
        oProfile = jQuery.parseJSON(data)

        template_parse(oProfile, 'profile/index')
        page_navigator(1)
      })
    })

    return false
  })
  // authorization_form х
})
