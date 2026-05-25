import styled, { css } from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navMenuRoutes, navShortcutRoutes } from "../../../i18n";
import { useAppContext } from "../../../context/AppContext";
import { useLanguage } from "../../../context/LanguageContext";
import {
  getHashFromPath,
  scrollToHash,
  scrollToSection,
} from "../../../utils/scrollToSection";
import { setLocaleInSearch } from "../../../utils/localeQuery";

const navGridRoutes = [...navMenuRoutes, ...navShortcutRoutes];

const StyledNav = styled.nav`
  width: 100%;
  max-width: min(920px, 94vw);
  max-height: calc(100svh - 5rem);
  padding: clamp(0.25rem, 1vw, 0.5rem);
  overflow-y: auto;
  overscroll-behavior: contain;
`;

const NavTitle = styled.p`
  margin: 0 0 clamp(1rem, 2.5vh, 1.35rem);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.styles.colors.textMuted};
`;

const NavGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(0.75rem, 2vw, 1rem);
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: ${({ theme }) => theme.styles.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.styles.breakpoints.lg}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(0.875rem, 1.6vw, 1.125rem);
  }
`;

const navCardStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: clamp(4.75rem, 11vh, 6.25rem);
  padding: clamp(0.875rem, 2vw, 1.25rem);
  font-size: clamp(1.0625rem, 2.1vw, 1.3125rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.25;
  text-align: center;
  color: ${({ theme }) => theme.styles.colors.textColor};
  background: ${({ theme }) => theme.styles.colors.surface};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.lg};
  box-shadow: ${({ theme }) => theme.styles.shadow.sm};
  transition: transform ${({ theme }) => theme.styles.transition.fast},
    border-color ${({ theme }) => theme.styles.transition.base},
    box-shadow ${({ theme }) => theme.styles.transition.base},
    color ${({ theme }) => theme.styles.transition.base},
    background ${({ theme }) => theme.styles.transition.base};
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    color: ${({ theme }) => theme.styles.colors.decorColorLight};
    border-color: ${({ theme }) => theme.styles.colors.borderFocus};
    box-shadow: ${({ theme }) => theme.styles.shadow.md};
    background: ${({ theme }) => theme.styles.colors.surfaceHover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.styles.colors.decorColorLight};
    outline-offset: 2px;
  }
`;

const NavCardLink = styled(Link)`
  ${navCardStyles}
`;

const NavCardAnchor = styled.a`
  ${navCardStyles}
`;

const STANDALONE_PATHS = ["/career", "/wordpress"];

function Nav() {
  const context = useAppContext();
  const { t, locale } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const localizedSearch = setLocaleInSearch(location.search, locale);

  const closeMenu = () => {
    context?.closeMenu?.();
  };

  const handleHomeClick = () => {
    closeMenu();

    if (STANDALONE_PATHS.includes(location.pathname)) return;

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHashNav = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    event.preventDefault();

    const sectionId = getHashFromPath(path);
    if (!sectionId) return;

    closeMenu();

    if (STANDALONE_PATHS.includes(location.pathname)) {
      navigate({ pathname: "/", hash: sectionId, search: localizedSearch });
      return;
    }

    if (location.pathname === "/" && location.hash === `#${sectionId}`) {
      scrollToSection(sectionId);
      return;
    }

    navigate({ pathname: "/", hash: sectionId, search: localizedSearch });
    window.setTimeout(() => scrollToHash(`#${sectionId}`), 0);
  };

  return (
    <StyledNav id="main-nav">
      <NavTitle>{t("menu.navigation")}</NavTitle>
      <NavGrid>
        {navGridRoutes.map((route) => (
          <li key={route.key}>
            {route.path.includes("#") ? (
              <NavCardAnchor
                href={`/${localizedSearch}#${getHashFromPath(route.path)}`}
                onClick={(e) => handleHashNav(e, route.path)}
              >
                {t(route.key)}
              </NavCardAnchor>
            ) : STANDALONE_PATHS.includes(route.path) ? (
              <NavCardLink
                to={{ pathname: route.path, search: localizedSearch }}
                onClick={closeMenu}
              >
                {t(route.key)}
              </NavCardLink>
            ) : (
              <NavCardLink
                to={{ pathname: route.path, search: localizedSearch }}
                onClick={handleHomeClick}
              >
                {t(route.key)}
              </NavCardLink>
            )}
          </li>
        ))}
      </NavGrid>
    </StyledNav>
  );
}

export default Nav;
