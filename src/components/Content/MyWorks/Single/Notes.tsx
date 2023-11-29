import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import notes from '../../../../assets/project/notes.png'


const Notes: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
          
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
          
          
          </div>
     )
}

export default Notes