import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import { useLanguage } from "../../../context/LanguageContext";
import { setLocaleInSearch } from "../../../utils/localeQuery";

const TopBar = styled.div`
  position: fixed;
  top: clamp(1rem, 3vw, 1.5rem);
  right: clamp(1rem, 3vw, 1.5rem);
  z-index: 1001;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  max-width: min(100vw - 2rem, 520px);
`;

const ShortcutLink = styled(Link)<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  height: 48px;
  padding: 0 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
  color: ${({ theme, $active }) =>
    $active ? theme.styles.colors.decorColorLight : theme.styles.colors.textColor};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.styles.colors.borderFocus : theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.md};
  background: ${({ theme, $active }) =>
    $active ? theme.styles.colors.surfaceHover : theme.styles.colors.surface};
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
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  @media (max-width: ${({ theme }) => theme.styles.breakpoints.lg}) {
    span {
      display: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.styles.breakpoints.sm}) {
    width: 48px;
    padding: 0;
  }
`;

const MenuButton = styled.button<{ $open: boolean }>`
  width: 48px;
  height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.md};
  background: ${({ theme }) => theme.styles.colors.surface};
  box-shadow: ${({ theme }) => theme.styles.shadow.sm};
  transition: background ${({ theme }) => theme.styles.transition.base},
    border-color ${({ theme }) => theme.styles.transition.base},
    transform ${({ theme }) => theme.styles.transition.fast};

  &:hover {
    background: ${({ theme }) => theme.styles.colors.surfaceHover};
    border-color: ${({ theme }) => theme.styles.colors.borderFocus};
    transform: scale(1.04);
  }

  span {
    display: block;
    width: 22px;
    height: 2px;
    background: ${({ theme }) => theme.styles.colors.textColor};
    border-radius: 2px;
    transition: transform ${({ theme }) => theme.styles.transition.base},
      opacity ${({ theme }) => theme.styles.transition.base},
      width ${({ theme }) => theme.styles.transition.base};
  }

  span:nth-child(1) {
    transform: ${({ $open }) =>
      $open ? "translateY(8px) rotate(45deg)" : "none"};
  }

  span:nth-child(2) {
    opacity: ${({ $open }) => ($open ? 0 : 1)};
    width: ${({ $open }) => ($open ? "0" : "22px")};
  }

  span:nth-child(3) {
    transform: ${({ $open }) =>
      $open ? "translateY(-8px) rotate(-45deg)" : "none"};
  }
`;

function Menu() {
  const context = useAppContext();
  const location = useLocation();
  const isOpen = !context?.isToggled;
  const isCareerActive = location.pathname === "/career";
  const isWordPressActive = location.pathname === "/wordpress";
  const { t, locale } = useLanguage();
  const localizedSearch = setLocaleInSearch(location.search, locale);

  return (
    <TopBar>
      <ShortcutLink
        to={{ pathname: "/career", search: localizedSearch }}
        $active={isCareerActive}
        aria-label={t("menu.career")}
        title={t("menu.career")}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 12v3"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
        <span>{t("menu.career")}</span>
      </ShortcutLink>
      <ShortcutLink
        to={{ pathname: "/wordpress", search: localizedSearch }}
        $active={isWordPressActive}
        aria-label={t("menu.wordpress")}
        title={t("menu.wordpress")}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M8.5 8.5c1.2 3.8 2.4 6.4 3.6 7.8 1.4-2.8 2.4-5.4 3-7.8M9 15.5h6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span>{t("menu.wordpress")}</span>
      </ShortcutLink>
      <LanguageToggle />
      <ThemeToggle />
      <MenuButton
        type="button"
        $open={isOpen}
        onClick={context?.toggleMenu}
        aria-label={isOpen ? t("menu.close") : t("menu.open")}
        aria-expanded={isOpen}
      >
        <span />
        <span />
        <span />
      </MenuButton>
    </TopBar>
  );
}

export default Menu;
