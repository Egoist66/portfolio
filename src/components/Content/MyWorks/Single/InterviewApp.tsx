import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import interview from '../../../../assets/project/interview.png'


const InterviewApp: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
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
          </SingleProjectWrap>
     )
}

export default InterviewApp