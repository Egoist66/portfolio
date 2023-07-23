import styled from "styled-components"
import routes from "../../../routes/routes.json"

const StyledNav = styled.nav({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
})

function Nav(){


    return (
        <StyledNav id="main-nav">
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