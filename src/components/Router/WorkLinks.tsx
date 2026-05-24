import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import {
  workRoutePaths,
  workRouteProjectIndex,
} from "../../i18n/projects";
import { useLanguage } from "../../context/LanguageContext";
import { useProjects } from "../../hooks/useLocalizedData";
import { setLocaleInSearch } from "../../utils/localeQuery";

const WorksNav = styled.nav`
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

const WorksNavList = styled.ul`
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

const WorksNavLink = styled(NavLink)`
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

function WorkLinks() {
  const { t, locale } = useLanguage();
  const location = useLocation();
  const projects = useProjects();
  const localizedSearch = setLocaleInSearch(location.search, locale);

  return (
    <WorksNav id="works-nav">
      <WorksNavList id="works-nav-list">
        {workRoutePaths.map((path, i) => {
          const projectIndex = workRouteProjectIndex[i];
          const label =
            projectIndex === null
              ? t("common.all")
              : projects[projectIndex]?.name ?? path;

          return (
            <li key={path}>
              <WorksNavLink
                id={i === 0 ? "def-route" : undefined}
                className="route-links"
                to={{ pathname: path, search: localizedSearch }}
              >
                {label}
              </WorksNavLink>
            </li>
          );
        })}
      </WorksNavList>
    </WorksNav>
  );
}

export default WorkLinks;
