export const USE_MOCK = true;
const BACKEND_URL = "http://localhost:8000/api/v1/chat";

const MOCK_ADVISORIES = {
  // 1. Thunderstorm / Cyclone
  thunderstorm: {
    en: {
      text: "### ⚠️ IMD RED ALERT: Severe Thunderstorm & High Winds\n\n* **Intensity**: Intense lightning and gusty winds (65-80 km/h).\n* **Impact Area**: Marathwada and Western Maharashtra.\n* **Crop Action**: Postpone pesticide and foliar fertilizer sprays by 48 hours.\n* **Safety**: Secure farm implements and move livestock to reinforced shelters.",
      tts_text: "Severe thunderstorm alert: High winds and lightning expected. Postpone spraying and secure livestock.",
      alert: {
        active: true,
        severity: "Red",
        headline: "Severe Thunderstorm & High Wind Advisory",
        source: "IMD Nowcast Portal & Doppler Radar"
      },
      telemetry: {
        temperature: 26.5,
        feels_like: 31.0,
        precipitation_probability: 95,
        wind_speed_kmh: 68,
        wind_direction: "WSW",
        soil_moisture_percentage: 88,
        model_source: "IMD Doppler Radar / WRF 3km"
      },
      followups: [
        "What is the storm duration?",
        "Should I drain excess water from fields?",
        "Crop compensation guidelines"
      ]
    },
    hi: {
      text: "### ⚠️ आईएमडी रेड अलर्ट: तीव्र मेघगर्जन एवं आंधी चेतावनी\n\n* **तीव्रता**: भीषण आकाशीय बिजली और 65-80 किमी/घंटा की गति से तेज हवाएं।\n* **प्रभावित क्षेत्र**: मराठवाड़ा और पश्चिमी महाराष्ट्र।\n* **कृषि परामर्श**: कीटनाशक एवं उर्वरक का छिड़काव 48 घंटे के लिए टालें।\n* **सुरक्षा निर्देश**: खेतों में काम रोकें और मवेशियों को पक्के शेड में बांधें।",
      tts_text: "तीव्र मेघगर्जन और आंधी की चेतावनी जारी की गई है। कृपया खुले में न जाएं और कीटनाशक छिड़काव टालें।",
      alert: {
        active: true,
        severity: "Red",
        headline: "भीषण आंधी एवं आकाशीय बिजली अलर्ट",
        source: "भारतीय मौसम विज्ञान विभाग (IMD)"
      },
      telemetry: {
        temperature: 26.5,
        feels_like: 31.0,
        precipitation_probability: 95,
        wind_speed_kmh: 68,
        wind_direction: "WSW",
        soil_moisture_percentage: 88,
        model_source: "आईएमडी डॉपलर रडार"
      },
      followups: [
        "आंधी कब तक शांत होगी?",
        "कपास की फसल कैसे बचाएं?",
        "सरकारी आपदा सहायता नंबर"
      ]
    },
    mr: {
      text: "### ⚠️ हवामान विभाग रेड अलर्ट: तीव्र मेघगर्जना व वादळी वारे\n\n* **तीव्रता**: विजांच्या कडकडाटासह ६५ ते ८० किमी वेगाने वादळी वारे वाहण्याची शक्यता.\n* **प्रभावित भाग**: मराठवाडा आणि पश्चिम महाराष्ट्र.\n* **शेतकरी सल्ला**: कीटकनाशक फवारणी पुढील ४८ तास पूर्णपणे थांबवा.\n* **सुरक्षा सूचना**: शेतात काम करणे टाळा आणि जनावरांना सुरक्षित निवाऱ्यात ठेवा.",
      tts_text: "तीव्र मेघगर्जना आणि वादळाचा इशारा आहे. कृपया सुरक्षित राहा आणि फवारणी दोन दिवस पुढे ढकला.",
      alert: {
        active: true,
        severity: "Red",
        headline: "विजांचा कडकडाट व वादळी पावसाचा इशारा",
        source: "भारतीय हवामान विभाग (IMD)"
      },
      telemetry: {
        temperature: 26.5,
        feels_like: 31.0,
        precipitation_probability: 95,
        wind_speed_kmh: 68,
        wind_direction: "WSW",
        soil_moisture_percentage: 88,
        model_source: "हवामान विभाग डॉपलर रडार"
      },
      followups: [
        "वादळ कधी थांबेल?",
        "शेतातील पाण्याचा निचरा कसा करावा?",
        "नुकसान भरपाई संपर्क"
      ]
    }
  },

  // 2. Summer Heatwave
  heatwave: {
    en: {
      text: "### 🔥 HIGH HEATWAVE WARNING (Summer Advisory)\n\n* **Max Temperature**: 43.5°C (Extreme Thermal Stress).\n* **Soil Evaporation**: Very high evaporation rate (8.5 mm/day).\n* **Irrigation Tip**: Apply light and frequent irrigation during early morning or late evening.\n* **Mulching**: Use organic straw mulch to conserve root-zone soil moisture.",
      tts_text: "High heatwave warning: Temperature 43.5 degrees. Irrigate crops during early morning or night to prevent wilting.",
      alert: {
        active: true,
        severity: "Red",
        headline: "Severe Heatwave & High Thermal Stress Warning",
        source: "National Disaster Management / IMD"
      },
      telemetry: {
        temperature: 43.5,
        feels_like: 47.0,
        precipitation_probability: 0,
        wind_speed_kmh: 18,
        wind_direction: "NW",
        soil_moisture_percentage: 28,
        model_source: "NCMRWF Global Model"
      },
      followups: [
        "How to prevent fruit sunburn?",
        "Best irrigation schedule for heatwave",
        "Heatstroke precautions for farm workers"
      ]
    },
    hi: {
      text: "### 🔥 भीषण लू एवं ग्रीष्मकालीन मौसम परामर्श\n\n* **अधिकतम तापमान**: 43.5°C (अत्यधिक ताप तनाव)।\n* **वाष्पीकरण दर**: मिट्टी की नमी तेजी से सूख रही है (8.5 मिमी/दिन)।\n* **सिंचाई सलाह**: सुबह जल्दी या देर शाम को हल्की एवं नियमित सिंचाई करें।\n* **मल्चिंग**: जड़ों की नमी बचाने के लिए पुआल या पत्तों की मल्चिंग करें।",
      tts_text: "भीषण लू की चेतावनी: तापमान 43.5 डिग्री है। फसलों में सिंचाई केवल सुबह या शाम को करें।",
      alert: {
        active: true,
        severity: "Red",
        headline: "भीषण लू (हीटवेव) का रेड अलर्ट",
        source: "आईएमडी राष्ट्रीय मौसम पूर्वानुमान"
      },
      telemetry: {
        temperature: 43.5,
        feels_like: 47.0,
        precipitation_probability: 0,
        wind_speed_kmh: 18,
        wind_direction: "NW",
        soil_moisture_percentage: 28,
        model_source: "एनसीएमआरडब्ल्यूएफ मॉडल"
      },
      followups: [
        "फलों को धूप से कैसे बचाएं?",
        "गर्मी में ड्रिप सिंचाई का समय",
        "पशुओं को लू से बचाने के उपाय"
      ]
    },
    mr: {
      text: "### 🔥 तीव्र उष्णतेची लाट (उन्हाळी पीक सल्ला)\n\n* **कमाल तापमान**: 43.5°C (अतिउष्णतेचा ताण).\n* **बाष्पीभवन**: जमिनीतील पाण्याचे बाष्पीभवन वेगाने होत आहे.\n* **पाणी व्यवस्थापन**: पिकांना पाणी पहाटे किंवा संध्याकाळी द्यावे.\n* **आच्छादन (Mulching)**: ओलावा टिकवण्यासाठी पिकांच्या मुळाशी पालापाचोळ्याचे आच्छादन करा.",
      tts_text: "तीव्र उष्णतेची लाट: तापमान 43.5 अंश आहे. पिकांना पाणी फक्त सकाळी किंवा संध्याकाळी द्या.",
      alert: {
        active: true,
        severity: "Red",
        headline: "उष्णतेच्या लाटेचा (Heatwave) इशारा",
        source: "हवामान विभाग कृषी हवामान शास्त्र"
      },
      telemetry: {
        temperature: 43.5,
        feels_like: 47.0,
        precipitation_probability: 0,
        wind_speed_kmh: 18,
        wind_direction: "NW",
        soil_moisture_percentage: 28,
        model_source: "हवामान मॉडेल"
      },
      followups: [
        "फळबागांना उन्हापासून कसे वाचवावे?",
        "ठिबक सिंचन कधी चालू करावे?",
        "जनावरांची उन्हाळ्यात काळजी"
      ]
    }
  },

  // 3. Winter Snow & Frost
  snow: {
    en: {
      text: "### ❄️ WINTER FREEZE & SNOWFALL ADVISORY\n\n* **Current Temperature**: -2.0°C (Sub-Zero Frost Warning).\n* **Snow Accumulation**: 15-25 cm fresh snowfall forecast on upper slopes.\n* **Horticulture Tip**: Shake off heavy snow from apple and stone fruit branches to prevent breakage.\n* **Frost Protection**: Cover nurseries and polyhouses with thermal frost sheets.",
      tts_text: "Winter freeze alert: Temperature minus 2 degrees with snowfall. Protect fruit tree branches and cover nursery beds.",
      alert: {
        active: true,
        severity: "Orange",
        headline: "Frost & Sub-Zero Cold Wave Advisory",
        source: "Snow & Avalanche Study Est / IMD"
      },
      telemetry: {
        temperature: -2.0,
        feels_like: -6.5,
        precipitation_probability: 85,
        wind_speed_kmh: 26,
        wind_direction: "NNE",
        soil_moisture_percentage: 92,
        model_source: "IMD Mountain Weather WRF"
      },
      followups: [
        "How to prevent frostbite on saplings?",
        "Snow clearance guidelines for roads",
        "Greenhouse heating recommendations"
      ]
    },
    hi: {
      text: "### ❄️ शीतकालीन पाला एवं बर्फबारी परामर्श\n\n* **तापमान**: -2.0°C (शून्य से नीचे पाला चेतावनी)।\n* **बर्फबारी**: 15 से 25 सेमी ताजी बर्फ गिरने का अनुमान।\n* **बागवानी सलाह**: सेब और अखरोट की डालियों से बर्फ हटाएं ताकि टहनियां न टूटें।\n* **पाला सुरक्षा**: नर्सरी और पॉलीहाउस को पाला रोधी प्लास्टिक शीट से ढकें।",
      tts_text: "शीतकालीन पाला चेतावनी: तापमान माइनस दो डिग्री है। सेब के पेड़ों से बर्फ हटाएं और पौधों को ढकें।",
      alert: {
        active: true,
        severity: "Orange",
        headline: "पाला एवं शीतलहर (Cold Wave) चेतावनी",
        source: "आईएमडी पर्वतीय मौसम केंद्र"
      },
      telemetry: {
        temperature: -2.0,
        feels_like: -6.5,
        precipitation_probability: 85,
        wind_speed_kmh: 26,
        wind_direction: "NNE",
        soil_moisture_percentage: 92,
        model_source: "आईएमडी उच्च-हिमालयी मॉडल"
      },
      followups: [
        "छोटे पौधों को पाले से कैसे बचाएं?",
        "सड़क पर बर्फ हटाने की स्थिति",
        "पॉलीहाउस में तापमान नियंत्रण"
      ]
    },
    mr: {
      text: "### ❄️ हिवाळी अतिशीत हवामान व हिमवृष्टी सल्ला\n\n* **तापमान**: -2.0°C (अतिथंड पांढरा दव व बर्फ इशारा).\n* **हिमवृष्टी**: पर्वतीय भागात १५ ते २५ सेंमी नवीन बर्फ पडण्याची शक्यता.\n* **फलोत्पादन**: झाडांच्या फांद्यांवरून बर्फ झटका जेणेकरून फांद्या तुटणार नाहीत.\n* **संरक्षण**: रोपवाटिका व पॉलिहाऊसचे थंडीपासून संरक्षण करा.",
      tts_text: "अतिथंड हवामानाचा इशारा: तापमान उणे दोन अंश आहे. रोपांचे थंडीपासून संरक्षण करा.",
      alert: {
        active: true,
        severity: "Orange",
        headline: "शीतलाट व हिमवृष्टीचा इशारा",
        source: "हवामान विभाग पर्वतीय विभाग"
      },
      telemetry: {
        temperature: -2.0,
        feels_like: -6.5,
        precipitation_probability: 85,
        wind_speed_kmh: 26,
        wind_direction: "NNE",
        soil_moisture_percentage: 92,
        model_source: "हवामान मॉडेल"
      },
      followups: [
        "रोपांना अतिथंडीपासून कसे वाचवावे?",
        "रस्ते वाहतूक बर्फ अंदाज",
        "पॉलिहाऊस तापमान व्यवस्थापन"
      ]
    }
  },

  // 4. Default / Monsoon Rain / General Agro
  rainy: {
    en: {
      text: "### 🌾 Agro-Meteorological Advisory (Kharif Season)\n\n* **Rainfall Outlook**: Light to moderate intermittent rain over next 24 hours.\n* **Crop Condition**: Soil moisture is optimal at 76%.\n* **Spraying Tip**: Postpone chemical spraying by 48 hours to avoid wash-off.\n* **Drainage**: Ensure field outlet channels are clear in cotton and soybean fields.",
      tts_text: "Monsoon showers expected. Soil moisture is optimal. Postpone chemical spraying by 48 hours.",
      alert: {
        active: true,
        severity: "Orange",
        headline: "Moderate Monsoon Showers Advisory",
        source: "IMD Agro-Met Division"
      },
      telemetry: {
        temperature: 25.8,
        feels_like: 29.0,
        precipitation_probability: 80,
        wind_speed_kmh: 20,
        wind_direction: "SW",
        soil_moisture_percentage: 76,
        model_source: "IMD-WRF 3km"
      },
      followups: [
        "Is it safe to spray fertilizer today?",
        "Show 7-day monsoon forecast",
        "Soil moisture forecast for cotton"
      ]
    },
    hi: {
      text: "### 🌾 कृषि-मौसम परामर्श (खरीफ फसलें)\n\n* **वर्षा पूर्वानुमान**: अगले 24 घंटों में रुक-रुक कर हल्की से मध्यम बारिश।\n* **फसल स्थिति**: मिट्टी में नमी पर्याप्त (76%) है।\n* **छिड़काव सलाह**: बारिश में दवा धुलने से बचाने के लिए छिड़काव 48 घंटे टालें।\n* **जल निकासी**: कपास और सोयाबीन के खेतों में पानी के निकास का मार्ग साफ रखें।",
      tts_text: "मानसून की बारिश जारी रहेगी। मिट्टी में नमी अच्छी है। कीटनाशक छिड़काव दो दिन टालें।",
      alert: {
        active: true,
        severity: "Orange",
        headline: "मध्यम मानसूनी वर्षा परामर्श",
        source: "आईएमडी कृषि मौसम प्रभाग"
      },
      telemetry: {
        temperature: 25.8,
        feels_like: 29.0,
        precipitation_probability: 80,
        wind_speed_kmh: 20,
        wind_direction: "SW",
        soil_moisture_percentage: 76,
        model_source: "आईएमडी-डब्ल्यूआरएफ 3किमी"
      },
      followups: [
        "क्या आज खाद डालना सही है?",
        "अगले 7 दिनों का मानसून अनुमान",
        "सोयाबीन फसल सुरक्षा उपाय"
      ]
    },
    mr: {
      text: "### 🌾 कृषी-हवामान सल्ला (खरीप पिके)\n\n* **पाऊस अंदाज**: पुढील २४ तासांत अधूनमधून हलका ते मध्यम पाऊस.\n* **जमीन ओलावा**: जमिनीत ओलावा उत्तम (76%) आहे.\n* **फवारणी सल्ला**: औषध धुतले जाऊ नये म्हणून फवारणी २ दिवस पुढे ढकला.\n* **पाण्याचा निचरा**: कापूस व सोयाबीनच्या शेतातील चर मोकळे ठेवा.",
      tts_text: "मान्सूनचा पाऊस सुरू राहील. जमिनीत ओलावा चांगला आहे. फवारणी दोन दिवस पुढे ढकला.",
      alert: {
        active: true,
        severity: "Orange",
        headline: "मध्यम मान्सून पाऊस इशारा",
        source: "हवामान विभाग कृषी सल्लागार"
      },
      telemetry: {
        temperature: 25.8,
        feels_like: 29.0,
        precipitation_probability: 80,
        wind_speed_kmh: 20,
        wind_direction: "SW",
        soil_moisture_percentage: 76,
        model_source: "हवामान विभाग WRF"
      },
      followups: [
        "आज खते द्यावीत का?",
        "पुढील ७ दिवसांचा पाऊस अंदाज",
        "कापूस पीक कीड व्यवस्थापन"
      ]
    }
  },

  // 5. Clear / Sunny / Starlight
  sunny: {
    en: {
      text: "### ☀️ Clear Weather & Field Operations Advisory\n\n* **Sky Condition**: Clear with bright sunshine.\n* **Field Operations**: Excellent window for harvesting, threshing, and crop drying.\n* **Spraying**: Optimal conditions for foliar pesticide/fungicide application.\n* **Soil Check**: Inspect soil moisture levels before scheduling irrigation.",
      tts_text: "Clear weather expected. Ideal window for harvesting, crop drying, and pesticide spraying.",
      alert: {
        active: false,
        severity: "None",
        headline: "Clear Skies & Favorable Weather",
        source: "IMD Weather Service"
      },
      telemetry: {
        temperature: 30.2,
        feels_like: 32.5,
        precipitation_probability: 10,
        wind_speed_kmh: 14,
        wind_direction: "WNW",
        soil_moisture_percentage: 54,
        model_source: "IMD-GFS 0.25°"
      },
      followups: [
        "Is today ideal for harvesting?",
        "When is the next rain expected?",
        "Fungicide spraying dosage"
      ]
    },
    hi: {
      text: "### ☀️ साफ मौसम एवं कृषि कार्य परामर्श\n\n* **आकाश स्थिति**: खुला और खिली हुई धूप।\n* **कृषि कार्य**: फसल कटाई, मड़ाई एवं अनाज सुखाने के लिए सर्वोत्तम समय।\n* **छिड़काव**: कीटनाशक एवं फफूंदनाशक छिड़काव के लिए आदर्श परिस्थितियां।\n* **सिंचाई जांच**: सिंचाई करने से पहले मिट्टी में नमी की जांच करें।",
      tts_text: "मौसम साफ रहेगा। फसल कटाई, अनाज सुखाने और कीटनाशक छिड़काव के लिए अनुकूल समय है।",
      alert: {
        active: false,
        severity: "None",
        headline: "मौसम साफ एवं अनुकूल",
        source: "आईएमडी मौसम सेवा"
      },
      telemetry: {
        temperature: 30.2,
        feels_like: 32.5,
        precipitation_probability: 10,
        wind_speed_kmh: 14,
        wind_direction: "WNW",
        soil_moisture_percentage: 54,
        model_source: "आईएमडी-जीएफएस"
      },
      followups: [
        "क्या आज फसल कटाई कर सकते हैं?",
        "अगली बारिश कब होगी?",
        "कीटनाशक छिड़काव की विधि"
      ]
    },
    mr: {
      text: "### ☀️ निरभ्र आकाश व शेती कामे सल्ला\n\n* **हवामान**: आकाश निरभ्र असून सूर्यप्रकाश उत्तम आहे.\n* **शेती कामे**: पीक काढणी, मळणी आणि धान्य वाळवण्यासाठी उत्तम काळ.\n* **फवारणी**: बुरशीनाशक व कीटकनाशक फवारणीसाठी अनुकूल वातावरण.\n* **सिंचन**: पाणी देण्यापूर्वी जमिनीतील ओलावा तपासा.",
      tts_text: "हवामान निरभ्र राहील. पीक काढणी आणि औषध फवारणीसाठी अत्यंत अनुकूल वेळ आहे.",
      alert: {
        active: false,
        severity: "None",
        headline: "हवामान निरभ्र व अनुकूल",
        source: "हवामान विभाग"
      },
      telemetry: {
        temperature: 30.2,
        feels_like: 32.5,
        precipitation_probability: 10,
        wind_speed_kmh: 14,
        wind_direction: "WNW",
        soil_moisture_percentage: 54,
        model_source: "हवामान विभाग GFS"
      },
      followups: [
        "आज पीक काढणी करावी का?",
        "पुढील पाऊस कधी येईल?",
        "बुरशीनाशक फवारणी प्रमाण"
      ]
    }
  }
};

export async function sendWeatherQuery({ message, language = "en", location, condition = 'thunderstorm' }) {
  const payload = {
    session_id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : "session-" + Date.now(),
    message: message,
    language: language,
    location: location || { lat: 19.8762, lon: 75.3433 },
    condition: condition,
    timestamp: new Date().toISOString()
  };

  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const lower = (message || "").toLowerCase();

    let matchedType = 'rainy';
    if (
      lower.includes("snow") ||
      lower.includes("बर्फ") ||
      lower.includes("पाला") ||
      lower.includes("winter") ||
      lower.includes("cold") ||
      lower.includes("थंडी") ||
      condition === 'snow'
    ) {
      matchedType = 'snow';
    } else if (
      lower.includes("heat") ||
      lower.includes("summer") ||
      lower.includes("लू") ||
      lower.includes("गर्मी") ||
      lower.includes("उन्हाळा") ||
      lower.includes("उष्णता") ||
      condition === 'heatwave'
    ) {
      matchedType = 'heatwave';
    } else if (
      lower.includes("cyclone") ||
      lower.includes("storm") ||
      lower.includes("thunder") ||
      lower.includes("alert") ||
      lower.includes("warning") ||
      lower.includes("चेतावनी") ||
      lower.includes("चक्रवात") ||
      lower.includes("इशारा") ||
      lower.includes("वादळ") ||
      condition === 'thunderstorm'
    ) {
      matchedType = 'thunderstorm';
    } else if (
      lower.includes("clear") ||
      lower.includes("sun") ||
      lower.includes("night") ||
      lower.includes("साफ") ||
      lower.includes("धूप") ||
      lower.includes("निरभ्र") ||
      condition === 'sunny' ||
      condition === 'clear_night'
    ) {
      matchedType = 'sunny';
    }

    const langKey = (language === 'hi' || language === 'mr') ? language : 'en';
    const advisory = MOCK_ADVISORIES[matchedType][langKey];

    return {
      message_id: "msg_" + Date.now(),
      text: advisory.text,
      tts_text: advisory.tts_text,
      telemetry: advisory.telemetry,
      alert: advisory.alert,
      suggested_followups: advisory.followups
    };
  }

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) throw new Error(`API Network error: ${response.status}`);
  return response.json();
}