import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import converter from '../../../../assets/project/convert.png'


const Converter: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
          
               <WorkCards 
                    title={project[4].name}
                    imglink={converter}
                    projectLink={project[4].link}
                    descr={project[4].description}
                    code={{
                         code_name:"Code",
                         path: project[4].github
                         
                    }}
               
               />
          
          
          </div>
     )
}

export default Converter