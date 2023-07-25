import {Routes, Route, Navigate} from 'react-router-dom'
import Text from '../../service/TEXT/TEXT';
import AllWorks from '../Content/MyWorks/All/AllWorks';



function WorkRoutes() {


  return (
    <Routes>
      <Route path='/all' element={<AllWorks />} />
      <Route path='/landing-page' element={<Text>Landing page</Text>} />
      <Route path='/react' element={<Text>React</Text>} />
      <Route path='/spa' element={<Text>SPA</Text>} />
    </Routes>
  )
}

export default WorkRoutes
