import styled from "styled-components";
import { NavLink } from "react-router-dom";

type Routes = {
  name: string;
  path: string;
};

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

const routes: Array<Routes> = [
  { name: "All", path: "/" },
  { name: "Marvel app", path: "/marvel-app" },
  { name: "Notes app", path: "/notes-app" },
  { name: "CodePencil app", path: "/code-pencil-app" },
  { name: "SimpleEditor app", path: "/simple-editor-app" },
  { name: "Converter app", path: "/converter-app" },
  { name: "Todolist-app", path: "/todolist-app" },
  { name: "Entities generator-app", path: "/generator-app" },
  { name: "Terminal-app", path: "/terminal-app" },
  { name: "Signature-app", path: "/signature-app" },
  { name: "Admin-app", path: "/admin-app" },
  { name: "CRM-app", path: "/crm-app" },
  { name: "Colors-app", path: "/colors-app" },
  { name: "Keynotes-app", path: "/keynotes-app" },
  { name: "Password-app", path: "/password-app" },
  { name: "Weather-app", path: "/weather-app" },
  { name: "Tres-finance", path: "/tres-finance" },
  { name: "Basic-notes", path: "/basic-notes" },
  { name: "Interview-app", path: "/interview-app" },
  { name: "Learn-lang-app", path: "/learn-lang-app" },
  { name: "Tanki-shop", path: "/tanki-shop" },
  { name: "Apisaurus", path: "/apisaurus" },
  { name: "Encrypting-app", path: "/encrypting-app" },
  { name: "Vue-csrf-app", path: "/vue-csrf-app" },
  { name: "Interval-app", path: "/interval-app" },
  { name: "Alumini-js", path: "/alumini-js" },
];

function WorkLinks() {
  return (
    <WorksNav id="works-nav">
      <WorksNavList id="works-nav-list">
        {routes.map((route, i) => (
          <li key={route.name}>
            <WorksNavLink
              id={i === 0 ? "def-route" : undefined}
              className="route-links"
              to={route.path}
            >
              {route.name}
            </WorksNavLink>
          </li>
        ))}
      </WorksNavList>
    </WorksNav>
  );
}

export default WorkLinks;
