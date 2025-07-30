import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import weather from '../../../../assets/project/weather.png'


const WeatherApp: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
          
               <WorkCards 
                    title={project[14].name}
                    imglink={weather}
                    projectLink={project[14].link}
                    descr={project[14].description}
                    code={{
                         code_name:"Code",
                         path: project[14].github
                         
                    }}
               
               />
          
          
          </div>
     )
}

export default WeatherApp