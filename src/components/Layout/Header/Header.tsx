import styled, { keyframes } from "styled-components";
import Nav from "../Nav/Nav";

type HeaderProps = {
  hidden: boolean | undefined;
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const StyledHeader = styled.header`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.styles.colors.overlay};
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  animation: ${fadeIn} 0.3s ease;
`;

function Header({ hidden }: HeaderProps) {
  if (hidden) return null;

  return (
    <StyledHeader>
      <Nav />
    </StyledHeader>
  );
}

export default Header;
