import styled from "styled-components";
import {NavLink} from 'react-router-dom'
import { useRef, useEffect } from 'react';
import {redirect} from 'react-router-dom'



type Routes = {
    name: string,
    path: string
}

const routes : Array<Routes> = [
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
    flexWrap: 'wrap'
    
}))



function WorkLinks() {

    const setDefRoute = () => {
        const defRoute = document.querySelector('#def-route') as HTMLAnchorElement
        if(defRoute){
            defRoute?.click()
        }

    }

    
    useEffect(() => {
        setDefRoute()
       
    })


    return (

        <WorksNav id="works-nav">
            <WorksNavList id="works-nav-list">

                {routes.map((route, i : number) => {
                   
                    return (

                        <li key={route.name}>
                            <NavLink id={i === 0 ? 'def-route' : ''} className={`route-links`} to={route.path}>{route.name}</NavLink>
                        </li>
                    )
                })}

            </WorksNavList>

        </WorksNav>
           
    )
}

export default WorkLinks
