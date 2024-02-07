import {Routes, Route} from 'react-router-dom'
import Text from '../../service/TEXT/TEXT';
import AllWorks from '../Content/MyWorks/All/AllWorks';
import Marvel from '../Content/MyWorks/Single/Marvel';
import Notes from '../Content/MyWorks/Single/Notes';
import CodePencil from '../Content/MyWorks/Single/CodePencil';
import SimpleEditor from '../Content/MyWorks/Single/SimpleEditor';
import Converter from '../Content/MyWorks/Single/Converter';
import Todolist from '../Content/MyWorks/Single/Todolist';
import Generator from '../Content/MyWorks/Single/Generator';
import Terminal from '../Content/MyWorks/Single/Terminal';
import Siganture from '../Content/MyWorks/Single/Signature';
import AdminApp from '../Content/MyWorks/Single/AdminApp';
import CRM from '../Content/MyWorks/Single/CRM';



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
      <Route path='/generator-app' element={<Generator />} />
      <Route path='/terminal-app' element={<Terminal />} />
      <Route path='/signature-app' element={<Siganture />} />
      <Route path='/admin-app' element={<AdminApp />} />
      <Route path='/crm-app' element={<CRM />} />
      <Route path='*' element={<Text centered='true' type='h2'>404</Text>} />
    </Routes>
  )
}

export default WorkRoutes
