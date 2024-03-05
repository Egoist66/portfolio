import styled from "styled-components"
import Nav from "../Nav/Nav"

type HeaderProps = {
    hidden: boolean | undefined,
   
}

const StyledHeader = styled.header(props => ({
    width: '100%',
    height: '100%',
    position: 'absolute',
    inset: 0,
    backgroundColor:'#2f2e2efa',
    backdropFilter: 'blur(4px)',
    zIndex: 33333
}))

function Header ({hidden} : HeaderProps){


    return (
        <>
        
            {!hidden && <StyledHeader><Nav /></StyledHeader>}
        </>
    )
}

export default Header