import styled from "styled-components"
import Nav from "../Nav/Nav"

type HeaderProps = {
    hidden: boolean | undefined
}

function Header ({hidden} : HeaderProps){

    const StyledHeader = styled.header(({
        width: '100%',
        height: '100%',
        position: 'fixed',
        inset: 0,
        backgroundColor: '#333'

    }))

    return (
        <>
        
            {!hidden && <StyledHeader><Nav /></StyledHeader>}
        </>
    )
}

export default Header