import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import interview from '../../../../assets/project/interview.png'


const InterviewApp: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
          
               <WorkCards 
                    title={project[17].name}
                    imglink={ interview}
                    projectLink={project[17].link}
                    descr={project[17].description}
                    code={{
                         code_name:"Code",
                         path: project[17].github
                         
                    }}
               
               />
          
          
          </div>
     )
}

export default InterviewApp