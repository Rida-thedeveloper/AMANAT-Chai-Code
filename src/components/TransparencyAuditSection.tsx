import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Camera, 
  FileLock2, 
  UserCheck, 
  HeartHandshake,
  CheckCircle2,
  Lock,
  Eye
} from 'lucide-react';

export const TransparencyAuditSection: React.FC = () => {
  const pillars = [
    {
      title: 'Geotagged GPS Check-ins',
      urdu: 'مقام کی جی پی ایس تصدیق',
      description: 'Every convoy dispatch and doorstep distribution event logs real-time latitude/longitude coordinates to prove physical delivery at the exact target village or union council.',
      icon: <MapPin className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Proof-of-Delivery Photo Trail',
      urdu: 'تصویری ثبوت اور ریکارڈ',
      description: 'Photographic records of sealed ration packages with tamper-evident QR serial numbers ensure goods match high food safety standards before reaching families.',
      icon: <Camera className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'CNIC & Token Safe Index',
      urdu: 'محفوظ شناختی کارڈ تصدیق',
      description: 'Beneficiary families are authenticated via privacy-preserving NADRA tokens to ensure aid reaches authentic needy households without exposing sensitive private details.',
      icon: <FileLock2 className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Vetted Field Volunteers',
      urdu: 'باقاعدہ تصدیق شدہ رضاکار',
      description: 'Every volunteer on the ground is ID-verified and bound by strict code-of-conduct audits, preventing unauthorized diversion or hoarding.',
      icon: <UserCheck className="w-6 h-6 text-emerald-600" />
    }
  ];

  return (
    <section id="transparency" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
            <Eye className="w-3.5 h-3.5 text-emerald-600" />
            Zero-Leakage Assurance
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Built to solve Pakistan’s relief trust deficit
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            We believe donors in Pakistan and overseas Pakistanis deserve complete clarity. 
            No lost sacks, no mysterious fund disappearances.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-emerald-300 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 shadow-2xs">
                  {pillar.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {pillar.title}
                </h3>
                <p className="font-urdu text-xs font-bold text-emerald-800 mb-3">
                  {pillar.urdu}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Manifesto Box */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-emerald-950 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase mb-3">
              <Lock className="w-3.5 h-3.5" /> Amanat Core Pledge
            </div>
            <h3 className="text-xl sm:text-3xl font-black mb-3 text-white tracking-tight">
              “Every single rupee accounted for. Every ration bag accounted for.”
            </h3>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Whether you donate PKR 1,000 or PKR 500,000 for flood relief, you will receive your unique Amanat Tracking ID via SMS and Email. You can open Amanat at any moment and watch the journey unfold in real-time.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
            <ShieldCheck className="w-96 h-96 text-white" />
          </div>
        </div>

      </div>
    </section>
  );
};
