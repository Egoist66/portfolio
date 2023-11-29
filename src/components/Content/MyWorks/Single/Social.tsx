import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import social from '../../../../assets/project/social.png'


const Social: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
          
               <WorkCards 
                    title={project[6].name}
                    imglink={social}
                    projectLink={project[6].link}
                    descr={project[6].description}
                    code={{
                         code_name:"Code",
                         path: project[6].github
                         
                    }}
               
               />
          
          
          </div>
     )
}

export default Social