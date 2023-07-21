import styled from "styled-components";

type TextPropsType = {
    _color?: string,
    font_size?: string,
    _align?: string
}

const Text = styled.p<TextPropsType>(props => ({
    color: props._align,
    fontSize: props.font_size,
    textAlign: props._align
   
}))

export default Text
