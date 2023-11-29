import styled from "styled-components"
import DIV from "../../../../service/DIV/DIV"
import Text from "../../../../service/TEXT/TEXT"
import { pseudoLinkElem } from "../../../../style/Global"

const StyledWorkCards = styled.div(props => ({
    backgroundColor: props.theme.styles.colors.secondaryBg,

}))


const StyledWorkBtn = styled.button`
    position: absolute;
    top: 50%;
    left: 50%;
    right: 0;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: 0.3s all ease;
    width: 200px;
    transform: translate(-50%, -50%);
    will-change: contents;
    color: white;
    background-color: ${props => props.theme.styles.colors.decorColor};
    border: none;
    width: 170px;
    height: 32px;
    letter-spacing: 1px;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    border-radius: 5px;
    justify-content: center;
    padding: 6px;


    
`
const StyledWorkImg = styled.img`
    display: block;
    width: 100%;
`

const StyledWorksImgBox = styled.div`

    &:hover ${StyledWorkBtn}{
        opacity: 1;
        pointer-events: visible;
        transition: 0.3s all ease;
        will-change: contents;

    }

    &:hover ${StyledWorkImg}{
        filter: blur(3px);
        will-change: contents;
        transition: 0.3s all ease;
    }
`


const StyledWorkLinks = styled.a.attrs({
    target: '_blank'
})`
    text-transform: uppercase;
    position: relative;

    ${pseudoLinkElem}
    
`


type WorkCardsProps = {

    imglink?: string,
    title?: string,
    descr?: string,
    projectLink: string
    code?: {
        path?: string,
        code_name?: string | ''

    },

}

function WorkCards({imglink, projectLink, title, descr, code} : WorkCardsProps){
    return (
        <StyledWorkCards>
            <StyledWorksImgBox style={{position: 'relative'}}>
                <StyledWorkImg src={imglink} />
                <StyledWorkBtn target="_blank" href={projectLink} as={'a'}>View Project</StyledWorkBtn>
            </StyledWorksImgBox>

            <DIV style={{padding: 20}}>
                <Text font_size="16px" type="h2">{title}</Text>
                <Text>{descr}</Text>
            </DIV>

            <DIV style={
                {
                    padding: 20,
                    display: 'flex',
                    gap: 20
                }
            }>
                <StyledWorkLinks href={code?.path}>{code?.code_name}</StyledWorkLinks>
            </DIV>

        </StyledWorkCards>
    )
}

export default WorkCards