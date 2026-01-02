'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ja' | 'de';

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
    phoneWhatsapp: 'Phone/WhatsApp',
    serviceType: 'Service Type',
    selectService: 'Select a service',
    startDate: 'Start Date',
    endDate: 'End Date',
    pickupDate: 'Pickup Date',
    returnDate: 'Return Date',
    numberOfPeople: 'Number of People',
    specialRequests: 'Special Requests',
    notes: 'Notes',
    submitBooking: 'Submit Booking',
    requestBooking: 'Request Booking',
    estimatedPrice: 'Estimated Price',
    pricingPlans: 'Pricing Plans',
    confirmAvailability: "We'll confirm availability and final price by email/WhatsApp.",
    anythingKnow: 'Anything we should know?',
    namePlaceholder: 'Jane Doe',
    emailPlaceholder: 'jane@example.com',
    phonePlaceholder: '+1 555 123 4567',
    bestValuePlan: 'Best value',
    
    // Contact Page
    contactHeroTitle: 'Get in Touch',
    contactHeroSubtitle: 'We are here to help you plan your perfect Sri Lankan adventure',
    contactInfo: 'Contact Information',
    phoneNumber: 'Phone',
    whatsapp: 'WhatsApp',
    whatsappChat: 'WhatsApp Chat',
    emailAddress: 'Email',
    sendUsMessage: 'Send us a Message',
    yourName: 'Your Name',
    name: 'Name',
    yourEmail: 'Your Email',
    subject: 'Subject',
    message: 'Message',
    sendMessage: 'Send Message',
    findUs: 'Find Us',
    howCanHelp: 'How can we help?',
    yourNamePlaceholder: 'Your name',
    emailPlaceholder2: 'you@example.com',
    
    // Vehicle Features
    virtualCockpit: 'Virtual Cockpit',
    ledHeadlights: 'LED Headlights',
    parkingSensors: 'Parking Sensors',
    carPlay: 'Apple CarPlay / Android Auto',
    bootSpace: '405 L Boot',
    multipleClasses: 'Multiple Classes',
    flexiblePricing: 'Flexible Pricing',
    modernSafety: 'Modern Safety Tech',
    compactSuv: 'Compact SUV',
    fleetExpansion: 'Fleet Expansion',
    newModelsAdded: 'New models will be added shortly',
    moreVehiclesComing: 'More Vehicles Coming Soon',
    available: 'Available',
    comingSoon: 'Coming Soon',
    
    // Service Descriptions
    selfDriveTitle: 'Self-Drive',
    selfDriveDesc: 'Require local licence + IDP if visitor',
    driverTitle: 'Driver',
    driverDesc: 'Driver provided — seating reduced to 4 adults + 1 child',
    driverGuideTitle: 'Driver-Guide',
    driverGuideDesc: 'Driver can act as guide — add guide fee on request',
    airportTransferTitle: 'Airport Transfers',
    airportTransferDesc: 'Pickups & Drops — add flight details in booking',
    
    // Tour Highlights
    whyChooseTours: 'Why Choose Our Tours',
    customItineraries: 'Custom Itineraries',
    customItinerariesDesc: 'Tailored routes based on your interests and schedule',
    expertGuides: 'Expert Guides',
    expertGuidesDesc: 'Knowledgeable local guides who speak multiple languages',
    culturalImmersion: 'Cultural Immersion',
    culturalImmersionDesc: 'Authentic experiences at temples, markets, and villages',
    photoOpportunities: 'Photo Opportunities',
    photoOpportunitiesDesc: 'Stops at the most scenic and Instagram-worthy locations',
    
    // Vehicle Specifications
    featuresSpecs: 'Features & Specifications',
    comfortConfig: 'Comfort configuration: driver + 4 passengers (4 adults + 1 child in booster/child seat). When a driver or driver‑guide is selected, the usable passenger seats are 4 adults + 1 child; driver occupies the front seat.',
    powertrainSpec: 'Powertrain: 1.4 TFSI turbo petrol with 7‑speed S tronic (FWD)',
    lightingSpec: 'Lighting: LED daytime running lights; LED headlights (trim dependent)',
    cabinTechSpec: 'Cabin tech: Audi Virtual Cockpit, MMI 7" display, Bluetooth',
    safetySpec: 'Safety: 6 airbags, ABS, ESC, ISOFIX child‑seat mounts',
    assistsSpec: 'Assists: rear parking sensors; cruise control',
    practicalitySpec: 'Practicality: approx. 405 L boot (rear seats up)',
    
    // Pricing Page Additional
    whatsIncluded: "What's Included",
    validLicense: "Valid driver's license required",
    securityDeposit: 'Security deposit refundable',
    comprehensiveInsurance: 'Comprehensive insurance coverage',
    gpsIncluded: 'GPS navigation included',
    childSeats: 'Child seats available on request',
    airportPickup: 'Airport pickup/drop-off available',
    paymentOptions: 'Multiple payment options accepted',
    cancellation: 'Cancel up to 48 hours for full refund',
    readyToBook: 'Ready to Book?',
    getStartedAdventure: 'Get started with your Sri Lankan adventure today.',
    pricingDisclaimer: 'Security deposit and ID required. Fuel and tolls not included. Prices are placeholders — update to your rates.',
    serviceArea: 'Service Area',
    
    // Gallery Page CTA
    createMemories: 'Create Your Own Memories',
    bookAdventure: 'Book your Sri Lanka adventure today and capture unforgettable moments.',
    bookYourTour: 'Book Your Tour',
    
    // Testimonials Page CTA
    joinHappyTravelers: 'Join Our Happy Travelers',
    startCreatingMemories: 'Start creating your own unforgettable memories in Sri Lanka.',
    bookYourJourney: 'Book Your Journey',
    
    // Popular Destinations
    sigiriyaRock: 'Sigiriya Rock Fortress',
    galleFort: 'Galle Fort',
    templeOfTooth: 'Temple of the Tooth',
    yalaPark: 'Yala National Park',
    ellaRock: 'Ella Rock',
    mirissaBeach: 'Mirissa Beach',
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
    phoneWhatsapp: '電話/WhatsApp',
    serviceType: 'サービスタイプ',
    selectService: 'サービスを選択',
    startDate: '開始日',
    endDate: '終了日',
    pickupDate: 'ピックアップ日',
    returnDate: '返却日',
    numberOfPeople: '人数',
    specialRequests: '特別なリクエスト',
    notes: 'メモ',
    submitBooking: '予約を送信',
    requestBooking: '予約をリクエスト',
    estimatedPrice: '推定価格',
    pricingPlans: '料金プラン',
    confirmAvailability: 'メール/WhatsAppで利用可能性と最終価格を確認します。',
    anythingKnow: '何か知っておくべきことはありますか？',
    namePlaceholder: '山田 太郎',
    emailPlaceholder: 'taro@example.com',
    phonePlaceholder: '+81 90 1234 5678',
    bestValuePlan: '最高の価値',
    
    // Contact Page
    contactHeroTitle: 'お問い合わせ',
    contactHeroSubtitle: '完璧なスリランカの冒険を計画するお手伝いをします',
    contactInfo: '連絡先情報',
    phoneNumber: '電話',
    whatsapp: 'WhatsApp',
    whatsappChat: 'WhatsAppチャット',
    emailAddress: 'メール',
    sendUsMessage: 'メッセージを送る',
    yourName: 'お名前',
    name: '名前',
    yourEmail: 'メールアドレス',
    subject: '件名',
    message: 'メッセージ',
    sendMessage: 'メッセージを送る',
    findUs: '場所',
    howCanHelp: 'どのようにお手伝いできますか？',
    yourNamePlaceholder: 'お名前',
    emailPlaceholder2: 'you@example.com',
    
    // Vehicle Features
    virtualCockpit: 'バーチャルコックピット',
    ledHeadlights: 'LEDヘッドライト',
    parkingSensors: 'パーキングセンサー',
    carPlay: 'Apple CarPlay / Android Auto',
    bootSpace: '405 Lトランク',
    multipleClasses: '複数クラス',
    flexiblePricing: '柔軟な料金',
    modernSafety: '最新の安全技術',
    compactSuv: 'コンパクトSUV',
    fleetExpansion: 'フリート拡張',
    newModelsAdded: '新しいモデルを間もなく追加',
    moreVehiclesComing: 'より多くの車両が近日公開',
    available: '利用可能',
    comingSoon: '近日公開',
    
    // Service Descriptions
    selfDriveTitle: 'セルフドライブ',
    selfDriveDesc: '現地の免許証+訪問者の場合はIDP必要',
    driverTitle: 'ドライバー',
    driverDesc: 'ドライバー付き — 大人4名+子供1名に座席削減',
    driverGuideTitle: 'ドライバー兼ガイド',
    driverGuideDesc: 'ドライバーがガイドとして機能 — リクエストでガイド料金追加',
    airportTransferTitle: '空港送迎',
    airportTransferDesc: '送迎サービス — 予約時にフライト詳細を追加',
    
    // Tour Highlights
    whyChooseTours: '私たちのツアーを選ぶ理由',
    customItineraries: 'カスタム旅程',
    customItinerariesDesc: 'ご興味とスケジュールに合わせたルート',
    expertGuides: '専門ガイド',
    expertGuidesDesc: '複数の言語を話す知識豊富な地元ガイド',
    culturalImmersion: '文化体験',
    culturalImmersionDesc: '寺院、市場、村での本物の体験',
    photoOpportunities: '写真撮影の機会',
    photoOpportunitiesDesc: '最も絶景でInstagram映えする場所での停車',
    
    // Vehicle Specifications
    featuresSpecs: '機能と仕様',
    comfortConfig: '快適な構成：運転手 + 4名の乗客（大人4名 + ブースター/チャイルドシートの子供1名）。ドライバーまたはドライバーガイドを選択した場合、利用可能な乗客席は大人4名 + 子供1名です。運転手は前席に着席します。',
    powertrainSpec: 'パワートレイン：1.4 TFSIターボペトロル・7速S tronic（FWD）',
    lightingSpec: 'ライト：LEDデイタイムランニングライト、LEDヘッドライト（トリムによる）',
    cabinTechSpec: 'キャビン技術：Audi Virtual Cockpit、MMI 7"ディスプレイ、Bluetooth',
    safetySpec: '安全性：6エアバッグ、ABS、ESC、ISOFIXチャイルドシートマウント',
    assistsSpec: 'アシスト：リアパーキングセンサー、クルーズコントロール',
    practicalitySpec: '実用性：約405 Lトランク（リアシートアップ時）',
    
    // Pricing Page Additional
    whatsIncluded: '含まれるもの',
    validLicense: '有効な運転免許証が必要',
    securityDeposit: '保証金は返金可能',
    comprehensiveInsurance: '包括的な保険適用',
    gpsIncluded: 'GPSナビゲーション付き',
    childSeats: 'チャイルドシートリクエスト可能',
    airportPickup: '空港送迎利用可能',
    paymentOptions: '複数の支払いオプション利用可能',
    cancellation: '48時間前までのキャンセルで全額返金',
    readyToBook: '予約の準備はできましたか？',
    getStartedAdventure: '今日からスリランカの冒険を始めましょう。',
    pricingDisclaimer: '保証金とIDが必要です。燃料と通行料は含まれていません。価格はプレースホルダーです — 料金を更新してください。',
    serviceArea: 'サービスエリア',
    
    // Gallery Page CTA
    createMemories: '自分だけの思い出を作ろう',
    bookAdventure: '今日スリランカの冒険を予約して、忘れられない瞬間をキャプチャしましょう。',
    bookYourTour: 'ツアーを予約',
    
    // Testimonials Page CTA
    joinHappyTravelers: '幸せな旅行者に参加',
    startCreatingMemories: 'スリランカで忘れられない思い出を作り始めましょう。',
    bookYourJourney: '旅を予約',
    
    // Popular Destinations
    sigiriyaRock: 'シギリヤ・ロック・フォートレス',
    galleFort: 'ゴール・フォート',
    templeOfTooth: '仏歯寺',
    yalaPark: 'ヤーラ国立公園',
    ellaRock: 'エッラ・ロック',
    mirissaBeach: 'ミリッサビーチ',
    
    // Footer
    copyright: '著作権所有。',
    mediaDisclaimer: 'メディアはプレースホルダーです。製作前にライセンスされたスリランカの映像に置き換えてください。',
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
    phoneWhatsapp: 'Telefon/WhatsApp',
    serviceType: 'Servicetyp',
    selectService: 'Service auswählen',
    startDate: 'Startdatum',
    endDate: 'Enddatum',
    pickupDate: 'Abholdatum',
    returnDate: 'Rückgabedatum',
    numberOfPeople: 'Anzahl der Personen',
    specialRequests: 'Besondere Wünsche',
    notes: 'Notizen',
    submitBooking: 'Buchung absenden',
    requestBooking: 'Buchung anfordern',
    estimatedPrice: 'Geschätzter Preis',
    pricingPlans: 'Preispläne',
    confirmAvailability: 'Wir bestätigen Verfügbarkeit und Endpreis per E-Mail/WhatsApp.',
    anythingKnow: 'Sollten wir etwas wissen?',
    namePlaceholder: 'Max Mustermann',
    emailPlaceholder: 'max@example.com',
    phonePlaceholder: '+49 151 1234 5678',
    bestValuePlan: 'Bester Wert',
    
    // Contact Page
    contactHeroTitle: 'Kontaktieren Sie uns',
    contactHeroSubtitle: 'Wir helfen Ihnen gerne, Ihr perfektes sri-lankisches Abenteuer zu planen',
    contactInfo: 'Kontaktinformationen',
    phoneNumber: 'Telefon',
    whatsapp: 'WhatsApp',
    whatsappChat: 'WhatsApp Chat',
    emailAddress: 'E-Mail',
    sendUsMessage: 'Senden Sie uns eine Nachricht',
    yourName: 'Ihr Name',
    name: 'Name',
    yourEmail: 'Ihre E-Mail',
    subject: 'Betreff',
    message: 'Nachricht',
    sendMessage: 'Nachricht senden',
    findUs: 'Finden Sie uns',
    howCanHelp: 'Wie können wir helfen?',
    yourNamePlaceholder: 'Ihr Name',
    emailPlaceholder2: 'sie@example.com',
    
    // Vehicle Features
    virtualCockpit: 'Virtuelles Cockpit',
    ledHeadlights: 'LED-Scheinwerfer',
    parkingSensors: 'Parksensoren',
    carPlay: 'Apple CarPlay / Android Auto',
    bootSpace: '405 L Kofferraum',
    multipleClasses: 'Mehrere Klassen',
    flexiblePricing: 'Flexible Preisgestaltung',
    modernSafety: 'Moderne Sicherheitstechnik',
    compactSuv: 'Kompakt-SUV',
    fleetExpansion: 'Flottenerweiterung',
    newModelsAdded: 'Neue Modelle werden in Kürze hinzugefügt',
    moreVehiclesComing: 'Weitere Fahrzeuge in Kürze',
    available: 'Verfügbar',
    comingSoon: 'Demnächst',
    
    // Service Descriptions
    selfDriveTitle: 'Selbstfahrer',
    selfDriveDesc: 'Lokaler Führerschein + IDP erforderlich für Besucher',
    driverTitle: 'Mit Fahrer',
    driverDesc: 'Fahrer inklusive — Sitzplätze reduziert auf 4 Erwachsene + 1 Kind',
    driverGuideTitle: 'Fahrer-Reiseführer',
    driverGuideDesc: 'Fahrer kann als Reiseführer fungieren — Führergebühr auf Anfrage',
    airportTransferTitle: 'Flughafentransfers',
    airportTransferDesc: 'Abholungen & Absetzungen — Flugdetails bei Buchung hinzufügen',
    
    // Tour Highlights
    whyChooseTours: 'Warum unsere Touren wählen',
    customItineraries: 'Individuelle Routen',
    customItinerariesDesc: 'Maßgeschneiderte Routen basierend auf Ihren Interessen und Zeitplan',
    expertGuides: 'Expertenleitfäden',
    expertGuidesDesc: 'Sachkundige lokale Führer, die mehrere Sprachen sprechen',
    culturalImmersion: 'Kulturelles Eintauchen',
    culturalImmersionDesc: 'Authentische Erlebnisse in Tempeln, Märkten und Dörfern',
    photoOpportunities: 'Fotomöglichkeiten',
    photoOpportunitiesDesc: 'Stopps an den malerischsten und Instagram-würdigen Orten',
    
    // Vehicle Specifications
    featuresSpecs: 'Funktionen & Spezifikationen',
    comfortConfig: 'Komfortkonfiguration: Fahrer + 4 Passagiere (4 Erwachsene + 1 Kind in Kindersitz). Wenn ein Fahrer oder Fahrer-Reiseführer ausgewählt wird, sind die nutzbaren Passagiersitze 4 Erwachsene + 1 Kind; Fahrer besetzt den Vordersitz.',
    powertrainSpec: 'Antrieb: 1,4 TFSI Turbobenziner mit 7-Gang S tronic (FWD)',
    lightingSpec: 'Beleuchtung: LED-Tagfahrlicht; LED-Scheinwerfer (trim-abhängig)',
    cabinTechSpec: 'Kabinentechnik: Audi Virtual Cockpit, MMI 7" Display, Bluetooth',
    safetySpec: 'Sicherheit: 6 Airbags, ABS, ESC, ISOFIX-Kindersitzbefestigungen',
    assistsSpec: 'Assistenzsysteme: hintere Parksensoren; Tempomat',
    practicalitySpec: 'Praktikabilität: ca. 405 L Kofferraum (Rücksitze oben)',
    
    // Pricing Page Additional
    whatsIncluded: 'Was ist inbegriffen',
    validLicense: 'Gültiger Führerschein erforderlich',
    securityDeposit: 'Kaution wird zurückerstattet',
    comprehensiveInsurance: 'Umfassender Versicherungsschutz',
    gpsIncluded: 'GPS-Navigation inklusive',
    childSeats: 'Kindersitze auf Anfrage erhältlich',
    airportPickup: 'Flughafen-Abholung/-Absetzung verfügbar',
    paymentOptions: 'Mehrere Zahlungsoptionen akzeptiert',
    cancellation: 'Stornierung bis 48 Stunden für volle Rückerstattung',
    readyToBook: 'Bereit zu buchen?',
    getStartedAdventure: 'Beginnen Sie noch heute mit Ihrem sri-lankischen Abenteuer.',
    pricingDisclaimer: 'Kaution und Ausweis erforderlich. Kraftstoff und Mautgebühren nicht inbegriffen. Preise sind Platzhalter — aktualisieren Sie Ihre Tarife.',
    serviceArea: 'Servicegebiet',
    
    // Gallery Page CTA
    createMemories: 'Schaffen Sie Ihre eigenen Erinnerungen',
    bookAdventure: 'Buchen Sie noch heute Ihr Sri Lanka-Abenteuer und halten Sie unvergessliche Momente fest.',
    bookYourTour: 'Tour buchen',
    
    // Testimonials Page CTA
    joinHappyTravelers: 'Werden Sie Teil unserer glücklichen Reisenden',
    startCreatingMemories: 'Beginnen Sie, Ihre eigenen unvergesslichen Erinnerungen in Sri Lanka zu schaffen.',
    bookYourJourney: 'Ihre Reise buchen',
    
    // Popular Destinations
    sigiriyaRock: 'Sigiriya-Felsenfestung',
    galleFort: 'Galle Fort',
    templeOfTooth: 'Zahntempel',
    yalaPark: 'Yala-Nationalpark',
    ellaRock: 'Ella Rock',
    mirissaBeach: 'Mirissa Beach',
    
    // Footer
    copyright: 'Alle Rechte vorbehalten.',
    mediaDisclaimer: 'Medien sind Platzhalter. Vor der Produktion durch lizenziertes Sri Lanka-Material ersetzen.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['en', 'ja', 'de'].includes(saved)) {
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
