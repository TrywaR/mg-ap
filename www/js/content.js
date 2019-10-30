$(function(){
  // collaps_block
  $(document).on('click', '.collaps_block .collaps_btn', function(){
    $(this)
    .toggleClass('_active_')
    .parents('.collaps_block').toggleClass('_active_')
  })
  // collaps_block x
})
