import styled from "styled-components"
import Nav from "../Nav/Nav"

type HeaderProps = {
    hidden: boolean | undefined
}

function Header ({hidden} : HeaderProps){

    const styledHeader = styled.header(({
        width: '100%',
        height: '100%',
        position: 'fixed',
        inset: 0

    }))

    return (
        <>
        
            {!hidden && <header><Nav /></header>}
        </>
    )
}

export default Header