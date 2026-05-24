import { useEffect, useState } from "react";
import { RESUME_JSON_URL, ResumeData } from "../types/resume";

type UseResumeDataResult = {
  data: ResumeData | null;
  loading: boolean;
  error: string | null;
};

function useResumeData(): UseResumeDataResult {
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadResume() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(RESUME_JSON_URL, {
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
  }, []);

  return { data, loading, error };
}

export default useResumeData;
