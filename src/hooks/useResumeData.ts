import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Locale } from "../i18n";
import { ResumeData } from "../types/resume";

export const getResumeJsonUrl = (locale: Locale) =>
  `/resume/resume.${locale}.json`;

type UseResumeDataResult = {
  data: ResumeData | null;
  loading: boolean;
  error: string | null;
};

function useResumeData(): UseResumeDataResult {
  const { locale } = useLanguage();
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadResume() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(getResumeJsonUrl(locale), {
          signal: controller.signal,
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const json = (await response.json()) as ResumeData;
        setData(json);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadResume();

    return () => controller.abort();
  }, [locale]);

  return { data, loading, error };
}

export default useResumeData;
