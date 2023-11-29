import styled from "styled-components";
import { NavLink } from 'react-router-dom'
import { useRef, useEffect } from 'react';
import { redirect } from 'react-router-dom'



type Routes = {
    name: string,
    path: string
}



const WorksNav = styled.nav(props => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '50px'
}))

const WorksNavList = styled.ul(props => ({
    display: 'flex',
    gap: '50px',
    justifyContent: 'center',
    width: '870px',
    flexWrap: 'wrap'

}))


const routes: Array<Routes> = [
    { name: "All", path: "/all" },
    { name: "Marvel app", path: "/marvel-app" },
    { name: "Notes app", path: "/notes-app" },
    { name: "CodePencil app", path: "/code-pencil-app" },
    { name: "SimpleEditor app", path: "/simple-edito-app" },
    { name: "Converter app", path: "/converter-app" },
    { name: "Todolist-app", path: "/todolist-app" },
    { name: "Social network-app", path: "/social-network-app" },
    { name: "Terminal-app", path: "/terminal-app" },
    { name: "Signature-app", path: "/signature-app" },
];




function WorkLinks() {


    return (

        <WorksNav id="works-nav">
            <WorksNavList id="works-nav-list">

                {routes.map((route, i: number) => {

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
