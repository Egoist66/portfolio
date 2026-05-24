import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useGames } from "../../hooks/useLocalizedData";
import { setLocaleInSearch } from "../../utils/localeQuery";

const GamesNav = styled.nav`
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
  margin-left: calc(-1 * ${({ theme }) => theme.styles.container.padding});
  margin-right: calc(-1 * ${({ theme }) => theme.styles.container.padding});
  padding: 0 ${({ theme }) => theme.styles.container.padding};
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const GamesNavList = styled.ul`
  display: flex;
  gap: 0.5rem;
  width: max-content;
  min-width: 100%;
  padding-bottom: 0.25rem;

  @media (min-width: ${({ theme }) => theme.styles.breakpoints.lg}) {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    gap: 0.625rem;
  }
`;

const GamesNavLink = styled(NavLink)`
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ theme }) => theme.styles.colors.textMuted};
  background: ${({ theme }) => theme.styles.colors.surface};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.full};
  transition: color ${({ theme }) => theme.styles.transition.base},
    background ${({ theme }) => theme.styles.transition.base},
    border-color ${({ theme }) => theme.styles.transition.base},
    box-shadow ${({ theme }) => theme.styles.transition.base};

  &:hover {
    color: ${({ theme }) => theme.styles.colors.textColor};
    border-color: ${({ theme }) => theme.styles.colors.borderFocus};
  }

  &.active {
    color: #fff;
    background: ${({ theme }) => theme.styles.colors.accentGradient};
    border-color: transparent;
    box-shadow: ${({ theme }) => theme.styles.shadow.glow};
  }
`;

function GameLinks() {
  const { t, locale } = useLanguage();
  const location = useLocation();
  const games = useGames();
  const localizedSearch = setLocaleInSearch(location.search, locale);

  const routes = [
    { name: t("common.all"), path: "/games" },
    { name: games[0]?.name ?? t("games.chess"), path: "/games/chess" },
  ];

  return (
    <GamesNav id="games-nav">
      <GamesNavList id="games-nav-list">
        {routes.map((route) => (
          <li key={route.path}>
            <GamesNavLink
              className="route-links"
              to={{ pathname: route.path, search: localizedSearch }}
              end={route.path === "/games"}
            >
              {route.name}
            </GamesNavLink>
          </li>
        ))}
      </GamesNavList>
    </GamesNav>
  );
}

export default GameLinks;
