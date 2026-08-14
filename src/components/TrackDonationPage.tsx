import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Package,
  Users,
  MapPin,
  FileCheck2,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  QrCode,
  UserCheck,
  Truck,
  ExternalLink,
  ChevronRight,
  HeartHandshake,
  RotateCcw,
  BadgeCheck
} from 'lucide-react';
import { TrackingRecord, JourneyStep, JourneyStepStatus } from '../types';
import { getDonationById, getUserCreatedDonationsList, getAllDonations } from '../data/donationStore';
import { SAMPLE_TRACKING_RECORDS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface TrackDonationPageProps {
  initialTrackingId?: string;
  onNavigateHome?: () => void;
  onNavigateDonate?: () => void;
  onSelectTrackingId?: (id: string) => void;
}

export const TrackDonationPage: React.FC<TrackDonationPageProps> = ({
  initialTrackingId = 'RR-1042',
  onNavigateHome,
  onNavigateDonate,
  onSelectTrackingId
}) => {
  const { isUrdu, t, formatPKR, direction } = useLanguage();

  const [inputTrackId, setInputTrackId] = useState<string>(initialTrackingId);
  const [searchedId, setSearchedId] = useState<string>(initialTrackingId);
  const [currentRecord, setCurrentRecord] = useState<TrackingRecord | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<boolean>(false);
  const [savedUserDonations, setSavedUserDonations] = useState<TrackingRecord[]>([]);

  // Load record whenever searchedId changes
  useEffect(() => {
    if (searchedId && searchedId.trim().length > 0) {
      const clean = searchedId.trim().toUpperCase();
      const found = getDonationById(clean);
      if (found) {
        setCurrentRecord(found);
      } else {
        setCurrentRecord(null);
      }
      setHasSearched(true);
    } else {
      setCurrentRecord(null);
      setHasSearched(false);
    }
  }, [searchedId]);

  // Load user saved donations for quick chips
  useEffect(() => {
    const refreshList = () => {
      setSavedUserDonations(getUserCreatedDonationsList());
    };
    refreshList();

    window.addEventListener('amanat_donations_changed', refreshList);
    return () => {
      window.removeEventListener('amanat_donations_changed', refreshList);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputTrackId.trim()) {
      const clean = inputTrackId.trim().toUpperCase();
      setSearchedId(clean);
      if (onSelectTrackingId) {
        onSelectTrackingId(clean);
      }
    }
  };

  const handleQuickSelectId = (id: string) => {
    setInputTrackId(id);
    setSearchedId(id);
    if (onSelectTrackingId) {
      onSelectTrackingId(id);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTryDemo = () => {
    handleQuickSelectId('RR-1042');
  };

  const handleCopyTrackingId = (idToCopy?: string) => {
    const id = idToCopy || currentRecord?.trackingId;
    if (id) {
      navigator.clipboard.writeText(id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // Helper to determine step display text and state
  const getStepData = (record: TrackingRecord) => {
    const totalStepsCount = 6;
    const currentIdx = record.currentStepIndex ?? 5;

    // Standardized descriptions matching user instructions
    const standardExplanations: Record<string, { en: string; ur: string }> = {
      received: {
        en: 'Your donation has been recorded.',
        ur: 'آپ کا عطیہ کامیابی سے ریکارڈ کر لیا گیا ہے۔'
      },
      allocated: {
        en: 'Your contribution has been allocated toward ration packages.',
        ur: 'آپ کا عطیہ راشن پیکجز کے لیے مختص کر دیا گیا ہے۔'
      },
      prepared: {
        en: `${record.rationBagsCount || 3} ration packages have been prepared.`,
        ur: `${record.rationBagsCount || 3} راشن پیکجز تیار کر لیے گئے ہیں۔`
      },
      volunteer_assigned: {
        en: 'A delivery volunteer has been assigned.',
        ur: 'ترسیل کے لیے رضاکار تعینات کر دیا گیا ہے۔'
      },
      delivered: {
        en: 'Your ration has been delivered.',
        ur: 'آپ کا راشن دہلیز پر پہنچا دیا گیا ہے۔'
      },
      verified: {
        en: 'The recipient confirmed delivery using OTP.',
        ur: 'مستحق نے او ٹی پی کوڈ کے ذریعے ترسیل کی تصدیق کر دی ہے۔'
      }
    };

    const stepDefinitions: Array<{
      key: string;
      titleEn: string;
      titleUr: string;
      defaultDescEn: string;
      defaultDescUr: string;
    }> = [
      {
        key: 'received',
        titleEn: 'Donation Received',
        titleUr: 'عطیہ موصول ہوا',
        defaultDescEn: 'Your donation has been recorded.',
        defaultDescUr: 'آپ کا عطیہ ریکارڈ کر لیا گیا ہے۔'
      },
      {
        key: 'allocated',
        titleEn: 'Ration Allocated',
        titleUr: 'راشن مخصوص کیا گیا',
        defaultDescEn: 'Your contribution has been allocated toward ration packages.',
        defaultDescUr: 'آپ کا عطیہ راشن پیکجز کے لیے مختص کیا گیا ہے۔'
      },
      {
        key: 'prepared',
        titleEn: 'Ration Prepared',
        titleUr: 'راشن پیکنگ مکمل',
        defaultDescEn: `${record.rationBagsCount} ration packages have been prepared.`,
        defaultDescUr: `${record.rationBagsCount} راشن پیکجز تیار کر لیے گئے ہیں۔`
      },
      {
        key: 'volunteer_assigned',
        titleEn: 'Volunteer Assigned',
        titleUr: 'رضاکار تعینات',
        defaultDescEn: 'A delivery volunteer has been assigned.',
        defaultDescUr: 'ترسیل کے لیے فیلڈ رضاکار تعینات کیا گیا ہے۔'
      },
      {
        key: 'delivered',
        titleEn: 'Delivered',
        titleUr: 'دہلیز پر ترسیل',
        defaultDescEn: 'Your ration has been delivered.',
        defaultDescUr: 'آپ کا راشن مستحق تک پہنچا دیا گیا ہے۔'
      },
      {
        key: 'verified',
        titleEn: 'Recipient Verified',
        titleUr: 'مستحق کی تصدیق',
        defaultDescEn: 'The recipient confirmed delivery using OTP.',
        defaultDescUr: 'مستحق نے او ٹی پی کوڈ سے تصدیق مکمل کر لی ہے۔'
      }
    ];

    return stepDefinitions.map((stepDef, idx) => {
      // Find matching step from record if exists
      const existingStep = record.steps?.find((s) => s.key === stepDef.key);

      let status: JourneyStepStatus = 'pending';
      if (idx < currentIdx) {
        status = 'completed';
      } else if (idx === currentIdx) {
        status = currentIdx === 5 ? 'completed' : 'current';
      } else {
        status = 'pending';
      }

      // If record says current step index is 5, then all 6 steps are completed
      if (currentIdx >= 5) {
        status = 'completed';
      }

      const timestamp = existingStep?.timestamp || (status === 'completed' ? 'Verified on Ground' : undefined);
      const explanation = isUrdu 
        ? (standardExplanations[stepDef.key]?.ur || stepDef.defaultDescUr)
        : (standardExplanations[stepDef.key]?.en || stepDef.defaultDescEn);

      return {
        ...stepDef,
        status,
        timestamp,
        explanation,
        location: existingStep?.location || `${record.city}, ${record.province}`,
        details: existingStep?.details,
        proofMedia: existingStep?.proofMedia
      };
    });
  };

  // Helper for Status Badge
  const getStatusBadge = (record: TrackingRecord) => {
    const currentIdx = record.currentStepIndex ?? 5;
    
    if (currentIdx >= 5) {
      return {
        labelEn: 'Delivered & Verified',
        labelUr: 'ترسیل اور تصدیق مکمل',
        bg: 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-200/80',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        icon: <ShieldCheck className="w-5 h-5 text-emerald-100 shrink-0" />
      };
    }

    if (currentIdx === 4) {
      return {
        labelEn: 'Delivered to Doorstep',
        labelUr: 'دہلیز پر ترسیل مکمل',
        bg: 'bg-teal-600 text-white border-teal-500',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
        icon: <Truck className="w-5 h-5 text-teal-100 shrink-0" />
      };
    }

    if (currentIdx === 3) {
      return {
        labelEn: 'Volunteer Assigned & En Route',
        labelUr: 'رضاکار روانہ ہے',
        bg: 'bg-blue-600 text-white border-blue-500',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
        icon: <Truck className="w-5 h-5 text-blue-100 shrink-0" />
      };
    }

    if (currentIdx === 2) {
      return {
        labelEn: 'Ration Prepared & Packed',
        labelUr: 'راشن پیکنگ مکمل',
        bg: 'bg-indigo-600 text-white border-indigo-500',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
        icon: <Package className="w-5 h-5 text-indigo-100 shrink-0" />
      };
    }

    if (currentIdx === 1) {
      return {
        labelEn: 'Ration Allocated to Family',
        labelUr: 'راشن خاندان کے لیے مختص',
        bg: 'bg-amber-600 text-white border-amber-500',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        icon: <Users className="w-5 h-5 text-amber-100 shrink-0" />
      };
    }

    return {
      labelEn: 'Donation Received',
      labelUr: 'عطیہ موصول ہو گیا',
      bg: 'bg-blue-600 text-white border-blue-500',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      icon: <CheckCircle2 className="w-5 h-5 text-blue-100 shrink-0" />
    };
  };

  // Helper for delivered count in impact card
  const getDeliveredCount = (record: TrackingRecord) => {
    const currentIdx = record.currentStepIndex ?? 5;
    const totalBags = record.rationBagsCount || 3;
    
    if (currentIdx >= 4) {
      return totalBags;
    }
    if (currentIdx >= 2) {
      return Math.max(1, Math.floor(totalBags / 2));
    }
    return 0;
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-[calc(100vh-5rem)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb / Nav */}
        <div className="flex items-center justify-between gap-4 mb-6">
          {onNavigateHome && (
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              {direction === 'rtl' ? (
                <>
                  <ArrowRight className="w-4 h-4" />
                  <span>ہوم پیج پر واپس جائیں</span>
                </>
              ) : (
                <>
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </>
              )}
            </button>
          )}

          {onNavigateDonate && (
            <button
              onClick={onNavigateDonate}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 transition-colors cursor-pointer"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'نیا عطیہ دیں' : 'Donate & Track'}</span>
            </button>
          )}
        </div>

        {/* SECTION 1: SEARCH HEADER & INPUT */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-6 sm:p-8 mb-8">
          
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wide mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isUrdu ? 'لائیو آڈٹ و ٹریکنگ' : 'Live Ground Tracking'}</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isUrdu ? 'اپنا عطیہ ٹریک کریں' : 'Track Your Donation'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              {isUrdu 
                ? 'اپنے عطیہ کی منفرد ٹریکنگ آئی ڈی (مثلاً RR-1042) درج کریں اور راشن کی تیاری سے لے کر مستحق خاندان تک ترسیل کا لائیو سفر دیکھیں۔'
                : 'Enter your unique Amanat Donation ID to view ground verification, OTP confirmation, and live courier delivery timeline.'}
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <div className="relative flex-1">
                <Search className={`absolute ${direction === 'rtl' ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400`} />
                <input
                  type="text"
                  value={inputTrackId}
                  onChange={(e) => setInputTrackId(e.target.value)}
                  placeholder={isUrdu ? 'عطیہ آئی ڈی درج کریں (مثلاً RR-1042)' : 'Enter Donation ID (e.g. RR-1042)'}
                  className={`w-full ${direction === 'rtl' ? 'pr-11 pl-4' : 'pl-11 pr-4'} py-3.5 rounded-xl border-2 border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15 bg-white text-slate-900 font-mono text-base font-bold placeholder:text-slate-400 uppercase tracking-wider outline-none transition-all`}
                />
              </div>

              <button
                type="submit"
                className="py-3.5 px-7 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md shadow-emerald-200/80 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base shrink-0"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>{isUrdu ? 'ٹریک کریں' : 'Track'}</span>
              </button>
            </div>
          </form>

          {/* Quick Demo & User Donation Chips */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-600 font-semibold">{isUrdu ? 'ڈیمو آئی ڈیز آزمائیں:' : 'Try Sample ID:'}</span>
            <button
              onClick={() => handleQuickSelectId('RR-1042')}
              className={`px-2.5 py-1 rounded-lg font-mono font-bold border transition-colors cursor-pointer ${
                searchedId === 'RR-1042'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              RR-1042 (Verified)
            </button>
            <button
              onClick={() => handleQuickSelectId('AMT-2026-FLOOD-8821')}
              className={`px-2.5 py-1 rounded-lg font-mono font-bold border transition-colors cursor-pointer ${
                searchedId === 'AMT-2026-FLOOD-8821'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              AMT-2026-FLOOD-8821
            </button>
            <button
              onClick={() => handleQuickSelectId('AMT-2026-RAMDN-4019')}
              className={`px-2.5 py-1 rounded-lg font-mono font-bold border transition-colors cursor-pointer ${
                searchedId === 'AMT-2026-RAMDN-4019'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              AMT-2026-RAMDN-4019
            </button>

            {/* If user created their own donations, show them here */}
            {savedUserDonations.length > 0 && (
              <div className="w-full flex flex-wrap items-center justify-center gap-1.5 mt-2 pt-2 border-t border-dashed border-slate-200">
                <span className="text-[11px] font-bold text-emerald-700">{isUrdu ? 'آپ کے تخلیق کردہ عطیات:' : 'Your Created Donations:'}</span>
                {savedUserDonations.slice(0, 3).map((d) => (
                  <button
                    key={d.trackingId}
                    onClick={() => handleQuickSelectId(d.trackingId)}
                    className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 cursor-pointer"
                  >
                    {d.trackingId} (Rs. {d.amountPKR.toLocaleString()})
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* SECTION 2: SEARCH RESULTS (Valid Donation vs Invalid Error) */}
        {!currentRecord ? (
          
          /* STATE A: INVALID / NOT FOUND ID */
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-amber-50/50">
              <AlertCircle className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {isUrdu ? 'ہمیں یہ عطیہ نہیں مل سکا۔' : "We couldn't find this donation."}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {isUrdu
                ? `آئی ڈی "${searchedId || inputTrackId}" ڈیٹا بیس میں موجود نہیں ہے۔ براہ کرم درست آئی ڈی درج کریں یا ڈیمو عطیہ آزمائیں۔`
                : `We couldn't find a record for "${searchedId || inputTrackId}". Please verify the ID format (e.g. RR-1042) or try our live demo.`}
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleTryDemo}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isUrdu ? 'ڈیمو آزمائیں (RR-1042)' : 'Try Demo'}</span>
              </button>

              {onNavigateDonate && (
                <button
                  onClick={onNavigateDonate}
                  className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold rounded-xl border border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <HeartHandshake className="w-4 h-4 text-emerald-700" />
                  <span>{isUrdu ? 'نیا عطیہ بنائیں' : 'Create Donation'}</span>
                </button>
              )}
            </div>
          </div>

        ) : (

          /* STATE B: VALID COMPLETE TRACKING PAGE */
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* 1. TOP STATUS BADGE & MAIN DETAILS CARD */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-200/90 overflow-hidden">
              
              {/* Large Status Badge at the Top */}
              {(() => {
                const badge = getStatusBadge(currentRecord);
                return (
                  <div className={`p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 ${badge.bg} shadow-xs`}>
                    <div className="flex items-center gap-3 text-center sm:text-left">
                      <div className="p-2 rounded-xl bg-white/15 backdrop-blur-xs">
                        {badge.icon}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 block">
                          {isUrdu ? 'موجودہ صورتحال' : 'Current Status'}
                        </span>
                        <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                          {isUrdu ? badge.labelUr : badge.labelEn}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 backdrop-blur-xs">
                        {isUrdu ? '100% تصدیق شدہ' : '100% Zero Leakage'}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Main Donation Meta Grid */}
              <div className="p-6 sm:p-8 bg-slate-50/50 border-b border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Item 1: Donation ID */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
                    <span className="text-xs font-semibold text-slate-500 block">
                      {isUrdu ? 'عطیہ ٹریکنگ آئی ڈی' : 'Donation ID'}
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-lg sm:text-xl font-extrabold font-mono text-emerald-800 preserve-ltr">
                        {currentRecord.trackingId}
                      </span>
                      <button
                        onClick={() => handleCopyTrackingId(currentRecord.trackingId)}
                        title="Copy ID"
                        className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 transition-colors cursor-pointer"
                      >
                        {copiedId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{isUrdu ? 'تصدیق شدہ امانت لیجر' : 'Verified Audit Token'}</span>
                    </span>
                  </div>

                  {/* Item 2: Amount */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
                    <span className="text-xs font-semibold text-slate-500 block">
                      {isUrdu ? 'عطیہ کی رقم' : 'Amount'}
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                      Rs. {currentRecord.amountPKR.toLocaleString()}
                    </div>
                    <span className="text-[11px] text-slate-500 block truncate">
                      {isUrdu ? 'عطیہ دہندہ:' : 'Donor:'} <strong>{currentRecord.donorName}</strong>
                    </span>
                  </div>

                  {/* Item 3: Campaign & Destination */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
                    <span className="text-xs font-semibold text-slate-500 block">
                      {isUrdu ? 'مقصد و مقام' : 'Purpose & Region'}
                    </span>
                    <div className="text-sm font-bold text-slate-800 line-clamp-1">
                      {currentRecord.campaignCategory}
                    </div>
                    <span className="text-xs text-slate-600 flex items-center gap-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{currentRecord.district}, {currentRecord.city}</span>
                    </span>
                  </div>

                </div>
              </div>

            </div>

            {/* 2. "YOUR IMPACT" CARD */}
            {(() => {
              const totalBags = currentRecord.rationBagsCount || 3;
              const deliveredCount = getDeliveredCount(currentRecord);
              const progressPercentage = Math.round((deliveredCount / totalBags) * 100);

              return (
                <div className="bg-white rounded-2xl shadow-sm border border-emerald-200 p-6 sm:p-8 space-y-6">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                        <Sparkles className="w-5 h-5 text-emerald-700" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900">
                          {isUrdu ? 'آپ کا اثر' : 'Your Impact'}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {isUrdu ? 'زمین پر آپ کے عطیہ کے ذریعے حاصل ہونے والی براہِ راست امداد' : 'Measurable ground relief delivered to verified families'}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 self-start sm:self-auto">
                      <BadgeCheck className="w-4 h-4 text-emerald-600" />
                      <span>{isUrdu ? 'شفاف تقسیم' : '100% Handover'}</span>
                    </span>
                  </div>

                  {/* 4 Impact Metric Blocks */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    
                    {/* Metric 1: Amount */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-center space-y-0.5">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        {isUrdu ? 'عطیہ رقم' : 'Amount'}
                      </span>
                      <div className="text-base sm:text-xl font-black text-slate-900 font-mono">
                        Rs. {currentRecord.amountPKR.toLocaleString()}
                      </div>
                    </div>

                    {/* Metric 2: Ration Packages */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-center space-y-0.5">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        {isUrdu ? 'راشن پیکجز' : 'Ration Packages'}
                      </span>
                      <div className="text-base sm:text-xl font-black text-emerald-800">
                        {totalBags} {isUrdu ? 'پیکٹ' : 'Packages'}
                      </div>
                    </div>

                    {/* Metric 3: Families Supported */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-center space-y-0.5">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        {isUrdu ? 'مستحق خاندان' : 'Families'}
                      </span>
                      <div className="text-base sm:text-xl font-black text-slate-900">
                        {totalBags} {isUrdu ? 'خاندان' : 'Families'}
                      </div>
                    </div>

                    {/* Metric 4: Verified Deliveries */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-center space-y-0.5">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        {isUrdu ? 'تصدیق شدہ ترسیل' : 'Verified Deliveries'}
                      </span>
                      <div className="text-base sm:text-xl font-black text-emerald-700">
                        {deliveredCount} {isUrdu ? 'مکمل' : 'Deliveries'}
                      </div>
                    </div>

                  </div>

                  {/* Impact Progress Bar */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-700 flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-emerald-600" />
                        <span>{isUrdu ? 'ترسیل کی پیشرفت:' : 'Delivery Progress:'}</span>
                      </span>
                      <span className="font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {deliveredCount} / {totalBags} {isUrdu ? 'پہنچ گئے' : 'Delivered'}
                      </span>
                    </div>

                    <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                      <div
                        className="h-full bg-linear-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-700"
                        style={{ width: `${Math.max(8, progressPercentage)}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                      <span>{isUrdu ? 'مرحلہ وار گراؤنڈ لاجسٹکس' : 'Stage-by-stage ground logistics'}</span>
                      <span className="font-semibold text-emerald-700">{progressPercentage}% {isUrdu ? 'مکمل' : 'Completed'}</span>
                    </div>
                  </div>

                </div>
              );
            })()}

            {/* 3. LARGE VISUAL TIMELINE (6 EXACT STAGES) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-700" />
                    <span>{isUrdu ? 'عطیہ کا لائیو سفر اور ٹائم لائن' : 'Live Aid Journey Timeline'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isUrdu 
                      ? 'ہر مرحلے پر وقت، مقام اور زمینی تصدیق کی تفصیلات' 
                      : 'End-to-end audit trail distinguishing completed, current, and upcoming stages.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-1 font-semibold text-emerald-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> {isUrdu ? 'مکمل' : 'Completed'}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-blue-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" /> {isUrdu ? 'جاری' : 'Current'}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> {isUrdu ? 'آئندہ' : 'Upcoming'}
                  </span>
                </div>
              </div>

              {/* The 6 Large Timeline Steps */}
              <div className="relative pl-2 sm:pl-4 space-y-8 pt-2">
                
                {getStepData(currentRecord).map((step, idx, array) => {
                  const isCompleted = step.status === 'completed';
                  const isCurrent = step.status === 'current';
                  const isUpcoming = step.status === 'pending';
                  const isLast = idx === array.length - 1;

                  return (
                    <div key={step.key} className="relative flex items-start gap-4 sm:gap-6 group">
                      
                      {/* Vertical Connector Line */}
                      {!isLast && (
                        <div
                          className={`absolute ${direction === 'rtl' ? 'right-[19px] sm:right-[23px]' : 'left-[19px] sm:left-[23px]'} top-10 bottom-[-24px] w-1 transition-colors ${
                            isCompleted ? 'bg-emerald-500' : isCurrent ? 'bg-linear-to-b from-blue-500 to-slate-200' : 'bg-slate-200 border-l border-dashed border-slate-300'
                          }`}
                        />
                      )}

                      {/* Timeline Node Icon */}
                      <div className="relative z-10 shrink-0 mt-0.5">
                        {isCompleted && (
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-200 ring-4 ring-emerald-50">
                            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                          </div>
                        )}

                        {isCurrent && (
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 ring-4 ring-blue-100 animate-pulse">
                            <span className="text-xs font-black font-mono">{idx + 1}</span>
                          </div>
                        )}

                        {isUpcoming && (
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 text-slate-400 flex items-center justify-center">
                            <span className="text-xs font-bold font-mono">{idx + 1}</span>
                          </div>
                        )}
                      </div>

                      {/* Content Card for Step */}
                      <div className={`flex-1 p-4 sm:p-5 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-blue-50/70 border-2 border-blue-300 shadow-sm'
                          : isCompleted
                          ? 'bg-white border-slate-200/90 shadow-xs hover:border-emerald-200'
                          : 'bg-slate-50/40 border-slate-200/60 opacity-80'
                      }`}>
                        
                        {/* Header Row: Title + Status Pill + Timestamp */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold font-mono text-slate-400">
                              0{idx + 1}.
                            </span>
                            <h4 className={`text-base sm:text-lg font-bold ${
                              isCompleted ? 'text-slate-900' : isCurrent ? 'text-blue-950' : 'text-slate-500'
                            }`}>
                              {isUrdu ? step.titleUr : step.titleEn}
                            </h4>

                            {/* Status Tag Pill */}
                            {isCompleted && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                {isUrdu ? 'مکمل' : 'Completed'}
                              </span>
                            )}
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200 animate-pulse">
                                {isUrdu ? 'جاری ہے' : 'In Progress'}
                              </span>
                            )}
                            {isUpcoming && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-500">
                                {isUrdu ? 'آئندہ مرحلہ' : 'Upcoming'}
                              </span>
                            )}
                          </div>

                          {step.timestamp && (
                            <span className="text-xs font-medium text-slate-500 flex items-center gap-1 font-mono">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span>{step.timestamp}</span>
                            </span>
                          )}
                        </div>

                        {/* Short Explanation (Strictly as specified in user prompt) */}
                        <p className={`text-xs sm:text-sm leading-relaxed mt-1 ${
                          isCurrent ? 'text-blue-900 font-medium' : isCompleted ? 'text-slate-700 font-normal' : 'text-slate-500'
                        }`}>
                          "{step.explanation}"
                        </p>

                        {/* Extra details or location tags if available */}
                        {step.location && (
                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{step.location}</span>
                            </span>

                            {step.proofMedia && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                <FileCheck2 className="w-3 h-3" />
                                <span>{step.proofMedia.label}</span>
                              </span>
                            )}
                          </div>
                        )}

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* 4. VERIFICATION AUDIT & GROUND DETAILS */}
            <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      {isUrdu ? 'امانت گراؤنڈ تصدیقی ثبوت' : 'Ground Verification Proof'}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {isUrdu ? 'مستحق کوڈ، او ٹی پی ویریفکیشن اور جی پی ایس ٹیگز' : 'Tamper-proof digital tokens and recipient authentication'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-mono font-bold border border-emerald-500/20">
                    OTP: VERIFIED-100%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 space-y-1">
                  <span className="text-slate-400 block font-semibold">{isUrdu ? 'مستحق فیملی ٹوکن:' : 'Beneficiary Code:'}</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm block">
                    {currentRecord.recipientFamilyCode || 'FAM-SKR-UC12-1042'}
                  </span>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 space-y-1">
                  <span className="text-slate-400 block font-semibold">{isUrdu ? 'تعینات رضاکار:' : 'Assigned Field Lead:'}</span>
                  <span className="font-bold text-slate-200 text-sm block">
                    {currentRecord.volunteerName || 'Muhammad Salman (Verified)'}
                  </span>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 space-y-1">
                  <span className="text-slate-400 block font-semibold">{isUrdu ? 'شراکت دار تنظیم:' : 'Partner NGO:'}</span>
                  <span className="font-bold text-slate-200 text-sm block truncate">
                    {currentRecord.partnerNgo}
                  </span>
                </div>
              </div>

              {/* Items included */}
              {currentRecord.itemsIncluded && currentRecord.itemsIncluded.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-300 mb-2 block">
                    {isUrdu ? 'راشن پیکج میں شامل اشیاء:' : 'Standard Ration Package Contents:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentRecord.itemsIncluded.map((item, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs border border-slate-700 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 5. FOOTER ACTIONS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={() => handleCopyTrackingId(currentRecord.trackingId)}
                className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                {copiedId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId ? (isUrdu ? 'کاپی ہو گیا!' : 'Copied to Clipboard') : (isUrdu ? 'ٹریکنگ لنک کاپی کریں' : 'Copy Tracking Link')}</span>
              </button>

              <button
                onClick={() => {
                  setInputTrackId('');
                  setSearchedId('');
                  setCurrentRecord(null);
                  setHasSearched(false);
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isUrdu ? 'دوسرا عطیہ تلاش کریں' : 'Track Another Donation'}</span>
              </button>
            </div>

          </div>

        )}

      </div>
    </div>
  );
};
