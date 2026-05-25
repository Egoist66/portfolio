import en from "./en";
import ru from "./ru";
import { Locale, TranslationTree } from "./types";

export const translations: Record<Locale, TranslationTree> = { en, ru };

export function translate(locale: Locale, key: string): string {
  const keys = key.split(".");
  let node: string | TranslationTree | undefined = translations[locale];

  for (const part of keys) {
    if (typeof node !== "object" || node === null) return key;
    node = node[part];
  }

  return typeof node === "string" ? node : key;
}

export const navRoutes = [
  { key: "nav.home", path: "/" },
  { key: "nav.skills", path: "/#skills" },
  { key: "nav.works", path: "/#works" },
  { key: "nav.games", path: "/#games" },
  { key: "nav.about", path: "/#about-me" },
  { key: "nav.career", path: "/career" },
  { key: "nav.wordpress", path: "/wordpress" },
  { key: "nav.contact", path: "/#contact" },
] as const;

export type { Locale } from "./types";
