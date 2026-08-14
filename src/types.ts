export type JourneyStepStatus = 'completed' | 'current' | 'pending';

export type StepKey = 
  | 'received' 
  | 'allocated' 
  | 'prepared' 
  | 'volunteer_assigned' 
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

export interface TrackingRecord {
  trackingId: string;
  donorName: string;
  campaignName: string;
  campaignCategory: 'Flood Relief' | 'Ramadan Rashan' | 'Winter Emergency' | 'Orphan Support' | 'Daily Meal';
  amountPKR: number;
  rationBagsCount: number;
  itemsIncluded: string[];
  city: string;
  district: string;
  province: 'Sindh' | 'Punjab' | 'Balochistan' | 'KPK' | 'Gilgit-Baltistan' | 'AJK';
  partnerNgo: string;
  volunteerName?: string;
  volunteerPhoneMasked?: string;
  currentStepIndex: number; // 0 to 5
  steps: JourneyStep[];
  deliveredDate?: string;
  recipientFamilyCode?: string;
  gpsCoordinates?: string;
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
