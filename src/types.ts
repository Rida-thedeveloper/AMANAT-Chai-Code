export type JourneyStepStatus = 'completed' | 'current' | 'pending';

export type StepKey = 
  | 'received' 
  | 'allocated' 
  | 'prepared' 
  | 'volunteer_assigned' 
  | 'in_transit'
  | 'delivered' 
  | 'verified';

export interface JourneyStep {
  key: StepKey;
  title: string;
  urduTitle: string;
  description: string;
  timestamp?: string;
  location?: string;
  status: JourneyStepStatus;
  details?: string[];
  proofMedia?: {
    type: 'badge' | 'receipt' | 'gps' | 'photo';
    label: string;
  };
}

export type DonationPurpose = 
  | 'Ration' 
  | 'Flood Relief' 
  | 'Emergency Relief' 
  | 'Ramadan Relief' 
  | 'General Relief';

export interface CreateDonationInput {
  amount: number;
  purpose: DonationPurpose;
  donorName?: string;
  contact?: string;
}

export interface TrackingRecord {
  trackingId: string;
  donorName: string;
  donorContact?: string;
  campaignName: string;
  campaignCategory: DonationPurpose | 'Winter Emergency' | 'Orphan Support' | 'Daily Meal';
  amountPKR: number;
  rationBagsCount: number;
  itemsIncluded: string[];
  city: string;
  district: string;
  province: 'Sindh' | 'Punjab' | 'Balochistan' | 'KPK' | 'Gilgit-Baltistan' | 'AJK';
  partnerNgo: string;
  volunteerName?: string;
  volunteerPhoneMasked?: string;
  currentStepIndex: number; // 0 to total steps
  steps: JourneyStep[];
  deliveredDate?: string;
  recipientFamilyCode?: string;
  gpsCoordinates?: string;
  createdAt?: string;
  isUserCreated?: boolean;
  isDemo?: boolean;
  demoOtp?: string;
}

export interface ReliefCampaign {
  id: string;
  title: string;
  urduTitle: string;
  category: string;
  location: string;
  province: string;
  targetBags: number;
  fundedBags: number;
  costPerBagPKR: number;
  partnerNgo: string;
  emergencyLevel: 'Urgent' | 'Active' | 'Seasonal';
  description: string;
  sampleTrackingId: string;
}

export interface StatMetric {
  label: string;
  urduLabel: string;
  value: string;
  changeText?: string;
  iconName: string;
}
