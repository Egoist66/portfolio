import styled, { css } from "styled-components";

type TextPropsType = {
  _color?: string;
  font_size?: string;
  type?: string;
  children?: React.ReactNode;
  centered?: string;
  mw?: string;
  margin_auto?: string;
};

const textStyles = css<TextPropsType>`
  color: ${(props) => props._color ?? "inherit"};
  font-size: ${(props) => props.font_size ?? "inherit"};
  text-align: ${(props) => (props.centered === "true" ? "center" : "initial")};
  max-width: ${(props) => props.mw ?? "none"};
  margin: ${(props) => (props.margin_auto === "true" ? "0 auto" : "0")};
`;

const StyledParagraph = styled.p<TextPropsType>`
  ${textStyles}
`;

const StyledTitleH1 = styled.h1<TextPropsType>`
  ${textStyles}
  font-family: ${({ theme }) =>
    theme.styles.font.headingFamilies.join(", ")};
`;

const StyledTitleH2 = styled.h2<TextPropsType>`
  ${textStyles}
  font-family: ${({ theme }) =>
    theme.styles.font.headingFamilies.join(", ")};
`;

function Text({
  _color,
  font_size,
  type = "p",
  centered,
  children,
  mw,
  margin_auto,
}: TextPropsType) {
  const props = { centered, font_size, _color, mw, margin_auto };

  switch (type) {
    case "p":
      return <StyledParagraph {...props}>{children}</StyledParagraph>;
    case "h2":
      return <StyledTitleH2 {...props}>{children}</StyledTitleH2>;
    case "h1":
      return <StyledTitleH1 {...props}>{children}</StyledTitleH1>;
    default:
      throw new Error(`Unknown ${type} property`);
  }
}

export default Text;
