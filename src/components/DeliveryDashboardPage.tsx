import React, { useState, useEffect } from 'react';
import {
  Truck,
  Package,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  ExternalLink,
  Lock,
  EyeOff,
  Clock,
  Check,
  Building2,
  Info
} from 'lucide-react';
import { TrackingRecord } from '../types';
import {
  getAllDonations,
  getDonationById,
  startDeliveryForDonation,
  confirmDeliveryForDonation,
  verifyRecipientForDonation,
  resetDemoDonation
} from '../data/donationStore';
import { useLanguage } from '../context/LanguageContext';

interface DeliveryDashboardPageProps {
  onNavigateHome?: () => void;
  onNavigateTrack?: (trackingId: string) => void;
}

export const DeliveryDashboardPage: React.FC<DeliveryDashboardPageProps> = ({
  onNavigateHome,
  onNavigateTrack
}) => {
  const { isUrdu, direction } = useLanguage();

  // All deliveries list & selected active delivery ID
  const [deliveries, setDeliveries] = useState<TrackingRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string>('RR-DEMO-1042');
  const [currentDelivery, setCurrentDelivery] = useState<TrackingRecord | null>(null);

  // Volunteer action states
  const [deliveryStartedFeedback, setDeliveryStartedFeedback] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Recipient Verification state
  const [otpInput, setOtpInput] = useState<string>('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [verificationSuccess, setVerificationSuccess] = useState<boolean>(false);

  // Load and refresh deliveries from store
  const refreshDeliveries = () => {
    const all = getAllDonations();
    // Prioritize demo and active records for volunteers
    const sorted = [...all].sort((a, b) => {
      if (a.trackingId === 'RR-DEMO-1042') return -1;
      if (b.trackingId === 'RR-DEMO-1042') return 1;
      return 0;
    });

    setDeliveries(sorted);

    const active = getDonationById(selectedId) || sorted[0] || null;
    setCurrentDelivery(active);
  };

  useEffect(() => {
    refreshDeliveries();

    const handleStorageChange = () => {
      refreshDeliveries();
    };

    window.addEventListener('amanat_donations_changed', handleStorageChange);
    return () => {
      window.removeEventListener('amanat_donations_changed', handleStorageChange);
    };
  }, [selectedId]);

  // Handle switching active assigned delivery
  const handleSelectDelivery = (id: string) => {
    setSelectedId(id);
    const found = getDonationById(id);
    if (found) {
      setCurrentDelivery(found);
      setDeliveryStartedFeedback(false);
      setOtpInput('');
      setOtpError(null);
      setVerificationSuccess(false);
    }
  };

  // Helper to get formatted status and stage
  const getDeliveryStatus = (record: TrackingRecord) => {
    const idx = record.currentStepIndex ?? 3;
    const isDeliveredStepDone = record.steps?.find(s => s.key === 'delivered')?.status === 'completed';
    const isVerifiedStepDone = record.steps?.find(s => s.key === 'verified')?.status === 'completed';

    if (isVerifiedStepDone || idx >= 6) {
      return {
        stage: 'verified',
        textEn: 'Delivered & Recipient Verified',
        textUr: 'ترسیل اور مستحق کی تصدیق مکمل',
        badgeBg: 'bg-emerald-600 text-white',
        border: 'border-emerald-500',
        badgePill: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      };
    }

    if (isDeliveredStepDone || idx === 5) {
      return {
        stage: 'delivered',
        textEn: 'Delivered',
        textUr: 'دہلیز پر ترسیل مکمل',
        badgeBg: 'bg-amber-600 text-white',
        border: 'border-amber-500',
        badgePill: 'bg-amber-100 text-amber-900 border-amber-300'
      };
    }

    if (idx === 4 || deliveryStartedFeedback || record.steps?.find(s => s.key === 'in_transit')?.status === 'current') {
      return {
        stage: 'in_transit',
        textEn: 'In Transit',
        textUr: 'راستے میں ہے',
        badgeBg: 'bg-blue-600 text-white',
        border: 'border-blue-500',
        badgePill: 'bg-blue-100 text-blue-900 border-blue-300'
      };
    }

    return {
      stage: 'assigned',
      textEn: 'Assigned (Ready to Start)',
      textUr: 'رضاکار تعینات (ترسیل کے لیے تیار)',
      badgeBg: 'bg-slate-700 text-white',
      border: 'border-slate-600',
      badgePill: 'bg-slate-100 text-slate-800 border-slate-300'
    };
  };

  // Action 1: "Start Delivery"
  const handleStartDelivery = () => {
    if (!currentDelivery) return;
    setIsProcessing(true);

    setTimeout(() => {
      const updated = startDeliveryForDonation(currentDelivery.trackingId);
      setCurrentDelivery(updated);
      setDeliveryStartedFeedback(true);
      setIsProcessing(false);
    }, 300);
  };

  // Action 2: "Confirm Delivery"
  const handleConfirmDelivery = () => {
    if (!currentDelivery) return;
    setIsProcessing(true);

    setTimeout(() => {
      const updated = confirmDeliveryForDonation(currentDelivery.trackingId);
      setCurrentDelivery(updated);
      setIsProcessing(false);
    }, 400);
  };

  // Action 3: Recipient OTP Verification Submit
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDelivery) return;

    setOtpError(null);
    const expectedOtp = currentDelivery.demoOtp || '8492';
    const clean = otpInput.trim();

    if (currentDelivery.isDemo && clean !== expectedOtp) {
      setOtpError(
        isUrdu
          ? `غلط او ٹی پی کوڈ! ڈیمو کے لیے کوڈ ${expectedOtp} درج کریں۔`
          : `Invalid OTP code. Please enter demo OTP: ${expectedOtp}`
      );
      return;
    }

    if (!currentDelivery.isDemo && clean.length < 4) {
      setOtpError(
        isUrdu
          ? 'براہ کرم درست 4 ہندسوں والا او ٹی پی کوڈ درج کریں۔'
          : 'Please enter a valid 4-digit OTP code.'
      );
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const updated = verifyRecipientForDonation(currentDelivery.trackingId, clean || expectedOtp);
      setCurrentDelivery(updated);
      setIsProcessing(false);
      setVerificationSuccess(true);
    }, 500);
  };

  // Helper to auto-fill demo OTP
  const handleAutoFillDemoOtp = () => {
    if (currentDelivery?.demoOtp) {
      setOtpInput(currentDelivery.demoOtp);
      setOtpError(null);
    } else {
      setOtpInput('8492');
      setOtpError(null);
    }
  };

  // Helper to reset demo
  const handleResetDemo = () => {
    const refreshed = resetDemoDonation();
    setCurrentDelivery(refreshed);
    setSelectedId('RR-DEMO-1042');
    setDeliveryStartedFeedback(false);
    setOtpInput('');
    setOtpError(null);
    setVerificationSuccess(false);
  };

  const statusInfo = currentDelivery ? getDeliveryStatus(currentDelivery) : null;
  const isDeliveredOrBeyond = statusInfo?.stage === 'delivered' || statusInfo?.stage === 'verified';
  const isFullyVerified = statusInfo?.stage === 'verified';

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-[calc(100vh-5rem)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onNavigateHome && (
              <button
                onClick={onNavigateHome}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                {direction === 'rtl' ? (
                  <>
                    <ArrowRight className="w-4 h-4" />
                    <span>ہوم پیج</span>
                  </>
                ) : (
                  <>
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home</span>
                  </>
                )}
              </button>
            )}

            <span className="text-slate-300">|</span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-extrabold uppercase tracking-wide">
              <Truck className="w-3.5 h-3.5 text-blue-700" />
              <span>{isUrdu ? 'رضاکار پورٹل' : 'Field Volunteer Portal'}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold border border-amber-300 transition-colors cursor-pointer"
              title="Reset RR-DEMO-1042 for evaluation"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
              <span>{isUrdu ? 'ڈیمو ری سیٹ (RR-DEMO-1042)' : 'Reset Demo (RR-DEMO-1042)'}</span>
            </button>

            {currentDelivery && onNavigateTrack && (
              <button
                onClick={() => onNavigateTrack(currentDelivery.trackingId)}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                <span>{isUrdu ? 'ڈونر ٹریکنگ پیج دیکھیں' : 'View Donor Page'}</span>
              </button>
            )}
          </div>
        </div>

        {/* PAGE TITLE CARD */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {isUrdu ? 'ڈیلیوری ڈیش بورڈ' : 'Delivery Dashboard'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {isUrdu
                  ? 'تعینات شدہ راشن ترسیلات کا انتظام، دہلیز پر ترسیل کی تصدیق اور او ٹی پی ویریفکیشن۔'
                  : 'Manage assigned ration deliveries, update live transit status, and confirm doorstep handover with OTP verification.'}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 shrink-0">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span>{isUrdu ? 'رضاکار:' : 'Volunteer:'} <strong>Muhammad Salman</strong></span>
            </div>
          </div>

          {/* Assigned Deliveries Selector Tabs */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isUrdu ? 'تعینات شدہ ترسیلات:' : 'Assigned Deliveries:'}
            </span>

            {deliveries.slice(0, 4).map((item) => {
              const isSelected = item.trackingId === selectedId;
              const itemStatus = getDeliveryStatus(item);

              return (
                <button
                  key={item.trackingId}
                  onClick={() => handleSelectDelivery(item.trackingId)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm ring-2 ring-emerald-500/30'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.trackingId}</span>
                  {item.isDemo && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-400 text-slate-950 font-sans font-black">
                      Demo
                    </span>
                  )}
                  <span className={`w-2 h-2 rounded-full ${
                    itemStatus.stage === 'verified'
                      ? 'bg-emerald-400'
                      : itemStatus.stage === 'delivered'
                      ? 'bg-amber-400'
                      : 'bg-blue-400'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* PRIVACY & ZERO SENSITIVE INFO SAFEGUARD BANNER */}
        <div className="bg-emerald-950 text-emerald-100 rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-800/80 text-emerald-300 flex items-center justify-center shrink-0">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">
                  {isUrdu ? 'حفاظت و رازداری کی پالیسی (Privacy Safeguard)' : 'Recipient Dignity & Privacy Safeguard'}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-800 text-[10px] font-mono font-bold text-emerald-200">
                  Zero Sensitive Info
                </span>
              </div>
              <p className="text-emerald-200/80 mt-0.5 leading-relaxed">
                {isUrdu
                  ? 'مستحقین کی عزت نفس اور رازداری کے تحت CNIC، ذاتی فون نمبر یا مکمل پتہ رضاکار اسکرین پر کبھی ظاہر نہیں کیا جاتا۔ صرف جنرل ایریا اور پیکجز کی تعداد نظر آئے گی۔'
                  : 'Beneficiary privacy is strictly protected: CNIC, phone numbers, exact street addresses, and private documents are never displayed. Only general area and package count are shown.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-300 font-semibold shrink-0">
            <Lock className="w-4 h-4" />
            <span>{isUrdu ? '100% محفوظ' : 'Encrypted Token'}</span>
          </div>
        </div>

        {/* ACTIVE ASSIGNED DELIVERY CARD */}
        {currentDelivery ? (
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden space-y-0">
            
            {/* Top Status Header */}
            <div className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${statusInfo?.badgeBg}`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/15 backdrop-blur-xs text-white">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 block">
                    {isUrdu ? 'موجودہ ترسیلی صورتحال' : 'Current Delivery Status'}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {isUrdu ? statusInfo?.textUr : statusInfo?.textEn}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {currentDelivery.isDemo && (
                  <span className="px-2.5 py-1 rounded-full bg-slate-900 text-amber-300 text-xs font-bold border border-amber-300/40">
                    Demo Data
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
                  {isUrdu ? 'امانت ترسیل' : 'Amanat Cargo'}
                </span>
              </div>
            </div>

            {/* General Delivery Information (Strictly general info only: Donation, Packages, Area, Status) */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* 1. Donation */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {isUrdu ? 'عطیہ آئی ڈی:' : 'Donation:'}
                  </span>
                  <div className="text-lg sm:text-xl font-black font-mono text-slate-900">
                    {currentDelivery.trackingId}
                  </div>
                  <span className="text-[11px] text-slate-500 block">
                    {currentDelivery.campaignCategory}
                  </span>
                </div>

                {/* 2. Packages */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {isUrdu ? 'راشن پیکجز:' : 'Packages:'}
                  </span>
                  <div className="text-lg sm:text-xl font-black text-emerald-800 flex items-center gap-2">
                    <Package className="w-5 h-5 text-emerald-600" />
                    <span>{currentDelivery.rationBagsCount || 3}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 block">
                    {isUrdu ? 'معیاری خاندانی راشن پیکٹ' : 'Family Monthly Packs'}
                  </span>
                </div>

                {/* 3. Area (General area only) */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {isUrdu ? 'علاقہ (جنرل ایریا):' : 'Area:'}
                  </span>
                  <div className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{currentDelivery.city || 'Karachi'} — General Area</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold block">
                    {currentDelivery.province || 'Sindh'}
                  </span>
                </div>

                {/* 4. Status */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {isUrdu ? 'حیثیت:' : 'Status:'}
                  </span>
                  <div className="text-sm sm:text-base font-black text-slate-900">
                    {isUrdu ? statusInfo?.textUr : statusInfo?.textEn}
                  </div>
                  <span className="text-[11px] text-slate-500 block">
                    {isFullyVerified ? 'Audit Sealed' : 'Action Required'}
                  </span>
                </div>

              </div>

              {/* ACTION BUTTONS & TRANSIT FLOW */}
              <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/90 space-y-6">
                
                {/* 1. BUTTON: "Start Delivery" / "Delivery Started" */}
                {statusInfo?.stage === 'assigned' && !deliveryStartedFeedback && (
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-extrabold text-slate-900">
                        {isUrdu ? 'راشن کی ترسیل شروع کریں' : 'Start Delivery to General Area'}
                      </h4>
                      <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                        {isUrdu
                          ? 'ٹرانزٹ شروع کرنے کے لیے بٹن دبائیں۔ ڈونر کے ٹریکنگ پیج پر اسٹیٹس خودکار طور پر "In Transit" ہو جائے گا۔'
                          : 'Click below to initiate transit. The donor tracking page will immediately update to "In Transit".'}
                      </p>
                    </div>

                    <button
                      id="start-delivery-btn"
                      onClick={handleStartDelivery}
                      disabled={isProcessing}
                      className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md shadow-blue-200 transition-all flex items-center justify-center gap-2 cursor-pointer mx-auto text-sm sm:text-base disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <span>{isUrdu ? 'ترسیل شروع ہو رہی ہے...' : 'Starting Delivery...'}</span>
                      ) : (
                        <>
                          <Truck className="w-5 h-5" />
                          <span>{isUrdu ? 'ترسیل شروع کریں (Start Delivery)' : 'Start Delivery'}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* 2. AFTER CLICKING "Start Delivery", SHOW: "Delivery Started" + PROVIDE: "Confirm Delivery" */}
                {(statusInfo?.stage === 'in_transit' || deliveryStartedFeedback) && !isDeliveredOrBeyond && (
                  <div className="space-y-5 animate-in fade-in duration-300">
                    
                    {/* "Delivery Started" Confirmation Banner */}
                    <div className="bg-blue-100 border border-blue-300 text-blue-950 px-4 py-3 rounded-xl flex items-center justify-between gap-3 text-xs sm:text-sm font-bold">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-blue-700 shrink-0" />
                        <span>
                          {isUrdu ? 'ڈیلیوری شروع ہو چکی ہے (Delivery Started)' : 'Delivery Started — Packages In Transit'}
                        </span>
                      </div>
                      <span className="font-mono text-blue-800 text-xs">
                        {currentDelivery.city || 'Karachi'} — General Area
                      </span>
                    </div>

                    {/* "Confirm Delivery" Action Box */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                        <Package className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-extrabold text-slate-900">
                          {isUrdu ? 'دہلیز پر ترسیل کی تصدیق کریں' : 'Confirm Delivery Handover'}
                        </h4>
                        <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                          {isUrdu
                            ? 'جب آپ دہلیز پر راشن پیکجز پہنچا دیں، تو نیچے دیئے گئے بٹن سے ترسیل کی تصدیق کریں۔ اس سے اسٹیٹس "Delivered" ہو جائے گا۔'
                            : 'When packages are handed over, click "Confirm Delivery". This changes the donation status to "Delivered" and opens the recipient verification section.'}
                        </p>
                      </div>

                      <button
                        id="confirm-delivery-btn"
                        onClick={handleConfirmDelivery}
                        disabled={isProcessing}
                        className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer mx-auto text-sm sm:text-base disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <span>{isUrdu ? 'اسٹیٹس اپ ڈیٹ ہو رہا ہے...' : 'Updating Status...'}</span>
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            <span>{isUrdu ? 'ترسیل کی تصدیق کریں (Confirm Delivery)' : 'Confirm Delivery'}</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                )}

                {/* 3. WHEN VOLUNTEER CONFIRMS DELIVERY -> STATUS IS "Delivered" -> RECIPIENT VERIFICATION SECTION */}
                {isDeliveredOrBeyond && !isFullyVerified && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    
                    {/* Status Pill: "Delivered" */}
                    <div className="bg-amber-100 border border-amber-300 text-amber-950 px-4 py-3 rounded-xl flex items-center justify-between gap-3 text-xs sm:text-sm font-bold">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0" />
                        <span>
                          {isUrdu ? 'حیثیت: ترسیل مکمل (Status: Delivered)' : 'Status: Delivered (Doorstep Handover Confirmed)'}
                        </span>
                      </div>
                      <span className="text-amber-900 font-mono text-xs">
                        {currentDelivery.deliveredDate || 'Just now'}
                      </span>
                    </div>

                    {/* RECIPIENT VERIFICATION SECTION */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-amber-300 text-center space-y-5">
                      <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto ring-4 ring-amber-50">
                        <KeyRound className="w-6 h-6" />
                      </div>

                      <div>
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs uppercase tracking-wider border border-amber-300">
                          {isUrdu ? 'مستحق کی تصدیق کا سیکشن' : 'Recipient Verification Section'}
                        </span>
                        <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-2">
                          {isUrdu ? 'مستحق کا او ٹی پی تصدیقی کوڈ درج کریں' : 'Enter Recipient Verification OTP'}
                        </h4>
                        <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                          {isUrdu
                            ? 'راشن دہلیز پر پہنچا دیا گیا ہے۔ اب مستحق کو موصول ہونے والا 4 ہندسوں کا کوڈ درج کریں تاکہ آڈٹ لیجر مکمل ہو سکے۔'
                            : 'Doorstep handover is recorded. Enter the 4-digit recipient verification OTP to finalize zero-leakage audit confirmation.'}
                        </p>
                      </div>

                      {/* Demo OTP Helper (If Demo Mode) */}
                      {currentDelivery.isDemo && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>{isUrdu ? 'ڈیمو او ٹی پی:' : 'Demo OTP:'} <strong className="font-mono text-sm font-black text-emerald-800">{currentDelivery.demoOtp || '8492'}</strong></span>
                          <button
                            type="button"
                            onClick={handleAutoFillDemoOtp}
                            className="ml-2 px-2.5 py-0.5 rounded bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold text-[11px] cursor-pointer"
                          >
                            {isUrdu ? 'خودکار درج کریں' : 'Auto-fill'}
                          </button>
                        </div>
                      )}

                      {/* OTP Form */}
                      <form onSubmit={handleVerifyOtp} className="max-w-xs mx-auto space-y-3">
                        <input
                          type="text"
                          maxLength={6}
                          value={otpInput}
                          onChange={(e) => {
                            setOtpInput(e.target.value);
                            setOtpError(null);
                          }}
                          placeholder={currentDelivery.demoOtp || '8492'}
                          className="w-full text-center py-3 px-4 font-mono font-black text-2xl tracking-[0.3em] rounded-xl border-2 border-amber-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 bg-white text-slate-900 outline-none"
                        />

                        {otpError && (
                          <p className="text-xs font-bold text-red-600 flex items-center justify-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            <span>{otpError}</span>
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={isProcessing || otpInput.trim().length === 0}
                          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-50"
                        >
                          {isProcessing ? (
                            <span>{isUrdu ? 'تصدیق ہو رہی ہے...' : 'Verifying OTP...'}</span>
                          ) : (
                            <>
                              <ShieldCheck className="w-5 h-5" />
                              <span>{isUrdu ? 'مستحق کی تصدیق مکمل کریں' : 'Verify Recipient & Complete'}</span>
                            </>
                          )}
                        </button>
                      </form>

                    </div>

                  </div>
                )}

                {/* 4. WHEN FULLY VERIFIED -> 100% AUDIT SEALED */}
                {isFullyVerified && (
                  <div className="bg-emerald-50 border-2 border-emerald-400 p-6 sm:p-8 rounded-2xl text-center space-y-4 animate-in fade-in duration-300">
                    <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-200 ring-8 ring-emerald-100">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>

                    <div>
                      <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-950 font-extrabold text-xs uppercase tracking-wider">
                        {isUrdu ? '100% تصدیق شدہ' : 'Status: Delivered & Recipient Verified'}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-black text-emerald-950 mt-2">
                        {isUrdu ? 'ترسیل اور مستحق کی تصدیق مکمل!' : 'Delivery & Recipient Verified Successfully!'}
                      </h4>
                      <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto mt-1 leading-relaxed">
                        {isUrdu
                          ? 'مستحق کی او ٹی پی سے تصدیق ہو چکی ہے۔ ڈونر کے ٹریکنگ پیج پر تمام مراحل 100% تصدیق شدہ نظر آ رہے ہیں۔'
                          : 'Recipient authentication completed via OTP token. The donor tracking page now reflects the final verified delivery status.'}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      {onNavigateTrack && (
                        <button
                          onClick={() => onNavigateTrack(currentDelivery.trackingId)}
                          className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>{isUrdu ? 'ڈونر لائیو ٹریکنگ پیج کھولیں' : 'Open Donor Tracking Page'}</span>
                        </button>
                      )}

                      <button
                        onClick={handleResetDemo}
                        className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>{isUrdu ? 'ڈیمو دوبارہ چلائیں' : 'Replay Demo'}</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Real-time synchronization note */}
              <div className="pt-2 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {isUrdu
                    ? 'یہ ڈیش بورڈ ڈونر ٹریکنگ پیج کے ساتھ خودکار طور پر لائیو مطابقت رکھتا ہے۔'
                    : 'The volunteer dashboard synchronizes in real-time with the donor tracking page.'}
                </span>
              </div>

            </div>

          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200">
            {isUrdu ? 'کوئی ترسیل دستیاب نہیں ہے۔' : 'No delivery assigned.'}
          </div>
        )}

      </div>
    </div>
  );
};
