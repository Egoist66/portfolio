import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import notes from '../../../../assets/project/notes.png'


const Notes: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
<WorkCards 
                    title={project[1].name}
                    imglink={notes}
                    projectLink={project[1].link}
                    descr={project[1].description}
                    code={{
                         code_name:"Code",
                         path: project[1].github
                         
                    }}
               
               />
          </SingleProjectWrap>
     )
}

export default Notes