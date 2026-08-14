import React, { useState } from 'react';
import { 
  Truck, 
  Package, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  KeyRound, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  ExternalLink, 
  Radio,
  FileCheck,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { SAMPLE_TRACKING_RECORDS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface CourierVisualSectionProps {
  onOpenFullDetail: (id: string) => void;
  onDonateClick: () => void;
}

export const CourierVisualSection: React.FC<CourierVisualSectionProps> = ({ 
  onOpenFullDetail, 
  onDonateClick 
}) => {
  const [activeTabId, setActiveTabId] = useState('AMT-2026-FLOOD-8821');
  const { isUrdu, t, formatPKR, direction } = useLanguage();

  const record = SAMPLE_TRACKING_RECORDS[activeTabId] || SAMPLE_TRACKING_RECORDS['AMT-2026-FLOOD-8821'];

  const tabOptions = [
    { 
      id: 'AMT-2026-FLOOD-8821', 
      title: t('courierTabFlood'), 
      city: isUrdu ? 'دادو، سندھ' : 'Dadu, Sindh', 
      status: t('courierStatusDelivered'),
      isDelivered: true 
    },
    { 
      id: 'AMT-2026-RAMDN-4019', 
      title: t('courierTabRamadan'), 
      city: isUrdu ? 'لیاری، کراچی' : 'Lyari, Karachi', 
      status: t('courierStatusInTransit'),
      isDelivered: false 
    },
    { 
      id: 'AMT-2026-RATION-1104', 
      title: t('courierTabWinter'), 
      city: isUrdu ? 'سوات، خیبر پختونخوا' : 'Swat, KPK', 
      status: t('courierStatusAllocated'),
      isDelivered: false 
    },
  ];

  return (
    <section id="courier-tracking" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
            <Truck className="w-3.5 h-3.5 text-emerald-600" />
            {t('courierBadge')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t('courierHeading')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            {t('courierSubheading')}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 max-w-full overflow-x-auto">
            {tabOptions.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTabId === tab.id
                    ? 'bg-white text-emerald-950 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{tab.title}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  tab.isDelivered 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {tab.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* The Courier Tracking Visual Container */}
        <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
          
          {/* Subtle Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar: Tracking Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>{t('courierManifestTitle')}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center gap-3">
                {record.trackingId}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isUrdu ? 'مہم:' : 'Campaign:'}{' '}
                <span className="text-slate-200 font-semibold">{record.campaignName}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {isUrdu 
                    ? `کیفیت: ${record.steps[record.currentStepIndex]?.urduTitle || 'پہنچ گیا'}`
                    : `STATUS: ${record.steps[record.currentStepIndex]?.title?.toUpperCase() || 'DELIVERED'}`}
                </span>
              </div>
              <button
                onClick={() => onOpenFullDetail(record.trackingId)}
                className="bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{t('courierFullAuditBtn')}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              </button>
            </div>
          </div>

          {/* Courier Progress Timeline Visual */}
          <div className="relative z-10 py-8 border-b border-slate-800">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Checkpoint 1 */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">
                    {isUrdu ? 'مرحلہ 01' : 'STAGE 01'}
                  </span>
                </div>
                <p className="text-xs font-bold text-white">{t('courierStage1')}</p>
                <p className="text-[11px] text-slate-400">
                  {formatPKR(record.amountPKR)} {isUrdu ? '1Link تصدیق شدہ' : 'logged via 1Link'}
                </p>
              </div>

              {/* Checkpoint 2 */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">
                    {isUrdu ? 'مرحلہ 02' : 'STAGE 02'}
                  </span>
                </div>
                <p className="text-xs font-bold text-white">{t('courierStage2')}</p>
                <p className="text-[11px] text-slate-400">
                  {record.itemsIncluded.length} {isUrdu ? 'اشیاء کیو آر سیل کے ساتھ' : 'items sealed with QR'}
                </p>
              </div>

              {/* Checkpoint 3 */}
              <div className={`p-4 rounded-2xl border space-y-2 ${
                record.currentStepIndex >= 3 
                  ? 'bg-slate-800/80 border-slate-700/80' 
                  : 'bg-slate-800/40 border-dashed border-slate-700 text-slate-500'
              }`}>
                <div className="flex items-center justify-between">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    record.currentStepIndex >= 3 ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {record.currentStepIndex >= 3 ? '✓' : '3'}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {isUrdu ? 'مرحلہ 03' : 'STAGE 03'}
                  </span>
                </div>
                <p className="text-xs font-bold text-white">{t('courierStage3')}</p>
                <p className="text-[11px] text-slate-400">
                  {isUrdu ? 'رضاکار قافلہ روانہ' : `Field Lead: ${record.volunteerName || 'Assigned'}`}
                </p>
              </div>

              {/* Checkpoint 4 */}
              <div className={`p-4 rounded-2xl border space-y-2 ${
                record.currentStepIndex >= 5 
                  ? 'bg-emerald-950 border-emerald-500/60 shadow-lg' 
                  : 'bg-slate-800/40 border-dashed border-slate-700 text-slate-500'
              }`}>
                <div className="flex items-center justify-between">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    record.currentStepIndex >= 5 ? 'bg-emerald-400 text-slate-900 font-extrabold' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {record.currentStepIndex >= 5 ? '✓' : '4'}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-300 font-bold">
                    {isUrdu ? 'او ٹی پی تصدیق' : 'OTP VERIFIED'}
                  </span>
                </div>
                <p className="text-xs font-bold text-white">{t('courierStage4')}</p>
                <p className="text-[11px] text-emerald-200">
                  {record.recipientFamilyCode || (isUrdu ? 'مستحق کو حوالگی مکمل' : 'Verified Handover')}
                </p>
              </div>

            </div>
          </div>

          {/* Details Row: Logistics & Verification Cards */}
          <div className="relative z-10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Box Manifest */}
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-2">
                <Package className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('courierBagContentTitle')}</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1">
                {record.itemsIncluded.slice(0, 4).map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>• {item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Volunteer & Hub */}
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-2">
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('courierFieldLeadTitle')}</span>
              </div>
              <div className="text-xs text-slate-300 space-y-1.5">
                <p><span className="text-slate-500">{t('courierLeadLabel')}</span> {record.volunteerName || (isUrdu ? 'میدانی ٹیم لیڈر' : 'Field Team Leader')}</p>
                <p><span className="text-slate-500">{t('courierPartnerLabel')}</span> {record.partnerNgo}</p>
                <p><span className="text-slate-500">{t('courierDestLabel')}</span> {record.district}, {record.province}</p>
              </div>
            </div>

            {/* Verification Proof */}
            <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-800/80">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('courierAuditTitle')}</span>
              </div>
              <div className="text-xs text-emerald-100 space-y-1.5">
                <p><span className="text-emerald-400">{t('courierFamilyCodeLabel')}</span> <span className="font-mono">{record.recipientFamilyCode || 'FAM-SECURE-91'}</span></p>
                <p><span className="text-emerald-400">{t('courierGpsLabel')}</span> <span className="font-mono text-[11px]">{record.gpsCoordinates || '26.6912° N, 67.7781° E'}</span></p>
                <p><span className="text-emerald-400">{t('courierAuditStatusLabel')}</span> <span className="font-semibold text-emerald-200">{t('courierVerifiedHandover')}</span></p>
              </div>
            </div>

          </div>

          {/* Bottom Big CTA */}
          <div className="relative z-10 mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-400 text-center sm:text-start">
              {t('courierBottomPrompt')}
            </p>
            <button
              onClick={onDonateClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <span>{t('courierBottomCta')}</span>
              {direction === 'rtl' ? (
                <ArrowLeft className="w-4 h-4 text-slate-950 shrink-0" />
              ) : (
                <ArrowRight className="w-4 h-4 text-slate-950 shrink-0" />
              )}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
