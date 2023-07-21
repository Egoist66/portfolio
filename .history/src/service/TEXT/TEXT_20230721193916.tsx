import styled from "styled-components";

type TextPropsType = {
    color?: string,
    fontSize?: string,
    _align?: string
}

const Text = styled.p<TextPropsType>((props) => ({
    color: props.color,
    fontSize: props.fontSize,
    textAlign: props._align
}))