import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import apisaurus from '../../../../assets/project/apisaurus.png'


const Apisaurus: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
<WorkCards 
                    title={project[20].name}
                    imglink={ apisaurus}
                    projectLink={project[20].link}
                    descr={project[20].description}
                    code={{
                         code_name:"Code",
                         path: project[20].github
                         
                    }}
               
               />
          </SingleProjectWrap>
     )
}

export default Apisaurus
