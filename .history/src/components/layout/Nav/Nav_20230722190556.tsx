import styled from "styled-components"
import routes from "../../../routes/routes.json"


function Nav(){

    const StyledNav = styled.nav({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    })

    return (
        <StyledNav>
            <ul>
                {routes.map(route => (
                    <li key={route.name}>
                        <a href={route.path}>{route.name}</a>
                    </li>
                ))}
            </ul>
        </StyledNav>
    )
}

export default Nav