// profile_init
function profile_init(){
  // $(document).find('#profile_info ._name').append( user.first_name )
  // $(document).find('#profile_info ._name').append( ' ' )
  // $(document).find('#profile_info ._name').append( user.last_name )
  // $(document).find('#profile_info ._points').append( user.points + ' ' + num2str(user.points, ['балл', 'балла', 'баллов']) )
  //
  // if ( user.image ) {
  //   var profile_img = '<img src="' + site_url + user.image.substring(1).replace('/image/', '/image_min/') + '">'
  //   $(document).find('#profile_img').removeClass('__default')
  //   $(document).find('#profile_img').append( profile_img )
  // }
}
// profile_init x

// profile_progress
function profile_progress(){
  var lenght = $(document).find('.profile_progress .step.__yes').length
  if ( lenght > 0 )
    $(document)
      .find('.profile_progress .step')
        .each(function(index, elem){
          if ( index ) {
            if ($(this).hasClass('.__yes'))
              $(this).find('._tree span:eq(1)').css({
                'animation-delay': index + 's'
              })

            $(this).find('._desc').css({
              'animation-delay': index + 's'
            })
          }
        })

  // Если на странице пользователя, собираем его инфу
  // if ( $(document).find('.main_profile').length > 0 )
  //   $(document)
  //     .find('.main_profile ._profile_info ._points span')
  //       .html( localStorage.getItem('user_points') )
}
// profile_progress x
