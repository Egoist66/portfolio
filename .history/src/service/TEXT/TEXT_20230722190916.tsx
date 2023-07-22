import styled from "styled-components";

type TextPropsType = {
    _color?: string,
    font_size?: string,
    type?: string,
    children?: any
    
}


const StyledParagraph = styled.p<TextPropsType>(props => ({
    color: props._color,
    fontSize: props.font_size,
    
   
}))

const StyledTitleH1 = styled.h1<TextPropsType>(props => ({
    color: props._color,
    fontSize: props.font_size,
    
   
}))
const StyledTitleH2 = styled.h2<TextPropsType>(props => ({
    color: props._color,
    fontSize: props.font_size,
    
   
}))

function Text({_color, font_size, type, children} : TextPropsType){

  
    switch(type){
        case 'p':
            return <StyledParagraph>{children}</StyledParagraph>
        case 'h2':
            return <StyledTitleH2>{children}</StyledTitleH2>
        case 'h1':
            return <StyledTitleH1>{children}</StyledTitleH1>
        default:
            throw new Error(`Unknown ${type} property`)        
    }

  
   
}

export default Text
