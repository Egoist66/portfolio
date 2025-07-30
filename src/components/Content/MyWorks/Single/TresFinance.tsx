import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import tres from '../../../../assets/project/tres.png'


const TresFinance: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
          
               <WorkCards 
                    title={project[15].name}
                    imglink={tres}
                    projectLink={project[15].link}
                    descr={project[15].description}
                    code={{
                         code_name:"Code",
                         path: project[15].github
                         
                    }}
               
               />
          
          
          </div>
     )
}

export default TresFinance