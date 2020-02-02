// Страницы
// - Загружаем и вставляем содержимое страницы
function pages_init(){
  $.when( content_download({'page': arrPageParams['id']}) )
  .then( function(resultData){
    if ( resultData ) {
      jsonPages = $.parseJSON( resultData )
      $.each( jsonPages, function(index, arrPage){
        $.each( arrPage, function(key, value){
          $( document )
          .find( '[data-key=' + key + ']' )
          .html( value )

          var data_attr = 'data-' + key
          $( document )
          .find( '[' + data_attr + ']' )
          .attr( data_attr, value )
        })
      })
    }
  })
}

$(function(){
  // - Выводим в меню
  $.when( content_download({'pages': 'when', 'menu_show': 1}) )
  .then( function(resultData){
    if ( resultData ) {
      jsonPages = $.parseJSON( resultData )
      $.each( jsonPages, function(index, elem){
        var oData = {
          'title': elem.title,
          'href': 'pages/index.htm?id=' + elem.id,
          'class': elem.id
        }
        menu_add(oData)
      })
    }
  })
})
