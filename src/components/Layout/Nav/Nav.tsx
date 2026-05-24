import styled from "styled-components";
import { Link } from "react-router-dom";
import routes from "../../../routes/routes.json";
import { useAppContext } from "../../../context/AppContext";

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

const NavLink = styled(Link)`
  font-size: clamp(2rem, 8vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.styles.colors.textColor};
  position: relative;
  transition: color ${({ theme }) => theme.styles.transition.base};

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

function Nav() {
  const context = useAppContext();

  const handleNavClick = () => {
    context?.closeMenu?.();
  };

  return (
    <StyledNav id="main-nav">
      <NavList>
        {routes.map((route) => (
          <li key={route.name}>
            <NavLink to={route.path} onClick={handleNavClick}>
              {route.name}
            </NavLink>
          </li>
        ))}
      </NavList>
    </StyledNav>
  );
}

export default Nav;
