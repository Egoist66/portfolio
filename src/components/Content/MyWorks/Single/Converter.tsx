import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import converter from '../../../../assets/project/convert.png'


const Converter: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
<WorkCards 
                    title={project[4].name}
                    imglink={converter}
                    projectLink={project[4].link}
                    descr={project[4].description}
                    code={{
                         code_name:"Code",
                         path: project[4].github
                         
                    }}
               
               />
          </SingleProjectWrap>
     )
}

export default Converter