import styled, { css } from "styled-components";

type SectionPropsType = {
  bg_color?: string;
  _relative?: string;
  hero?: boolean;
};

const Section = styled.section<SectionPropsType>`
  width: 100%;
  padding: ${({ theme, hero }) =>
    hero ? "0" : theme.styles.space.section} 0;
  background-color: ${({ bg_color, theme }) =>
    bg_color ?? theme.styles.colors.mainBg};
  transition: background-color 0.35s ease;
  position: ${({ _relative }) =>
    _relative === "true" ? "relative" : "static"};
  overflow: hidden;

  ${({ hero }) =>
    hero &&
    css`
      min-height: 100svh;
      display: flex;
      flex-direction: column;
    `}
`;

export default Section;
