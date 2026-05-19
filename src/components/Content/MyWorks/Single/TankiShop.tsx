import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import tanki from '../../../../assets/project/tanki.png'


const TankiShop: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
<WorkCards 
                    title={project[19].name}
                    imglink={ tanki}
                    projectLink={project[19].link}
                    descr={project[19].description}
                    code={{
                         code_name:"Code",
                         path: project[19].github
                         
                    }}
               
               />
          </SingleProjectWrap>
     )
}

export default TankiShop
