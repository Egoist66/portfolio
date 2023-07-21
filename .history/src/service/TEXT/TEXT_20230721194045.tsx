import styled from "styled-components";

type TextPropsType = {
    color?: string,
    font_size?: string,
    _align?: string
}

const Text = styled.p<TextPropsType>(props => ({
    color: props.color,
    fontSize: props.font_size,
    textAlign: props._align
}))

export default Text
