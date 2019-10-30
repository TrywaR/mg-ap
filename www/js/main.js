// params
page = 0 // Текущая страница
page_url = '' // Адрес текущей страницы
// site_url = 'https://alliance.paultik.ru/account/login/' // Адрес сайта
site_url = 'http://m97731yi.beget.tech/' // Адрес сайта
// test@trywar.ru
// SZ0wSgL2
session_key = '' // Ключ авторизации
ajax_salt = {
  'app': 'app'
}  // Необходимые параметры для ajax
// params x

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
// function getCookie(name) {
//   var matches = document.cookie.match(new RegExp(
//     "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//   ));
//   return matches ? decodeURIComponent(matches[1]) : undefined;
// }

// CSRF
// function send_reply(){
//   echo json_encode(array('reply'=>'here is my reply'));
//   exit;
// }
// $.ajax({
//   url:'https://alliance.paultik.ru/account/login/',
//   data:{'func':'send_reply'},
//   type:'GET',
//   dateType:'json'
// }).success(function(data){
//   data=$.parseJSON(data);
//   alert(data.reply);
// }).error(function(jqxhr,error,status){
//   alert('Error sending reply');
// });

// function CSRF(){
//   $.ajax({
//     type: 'GET',
//     url: site_url,
//     data: 'test',
//     success: function(data, textStatus, request) {
//       console.log(textStatus)
//       console.log(request)
//       // alert(request.getResponseHeader('Set-Cookie'))
//     },
//   })
//   // $.get(site_url, function(data, textStatus, request){
//   //   alert(request.getResponseHeader('Set-Cookie'));
//   //   // console.log(data.status)
//   // //   var data = $('<div/>').html(data)
//   // //   var test = $(data).find('body').length > 0 ? $(data).find('body').html() : ''
//   // //   // console.log(data)
//   // //   // console.log(test)
//   // //   // console.log('stest')
//   // //   // stest = getCookie('csrftoken')
//   // //   // console.log(stest)
//   // //   // alert( document.cookie );
//   // //    alert(data.reply);
//   // })
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
  if ( page > 1 ){
    $(document).find('#pages').css({
      left: ( ( page - 1 ) * -100) + 'vw'
    })
  }else{
    $(document).find('#pages').css({
      left: '0vw'
    })
  }
  localStorage.setItem('page', page)
}
// page_navigator(page)

// content_parse
function content_parse(data, fix_page){
  current_page = fix_page ? fix_page : page
  console.log('content_parse')
  console.log('current_page: '+current_page)
  // Если вложенный ресурс
  if ( current_page > 2 ) {

    // Определяем ссыль родителя
    arrPage_url = page_url.split('/')
    arrPage_url[arrPage_url.length - 1] = 'index.htm'
    parent_page_url = arrPage_url.join('/')

    // Подтягиваем контент родителя
    $.post(parent_page_url, function(parent_data){
      content_parse(parent_data, 2)
    })

    // Возвращяем как было и далее тянем внутряк
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
// content_parse x

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

// content_upload
function content_upload(upload_url, upload_page){
  $('body').addClass('_load_')

  if (upload_url.indexOf('http') >= 0) {
    console.log('С сайта')

    $.ajax({
      url: upload_url,
      data: $(this).serialize(),
      xhrFields: {
        withCredentials: false
      }
    }).done(function(data) {
      $(document).find('#pages .page._' + upload_page + '').html(data)
      page_navigator(upload_page)
    })

  }
  else{
    console.log('С приложения')

    $.post(upload_url, function(data){
      content_parse(data, upload_page)
      page_navigator(upload_page)
    })
  }

  $('body').removeClass('_load_')

  return false
}
// content_upload х

$(function(){
  // page_navigator
  $(document).on('click', '#main_menu_back', function(){
    page--
    page_navigator(page)
  })
  // page_navigator x

  // content_upload
  $(document).on('click', '.content_upload', function(){
    page_url = $(this).attr('href')
    page = $(this).data().page ? $(this).data().page : 2

    content_upload(page_url,page)

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
  })
  $(document).on('click', '#main_menu li a', function(){
    $(this).parents('li').addClass('_active_').siblings().removeClass('_active_')
    $('#main_menu').removeClass('_active_')
    $('body').removeClass('_no_active_')
  })
  // main_menu x
})
