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
import { useLanguage } from '../context/LanguageContext';

export const TransparencyAuditSection: React.FC = () => {
  const { isUrdu, t } = useLanguage();

  const pillars = [
    {
      title: t('pillar1Title'),
      urdu: isUrdu ? '' : 'مقام کی جی پی ایس تصدیق',
      description: t('pillar1Desc'),
      icon: <MapPin className="w-6 h-6 text-emerald-600" />
    },
    {
      title: t('pillar2Title'),
      urdu: isUrdu ? '' : 'تصویری ثبوت اور ریکارڈ',
      description: t('pillar2Desc'),
      icon: <Camera className="w-6 h-6 text-emerald-600" />
    },
    {
      title: t('pillar3Title'),
      urdu: isUrdu ? '' : 'محفوظ شناختی کارڈ تصدیق',
      description: t('pillar3Desc'),
      icon: <FileLock2 className="w-6 h-6 text-emerald-600" />
    },
    {
      title: t('pillar4Title'),
      urdu: isUrdu ? '' : 'باقاعدہ تصدیق شدہ رضاکار',
      description: t('pillar4Desc'),
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
            {t('transBadge')}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('transHeading')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            {t('transSubheading')}
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
                {pillar.urdu && (
                  <p className="font-urdu text-xs font-bold text-emerald-800 mb-3">
                    {pillar.urdu}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{t('transVerifiedStandard')}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Manifesto Box */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-emerald-950 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase mb-3">
              <Lock className="w-3.5 h-3.5" /> {t('transManifestoTag')}
            </div>
            <h3 className="text-xl sm:text-3xl font-black mb-3 text-white tracking-tight font-urdu">
              {t('transManifestoQuote')}
            </h3>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              {t('transManifestoDesc')}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
