import styled from "styled-components"
import Nav from "../Nav/Nav"
import { useAppContext } from "../../../context/AppContext"

type HeaderProps = {
    hidden: boolean | undefined,
   
}

function Header ({hidden} : HeaderProps){


    const StyledHeader = styled.header(({
        width: '100%',
        height: '100%',
        position: 'fixed',
        inset: 0,
        transition: '0.3s all ease',
        backgroundColor: '#333',
        zIndex: 4

    }))

    return (
        <>
        
            {!hidden && <StyledHeader><Nav /></StyledHeader>}
        </>
    )
}

export default Header