import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import alumini from '../../../../assets/project/alumini.png'


const Alumini: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
<WorkCards 
                    title={project[24].name}
                    imglink={ alumini}
                    projectLink={project[24].link}
                    descr={project[24].description}
                    code={{
                         code_name:"Code",
                         path: project[24].github
                         
                    }}
               
               />
          </SingleProjectWrap>
     )
}

export default Alumini
