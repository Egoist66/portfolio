import {Route, Routes} from 'react-router-dom'
import Text from '../../service/TEXT/TEXT';
import {lazy, Suspense} from "react";


const _AllWorks = lazy(() => import('../Content/MyWorks/All/AllWorks'))
const _Marvel = lazy(() => import('../Content/MyWorks/Single/Marvel'))
const _Notes = lazy(() => import('../Content/MyWorks/Single/Notes'))
const _CodePencil = lazy(() => import('../Content/MyWorks/Single/CodePencil'))
const _SimpleEditor = lazy(() => import('../Content/MyWorks/Single/SimpleEditor'))
const _Converter = lazy(() => import('../Content/MyWorks/Single/Converter'))
const _TodoList = lazy(() => import('../Content/MyWorks/Single/Todolist'))
const _Generator = lazy(() => import('../Content/MyWorks/Single/Generator'))
const _Terminal = lazy(() => import('../Content/MyWorks/Single/Terminal'))
const _Signature = lazy(() => import('../Content/MyWorks/Single/Signature'))
const _AdminApp = lazy(() => import('../Content/MyWorks/Single/AdminApp'))
const _CRM = lazy(() => import('../Content/MyWorks/Single/CRM'))
const _Colors = lazy(() => import('../Content/MyWorks/Single/Colors'))
const _KeyNotes = lazy(() => import('../Content/MyWorks/Single/KeyNoteApp'))
const _Password = lazy(() => import('../Content/MyWorks/Single/PasswordApp'))
const _Weather = lazy(() => import('../Content/MyWorks/Single/WeatherApp'))
const _TresFinance = lazy(() => import('../Content/MyWorks/Single/TresFinance'))
const _NotesV2 = lazy(() => import('../Content/MyWorks/Single/VueNotes'))
const _InterviewApp = lazy(() => import('../Content/MyWorks/Single/InterviewApp'))
const _LangApp = lazy(() => import('../Content/MyWorks/Single/LangApp'))

function WorkRoutes() {


  return (
    <Suspense fallback={<Text>Loading...</Text>}>
        <Routes>
            <Route path='/' element={<_AllWorks />} />
            <Route path='/marvel-app' element={<_Marvel />} />_
            <Route path='/notes-app' element={<_Notes/>} />
            <Route path='/code-pencil-app' element={<_CodePencil/>} />
            <Route path='/simple-editor-app' element={<_SimpleEditor />} />
            <Route path='/converter-app' element={<_Converter />} />
            <Route path='/todolist-app' element={<_TodoList />} />
            <Route path='/generator-app' element={<_Generator />} />
            <Route path='/terminal-app' element={<_Terminal />} />
            <Route path='/signature-app' element={<_Signature />} />
            <Route path='/admin-app' element={<_AdminApp />} />
            <Route path='/crm-app' element={<_CRM />} />
            <Route path='/colors-app' element={<_Colors />} />
            <Route path='/keynotes-app' element={<_KeyNotes/>} />
            <Route path='/password-app' element={<_Password />} />
            <Route path='/weather-app' element={<_Weather />} />
            <Route path='/tres-finance' element={<_TresFinance />} />
            <Route path='/basic-notes' element={<_NotesV2 />} />
            <Route path='/interview-app' element={<_InterviewApp />} />
            <Route path='/learn-lang-app' element={<_LangApp />} />


            <Route path='*' element={<Text centered='true' type='h2'>404</Text>} />
        </Routes>
    </Suspense>
  )
}

export default WorkRoutes
