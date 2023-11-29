import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import marvel from '../../../../assets/project/marvel.png'


const Marvel: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
          
               <WorkCards 
                    title={project[0].name}
                    imglink={marvel}
                    projectLink={project[0].link}
                    descr={project[0].description}
                    code={{
                         code_name:"Code",
                         path: project[0].github
                         
                    }}
               
               />
          
          
          </div>
     )
}

export default Marvel