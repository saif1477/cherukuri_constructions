import { createContext, useContext, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('cc-lang') || 'en';
  });

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'en' ? 'te' : 'en';
      localStorage.setItem('cc-lang', next);
      return next;
    });
  };

  const isTeluguActive = lang === 'te';

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, isTeluguActive }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
