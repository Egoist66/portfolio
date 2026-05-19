import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import colors from '../../../../assets/project/colors.png'

const Colors: FC = () => {
     const {project} = data

     return (
          <SingleProjectWrap>
<WorkCards 
                    title={project[11].name}
                    imglink={colors}
                    projectLink={project[11].link}
                    descr={project[11].description}
                    code={{
                         code_name:"Code",
                         path: project[11].github
                         
                    }}
               
               />
          </SingleProjectWrap>
     )
}

export default Colors