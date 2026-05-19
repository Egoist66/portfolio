import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import encrypting from '../../../../assets/project/encrypting.png'


const EncryptingApp: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
           
               <WorkCards 
                    title={project[21].name}
                    imglink={ encrypting}
                    projectLink={project[21].link}
                    descr={project[21].description}
                    code={{
                         code_name:"Code",
                         path: project[21].github
                         
                    }}
               
               />
           
           
          </div>
     )
}

export default EncryptingApp
