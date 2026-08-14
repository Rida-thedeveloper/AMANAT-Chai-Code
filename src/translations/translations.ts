export type Language = 'en' | 'ur';

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    ur: string;
  };
}

export const translations: TranslationDictionary = {
  // Brand & General
  brandName: {
    en: 'Amanat',
    ur: 'امانت'
  },
  brandTagline: {
    en: 'Real-Time Aid Tracking',
    ur: 'عطیات کی لائیو ٹریکنگ'
  },
  urduMotto: {
    en: '“Aapki amanat, sahi haathon tak.”',
    ur: '”آپ کی امانت، صحیح ہاتھوں تک۔“'
  },
  urduSubtitle: {
    en: 'End-to-end aid transparency and direct delivery verification for every family in need.',
    ur: 'عطیات کی مکمل شفافیت اور مستحق خاندان تک ترسیل کی براہِ راست تصدیق'
  },
  zeroLeakageGuarantee: {
    en: 'Zero Leakage Guarantee',
    ur: 'شفافیت اور صفر ضیاع کی ضمانت'
  },

  // Navbar
  navProblemSolution: {
    en: 'Problem & Solution',
    ur: 'مسئلہ اور حل'
  },
  navHowItWorks: {
    en: 'How It Works',
    ur: 'طریقہ کار'
  },
  navLiveTracking: {
    en: 'Live Tracking',
    ur: 'لائیو ٹریکنگ'
  },
  navActiveDrives: {
    en: 'Active Relief Drives',
    ur: 'فعال امدادی مہمات'
  },
  navTransparency: {
    en: 'Transparency',
    ur: 'شفافیت کا نظام'
  },
  navPartners: {
    en: 'Partner NGOs',
    ur: 'شراکت دار تنظیمیں'
  },
  navDonateNow: {
    en: 'DONATE NOW',
    ur: 'ابھی عطیہ دیں'
  },
  navSearchPlaceholder: {
    en: 'Search Tracking ID (e.g. AMT-8821)...',
    ur: 'ٹریکنگ آئی ڈی تلاش کریں (مثلاً AMT-8821)...'
  },
  navTrackBtn: {
    en: 'Track',
    ur: 'ٹریک کریں'
  },

  // Hero Section
  heroPreBadge: {
    en: 'Real-Time Aid Tracking',
    ur: 'امدادی عطیات کا لائیو ٹریکنگ سسٹم'
  },
  heroHeadlineMain: {
    en: 'Your donation. Its journey.',
    ur: 'آپ کا عطیہ۔ اس کا سفر۔'
  },
  heroHeadlineHighlight: {
    en: 'Always visible.',
    ur: 'ہمیشہ آپ کی نظروں کے سامنے۔'
  },
  heroSupportingText: {
    en: 'Track your donation from the moment you give it to the moment it is delivered and verified.',
    ur: 'اپنے عطیہ کو ادائیگی کے لمحے سے لے کر مستحق تک پہنچنے اور تصدیق ہونے تک مکمل ٹریک کریں۔'
  },
  heroBtnDonateTrack: {
    en: 'Donate & Track',
    ur: 'عطیہ دیں اور ٹریک کریں'
  },
  heroBtnTrackDonation: {
    en: 'Track a Donation',
    ur: 'اپنا عطیہ ٹریک کریں'
  },
  heroBtnTryDemo: {
    en: 'Try Demo',
    ur: 'ڈیمو دیکھیں'
  },
  heroTrustMessage: {
    en: 'Your donation journey stays transparent.',
    ur: 'آپ کے عطیہ کا سفر ہمیشہ شفاف رہتا ہے۔'
  },
  heroSearchPlaceholder: {
    en: 'Enter Tracking ID (e.g. AMT-2026-FLOOD-8821)',
    ur: 'ٹریکنگ آئی ڈی درج کریں (مثلاً AMT-2026-FLOOD-8821)'
  },
  heroSearchAction: {
    en: 'Track Aid',
    ur: 'ٹریک کریں'
  },

  // Problem / Solution Section
  psBadge: {
    en: 'The Trust Gap in Aid',
    ur: 'امدادی نظام میں اعتماد کا فقدان'
  },
  psHeading: {
    en: 'After you donate, what happens?',
    ur: 'عطیہ دینے کے بعد کیا ہوتا ہے؟'
  },
  psSubheading: {
    en: 'Traditional donations disappear into a black box. Amanat replaces uncertainty with end-to-end chain of custody.',
    ur: 'روایتی عطیات کے بعد کوئی خبر نہیں ملتی۔ امانت اس بے یقینی کو مکمل اور محفوظ ٹریکنگ سے بدلتی ہے۔'
  },
  psTraditionalTitle: {
    en: 'Traditional Charity',
    ur: 'روایتی خیراتی نظام'
  },
  psTraditionalSubtitle: {
    en: 'The Black Box',
    ur: 'غیر واضح اور مبہم نظام'
  },
  psTradStep1Title: {
    en: 'Donate',
    ur: 'عطیہ کی ادائیگی'
  },
  psTradStep1Desc: {
    en: 'You transfer funds or hand over cash.',
    ur: 'آپ نے فنڈز منتقل کیے یا رقم جمع کروائی۔'
  },
  psTradQuestion1: {
    en: 'Where did my money go?',
    ur: 'میری رقم کہاں گئی؟'
  },
  psTradStep2Title: {
    en: 'Zero Updates / General Fund',
    ur: 'کوئی معلومات نہیں / جنرل فنڈ'
  },
  psTradStep2Desc: {
    en: 'No receipt ID, no ration allotment tracking.',
    ur: 'نہ کوئی رسید، نہ راشن کی تقسیم کا کوئی پتہ۔'
  },
  psTradQuestion2: {
    en: 'Did the ration actually reach someone?',
    ur: 'کیا راشن واقعی کسی مستحق تک پہنچا؟'
  },
  psTradStep3Title: {
    en: 'Unverifiable Distribution',
    ur: 'ناقابلِ تصدیق تقسیم'
  },
  psTradStep3Desc: {
    en: 'Relying on vague annual reports without proof.',
    ur: 'صرف سالانہ غیر مصدقہ رپورٹس پر انحصار۔'
  },
  psTradResult: {
    en: 'Result: High donor hesitation and trust fatigue.',
    ur: 'نتیجہ: عطیہ دہندگان کا عدم اعتماد اور شکوک و شبہات۔'
  },

  // Amanat Solution Box
  psSolutionBadge: {
    en: 'Amanat Standard',
    ur: 'امانت کا شفاف معیار'
  },
  psSolutionSubtitle: {
    en: '100% Trackable Journey',
    ur: 'مکمل قابلِ ٹریک سفر'
  },
  psSolStep1Title: {
    en: 'Donate',
    ur: 'عطیہ دیں'
  },
  psSolStep1Desc: {
    en: 'Unique tracking ID generated immediately.',
    ur: 'ادائیگی ہوتے ہی منفرد ٹریکنگ آئی ڈی جاری ہوتی ہے۔'
  },
  psSolStep1Badge: {
    en: 'ID ISSUED',
    ur: 'آئی ڈی جاری'
  },
  psSolStep2Title: {
    en: 'Track',
    ur: 'ٹریک کریں'
  },
  psSolStep2Desc: {
    en: 'Live warehouse allotment, packaging & transit GPS.',
    ur: 'گودام میں پیکنگ اور لائیو جی پی ایس ٹریکنگ۔'
  },
  psSolStep2Badge: {
    en: 'LIVE STATUS',
    ur: 'لائیو صورتحال'
  },
  psSolStep3Title: {
    en: 'Deliver',
    ur: 'ترسیل'
  },
  psSolStep3Desc: {
    en: 'Verified ground volunteer brings ration to doorstep.',
    ur: 'تصدیق شدہ رضاکار راشن گھر کی دہلیز تک پہنچاتا ہے۔'
  },
  psSolStep3Badge: {
    en: 'VOLUNTEER',
    ur: 'رضاکار'
  },
  psSolStep4Title: {
    en: 'Verify',
    ur: 'تصدیق'
  },
  psSolStep4Desc: {
    en: 'Recipient confirms delivery using OTP.',
    ur: 'مستحق او ٹی پی کوڈ سے راشن وصولی کی تصدیق کرتا ہے۔'
  },
  psSolStep4Badge: {
    en: 'OTP CONFIRMED',
    ur: 'او ٹی پی تصدیق شدہ'
  },
  psSolResult: {
    en: 'Zero leakage • Cryptographic transparency',
    ur: 'صفر ضیاع • مکمل ڈیجیٹل و تصویری شفافیت'
  },
  psSolViewDemo: {
    en: 'View Sample Track',
    ur: 'نمونہ ٹریک دیکھیں'
  },

  // How Amanat Works Section (4 Simple Steps)
  howBadge: {
    en: 'Simple 4-Step Process',
    ur: 'آسان 4 مرحلہ وار نظام'
  },
  howHeading: {
    en: 'How Amanat Works',
    ur: 'امانت کیسے کام کرتی ہے؟'
  },
  howSubheading: {
    en: 'From the moment your aid is pledged to the verified receipt in a beneficiary’s hands.',
    ur: 'آپ کے عطیہ دینے سے لے کر مستحق کے ہاتھوں تک پہنچنے کا مکمل شفاف عمل۔'
  },
  howStep1Title: {
    en: 'Donate',
    ur: 'عطیہ دیں'
  },
  howStep1Desc: {
    en: 'Create a donation and receive a unique tracking ID.',
    ur: 'عطیہ جمع کروائیں اور فوراً اپنی منفرد ٹریکنگ آئی ڈی حاصل کریں۔'
  },
  howStep1Detail: {
    en: 'Instantly tied to a physical ration bag allocation with QR code tag.',
    ur: 'کیو آر کوڈ کے ذریعے راشن پیکج براہِ راست مختص کیا جاتا ہے۔'
  },
  howStep1Badge: {
    en: 'ID GENERATED',
    ur: 'آئی ڈی جاری'
  },

  howStep2Title: {
    en: 'Track',
    ur: 'ٹریک کریں'
  },
  howStep2Desc: {
    en: 'Follow the donation journey.',
    ur: 'عطیہ اور راشن کے مکمل سفر پر نظر رکھیں۔'
  },
  howStep2Detail: {
    en: 'View procurement, warehouse packaging, convoy dispatch, and road checkpoints.',
    ur: 'سامان کی خریداری، پیکنگ اور گاڑی کی روانگی کے لائیو اپ ڈیٹس۔'
  },
  howStep2Badge: {
    en: 'LIVE UPDATES',
    ur: 'لائیو اپ ڈیٹ'
  },

  howStep3Title: {
    en: 'Deliver',
    ur: 'ترسیل'
  },
  howStep3Desc: {
    en: 'A volunteer delivers the ration.',
    ur: 'میدانی رضاکار راشن مستحق خاندان تک پہنچاتا ہے۔'
  },
  howStep3Detail: {
    en: 'Dedicated local volunteers navigate rural flood routes and urban districts.',
    ur: 'مقامی تصدیق شدہ رضاکار سیلاب زدہ یا دور دراز علاقوں میں ترسیل کرتے ہیں۔'
  },
  howStep3Badge: {
    en: 'GROUND VOLUNTEER',
    ur: 'میدانی رضاکار'
  },

  howStep4Title: {
    en: 'Verify',
    ur: 'حتمی تصدیق'
  },
  howStep4Desc: {
    en: 'The recipient confirms delivery using OTP.',
    ur: 'مستحق موبائل او ٹی پی (OTP) سے وصولی کی تصدیق کرتا ہے۔'
  },
  howStep4Detail: {
    en: 'One-Time Password sent to recipient mobile + geotagged photographic confirmation.',
    ur: 'مستحق کے فون پر بھیجا گیا ون ٹائم پاسورڈ اور تصدیقی ریکارڈ۔'
  },
  howStep4Badge: {
    en: 'OTP & AUDIT',
    ur: 'او ٹی پی و آڈٹ'
  },

  howBannerTitle: {
    en: 'Want to see a live tracked ration bag in Sindh flood relief?',
    ur: 'کیا آپ سندھ سیلاب ریلیف میں لائیو ٹریک شدہ راشن بیگ دیکھنا چاہتے ہیں؟'
  },
  howBannerDesc: {
    en: 'Explore real dispatch logs, GPS coordinates, volunteer details, and OTP audit receipt.',
    ur: 'حقیقی ترسیل کے لاگز، جی پی ایس کوآرڈینیٹس اور او ٹی پی رسید دیکھیں۔'
  },
  howBannerBtn: {
    en: 'Open Sample Journey',
    ur: 'نمونہ سفر کھولیں'
  },

  // Courier Visual Section
  courierBadge: {
    en: 'Live Tracking Interface',
    ur: 'لائیو ٹریکنگ انٹرفیس'
  },
  courierHeading: {
    en: 'Like courier tracking — but for your donation.',
    ur: 'بالکل کوریئر ٹریکنگ کی طرح — لیکن آپ کے عطیات کے لیے۔'
  },
  courierSubheading: {
    en: 'Experience the precision of modern logistics applied to humanitarian aid in Pakistan. Every parcel has a live status, checkpoint audit, and verified recipient.',
    ur: 'جدید لاجسٹکس کی سہولت اب فلاحی امداد کے لیے۔ ہر راشن پیکج کی لائیو لوکیشن اور مصدقہ وصول کنندہ۔'
  },
  courierTabFlood: {
    en: 'Sindh Flood Relief Pack',
    ur: 'سندھ سیلاب ریلیف پیک'
  },
  courierTabRamadan: {
    en: 'Ramadan Rashan Basket',
    ur: 'رمضان راشن باسکٹ'
  },
  courierTabWinter: {
    en: 'Winter Blanket & Food Aid',
    ur: 'موسم سرما راشن و کمبل'
  },
  courierStatusDelivered: {
    en: 'Delivered',
    ur: 'پہنچ گیا'
  },
  courierStatusInTransit: {
    en: 'In Transit',
    ur: 'راستے میں ہے'
  },
  courierStatusAllocated: {
    en: 'Allocated',
    ur: 'مخصوص کر دیا گیا'
  },
  courierManifestTitle: {
    en: 'Live Courier Manifest',
    ur: 'لائیو ترسیل کا منشور'
  },
  courierFullAuditBtn: {
    en: 'Full Audit',
    ur: 'مکمل آڈٹ رپورٹ'
  },
  courierStage1: {
    en: 'Donation Pledged',
    ur: 'عطیہ درج ہوا'
  },
  courierStage1Sub: {
    en: '₨ 19,500 logged via 1Link',
    ur: '1Link کے ذریعے تصدیق شدہ'
  },
  courierStage2: {
    en: 'Ration Box Packed',
    ur: 'راشن پیکنگ مکمل'
  },
  courierStage2Sub: {
    en: 'Items sealed with QR tags',
    ur: 'کیو آر کوڈ کے ساتھ بند پیکج'
  },
  courierStage3: {
    en: 'Convoy Dispatched',
    ur: 'قافلہ روانہ'
  },
  courierStage3Sub: {
    en: 'Field Lead en route to district',
    ur: 'رضاکار قافلہ منزل کی طرف رواں'
  },
  courierStage4: {
    en: 'Beneficiary Handover',
    ur: 'مستحق کو حوالگی'
  },
  courierStage4Sub: {
    en: 'OTP & NADRA Safe Verified',
    ur: 'او ٹی پی اور محفوظ تصدیق'
  },
  courierBagContentTitle: {
    en: 'Ration Bag Content',
    ur: 'راشن بیگ کے اجزاء'
  },
  courierFieldLeadTitle: {
    en: 'Field Lead & Partner NGO',
    ur: 'میدانی سربراہ اور شراکت دار این جی او'
  },
  courierAuditTitle: {
    en: 'Audit & Verification',
    ur: 'آڈٹ اور تصدیقی ریکارڈ'
  },
  courierLeadLabel: {
    en: 'Lead:',
    ur: 'سربراہ:'
  },
  courierPartnerLabel: {
    en: 'Partner:',
    ur: 'تنظیم:'
  },
  courierDestLabel: {
    en: 'Destination:',
    ur: 'منزل:'
  },
  courierFamilyCodeLabel: {
    en: 'Family Code:',
    ur: 'خاندانی کوڈ:'
  },
  courierGpsLabel: {
    en: 'GPS Loc:',
    ur: 'جی پی ایس:'
  },
  courierAuditStatusLabel: {
    en: 'Audit Status:',
    ur: 'آڈٹ کیفیت:'
  },
  courierVerifiedHandover: {
    en: '100% Verified Handover',
    ur: '100% تصدیق شدہ ترسیل'
  },
  courierBottomPrompt: {
    en: 'Want to fund a real family and track it right now?',
    ur: 'کیا آپ کسی مستحق خاندان کی کفالت کر کے اسے ابھی ٹریک کرنا چاہتے ہیں؟'
  },
  courierBottomCta: {
    en: 'Donate & Get Your Own Tracking ID',
    ur: 'عطیہ دیں اور اپنی ٹریکنگ آئی ڈی حاصل کریں'
  },

  // Active Campaigns
  campBadge: {
    en: 'Verified Relief Campaigns',
    ur: 'مصدقہ امدادی مہمات'
  },
  campHeading: {
    en: 'Urgent Relief Campaigns in Pakistan',
    ur: 'پاکستان میں جاری فوری امدادی مہمات'
  },
  campSubheading: {
    en: 'Real-time tracking and reporting for every rupee donated to active relief drives.',
    ur: 'ہر مہم میں شامل عطیات کی لمحہ بہ لمحہ رپورٹنگ اور ٹریکنگ'
  },
  campPolicyTitle: {
    en: '100% Direct Impact Policy:',
    ur: '100% براہِ راست امداد کی پالیسی:'
  },
  campPolicyDesc: {
    en: 'Every rupee is earmarked for tangible ration bags with zero administrative cuts.',
    ur: 'ہر روپیہ بغیر کسی کٹوتی کے براہِ راست مستحقین کے راشن بیگز کے لیے مختص ہے۔'
  },
  campHighEmergency: {
    en: '🔴 High Emergency',
    ur: '🔴 ہنگامی صورتحال'
  },
  campActiveDrive: {
    en: 'Active Drive',
    ur: 'فعال مہم'
  },
  campLocationsLabel: {
    en: 'Locations:',
    ur: 'علاقے:'
  },
  campPartnerLabel: {
    en: 'Verified Field Partner:',
    ur: 'تصدیق شدہ شراکت دار:'
  },
  campRationBagsFunded: {
    en: 'Ration Bags Funded',
    ur: 'راشن بیگز مکمل ہوئے'
  },
  campGoal: {
    en: 'Target Goal:',
    ur: 'ہدف:'
  },
  campBags: {
    en: 'Bags',
    ur: 'بیگز'
  },
  campFamiliesBenefited: {
    en: 'Families Verified & Fed:',
    ur: 'مستفید خاندان:'
  },
  campFamilies: {
    en: 'Families',
    ur: 'خاندان'
  },
  campBtnDonate: {
    en: 'Fund This Campaign',
    ur: 'اس مہم کے لیے عطیہ دیں'
  },
  campBtnTrackSample: {
    en: 'Track Sample Aid',
    ur: 'نمونہ امداد ٹریک کریں'
  },

  // Transparency & Audit Section
  transBadge: {
    en: 'Zero-Leakage Assurance',
    ur: 'صفر ضیاع کی مکمل یقین دہانی'
  },
  transHeading: {
    en: 'Built to solve Pakistan’s relief trust deficit',
    ur: 'پاکستان میں امدادی نظام کے اعتماد کی بحالی'
  },
  transSubheading: {
    en: 'We believe donors in Pakistan and overseas Pakistanis deserve complete clarity. No lost sacks, no mysterious fund disappearances.',
    ur: 'ہمیں یقین ہے کہ پاکستان اور بیرونِ ملک مقیم پاکستانیوں کو عطیات کی پائی پائی کا حساب ملنا چاہیے۔'
  },
  pillar1Title: {
    en: 'Geotagged GPS Check-ins',
    ur: 'مقام کی جی پی ایس تصدیق'
  },
  pillar1Desc: {
    en: 'Every convoy dispatch and doorstep distribution event logs real-time latitude/longitude coordinates to prove physical delivery at the exact target village.',
    ur: 'ہر گاڑی کی روانگی اور راشن کی تقسیم پر درست جی پی ایس کوآرڈینیٹس ریکارڈ کیے جاتے ہیں۔'
  },
  pillar2Title: {
    en: 'Proof-of-Delivery Photo Trail',
    ur: 'تصویری ثبوت اور ریکارڈ'
  },
  pillar2Desc: {
    en: 'Photographic records of sealed ration packages with tamper-evident QR serial numbers ensure goods match high food safety standards before reaching families.',
    ur: 'کیو آر کوڈ سے لیس راشن بیگز کے تصویری ثبوت اور معیار کی مکمل جانچ۔'
  },
  pillar3Title: {
    en: 'CNIC & Token Safe Index',
    ur: 'محفوظ شناختی کارڈ تصدیق'
  },
  pillar3Desc: {
    en: 'Beneficiary families are authenticated via privacy-preserving NADRA tokens to ensure aid reaches authentic needy households without exposing sensitive private details.',
    ur: 'نادرا کے محفوظ ٹوکنز کے ذریعے نجی معلومات کو ظاہر کیے بغیر مستحقین کی تصدیق۔'
  },
  pillar4Title: {
    en: 'Vetted Field Volunteers',
    ur: 'باقاعدہ تصدیق شدہ رضاکار'
  },
  pillar4Desc: {
    en: 'Every volunteer on the ground is ID-verified and bound by strict code-of-conduct audits, preventing unauthorized diversion or hoarding.',
    ur: 'تمام میدانی رضاکار باقاعدہ شناختی تصدیق اور سخت قواعد کے پابند ہوتے ہیں۔'
  },
  transVerifiedStandard: {
    en: 'Verified Standard',
    ur: 'مصدقہ معیار'
  },
  transManifestoTag: {
    en: 'Amanat Core Pledge',
    ur: 'امانت کا بنیادی عہد'
  },
  transManifestoQuote: {
    en: '“Every single rupee accounted for. Every ration bag accounted for.”',
    ur: '”ہر ایک روپے کا حساب۔ ہر ایک راشن بیگ کا شفاف ریکارڈ۔“'
  },
  transManifestoDesc: {
    en: 'Whether you donate PKR 1,000 or PKR 500,000 for flood relief, you will receive your unique Amanat Tracking ID via SMS and Email. You can open Amanat at any moment and watch the journey unfold in real-time.',
    ur: 'خواہ آپ 1,000 روپے دیں یا 500,000 روپے، آپ کو بذریعہ ایس ایم ایس اور ای میل منفرد ٹریکنگ آئی ڈی ملے گی۔ آپ کسی بھی وقت امانت کھول کر لائیو پیش رفت دیکھ سکتے ہیں۔'
  },

  // Partners Section
  partnersBadge: {
    en: 'Vetted Partner Ecosystem',
    ur: 'شراکت دار تنظیموں کا نیٹ ورک'
  },
  partnersHeading: {
    en: 'Collaborating with authentic Pakistani ground partners',
    ur: 'پاکستان کے مستند میدانی اداروں کے ساتھ اشتراک'
  },
  partnersSubheading: {
    en: 'Amanat powers verification software for verified aid networks, ensuring transparency without slowing down relief operations.',
    ur: 'امانت امدادی تنظیموں کو جدید ٹریکنگ سوفٹ ویئر فراہم کر کے شفافیت اور رفتار دونوں کو یقینی بناتی ہے۔'
  },
  partner1Title: {
    en: 'Registered Welfare Trusts',
    ur: 'رجسٹرڈ فلاحی ادارے'
  },
  partner1Desc: {
    en: 'Audited non-profit foundations operating vetted community hubs across Pakistan.',
    ur: 'پاکستان بھر میں کام کرنے والے آڈٹ شدہ اور مصدقہ فلاحی ٹرسٹ۔'
  },
  partner1Badge: {
    en: 'Certified',
    ur: 'مصدقہ'
  },
  partner2Title: {
    en: 'Local Union Council Relief Desks',
    ur: 'یونین کونسل ریلیف ڈیسک'
  },
  partner2Desc: {
    en: 'Grassroots verification units on the ground in rural Sindh, Punjab, KP & Balochistan.',
    ur: 'سندھ، پنجاب، خیبر پختونخوا اور بلوچستان کی مقامی تصدیقی اکائیاں۔'
  },
  partner2Badge: {
    en: 'Direct Field',
    ur: 'میدانی یونٹ'
  },
  partner3Title: {
    en: 'Independent Logistics Fleets',
    ur: 'مستقل ٹرانسپورٹ نیٹ ورک'
  },
  partner3Desc: {
    en: '4x4 flood convoys, snow rescue teams, and urban doorstep distribution vans.',
    ur: 'سیلابی قافلے، برفانی علاقوں کے ریسکیو اور شہری ترسیلی گاڑیاں۔'
  },
  partner3Badge: {
    en: 'GPS Tracked',
    ur: 'جی پی ایس ٹریکڈ'
  },

  // Tracking Detail View / Modal
  trackModalBadge: {
    en: 'Amanat Live Donation Journey',
    ur: 'امانت لائیو امدادی سفر'
  },
  trackModalUrduTag: {
    en: 'امانت ٹریکنگ',
    ur: 'امانت ٹریکنگ'
  },
  trackCopyTooltip: {
    en: 'Copy Tracking ID',
    ur: 'ٹریکنگ آئی ڈی کاپی کریں'
  },
  trackCopied: {
    en: 'Copied!',
    ur: 'کاپی ہو گئی!'
  },
  trackStatusDelivered: {
    en: 'Delivered & Recipient Verified',
    ur: 'راشن پہنچ گیا اور مستحق سے تصدیق شدہ'
  },
  trackStatusDispatched: {
    en: 'Field Volunteer Dispatched',
    ur: 'میدانی رضاکار روانہ ہو چکا ہے'
  },
  trackStatusProcessing: {
    en: 'Processing & Packaging',
    ur: 'پیکنگ اور تیاری جاری ہے'
  },
  trackTotalAid: {
    en: 'Total Aid:',
    ur: 'کل امداد:'
  },
  trackLocation: {
    en: 'Location:',
    ur: 'مقام:'
  },
  trackTabTimeline: {
    en: '6-Stage Journey Timeline',
    ur: '6 مرحلہ وار سفری ٹائم لائن'
  },
  trackTabContents: {
    en: 'Ration Pack Contents',
    ur: 'راشن پیکج کے اجزاء'
  },
  trackTabVolunteer: {
    en: 'Field Volunteer & Area',
    ur: 'میدانی رضاکار اور علاقہ'
  },
  trackTabAudit: {
    en: 'Audit & Transparency Seal',
    ur: 'آڈٹ اور تصدیقی مہر'
  },
  trackChainStatus: {
    en: 'Chain of Custody Status',
    ur: 'تحویل اور ترسیل کی صورتحال'
  },
  trackStepOf: {
    en: 'Completed',
    ur: 'مکمل ہوئے'
  },
  trackLiveSynced: {
    en: 'Live Synced',
    ur: 'براہِ راست مربوط'
  },
  trackBagsFunded: {
    en: 'Bags Funded',
    ur: 'فراہم کردہ بیگز'
  },
  trackFamilyPackDesc: {
    en: 'Standard Family Nutrition Package: Designed to sustain an average family of 6-7 members for 30 days during emergencies.',
    ur: 'خاندانی راشن پیکج: ہنگامی حالات میں 6 سے 7 افراد کے خاندان کے لیے 30 دن کی بنیادی خوراک۔'
  },
  trackWholesaleNote: {
    en: 'All items sourced in bulk at wholesale rates through certified Pakistani millers with zero middleman profit.',
    ur: 'تمام اشیاء براہِ راست ہول سیل ریٹس پر بغیر کسی درمیانی کمیشن کے خریدی گئی ہیں۔'
  },
  trackVolunteerBio: {
    en: 'CNIC & Bio Verified',
    ur: 'شناختی کارڈ و بائیو تصدیق شدہ'
  },
  trackPartnerOrg: {
    en: 'Partner Organization:',
    ur: 'شراکت دار تنظیم:'
  },
  trackTargetUc: {
    en: 'Target Union Council',
    ur: 'ہدف یونین کونسل'
  },
  trackFieldContact: {
    en: 'Direct Field Contact',
    ur: 'میدانی رابطہ'
  },
  trackTamperProofTitle: {
    en: 'Amanat Tamper-Proof Digital Audit',
    ur: 'امانت غیر متزلزل ڈیجیٹل آڈٹ'
  },
  trackLedgerDesc: {
    en: 'Every single transaction is locked in a read-only transparent ledger.',
    ur: 'ہر ٹرانزیکشن ایک محفوظ اور شفاف عوامی کھاتے میں محفوظ ہے۔'
  },
  trackLedgerHash: {
    en: 'Ledger Hash:',
    ur: 'لیجر ہیش:'
  },
  trackNadraToken: {
    en: 'NADRA Safe Token:',
    ur: 'نادرا محفوظ ٹوکن:'
  },
  trackAuditPassed: {
    en: '100% Passed & Verified',
    ur: '100% کامیاب اور تصدیق شدہ'
  },
  trackOtherSamples: {
    en: 'Other samples:',
    ur: 'دیگر نمونے:'
  },
  trackShareBtn: {
    en: 'Share Tracking',
    ur: 'ٹریکنگ شیئر کریں'
  },
  trackCloseBtn: {
    en: 'Close',
    ur: 'بند کریں'
  },

  // Donation Modal
  donateModalTitle: {
    en: 'Donate & Track',
    ur: 'عطیہ دیں اور ٹریک کریں'
  },
  donateModalSubtitle: {
    en: 'Receive your live tracking ID and SMS status updates immediately.',
    ur: 'فوری طور پر اپنی لائیو ٹریکنگ آئی ڈی اور ایس ایم ایس اپ ڈیٹس حاصل کریں۔'
  },
  donateSelectDrive: {
    en: 'Select Verified Relief Drive',
    ur: 'مصدقہ امدادی مہم منتخب کریں'
  },
  donateSelectAmount: {
    en: 'Select Donation Amount',
    ur: 'عطیہ کی رقم منتخب کریں'
  },
  donateCustomAmountPlaceholder: {
    en: 'Or enter custom amount in PKR',
    ur: 'یا اپنی مرضی کی رقم درج کریں (روپے)'
  },
  donateDonorNameLabel: {
    en: 'Your Name / Donor Name',
    ur: 'آپ کا نام / عطیہ دہندہ کا نام'
  },
  donateDonorNamePlaceholder: {
    en: 'e.g. Asad Khan',
    ur: 'مثلاً اسد خان'
  },
  donatePhoneLabel: {
    en: 'Mobile Number (for SMS Tracking)',
    ur: 'موبائل نمبر (ایس ایم ایس ٹریکنگ کے لیے)'
  },
  donateAnonymousCheck: {
    en: 'Keep my name private on public transparency ledger',
    ur: 'عوامی شفافیت کے کھاتے میں میرا نام صیغہ راز میں رکھیں'
  },
  donateGatewayLabel: {
    en: 'Payment Gateway in Pakistan',
    ur: 'پاکستان میں ادائیگی کا ذریعہ'
  },
  donateSubmitBtn: {
    en: 'Confirm & Generate Tracking ID',
    ur: 'تصدیق کریں اور ٹریکنگ آئی ڈی حاصل کریں'
  },
  donateSubmitting: {
    en: 'Generating Your Amanat Tracking ID...',
    ur: 'آپ کی امانت ٹریکنگ آئی ڈی تیار ہو رہی ہے...'
  },
  donateSecurityBadge: {
    en: '🔒 Bank-grade 256-bit encryption • 100% Direct aid distribution guarantee',
    ur: '🔒 بینک گریڈ 256 بٹ انکرپشن • 100% براہِ راست امداد کی ضمانت'
  },

  // Footer
  footerMission: {
    en: 'Pakistan’s open donation transparency & tracking protocol. Ensuring every relief rupee reaches the right hands with proof of delivery.',
    ur: 'پاکستان کا اوپن ڈونیشن ٹرانسپیرنسی و ٹریکنگ پروٹوکول۔ اس بات کی یقین دہانی کہ ہر روپیہ ثبوت کے ساتھ مستحق ہاتھوں تک پہنچے۔'
  },
  footerMadeWith: {
    en: 'Made with care for Pakistan',
    ur: 'پاکستان کے لیے خلوص نیت کے ساتھ'
  },
  footerSampleHeading: {
    en: 'Sample Tracking IDs',
    ur: 'نمونہ ٹریکنگ آئی ڈیز'
  },
  footerGuaranteesHeading: {
    en: 'Core Guarantees',
    ur: 'بنیادی ضمانتیں'
  },
  footerG1: {
    en: 'Real-time SMS & E-Receipt',
    ur: 'فوری ایس ایم ایس اور ای رسید'
  },
  footerG2: {
    en: 'Photo & GPS Delivery Audits',
    ur: 'تصویری اور جی پی ایس آڈٹ'
  },
  footerG3: {
    en: 'Zero Third-Party Cut Policy',
    ur: 'صفر فیصد کٹوتی کی پالیسی'
  },
  footerG4: {
    en: 'Beneficiary Dignity & Privacy First',
    ur: 'مستحقین کا وقار اور رازداری اولین ترجیح'
  },
  footerHelplineHeading: {
    en: 'Relief Helpline',
    ur: 'امدادی ہیلپ لائن'
  },
  footerCenterHub: {
    en: 'Pakistan National Disaster Relief Hub',
    ur: 'پاکستان نیشنل ڈیزاسٹر ریلیف ہب'
  },
  footerCopyright: {
    en: '© 2026 Amanat Pakistan (امانت). All relief tracking data is cryptographically verified.',
    ur: '© 2026 امانت پاکستان۔ تمام امدادی ٹریکنگ ڈیٹا مکمل تصدیق شدہ ہے۔'
  },

  // Common Feedback & States
  loadingMessage: {
    en: 'Loading live tracking records...',
    ur: 'لائیو ٹریکنگ ریکارڈ لوڈ ہو رہا ہے...'
  },
  noRecordFound: {
    en: 'No tracking record found with this ID.',
    ur: 'اس ٹریکنگ آئی ڈی کا کوئی ریکارڈ نہیں ملا۔'
  },
  trySampleNotice: {
    en: 'Try one of our active sample IDs like AMT-2026-FLOOD-8821.',
    ur: 'ہماری فعال نمونہ آئی ڈیز جیسے AMT-2026-FLOOD-8821 آزمائیں۔'
  },
  successDonationCreated: {
    en: 'Donation successfully registered! Your tracking ID is ready.',
    ur: 'عطیہ کامیابی سے درج ہو گیا ہے! آپ کی ٹریکنگ آئی ڈی تیار ہے۔'
  }
};
