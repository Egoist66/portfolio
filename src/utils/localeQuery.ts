import { Locale } from "../i18n/types";

export const LOCALE_QUERY_KEY = "lang";

export function parseLocaleParam(value: string | null): Locale | null {
  if (value === "en" || value === "ru") return value;
  return null;
}

export function setLocaleInSearch(search: string, locale: Locale): string {
  const params = new URLSearchParams(search);
  params.set(LOCALE_QUERY_KEY, locale);

  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";

  const saved = localStorage.getItem("portfolio-locale");
  if (saved === "en" || saved === "ru") return saved;

  return navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
}
