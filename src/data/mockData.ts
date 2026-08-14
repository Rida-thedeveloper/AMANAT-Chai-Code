import { TrackingRecord, ReliefCampaign, StatMetric } from '../types';

export const SAMPLE_TRACKING_RECORDS: Record<string, TrackingRecord> = {
  'AMT-2026-FLOOD-8821': {
    trackingId: 'AMT-2026-FLOOD-8821',
    donorName: 'Anonymous Donor (KHI-***291)',
    campaignName: 'Dadu & Johi Emergency Flood Relief Drive',
    campaignCategory: 'Flood Relief',
    amountPKR: 19500,
    rationBagsCount: 3,
    itemsIncluded: [
      'Atta (20kg Chakki Flour)',
      'Basmati Rice (5kg)',
      'Daal Chana & Daal Moong (3kg)',
      'Banaspati Ghee (3 Litres)',
      'Tea & Sugar (1kg + 3kg)',
      'ORS & Water Purification Tablets',
      'Mosquito Repellent & Soap'
    ],
    city: 'Dadu',
    district: 'Johi Rural Union Council 4',
    province: 'Sindh',
    partnerNgo: 'Sindh Relief & Community Trust',
    volunteerName: 'Tariq Hussain (Verified Field Lead #804)',
    volunteerPhoneMasked: '+92 300 •••• 912',
    currentStepIndex: 5, // Fully verified
    gpsCoordinates: '26.6912° N, 67.7781° E',
    recipientFamilyCode: 'FAM-DADU-UC4-082',
    deliveredDate: '12 Aug 2026, 4:45 PM',
    steps: [
      {
        key: 'received',
        title: 'Donation Received',
        urduTitle: 'عطیہ موصول ہوا',
        description: 'Payment verified via 1Link Bank Transfer (PKR 19,500). Digital receipt issued.',
        timestamp: '10 Aug 2026, 09:14 AM',
        location: 'Karachi Central Processing Desk',
        status: 'completed',
        details: ['Transaction ID: 1LK-90281-AMN', 'Tax exemption receipt generated'],
        proofMedia: { type: 'receipt', label: 'E-Receipt #AMN-8821' }
      },
      {
        key: 'allocated',
        title: 'Ration Allocated',
        urduTitle: 'راشن مخصوص کیا گیا',
        description: '3 family ration packs assigned to high-priority flood-affected households in Johi.',
        timestamp: '10 Aug 2026, 02:30 PM',
        location: 'Sukkur Logistics Hub',
        status: 'completed',
        details: ['Beneficiary family index matched via District Relief Census #UC-04'],
        proofMedia: { type: 'badge', label: 'Batch #SKR-FL-882' }
      },
      {
        key: 'prepared',
        title: 'Ration Prepared & Packed',
        urduTitle: 'راشن پیکنگ مکمل',
        description: 'Standard 20kg food bags quality-checked, sealed with tamper-proof Amanat QR code tags.',
        timestamp: '11 Aug 2026, 11:00 AM',
        location: 'Sukkur Central Warehouse',
        status: 'completed',
        details: ['Quality verified: Grade-A flour, branded oil, vacuum sealed pulses'],
        proofMedia: { type: 'badge', label: 'Packer ID: WH-14' }
      },
      {
        key: 'volunteer_assigned',
        title: 'Volunteer Assigned',
        urduTitle: 'رضاکار تعینات',
        description: 'Local field coordinator Tariq Hussain assigned with 4x4 relief convoy #CV-09.',
        timestamp: '11 Aug 2026, 04:15 PM',
        location: 'Dadu Base Camp',
        status: 'completed',
        details: ['Field volunteer badge active', 'Emergency off-road transport logged'],
        proofMedia: { type: 'gps', label: 'Convoy #CV-09 Live GPS' }
      },
      {
        key: 'delivered',
        title: 'Delivered to Doorstep',
        urduTitle: 'گھر کی دہلیز پر پہنچا دیا گیا',
        description: 'Bags successfully handed over at Village Ghulam Muhammad, Johi UC-4.',
        timestamp: '12 Aug 2026, 03:30 PM',
        location: 'Village Ghulam Muhammad, Johi',
        status: 'completed',
        details: ['Delivered directly to female head of household', 'Emergency shelter sector B'],
        proofMedia: { type: 'photo', label: 'Delivery Handover Confirmed' }
      },
      {
        key: 'verified',
        title: 'Recipient Verified',
        urduTitle: 'مستحق کی تصدیق مکمل',
        description: 'CNIC record cross-matched against NADRA-safe token & community elder counter-signed.',
        timestamp: '12 Aug 2026, 04:45 PM',
        location: 'Johi Community Validation Desk',
        status: 'completed',
        details: ['CNIC Token: 41201-******3-8', 'Local council elder validation ID: ELD-882'],
        proofMedia: { type: 'badge', label: 'Audit Seal: 100% Verified' }
      }
    ]
  },
  'AMT-2026-RAMDN-4019': {
    trackingId: 'AMT-2026-RAMDN-4019',
    donorName: 'Dr. Ayesha S. (LHR-***104)',
    campaignName: 'Ramadan Daily Rashan & Iftar Support',
    campaignCategory: 'Ramadan Relief',
    amountPKR: 13000,
    rationBagsCount: 2,
    itemsIncluded: [
      'Atta (20kg)',
      'Fine Rice (5kg)',
      'Cooking Oil (5 Litres)',
      'Dates / Khajoor (2kg Premium Aseel)',
      'Gram Flour / Besan (2kg)',
      'Rooh Afza / Sharbat (1 Bottle)',
      'Daal Moong & Masoor (2kg)'
    ],
    city: 'Karachi',
    district: 'Lyari & Machar Colony Sector 3',
    province: 'Sindh',
    partnerNgo: 'Lyari Community Welfare League',
    volunteerName: 'Bilal Baloch (Community Field Lead)',
    volunteerPhoneMasked: '+92 333 •••• 419',
    currentStepIndex: 3, // Volunteer assigned
    gpsCoordinates: '24.8607° N, 67.0011° E',
    recipientFamilyCode: 'FAM-LYR-0419',
    steps: [
      {
        key: 'received',
        title: 'Donation Received',
        urduTitle: 'عطیہ موصول ہوا',
        description: 'Payment confirmed via Raast / JazzCash (PKR 13,000).',
        timestamp: '13 Aug 2026, 01:20 PM',
        location: 'Karachi Central Gate',
        status: 'completed',
        details: ['Raast Instant Transfer Ref: RST-4921-99'],
        proofMedia: { type: 'receipt', label: 'Digital Token #4019' }
      },
      {
        key: 'allocated',
        title: 'Ration Allocated',
        urduTitle: 'راشن مخصوص کیا گیا',
        description: 'Allocated for 2 deserving daily-wage earner families registered with community token.',
        timestamp: '13 Aug 2026, 05:00 PM',
        location: 'Lyari Distribution Centre',
        status: 'completed',
        details: ['Verified through doorstep survey #LYR-SEC-3']
      },
      {
        key: 'prepared',
        title: 'Ration Prepared & Packed',
        urduTitle: 'راشن پیکنگ مکمل',
        description: 'Ramadan specialty food ration boxes packed and sealed with security hologram.',
        timestamp: '14 Aug 2026, 09:30 AM',
        location: 'Korangi Food Hub',
        status: 'completed',
        details: ['Dates, flour, pulses, cooking oil sealed & weighed']
      },
      {
        key: 'volunteer_assigned',
        title: 'Volunteer Assigned',
        urduTitle: 'رضاکار تعینات',
        description: 'Volunteer Bilal Baloch en route with ration carrier vehicle for evening distribution.',
        timestamp: '14 Aug 2026, 02:00 PM',
        location: 'Lyari Machar Colony',
        status: 'current',
        details: ['Vehicle: Suzuki Carry #KHI-9182', 'Estimated delivery: Today before Asr prayers']
      },
      {
        key: 'delivered',
        title: 'Delivery Pending',
        urduTitle: 'ترسیل زیرِ عمل',
        description: 'Awaiting doorstep distribution in Machar Colony.',
        status: 'pending'
      },
      {
        key: 'verified',
        title: 'Recipient Verification',
        urduTitle: 'مستحق کی تصدیق',
        description: 'Will be verified via OTP / Token stamp upon handover.',
        status: 'pending'
      }
    ]
  },
  'AMT-2026-RATION-1104': {
    trackingId: 'AMT-2026-RATION-1104',
    donorName: 'Farhan & Family (ISB-***912)',
    campaignName: 'Swat Upper Valley Winter Food & Warmth Drive',
    campaignCategory: 'Winter Emergency',
    amountPKR: 26000,
    rationBagsCount: 4,
    itemsIncluded: [
      'Atta (20kg Bag x 4)',
      'High-Calorie Ghee & Cooking Oil (12L)',
      'Warm Fleece Blankets (4 units)',
      'Tea, Sugar & Dry Milk (4 sets)',
      'Emergency Coal / Wood Heating Stoves'
    ],
    city: 'Swat',
    district: 'Madyan & Kalam Upper Belt',
    province: 'KPK',
    partnerNgo: 'Northern Relief Alliance',
    volunteerName: 'Hamza Khan (Swat Mountain Volunteer Team)',
    volunteerPhoneMasked: '+92 345 •••• 810',
    currentStepIndex: 1, // Allocated
    gpsCoordinates: '35.1382° N, 72.5342° E',
    recipientFamilyCode: 'FAM-SWAT-KALAM-104',
    steps: [
      {
        key: 'received',
        title: 'Donation Received',
        urduTitle: 'عطیہ موصول ہوا',
        description: 'Donation of PKR 26,000 received via Visa Debit.',
        timestamp: '14 Aug 2026, 08:15 AM',
        location: 'Islamabad Desk',
        status: 'completed',
        details: ['Online Banking Gateway confirmation #VISA-7718']
      },
      {
        key: 'allocated',
        title: 'Ration Allocated',
        urduTitle: 'راشن مخصوص کیا گیا',
        description: 'Assigned to snow-isolated families in upper Kalam valley.',
        timestamp: '14 Aug 2026, 11:30 AM',
        location: 'Mingora Dispatch Warehouse',
        status: 'current',
        details: ['Snowfall road clearance scheduled with local administration']
      },
      {
        key: 'prepared',
        title: 'Packaging in Progress',
        urduTitle: 'پیکنگ جاری ہے',
        description: 'Waterproof packing for snow transport scheduled at Mingora hub.',
        status: 'pending'
      },
      {
        key: 'volunteer_assigned',
        title: 'Volunteer Assignment',
        urduTitle: 'رضاکار تعیناتی',
        description: '4x4 Mountain rescue volunteer group will be tagged.',
        status: 'pending'
      },
      {
        key: 'delivered',
        title: 'Delivery',
        urduTitle: 'ترسیل',
        description: 'Door-to-door distribution in Kalam upper belt.',
        status: 'pending'
      },
      {
        key: 'verified',
        title: 'Community Verification',
        urduTitle: 'تصدیق',
        description: 'Village elder council verification log.',
        status: 'pending'
      }
    ]
  },
  'RR-1042': {
    trackingId: 'RR-1042',
    donorName: 'Anonymous Supporter (Verified)',
    campaignName: 'Emergency Family Ration & Food Security Drive',
    campaignCategory: 'Ration',
    amountPKR: 5000,
    rationBagsCount: 3,
    itemsIncluded: [
      'Atta / Wheat Flour (20kg Bag x 3)',
      'Cooking Oil / Banaspati Ghee (6 Litres)',
      'Basmati Rice (5kg)',
      'Daal Chana & Moong (3kg)',
      'Refined Sugar & Tea Pack'
    ],
    city: 'Sukkur',
    district: 'Union Council 12 & Rural Sectors',
    province: 'Sindh',
    partnerNgo: 'Amanat Relief Logistics Network',
    volunteerName: 'Muhammad Salman (Registered Aid Worker)',
    volunteerPhoneMasked: '+92 321 •••• 552',
    currentStepIndex: 5, // Delivered & Verified
    gpsCoordinates: '27.7052° N, 68.8574° E',
    recipientFamilyCode: 'FAM-SKR-UC12-1042',
    deliveredDate: 'Today, 03:45 PM',
    createdAt: '14 Aug 2026, 09:30 AM',
    steps: [
      {
        key: 'received',
        title: 'Donation Received',
        urduTitle: 'عطیہ موصول ہوا',
        description: 'Your donation has been recorded.',
        timestamp: 'Today, 09:30 AM',
        location: 'Amanat Central Gateway',
        status: 'completed',
        details: ['Recorded in digital audit ledger #RR-1042', 'E-Receipt Verified'],
        proofMedia: { type: 'receipt', label: 'E-Receipt #RR-1042' }
      },
      {
        key: 'allocated',
        title: 'Ration Allocated',
        urduTitle: 'راشن مخصوص کیا گیا',
        description: 'Your contribution has been allocated toward ration packages.',
        timestamp: 'Today, 11:15 AM',
        location: 'Sukkur Regional Hub',
        status: 'completed',
        details: ['3 ration packages matched with verified distress index UC-12']
      },
      {
        key: 'prepared',
        title: 'Ration Prepared',
        urduTitle: 'راشن پیکنگ مکمل',
        description: '3 ration packages have been prepared.',
        timestamp: 'Today, 01:20 PM',
        location: 'Sukkur Central Warehouse',
        status: 'completed',
        details: ['Grade-A food items sealed with tamper-proof QR barcode']
      },
      {
        key: 'volunteer_assigned',
        title: 'Volunteer Assigned',
        urduTitle: 'رضاکار تعینات',
        description: 'A delivery volunteer has been assigned.',
        timestamp: 'Today, 02:30 PM',
        location: 'Sukkur Logistics Hub',
        status: 'completed',
        details: ['Volunteer Muhammad Salman dispatched with delivery unit #04']
      },
      {
        key: 'delivered',
        title: 'Delivered',
        urduTitle: 'دہلیز پر ترسیل',
        description: 'Your ration has been delivered.',
        timestamp: 'Today, 03:45 PM',
        location: 'Union Council 12, Sukkur',
        status: 'completed',
        details: ['Doorstep delivery completed to identified families']
      },
      {
        key: 'verified',
        title: 'Recipient Verified',
        urduTitle: 'مستحق کی تصدیق',
        description: 'The recipient confirmed delivery using OTP.',
        timestamp: 'Today, 04:10 PM',
        location: 'UC-12 Verification Desk',
        status: 'completed',
        details: ['Beneficiary confirmed with SMS OTP code', 'NADRA-safe token FAM-SKR-UC12-1042 recorded']
      }
    ]
  }
};

export const RELIEF_CAMPAIGNS: ReliefCampaign[] = [
  {
    id: 'camp-1',
    title: 'Sindh & Balochistan Monsoon Flash Flood Relief',
    urduTitle: 'سندھ اور بلوچستان سیلاب متاثرین ریلیف',
    category: 'Flood Relief',
    location: 'Dadu, Johi, Jafarabad & Lasbela',
    province: 'Sindh / Balochistan',
    targetBags: 5000,
    fundedBags: 3840,
    costPerBagPKR: 6500,
    partnerNgo: 'Sindh & Balochistan Emergency Aid Taskforce',
    emergencyLevel: 'Urgent',
    description: 'Providing 1-month comprehensive food ration bags with water purification kits for displaced flood-affected families.',
    sampleTrackingId: 'AMT-2026-FLOOD-8821'
  },
  {
    id: 'camp-2',
    title: 'Ramadan 2026 Nationwide Rashan & Sehar-Iftar Drive',
    urduTitle: 'رمضان راشن اور سحر و افطار مہم',
    category: 'Ramadan Rashan',
    location: 'Karachi, Lahore, Rawalpindi, Quetta & Peshawar',
    province: 'All Pakistan',
    targetBags: 12000,
    fundedBags: 9420,
    costPerBagPKR: 6500,
    partnerNgo: 'Pakistan Citizens Welfare Network',
    emergencyLevel: 'Active',
    description: 'Dignified doorstep delivery of staple Ramadan items to daily-wagers, widows, and low-income families.',
    sampleTrackingId: 'AMT-2026-RAMDN-4019'
  },
  {
    id: 'camp-3',
    title: 'Khyber Pakhtunkhwa & GB Mountain Winter Emergency',
    urduTitle: 'خیبر پختونخوا اور گلگت بلتستان ونٹر ریلیف',
    category: 'Winter Emergency',
    location: 'Swat, Kalam, Chitral & Skardu Valley',
    province: 'KPK / Gilgit-Baltistan',
    targetBags: 3500,
    fundedBags: 2150,
    costPerBagPKR: 6500,
    partnerNgo: 'Northern Relief Alliance',
    emergencyLevel: 'Active',
    description: 'High-altitude cold emergency food sacks and thermal blankets for families cut off during harsh winter passes.',
    sampleTrackingId: 'AMT-2026-RATION-1104'
  },
  {
    id: 'camp-4',
    title: 'Tharparkar Drought Relief & Nutrition Pack Drive',
    urduTitle: 'تھرپارکر خشک سالی اور راشن تقسیم',
    category: 'Food Security',
    location: 'Mithi, Islamkot & Chachro, Thar',
    province: 'Sindh',
    targetBags: 4000,
    fundedBags: 2890,
    costPerBagPKR: 6500,
    partnerNgo: 'Thar Desert Hope Initiative',
    emergencyLevel: 'Seasonal',
    description: 'Fortified nutrient-rich ration hampers with dry milk, staples, and clean water canisters for remote desert hamlets.',
    sampleTrackingId: 'AMT-2026-FLOOD-8821'
  }
];

export const PLATFORM_STATS: StatMetric[] = [
  {
    label: 'Transparent Donations Tracked',
    urduLabel: 'مکمل شفاف عطیات',
    value: 'PKR 48.2 Million',
    changeText: '100% auditable via digital receipts',
    iconName: 'ShieldCheck'
  },
  {
    label: 'Ration Bags Delivered to Families',
    urduLabel: 'مستحق خاندانوں تک ترسیل',
    value: '7,420+ Bags',
    changeText: 'Zero leakage verified',
    iconName: 'PackageCheck'
  },
  {
    label: 'Active Verified Field Volunteers',
    urduLabel: 'میدانی رضاکار',
    value: '680+ Volunteers',
    changeText: 'CNIC & GPS check-in validated',
    iconName: 'Users'
  },
  {
    label: 'Districts Across Pakistan Covered',
    urduLabel: 'پاکستان بھر کے اضلاع',
    value: '42 Districts',
    changeText: 'Sindh, Punjab, Balochistan, KPK, GB',
    iconName: 'MapPin'
  }
];

export const JOURNEY_STAGES = [
  {
    stepNumber: '01',
    key: 'received',
    title: 'Donation Received',
    urdu: 'عطیہ موصول ہوا',
    description: 'Your contribution is confirmed via 1Link, Raast, card, or microfinance wallet. An instant unique Amanat Tracking ID and tax-compliant e-receipt are generated.',
    icon: 'CreditCard',
    proof: 'SMS & Instant E-Receipt with unique ID'
  },
  {
    stepNumber: '02',
    key: 'allocated',
    title: 'Ration Allocated',
    urdu: 'راشن مخصوص کیا گیا',
    description: 'Your funds are matched to an exact beneficiary profile from verified local union council surveys, ensuring aid reaches genuine families in need.',
    icon: 'Layers',
    proof: 'Beneficiary Index ID & Hub Batch Code'
  },
  {
    stepNumber: '03',
    key: 'prepared',
    title: 'Ration Prepared',
    urdu: 'راشن پیکنگ مکمل',
    description: 'Field warehouses weigh, inspect, and seal standard high-grade rations (flour, oil, lentils, sugar) with tamper-evident QR security tags.',
    icon: 'Package',
    proof: 'Quality Check Log & Packaging Seal ID'
  },
  {
    stepNumber: '04',
    key: 'volunteer_assigned',
    title: 'Volunteer Assigned',
    urdu: 'رضاکار تعینات',
    description: 'A verified local volunteer or NGO field team lead is dispatched with GPS check-in on the ground to deliver your parcel.',
    icon: 'Truck',
    proof: 'Volunteer Profile & Live Convoy Route'
  },
  {
    stepNumber: '05',
    key: 'delivered',
    title: 'Delivered',
    urdu: 'دہلیز پر ترسیل',
    description: 'The ration package is delivered directly to the beneficiary family’s doorstep with dignity and respect.',
    icon: 'Home',
    proof: 'Timestamp & Geo-Coordinates Log'
  },
  {
    stepNumber: '06',
    key: 'verified',
    title: 'Recipient Verified',
    urdu: 'مستحق کی حتمی تصدیق',
    description: 'The handover is authenticated via CNIC safe-token, photo proof, or local elder counter-signing, closing the transparent chain of custody.',
    icon: 'CheckCircle2',
    proof: 'Tamper-proof Digital Audit Certificate'
  }
];
