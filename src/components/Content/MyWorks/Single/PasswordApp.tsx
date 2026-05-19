import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import password from '../../../../assets/project/password.png'


const KeyNotes: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
<WorkCards 
                    title={project[13].name}
                    imglink={password}
                    projectLink={project[13].link}
                    descr={project[13].description}
                    code={{
                         code_name:"Code",
                         path: project[13].github
                         
                    }}
               
               />
          </SingleProjectWrap>
     )
}

export default KeyNotes