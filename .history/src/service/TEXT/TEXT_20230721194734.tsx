import styled from "styled-components";

type TextPropsType = {
    _color?: string,
    font_size?: string,
    
}

const Text = styled.p<TextPropsType>(props => ({
    color: props._color,
    fontSize: props.font_size,
    
   
}))

export default Text
