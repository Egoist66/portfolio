import styled from "styled-components";

type TextPropsType = {
    _color?: string,
    font_size?: string,
    
}

function Text({_color, font_size} : TextPropsType){

    const StyledText = styled.p(props => ({
        color: _color,
        fontSize: font_size,
        
       
    }))
}

export default Text
