import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import csrf from '../../../../assets/project/csrf.png'


const VueCsrfApp: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
<WorkCards 
                    title={project[22].name}
                    imglink={ csrf}
                    projectLink={project[22].link}
                    descr={project[22].description}
                    code={{
                         code_name:"Code",
                         path: project[22].github
                         
                    }}
               
               />
          </SingleProjectWrap>
     )
}

export default VueCsrfApp
