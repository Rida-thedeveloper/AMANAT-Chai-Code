import { TrackingRecord, CreateDonationInput, DonationPurpose, JourneyStep } from '../types';
import { SAMPLE_TRACKING_RECORDS } from './mockData';

const USER_DONATIONS_STORAGE_KEY = 'amanat_user_donations_v2';

// Purpose-specific default metadata
const PURPOSE_CONFIG: Record<DonationPurpose, {
  campaignNameEn: string;
  campaignNameUr: string;
  category: DonationPurpose;
  city: string;
  district: string;
  province: 'Sindh' | 'Punjab' | 'Balochistan' | 'KPK' | 'Gilgit-Baltistan' | 'AJK';
  partnerNgoEn: string;
  partnerNgoUr: string;
  defaultItemsEn: string[];
  defaultItemsUr: string[];
}> = {
  'Ration': {
    campaignNameEn: 'Standard Family Monthly Ration & Food Drive',
    campaignNameUr: 'خاندانی ماہانہ راشن و خوراک مہم',
    category: 'Ration',
    city: 'Sukkur',
    district: 'Union Council 12',
    province: 'Sindh',
    partnerNgoEn: 'Amanat Relief Logistics Network',
    partnerNgoUr: 'امانت ریلیف لاجسٹکس نیٹ ورک',
    defaultItemsEn: [
      'Atta / Wheat Flour (20kg Chakki Bag)',
      'Cooking Oil / Banaspati Ghee (5 Litres)',
      'Basmati Rice (5kg)',
      'Daal Chana & Daal Moong (3kg)',
      'Refined Sugar & Tea (2kg + 400g)',
      'Iodized Salt & Spices Pack'
    ],
    defaultItemsUr: [
      'گندم کا آٹا (20 کلو چکی بیگ)',
      'کوکنگ آئل / بناسپتی گھی (5 لیٹر)',
      'باسمتی چاول (5 کلو)',
      'دال چنا اور دال مونگ (3 کلو)',
      'چینی اور چائے کی پتی (2 کلو + 400 گرام)',
      'آیوڈائزڈ نمک اور بنیادی مصالحہ جات'
    ]
  },
  'Flood Relief': {
    campaignNameEn: 'Emergency Flood Relief & Food Security Drive',
    campaignNameUr: 'سیلاب متاثرین کے لیے ہنگامی راشن و ریلیف مہم',
    category: 'Flood Relief',
    city: 'Dadu',
    district: 'Johi Rural Relief Sector 4',
    province: 'Sindh',
    partnerNgoEn: 'Sindh Relief & Community Trust',
    partnerNgoUr: 'سندھ ریلیف اینڈ کمیونٹی ٹرسٹ',
    defaultItemsEn: [
      'Atta / Wheat Flour (20kg Emergency Bag)',
      'Cooking Oil (3 Litres)',
      'Basmati Rice (5kg)',
      'Mixed Pulses (3kg)',
      'ORS & Water Purification Tablets',
      'Mosquito Repellent & Antiseptic Soap'
    ],
    defaultItemsUr: [
      'گندم کا آٹا (20 کلو ہنگامی بیگ)',
      'کوکنگ آئل (3 لیٹر)',
      'باسمتی چاول (5 کلو)',
      'مکس دالیں (3 کلو)',
      'او آر ایس اور پانی صاف کرنے والی گولیاں',
      'مچھر مار لوشن اور اینٹی سیپٹک صابن'
    ]
  },
  'Emergency Relief': {
    campaignNameEn: 'Disaster Emergency Survival Aid & Food Drive',
    campaignNameUr: 'ہنگامی قدرتی آفات ریلیف و خوراک پیکج',
    category: 'Emergency Relief',
    city: 'Jaffarabad',
    district: 'Usta Muhammad UC-2',
    province: 'Balochistan',
    partnerNgoEn: 'Balochistan Rapid Relief Alliance',
    partnerNgoUr: 'بلوچستان ریپڈ ریلیف الائنس',
    defaultItemsEn: [
      'Ready-to-eat High Energy Rations',
      'Atta / Wheat Flour (15kg Bag)',
      'Cooking Oil (3 Litres)',
      'Clean Drinking Water Jerrycan (10L)',
      'First Aid & Emergency Nutrition Kit'
    ],
    defaultItemsUr: [
      'تیار شدہ ہائی انرجی فوڈ پیکٹ',
      'گندم کا آٹا (15 کلو بیگ)',
      'کوکنگ آئل (3 لیٹر)',
      'صاف پینے کا پانی (10 لیٹر جیری کین)',
      'ابتدائی طبی امداد و ہنگامی غذائی کٹ'
    ]
  },
  'Ramadan Relief': {
    campaignNameEn: 'Ramadan Mubarak Sehri & Iftar Family Rashan',
    campaignNameUr: 'رمضان المبارک سحر و افطار خاندانی راشن پیکج',
    category: 'Ramadan Relief',
    city: 'Karachi',
    district: 'Lyari Town Zone 3',
    province: 'Sindh',
    partnerNgoEn: 'Karachi Hope Foundation',
    partnerNgoUr: 'کراچی ہوپ فاؤنڈیشن',
    defaultItemsEn: [
      'Premium Atta (20kg)',
      'Cooking Oil (4 Litres)',
      'Basmati Rice (5kg)',
      'Daal Mash & Daal Chana (4kg)',
      'Dates (Aseel Khajoor 1kg)',
      'Traditional Rooh Afza / Sherbet Bottle',
      'Sugar & Premium Tea (3kg + 500g)'
    ],
    defaultItemsUr: [
      'پریمیم آٹا (20 کلو بیگ)',
      'کوکنگ آئل (4 لیٹر)',
      'باسمتی چاول (5 کلو)',
      'دال ماش اور دال چنا (4 کلو)',
      'اصیل کھجور (1 کلو)',
      'روح افزا / روایتی شربت',
      'چینی اور چائے (3 کلو + 500 گرام)'
    ]
  },
  'General Relief': {
    campaignNameEn: 'General Amanat Sadaqah & Relief Fund',
    campaignNameUr: 'امانت عمومی صدقہ و خیرات ریلیف فنڈ',
    category: 'General Relief',
    city: 'Rawalpindi',
    district: 'Raja Bazar Welfare Corridor',
    province: 'Punjab',
    partnerNgoEn: 'National Welfare & Food Security Network',
    partnerNgoUr: 'قومی فلاحی و غذائی تحفظ نیٹ ورک',
    defaultItemsEn: [
      'Essential Flour Pack (15kg)',
      'Cooking Ghee / Oil (3 Litres)',
      'Rice (4kg)',
      'Pulses (2kg)',
      'Sugar, Salt & Tea Staples'
    ],
    defaultItemsUr: [
      'بنیادی آٹا پیک (15 کلو)',
      'کوکنگ آئل / گھی (3 لیٹر)',
      'چاول (4 کلو)',
      'دالیں (2 کلو)',
      'چینی، نمک اور چائے'
    ]
  }
};

/**
 * Get saved user donations from localStorage
 */
export function getSavedUserDonations(): Record<string, TrackingRecord> {
  try {
    const raw = localStorage.getItem(USER_DONATIONS_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load user donations from localStorage', err);
    return {};
  }
}

/**
 * Save user donations to localStorage
 */
function saveUserDonationsToStorage(donations: Record<string, TrackingRecord>) {
  try {
    localStorage.setItem(USER_DONATIONS_STORAGE_KEY, JSON.stringify(donations));
    // Trigger cross-component reactive notification
    window.dispatchEvent(new CustomEvent('amanat_donations_changed'));
  } catch (err) {
    console.error('Failed to save user donations to localStorage', err);
  }
}

/**
 * Generate a unique donation tracking ID in the format RR-XXXX (e.g. RR-1042)
 */
function generateUniqueDonationId(existingIds: string[]): string {
  let id = '';
  let attempts = 0;
  
  while (attempts < 100) {
    const num = Math.floor(1000 + Math.random() * 9000);
    id = `RR-${num}`;
    if (!existingIds.includes(id) && !SAMPLE_TRACKING_RECORDS[id]) {
      return id;
    }
    attempts++;
  }
  
  // Fallback sequential
  return `RR-${Date.now().toString().slice(-4)}`;
}

/**
 * Formats current date and time in human readable format
 */
function formatCurrentTime() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${dateStr}, ${timeStr}`;
}

/**
 * Create and persist a new donation
 */
export function createDonation(input: CreateDonationInput): TrackingRecord {
  const saved = getSavedUserDonations();
  const existingIds = Object.keys(saved);
  
  const donationId = generateUniqueDonationId(existingIds);
  const config = PURPOSE_CONFIG[input.purpose] || PURPOSE_CONFIG['Ration'];
  const timestamp = formatCurrentTime();
  
  const donorDisplayName = input.donorName && input.donorName.trim().length > 0
    ? input.donorName.trim()
    : 'Anonymous Donor';

  const rationBagsCount = Math.max(1, Math.round(input.amount / 2500));

  // Build standard 6-stage lifecycle steps
  const steps: JourneyStep[] = [
    {
      key: 'received',
      title: 'Donation Received',
      urduTitle: 'عطیہ موصول ہوا',
      description: `Donation of Rs. ${input.amount.toLocaleString()} successfully received and registered with Amanat tracking ledger.`,
      timestamp: timestamp,
      location: 'Amanat Digital Processing Desk',
      status: 'completed',
      details: [
        `Tracking Reference: ${donationId}`,
        `Purpose: ${input.purpose}`,
        `Donor: ${donorDisplayName}`
      ],
      proofMedia: {
        type: 'receipt',
        label: `E-Receipt #${donationId}`
      }
    },
    {
      key: 'allocated',
      title: 'Ration Allocated',
      urduTitle: 'راشن مخصوص کیا گیا',
      description: `${rationBagsCount} family relief pack(s) assigned to verified high-distress index in ${config.district}, ${config.province}.`,
      status: 'current',
      location: `${config.city} Regional Distribution Hub`,
      details: [
        'Survey index matched with District Relief Census',
        `Partner Ground NGO: ${config.partnerNgoEn}`
      ]
    },
    {
      key: 'prepared',
      title: 'Ration Prepared & Packed',
      urduTitle: 'راشن پیکنگ مکمل',
      description: 'Standard emergency relief bags packed with grade-A flour, oil & pulses, sealed with tamper-proof Amanat QR code.',
      status: 'pending',
      location: `${config.city} Central Hub Warehouse`,
      details: ['Tamper-proof QR barcode generated']
    },
    {
      key: 'volunteer_assigned',
      title: 'Volunteer Assigned',
      urduTitle: 'رضاکار تعینات',
      description: 'Verified field coordinator and logistics vehicle will be dispatched for direct delivery.',
      status: 'pending',
      location: `${config.district} Base Camp`
    },
    {
      key: 'delivered',
      title: 'Delivered to Doorstep',
      urduTitle: 'گھر کی دہلیز پر پہنچا دیا گیا',
      description: 'Relief bags will be directly handed over to the identified female-headed or vulnerable household.',
      status: 'pending',
      location: `${config.district}, ${config.city}`
    },
    {
      key: 'verified',
      title: 'Recipient Verified',
      urduTitle: 'مستحق کی تصدیق مکمل',
      description: 'Digital OTP verification token will finalize the audit chain of custody.',
      status: 'pending',
      location: 'Community Verification Desk'
    }
  ];

  const newRecord: TrackingRecord = {
    trackingId: donationId,
    donorName: donorDisplayName,
    donorContact: input.contact?.trim() || undefined,
    campaignName: config.campaignNameEn,
    campaignCategory: config.category,
    amountPKR: input.amount,
    rationBagsCount: rationBagsCount,
    itemsIncluded: config.defaultItemsEn,
    city: config.city,
    district: config.district,
    province: config.province,
    partnerNgo: config.partnerNgoEn,
    volunteerName: 'Amanat Field Team Lead #104',
    volunteerPhoneMasked: '+92 300 •••• 821',
    currentStepIndex: 0, // Received
    steps: steps,
    gpsCoordinates: '27.7052° N, 68.8574° E',
    recipientFamilyCode: `FAM-${donationId.replace('RR-', '')}-VERIFIED`,
    createdAt: timestamp,
    isUserCreated: true
  };

  // Persist
  saved[donationId] = newRecord;
  saveUserDonationsToStorage(saved);

  return newRecord;
}

/**
 * Update the state of a donation record (used in Demo delivery verification)
 */
export function updateDonationRecord(record: TrackingRecord): void {
  const saved = getSavedUserDonations();
  saved[record.trackingId] = record;
  saveUserDonationsToStorage(saved);
}

/**
 * Reset Demo donation (RR-DEMO-1042) to its initial In Transit state
 */
export function resetDemoDonation(): TrackingRecord {
  const initialDemo: TrackingRecord = {
    ...SAMPLE_TRACKING_RECORDS['RR-DEMO-1042'],
    currentStepIndex: 4, // In Transit active
    isDemo: true,
    demoOtp: '8492'
  };
  
  const saved = getSavedUserDonations();
  saved['RR-DEMO-1042'] = initialDemo;
  saveUserDonationsToStorage(saved);
  return initialDemo;
}

/**
 * Advance Demo donation to next stage
 * e.g., In Transit (index 4) -> Delivered (index 5) -> Verified (index 6)
 */
export function advanceDemoStage(targetStepKey: 'delivered' | 'verified'): TrackingRecord {
  const existing = getDonationById('RR-DEMO-1042') || SAMPLE_TRACKING_RECORDS['RR-DEMO-1042'];
  const now = new Date();
  const timeStr = `Today, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;

  const updatedSteps = existing.steps.map((step) => {
    if (targetStepKey === 'delivered') {
      if (step.key === 'received' || step.key === 'allocated' || step.key === 'prepared' || step.key === 'volunteer_assigned' || step.key === 'in_transit') {
        return { ...step, status: 'completed' as const };
      }
      if (step.key === 'delivered') {
        return {
          ...step,
          status: 'completed' as const,
          timestamp: timeStr,
          description: 'Ration packages handed over at beneficiary doorstep.',
          details: ['Volunteer Muhammad Salman confirmed handover', 'Waiting for recipient OTP verification']
        };
      }
      if (step.key === 'verified') {
        return {
          ...step,
          status: 'current' as const,
          description: 'Awaiting recipient 4-digit OTP code confirmation.'
        };
      }
    }

    if (targetStepKey === 'verified') {
      if (step.key !== 'verified') {
        return { ...step, status: 'completed' as const };
      }
      return {
        ...step,
        status: 'completed' as const,
        timestamp: timeStr,
        description: 'Beneficiary authenticated and confirmed delivery via OTP #8492.',
        details: [
          'Recipient OTP verified (Demo 8492)',
          'NADRA Safe Token: FAM-DEMO-UC12-1042',
          'Audit seal: 100% Zero-Leakage Confirmed'
        ],
        proofMedia: {
          type: 'badge' as const,
          label: 'Audit Seal: 100% Verified'
        }
      };
    }

    return step;
  });

  const newStepIndex = targetStepKey === 'delivered' ? 5 : 6;
  const updatedRecord: TrackingRecord = {
    ...existing,
    currentStepIndex: newStepIndex,
    deliveredDate: targetStepKey === 'verified' || targetStepKey === 'delivered' ? timeStr : existing.deliveredDate,
    steps: updatedSteps
  };

  updateDonationRecord(updatedRecord);
  return updatedRecord;
}

/**
 * Look up a tracking record by ID (checks user donations first, then mock samples)
 */
export function getDonationById(id: string): TrackingRecord | undefined {
  if (!id) return undefined;
  const cleanId = id.trim().toUpperCase();
  
  // 1. Check user created in localStorage
  const userDonations = getSavedUserDonations();
  if (userDonations[cleanId]) {
    return userDonations[cleanId];
  }
  
  // Check case-insensitive in user donations
  const matchedUserKey = Object.keys(userDonations).find(k => k.toUpperCase() === cleanId);
  if (matchedUserKey) {
    return userDonations[matchedUserKey];
  }

  // 2. Check sample tracking records
  if (SAMPLE_TRACKING_RECORDS[cleanId]) {
    return SAMPLE_TRACKING_RECORDS[cleanId];
  }

  const matchedSampleKey = Object.keys(SAMPLE_TRACKING_RECORDS).find(k => k.toUpperCase() === cleanId);
  if (matchedSampleKey) {
    return SAMPLE_TRACKING_RECORDS[matchedSampleKey];
  }

  return undefined;
}

/**
 * Get all available donations (User created + Samples)
 */
export function getAllDonations(): TrackingRecord[] {
  const userDonations = Object.values(getSavedUserDonations());
  const sampleDonations = Object.values(SAMPLE_TRACKING_RECORDS);
  return [...userDonations, ...sampleDonations];
}

/**
 * Get only user-created donations, sorted newest first
 */
export function getUserCreatedDonationsList(): TrackingRecord[] {
  const userDonations = Object.values(getSavedUserDonations());
  return userDonations.reverse();
}
