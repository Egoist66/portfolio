import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import lang from '../../../../assets/project/lang.png'


const LangApp: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
          
               <WorkCards 
                    title={project[18].name}
                    imglink={ lang}
                    projectLink={project[18].link}
                    descr={project[18].description}
                    code={{
                         code_name:"Code",
                         path: project[18].github
                         
                    }}
               
               />
          
          
          </div>
     )
}

export default LangApp