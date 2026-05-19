import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import signature from '../../../../assets/project/signature.png'


const Siganture: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
<WorkCards 
                    title={project[8].name}
                    imglink={signature}
                    projectLink={project[8].link}
                    descr={project[8].description}
                    code={{
                         code_name:"Code",
                         path: project[8].github
                         
                    }}
               
               />
          </SingleProjectWrap>
     )
}

export default Siganture