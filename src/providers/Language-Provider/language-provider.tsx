"use client";
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { TLanguages } from "@/interfaces/types";

interface ILanguageProviderProps {
  children: React.ReactNode;
}

interface ILanguageContextType {
  language: TLanguages;
  setLanguage: (language: TLanguages) => void;
  t: (key: string, options?: any) => string | object;
  isLoading: boolean;
  error: string | null;
  availableLanguages: TLanguages[];
  isRTL: boolean;
  changeLanguage: (language: TLanguages) => Promise<void>;
}

const availableLanguages: TLanguages[] = ["ar", "en", "co"];

// font mapping for each language
const fontMapping: Record<TLanguages, string> = {
  ar: "font-cairo",
  en: "font-lora",
  co: "font-coptic",
};

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: require("@/data/locals/ar.json") },
      en: { translation: require("@/data/locals/en.json") },
      co: { translation: require("@/data/locals/co.json") },
    },
    lng: "ar",
    fallbackLng: "ar",
    supportedLngs: availableLanguages,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export const LanguageContext = createContext<ILanguageContextType | null>(null);

export function LanguageProvider({ children }: ILanguageProviderProps) {
  const [language, setLanguage] = useState<TLanguages>("ar");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n: i18nInstance } = useTranslation();

  // Check if language is RTL
  const isRTL = useMemo(() => {
    return language === "ar";
  }, [language]);

  // Enhanced language change function
  const changeLanguage = useCallback(
    async (newLanguage: TLanguages) => {
      if (newLanguage === language) return;

      setIsLoading(true);
      setError(null);

      try {
        await i18nInstance.changeLanguage(newLanguage);
        setLanguage(newLanguage);

        // Update document direction
        document.dir = isRTL ? "rtl" : "ltr";
        document.documentElement.lang = newLanguage;

        // update font family on body
        const body = document.body;
        // remove all font classes
        body.classList.remove("font-cairo", "font-lora", "font-coptic");
        // add new font class
        body.classList.add(fontMapping[newLanguage]);

        // Persist to localStorage
        localStorage.setItem("preferred-language", newLanguage);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to change language";
        setError(errorMessage);
        console.error("Language change error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [language, i18nInstance, isRTL]
  );

  // Initialize language from localStorage or browser
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const savedLanguage = localStorage.getItem(
          "preferred-language"
        ) as TLanguages;

        const initialLanguage = savedLanguage || "ar";

        if (initialLanguage !== language) {
          await changeLanguage(initialLanguage);
        }
        // Set initial font even if language doesn't change
        const body = document.body;
        body.classList.remove("font-cairo", "font-lora", "font-coptic");
        body.classList.add(fontMapping[language]);
      } catch (err) {
        console.error("Language initialization error:", err);
        setError("Failed to initialize language");
      }
    };

    initializeLanguage();
  }, []);

  // Update document when language changes
  useEffect(() => {
    document.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
    // Update font family
    const body = document.body;
    body.classList.remove("font-cairo", "font-lora", "font-coptic");
    body.classList.add(fontMapping[language]);
  }, [language, isRTL]);

  // Enhanced translation function with error handling
  const enhancedT = useCallback(
    (key: string, options?: any) => {
      try {
        const result = t(key, options);
        return typeof result === "string" ? result : String(result);
      } catch (err) {
        console.warn(`Translation key "${key}" not found`);
        return key;
      }
    },
    [t]
  );
  const value = useMemo(
    () => ({
      language,
      setLanguage: changeLanguage,
      t: enhancedT,
      isLoading,
      error,
      availableLanguages,
      isRTL,
      changeLanguage,
    }),
    [language, changeLanguage, enhancedT, isLoading, error, isRTL]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for using language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Hook for getting current language direction
export function useLanguageDirection() {
  const { isRTL } = useLanguage();
  return isRTL ? "rtl" : "ltr";
}

// Hook for checking if a specific language is RTL
export function useIsRTL(lang?: TLanguages) {
  const { language } = useLanguage();
  const targetLang = lang || language;
  return targetLang === "ar";
}
