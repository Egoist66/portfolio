import styled from "styled-components"
import Nav from "../Nav/Nav"
import { useAppContext } from "../../../context/AppContext"

type HeaderProps = {
    hidden: boolean | undefined,
    class_name: string
}

function Header ({hidden, class_name} : HeaderProps){


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
        
            {!hidden && <StyledHeader className={class_name}><Nav /></StyledHeader>}
        </>
    )
}

export default Header