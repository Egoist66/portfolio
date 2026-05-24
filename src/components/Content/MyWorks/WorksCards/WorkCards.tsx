import styled from "styled-components";
import Text from "../../../../service/TEXT/TEXT";
import { pseudoLinkElem } from "../../../../style/Global";
import { useLanguage } from "../../../../context/LanguageContext";

export const WORK_CARD_WIDTH = 450;

const StyledWorkCards = styled.article`
  display: flex;
  flex-direction: column;
  width: ${WORK_CARD_WIDTH}px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  background: ${({ theme }) => theme.styles.colors.surface};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.styles.shadow.sm};
  transition: transform ${({ theme }) => theme.styles.transition.base},
    box-shadow ${({ theme }) => theme.styles.transition.base},
    border-color ${({ theme }) => theme.styles.transition.base};

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.styles.colors.borderFocus};
    box-shadow: ${({ theme }) => theme.styles.shadow.md},
      ${({ theme }) => theme.styles.shadow.glow};
  }
`;

const StyledWorkBtn = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.95);
  opacity: 0;
  pointer-events: none;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  padding: 0.65rem 1.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  background: ${({ theme }) => theme.styles.colors.accentGradient};
  border: none;
  border-radius: ${({ theme }) => theme.styles.radius.full};
  box-shadow: ${({ theme }) => theme.styles.shadow.md};
  transition: opacity ${({ theme }) => theme.styles.transition.base},
    transform ${({ theme }) => theme.styles.transition.base};
`;

const StyledWorkImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: fill;
  object-position: center;
  transform: scale(1);
  transform-origin: center center;
  transition: transform ${({ theme }) => theme.styles.transition.slow},
    filter ${({ theme }) => theme.styles.transition.base};
  will-change: transform;
`;

const StyledWorksImgBox = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: ${({ theme }) => theme.styles.colors.imageBg};
  border-bottom: 1px solid ${({ theme }) => theme.styles.colors.border};
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    background: ${({ theme }) =>
      theme.mode === "dark"
        ? "rgba(10, 10, 15, 0.5)"
        : "rgba(15, 23, 42, 0.35)"};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.styles.transition.base};
    pointer-events: none;
  }

  &:hover ${StyledWorkBtn} {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, -50%) scale(1);
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover ${StyledWorkImg} {
    transform: scale(1.06);
    filter: brightness(0.92);
  }
`;

const CardBody = styled.div`
  padding: 1.25rem 1.25rem 0.75rem;
  flex: 1;

  h2 {
    font-size: 1.125rem !important;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.styles.colors.textColor};
  }

  p {
    font-size: 0.9375rem;
    margin: 0 !important;
  }
`;

const CardFooter = styled.div`
  padding: 0 1.25rem 1.25rem;
`;

const StyledWorkLinks = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  ${pseudoLinkElem}
  font-size: 0.8125rem;
`;

type WorkCardsProps = {
  imglink?: string;
  title?: string;
  descr?: string;
  projectLink: string;
  code?: {
    path?: string;
    code_name?: string | "";
  };
};

function WorkCards({
  imglink,
  projectLink,
  title,
  descr,
  code,
}: WorkCardsProps) {
  const { t } = useLanguage();

  return (
    <StyledWorkCards>
      <StyledWorksImgBox>
        <StyledWorkImg
          src={imglink}
          alt={title ?? "Project preview"}
          loading="lazy"
          decoding="async"
        />
        <StyledWorkBtn href={projectLink}>{t("common.viewProject")}</StyledWorkBtn>
      </StyledWorksImgBox>

      <CardBody>
        <Text type="h2">{title}</Text>
        <Text>{descr}</Text>
      </CardBody>

      {code?.path && (
        <CardFooter>
          <StyledWorkLinks href={code.path}>{code.code_name}</StyledWorkLinks>
        </CardFooter>
      )}
    </StyledWorkCards>
  );
}

export default WorkCards;
