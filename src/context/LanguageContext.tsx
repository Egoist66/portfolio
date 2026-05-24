import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { Locale, translate } from "../i18n";
import {
  LOCALE_QUERY_KEY,
  parseLocaleParam,
  readStoredLocale,
} from "../utils/localeQuery";

const STORAGE_KEY = "portfolio-locale";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageContextProvider");
  }
  return ctx;
};

interface LanguageContextProviderProps {
  children: ReactNode;
}

function LanguageContextProvider({ children }: LanguageContextProviderProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [locale, setLocaleState] = useState<Locale>(() => {
    const fromUrl = parseLocaleParam(searchParams.get(LOCALE_QUERY_KEY));
    return fromUrl ?? readStoredLocale();
  });

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          params.set(LOCALE_QUERY_KEY, next);
          return params;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const toggleLocale = useCallback(
    () => setLocale(locale === "en" ? "ru" : "en"),
    [locale, setLocale]
  );

  const t = useCallback((key: string) => translate(locale, key), [locale]);

  useEffect(() => {
    if (parseLocaleParam(searchParams.get(LOCALE_QUERY_KEY))) return;

    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        params.set(LOCALE_QUERY_KEY, locale);
        return params;
      },
      { replace: true }
    );
  }, [locale, searchParams, setSearchParams]);

  useEffect(() => {
    const fromUrl = parseLocaleParam(searchParams.get(LOCALE_QUERY_KEY));
    if (fromUrl && fromUrl !== locale) {
      setLocaleState(fromUrl);
    }
  }, [searchParams, locale]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, t }),
    [locale, setLocale, toggleLocale, t]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export default LanguageContextProvider;
