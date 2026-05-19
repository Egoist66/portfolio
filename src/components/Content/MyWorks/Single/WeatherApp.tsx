import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import weather from '../../../../assets/project/weather.png'


const WeatherApp: FC = () => {
     const {project} = data
     return (
          <SingleProjectWrap>
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
          </SingleProjectWrap>
     )
}

export default WeatherApp