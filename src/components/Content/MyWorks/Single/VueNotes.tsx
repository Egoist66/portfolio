import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import notesv2 from '../../../../assets/project/notes-v2.png'


const VueNotes: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
<WorkCards 
                    title={project[16].name}
                    imglink={ notesv2}
                    projectLink={project[16].link}
                    descr={project[16].description}
                    code={{
                         code_name:"Code",
                         path: project[16].github
                         
                    }}
               
               />
          </SingleProjectWrap>
     )
}

export default VueNotes