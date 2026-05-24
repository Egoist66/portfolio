import styled from "styled-components";
import { useThemeMode } from "../../../context/ThemeContext";
import { useLanguage } from "../../../context/LanguageContext";

const ToggleButton = styled.button`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.md};
  background: ${({ theme }) => theme.styles.colors.surface};
  color: ${({ theme }) => theme.styles.colors.textColor};
  box-shadow: ${({ theme }) => theme.styles.shadow.sm};
  transition: background ${({ theme }) => theme.styles.transition.base},
    border-color ${({ theme }) => theme.styles.transition.base},
    transform ${({ theme }) => theme.styles.transition.fast},
    color ${({ theme }) => theme.styles.transition.base};

  &:hover {
    background: ${({ theme }) => theme.styles.colors.surfaceHover};
    border-color: ${({ theme }) => theme.styles.colors.borderFocus};
    color: ${({ theme }) => theme.styles.colors.decorColorLight};
    transform: scale(1.04);
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 14.5A7.5 7.5 0 0 1 9.5 4 9 9 0 1 0 20 14.5Z"
      />
    </svg>
  );
}

function ThemeToggle() {
  const { mode, toggleTheme } = useThemeMode();
  const { t } = useLanguage();
  const isDark = mode === "dark";

  return (
    <ToggleButton
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t("theme.switchLight") : t("theme.switchDark")}
      title={isDark ? t("theme.light") : t("theme.dark")}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </ToggleButton>
  );
}

export default ThemeToggle;
