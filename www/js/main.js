// profile_progress
function profile_progress(){
  if ( $(document).find('.profile_progress').length > 0 ) {

    $(document).find('.profile_progress .step._yes').each(function(index, elem){
      height = 100
      if ( $(this).find('._tree').data().progress )
        height = $(this).find('._tree').data().progress

      $(this).find('._tree span:eq(1)').css({
        'background': 'url(filesystem:file:///img/profile_progress/tree_yes_'+index+'.svg) no-repeat',
        'height': height + '%',
        'transition-delay': index + 's'
      })
    })
  }
}
// profile_progress x

$(function(){
  // params
  page = 0 // Текущая страница
  // params x

  // LocalStorage
  if ( localStorage.getItem('page') )
    page = localStorage.getItem('page')
  // LocalStorage x

  // page_navigator
  function page_navigator(page){
    $(document).find('#pages').css({
      left: (page * -100) + 'vw'
    })
    localStorage.setItem('page', page)
  }
  // page_navigator(page)

  $(document).on('click', '#main_menu_back', function(){
    page--
    page_navigator(page)
  })
  // page_navigator x

  // upload_content
  $(document).on('click', '.content_upload', function(){
    page = $(this).data().page ? $(this).data().page : 1

    if ($(this).attr('href').indexOf('http') >= 0) {
      console.log('С сайта')

      $.ajax({
        url: $(this).attr('href'),
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

      $.post($(this).attr('href'), function(data){
        var data = $('<div/>').html(data)

        header = $(data).find('header').length > 0 ? $(data).find('header').html() : ''
        main = $(data).find('main').length > 0 ? $(data).find('main').html() : ''
        main_class = $(data).find('main').length > 0 ? $(data).find('main').attr('class') : ''
        footer = $(data).find('footer').length > 0 ? $(data).find('footer').html() : ''

        $(document).find('#pages .page._' + page + ' header .block_header_items').html(header)
        $(document).find('#pages .page._' + page + ' main').html(main)
        $(document).find('#pages .page._' + page + ' main').addClass(main_class)
        $(document).find('#pages .page._' + page + ' footer').html(footer)

        $(document).find('#main_menu li.' + main_class).addClass('_active_').siblings().removeClass('_active_')
        console.log(main_class)

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

  // login_form
  $(document).find('.page_login form').on('submit', function(){
    $(document).find('#main_menu li.page_profile a').click()
    // page_navigator(1)
    return false
  })
  // login_form x

  // profile_progress
  profile_progress()
  // profile_progress x

  // profile
  $(document).on('click', '#profile_exit', function() {
    page_navigator(0)
  })
  // profile x
})
