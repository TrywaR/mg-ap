<?php
// Плагин для MODX Revo чтобы обрабатывать запросы со сторонних платформ
// Должно быть включено системное событие OnWebPageInit, если летит POST или GET c app разрешаем обработку
if( isset($_REQUEST['app']) && $_REQUEST['app'] == 'app' ){
  header('Access-Control-Allow-Origin: *');
  session_start();

  function authorization_check(){
    if ( !isset($_SESSION['session_key']) && !isset($_REQUEST['session_key']) ) {
      if ( $_REQUEST['session_key'] != $_SESSION['session_key'] ) {
        echo 'authorization_error';
        die();
      }
    }
  }

  if( isset($_REQUEST['form']) ) {
    switch ($_REQUEST['form']) {
      case 'authorization_form':
        if (!isset($_SESSION['session_key'])) $_SESSION['session_key'] = rand();
        echo $_SESSION['session_key'];
        break;

      default:
        break;
    }
  };

  if( isset($_REQUEST['profile']) ) {
    authorization_check();

    $oProfile = (object) [
      'id' => 1,
      'name' => 'ЕФИМОВА ВЕРОНИКА ВЛАДИМИРОВНА',
      'points' => 787,
      'progress' => 2.40
    ];
    echo json_encode($oProfile);
  };

  // version
  if( isset($_REQUEST['ver']) ) {
    // Версия клиента $_REQUEST['ver']
    // Актуальная версия $version
    $version = '1.1.0';

    if ($_REQUEST['ver'] != $version ) {
      echo $version;
    }
    die();
  }
  // version x

  // telegram bot
  if ( isset($_POST['telegram_bot']) ){
    // - Стучим в телегу
    // -- Параметры
    $sApiKey = '1010857267:AAEev0Tys63VVOL5B1Xleu2YUkjEIEEwfU4';
    $sChatId = '-355201915';
    // $sChatId = '106964625'; // Личка

    $sTxt = '*Новое сообщение из приложения* %0A';
    $sUrl = 'https://api.telegram.org/bot'.$sApiKey.'/sendMessage?chat_id='.$sChatId.'&parse_mode=Markdown&text='.$sTxt;
    // -- Записываем данные с формы
    foreach ($_POST as $key => $value)
    if ( $value != '' && $value != '0' && $value != 'app' )
    $sUrl .= '*'.$key.'*: '.$value.'%0A';
    // -- Паша, отправь плз
    $result = file_get_contents($sUrl);
    // echo 'Сообщение успешно отправленно';
    // - Стучим в телегу х
  }
  // telegram bot x
}
