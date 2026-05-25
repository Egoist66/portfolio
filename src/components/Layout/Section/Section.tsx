import styled, { css } from "styled-components";

type SectionPropsType = {
  $bgColor?: string;
  $relative?: boolean;
  $hero?: boolean;
};

const Section = styled.section<SectionPropsType>`
  width: 100%;
  padding: ${({ theme, $hero }) =>
    $hero ? "0" : theme.styles.space.section} 0;
  background-color: ${({ $bgColor, theme }) =>
    $bgColor ?? theme.styles.colors.mainBg};
  transition: background-color 0.35s ease;
  position: ${({ $relative }) => ($relative ? "relative" : "static")};
  overflow: hidden;

  ${({ $hero }) =>
    $hero &&
    css`
      min-height: 100svh;
      display: flex;
      flex-direction: column;
    `}
`;

export default Section;
