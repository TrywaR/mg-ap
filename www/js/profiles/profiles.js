// profile_progress
function profile_progress(){
  var lenght = $(document).find('.profile_progress .step._yes').length
  if ( lenght > 0 )
    $(document)
      .find('.profile_progress .step._yes')
        .each(function(index, elem){
          var height = 100
          if ( $(this).data().progress )
            height = $(this).data().progress

          $(this).find('._tree span:eq(1)').css({
            'height': height + '%',
            'transition-delay': index / lenght + 's'
        })
    })

  // Если на странице пользователя, собираем его инфу
  if ( $(document).find('.main_profile').length > 0 )
    $(document)
      .find('.main_profile ._profile_info ._points span')
        .html( localStorage.getItem('user_points') )
}
// profile_progress x
