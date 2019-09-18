$(function(){
  // params
  page = 0
  // params x

  // main_menu
  $(document).on('click', '#main_menu_show, #main_menu li', function(){
    $(this).toggleClass('_active_')
    $('#main_menu').toggleClass('_active_')
    $('body').toggleClass('_no_active_')
  })
  // main_menu x

  // upload_content
  $(document).on('click', '.content_upload', function(){
    console.log('start')

    if ($(this).attr('href').indexOf('http') >= 0) {
      console.log('С сайта')

      $.ajax({
        url: $(this).attr('href'),
        data: $(this).serialize(),
        xhrFields: {
          withCredentials: false
        }
      }).done(function(data) {
        $(document).find('#pages .level_2').html(data)
        page = 2
        page_navigator()
      })

    }
    else{
      console.log('С приложения')
      $.post($(this).attr('href'), function(data){
        $(document).find('#pages .level_2').html(data)
        page = 2
        page_navigator()
      })
    }

    console.log('stop')
    // $('#main_menu_show').click()

    $('#main_menu_show').removeClass('_active_')
    $('#main_menu').removeClass('_active_')
    $('body').removeClass('_no_active_')

    return false
  })
  // upload_content x

  // page_navigator

  $(document).on('click', '#main_menu_back', function(){
    page = page - 1
    page_navigator()
  })
  
  function page_navigator(){
    $(document).find('#pages').css({
      left: (page * -100) + 'vw'
    })
  }
  // page_navigator x

  // login_form
  $(document).find('.page_login form').on('submit', function(){
    page = 1
    page_navigator()
    return false
  })
  // login_form x
})
