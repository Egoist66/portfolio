import {Routes, Route} from 'react-router-dom'
import Text from '../../service/TEXT/TEXT';
import AllWorks from '../Content/MyWorks/All/AllWorks';
import Marvel from '../Content/MyWorks/Single/Marvel';
import Notes from '../Content/MyWorks/Single/Notes';
import CodePencil from '../Content/MyWorks/Single/CodePencil';
import SimpleEditor from '../Content/MyWorks/Single/SimpleEditor';
import Converter from '../Content/MyWorks/Single/Converter';
import Todolist from '../Content/MyWorks/Single/Todolist';
import Social from '../Content/MyWorks/Single/Social';
import Terminal from '../Content/MyWorks/Single/Terminal';
import Siganture from '../Content/MyWorks/Single/Signature';



function WorkRoutes() {


  return (
    <Routes>
      <Route path='/all' element={<AllWorks />} />
      <Route path='/marvel-app' element={<Marvel />} />
      <Route path='/notes-app' element={<Notes/>} />
      <Route path='/code-pencil-app' element={<CodePencil/>} />
      <Route path='/simple-editor-app' element={<SimpleEditor />} />
      <Route path='/converter-app' element={<Converter />} />
      <Route path='/todolist-app' element={<Todolist />} />
      <Route path='/social-network-app' element={<Social />} />
      <Route path='/terminal-app' element={<Terminal />} />
      <Route path='/signature-app' element={<Siganture />} />
      <Route path='*' element={<Text centered='true' type='h2'>404</Text>} />
    </Routes>
  )
}

export default WorkRoutes
