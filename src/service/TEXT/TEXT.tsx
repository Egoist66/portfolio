import styled from "styled-components";

type TextPropsType = {
  _color?: string;
  font_size?: string;
  type?: string;
  children?: any;
  centered?: string;
  mw?: string;
  margin_auto?: string
};

const StyledParagraph = styled.p<TextPropsType>((props) => ({
  color: props._color,
  fontSize: props.font_size,
  textAlign: props.centered === "true" ? "center" : "initial",
  maxWidth: props.mw,
  margin: props.margin_auto === 'true' ? '0 auto !important' : 'initial'
}));

const StyledTitleH1 = styled.h1<TextPropsType>((props) => ({
  color: props._color,
  fontSize: props.font_size,
  textAlign: props.centered === "true" ? "center" : "initial",
  maxWidth: props.mw,
  margin: props.margin_auto === 'true' ? '0 auto !important' : 'initial'
}));
const StyledTitleH2 = styled.h2<TextPropsType>((props) => ({
  color: props._color,
  fontSize: props.font_size,
  textAlign: props.centered === "true" ? "center" : "initial",
  maxWidth: props.mw,
  margin: props.margin_auto === 'true' ? '0 auto !important' : 'initial'
}));

function Text({ _color, font_size, type = 'p', centered, children, mw, margin_auto}: TextPropsType) {
  switch (type) {
    case "p":
      return (
        <StyledParagraph
          centered={centered}
          font_size={font_size}
          _color={_color}
          mw={mw}
          margin_auto={margin_auto}
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
          mw={mw}
          margin_auto={margin_auto}
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
          mw={mw}
          margin_auto={margin_auto}
        >
          {children}
        </StyledTitleH1>
      );
    default:
      throw new Error(`Unknown ${type} property`);
  }
}

export default Text;
