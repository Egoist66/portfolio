import styled, { useTheme } from "styled-components";
import Text from "../../../service/TEXT/TEXT";
import avatar from "../../../assets/images/avatar.svg";
import Container from "../../Container/Container";

const HeroInner = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: clamp(6rem, 14vw, 9rem) 0 clamp(3rem, 8vw, 5rem);
`;

const HeroGlow = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;

  &.glow-a {
    width: min(420px, 70vw);
    height: min(420px, 70vw);
    top: 10%;
    right: -10%;
    background: ${({ theme }) => theme.styles.colors.heroGlowA};
  }

  &.glow-b {
    width: min(320px, 55vw);
    height: min(320px, 55vw);
    bottom: 5%;
    left: -5%;
    background: ${({ theme }) => theme.styles.colors.heroGlowB};
  }
`;

const AvatarWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(2rem, 5vw, 3.5rem);
  align-items: center;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.styles.breakpoints.md}) {
    grid-template-columns: 1fr auto;
    gap: 3rem;
  }
`;

const PreviewTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  order: 2;

  @media (min-width: ${({ theme }) => theme.styles.breakpoints.md}) {
    order: 1;
  }
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.35rem 0.85rem;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.styles.colors.decorColorLight};
  background: rgba(124, 108, 240, 0.12);
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.full};
`;

const AvatarFrame = styled.div`
  order: 1;
  justify-self: center;
  position: relative;
  padding: 1.125rem;
  border-radius: 2rem;
  background: ${({ theme }) => theme.styles.colors.surface};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  box-shadow: ${({ theme }) => theme.styles.shadow.lg},
    ${({ theme }) => theme.styles.shadow.glow};
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.styles.breakpoints.md}) {
    order: 2;
    justify-self: end;
    border-radius: 2.25rem;
  }

  &::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: ${({ theme }) => theme.styles.colors.accentGradient};
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Avatar = styled.img`
  display: block;
  width: min(340px, 82vw);
  height: auto;
  border-radius: 1.5rem;

  @media (min-width: ${({ theme }) => theme.styles.breakpoints.md}) {
    width: min(380px, 36vw);
    border-radius: 1.75rem;
  }
`;

function PreviewAvatar() {
  const { colors } = useTheme().styles;

  return (
    <HeroInner>
      <HeroGlow className="glow-a" aria-hidden />
      <HeroGlow className="glow-b" aria-hidden />
      <Container>
        <AvatarWrapper>
          <PreviewTextBox>
            <Eyebrow>Hi there</Eyebrow>
            <Text type="h1" font_size="clamp(2.25rem, 6vw, 3.75rem)">
              I am Farid Makhmudov
            </Text>
            <Text
              type="p"
              font_size="clamp(1.125rem, 2.5vw, 1.5rem)"
              _color={colors.textMuted}
            >
              A Web Developer crafting modern digital experiences.
            </Text>
          </PreviewTextBox>

          <AvatarFrame>
            <Avatar src={avatar} alt="Farid Makhmudov" />
          </AvatarFrame>
        </AvatarWrapper>
      </Container>
    </HeroInner>
  );
}

export default PreviewAvatar;
