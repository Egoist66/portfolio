import styled from "styled-components"
import Nav from "../Nav/Nav"
import { useAppContext } from "../../../context/AppContext"

type HeaderProps = {
    hidden: boolean | undefined,
}

function Header ({hidden} : HeaderProps){

    const context = useAppContext()

    const StyledHeader = styled.header(({
        width: '100%',
        height: '100%',
        position: 'fixed',
        inset: 0,
        backgroundColor: '#333',
        zIndex: 4

    }))

    return (
        <>
        
            {!hidden && <StyledHeader className={context?.isToggled ? 'active' : ''}><Nav /></StyledHeader>}
        </>
    )
}

export default Header