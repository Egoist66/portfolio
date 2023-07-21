import Nav from "../Nav/Nav"

type HeaderProps = {
    hidden?: boolean
}

function Header ({hidden} : HeaderProps){
    return (
        <>
        
            {!hidden && <header><Nav /></header>}
        </>
    )
}

export default Header