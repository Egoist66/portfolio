import styled from "styled-components";

type TextPropsType = {
    _color?: string,
    font_size?: string,
    type?: string
    
}

function Text({_color, font_size, type} : TextPropsType){

    const StyledParagraph = styled.p(props => ({
        color: _color,
        fontSize: font_size,
        
       
    }))

    const StyledTitle = styled.p(props => ({
        color: _color,
        fontSize: font_size,
        
       
    }))
}

export default Text