import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import lang from '../../../../assets/project/lang.png'


const LangApp: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
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
          </SingleProjectWrap>
     )
}

export default LangApp