import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import todolist from '../../../../assets/project/todolist.png'


const Todolist: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
          
               <WorkCards 
                    title={project[5].name}
                    imglink={todolist}
                    projectLink={project[5].link}
                    descr={project[5].description}
                    code={{
                         code_name:"Code",
                         path: project[5].github
                         
                    }}
               
               />
          
          
          </div>
     )
}

export default Todolist