import {FC} from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import terminal from '../../../../assets/images-2/terminal.png'


const Terminal: FC = () => {
    const {project} = data
    return (
        <div style={{
            maxWidth: 650,
            margin: '0 auto'
        }}>

            <WorkCards
                title={project[7].name}
                imglink={terminal}
                projectLink={project[7].link}
                descr={project[7].description}
                code={{
                    code_name: "Code",
                    path: project[7].github

                }}

            />


        </div>
    )
}

export default Terminal