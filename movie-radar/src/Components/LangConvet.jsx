const LanConvert = (real_lan) =>{
    let lan = "";
  switch (real_lan) {
    case "en":
      lan = "English";
      break;
    case "es":
      lan = "Spanish";
      break;
    case "fr":
      lan = "French";
      break;
    case "de":
      lan = "German";
      break;
    case "zh":
      lan = "Chinese";
      break;
    case "hi":
      lan = "Hindi";
      break;
    case "ta":
      lan = "Tamil";
      break;
    case "te":
      lan = "Telugu";
      break;
    case "ml":
      lan = "Malayalam";
      break;
    case "kn":
      lan = "Kannada";
      break;
    case "bn":
      lan = "Bengali";
      break;
    case "gu":
      lan = "Gujarati";
      break;
    case "mr":
      lan = "Marathi";
      break;
    case "pa":
      lan = "Punjabi";
      break;
    case "ur":
      lan = "Urdu";
      break;
    case "ru":
      lan = "Russian";
      break;
    case "ja":
      lan = "Japanese";
      break;
    case "ko":
      lan = "Korean";
      break;
    case "it":
      lan = "Italian";
      break;
    case "pt":
      lan = "Portuguese";
      break;
    case "ar":
      lan = "Arabic";
      break;
    case "tr":
      lan = "Turkish";
      break;
    case "vi":
      lan = "Vietnamese";
      break;
    case "th":
      lan = "Thai";
      break;
    case "pl":
      lan = "Polish";
      break;
    case "id":
      lan = "Indonesian";
      break;
    case "nl":
      lan = "Dutch";
      break;
    case "sv":
      lan = "Swedish";
      break;
    case "no":
      lan = "Norwegian";
      break;
    case "da":
      lan = "Danish";
      break;
    case "si":
      lan = "Sinhala";
      break;
    default:
      lan = "N/A";
  }
  return(
    lan
  )
  }

  export default LanConvert;