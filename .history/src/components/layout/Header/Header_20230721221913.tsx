import styled from "styled-components"
import Nav from "../Nav/Nav"
import { useAppContext } from "../../../context/AppContext"

type HeaderProps = {
    hidden: boolean | undefined,
   
}

function Header ({hidden} : HeaderProps){


    const StyledHeader = styled.header(props => ({
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        transition: '0.3s all ease',
        backgroundColor:'#2f2e2efa',
        backdropFilter: 'blur(4px)',
        zIndex: 4
    }))

    return (
        <>
        
            {!hidden && <StyledHeader><Nav /></StyledHeader>}
        </>
    )
}

export default Header