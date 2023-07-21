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

    const StyledTitleH1 = styled.h1(props => ({
        color: _color,
        fontSize: font_size,
        
       
    }))
    const StyledTitleH2 = styled.h2(props => ({
        color: _color,
        fontSize: font_size,
        
       
    }))


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
