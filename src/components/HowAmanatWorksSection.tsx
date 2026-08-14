import React from 'react';
import { 
  HeartHandshake, 
  Search, 
  Truck, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Smartphone,
  MapPin
} from 'lucide-react';

interface HowAmanatWorksSectionProps {
  onOpenSampleTracker: (sampleId: string) => void;
}

export const HowAmanatWorksSection: React.FC<HowAmanatWorksSectionProps> = ({ onOpenSampleTracker }) => {
  const steps = [
    {
      step: 1,
      title: 'Donate',
      urdu: 'عطیہ اور منفرد ٹریکنگ آئی ڈی',
      description: 'Create a donation and receive a unique tracking ID.',
      badge: 'ID GENERATED',
      icon: <HeartHandshake className="w-6 h-6 text-emerald-600" />,
      detail: 'Instantly tied to a physical ration bag allocation with QR code tag.'
    },
    {
      step: 2,
      title: 'Track',
      urdu: 'لائیو سفر اور ترسیل کی ٹریکنگ',
      description: 'Follow the donation journey.',
      badge: 'LIVE UPDATES',
      icon: <Search className="w-6 h-6 text-emerald-600" />,
      detail: 'View procurement, warehouse packaging, convoy dispatch, and road checkpoints.'
    },
    {
      step: 3,
      title: 'Deliver',
      urdu: 'رضاکار کی ترسیل اور فیلڈ تصدیق',
      description: 'A volunteer delivers the ration.',
      badge: 'GROUND VOLUNTEER',
      icon: <Truck className="w-6 h-6 text-emerald-600" />,
      detail: 'Dedicated local volunteers navigate rural flood routes and urban districts.'
    },
    {
      step: 4,
      title: 'Verify',
      urdu: 'او ٹی پی اور مستحق کی حتمی تصدیق',
      description: 'The recipient confirms delivery using OTP.',
      badge: 'OTP & AUDIT',
      icon: <KeyRound className="w-6 h-6 text-emerald-600" />,
      detail: 'One-Time Password sent to recipient mobile + geotagged photographic confirmation.'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/70 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            How Amanat Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            From the moment your aid is pledged to the verified receipt in a beneficiary’s hands.
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
                    Step 0{item.step}
                  </span>
                </div>

                {/* Step Title & Description */}
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {item.step}. {item.title}
                </h3>
                <p className="font-urdu text-xs font-bold text-emerald-800 mb-3">
                  {item.urdu}
                </p>
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
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800 flex items-center justify-center shrink-0 border border-emerald-700">
              <ShieldCheck className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Want to see a live tracked ration bag in Sindh flood relief?
              </h4>
              <p className="text-xs sm:text-sm text-emerald-200">
                Explore real dispatch logs, GPS coordinates, volunteer details, and OTP audit receipt.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenSampleTracker('AMT-2026-FLOOD-8821')}
            className="px-6 py-3 rounded-full bg-white hover:bg-emerald-50 text-emerald-950 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] shrink-0"
          >
            <span>Open Sample Journey</span>
            <ArrowRight className="w-4 h-4 text-emerald-700" />
          </button>
        </div>

      </div>
    </section>
  );
};
