import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sendWeatherQuery } from './services/weatherAdapter';
import AlertBanner from './components/AlertBanner';
import ChatMessage from './components/ChatMessage';
import WeatherAtmosphere from './components/WeatherAtmosphere';

const CITIES = [
  {
    name: { en: "Aurangabad", hi: "औरंगाबाद", mr: "औरंगाबाद" },
    lat: 19.8762,
    lon: 75.3433,
    temp: 28,
    feelsLike: 34,
    condition: "thunderstorm",
    rainProb: 85,
    wind: "24 km/h SW",
    soil: 78,
    season: { en: "Kharif Monsoon", hi: "खरीफ मानसून", mr: "खरीप मान्सून" }
  },
  {
    name: { en: "Nagpur", hi: "नागपुर", mr: "नागपूर" },
    lat: 21.1458,
    lon: 79.0882,
    temp: 43,
    feelsLike: 47,
    condition: "heatwave",
    rainProb: 0,
    wind: "18 km/h NW",
    soil: 28,
    season: { en: "Peak Summer", hi: "भीषण ग्रीष्मकाल", mr: "कडक उन्हाळा" }
  },
  {
    name: { en: "Shimla", hi: "शिमला", mr: "शिमला" },
    lat: 31.1048,
    lon: 77.1734,
    temp: -2,
    feelsLike: -7,
    condition: "snow",
    rainProb: 90,
    wind: "28 km/h NNE",
    soil: 92,
    season: { en: "Alpine Winter", hi: "शीतकालीन हिमपात", mr: "हिवाळा हिमवृष्टी" }
  },
  {
    name: { en: "Pune", hi: "पुणे", mr: "पुणे" },
    lat: 18.5204,
    lon: 73.8567,
    temp: 24,
    feelsLike: 27,
    condition: "rainy",
    rainProb: 75,
    wind: "19 km/h W",
    soil: 74,
    season: { en: "Monsoon Showers", hi: "मानसूनी फुहारें", mr: "मान्सून सरी" }
  },
  {
    name: { en: "Jaisalmer", hi: "जैसलमेर", mr: "जैसलमेर" },
    lat: 26.9157,
    lon: 70.9083,
    temp: 45,
    feelsLike: 49,
    condition: "heatwave",
    rainProb: 0,
    wind: "22 km/h W",
    soil: 15,
    season: { en: "Thar Desert Summer", hi: "रेगिस्तानी लू", mr: "वाळवंटी उष्णता" }
  },
  {
    name: { en: "Manali", hi: "मनाली", mr: "मनाली" },
    lat: 32.2396,
    lon: 77.1887,
    temp: -6,
    feelsLike: -11,
    condition: "snow",
    rainProb: 95,
    wind: "32 km/h NE",
    soil: 96,
    season: { en: "Severe Blizzard", hi: "भारी बर्फबारी", mr: "तीव्र बर्फवृष्टी" }
  },
  {
    name: { en: "Nashik", hi: "नासिक", mr: "नाशिक" },
    lat: 19.9975,
    lon: 73.7898,
    temp: 22,
    feelsLike: 23,
    condition: "cloudy",
    rainProb: 40,
    wind: "14 km/h WNW",
    soil: 65,
    season: { en: "Overcast Morning", hi: "बादल व धुंध", mr: "ढगाळ वातावरण" }
  },
  {
    name: { en: "Solapur", hi: "सोलापूर", mr: "सोलापूर" },
    lat: 17.6599,
    lon: 75.9064,
    temp: 29,
    feelsLike: 31,
    condition: "clear_night",
    rainProb: 5,
    wind: "12 km/h NW",
    soil: 50,
    season: { en: "Clear Starry Night", hi: "शांत तारों भरी रात", mr: "निरभ्र चांदणी रात्र" }
  }
];

const WEATHER_PRESETS = [
  { id: 'thunderstorm', icon: 'thunderstorm', label: { en: 'Thunderstorm', hi: 'तूफान', mr: 'वादळ' }, badge: '⚡ LIVE STORM' },
  { id: 'rainy', icon: 'rainy', label: { en: 'Monsoon', hi: 'बारिश', mr: 'पाऊस' }, badge: '🌧️ MONSOON' },
  { id: 'heatwave', icon: 'wb_sunny', label: { en: 'Heatwave', hi: 'भीषण लू', mr: 'उष्णतेची लाट' }, badge: '🔥 43°C HEAT' },
  { id: 'snow', icon: 'ac_unit', label: { en: 'Snowfall', hi: 'बर्फबारी', mr: 'हिमवृष्टी' }, badge: '❄️ -2°C FROST' },
  { id: 'cloudy', icon: 'cloud', label: { en: 'Overcast', hi: 'बादल', mr: 'ढगाळ' }, badge: '☁️ CLOUDY' },
  { id: 'clear_night', icon: 'bedtime', label: { en: 'Night Sky', hi: 'तारों भरी रात', mr: 'चांदणी रात्र' }, badge: '🌙 STARRY' }
];

const translations = {
  en: {
    forecastTitle: "Next 48 Hours Timeline",
    inputPlaceholder: "Ask WeatherGPT about crops, rain, or heat...",
    assistantTitle: "WeatherGPT AI Assistant",
    listenBtn: "Listen Advisory",
    chip1: "🌾 Crop Spraying Advisory",
    chip2: "⚠️ Severe Weather Warning",
    chip3: "💧 Soil Moisture & Drip Plan",
    radarTitle: "Doppler Radar & Satellite",
    radarSubtitle: "Live IMD Doppler Radar & WRF Simulation",
    selectCity: "Select Location & Season",
    tabForecast: "Forecast",
    tabRadar: "Radar",
    tabAssistant: "Assistant",
    tabAlerts: "Alerts",
    atmosphereTitle: "Atmospheric Simulation",
    conditions: {
      thunderstorm: "Severe Thunderstorm & Lightning",
      rainy: "Monsoon Showers & Rain",
      heatwave: "Severe Summer Heatwave & High UV",
      snow: "Winter Snowfall & Sub-Zero Frost",
      cloudy: "Overcast & Rolling Clouds",
      clear_night: "Clear Starlit Night",
      sunny: "Sunny & Clear Daylight"
    },
    initialBotText: "### 🌦️ WeatherGPT Agro-Meteorological Advisory\n* **Status**: Active meteorological tracking enabled.\n* **Outlook**: Dynamic atmospheric simulation loaded.\n* **Action**: Check real-time soil moisture and precipitation risk for crop management.",
    initialBotTts: "WeatherGPT active. Tracking atmospheric conditions and crop safety recommendations."
  },
  hi: {
    forecastTitle: "अगले 48 घंटे का मौसम ग्राफ",
    inputPlaceholder: "फसल, बारिश या लू के बारे में पूछें...",
    assistantTitle: "वेदर जीपीटी कृषि सहायक",
    listenBtn: "सलाह सुनें",
    chip1: "🌾 कीटनाशक छिड़काव परामर्श",
    chip2: "⚠️ गंभीर मौसम चेतावनी",
    chip3: "💧 मिट्टी में नमी व सिंचाई",
    radarTitle: "डॉपलर रडार एवं उपग्रह",
    radarSubtitle: "लाइव आईएमडी रडार व संख्यात्मक मॉडल",
    selectCity: "स्थान एवं मौसम चुनें",
    tabForecast: "मौसम",
    tabRadar: "रडार",
    tabAssistant: "सहायक",
    tabAlerts: "अलर्ट",
    atmosphereTitle: "वायुमंडलीय सिमुलेशन",
    conditions: {
      thunderstorm: "तीव्र मेघगर्जन, आंधी व बिजली",
      rainy: "मानसूनी वर्षा एवं फुहारें",
      heatwave: "भीषण लू, तेज धूप एवं तापमान",
      snow: "शीतकालीन बर्फबारी एवं पाला",
      cloudy: "घने बादल एवं धुंध",
      clear_night: "शांत व तारों भरी रात",
      sunny: "खिली हुई धूप व साफ मौसम"
    },
    initialBotText: "### 🌦️ वेदर जीपीटी कृषि मौसम परामर्श\n* **स्थिति**: रीयल-टाइम मौसम और फसल सुरक्षा सक्रिय है।\n* **सिमुलेशन**: मौसम और वायुमंडलीय प्रभाव लोड हो चुका है।\n* **सलाह**: फसल सुरक्षा एवं सिंचाई के लिए नीचे दिए गए विकल्पों का उपयोग करें।",
    initialBotTts: "वेदर जीपीटी में आपका स्वागत है। मौसम अनुसार कृषि सलाह एवं रडार जानकारी उपलब्ध है।"
  },
  mr: {
    forecastTitle: "पुढील 48 तास हवामान आलेख",
    inputPlaceholder: "पिके, पाऊस किंवा हवामानाबद्दल विचारा...",
    assistantTitle: "वेदर जीपीटी कृषी सहाय्यक",
    listenBtn: "सल्ला ऐका",
    chip1: "🌾 पीक फवारणी सल्ला",
    chip2: "⚠️ तीव्र हवामान इशारा",
    chip3: "💧 जमिनीतील ओलावा व सिंचन",
    radarTitle: "डॉपलर रडार व उपग्रह चित्र",
    radarSubtitle: "थेट हवामान विभाग रडार व मॉडेल",
    selectCity: "स्थान व ऋतू निवडा",
    tabForecast: "हवामान",
    tabRadar: "रडार",
    tabAssistant: "सहाय्यक",
    tabAlerts: "इशारे",
    atmosphereTitle: "वातावरण सिमुलेशन",
    conditions: {
      thunderstorm: "विजांच्या कडकडाटासह मुसळधार पाऊस",
      rainy: "मान्सून सरी व मध्यम पाऊस",
      heatwave: "कडक उन्हाळा व उष्णतेची लाट",
      snow: "अतिथंड हवामान व हिमवृष्टी",
      cloudy: "ढगाळ आकाश व धुके",
      clear_night: "निरभ्र व शांत चांदणी रात्र",
      sunny: "उबदार सूर्यप्रकाश व स्वच्छ हवामान"
    },
    initialBotText: "### 🌦️ वेदर जीपीटी कृषी सल्लागार\n* **स्थिती**: थेट हवामान व पीक सल्ला प्रणाली सुरू आहे.\n* **वातावरण**: ऋतूनुसार वातावरणीय बदल सुरू आहेत.\n* **शेतकरी सल्ला**: फवारणी व पाणी व्यवस्थापनासाठी हवामानाचा अंदाज तपासा.",
    initialBotTts: "वेदर जीपीटी कृषी सहाय्यक सुरू आहे. हवामानानुसार पीक सल्ला उपलब्ध आहे."
  }
};

export default function App() {
  const [lang, setLang] = useState('hi');
  const [activeCity, setActiveCity] = useState(CITIES[0]);
  const [activeCondition, setActiveCondition] = useState('thunderstorm');
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('forecast'); // 'forecast' | 'radar'
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [followups, setFollowups] = useState([]);

  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  const t = translations[lang] || translations.en;

  const [activeAlert, setActiveAlert] = useState({
    active: true,
    severity: "Red",
    headline: "Severe Weather Warning Active",
    source: "IMD Weather Center"
  });

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: translations.hi.initialBotText,
      telemetry: {
        temperature: 28.0,
        feels_like: 34.0,
        precipitation_probability: 85,
        wind_speed_kmh: 24,
        wind_direction: "SW",
        soil_moisture_percentage: 78,
        model_source: "IMD-WRF 3km"
      },
      tts_text: translations.hi.initialBotTts
    }
  ]);

  // Sync condition when city changes
  const handleSelectCity = (city) => {
    setActiveCity(city);
    setActiveCondition(city.condition);
    setIsCityModalOpen(false);

    // Update alert status according to city condition
    if (city.condition === 'thunderstorm' || city.condition === 'heatwave') {
      setActiveAlert({
        active: true,
        severity: "Red",
        headline: city.condition === 'heatwave' ? "Extreme Heatwave & Thermal Stress" : "Severe Thunderstorm & High Winds",
        source: "IMD National Alert Service"
      });
    } else if (city.condition === 'snow') {
      setActiveAlert({
        active: true,
        severity: "Orange",
        headline: "Sub-Zero Frost & Heavy Snowfall Alert",
        source: "Mountain Met Division"
      });
    } else {
      setActiveAlert({
        active: false,
        severity: "None",
        headline: "Normal Seasonal Weather",
        source: "IMD Regional Center"
      });
    }
  };

  const handleSelectPreset = (conditionId) => {
    setActiveCondition(conditionId);
    if (conditionId === 'thunderstorm' || conditionId === 'heatwave') {
      setActiveAlert({
        active: true,
        severity: "Red",
        headline: conditionId === 'heatwave' ? "Extreme Heatwave Advisory" : "Thunderstorm & Rain Warning",
        source: "IMD Alert System"
      });
    } else if (conditionId === 'snow') {
      setActiveAlert({
        active: true,
        severity: "Orange",
        headline: "Frost & Cold Wave Warning",
        source: "Snow & Avalanche Centre"
      });
    } else {
      setActiveAlert({
        active: false,
        severity: "None",
        headline: "Clear Skies",
        source: "IMD Regional Portal"
      });
    }
  };

  const handleLangChange = (newLang) => {
    setLang(newLang);
    const newT = translations[newLang] || translations.en;
    if (messages.length === 1 && messages[0].sender === 'bot') {
      setMessages([
        {
          sender: 'bot',
          text: newT.initialBotText,
          telemetry: messages[0].telemetry,
          tts_text: newT.initialBotTts
        }
      ]);
    }
  };

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isChatOpen]);

  const playAudio = useCallback((text) => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  }, [isPlayingAudio, lang]);

  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice speech recognition is supported on Google Chrome, Edge, and Android browsers.");
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        if (transcript) {
          setInputVal(transcript);
          setIsChatOpen(true);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSend = async (overrideText = null) => {
    const query = (overrideText || inputVal).trim();
    if (!query || loading) return;

    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setInputVal('');
    setLoading(true);
    setIsChatOpen(true);

    try {
      const response = await sendWeatherQuery({
        message: query,
        language: lang,
        location: { lat: activeCity.lat, lon: activeCity.lon },
        condition: activeCondition
      });

      if (response.alert?.active) {
        setActiveAlert(response.alert);
      }
      if (response.suggested_followups) {
        setFollowups(response.suggested_followups);
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: response.text,
          tts_text: response.tts_text,
          telemetry: response.telemetry
        }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '⚠️ Unable to connect to meteorological data stream. Please check connection.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Generate dynamic 48h forecast nodes based on condition & city temp
  const getForecastNodes = () => {
    const base = activeCity.temp;
    const isSnow = activeCondition === 'snow';
    const isHeat = activeCondition === 'heatwave';

    return [
      { time: 'Now', temp: `${base}°`, icon: activeCondition === 'snow' ? 'ac_unit' : activeCondition === 'heatwave' ? 'wb_sunny' : activeCondition === 'clear_night' ? 'bedtime' : 'thunderstorm', color: isSnow ? 'text-cyan-200' : isHeat ? 'text-amber-400' : 'text-cyan-400' },
      { time: '15:00', temp: `${isHeat ? base + 2 : isSnow ? base - 1 : base - 1}°`, icon: isHeat ? 'sunny' : isSnow ? 'snowing' : 'rainy', color: isHeat ? 'text-amber-400' : 'text-cyan-300' },
      { time: '18:00', temp: `${isHeat ? base - 2 : isSnow ? base - 3 : base - 2}°`, icon: isHeat ? 'wb_twilight' : isSnow ? 'ac_unit' : 'rainy', color: isHeat ? 'text-orange-400' : 'text-cyan-400' },
      { time: '21:00', temp: `${isHeat ? base - 5 : isSnow ? base - 5 : base - 3}°`, icon: isSnow ? 'nights_stay' : 'bedtime', color: 'text-slate-300' },
      { time: '00:00', temp: `${isHeat ? base - 8 : isSnow ? base - 7 : base - 4}°`, icon: 'nights_stay', color: 'text-slate-400' },
      { time: '06:00', temp: `${isHeat ? base - 10 : isSnow ? base - 8 : base - 5}°`, icon: isHeat ? 'sunny' : isSnow ? 'ac_unit' : 'partly_cloudy_day', color: isHeat ? 'text-amber-300' : 'text-cyan-200' },
      { time: '12:00', temp: `${isHeat ? base + 3 : isSnow ? base + 1 : base + 1}°`, icon: isHeat ? 'wb_sunny' : isSnow ? 'cloud' : 'sunny', color: isHeat ? 'text-yellow-400' : 'text-slate-200' }
    ];
  };

  const currentConditionText = t.conditions[activeCondition] || t.conditions.thunderstorm;

  // Dynamic UI theme styling
  const getConditionColor = () => {
    switch (activeCondition) {
      case 'heatwave':
        return {
          primary: 'text-amber-400',
          badgeBg: 'bg-amber-950/70 border-amber-500/40 text-amber-300',
          accentGradient: 'from-amber-400 to-orange-500',
          glow: 'drop-shadow-[0_0_25px_rgba(251,191,36,0.5)]',
          curveStroke: '#f59e0b'
        };
      case 'snow':
        return {
          primary: 'text-cyan-200',
          badgeBg: 'bg-cyan-950/70 border-cyan-400/40 text-cyan-200',
          accentGradient: 'from-cyan-300 to-blue-400',
          glow: 'drop-shadow-[0_0_25px_rgba(165,243,252,0.5)]',
          curveStroke: '#a5f3fc'
        };
      case 'rainy':
        return {
          primary: 'text-teal-300',
          badgeBg: 'bg-teal-950/70 border-teal-500/40 text-teal-200',
          accentGradient: 'from-teal-300 to-cyan-500',
          glow: 'drop-shadow-[0_0_25px_rgba(45,212,191,0.5)]',
          curveStroke: '#2dd4bf'
        };
      case 'clear_night':
        return {
          primary: 'text-indigo-300',
          badgeBg: 'bg-indigo-950/70 border-indigo-500/40 text-indigo-200',
          accentGradient: 'from-indigo-300 to-purple-400',
          glow: 'drop-shadow-[0_0_25px_rgba(165,180,252,0.5)]',
          curveStroke: '#818cf8'
        };
      case 'cloudy':
        return {
          primary: 'text-slate-300',
          badgeBg: 'bg-slate-900/70 border-slate-500/40 text-slate-300',
          accentGradient: 'from-slate-200 to-slate-400',
          glow: 'drop-shadow-[0_0_25px_rgba(203,213,225,0.4)]',
          curveStroke: '#94a3b8'
        };
      default: // thunderstorm
        return {
          primary: 'text-cyan-400',
          badgeBg: 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300',
          accentGradient: 'from-cyan-400 to-blue-500',
          glow: 'drop-shadow-[0_0_25px_rgba(6,182,212,0.6)]',
          curveStroke: '#06b6d4'
        };
    }
  };

  const theme = getConditionColor();

  return (
    <div className="bg-[#050914] text-[#dae2fd] h-screen w-full max-w-md mx-auto overflow-hidden relative flex flex-col justify-between font-sans select-none border-x border-white/10 shadow-2xl">

      {/* Dynamic Animated Atmospheric Weather Background */}
      <WeatherAtmosphere condition={activeCondition} isNight={activeCondition === 'clear_night'} />

      {/* Header */}
      <header className="relative z-20 flex justify-between items-center px-4 py-3 backdrop-blur-2xl bg-black/40 border-b border-white/10 shadow-lg">
        <button
          onClick={() => setIsCityModalOpen(true)}
          className="flex items-center gap-1.5 hover:bg-white/10 px-2.5 py-1.5 rounded-full transition cursor-pointer active:scale-95"
        >
          <span className={`material-symbols-outlined ${theme.primary}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            location_on
          </span>
          <div className="flex flex-col text-left">
            <span className="text-sm font-bold text-white tracking-wide leading-tight">
              {activeCity.name[lang] || activeCity.name.en}
            </span>
            <span className="text-[10px] text-slate-400 leading-tight">
              {activeCity.season[lang] || activeCity.season.en}
            </span>
          </div>
          <span className="material-symbols-outlined text-xs text-slate-400 ml-0.5">expand_more</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <select
            value={lang}
            onChange={(e) => handleLangChange(e.target.value)}
            className="bg-black/70 text-xs text-cyan-300 font-semibold rounded-full px-3 py-1.5 border border-cyan-500/40 backdrop-blur-md outline-none cursor-pointer focus:ring-1 focus:ring-cyan-400"
          >
            <option value="hi" className="bg-[#0b1326] text-white">हिंदी</option>
            <option value="mr" className="bg-[#0b1326] text-white">मराठी</option>
            <option value="en" className="bg-[#0b1326] text-white">English</option>
          </select>

          {/* Location / Search Modal Trigger */}
          <button
            onClick={() => setIsCityModalOpen(true)}
            className="hover:bg-white/10 p-2 rounded-full transition-colors flex items-center justify-center text-slate-300 hover:text-white"
            title={t.selectCity}
          >
            <span className="material-symbols-outlined text-lg">travel_explore</span>
          </button>
        </div>
      </header>

      {/* Location & Season Picker Modal */}
      {isCityModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#0e172a] border border-white/20 rounded-3xl p-5 w-full max-w-sm shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#06b6d4]">pin_drop</span>
                {t.selectCity}
              </h3>
              <button
                onClick={() => setIsCityModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto no-scrollbar pr-1">
              {CITIES.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectCity(c)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-left text-xs transition ${
                    activeCity.name.en === c.name.en
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/50 shadow-lg'
                      : 'hover:bg-white/10 text-slate-200 border border-white/5'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-white">
                      {c.name[lang] || c.name.en}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {c.season[lang] || c.season.en}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-black/40 font-mono font-bold text-cyan-300">
                      {c.temp}°C
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Visual Canvas */}
      <main className="relative z-10 w-full flex-1 px-4 pt-2 pb-[245px] overflow-y-auto no-scrollbar flex flex-col gap-3">

        {/* Dynamic Weather Atmosphere Simulator Switcher */}
        <section className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {WEATHER_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer active:scale-95 ${
                activeCondition === preset.id
                  ? `${theme.badgeBg} border shadow-md font-bold`
                  : 'bg-black/40 border border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                {preset.icon}
              </span>
              <span>{preset.label[lang] || preset.label.en}</span>
            </button>
          ))}
        </section>

        {/* Active Alert Banner */}
        <AlertBanner
          alert={activeAlert}
          onOpenAlertChat={() => handleSend(t.chip2)}
        />

        {activeTab === 'forecast' ? (
          <>
            {/* Main Weather Hero Card */}
            <section className="flex flex-col items-center text-center bg-gradient-to-b from-black/40 to-black/20 border border-white/15 rounded-3xl p-5 backdrop-blur-2xl shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-center w-full mb-1">
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${theme.badgeBg}`}>
                  {WEATHER_PRESETS.find(p => p.id === activeCondition)?.badge || 'LIVE METEOROLOGY'}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {activeCity.season[lang] || activeCity.season.en}
                </span>
              </div>

              {/* Weather Condition Label */}
              <div className={`flex items-center gap-2 ${theme.primary} my-1.5`}>
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {activeCondition === 'heatwave' ? 'wb_sunny' : activeCondition === 'snow' ? 'ac_unit' : activeCondition === 'clear_night' ? 'bedtime' : 'thunderstorm'}
                </span>
                <span className="text-base font-semibold">{currentConditionText}</span>
              </div>

              {/* Huge Temperature Display */}
              <h1 className={`text-8xl font-black text-white tracking-tighter ${theme.glow} my-1`}>
                {activeCity.temp}°
              </h1>
              <p className="text-xs text-slate-300">
                {lang === 'hi' ? `महसूस हो रहा है ${activeCity.feelsLike}°C` : lang === 'mr' ? `जाणवणारे तापमान ${activeCity.feelsLike}°C` : `Feels like ${activeCity.feelsLike}°C`}
              </p>

              {/* Telemetry Summary Bar */}
              <div className="grid grid-cols-3 gap-2 w-full mt-4 pt-3 border-t border-white/10">
                <div className="flex flex-col items-center bg-black/30 rounded-2xl py-2 border border-white/5">
                  <span className="text-[9px] text-slate-400 font-mono uppercase">
                    {lang === 'hi' ? 'वर्षा संभावना' : lang === 'mr' ? 'पाऊस शक्यता' : 'RAIN CHANCE'}
                  </span>
                  <span className="text-xs font-bold text-cyan-300">{activeCity.rainProb}%</span>
                </div>
                <div className="flex flex-col items-center bg-black/30 rounded-2xl py-2 border border-white/5">
                  <span className="text-[9px] text-slate-400 font-mono uppercase">
                    {lang === 'hi' ? 'हवा की गति' : lang === 'mr' ? 'वाऱ्याचा वेग' : 'WIND'}
                  </span>
                  <span className="text-xs font-bold text-white">{activeCity.wind}</span>
                </div>
                <div className="flex flex-col items-center bg-black/30 rounded-2xl py-2 border border-white/5">
                  <span className="text-[9px] text-slate-400 font-mono uppercase">
                    {lang === 'hi' ? 'मिट्टी नमी' : lang === 'mr' ? 'जमीन ओलावा' : 'SOIL MOIST'}
                  </span>
                  <span className={`text-xs font-bold ${activeCity.soil < 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {activeCity.soil}%
                  </span>
                </div>
              </div>
            </section>

            {/* 48-Hour Graph Timeline */}
            <section className="glass-panel bg-black/40 border border-white/15 rounded-3xl p-4 shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-[11px] font-mono tracking-widest text-slate-300 uppercase">
                  {t.forecastTitle}
                </h2>
                <span className="text-[10px] text-cyan-400 font-mono">IMD WRF 3km</span>
              </div>

              <div className="flex overflow-x-auto no-scrollbar gap-4 pb-2 items-end h-28 relative">
                {/* SVG Curve */}
                <svg className="absolute top-5 left-0 w-[470px] h-12" viewBox="0 0 470 48" preserveAspectRatio="none">
                  <path
                    d="M 20 20 Q 60 10, 100 24 T 180 28 T 260 16 T 340 32 T 420 14"
                    fill="transparent"
                    stroke={theme.curveStroke}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>

                {getForecastNodes().map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-end min-w-[50px] z-10 text-center">
                    <span className="text-xs font-semibold text-white mb-2.5 font-mono">{item.temp}</span>
                    <span
                      className={`material-symbols-outlined text-lg mb-1 ${item.color}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {item.icon}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* Radar / Satellite View */
          <section className="glass-panel bg-black/40 border border-white/15 rounded-3xl p-4 shadow-xl flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">{t.radarTitle}</h3>
                <p className="text-[10px] text-slate-400">{t.radarSubtitle}</p>
              </div>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-500/40">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                Live 5m
              </span>
            </div>

            {/* Radar Simulation Canvas */}
            <div className="relative w-full h-60 rounded-2xl bg-[#060c1a] border border-cyan-500/30 overflow-hidden flex items-center justify-center shadow-inner">
              <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
              
              <div className="absolute w-48 h-48 rounded-full border border-cyan-500/20" />
              <div className="absolute w-32 h-32 rounded-full border border-cyan-500/30" />
              <div className="absolute w-16 h-16 rounded-full border border-cyan-500/40" />

              {/* Sweeping radar arm */}
              <div className="absolute w-48 h-48 rounded-full animate-radar origin-center pointer-events-none">
                <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/40 to-transparent rounded-tl-full" />
              </div>

              {/* Precipitation Echoes */}
              {activeCondition === 'snow' ? (
                <>
                  <div className="absolute top-10 left-12 w-24 h-16 bg-cyan-300/40 rounded-full blur-md animate-pulse-slow" />
                  <div className="absolute bottom-12 right-12 w-28 h-20 bg-blue-300/30 rounded-full blur-md" />
                </>
              ) : activeCondition === 'heatwave' ? (
                <>
                  <div className="absolute inset-4 bg-amber-500/20 rounded-full blur-xl animate-pulse" />
                  <div className="absolute top-14 left-16 w-20 h-16 bg-red-500/30 rounded-full blur-md" />
                </>
              ) : (
                <>
                  <div className="absolute top-12 left-16 w-16 h-12 bg-red-500/40 rounded-full blur-md animate-pulse-slow" />
                  <div className="absolute top-16 left-24 w-20 h-16 bg-amber-500/40 rounded-full blur-md" />
                  <div className="absolute bottom-10 right-14 w-24 h-16 bg-cyan-500/40 rounded-full blur-md" />
                </>
              )}

              {/* Target Location Center */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-3 h-3 bg-cyan-400 rounded-full ring-4 ring-cyan-400/30 animate-pulse" />
                <span className="text-[10px] font-bold text-white mt-1.5 bg-black/80 px-2 py-0.5 rounded-full border border-white/10">
                  {activeCity.name[lang] || activeCity.name.en}
                </span>
              </div>
            </div>

            {/* Doppler Legend */}
            <div className="flex justify-between items-center text-[9px] text-slate-300 font-mono px-1">
              <span>{activeCondition === 'snow' ? 'Snow Intensity (cm/h):' : activeCondition === 'heatwave' ? 'Thermal Index (°C):' : 'Reflectivity (dBZ):'}</span>
              <div className="flex items-center gap-1">
                <span className="px-1.5 py-0.5 rounded bg-cyan-500/40 text-cyan-200">Light</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-500/40 text-amber-200">Moderate</span>
                <span className="px-1.5 py-0.5 rounded bg-red-500/50 text-red-200">Severe</span>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Expandable Chat Drawer */}
      <section
        className={`fixed left-0 right-0 max-w-md mx-auto z-40 glass-panel bg-[#0b1326]/95 border-t border-white/20 rounded-t-3xl pt-3 pb-3 px-4 shadow-[0_-8px_40px_rgba(0,0,0,0.8)] transition-all duration-300 flex flex-col ${
          isChatOpen ? 'bottom-0 h-[75vh]' : 'bottom-[60px] h-[160px]'
        }`}
      >
        {/* Drawer Header Toggle */}
        <div
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-full flex flex-col items-center cursor-pointer py-1 select-none"
        >
          <div className="w-12 h-1 bg-white/30 rounded-full mb-2 hover:bg-white/50 transition"></div>
          <div className="flex justify-between items-center w-full px-1">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <span className="material-symbols-outlined text-base">smart_toy</span>
              <h3 className="text-xs font-bold tracking-wide uppercase text-white">
                {t.assistantTitle}
              </h3>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setIsChatOpen(!isChatOpen); }}
              className="p-1 hover:bg-white/10 rounded-full transition"
            >
              <span className="material-symbols-outlined text-sm text-slate-300">
                {isChatOpen ? 'expand_more' : 'expand_less'}
              </span>
            </button>
          </div>
        </div>

        {/* Chat Stream */}
        {isChatOpen && (
          <div className="flex-1 overflow-y-auto p-1 space-y-3 no-scrollbar my-2">
            {messages.map((m, idx) => (
              <ChatMessage
                key={idx}
                message={m}
                onPlayAudio={playAudio}
                isPlaying={isPlayingAudio}
                listenLabel={t.listenBtn}
              />
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-cyan-300 p-2 bg-white/5 rounded-2xl animate-pulse">
                <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                <span>WeatherGPT is analyzing radar & NWP models...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Dynamic Follow-up Suggestion Chips */}
        {!isChatOpen && (
          <div className="flex gap-2 my-2 overflow-x-auto no-scrollbar whitespace-nowrap">
            {followups.length > 0 ? (
              followups.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => { setIsChatOpen(true); handleSend(q); }}
                  className="bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 rounded-full px-3 py-1.5 text-xs active:scale-95 transition hover:bg-cyan-500/30 cursor-pointer"
                >
                  {q}
                </button>
              ))
            ) : (
              <>
                <button
                  onClick={() => { setIsChatOpen(true); handleSend(t.chip1); }}
                  className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-200 rounded-full px-3 py-1.5 text-xs active:scale-95 transition hover:bg-amber-500/30 cursor-pointer"
                >
                  {t.chip1}
                </button>
                <button
                  onClick={() => { setIsChatOpen(true); handleSend(t.chip2); }}
                  className="flex items-center gap-1.5 bg-red-500/20 border border-red-500/40 text-red-200 rounded-full px-3 py-1.5 text-xs active:scale-95 transition hover:bg-red-500/30 cursor-pointer"
                >
                  {t.chip2}
                </button>
                <button
                  onClick={() => { setIsChatOpen(true); handleSend(t.chip3); }}
                  className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 rounded-full px-3 py-1.5 text-xs active:scale-95 transition hover:bg-emerald-500/30 cursor-pointer"
                >
                  {t.chip3}
                </button>
              </>
            )}
          </div>
        )}

        {/* Input Bar */}
        <div className="flex items-center glass-panel bg-black/60 border border-white/20 rounded-full p-1.5 pl-3.5 mt-auto shadow-inner">
          <input
            type="text"
            value={inputVal}
            onFocus={() => setIsChatOpen(true)}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.inputPlaceholder}
            className="flex-1 bg-transparent border-none text-xs text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleMicClick}
            className={`p-2 rounded-full transition-all flex items-center justify-center cursor-pointer ${
              isListening
                ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-500/30'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-white/10'
            }`}
            title="Voice input"
          >
            <span className="material-symbols-outlined text-lg">mic</span>
          </button>
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={loading || !inputVal.trim()}
            className={`p-2 rounded-full ml-1 flex items-center justify-center transition cursor-pointer active:scale-95 ${
              inputVal.trim()
                ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-bold'
                : 'bg-white/10 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-lg">send</span>
          </button>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="relative z-30 h-[60px] flex justify-around items-center px-2 backdrop-blur-2xl bg-[#080d1a]/95 border-t border-white/10 shadow-2xl">
        <button
          onClick={() => { setActiveTab('forecast'); setIsChatOpen(false); }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition cursor-pointer ${
            activeTab === 'forecast' && !isChatOpen ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: activeTab === 'forecast' && !isChatOpen ? "'FILL' 1" : "'FILL' 0" }}>
            thermostat
          </span>
          <span className="text-[10px] font-mono tracking-wider">{t.tabForecast}</span>
        </button>

        <button
          onClick={() => { setActiveTab('radar'); setIsChatOpen(false); }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition cursor-pointer ${
            activeTab === 'radar' && !isChatOpen ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: activeTab === 'radar' && !isChatOpen ? "'FILL' 1" : "'FILL' 0" }}>
            radar
          </span>
          <span className="text-[10px] font-mono tracking-wider">{t.tabRadar}</span>
        </button>

        <button
          onClick={() => setIsChatOpen(true)}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition cursor-pointer ${
            isChatOpen ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: isChatOpen ? "'FILL' 1" : "'FILL' 0" }}>
            smart_toy
          </span>
          <span className="text-[10px] font-mono tracking-wider">{t.tabAssistant}</span>
        </button>

        <button
          onClick={() => { setIsChatOpen(true); handleSend(t.chip2); }}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl transition cursor-pointer text-amber-400/80 hover:text-amber-300"
        >
          <span className="material-symbols-outlined text-xl">warning</span>
          <span className="text-[10px] font-mono tracking-wider">{t.tabAlerts}</span>
        </button>
      </nav>

    </div>
  );
}