import styled from "styled-components"
import Nav from "../Nav/Nav"
import { useAppContext } from "../../../context/AppContext"

type HeaderProps = {
    hidden: boolean | undefined,
    class_name: string
}

function Header ({hidden, class_name} : HeaderProps){

    const theme = useAppContext()

    const StyledHeader = styled.header(({
        width: '100%',
        height: theme?.isToggled ? '100%' : '0%',
        position: 'fixed',
        inset: 0,
        transition: '0.3s all ease',
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