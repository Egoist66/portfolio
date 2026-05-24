import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const TopBar = styled.div`
  position: fixed;
  top: clamp(1rem, 3vw, 1.5rem);
  right: clamp(1rem, 3vw, 1.5rem);
  z-index: 1001;
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const CareerLink = styled(Link)<{ $active?: boolean }>`
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

  @media (max-width: ${({ theme }) => theme.styles.breakpoints.sm}) {
    width: 48px;
    padding: 0;

    span {
      display: none;
    }
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

  return (
    <TopBar>
      <CareerLink to="/career" $active={isCareerActive} aria-label="Моя карьера" title="Моя карьера">
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
        <span>Моя карьера</span>
      </CareerLink>
      <ThemeToggle />
      <MenuButton
        type="button"
        $open={isOpen}
        onClick={context?.toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
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
