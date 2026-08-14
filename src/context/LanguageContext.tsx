import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '../translations/translations';

interface LanguageContextType {
  language: Language;
  direction: 'ltr' | 'rtl';
  isUrdu: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, defaultText?: string) => string;
  formatPKR: (amount: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'amanat_selected_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = sessionStorage.getItem(LANGUAGE_STORAGE_KEY) || localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'ur' || saved === 'en') {
        return saved;
      }
    } catch {
      // Fallback
    }
    return 'en';
  });

  const direction: 'ltr' | 'rtl' = language === 'ur' ? 'rtl' : 'ltr';
  const isUrdu = language === 'ur';

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      sessionStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    } catch {
      // Ignore storage errors
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  // Keep document element lang and dir attributes in sync dynamically without page reload
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    
    if (language === 'ur') {
      document.documentElement.classList.add('lang-ur');
      document.documentElement.classList.remove('lang-en');
      document.body.classList.add('font-urdu-active');
    } else {
      document.documentElement.classList.add('lang-en');
      document.documentElement.classList.remove('lang-ur');
      document.body.classList.remove('font-urdu-active');
    }
  }, [language, direction]);

  const t = (key: string, defaultText?: string): string => {
    const entry = translations[key];
    if (!entry) {
      return defaultText || key;
    }
    return entry[language] || entry.en || defaultText || key;
  };

  const formatPKR = (amount: number): string => {
    const formatted = amount.toLocaleString('en-US');
    if (language === 'ur') {
      return `${formatted} روپے`;
    }
    return `PKR ${formatted}`;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        isUrdu,
        setLanguage,
        toggleLanguage,
        t,
        formatPKR
      }}
    >
      <div dir={direction} className={isUrdu ? 'font-urdu-content' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
