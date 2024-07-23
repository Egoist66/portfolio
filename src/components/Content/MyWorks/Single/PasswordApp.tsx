import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import password from '../../../../assets/project/password.png'


const KeyNotes: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
          
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
          
          
          </div>
     )
}

export default KeyNotes