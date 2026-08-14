import React from 'react';
import { 
  HeartHandshake, 
  Search, 
  Truck, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  Sparkles,
  Smartphone,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HowAmanatWorksSectionProps {
  onOpenSampleTracker: (sampleId: string) => void;
}

export const HowAmanatWorksSection: React.FC<HowAmanatWorksSectionProps> = ({ onOpenSampleTracker }) => {
  const { isUrdu, t, direction } = useLanguage();

  const steps = [
    {
      step: 1,
      title: t('howStep1Title'),
      urdu: isUrdu ? 'پہلا مرحلہ' : 'عطیہ اور منفرد ٹریکنگ آئی ڈی',
      description: t('howStep1Desc'),
      badge: t('howStep1Badge'),
      icon: <HeartHandshake className="w-6 h-6 text-emerald-600" />,
      detail: t('howStep1Detail')
    },
    {
      step: 2,
      title: t('howStep2Title'),
      urdu: isUrdu ? 'دوسرا مرحلہ' : 'لائیو سفر اور ترسیل کی ٹریکنگ',
      description: t('howStep2Desc'),
      badge: t('howStep2Badge'),
      icon: <Search className="w-6 h-6 text-emerald-600" />,
      detail: t('howStep2Detail')
    },
    {
      step: 3,
      title: t('howStep3Title'),
      urdu: isUrdu ? 'تیسرا مرحلہ' : 'رضاکار کی ترسیل اور فیلڈ تصدیق',
      description: t('howStep3Desc'),
      badge: t('howStep3Badge'),
      icon: <Truck className="w-6 h-6 text-emerald-600" />,
      detail: t('howStep3Detail')
    },
    {
      step: 4,
      title: t('howStep4Title'),
      urdu: isUrdu ? 'چوتھا مرحلہ' : 'او ٹی پی اور مستحق کی حتمی تصدیق',
      description: t('howStep4Desc'),
      badge: t('howStep4Badge'),
      icon: <KeyRound className="w-6 h-6 text-emerald-600" />,
      detail: t('howStep4Detail')
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/70 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            {t('howBadge')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t('howHeading')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            {t('howSubheading')}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Step Pill & Number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {isUrdu ? `مرحلہ 0${item.step}` : `Step 0${item.step}`}
                  </span>
                </div>

                {/* Step Title & Description */}
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {item.step}. {item.title}
                </h3>
                <p className="text-sm font-semibold text-slate-800 mb-2 leading-snug">
                  {item.description}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.detail}
                </p>
              </div>

              {/* Card Footer Tag */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  {item.badge}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>

        {/* Interactive CTA Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-emerald-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800 flex items-center justify-center shrink-0 border border-emerald-700">
              <ShieldCheck className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                {t('howBannerTitle')}
              </h4>
              <p className="text-xs sm:text-sm text-emerald-200">
                {t('howBannerDesc')}
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenSampleTracker('AMT-2026-FLOOD-8821')}
            className="px-6 py-3 rounded-full bg-white hover:bg-emerald-50 text-emerald-950 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] shrink-0"
          >
            <span>{t('howBannerBtn')}</span>
            {direction === 'rtl' ? (
              <ArrowLeft className="w-4 h-4 text-emerald-700" />
            ) : (
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            )}
          </button>
        </div>

      </div>
    </section>
  );
};
