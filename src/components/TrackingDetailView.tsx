import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  CircleDot, 
  MapPin, 
  Truck, 
  Package, 
  ShieldCheck, 
  CreditCard, 
  FileCheck, 
  UserCheck, 
  Copy, 
  Check, 
  X, 
  Share2, 
  ExternalLink,
  Phone,
  AlertCircle,
  QrCode
} from 'lucide-react';
import { TrackingRecord, JourneyStep } from '../types';
import { SAMPLE_TRACKING_RECORDS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface TrackingDetailViewProps {
  trackingId: string;
  onClose: () => void;
  onSelectAnotherSample: (id: string) => void;
}

export const TrackingDetailView: React.FC<TrackingDetailViewProps> = ({
  trackingId,
  onClose,
  onSelectAnotherSample,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'items' | 'volunteer' | 'audit'>('timeline');
  const { isUrdu, t, formatPKR, direction } = useLanguage();

  // Look up in database or create fallback structured sample
  const record: TrackingRecord = SAMPLE_TRACKING_RECORDS[trackingId] || {
    trackingId: trackingId,
    donorName: isUrdu ? 'معزز عطیہ دہندہ (تصدیق شدہ)' : 'Valued Pakistani Donor (Verified)',
    campaignName: isUrdu ? 'سیلاب زدگان ہنگامی راشن مہم' : 'Emergency Ration & Food Security Drive',
    campaignCategory: 'Flood Relief',
    amountPKR: 13000,
    rationBagsCount: 2,
    itemsIncluded: isUrdu 
      ? ['گندم کا آٹا (20 کلو بیگ x 2)', 'کوکنگ آئل (6 لیٹر)', 'باسمتی چاول (5 کلو)', 'دالیں (3 کلو)', 'چینی و چائے کی پتی (2 کلو)']
      : ['Atta (20kg Bag x 2)', 'Cooking Oil (6L)', 'Basmati Rice (5kg)', 'Pulses/Daal (3kg)', 'Sugar & Tea (2kg)'],
    city: 'Sukkur',
    district: 'Union Council 12',
    province: 'Sindh',
    partnerNgo: isUrdu ? 'امانت ریلیف لاجسٹکس نیٹ ورک' : 'Amanat Relief Logistics Network',
    volunteerName: isUrdu ? 'محمد سلمان (رجسٹرڈ فیلڈ ورکر)' : 'Muhammad Salman (Registered Aid Worker)',
    volunteerPhoneMasked: '+92 321 •••• 552',
    currentStepIndex: 2, // Prepared
    gpsCoordinates: '27.7052° N, 68.8574° E',
    recipientFamilyCode: 'FAM-SKR-UC12-094',
    steps: [
      {
        key: 'received',
        title: 'Donation Received',
        urduTitle: 'عطیہ موصول ہوا',
        description: isUrdu ? 'ادائیگی موصول ہوئی۔ منفرد ٹریکنگ آئی ڈی جاری ہو گئی۔' : 'Payment confirmed. Unique tracking ID registered.',
        timestamp: isUrdu ? 'آج، صبح 08:30' : 'Today, 08:30 AM',
        location: isUrdu ? 'امانت مرکزی پورٹل' : 'Amanat Central Gateway',
        status: 'completed',
        details: ['Online Banking Gateway #REF-99218'],
        proofMedia: { type: 'receipt', label: isUrdu ? 'ای رسید تصدیق شدہ' : 'E-Receipt Verified' }
      },
      {
        key: 'allocated',
        title: 'Ration Allocated',
        urduTitle: 'راشن مخصوص کیا گیا',
        description: isUrdu ? '2 فیملی راشن پیکجز یونین کونسل فہرست کے مطابق مخصوص کیے گئے۔' : '2 Family Ration Packages allocated to verified disaster survey index.',
        timestamp: isUrdu ? 'آج، صبح 11:15' : 'Today, 11:15 AM',
        location: isUrdu ? 'سکھر ریجنل ہب' : 'Sukkur Regional Hub',
        status: 'completed',
        details: [isUrdu ? 'مستحق خاندان انڈیکس یونین کونسل سے منسلک' : 'Beneficiary family index matched via UC-12 relief list']
      },
      {
        key: 'prepared',
        title: 'Ration Prepared & Quality Checked',
        urduTitle: 'راشن پیکنگ مکمل',
        description: isUrdu ? 'راشن بیگز تیار کر کے کیو آر کوڈ سے سیل کر دیے گئے۔' : 'Ration bags packed and sealed with Amanat tamper-proof QR code.',
        timestamp: isUrdu ? 'آج، دوپہر 02:45' : 'Today, 02:45 PM',
        location: isUrdu ? 'گودام ڈاک نمبر 4' : 'Warehouse Dock #4',
        status: 'current',
        details: [isUrdu ? 'اعلیٰ کوالٹی فوڈ آئٹمز بارکوڈ ٹیگڈ' : 'Grade-A food items weighed and barcode tagged']
      },
      {
        key: 'volunteer_assigned',
        title: 'Volunteer Assignment',
        urduTitle: 'رضاکار تعیناتی',
        description: isUrdu ? 'فیلڈ رضاکار ترسیل کے لیے نامزد کیا جا رہا ہے۔' : 'Field distribution coordinator being assigned for delivery.',
        status: 'pending'
      },
      {
        key: 'delivered',
        title: 'Doorstep Delivery',
        urduTitle: 'دہلیز پر ترسیل',
        description: isUrdu ? 'راشن براہِ راست مستحق کے سپرد کیا جائے گا۔' : 'Package will be handed over directly to recipient.',
        status: 'pending'
      },
      {
        key: 'verified',
        title: 'Recipient Verification',
        urduTitle: 'مستحق کی تصدیق',
        description: isUrdu ? 'او ٹی پی اور تصویری تصدیق کے ساتھ ٹریکنگ مکمل ہو جائے گی۔' : 'NADRA-safe token & photo log will close tracking.',
        status: 'pending'
      }
    ]
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(record.trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = () => {
    if (record.currentStepIndex >= 5) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>{t('statusDeliveredVerified')}</span>
        </span>
      );
    }
    if (record.currentStepIndex >= 3) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
          <Truck className="w-3.5 h-3.5 text-amber-700 animate-pulse shrink-0" />
          <span>{t('statusVolunteerDispatched')}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
        <Package className="w-3.5 h-3.5 text-blue-700 shrink-0" />
        <span>{t('statusProcessingPackaging')}</span>
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header Bar */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                  {t('trackingLiveTitle')}
                </span>
                <span className="font-urdu text-xs text-emerald-300">امانت ٹریکنگ</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-mono tracking-tight text-white flex items-center gap-2 preserve-ltr">
                <span>{record.trackingId}</span>
                <button
                  onClick={handleCopy}
                  title={isUrdu ? "ٹریکنگ آئی ڈی کاپی کریں" : "Copy Tracking ID"}
                  className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Campaign Summary Strip */}
        <div className="bg-emerald-50/70 border-b border-emerald-100 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {getStatusBadge()}
            <span className="text-xs font-semibold text-slate-700">
              {record.campaignName}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <div>
              <span className="text-slate-400">{t('trackingTotalAidLabel')}</span>{' '}
              <strong className="text-slate-900 font-mono">{formatPKR(record.amountPKR)}</strong> ({record.rationBagsCount} {isUrdu ? 'راشن بیگز' : 'Ration Bags'})
            </div>
            <div className="hidden sm:block">
              <span className="text-slate-400">{t('trackingLocationLabel')}</span>{' '}
              <strong className="text-slate-900">{record.district}, {record.province}</strong>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-5 pt-2 bg-slate-50 text-xs font-semibold text-slate-600 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'timeline'
                ? 'border-emerald-600 text-emerald-800 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{t('trackingTabTimeline')}</span>
          </button>
          <button
            onClick={() => setActiveTab('items')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'items'
                ? 'border-emerald-600 text-emerald-800 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="w-3.5 h-3.5 shrink-0" />
            <span>{t('trackingTabItems')} ({record.rationBagsCount})</span>
          </button>
          <button
            onClick={() => setActiveTab('volunteer')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'volunteer'
                ? 'border-emerald-600 text-emerald-800 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Truck className="w-3.5 h-3.5 shrink-0" />
            <span>{t('trackingTabVolunteer')}</span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'audit'
                ? 'border-emerald-600 text-emerald-800 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>{t('trackingTabAudit')}</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1 space-y-6">
          
          {/* TAB 1: 6-Stage Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              
              {/* Progress Summary Header */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-500 font-medium">{t('trackingChainOfCustody')}</p>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                    {isUrdu 
                      ? `مرحلہ ${record.currentStepIndex + 1} از 6 مکمل`
                      : `Step ${record.currentStepIndex + 1} of 6 Completed`}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-mono preserve-ltr">
                    GPS: {record.gpsCoordinates || '26.6912° N, 67.7781° E'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    {t('trackingLiveSynced')}
                  </span>
                </div>
              </div>

              {/* 6 Step Visual Timeline */}
              <div className={`relative ${isUrdu ? 'pr-6 sm:pr-8 pl-0' : 'pl-6 sm:pl-8 pr-0'} space-y-8 before:absolute ${isUrdu ? 'before:right-3 sm:before:right-4' : 'before:left-3 sm:before:left-4'} before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200`}>
                {record.steps.map((step, idx) => {
                  const isCompleted = step.status === 'completed';
                  const isCurrent = step.status === 'current';
                  const isPending = step.status === 'pending';

                  return (
                    <div key={step.key} className="relative group">
                      
                      {/* Step Circle Marker */}
                      <div className={`absolute ${isUrdu ? '-right-6 sm:-right-8' : '-left-6 sm:-left-8'} top-0.5 flex items-center justify-center`}>
                        {isCompleted ? (
                          <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                            <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[3]" />
                          </div>
                        ) : isCurrent ? (
                          <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md ring-4 ring-amber-100 animate-pulse">
                            <CircleDot className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                          </div>
                        ) : (
                          <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-400 flex items-center justify-center text-xs font-bold font-mono">
                            {idx + 1}
                          </div>
                        )}
                      </div>

                      {/* Step Content Card */}
                      <div className={`p-4 rounded-xl border transition-all ${
                        isCurrent 
                          ? 'bg-amber-50/40 border-amber-300 shadow-sm' 
                          : isCompleted 
                            ? 'bg-white border-slate-200 shadow-2xs hover:border-emerald-300' 
                            : 'bg-slate-50/50 border-slate-200 opacity-60'
                      }`}>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                              {isUrdu ? `مرحلہ 0${idx + 1}` : `Stage 0${idx + 1}`}
                            </span>
                            <h3 className={`text-sm sm:text-base font-bold ${
                              isCompleted ? 'text-slate-900' : isCurrent ? 'text-amber-950 font-extrabold' : 'text-slate-500'
                            }`}>
                              {isUrdu ? step.urduTitle : step.title}
                            </h3>
                            {!isUrdu && (
                              <span className="font-urdu text-xs text-emerald-800 font-bold">
                                {step.urduTitle}
                              </span>
                            )}
                          </div>

                          {step.timestamp && (
                            <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {step.timestamp}
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          {step.description}
                        </p>

                        {/* Location / Meta tags */}
                        <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                          {step.location && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              {step.location}
                            </span>
                          )}

                          {step.proofMedia && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                              <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                              {step.proofMedia.label}
                            </span>
                          )}

                          {step.details?.map((detail, dIdx) => (
                            <span key={dIdx} className="text-[11px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                              {detail}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 2: Ration Pack Contents */}
          {activeTab === 'items' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    {isUrdu ? 'معیاری خاندانی غذائی راشن پیکج' : 'Standard Family Nutrition Package'}
                  </h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    {isUrdu 
                      ? '6 سے 7 افراد کے خاندان کے 30 دن کے ضروری راشن کے مطابق تیار شدہ۔'
                      : 'Designed to sustain an average family of 6-7 members for 30 days during emergencies.'}
                  </p>
                </div>
                <div className="text-end">
                  <span className="text-xs text-emerald-700 font-medium">
                    {isUrdu ? 'فنڈ شدہ بیگز' : 'Bags Funded'}
                  </span>
                  <p className="text-lg font-bold text-emerald-900">
                    {record.rationBagsCount} {isUrdu ? 'پیکٹس' : 'Units'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {record.itemsIncluded.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                      {idx + 1}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-500 border border-slate-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {isUrdu 
                    ? 'تمام اشیاء براہِ راست پاکستانی فلور ملز اور ہول سیلرز سے بغیر مڈل مین کٹوتی کے خریدی جاتی ہیں۔'
                    : 'All items sourced in bulk at wholesale rates through certified Pakistani millers with zero middleman profit.'}
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: Field Volunteer & Area */}
          {activeTab === 'volunteer' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-lg border border-emerald-200 shrink-0">
                    {record.volunteerName ? record.volunteerName.charAt(0) : 'V'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">
                        {record.volunteerName || (isUrdu ? 'فیلڈ رضاکار ٹیم' : 'Field Volunteer Team')}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {isUrdu ? 'شناختی کارڈ و نادرا تصدیق شدہ' : 'CNIC & Bio Verified'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isUrdu ? 'شراکت دار تنظیم:' : 'Partner Organization:'} <strong>{record.partnerNgo}</strong>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-400 block mb-1">
                      {isUrdu ? 'ہدف یونین کونسل' : 'Target Union Council'}
                    </span>
                    <span className="font-semibold text-slate-800">{record.district}, {record.province}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-400 block mb-1">
                      {isUrdu ? 'براہ راست فیلڈ رابطہ' : 'Direct Field Contact'}
                    </span>
                    <span className="font-mono font-semibold text-slate-800 preserve-ltr">{record.volunteerPhoneMasked || '+92 300 •••• •••'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Audit Seal */}
          {activeTab === 'audit' && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {isUrdu ? 'امانت ناقابل تنسیخ ڈیجیٹل آڈٹ' : 'Amanat Tamper-Proof Digital Audit'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {t('transVerifiedNotice')}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg font-mono text-xs text-slate-700 space-y-2 border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-400">{isUrdu ? 'لیجر ہیش:' : 'Ledger Hash:'}</span>
                  <span className="font-bold text-emerald-800 preserve-ltr">0x8f2a99d04b72e819cd...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{isUrdu ? 'نادرا محفوظ ٹوکن:' : 'NADRA Safe Token:'}</span>
                  <span className="preserve-ltr">{record.recipientFamilyCode || 'FAM-BENEFICIARY-VERIFIED'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{isUrdu ? 'آڈٹ حیثیت:' : 'Digital Audit Status:'}</span>
                  <span className="text-emerald-700 font-bold">{isUrdu ? '100% کامیاب تصدیق' : '100% Passed'}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">{t('trackingOtherSamples')}</span>
            {['AMT-2026-FLOOD-8821', 'AMT-2026-RAMDN-4019', 'AMT-2026-RATION-1104']
              .filter(id => id !== record.trackingId)
              .map(id => (
                <button
                  key={id}
                  onClick={() => onSelectAnotherSample(id)}
                  className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 font-mono text-[11px] rounded border border-slate-200 cursor-pointer preserve-ltr"
                >
                  {id}
                </button>
              ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert(isUrdu ? `ٹریکنگ لنک کاپی کر لیا گیا: ${record.trackingId}` : `Amanat Tracking Link for ${record.trackingId} copied to clipboard!`);
              }}
              className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 shrink-0" />
              <span>{t('trackingShareBtn')}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
            >
              {t('trackingCloseBtn')}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
