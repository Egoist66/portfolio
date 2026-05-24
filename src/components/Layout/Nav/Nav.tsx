import styled, { css } from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navRoutes } from "../../../i18n";
import { useAppContext } from "../../../context/AppContext";
import { useLanguage } from "../../../context/LanguageContext";
import {
  getHashFromPath,
  scrollToHash,
  scrollToSection,
} from "../../../utils/scrollToSection";
import { setLocaleInSearch } from "../../../utils/localeQuery";

const StyledNav = styled.nav`
  width: 100%;
  max-width: 640px;
  padding: 2rem;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.75rem, 3vw, 1.25rem);
`;

const navLinkStyles = css`
  font-size: clamp(2rem, 8vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.styles.colors.textColor};
  position: relative;
  transition: color ${({ theme }) => theme.styles.transition.base};
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -6px;
    width: 0;
    height: 3px;
    background: ${({ theme }) => theme.styles.colors.accentGradient};
    border-radius: 3px;
    transform: translateX(-50%);
    transition: width ${({ theme }) => theme.styles.transition.base};
  }

  &:hover {
    color: ${({ theme }) => theme.styles.colors.decorColorLight};

    &::after {
      width: 100%;
    }
  }
`;

const NavRouterLink = styled(Link)`
  ${navLinkStyles}
`;

const NavHashLink = styled.a`
  ${navLinkStyles}
`;

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

    if (location.pathname === "/career") return;

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

    if (location.pathname === "/career") {
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
      <NavList>
        {navRoutes.map((route) => (
          <li key={route.key}>
            {route.path.includes("#") ? (
              <NavHashLink
                href={`/${localizedSearch}#${getHashFromPath(route.path)}`}
                onClick={(e) => handleHashNav(e, route.path)}
              >
                {t(route.key)}
              </NavHashLink>
            ) : route.path === "/career" ? (
              <NavRouterLink
                to={{ pathname: "/career", search: localizedSearch }}
                onClick={closeMenu}
              >
                {t(route.key)}
              </NavRouterLink>
            ) : (
              <NavRouterLink
                to={{ pathname: route.path, search: localizedSearch }}
                onClick={handleHomeClick}
              >
                {t(route.key)}
              </NavRouterLink>
            )}
          </li>
        ))}
      </NavList>
    </StyledNav>
  );
}

export default Nav;
