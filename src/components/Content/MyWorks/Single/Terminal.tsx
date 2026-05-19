import {FC} from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import terminal from '../../../../assets/images-2/terminal.png'


const Terminal: FC = () => {
    const {project} = data
    return (
          <SingleProjectWrap>
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
          </SingleProjectWrap>
    )
}

export default Terminal