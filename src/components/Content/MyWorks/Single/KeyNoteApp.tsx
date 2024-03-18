import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import keynote from '../../../../assets/project/keynotes.png'


const KeyNotes: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
          
               <WorkCards 
                    title={project[12].name}
                    imglink={keynote}
                    projectLink={project[12].link}
                    descr={project[12].description}
                    code={{
                         code_name:"Code",
                         path: project[12].github
                         
                    }}
               
               />
          
          
          </div>
     )
}

export default KeyNotes