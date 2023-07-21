import styled from "styled-components";

type TextPropsType = {
    _color?: string,
    font_size?: string,
    type?: string,
    children?: any
    
}

function Text({_color, font_size, type, children} : TextPropsType){

    const StyledParagraph = styled.p(props => ({
        color: _color,
        fontSize: font_size,
        
       
    }))

    const StyledTitle = styled.h2(props => ({
        color: _color,
        fontSize: font_size,
        
       
    }))


    switch(type){
        case 'p':
            return <StyledParagraph>{children}</StyledParagraph>
        case 'h2':
            return <StyledTitle>{children}</StyledTitle>
        default:
            throw new Error(`Unknown ${type} property`)        
    }

  
   
}

export default Text
