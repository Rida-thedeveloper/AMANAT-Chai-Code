import React from 'react';
import { Building2, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PartnersSection: React.FC = () => {
  const { isUrdu, t } = useLanguage();

  const partnerTypes = [
    {
      name: t('partner1Title'),
      urdu: isUrdu ? '' : 'رجسٹرڈ فلاحی ادارے',
      description: t('partner1Desc'),
      badge: t('partner1Badge')
    },
    {
      name: t('partner2Title'),
      urdu: isUrdu ? '' : 'یونین کونسل ریلیف ڈیسک',
      description: t('partner2Desc'),
      badge: t('partner2Badge')
    },
    {
      name: t('partner3Title'),
      urdu: isUrdu ? '' : 'مستقل ٹرانسپورٹ نیٹ ورک',
      description: t('partner3Desc'),
      badge: t('partner3Badge')
    }
  ];

  return (
    <section id="partners" className="py-16 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            {t('partnersBadge')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('partnersHeading')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t('partnersSubheading')}
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
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {partner.name}
                </h3>
                {partner.urdu && (
                  <p className="font-urdu text-xs font-bold text-emerald-700 mb-3">
                    {partner.urdu}
                  </p>
                )}
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
