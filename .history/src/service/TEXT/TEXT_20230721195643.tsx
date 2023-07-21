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

    const StyledTitle = styled.h2(props => ({
        color: _color,
        fontSize: font_size,
        
       
    }))


    switch(type){
        case 'p':
            return <StyledParagraph/>
        case 'h2':
            return <StyledTitle />
        default:
            throw new Error(`Unknown ${type} property`)        
    }

  
   
}

export default Text
