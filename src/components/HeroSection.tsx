import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  HeartHandshake, 
  PlayCircle, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Package, 
  KeyRound, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Lock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onSearchTrackId: (id: string) => void;
  onDonateClick: () => void;
  onOpenDemo: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onSearchTrackId, 
  onDonateClick, 
  onOpenDemo 
}) => {
  const [trackInput, setTrackInput] = useState('');
  const { isUrdu, t, direction } = useLanguage();

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackInput.trim()) {
      onSearchTrackId(trackInput.trim().toUpperCase());
    } else {
      onSearchTrackId('AMT-2026-FLOOD-8821');
    }
  };

  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-20 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50 border-b border-slate-200/80 overflow-hidden">
      
      {/* Background Subtle Geometry */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-teal-100/50 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Center Area */}
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Logo / Brand Name Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-300/80 text-emerald-900 text-xs sm:text-sm font-semibold mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-extrabold tracking-wide uppercase">AMANAT</span>
            <span className="text-emerald-400">•</span>
            <span className="font-urdu text-sm font-bold text-emerald-800">امانت</span>
            <span className="text-emerald-400 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-emerald-700 text-xs font-medium">
              {t('heroPreBadge')}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.18] mb-4">
            {t('heroHeadlineMain')}{' '}
            <span className="text-emerald-700">{t('heroHeadlineHighlight')}</span>
          </h1>

          {/* Urdu / Roman Sub-headline */}
          <div className="mb-6 space-y-1">
            <p className="text-lg sm:text-2xl font-bold text-emerald-900 font-urdu tracking-wide">
              {t('urduMotto')}
            </p>
            <p className="text-sm sm:text-base text-emerald-700 font-medium max-w-xl mx-auto">
              {t('urduSubtitle')}
            </p>
          </div>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            {t('heroSupportingText')}
          </p>

          {/* Main 3 Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            
            {/* 1. Donate & Track (Primary Hero CTA) */}
            <button
              id="hero-donate-cta-btn"
              onClick={onDonateClick}
              className="px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-bold shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <HeartHandshake className="w-5 h-5 text-emerald-100 shrink-0" />
              <span>{t('heroBtnDonateTrack')}</span>
              {direction === 'rtl' ? (
                <ArrowLeft className="w-4 h-4 text-emerald-200 shrink-0" />
              ) : (
                <ArrowRight className="w-4 h-4 text-emerald-200 shrink-0" />
              )}
            </button>

            {/* 2. Track a Donation (Secondary Action) */}
            <button
              id="hero-track-btn"
              onClick={() => {
                const el = document.getElementById('hero-inline-search-input');
                if (el) el.focus();
                else onSearchTrackId('AMT-2026-FLOOD-8821');
              }}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 text-sm sm:text-base font-bold border border-slate-300 shadow-xs flex items-center gap-2 transition-all cursor-pointer hover:border-slate-400"
            >
              <Search className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{t('heroBtnTrackDonation')}</span>
            </button>

            {/* 3. Try Demo (Tertiary Interactive Action) */}
            <button
              id="hero-demo-btn"
              onClick={() => onOpenDemo('AMT-2026-FLOOD-8821')}
              className="px-6 py-3.5 rounded-full bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 text-sm sm:text-base font-bold border border-emerald-200 shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t('heroBtnTryDemo')}</span>
            </button>
          </div>

          {/* Trust Message */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 bg-white/80 px-4 py-2 rounded-full border border-slate-200/90 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t('heroTrustMessage')}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-normal">{t('zeroLeakageGuarantee')}</span>
          </div>

          {/* Quick Instant Search Bar */}
          <div className="mt-8 max-w-xl mx-auto bg-white p-2 sm:p-2.5 rounded-2xl shadow-md border border-slate-200">
            <form onSubmit={handleTrackSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className={`w-4 h-4 text-slate-400 absolute ${isUrdu ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2`} />
                <input
                  id="hero-inline-search-input"
                  type="text"
                  placeholder={t('heroSearchPlaceholder')}
                  value={trackInput}
                  onChange={(e) => setTrackInput(e.target.value)}
                  className={`w-full ${isUrdu ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-2.5 text-xs sm:text-sm font-mono uppercase bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-900 placeholder:normal-case placeholder:font-sans placeholder:text-slate-400`}
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shrink-0"
              >
                {t('navTrackBtn')}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
