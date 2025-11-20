'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ja' | 'de' | 'si';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    vehicles: 'Vehicles',
    tours: 'Tours',
    gallery: 'Gallery',
    pricing: 'Pricing',
    testimonials: 'Testimonials',
    book: 'Book',
    contact: 'Contact',
    
    // Home Page
    heroTitle: 'Discover Sri Lanka',
    heroSubtitle: 'Experience the beauty of Sri Lanka with premium tours, luxury vehicles, and expert local guides.',
    exploreTours: 'Explore Tours',
    bookNow: 'Book Now',
    exploreToursTitle: 'Explore Tours',
    exploreToursDesc: 'Discover curated tour packages and custom itineraries across Sri Lanka',
    ourVehicles: 'Our Vehicles',
    ourVehiclesDesc: 'Premium fleet of luxury vehicles for your comfort and safety',
    galleryTitle: 'Gallery',
    galleryDesc: 'View stunning photos from our tours and beautiful destinations',
    whyChooseUs: 'Why Choose Ceylon Drive Hub',
    premiumExperience: 'Premium Experience',
    premiumExperienceDesc: 'Luxury vehicles and professional service for unforgettable journeys',
    localExpertise: 'Local Expertise',
    localExpertiseDesc: 'Expert guides who know every hidden gem across Sri Lanka',
    bestValue: 'Best Value',
    bestValueDesc: 'Competitive pricing with transparent rates and no hidden fees',
    readyToStart: 'Ready to Start Your Adventure?',
    readyToStartDesc: 'Book your Sri Lankan journey today and create memories that last a lifetime.',
    contactUs: 'Contact Us',
    
    // Vehicles Page
    vehiclesHeroTitle: 'Our Premium Fleet',
    vehiclesHeroSubtitle: 'Choose from our selection of luxury vehicles for your journey',
    luxuryVehicles: 'Luxury Vehicles',
    specifications: 'Specifications',
    passengers: 'Passengers',
    luggage: 'Luggage',
    transmission: 'Transmission',
    
    // Tours Page
    toursHeroTitle: 'Explore Sri Lanka',
    toursHeroSubtitle: 'Curated tour packages and custom itineraries',
    ourServices: 'Our Services',
    popularDestinations: 'Popular Destinations',
    
    // Gallery Page
    galleryHeroTitle: 'Photo Gallery',
    galleryHeroSubtitle: 'Stunning views from our tours across Sri Lanka',
    
    // Pricing Page
    pricingHeroTitle: 'Transparent Pricing',
    pricingHeroSubtitle: 'Choose the perfect package for your journey',
    chooseYourPlan: 'Choose Your Plan',
    daily: 'Daily',
    weekend: 'Weekend',
    weekly: 'Weekly',
    perDay: 'per day',
    perWeekend: '/Fri–Sun',
    perWeek: '/week',
    bestValueBadge: 'BEST VALUE',
    getStarted: 'Get Started',
    kmPerDayIncluded: '200 km/day included',
    additionalKm030: 'Additional km: $0.30/km',
    basicInsurance: 'Basic insurance included',
    fuelNotIncluded: 'Fuel not included',
    roadside247: '24/7 roadside assistance',
    flexiblePickup: 'Flexible pickup times',
    kmIncluded600: '600 km included',
    additionalKm025: 'Additional km: $0.25/km',
    freeDelivery: 'Free delivery/pickup',
    unlimitedKm: 'Unlimited kilometers',
    premiumInsurance: 'Premium insurance included',
    prioritySupport: 'Priority support',
    
    // Testimonials Page
    testimonialsHeroTitle: 'What Our Clients Say',
    testimonialsHeroSubtitle: 'Read reviews from travelers who experienced Sri Lanka with us',
    customerReviews: 'Customer Reviews',
    
    // Book Page
    bookHeroTitle: 'Book Your Journey',
    bookHeroSubtitle: 'Fill in the details and we will get back to you shortly',
    bookingForm: 'Booking Form',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    serviceType: 'Service Type',
    selectService: 'Select a service',
    startDate: 'Start Date',
    endDate: 'End Date',
    numberOfPeople: 'Number of People',
    specialRequests: 'Special Requests',
    submitBooking: 'Submit Booking',
    estimatedPrice: 'Estimated Price',
    
    // Contact Page
    contactHeroTitle: 'Get in Touch',
    contactHeroSubtitle: 'We are here to help you plan your perfect Sri Lankan adventure',
    contactInfo: 'Contact Information',
    phoneNumber: 'Phone',
    whatsapp: 'WhatsApp',
    emailAddress: 'Email',
    sendUsMessage: 'Send us a Message',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    subject: 'Subject',
    message: 'Message',
    sendMessage: 'Send Message',
    findUs: 'Find Us',
  },
  
  ja: {
    // Navigation
    home: 'ホーム',
    vehicles: '車両',
    tours: 'ツアー',
    gallery: 'ギャラリー',
    pricing: '料金',
    testimonials: 'お客様の声',
    book: '予約',
    contact: 'お問い合わせ',
    
    // Home Page
    heroTitle: 'スリランカを発見',
    heroSubtitle: 'プレミアムツアー、高級車、地元の専門ガイドでスリランカの美しさを体験してください。',
    exploreTours: 'ツアーを探す',
    bookNow: '今すぐ予約',
    exploreToursTitle: 'ツアーを探す',
    exploreToursDesc: 'スリランカ全土の厳選されたツアーパッケージとカスタム旅程を発見',
    ourVehicles: '私たちの車両',
    ourVehiclesDesc: '快適さと安全性のための高級車両のプレミアムフリート',
    galleryTitle: 'ギャラリー',
    galleryDesc: 'ツアーと美しい目的地からの素晴らしい写真をご覧ください',
    whyChooseUs: 'セイロンドライブハブを選ぶ理由',
    premiumExperience: 'プレミアム体験',
    premiumExperienceDesc: '忘れられない旅のための高級車両とプロフェッショナルなサービス',
    localExpertise: '地元の専門知識',
    localExpertiseDesc: 'スリランカのあらゆる隠れた名所を知る専門ガイド',
    bestValue: '最高の価値',
    bestValueDesc: '透明な料金と隠れた費用なしの競争力のある価格',
    readyToStart: '冒険を始める準備はできましたか？',
    readyToStartDesc: '今すぐスリランカの旅を予約して、一生の思い出を作りましょう。',
    contactUs: 'お問い合わせ',
    
    // Vehicles Page
    vehiclesHeroTitle: 'プレミアムフリート',
    vehiclesHeroSubtitle: '旅のための高級車両からお選びください',
    luxuryVehicles: '高級車両',
    specifications: '仕様',
    passengers: '乗客',
    luggage: '荷物',
    transmission: 'トランスミッション',
    
    // Tours Page
    toursHeroTitle: 'スリランカを探索',
    toursHeroSubtitle: '厳選されたツアーパッケージとカスタム旅程',
    ourServices: '私たちのサービス',
    popularDestinations: '人気の目的地',
    
    // Gallery Page
    galleryHeroTitle: 'フォトギャラリー',
    galleryHeroSubtitle: 'スリランカ全土のツアーからの素晴らしい景色',
    
    // Pricing Page
    pricingHeroTitle: '透明な料金',
    pricingHeroSubtitle: '旅に最適なパッケージを選択してください',
    chooseYourPlan: 'プランを選択',
    daily: '毎日',
    weekend: '週末',
    weekly: '毎週',
    perDay: '1日あたり',
    perWeekend: '/金曜〜日曜',
    perWeek: '/週',
    bestValueBadge: '最高の価値',
    getStarted: '始める',
    kmPerDayIncluded: '200km/日含まれる',
    additionalKm030: '追加km: $0.30/km',
    basicInsurance: '基本保険含まれる',
    fuelNotIncluded: '燃料は含まれません',
    roadside247: '24/7ロードサービス',
    flexiblePickup: '柔軟なピックアップ時間',
    kmIncluded600: '600km含まれる',
    additionalKm025: '追加km: $0.25/km',
    freeDelivery: '無料配送/引き取り',
    unlimitedKm: '無制限キロメートル',
    premiumInsurance: 'プレミアム保険含まれる',
    prioritySupport: '優先サポート',
    
    // Testimonials Page
    testimonialsHeroTitle: 'お客様の声',
    testimonialsHeroSubtitle: '私たちと一緒にスリランカを体験した旅行者のレビューを読む',
    customerReviews: 'お客様のレビュー',
    
    // Book Page
    bookHeroTitle: '旅を予約',
    bookHeroSubtitle: '詳細を記入してください。すぐにご連絡いたします',
    bookingForm: '予約フォーム',
    fullName: 'フルネーム',
    email: 'メール',
    phone: '電話',
    serviceType: 'サービスタイプ',
    selectService: 'サービスを選択',
    startDate: '開始日',
    endDate: '終了日',
    numberOfPeople: '人数',
    specialRequests: '特別なリクエスト',
    submitBooking: '予約を送信',
    estimatedPrice: '推定価格',
    
    // Contact Page
    contactHeroTitle: 'お問い合わせ',
    contactHeroSubtitle: '完璧なスリランカの冒険を計画するお手伝いをします',
    contactInfo: '連絡先情報',
    phoneNumber: '電話',
    whatsapp: 'WhatsApp',
    emailAddress: 'メール',
    sendUsMessage: 'メッセージを送る',
    yourName: 'お名前',
    yourEmail: 'メールアドレス',
    subject: '件名',
    message: 'メッセージ',
    sendMessage: 'メッセージを送る',
    findUs: '場所',
  },
  
  de: {
    // Navigation
    home: 'Startseite',
    vehicles: 'Fahrzeuge',
    tours: 'Touren',
    gallery: 'Galerie',
    pricing: 'Preise',
    testimonials: 'Bewertungen',
    book: 'Buchen',
    contact: 'Kontakt',
    
    // Home Page
    heroTitle: 'Entdecken Sie Sri Lanka',
    heroSubtitle: 'Erleben Sie die Schönheit Sri Lankas mit Premium-Touren, Luxusfahrzeugen und erfahrenen lokalen Guides.',
    exploreTours: 'Touren erkunden',
    bookNow: 'Jetzt buchen',
    exploreToursTitle: 'Touren erkunden',
    exploreToursDesc: 'Entdecken Sie kuratierte Tourpakete und individuelle Reisepläne in ganz Sri Lanka',
    ourVehicles: 'Unsere Fahrzeuge',
    ourVehiclesDesc: 'Premium-Flotte von Luxusfahrzeugen für Ihren Komfort und Ihre Sicherheit',
    galleryTitle: 'Galerie',
    galleryDesc: 'Sehen Sie atemberaubende Fotos von unseren Touren und schönen Zielen',
    whyChooseUs: 'Warum Ceylon Drive Hub wählen',
    premiumExperience: 'Premium-Erlebnis',
    premiumExperienceDesc: 'Luxusfahrzeuge und professioneller Service für unvergessliche Reisen',
    localExpertise: 'Lokale Expertise',
    localExpertiseDesc: 'Fachkundige Guides, die jedes versteckte Juwel in Sri Lanka kennen',
    bestValue: 'Bestes Preis-Leistungs-Verhältnis',
    bestValueDesc: 'Wettbewerbsfähige Preise mit transparenten Tarifen und ohne versteckte Gebühren',
    readyToStart: 'Bereit, Ihr Abenteuer zu beginnen?',
    readyToStartDesc: 'Buchen Sie noch heute Ihre Reise durch Sri Lanka und schaffen Sie Erinnerungen fürs Leben.',
    contactUs: 'Kontaktieren Sie uns',
    
    // Vehicles Page
    vehiclesHeroTitle: 'Unsere Premium-Flotte',
    vehiclesHeroSubtitle: 'Wählen Sie aus unserer Auswahl an Luxusfahrzeugen für Ihre Reise',
    luxuryVehicles: 'Luxusfahrzeuge',
    specifications: 'Spezifikationen',
    passengers: 'Passagiere',
    luggage: 'Gepäck',
    transmission: 'Getriebe',
    
    // Tours Page
    toursHeroTitle: 'Erkunden Sie Sri Lanka',
    toursHeroSubtitle: 'Kuratierte Tourpakete und individuelle Reisepläne',
    ourServices: 'Unsere Dienstleistungen',
    popularDestinations: 'Beliebte Ziele',
    
    // Gallery Page
    galleryHeroTitle: 'Fotogalerie',
    galleryHeroSubtitle: 'Atemberaubende Ausblicke von unseren Touren in ganz Sri Lanka',
    
    // Pricing Page
    pricingHeroTitle: 'Transparente Preise',
    pricingHeroSubtitle: 'Wählen Sie das perfekte Paket für Ihre Reise',
    chooseYourPlan: 'Wählen Sie Ihren Plan',
    daily: 'Täglich',
    weekend: 'Wochenende',
    weekly: 'Wöchentlich',
    perDay: 'pro Tag',
    perWeekend: '/Fr–So',
    perWeek: '/Woche',
    bestValueBadge: 'BESTER WERT',
    getStarted: 'Loslegen',
    kmPerDayIncluded: '200 km/Tag inklusive',
    additionalKm030: 'Zusätzliche km: $0.30/km',
    basicInsurance: 'Basisversicherung inklusive',
    fuelNotIncluded: 'Kraftstoff nicht inklusive',
    roadside247: '24/7 Pannenhilfe',
    flexiblePickup: 'Flexible Abholzeiten',
    kmIncluded600: '600 km inklusive',
    additionalKm025: 'Zusätzliche km: $0.25/km',
    freeDelivery: 'Kostenlose Lieferung/Abholung',
    unlimitedKm: 'Unbegrenzte Kilometer',
    premiumInsurance: 'Premiumversicherung inklusive',
    prioritySupport: 'Prioritätsunterstützung',
    
    // Testimonials Page
    testimonialsHeroTitle: 'Was unsere Kunden sagen',
    testimonialsHeroSubtitle: 'Lesen Sie Bewertungen von Reisenden, die Sri Lanka mit uns erlebt haben',
    customerReviews: 'Kundenbewertungen',
    
    // Book Page
    bookHeroTitle: 'Buchen Sie Ihre Reise',
    bookHeroSubtitle: 'Füllen Sie die Details aus und wir melden uns in Kürze bei Ihnen',
    bookingForm: 'Buchungsformular',
    fullName: 'Vollständiger Name',
    email: 'E-Mail',
    phone: 'Telefon',
    serviceType: 'Servicetyp',
    selectService: 'Service auswählen',
    startDate: 'Startdatum',
    endDate: 'Enddatum',
    numberOfPeople: 'Anzahl der Personen',
    specialRequests: 'Besondere Wünsche',
    submitBooking: 'Buchung absenden',
    estimatedPrice: 'Geschätzter Preis',
    
    // Contact Page
    contactHeroTitle: 'Kontaktieren Sie uns',
    contactHeroSubtitle: 'Wir helfen Ihnen gerne, Ihr perfektes sri-lankisches Abenteuer zu planen',
    contactInfo: 'Kontaktinformationen',
    phoneNumber: 'Telefon',
    whatsapp: 'WhatsApp',
    emailAddress: 'E-Mail',
    sendUsMessage: 'Senden Sie uns eine Nachricht',
    yourName: 'Ihr Name',
    yourEmail: 'Ihre E-Mail',
    subject: 'Betreff',
    message: 'Nachricht',
    sendMessage: 'Nachricht senden',
    findUs: 'Finden Sie uns',
  },
  
  si: {
    // Navigation
    home: 'මුල් පිටුව',
    vehicles: 'වාහන',
    tours: 'චාරිකා',
    gallery: 'ගැලරිය',
    pricing: 'මිල ගණන්',
    testimonials: 'සාක්ෂි',
    book: 'වෙන්කරවා ගන්න',
    contact: 'අප හා සම්බන්ධ වන්න',
    
    // Home Page
    heroTitle: 'ශ්‍රී ලංකාව සොයා ගන්න',
    heroSubtitle: 'ප්‍රිමියම් චාරිකා, සුඛෝපභෝගී වාහන සහ ප්‍රවීණ දේශීය මාර්ගෝපදේශකයන් සමඟ ශ්‍රී ලංකාවේ අලංකාරය අත්විඳින්න.',
    exploreTours: 'චාරිකා ගවේෂණය කරන්න',
    bookNow: 'දැන් වෙන්කරවා ගන්න',
    exploreToursTitle: 'චාරිකා ගවේෂණය කරන්න',
    exploreToursDesc: 'ශ්‍රී ලංකාව පුරා සකස් කළ චාරිකා පැකේජ සහ අභිරුචි මාර්ග සොයා ගන්න',
    ourVehicles: 'අපගේ වාහන',
    ourVehiclesDesc: 'ඔබේ සුවපහසුව සහ ආරක්ෂාව සඳහා සුඛෝපභෝගී වාහන',
    galleryTitle: 'ගැලරිය',
    galleryDesc: 'අපගේ චාරිකා සහ අලංකාර ස්ථාන වල අපූරු ඡායාරූප බලන්න',
    whyChooseUs: 'Ceylon Drive Hub තෝරා ගන්නේ ඇයි',
    premiumExperience: 'ප්‍රිමියම් අත්දැකීම',
    premiumExperienceDesc: 'අමතක නොවන ගමන් සඳහා සුඛෝපභෝගී වාහන සහ වෘත්තීය සේවාව',
    localExpertise: 'දේශීය විශේෂඥතාව',
    localExpertiseDesc: 'ශ්‍රී ලංකාවේ සෑම සැඟවුණු මැණික් ගලක්ම දන්නා ප්‍රවීණ මාර්ගෝපදේශකයන්',
    bestValue: 'හොඳම වටිනාකම',
    bestValueDesc: 'විනිවිද පෙනෙන ගාස්තු සහ සැඟවුණු ගාස්තු නොමැතිව තරඟකාරී මිල ගණන්',
    readyToStart: 'ඔබේ වික්‍රමය ආරම්භ කිරීමට සූදානම්ද?',
    readyToStartDesc: 'අද ඔබේ ශ්‍රී ලාංකික ගමන වෙන්කරවා ගෙන ජීවිත කාලය පුරාම මතක සාදා ගන්න.',
    contactUs: 'අප හා සම්බන්ධ වන්න',
    
    // Vehicles Page
    vehiclesHeroTitle: 'අපගේ ප්‍රිමියම් ඇණිය',
    vehiclesHeroSubtitle: 'ඔබේ ගමන සඳහා අපගේ සුඛෝපභෝගී වාහන වලින් තෝරන්න',
    luxuryVehicles: 'සුඛෝපභෝගී වාහන',
    specifications: 'පිරිවිතර',
    passengers: 'මගීන්',
    luggage: 'ගමන් මලු',
    transmission: 'සම්ප්‍රේෂණය',
    
    // Tours Page
    toursHeroTitle: 'ශ්‍රී ලංකාව ගවේෂණය කරන්න',
    toursHeroSubtitle: 'සකස් කළ චාරිකා පැකේජ සහ අභිරුචි මාර්ග',
    ourServices: 'අපගේ සේවා',
    popularDestinations: 'ජනප්‍රිය ගමනාන්ත',
    
    // Gallery Page
    galleryHeroTitle: 'ඡායාරූප ගැලරිය',
    galleryHeroSubtitle: 'ශ්‍රී ලංකාව පුරා අපගේ චාරිකා වලින් අපූරු දසුන්',
    
    // Pricing Page
    pricingHeroTitle: 'විනිවිද පෙනෙන මිල ගණන්',
    pricingHeroSubtitle: 'ඔබේ ගමන සඳහා සුදුසුම පැකේජය තෝරන්න',
    chooseYourPlan: 'ඔබේ සැලැස්ම තෝරන්න',
    daily: 'දෛනික',
    weekend: 'සති අන්තය',
    weekly: 'සතිපතා',
    perDay: 'දිනකට',
    perWeekend: '/සිකු–ඉරිදා',
    perWeek: '/සතිය',
    bestValueBadge: 'හොඳම වටිනාකම',
    getStarted: 'ආරම්භ කරන්න',
    kmPerDayIncluded: 'දිනකට 200 km එකතු වෙ',
    additionalKm030: 'අතිරික්ත km: $0.30/km',
    basicInsurance: 'මූලික බීමාව එකතු වෙ',
    fuelNotIncluded: 'ඉඳුන එකතු නෝවෙ',
    roadside247: '24/7 මාර්ග සහාය',
    flexiblePickup: 'යෙදූම් ගැනීමේ වේලාවෙලා',
    kmIncluded600: '600 km එකතු වෙ',
    additionalKm025: 'අතිරික්ත km: $0.25/km',
    freeDelivery: 'නිලව දෙනීම/ගැනීම',
    unlimitedKm: 'අසීමිත කිලෝමීටර්',
    premiumInsurance: 'ප්‍රීමියම් බීමාව එකතු වෙ',
    prioritySupport: 'ප්‍රාථමිකතා සහාය',
    
    // Testimonials Page
    testimonialsHeroTitle: 'අපගේ ගනුදෙනුකරුවන් පවසන දේ',
    testimonialsHeroSubtitle: 'අප සමඟ ශ්‍රී ලංකාව අත්විඳ ගත් සංචාරකයන්ගේ සමාලෝචන කියවන්න',
    customerReviews: 'ගනුදෙනුකරු සමාලෝචන',
    
    // Book Page
    bookHeroTitle: 'ඔබේ ගමන වෙන්කරවා ගන්න',
    bookHeroSubtitle: 'විස්තර පුරවන්න, අපි ඉක්මනින් ඔබ හා සම්බන්ධ වෙමු',
    bookingForm: 'වෙන්කිරීම් පෝරමය',
    fullName: 'සම්පූර්ණ නම',
    email: 'විද්‍යුත් තැපෑල',
    phone: 'දුරකථනය',
    serviceType: 'සේවා වර්ගය',
    selectService: 'සේවාවක් තෝරන්න',
    startDate: 'ආරම්භක දිනය',
    endDate: 'අවසාන දිනය',
    numberOfPeople: 'පුද්ගලයින් ගණන',
    specialRequests: 'විශේෂ ඉල්ලීම්',
    submitBooking: 'වෙන්කිරීම ඉදිරිපත් කරන්න',
    estimatedPrice: 'ඇස්තමේන්තුගත මිල',
    
    // Contact Page
    contactHeroTitle: 'අප හා සම්බන්ධ වන්න',
    contactHeroSubtitle: 'ඔබේ පරිපූර්ණ ශ්‍රී ලාංකික වික්‍රමය සැලසුම් කිරීමට අපි මේහි සිටිමු',
    contactInfo: 'සම්බන්ධතා තෝරතුරු',
    phoneNumber: 'දුරකතනය',
    whatsapp: 'WhatsApp',
    emailAddress: 'විද්‍යුත් තැපැල',
    sendUsMessage: 'අපට පණිවිඩයක් යවන්න',
    yourName: 'ඔබේ නම',
    yourEmail: 'ඔබේ විද්‍යුත් තැපැල',
    subject: 'විෂයය',
    message: 'පණිවිඩය',
    sendMessage: 'පණිවිඩය යවන්න',
    findUs: 'අපව සෝයා ගන්න',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['en', 'ja', 'de', 'si'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
