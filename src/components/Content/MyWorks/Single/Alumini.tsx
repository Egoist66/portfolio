import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import alumini from '../../../../assets/project/alumini.png'


const Alumini: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
           
               <WorkCards 
                    title={project[24].name}
                    imglink={ alumini}
                    projectLink={project[24].link}
                    descr={project[24].description}
                    code={{
                         code_name:"Code",
                         path: project[24].github
                         
                    }}
               
               />
           
           
          </div>
     )
}

export default Alumini
