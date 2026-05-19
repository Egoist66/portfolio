import styled from "styled-components";
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
  const isOpen = !context?.isToggled;

  return (
    <TopBar>
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
