import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";



const CRM: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
          
               <WorkCards 
                    title={project[10].name}
                    imglink={''}
                    projectLink={project[10].link}
                    descr={project[10].description}
                    code={{
                         code_name:"Code",
                         path: project[10].github
                         
                    }}
               
               />
          
          
          </div>
     )
}

export default CRM