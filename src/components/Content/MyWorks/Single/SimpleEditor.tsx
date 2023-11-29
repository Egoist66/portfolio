import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import editor from '../../../../assets/project/editor.png'


const SimpleEditor: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
          
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
          
          
          </div>
     )
}

export default SimpleEditor