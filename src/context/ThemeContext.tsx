import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../style/Global";
import {
  ThemeMode,
  darkTheme,
  getTheme,
  lightTheme,
} from "../theme/theme";

const STORAGE_KEY = "portfolio-theme";

interface ThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const readInitialMode = (): ThemeMode => {
  if (typeof window === "undefined") return "dark";

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

export const useThemeMode = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeMode must be used within ThemeContextProvider");
  }
  return ctx;
};

interface ThemeContextProviderProps {
  children: ReactNode;
}

function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(readInitialMode);
  const theme = useMemo(() => getTheme(mode), [mode]);

  const setTheme = useCallback((next: ThemeMode) => setMode(next), []);
  const toggleTheme = useCallback(
    () => setMode((prev) => (prev === "dark" ? "light" : "dark")),
    []
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.style.colorScheme = mode;

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute(
        "content",
        mode === "dark"
          ? darkTheme.styles.colors.mainBg
          : lightTheme.styles.colors.mainBg
      );
    }
  }, [mode]);

  const value = useMemo(
    () => ({ mode, toggleTheme, setTheme }),
    [mode, toggleTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
