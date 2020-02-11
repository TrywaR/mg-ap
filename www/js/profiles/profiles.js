function profile_course_icon_html( intNumber, initPassedPercent ){
  var sIconSvg = ''

  switch(intNumber) {
  case 0:
    sIconSvg = '<svg viewBox="-60 0 330 330" fill="none" xmlns="http://www.w3.org/2000/svg"'
    if ( initPassedPercent )
    sIconSvg += ' style="overflow: visible; filter: drop-shadow(2px -2px 0 #57B0DF) drop-shadow(1.5px -1.5px 0 #57B0DF) drop-shadow(.5px -.5px 1px #57B0DF);"'
    sIconSvg += '>'
    sIconSvg += '<path d="M211.069 70.839V73.2205L213.217 72.1919C217.927 69.9363 223.178 68.7368 228.78 68.7368C248.945 68.7368 265.311 85.041 265.311 105.199C265.311 125.361 248.941 141.731 228.78 141.731C223.19 141.731 217.932 140.467 213.202 138.269L211.069 137.277V139.629V210.22C211.069 210.796 210.545 211.352 209.868 211.352H144.819C144.102 211.352 143.496 210.61 143.749 209.789C145.116 205.825 145.834 201.579 145.834 197.196C145.834 174.08 125.957 155.576 102.277 157.879L102.272 157.88C84.4099 159.68 69.7251 173.713 67.2014 191.508C66.2677 197.902 66.911 204.164 68.8549 209.79C69.1081 210.61 68.5024 211.352 67.7853 211.352H2.73644C2.11011 211.352 1.604 210.846 1.604 210.22V141.361V71.8782V14.588V3.01916C1.604 2.39281 2.1101 1.88672 2.73644 1.88672H209.868C210.545 1.88672 211.069 2.44286 211.069 3.01916V70.839Z" '
    if ( initPassedPercent ){
      if ( initPassedPercent < 100 ) {
        sIconSvg += ' fill="url(#grad_' + intNumber + ')" />'
        sIconSvg += '<linearGradient id="grad_' + intNumber + '" x1="0%" y1="0%" x2="20%" y2="100%">'
          sIconSvg += '<stop offset="' + initPassedPercent + '%" style="stop-color:#A2D9F7;stop-opacity:1" />'
          sIconSvg += '<stop offset="100%" style="stop-color:#FFFFFF;stop-opacity:1" />'
        sIconSvg += '</linearGradient>'
      }
      else {
        sIconSvg += ' fill="#A2D9F7"'
      }
    }
    else {
      sIconSvg += 'stroke="white" stroke-width="3" />'
    }
    sIconSvg += '</svg>'
    break;
  case 1:
    sIconSvg = '<svg viewBox="-60 0 330 330" fill="none" xmlns="http://www.w3.org/2000/svg"'
    if ( initPassedPercent )
    sIconSvg += ' style="overflow: visible; filter: drop-shadow(2px -2px 0 #DE3551) drop-shadow(1.5px -1.5px 0 #DE3551) drop-shadow(.5px -.5px 1px #DE3551);"'
    sIconSvg += '>'
    sIconSvg += '<path d="M73.4993 213.011L74.4494 210.896H72.1311H3.27209C2.64574 210.896 2.13965 210.39 2.13965 209.764V144.715C2.13965 143.956 2.85424 143.404 3.63497 143.646C9.32336 145.587 15.5134 146.233 21.9096 145.299C39.7091 142.846 53.8144 128.089 55.5434 110.222C57.846 86.6133 39.3439 66.6663 16.2264 66.6663C11.8469 66.6663 7.59933 67.3826 3.69887 68.7518C2.87984 69.0026 2.13965 68.3976 2.13965 67.6813V2.63244C2.13965 2.0061 2.64574 1.5 3.27209 1.5H210.403C211.081 1.5 211.605 2.05614 211.605 2.63244V72.1149V74.5271L213.768 73.4602C218.631 71.0621 224.086 69.6663 229.939 69.6663C250.101 69.6663 266.471 86.0362 266.471 106.198C266.471 126.36 250.101 142.73 229.939 142.73C224.086 142.73 218.631 141.334 213.768 138.936L211.605 137.869V140.281V209.764C211.605 210.34 211.081 210.896 210.403 210.896H141.544H139.226L140.176 213.011C142.239 217.603 143.369 222.59 143.369 227.914C143.369 248.072 127.003 264.376 106.838 264.376C86.6723 264.376 70.3059 248.072 70.3059 227.914C70.3059 222.59 71.4362 217.603 73.4993 213.011Z" '
    if ( initPassedPercent ){
      if ( initPassedPercent < 100 ) {
        sIconSvg += ' fill="url(#grad_' + intNumber + ')" />'
        sIconSvg += '<linearGradient id="grad_' + intNumber + '" x1="0%" y1="0%" x2="20%" y2="100%">'
          sIconSvg += '<stop offset="' + initPassedPercent + '%" style="stop-color:#EC6278;stop-opacity:1" />'
          sIconSvg += '<stop offset="100%" style="stop-color:#FFFFFF;stop-opacity:1" />'
        sIconSvg += '</linearGradient>'
      }
      else {
        sIconSvg += ' fill="#EC6278"'
      }
    }
    else {
      sIconSvg += 'stroke="white" stroke-width="3" />'
    }
    sIconSvg += '</svg>'
    break;
  case 2:
    sIconSvg = '<svg viewBox="0 0 330 330" fill="none" xmlns="http://www.w3.org/2000/svg"'
    if ( initPassedPercent )
    sIconSvg += ' style="overflow: visible; filter: drop-shadow(2px -2px 0 #D66040) drop-shadow(1.5px -1.5px 0 #D66040) drop-shadow(.5px -.5px 1px #D66040);"'
    sIconSvg += '>'
    sIconSvg += '<path d="M55.6035 194.161V191.809L53.4713 192.8C48.7481 194.996 43.5602 196.194 38.0318 196.194C17.87 196.194 1.5 179.824 1.5 159.662C1.5 139.5 17.87 123.13 38.0318 123.13C43.5479 123.13 48.7365 124.392 53.4713 126.593L55.6035 127.584V125.232V55.8193C55.6035 55.3315 55.971 54.9639 56.4588 54.9639H125.318H127.584L126.699 52.8781C124.834 48.4822 123.77 43.6238 123.77 38.5699C123.77 18.4081 140.14 2.03809 160.302 2.03809C180.463 2.03809 196.833 18.4081 196.833 38.5699C196.833 43.6238 195.769 48.4822 193.904 52.8781L193.019 54.9639H195.285H264.214C264.661 54.9639 265.069 55.3599 265.069 55.8193V263.574C265.069 263.992 264.632 264.429 264.214 264.429H198.403C198.158 264.429 197.922 264.308 197.752 264.059C197.582 263.811 197.526 263.5 197.609 263.217C199.045 259.186 199.833 254.8 199.833 250.273C199.833 226.366 178.589 207.43 153.976 211.244L153.973 211.244C137.398 213.839 124.082 227.086 121.344 243.655L121.343 243.66C120.153 251.014 120.941 258.119 123.395 264.429H123.334H123.269H123.204H123.138H123.071H123.004H122.935H122.866H122.796H122.725H122.653H122.58H122.507H122.433H122.358H122.283H122.206H122.129H122.051H121.972H121.893H121.813H121.732H121.65H121.567H121.484H121.4H121.315H121.23H121.144H121.057H120.969H120.881H120.792H120.702H120.611H120.52H120.428H120.335H120.242H120.148H120.053H119.958H119.862H119.765H119.667H119.569H119.47H119.371H119.271H119.17H119.068H118.966H118.863H118.76H118.656H118.551H118.446H118.34H118.233H118.126H118.018H117.909H117.8H117.69H117.58H117.469H117.357H117.245H117.132H117.019H116.904H116.79H116.675H116.559H116.442H116.326H116.208H116.09H115.971H115.852H115.732H115.612H115.491H115.369H115.247H115.125H115.002H114.878H114.754H114.629H114.504H114.378H114.252H114.125H113.998H113.87H113.741H113.612H113.483H113.353H113.223H113.092H112.961H112.829H112.696H112.564H112.43H112.297H112.162H112.028H111.892H111.757H111.621H111.484H111.347H111.21H111.072H110.934H110.795H110.656H110.516H110.376H110.235H110.095H109.953H109.812H109.669H109.527H109.384H109.241H109.097H108.953H108.808H108.663H108.518H108.372H108.226H108.08H107.933H107.786H107.638H107.49H107.342H107.193H107.044H106.895H106.745H106.595H106.445H106.294H106.143H105.992H105.84H105.688H105.535H105.383H105.23H105.077H104.923H104.769H104.615H104.46H104.306H104.151H103.995H103.84H103.684H103.527H103.371H103.214H103.057H102.9H102.742H102.585H102.426H102.268H102.11H101.951H101.792H101.632H101.473H101.313H101.153H100.993H100.833H100.672H100.511H100.35H100.189H100.027H99.8657H99.7038H99.5417H99.3795H99.217H99.0544H98.8915H98.7286H98.5654H98.402H98.2385H98.0748H97.911H97.747H97.5828H97.4185H97.2541H97.0894H96.9247H96.7598H96.5948H96.4296H96.2643H96.0989H95.9334H95.7677H95.6019H95.436H95.27H95.1039H94.9377H94.7714H94.605H94.4385H94.2719H94.1052H93.9385H93.7716H93.6047H93.4377H93.2707H93.1035H92.9363H92.7691H92.6018H92.4344H92.267H92.0995H91.932H91.7645H91.5969H91.4292H91.2616H91.0939H90.9262H90.7585H90.5907H90.4229H90.2552H90.0874H89.9196H89.7518H89.584H89.4162H89.2484H89.0807H88.9129H88.7452H88.5775H88.4098H88.2421H88.0745H87.9069H87.7393H87.5718H87.4044H87.2369H87.0696H86.9022H86.735H86.5678H86.4006H86.2336H86.0666H85.8996H85.7328H85.566H85.3993H85.2327H85.0662H84.8998H84.7335H84.5673H84.4011H84.2351H84.0692H83.9034H83.7378H83.5722H83.4068H83.2415H83.0763H82.9112H82.7463H82.5816H82.4169H82.2525H82.0881H81.924H81.7599H81.5961H81.4324H81.2688H81.1055H80.9423H80.7793H80.6164H80.4538H80.2913H80.129H79.9669H79.805H79.6433H79.4818H79.3205H79.1594H78.9985H78.8379H78.6774H78.5172H78.3572H78.1974H78.0379H77.8786H77.7195H77.5607H77.4021H77.2438H77.0857H76.9279H76.7703H76.613H76.4559H76.2991H76.1426H75.9864H75.8304H75.6748H75.5194H75.3643H75.2094H75.0549H74.9007H74.7467H74.5931H74.4398H74.2868H74.1341H73.9817H73.8296H73.6779H73.5265H73.3754H73.2247H73.0742H72.9242H72.7744H72.625H72.476H72.3273H72.179H72.031H71.8834H71.7362H71.5893H71.4428H71.2967H71.1509H71.0055H70.8606H70.716H70.5718H70.428H70.2845H70.1415H69.9989H69.8567H69.715H69.5736H69.4326H69.2921H69.152H69.0123H68.8731H68.7343H68.5959H68.458H68.3205H68.1834H68.0468H67.9107H67.775H67.6398H67.5051H67.3708H67.2369H67.1036H66.9707H66.8383H66.7064H66.575H66.4441H66.3137H66.1837H66.0543H65.9254H65.7969H65.669H65.5416H65.4147H65.2884H65.1625H65.0372H64.9124H64.7882H64.6644H64.5413H64.4186H64.2965H64.175H64.054H63.9336H63.8137H63.6944H63.5756H63.4574H63.3398H63.2228H63.1063H62.9905H62.8752H62.7605H62.6464H62.5329H62.42H62.3076H62.1959H62.0848H61.9743H61.8645H61.7552H61.6466H61.5386H61.4312H61.3244H61.2183H61.1129H61.008H60.9038H60.8003H60.6974H60.5951H60.4936H60.3926H60.2924H60.1928H60.0939H59.9956H59.8981H59.8012H59.705H59.6094H59.5146H59.4205H59.327H59.2343H59.1423H59.0509H58.9603H58.8704H58.7812H58.6928H58.605H58.518H58.4317H58.3461H58.2613H58.1772H58.0939H58.0113H57.9295H57.8484H57.768H57.6884H57.6096H57.5316H57.4543H57.3778H57.3021H57.2271H57.1529H57.0795H57.0069H56.9351H56.8641H56.7939H56.7245H56.6559H56.5881H56.5211H56.4549H56.3896C56.0282 264.429 55.6035 264.051 55.6035 263.574V194.161Z" '
    if ( initPassedPercent ){
      if ( initPassedPercent < 100 ) {
        sIconSvg += ' fill="url(#grad_' + intNumber + ')" />'
        sIconSvg += '<linearGradient id="grad_' + intNumber + '" x1="0%" y1="0%" x2="20%" y2="100%">'
          sIconSvg += '<stop offset="' + initPassedPercent + '%" style="stop-color:#F08365;stop-opacity:1" />'
          sIconSvg += '<stop offset="100%" style="stop-color:#FFFFFF;stop-opacity:1" />'
        sIconSvg += '</linearGradient>'
      }
      else {
        sIconSvg += ' fill="#F08365"'
      }
    }
    else {
      sIconSvg += 'stroke="white" stroke-width="3" />'
    }
    sIconSvg += '</svg>'
    break;
  case 3:
    sIconSvg = '<svg viewBox="-60 -166 330 580" fill="none" xmlns="http://www.w3.org/2000/svg"'
    if ( initPassedPercent )
    sIconSvg += ' style="overflow: visible; filter: drop-shadow(2px -2px 0 #37A2B0) drop-shadow(1.5px -1.5px 0 #37A2B0) drop-shadow(.5px -.5px 1px #37A2B0);"'
    sIconSvg += '>'
    sIconSvg += '<path d="M73.2349 213.516L74.1198 211.43H71.854H2.99499C2.53562 211.43 2.13965 211.022 2.13965 210.575V2.82018C2.13965 2.30308 2.5362 1.96484 2.92571 1.96484H2.99107H3.05724H3.12423H3.19203H3.26064H3.33005H3.40026H3.47127H3.54308H3.61568H3.68907H3.76324H3.8382H3.91393H3.99044H4.06772H4.14577H4.22459H4.30417H4.3845H4.4656H4.54744H4.63004H4.71338H4.79746H4.88228H4.96784H5.05413H5.14115H5.2289H5.31737H5.40656H5.49647H5.58708H5.67841H5.77045H5.86319H5.95663H6.05076H6.14559H6.24111H6.33732H6.4342H6.53177H6.63002H6.72894H6.82853H6.92879H7.02971H7.13129H7.23353H7.33643H7.43997H7.54417H7.649H7.75448H7.8606H7.96734H8.07473H8.18273H8.29137H8.40062H8.51049H8.62098H8.73208H8.84379H8.9561H9.06901H9.18252H9.29663H9.41133H9.52661H9.64249H9.75894H9.87597H9.99358H10.1118H10.2305H10.3498H10.4697H10.5901H10.7111H10.8327H10.9548H11.0774H11.2006H11.3243H11.4486H11.5733H11.6987H11.8245H11.9509H12.0778H12.2052H12.3331H12.4615H12.5904H12.7199H12.8498H12.9803H13.1112H13.2426H13.3745H13.5069H13.6397H13.7731H13.9069H14.0412H14.176H14.3112H14.4469H14.583H14.7196H14.8566H14.9941H15.132H15.2704H15.4092H15.5485H15.6882H15.8283H15.9688H16.1097H16.2511H16.3929H16.5351H16.6777H16.8207H16.9641H17.1079H17.2521H17.3967H17.5417H17.6871H17.8328H17.9789H18.1254H18.2723H18.4196H18.5672H18.7151H18.8635H19.0122H19.1612H19.3106H19.4603H19.6104H19.7608H19.9116H20.0626H20.2141H20.3658H20.5179H20.6702H20.8229H20.9759H21.1293H21.2829H21.4368H21.5911H21.7456H21.9004H22.0555H22.2109H22.3666H22.5225H22.6788H22.8353H22.9921H23.1491H23.3064H23.464H23.6218H23.7799H23.9383H24.0968H24.2557H24.4147H24.574H24.7336H24.8934H25.0534H25.2136H25.374H25.5347H25.6956H25.8566H26.0179H26.1794H26.3411H26.503H26.6651H26.8274H26.9899H27.1526H27.3154H27.4784H27.6416H27.805H27.9685H28.1322H28.2961H28.4601H28.6243H28.7886H28.9531H29.1177H29.2825H29.4474H29.6124H29.7776H29.9429H30.1083H30.2739H30.4396H30.6054H30.7713H30.9373H31.1034H31.2696H31.4359H31.6024H31.7689H31.9355H32.1022H32.2689H32.4358H32.6027H32.7697H32.9368H33.1039H33.2711H33.4384H33.6057H33.7731H33.9405H34.108H34.2755H34.4431H34.6106H34.7783H34.9459H35.1136H35.2813H35.4491H35.6168H35.7846H35.9524H36.1202H36.2879H36.4557H36.6235H36.7913H36.9591H37.1268H37.2946H37.4623H37.63H37.7977H37.9654H38.133H38.3006H38.4681H38.6357H38.8031H38.9705H39.1379H39.3052H39.4725H39.6397H39.8068H39.9739H40.1409H40.3078H40.4746H40.6414H40.8081H40.9747H41.1412H41.3076H41.4739H41.6401H41.8062H41.9722H42.1381H42.3039H42.4695H42.6351H42.8005H42.9658H43.1309H43.2959H43.4608H43.6256H43.7902H43.9547H44.119H44.2831H44.4471H44.611H44.7747H44.9382H45.1015H45.2647H45.4277H45.5905H45.7532H45.9156H46.0779H46.2399H46.4018H46.5635H46.725H46.8862H47.0473H47.2082H47.3688H47.5292H47.6894H47.8494H48.0091H48.1686H48.3279H48.4869H48.6457H48.8043H48.9626H49.1207H49.2785H49.436H49.5933H49.7503H49.907H50.0635H50.2197H50.3757H50.5313H50.6867H50.8417H50.9965H51.151H51.3052H51.4591H51.6127H51.766H51.919H52.0716H52.224H52.376H52.5277H52.6791H52.8301H52.9808H53.1312H53.2812H53.4309H53.5803H53.7293H53.8779H54.0262H54.1741H54.3217H54.4689H54.6157H54.7622H54.9083H55.054H55.1993H55.3442H55.4888H55.6329H55.7767H55.92H56.063H56.2055H56.3477H56.4894H56.6307H56.7716H56.9121H57.0522H57.1918H57.331H57.4698H57.6081H57.746H57.8834H58.0204H58.1569H58.293H58.4286H58.5638H58.6985H58.8327H58.9665H59.0998H59.2326H59.3649H59.4967H59.6281H59.759H59.8893H60.0192H60.1486H60.2775H60.4058H60.5337H60.661H60.7879H60.9142H61.0399H61.1652H61.2899H61.4141H61.5378H61.6609H61.7835H61.9055H62.027H62.1479H62.2683H62.3881H62.5073H62.626H62.7441H62.8616H62.9786H63.095H63.2108H63.326H63.4406H63.5547H63.6681H63.781H63.8932H64.0048H64.1159H64.2263H64.3361H64.4453H64.5538H64.6617H64.7691H64.8757H64.9818H65.0872H65.1919H65.296H65.3995H65.5023H65.6045H65.706H65.8068H65.907H66.0065H66.1054H66.2035H66.301H66.3978H66.4939H66.5894H66.6841H66.7782H66.8715H66.9642H67.0561H67.1474H67.2379H67.3277H67.4168H67.5052H67.5929H67.6798H67.766H67.8515H67.9362H68.0202H68.1035H68.186H68.2677H68.3487H68.429H68.5085H68.5872H68.6651H68.7423H68.8187H68.8944H68.9693H69.0433H69.1166H69.1891H69.2608H69.3318H69.4019H69.4712H69.5397H69.6074H69.6743H69.7404H69.8056H69.8701H69.9042C67.471 8.26289 66.6933 15.4079 67.8794 22.7339L67.8802 22.7387C70.6174 39.3061 83.9336 52.5571 100.514 55.0811C125.126 58.894 146.369 39.9582 146.369 16.0516C146.369 11.5186 145.579 7.20293 144.146 3.11098C143.965 2.50665 144.422 1.96484 144.939 1.96484H210.68C211.168 1.96484 211.536 2.33239 211.536 2.82018V210.575C211.536 211.022 211.14 211.43 210.68 211.43H141.821H139.556L140.441 213.516C142.306 217.913 143.369 222.702 143.369 227.824C143.369 247.982 127.003 264.287 106.838 264.287C86.6723 264.287 70.3059 247.982 70.3059 227.824C70.3059 222.702 71.3694 217.913 73.2349 213.516Z" '
    if ( initPassedPercent ){
      if ( initPassedPercent < 100 ) {
        sIconSvg += ' fill="url(#grad_' + intNumber + ')" />'
        sIconSvg += '<linearGradient id="grad_' + intNumber + '" x1="0%" y1="0%" x2="20%" y2="100%">'
          sIconSvg += '<stop offset="' + initPassedPercent + '%" style="stop-color:#66C3D0;stop-opacity:1" />'
          sIconSvg += '<stop offset="100%" style="stop-color:#FFFFFF;stop-opacity:1" />'
        sIconSvg += '</linearGradient>'
      }
      else {
        sIconSvg += ' fill="#66C3D0"'
      }
    }
    else {
      sIconSvg += 'stroke="white" stroke-width="3" />'
    }
    sIconSvg += '</svg>'
    break;
  case 4:
    sIconSvg = '<svg viewBox="-50 0 330 330" fill="none" xmlns="http://www.w3.org/2000/svg"'
    if ( initPassedPercent )
    sIconSvg += ' style="overflow: visible; filter: drop-shadow(2px -2px 0 #084A95) drop-shadow(1.5px -1.5px 0 #084A95) drop-shadow(.5px -.5px 1px #084A95);"'
    sIconSvg += '>'
    sIconSvg += '<path d="M139.435 53.2384L138.464 55.362H140.799H210.835C210.9 55.362 210.948 55.3867 210.975 55.4124C210.988 55.4243 210.993 55.4338 210.995 55.4378C210.996 55.4404 210.998 55.4446 210.998 55.4554V122.929C210.998 122.968 210.99 122.989 210.982 123.004C210.972 123.022 210.954 123.044 210.924 123.065C210.865 123.106 210.807 123.111 210.77 123.103C204.798 120.81 198.116 119.955 191.159 120.959C173.359 123.412 159.254 138.17 157.525 156.036C155.222 179.645 173.725 199.592 196.842 199.592C201.743 199.592 206.497 198.655 210.818 196.999L210.828 196.995L210.838 196.991C210.842 196.989 210.843 196.988 210.853 196.99C210.867 196.992 210.893 196.999 210.924 197.021C210.955 197.042 210.976 197.068 210.987 197.088C210.992 197.095 210.994 197.102 210.996 197.107C210.998 197.113 210.998 197.118 210.998 197.122V264.665C210.998 264.668 210.998 264.67 210.998 264.672C210.997 264.678 210.996 264.68 210.995 264.682C210.993 264.686 210.988 264.696 210.975 264.708C210.948 264.733 210.9 264.758 210.835 264.758H1.62603C1.59472 264.758 1.57707 264.752 1.56906 264.749C1.56045 264.746 1.55549 264.742 1.55232 264.739C1.54915 264.735 1.54527 264.73 1.54172 264.722C1.53842 264.714 1.53271 264.696 1.53271 264.665V264.18V197.053C6.01384 198.84 10.8956 199.8 16.0352 199.8C37.8538 199.8 55.5669 182.087 55.5669 160.268C55.5669 138.446 37.8502 120.805 16.0352 120.805C10.8956 120.805 6.01384 121.766 1.53271 123.552V56.4252V55.4554C1.53271 55.4241 1.53842 55.4064 1.54172 55.3984C1.54527 55.3898 1.54915 55.3848 1.55232 55.3816C1.55549 55.3785 1.56045 55.3746 1.56906 55.3711C1.57707 55.3677 1.59472 55.362 1.62603 55.362H71.6627H73.9977L73.0269 53.2384C70.8953 48.5755 69.699 43.4534 69.699 38.0674C69.699 17.8381 86.0672 1.53564 106.231 1.53564C126.394 1.53564 142.763 17.8381 142.763 38.0674C142.763 43.4534 141.566 48.5756 139.435 53.2384Z" '
    if ( initPassedPercent ){
      if ( initPassedPercent < 100 ) {
        sIconSvg += ' fill="url(#grad_' + intNumber + ')" />'
        sIconSvg += '<linearGradient id="grad_' + intNumber + '" x1="0%" y1="0%" x2="20%" y2="100%">'
          sIconSvg += '<stop offset="' + initPassedPercent + '%" style="stop-color:#006AC1;stop-opacity:1" />'
          sIconSvg += '<stop offset="100%" style="stop-color:#FFFFFF;stop-opacity:1" />'
        sIconSvg += '</linearGradient>'
      }
      else {
        sIconSvg += ' fill="#006AC1"'
      }
    }
    else {
      sIconSvg += 'stroke="white" stroke-width="3" />'
    }
    sIconSvg += '</svg>'
    break;
  case 5:
    sIconSvg = '<svg viewBox="0 -166 330 450" fill="none" xmlns="http://www.w3.org/2000/svg"'
    if ( initPassedPercent )
    sIconSvg += ' style="overflow: visible; filter: drop-shadow(2px -2px 0 #E27D26) drop-shadow(1.5px -1.5px 0 #E27D26) drop-shadow(.5px -.5px 1px #E27D26);"'
    sIconSvg += '>'
    sIconSvg += '<path d="M53.731 73.1284L55.862 74.1167V71.7676V1.73095C55.862 1.71002 55.8714 1.66748 55.9163 1.6226C55.9612 1.57773 56.0037 1.56836 56.0246 1.56836H123.498C123.505 1.56836 123.515 1.56937 123.532 1.57896C123.552 1.59019 123.578 1.61129 123.599 1.6422C123.621 1.67303 123.628 1.69958 123.63 1.7134C123.632 1.72241 123.631 1.72446 123.63 1.7275L123.629 1.72806L123.626 1.73678L123.623 1.74555C121.311 7.74149 120.525 14.4391 121.457 21.3964L121.459 21.4076C123.981 39.2067 138.668 53.2405 156.6 55.0409L156.604 55.0413C180.217 57.345 200.092 38.8389 200.092 15.7244C200.092 10.8388 199.23 6.08397 197.568 1.74824L197.564 1.73812L197.56 1.72806C197.553 1.70959 197.552 1.69601 197.553 1.68258C197.555 1.66626 197.562 1.64548 197.576 1.62499C197.589 1.60487 197.605 1.59133 197.62 1.58332C197.632 1.57699 197.652 1.56836 197.691 1.56836H265.165C265.186 1.56836 265.228 1.57773 265.273 1.6226C265.318 1.66748 265.327 1.71002 265.327 1.73095V210.94C265.327 210.951 265.326 210.955 265.324 210.958C265.323 210.962 265.317 210.971 265.305 210.983C265.278 211.009 265.229 211.034 265.165 211.034H264.403H197.8C199.468 206.707 200.369 202.025 200.369 197.085C200.369 175.267 182.656 157.554 160.837 157.554C139.019 157.554 121.305 175.267 121.305 197.085C121.305 202.025 122.206 206.707 123.874 211.034H57.2716H56.0246C55.9603 211.034 55.9118 211.009 55.8846 210.983C55.872 210.971 55.8668 210.962 55.8649 210.958C55.8638 210.955 55.862 210.951 55.862 210.94V140.904V138.555L53.731 139.543C49.1574 141.664 43.9704 142.798 38.5674 142.798C18.4021 142.798 2.03564 126.494 2.03564 106.336C2.03564 86.1739 18.4056 69.8039 38.5674 69.8039C43.9575 69.8039 49.1459 71.002 53.731 73.1284Z" '
    if ( initPassedPercent ){
      if ( initPassedPercent < 100 ) {
        sIconSvg += ' fill="url(#grad_' + intNumber + ')" />'
        sIconSvg += '<linearGradient id="grad_' + intNumber + '" x1="0%" y1="0%" x2="20%" y2="100%">'
          sIconSvg += '<stop offset="' + initPassedPercent + '%" style="stop-color:#EAAA2F;stop-opacity:1" />'
          sIconSvg += '<stop offset="100%" style="stop-color:#FFFFFF;stop-opacity:1" />'
        sIconSvg += '</linearGradient>'
      }
      else {
        sIconSvg += ' fill="#EAAA2F"'
      }
    }
    else {
      sIconSvg += 'stroke="white" stroke-width="3" />'
    }
    sIconSvg += '</svg>'
    break;
  case 6:
    sIconSvg = '<svg viewBox="-60 -40 330 330" fill="none" xmlns="http://www.w3.org/2000/svg"'
    if ( initPassedPercent )
    sIconSvg += ' style="overflow: visible; filter: drop-shadow(2px -2px 0 #801594) drop-shadow(1.5px -1.5px 0 #801594) drop-shadow(.5px -.5px 1px #801594);"'
    sIconSvg += '>'
    sIconSvg += '<path d="M1.604 210.368V143.245C6.07664 145.042 10.9578 146.057 16.1064 146.057C37.9251 146.057 55.6382 128.344 55.6382 106.525C55.6382 84.7063 37.9251 66.9932 16.1064 66.9932C10.9534 66.9932 6.07252 68.0097 1.604 69.761V3.23644C1.604 2.6101 2.1101 2.104 2.73644 2.104H209.868C210.545 2.104 211.069 2.66015 211.069 3.23644V72.4418V74.8232L213.217 73.7947C217.939 71.5337 223.19 70.2703 228.78 70.2703C248.941 70.2703 265.311 86.6403 265.311 106.802C265.311 126.964 248.941 143.334 228.78 143.334C223.19 143.334 217.939 142.07 213.217 139.809L211.069 138.781V141.162V210.368C211.069 210.944 210.545 211.5 209.868 211.5H172.875H144.819H67.8546H67.7853H2.73644C2.1101 211.5 1.604 210.994 1.604 210.368Z" '
    if ( initPassedPercent ){
      if ( initPassedPercent < 100 ) {
        sIconSvg += ' fill="url(#grad_' + intNumber + ')" />'
        sIconSvg += '<linearGradient id="grad_' + intNumber + '" x1="0%" y1="0%" x2="20%" y2="100%">'
          sIconSvg += '<stop offset="' + initPassedPercent + '%" style="stop-color:#AA18C6;stop-opacity:1" />'
          sIconSvg += '<stop offset="100%" style="stop-color:#FFFFFF;stop-opacity:1" />'
        sIconSvg += '</linearGradient>'
      }
      else {
        sIconSvg += ' fill="#AA18C6"'
      }
    }
    else {
      sIconSvg += 'stroke="white" stroke-width="3" />'
    }
    sIconSvg += '</svg>'
    break;
  case 7:
    sIconSvg = '<svg viewBox="-60 -110 330 450" fill="none" xmlns="http://www.w3.org/2000/svg"'
    if ( initPassedPercent )
    sIconSvg += ' style="overflow: visible; filter: drop-shadow(2px -2px 0 #33A9EC) drop-shadow(1.5px -1.5px 0 #33A9EC) drop-shadow(.5px -.5px 1px #33A9EC);"'
    sIconSvg += '>'
    sIconSvg += '<path d="M72.1311 55.0352H74.4634L73.496 52.913C71.4367 48.396 70.3059 43.4124 70.3059 38.087C70.3059 17.9252 86.6759 1.55518 106.838 1.55518C126.999 1.55518 143.369 17.9252 143.369 38.087C143.369 43.4124 142.239 48.396 140.179 52.913L139.212 55.0352H141.544H210.403C211.081 55.0352 211.605 55.5914 211.605 56.1676V123.027C207.076 121.236 202.186 120.271 197.033 120.271C175.215 120.271 157.502 137.984 157.502 159.803C157.502 181.625 175.218 199.265 197.033 199.265C202.186 199.265 207.076 198.3 211.605 196.509V263.368C211.605 263.944 211.081 264.501 210.403 264.501H3.27209C2.64575 264.501 2.13965 263.994 2.13965 263.368V198.319C2.13965 197.491 2.90685 196.964 3.66458 197.237L3.68137 197.243L3.69831 197.248C7.59057 198.546 11.8379 199.265 16.2264 199.265C39.3409 199.265 57.847 179.39 55.5433 155.777C53.8133 137.837 39.7035 123.153 21.9096 120.632L21.8996 120.631C15.5054 119.768 9.31905 120.415 3.63445 122.286L3.61479 122.292L3.59531 122.299C2.84931 122.568 2.13965 122.057 2.13965 121.286V56.1676C2.13965 55.5413 2.64574 55.0352 3.27209 55.0352H72.1311Z" '
    if ( initPassedPercent ){
      if ( initPassedPercent < 100 ) {
        sIconSvg += ' fill="url(#grad_' + intNumber + ')" />'
        sIconSvg += '<linearGradient id="grad_' + intNumber + '" x1="0%" y1="0%" x2="20%" y2="100%">'
          sIconSvg += '<stop offset="' + initPassedPercent + '%" style="stop-color:#84D5FF;stop-opacity:1" />'
          sIconSvg += '<stop offset="100%" style="stop-color:#FFFFFF;stop-opacity:1" />'
        sIconSvg += '</linearGradient>'
      }
      else {
        sIconSvg += ' fill="#84D5FF"'
      }
    }
    else {
      sIconSvg += 'stroke="white" stroke-width="3" />'
    }
    sIconSvg += '</svg>'
    break;
  default:
  }

  return sIconSvg
}

function profile_course_html( oCourse, index ){
  // - html курса
  var
  sActive = '',
  sPassed = '',
  sCourseHtml = ''

  sCourseHtml += '<div class="step __' + index + '">'
    sCourseHtml += '<div class="_tree">'
      sCourseHtml += profile_course_icon_html( index, oCourse.passed )
    sCourseHtml += '</div>'
    sCourseHtml += '<div class="_desc">'
      sCourseHtml += '<div class="_icon"></div>'
      sCourseHtml += '<div class="_num">0' + ( index + 1 ) + '</div>'
      sCourseHtml += '<div class="_name">' + oCourse.name + '</div>'
      sCourseHtml += '<div class="_txt">' + oCourse.description + '</div>'
      sCourseHtml += '<div class="_href">'
        sCourseHtml += '<a class="content_upload" href="courses/course.htm?id=' + oCourse.id + '"></a>'
      sCourseHtml += '</div>'
    sCourseHtml += '</div>'
    sCourseHtml += '<div class="_href">'
      sCourseHtml += '<a class="content_upload" href="courses/course.htm?id=' + oCourse.id + '"></a>'
    sCourseHtml += '</div>'
  sCourseHtml += '</div>'

  return sCourseHtml
}

// profile_init
function profile_init(){
  // + Текст баллов и вывод баллов
  $(document).find('#profile_info [data-init="points"]').append( user.points + ' ' + num2str(user.points, ['балл', 'балла', 'баллов']) )

  // + Обработка изображения
  if ( user.image ) {
    var profile_img = '<img src="' + site_url + user.image.substring(1).replace('/image/', '/image_min/') + '">'
    $(document).find('#profile_img').removeClass('__default')
    $(document).find('#profile_img').append( profile_img )
  }

  // + Получаем курсы
  $.when(
    content_download({'courses': 'courses'})

  ).done( function( resultData ){
    var
    oCourses = $.parseJSON(resultData),
    sResultHtml = ''

    // + Перебираем курсы
    $.each(oCourses, function( index, oCourse ){
      // + Отмечаем прогресс
      oCourse.passed = 0
      if ( user.passed_courses ) {
        arrUserCoursePassed = $.parseJSON(user.passed_courses)
        oCourse.passed = arrUserCoursePassed[oCourse.id]
      }

      // + Вставляем данные по курсу
      sResultHtml += profile_course_html( oCourse, index )
    })
    // + Выводим курсы
    $(document)
    .find('#profile_progress')
    .html(sResultHtml)
  })
}
// profile_init x

// profile_progress
function profile_progress(){
}
// profile_progress x
