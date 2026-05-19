import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import admin from '../../../../assets/project/admin.png'


const AdminApp: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
<WorkCards 
                    title={project[9].name}
                    imglink={admin}
                    projectLink={project[9].link}
                    descr={project[9].description}
                    code={{
                         code_name:"Code",
                         path: project[9].github,
                         
                    }}
               
               />
          </SingleProjectWrap>
     )
}

export default AdminApp