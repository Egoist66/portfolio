import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import pencil from '../../../../assets/project/codepencil.png'


const CodePencil: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
<WorkCards 
                    title={project[2].name}
                    imglink={pencil}
                    projectLink={project[2].link}
                    descr={project[2].description}
                    code={{
                         code_name:"Code",
                         path: project[2].github
                         
                    }}
               
               />
          </SingleProjectWrap>
     )
}

export default CodePencil