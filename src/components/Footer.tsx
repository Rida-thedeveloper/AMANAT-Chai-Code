import React from 'react';
import { ShieldCheck, Heart, Phone, Mail, MapPin, Globe, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { isUrdu, t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Identity & Urdu Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold text-white tracking-tight">Amanat</span>
                  <span className="font-urdu text-lg font-bold text-emerald-400">امانت</span>
                </div>
                <p className="text-xs text-emerald-400 font-medium">
                  {isUrdu ? 'آپ کی امانت، صحیح ہاتھوں تک' : 'Aapki Amanat, Sahi Haathon Tak'}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {t('footerMission')}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <span>{t('footerMadeWith')}</span>
              <span>🇵🇰</span>
            </div>
          </div>

          {/* Quick Tracking Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t('footerSampleHeading')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li>
                <span className="text-emerald-400 font-semibold block">AMT-2026-FLOOD-8821</span>
                <span className="text-slate-500 font-sans">
                  {isUrdu ? 'دادو و جوہی سیلاب ریلیف (مکمل ترسیل)' : 'Dadu & Johi Flood Relief (Delivered)'}
                </span>
              </li>
              <li>
                <span className="text-amber-400 font-semibold block">AMT-2026-RAMDN-4019</span>
                <span className="text-slate-500 font-sans">
                  {isUrdu ? 'لیاری رمضان راشن (راستے میں)' : 'Lyari Ramadan Rashan (En Route)'}
                </span>
              </li>
              <li>
                <span className="text-blue-400 font-semibold block">AMT-2026-RATION-1104</span>
                <span className="text-slate-500 font-sans">
                  {isUrdu ? 'سوات موسم سرما راشن (مخصوص شدہ)' : 'Swat Winter Relief (Allocated)'}
                </span>
              </li>
            </ul>
          </div>

          {/* Transparency Model */}
          <div className="space-y-3 text-xs text-slate-400">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t('footerGuaranteesHeading')}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{t('footerG1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{t('footerG2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{t('footerG3')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{t('footerG4')}</span>
              </li>
            </ul>
          </div>

          {/* Help & Support Desk */}
          <div className="space-y-3 text-xs text-slate-400">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t('footerHelplineHeading')}
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">0800-AMANAT (26262)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">support@amanat.pk</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('footerCenterHub')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t('footerCopyright')}</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>{isUrdu ? 'آپ کی امانت، صحیح ہاتھوں تک' : 'Aapki Amanat, Sahi Haathon Tak'}</span>
            <span className="text-slate-600">•</span>
            <span className="font-urdu text-emerald-400">امانت پاکستان</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
