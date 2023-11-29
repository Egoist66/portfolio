import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import signature from '../../../../assets/project/signature.png'


const Siganture: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
          
               <WorkCards 
                    title={project[8].name}
                    imglink={signature}
                    projectLink={project[8].link}
                    descr={project[8].description}
                    code={{
                         code_name:"Code",
                         path: project[8].github
                         
                    }}
               
               />
          
          
          </div>
     )
}

export default Siganture