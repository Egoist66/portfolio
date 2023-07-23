import styled from "styled-components";
import {NavLink} from 'react-router-dom'

const routes = [
  { name: "All", path: "/all" },
  { name: "Landing Page", path: "/landing-page" },
  { name: "React", path: "/react" },
  { name: "SPA", path: "/spa" },
];


const WorksNav = styled.nav(props => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '50px'
}))

const WorksNavList = styled.ul(props => ({
    display: 'flex',
    gap: '50px',
    
}))

function WorkLinks() {

    return (

      
        <WorksNav id="works-nav">
            <WorksNavList id="works-nav-list">

                {routes.map(route => (
                    <li key={route.name}>
                        <NavLink className='route-links' to={route.path}>{route.name}</NavLink>
                    </li>
                ))}
            </WorksNavList>
        </WorksNav>
           
    )
}

export default WorkLinks
