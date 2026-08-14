import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Menu, 
  X, 
  HeartHandshake, 
  Sparkles, 
  CheckCircle,
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentPage?: 'home' | 'donate-track' | 'track' | 'delivery-dashboard';
  onOpenTracker: (sampleId?: string) => void;
  onNavigateToSection: (sectionId: string) => void;
  onOpenDonateAndTrack: () => void;
  onOpenTrackPage?: (sampleId?: string) => void;
  onOpenDeliveryDashboard?: () => void;
  onDonateClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage = 'home',
  onOpenTracker, 
  onNavigateToSection, 
  onOpenDonateAndTrack,
  onOpenTrackPage,
  onOpenDeliveryDashboard,
  onDonateClick 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearchId, setNavSearchId] = useState('');
  const { language, setLanguage, isUrdu, t } = useLanguage();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearchId.trim()) {
      const cleanId = navSearchId.trim().toUpperCase();
      if (onOpenTrackPage) {
        onOpenTrackPage(cleanId);
      } else {
        onOpenTracker(cleanId);
      }
      setNavSearchId('');
      setMobileMenuOpen(false);
    }
  };

  const handleDonateAction = () => {
    onOpenDonateAndTrack();
  };

  const navItems = [
    { label: isUrdu ? 'ہوم' : 'Home', id: 'home', isPage: true },
    { label: isUrdu ? 'عطیہ اور ٹریکنگ' : 'Donate & Track', id: 'donate-track', isPage: true },
    { label: isUrdu ? 'عطیہ ٹریک کریں' : 'Track a Donation', id: 'track', isPage: true },
    { label: isUrdu ? 'ڈیلیوری ڈیش بورڈ' : 'Delivery Dashboard', id: 'delivery-dashboard', isPage: true },
    { label: t('navProblemSolution'), id: 'problem-solution' },
    { label: t('navHowItWorks'), id: 'how-it-works' },
    { label: t('navLiveTracking'), id: 'courier-tracking' },
    { label: t('navActiveDrives'), id: 'active-drives' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs transition-all">
      {/* Top Pakistani Civic Alert / Mission Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs px-4 py-1.5 font-medium border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
              {isUrdu ? 'پاکستان ریلیف' : 'PAKISTAN RELIEF'}
            </span>
            <span className="hidden sm:inline">
              {isUrdu 
                ? '🇵🇰 سیلاب ریلیف، رمضان راشن اور ہنگامی امداد کے لیے شفاف لائیو ٹریکنگ سسٹم۔' 
                : '🇵🇰 Real-time transparent donation tracking for flood relief, Ramadan & emergency aid.'}
            </span>
            <span className="sm:hidden font-urdu text-xs">
              {isUrdu ? 'آپ کی امانت، صحیح ہاتھوں تک' : 'Aapki Amanat, Sahi Haathon Tak'}
            </span>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-emerald-200">
            <span className="font-urdu text-xs hidden md:inline-block">
              {isUrdu ? 'شفافیت اور بروقت ترسیل' : 'Aapki Amanat, Sahi Haathon Tak'}
            </span>
            <span className="hidden md:inline-block text-emerald-400">•</span>
            <span className="inline-flex items-center gap-1 text-emerald-200 font-semibold">
              <CheckCircle className="w-3 h-3 text-emerald-400" /> 
              {isUrdu ? '100% تصدیق شدہ ترسیل' : '100% Verified Deliveries'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-18 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group flex items-center gap-3"
            >
              {/* Distinct Emerald Brand Block */}
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                {isUrdu ? 'ا' : 'A'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold tracking-tight text-emerald-950 font-sans">
                    AMANAT
                  </span>
                  <span className="font-urdu text-base font-bold text-emerald-700">
                    امانت
                  </span>
                </div>
                <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">
                  {isUrdu ? 'اعتماد اور شفافیت' : 'Trust & Transparency'}
                </p>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-semibold text-slate-600">
            {navItems.map((item) => {
              const isActive = (item.id === 'home' && currentPage === 'home') ||
                               (item.id === 'donate-track' && currentPage === 'donate-track') ||
                               (item.id === 'track' && currentPage === 'track');

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'home') {
                      onNavigateToSection('home');
                    } else if (item.id === 'donate-track') {
                      onOpenDonateAndTrack();
                    } else if (item.id === 'track') {
                      if (onOpenTrackPage) {
                        onOpenTrackPage();
                      } else {
                        onOpenTracker();
                      }
                    } else {
                      onNavigateToSection(item.id);
                    }
                  }}
                  className={`transition-colors py-1 cursor-pointer relative ${
                    isActive 
                      ? 'text-emerald-700 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-600' 
                      : 'hover:text-emerald-700'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Search + Action Buttons + Language Switcher */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-4">
            
            {/* Quick Track Input in Pill Style */}
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-slate-100 rounded-full px-3.5 py-1.5 border border-slate-200 focus-within:border-emerald-500 focus-within:bg-white transition-all shadow-2xs">
              <Search className="w-3.5 h-3.5 text-slate-400 mx-1 shrink-0" />
              <input
                type="text"
                placeholder={isUrdu ? 'آئی ڈی (مثلاً AMT-8821)' : 'Donation ID (e.g. AMT-8821)'}
                value={navSearchId}
                onChange={(e) => setNavSearchId(e.target.value)}
                className="bg-transparent border-none text-xs outline-none w-36 lg:w-44 xl:w-52 font-mono uppercase text-slate-800 placeholder:normal-case placeholder:font-sans placeholder:text-slate-400"
              />
              <button 
                type="submit" 
                className="text-emerald-700 hover:text-emerald-800 font-bold text-xs tracking-wider uppercase mx-1 cursor-pointer"
              >
                {t('navTrackBtn')}
              </button>
            </form>

            {/* Language Switcher: EN | اردو */}
            <div className="flex items-center rounded-full bg-slate-100 p-0.5 border border-slate-200 shadow-2xs" id="language-switcher-desktop">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <span className="text-slate-300 text-xs px-0.5 select-none">|</span>
              <button
                type="button"
                onClick={() => setLanguage('ur')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-urdu font-bold transition-all cursor-pointer ${
                  language === 'ur'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="اردو میں تبدیل کریں"
              >
                اردو
              </button>
            </div>

            <div className="h-6 w-px bg-slate-200 hidden md:block" />

            <button
              onClick={handleDonateAction}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 lg:px-5 py-2 rounded-full text-xs font-bold shadow-lg shadow-emerald-200/80 transition-all cursor-pointer hover:shadow-emerald-300 whitespace-nowrap"
            >
              {t('navDonateNow')}
            </button>
          </div>

          {/* Mobile Right Controls: Language switcher + Search button + Menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            {/* Mobile Language Switcher */}
            <div className="flex items-center rounded-full bg-slate-100 p-0.5 border border-slate-200" id="language-switcher-mobile">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                  language === 'en'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ur')}
                className={`px-2 py-0.5 rounded-full text-[11px] font-urdu font-bold transition-all ${
                  language === 'ur'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                اردو
              </button>
            </div>

            <button
              onClick={() => onOpenTracker()}
              className="p-2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200"
              title="Track ID"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder={isUrdu ? 'ٹریکنگ آئی ڈی درج کریں (مثلاً AMT-2026-FLOOD-8821)' : 'Enter Amanat Track ID (e.g. AMT-2026-FLOOD-8821)'}
              value={navSearchId}
              onChange={(e) => setNavSearchId(e.target.value)}
              className="w-full px-9 py-2.5 text-sm rounded-full border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <Search className={`w-4 h-4 text-slate-400 absolute ${isUrdu ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2`} />
            <button
              type="submit"
              className={`absolute ${isUrdu ? 'left-1.5' : 'right-1.5'} top-1.5 bottom-1.5 px-4 bg-emerald-600 text-white rounded-full text-xs font-bold`}
            >
              {t('navTrackBtn')}
            </button>
          </form>

          <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'home') {
                    onNavigateToSection('home');
                  } else if (item.id === 'donate-track') {
                    onOpenDonateAndTrack();
                  } else if (item.id === 'track') {
                    if (onOpenTrackPage) {
                      onOpenTrackPage();
                    } else {
                      onOpenTracker();
                    }
                  } else {
                    onNavigateToSection(item.id);
                  }
                  setMobileMenuOpen(false);
                }}
                className={`text-${isUrdu ? 'right' : 'left'} px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-800 transition-colors ${
                  (item.id === 'home' && currentPage === 'home') || 
                  (item.id === 'donate-track' && currentPage === 'donate-track') ||
                  (item.id === 'track' && currentPage === 'track')
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenTracker('AMT-2026-FLOOD-8821');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              {isUrdu ? 'سیلاب ریلیف کا لائیو ٹریکنگ نمونہ دیکھیں' : 'View Sample Live Tracking (Flood Relief)'}
            </button>
            <button
              onClick={() => {
                handleDonateAction();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
            >
              <HeartHandshake className="w-4 h-4" />
              {t('navDonateNow')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
