import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import tres from '../../../../assets/project/tres.png'


const TresFinance: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
<WorkCards 
                    title={project[15].name}
                    imglink={tres}
                    projectLink={project[15].link}
                    descr={project[15].description}
                    code={{
                         code_name:"Code",
                         path: project[15].github
                         
                    }}
               
               />
          </SingleProjectWrap>
     )
}

export default TresFinance