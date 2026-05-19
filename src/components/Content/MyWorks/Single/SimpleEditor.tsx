import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import editor from '../../../../assets/project/editor.png'


const SimpleEditor: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
<WorkCards 
                    title={project[3].name}
                    imglink={editor}
                    projectLink={project[3].link}
                    descr={project[3].description}
                    code={{
                         code_name:"Code",
                         path: project[3].github
                         
                    }}
               
               />
          </SingleProjectWrap>
     )
}

export default SimpleEditor