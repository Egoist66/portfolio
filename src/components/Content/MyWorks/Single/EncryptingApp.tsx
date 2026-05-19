import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import encrypting from '../../../../assets/project/encrypting.png'


const EncryptingApp: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
<WorkCards 
                    title={project[21].name}
                    imglink={ encrypting}
                    projectLink={project[21].link}
                    descr={project[21].description}
                    code={{
                         code_name:"Code",
                         path: project[21].github
                         
                    }}
               
               />
          </SingleProjectWrap>
     )
}

export default EncryptingApp
