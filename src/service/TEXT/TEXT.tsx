import styled from "styled-components";

type TextPropsType = {
  _color?: string;
  font_size?: string;
  type?: string;
  children?: any;
  centered?: string;
};

const StyledParagraph = styled.p<TextPropsType>((props) => ({
  color: props._color,
  fontSize: props.font_size,
  textAlign: props.centered === "true" ? "center" : "initial",
}));

const StyledTitleH1 = styled.h1<TextPropsType>((props) => ({
  color: props._color,
  fontSize: props.font_size,
  textAlign: props.centered === "true" ? "center" : "initial",
}));
const StyledTitleH2 = styled.h2<TextPropsType>((props) => ({
  color: props._color,
  fontSize: props.font_size,
  textAlign: props.centered === "true" ? "center" : "initial",
}));

function Text({ _color, font_size, type = 'p', centered, children }: TextPropsType) {
  switch (type) {
    case "p":
      return (
        <StyledParagraph
          centered={centered}
          font_size={font_size}
          _color={_color}
        >
          {children}
        </StyledParagraph>
      );
    case "h2":
      return (
        <StyledTitleH2
          centered={centered}
          font_size={font_size}
          _color={_color}
        >
          {children}
        </StyledTitleH2>
      );
    case "h1":
      return (
        <StyledTitleH1
          centered={centered}
          font_size={font_size}
          _color={_color}
        >
          {children}
        </StyledTitleH1>
      );
    default:
      throw new Error(`Unknown ${type} property`);
  }
}

export default Text;
