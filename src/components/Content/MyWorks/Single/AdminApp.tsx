import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import admin from '../../../../assets/project/admin.png'


const AdminApp: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
          
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
          
          
          </div>
     )
}

export default AdminApp