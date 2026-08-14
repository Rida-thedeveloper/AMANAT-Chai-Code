import React from 'react';
import { Building2, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const partnerTypes = [
    {
      name: 'Registered Welfare Trusts',
      urdu: 'رجسٹرڈ فلاحی ادارے',
      description: 'Audited non-profit foundations operating vetted community hubs across Pakistan.',
      badge: 'Certified'
    },
    {
      name: 'Local Union Council Relief Desks',
      urdu: 'یونین کونسل ریلیف ڈیسک',
      description: 'Grassroots verification units on the ground in rural Sindh, Punjab, KP & Balochistan.',
      badge: 'Direct Field'
    },
    {
      name: 'Independent Logistics Fleets',
      urdu: 'مستقل ٹرانسپورٹ نیٹ ورک',
      description: '4x4 flood convoys, snow rescue teams, and urban doorstep distribution vans.',
      badge: 'GPS Tracked'
    }
  ];

  return (
    <section id="partners" className="py-16 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            Vetted Partner Ecosystem
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Collaborating with authentic Pakistani ground partners
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Amanat powers verification software for verified aid networks, ensuring transparency without slowing down relief operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnerTypes.map((partner, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {partner.badge}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {partner.name}
                </h3>
                <p className="font-urdu text-xs font-bold text-emerald-700 mb-3">
                  {partner.urdu}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
