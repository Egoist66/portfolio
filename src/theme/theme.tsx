export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  mainBg: string;
  secondaryBg: string;
  surface: string;
  surfaceHover: string;
  textColor: string;
  textMuted: string;
  decorColor: string;
  decorColorLight: string;
  accentGradient: string;
  border: string;
  borderFocus: string;
  error: string;
  overlay: string;
  imageBg: string;
  placeholder: string;
  heroGlowA: string;
  heroGlowB: string;
}

export interface ThemeStyleInterface {
  mode: ThemeMode;
  styles: {
    colors: ThemeColors;
    font: {
      fontFamilies: Array<string>;
      headingFamilies: Array<string>;
    };
    space: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      section: string;
    };
    radius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
    shadow: {
      sm: string;
      md: string;
      lg: string;
      glow: string;
    };
    transition: {
      fast: string;
      base: string;
      slow: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    container: {
      maxWidth: string;
      padding: string;
    };
  };
}

const sharedStyles = {
  font: {
    fontFamilies: ["Inter", "system-ui", "-apple-system", "sans-serif"],
    headingFamilies: ["Outfit", "Inter", "system-ui", "sans-serif"],
  },
  space: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2.5rem",
    xl: "4rem",
    section: "clamp(4rem, 10vw, 7rem)",
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },
  transition: {
    fast: "0.15s ease",
    base: "0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  breakpoints: {
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  container: {
    maxWidth: "1200px",
    padding: "clamp(1rem, 4vw, 2rem)",
  },
};

export const darkTheme: ThemeStyleInterface = {
  mode: "dark",
  styles: {
    ...sharedStyles,
    colors: {
      mainBg: "#0a0a0f",
      secondaryBg: "#111118",
      surface: "#1a1a24",
      surfaceHover: "#22222e",
      textColor: "#f4f4f5",
      textMuted: "#a1a1aa",
      decorColor: "#7c6cf0",
      decorColorLight: "#a78bfa",
      accentGradient:
        "linear-gradient(135deg, #6366f1 0%, #7c6cf0 45%, #a78bfa 100%)",
      border: "rgba(255, 255, 255, 0.08)",
      borderFocus: "rgba(124, 108, 240, 0.55)",
      error: "#f43f5e",
      overlay: "rgba(10, 10, 15, 0.88)",
      imageBg: "#14141c",
      placeholder: "#71717a",
      heroGlowA: "rgba(99, 102, 241, 0.18)",
      heroGlowB: "rgba(167, 139, 250, 0.12)",
    },
    shadow: {
      sm: "0 2px 8px rgba(0, 0, 0, 0.25)",
      md: "0 8px 24px rgba(0, 0, 0, 0.35)",
      lg: "0 16px 48px rgba(0, 0, 0, 0.45)",
      glow: "0 0 40px rgba(124, 108, 240, 0.2)",
    },
  },
};

export const lightTheme: ThemeStyleInterface = {
  mode: "light",
  styles: {
    ...sharedStyles,
    colors: {
      mainBg: "#f4f5f9",
      secondaryBg: "#ebedf3",
      surface: "#ffffff",
      surfaceHover: "#f8f9fc",
      textColor: "#18181b",
      textMuted: "#52525b",
      decorColor: "#6d5ce8",
      decorColorLight: "#7c6cf0",
      accentGradient:
        "linear-gradient(135deg, #6366f1 0%, #7c6cf0 45%, #8b5cf6 100%)",
      border: "rgba(15, 23, 42, 0.1)",
      borderFocus: "rgba(109, 92, 232, 0.45)",
      error: "#e11d48",
      overlay: "rgba(244, 245, 249, 0.92)",
      imageBg: "#eef0f6",
      placeholder: "#94a3b8",
      heroGlowA: "rgba(99, 102, 241, 0.14)",
      heroGlowB: "rgba(139, 92, 246, 0.1)",
    },
    shadow: {
      sm: "0 2px 8px rgba(15, 23, 42, 0.06)",
      md: "0 8px 24px rgba(15, 23, 42, 0.08)",
      lg: "0 16px 40px rgba(15, 23, 42, 0.1)",
      glow: "0 0 32px rgba(109, 92, 232, 0.15)",
    },
  },
};

export const getTheme = (mode: ThemeMode): ThemeStyleInterface =>
  mode === "light" ? lightTheme : darkTheme;

/** @deprecated Use getTheme(mode) or useTheme() */
export const themeStyle = darkTheme;
