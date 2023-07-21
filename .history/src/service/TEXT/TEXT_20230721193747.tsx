import styled from "styled-components";

type TextPropsType = {
    color?: string,
    fontSize?: string,
    align?: string
}

const Text = styled.p<TextPropsType>((props) => ({
    color: props.color
}))