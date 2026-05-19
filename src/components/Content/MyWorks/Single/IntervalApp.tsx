import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import interval from '../../../../assets/project/interval.png'


const IntervalApp: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
           
               <WorkCards 
                    title={project[23].name}
                    imglink={ interval}
                    projectLink={project[23].link}
                    descr={project[23].description}
                    code={{
                         code_name:"Code",
                         path: project[23].github
                         
                    }}
               
               />
           
           
          </div>
     )
}

export default IntervalApp
