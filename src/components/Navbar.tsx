import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Menu, 
  X, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface NavbarProps {
  onOpenTracker: (sampleId?: string) => void;
  onNavigateToSection: (sectionId: string) => void;
  onDonateClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTracker, onNavigateToSection, onDonateClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearchId, setNavSearchId] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearchId.trim()) {
      onOpenTracker(navSearchId.trim().toUpperCase());
      setNavSearchId('');
      setMobileMenuOpen(false);
    }
  };

  const handleDonateAction = () => {
    if (onDonateClick) {
      onDonateClick();
    } else {
      onNavigateToSection('active-drives');
    }
  };

  const navItems = [
    { label: 'Problem & Solution', id: 'problem-solution' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Live Tracking', id: 'courier-tracking' },
    { label: 'Active Relief Drives', id: 'active-drives' },
    { label: 'Transparency', id: 'transparency' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs transition-all">
      {/* Top Pakistani Civic Alert / Mission Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs px-4 py-1.5 font-medium border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
              PAKISTAN RELIEF
            </span>
            <span className="hidden sm:inline">🇵🇰 Real-time transparent donation tracking for flood relief, Ramadan & emergency aid.</span>
            <span className="sm:hidden font-urdu">آپ کی امانت، صحیح ہاتھوں تک</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-emerald-200">
            <span className="font-urdu text-xs">Aapki Amanat, Sahi Haathon Tak</span>
            <span className="hidden md:inline-block text-emerald-400">•</span>
            <span className="hidden md:inline-flex items-center gap-1 text-emerald-200 font-semibold">
              <CheckCircle className="w-3 h-3 text-emerald-400" /> 100% Verified Deliveries
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
                A
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
                  Trust & Transparency
                </p>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigateToSection(item.id)}
                className="hover:text-emerald-700 transition-colors py-1 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search + Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Quick Track Input in Pill Style */}
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-slate-100 rounded-full px-3.5 py-1.5 border border-slate-200 focus-within:border-emerald-500 focus-within:bg-white transition-all shadow-2xs">
              <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Enter Donation ID (e.g. AMN-102)"
                value={navSearchId}
                onChange={(e) => setNavSearchId(e.target.value)}
                className="bg-transparent border-none text-xs outline-none w-48 xl:w-56 font-mono uppercase text-slate-800 placeholder:normal-case placeholder:font-sans placeholder:text-slate-400"
              />
              <button 
                type="submit" 
                className="text-emerald-700 hover:text-emerald-800 font-bold text-xs tracking-wider uppercase ml-1.5 cursor-pointer"
              >
                Track
              </button>
            </form>

            <div className="h-6 w-px bg-slate-200 hidden md:block" />

            <button
              onClick={handleDonateAction}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full text-xs font-bold shadow-lg shadow-emerald-200/80 transition-all cursor-pointer hover:shadow-emerald-300"
            >
              DONATE NOW
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
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
              placeholder="Enter Amanat Track ID (e.g. AMT-2026-FLOOD-8821)"
              value={navSearchId}
              onChange={(e) => setNavSearchId(e.target.value)}
              className="w-full pl-9 pr-20 py-2.5 text-sm rounded-full border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-emerald-600 text-white rounded-full text-xs font-bold"
            >
              Track
            </button>
          </form>

          <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigateToSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
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
              View Sample Live Tracking (Flood Relief)
            </button>
            <button
              onClick={() => {
                handleDonateAction();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
            >
              <HeartHandshake className="w-4 h-4" />
              DONATE NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
