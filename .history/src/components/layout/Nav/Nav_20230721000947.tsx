import routes from "../../../routes/routes.json"


function Nav(){
    return (
        <nav>
            <ul>
                {routes.map(route => (
                    <li key={route.name}>
                        <a href={route.path}>{route.name}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}