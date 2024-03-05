import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import colors from '../../../../assets/project/colors.png'

const Colors: FC = () => {
     const {project} = data

     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
          
               <WorkCards 
                    title={project[11].name}
                    imglink={colors}
                    projectLink={project[11].link}
                    descr={project[11].description}
                    code={{
                         code_name:"Code",
                         path: project[11].github
                         
                    }}
               
               />
          
          
          </div>
     )
}

export default Colors