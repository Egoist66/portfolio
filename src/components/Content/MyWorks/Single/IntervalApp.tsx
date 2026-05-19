import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import interval from '../../../../assets/project/interval.png'


const IntervalApp: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
<WorkCards 
                    title={project[23].name}
                    imglink={ interval}
                    projectLink={project[23].link}
                    descr={project[23].description}
                    code={{
                         code_name:"Code",
                         path: project[23].github
                         
                    }}
               
               />
          </SingleProjectWrap>
     )
}

export default IntervalApp
