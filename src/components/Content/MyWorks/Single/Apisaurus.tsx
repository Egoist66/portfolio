import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import apisaurus from '../../../../assets/project/apisaurus.png'


const Apisaurus: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
           
               <WorkCards 
                    title={project[20].name}
                    imglink={ apisaurus}
                    projectLink={project[20].link}
                    descr={project[20].description}
                    code={{
                         code_name:"Code",
                         path: project[20].github
                         
                    }}
               
               />
           
           
          </div>
     )
}

export default Apisaurus
