import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import generator from '../../../../assets/project/generator.png'


const Generator: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
<WorkCards 
                    title={project[6].name}
                    imglink={generator}
                    projectLink={project[6].link}
                    descr={project[6].description}
                    code={{
                         code_name:"Code",
                         path: project[6].github
                         
                    }}
               
               />
          </SingleProjectWrap>
     )
}

export default Generator