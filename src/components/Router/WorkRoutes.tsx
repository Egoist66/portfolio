import { Route, Routes } from "react-router-dom";
import Text from "../../service/TEXT/TEXT";
import { lazy, Suspense } from "react";
import styled from "styled-components";
import { WORK_CARD_WIDTH } from "../Content/MyWorks/WorksCards/WorkCards";

const WorksFallbackWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: clamp(360px, 55vw, 520px);
`;

const WorksFallbackCard = styled.div`
  width: ${WORK_CARD_WIDTH}px;
  max-width: 100%;
  min-height: clamp(320px, 48vw, 480px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.styles.radius.lg};
  border: 1px dashed ${({ theme }) => theme.styles.colors.border};
  background: ${({ theme }) => theme.styles.colors.surface};
`;

const _AllWorks = lazy(() => import("../Content/MyWorks/All/AllWorks"));
const _Marvel = lazy(() => import("../Content/MyWorks/Single/Marvel"));
const _Notes = lazy(() => import("../Content/MyWorks/Single/Notes"));
const _CodePencil = lazy(() => import("../Content/MyWorks/Single/CodePencil"));
const _SimpleEditor = lazy(() => import("../Content/MyWorks/Single/SimpleEditor"));
const _Converter = lazy(() => import("../Content/MyWorks/Single/Converter"));
const _TodoList = lazy(() => import("../Content/MyWorks/Single/Todolist"));
const _Generator = lazy(() => import("../Content/MyWorks/Single/Generator"));
const _Terminal = lazy(() => import("../Content/MyWorks/Single/Terminal"));
const _Signature = lazy(() => import("../Content/MyWorks/Single/Signature"));
const _AdminApp = lazy(() => import("../Content/MyWorks/Single/AdminApp"));
const _CRM = lazy(() => import("../Content/MyWorks/Single/CRM"));
const _Colors = lazy(() => import("../Content/MyWorks/Single/Colors"));
const _KeyNotes = lazy(() => import("../Content/MyWorks/Single/KeyNoteApp"));
const _Password = lazy(() => import("../Content/MyWorks/Single/PasswordApp"));
const _Weather = lazy(() => import("../Content/MyWorks/Single/WeatherApp"));
const _TresFinance = lazy(() => import("../Content/MyWorks/Single/TresFinance"));
const _NotesV2 = lazy(() => import("../Content/MyWorks/Single/VueNotes"));
const _InterviewApp = lazy(() => import("../Content/MyWorks/Single/InterviewApp"));
const _LangApp = lazy(() => import("../Content/MyWorks/Single/LangApp"));
const _TankiShop = lazy(() => import("../Content/MyWorks/Single/TankiShop"));
const _Apisaurus = lazy(() => import("../Content/MyWorks/Single/Apisaurus"));
const _EncryptingApp = lazy(() => import("../Content/MyWorks/Single/EncryptingApp"));
const _VueCsrfApp = lazy(() => import("../Content/MyWorks/Single/VueCsrfApp"));
const _IntervalApp = lazy(() => import("../Content/MyWorks/Single/IntervalApp"));
const _Alumini = lazy(() => import("../Content/MyWorks/Single/Alumini"));
const _Chess = lazy(() => import("../Content/MyWorks/Single/Chess"));

function WorksLoadingFallback() {
  return (
    <WorksFallbackWrap>
      <WorksFallbackCard>
        <Text centered="true" type="h2">
          Loading...
        </Text>
      </WorksFallbackCard>
    </WorksFallbackWrap>
  );
}

function WorkRoutes() {
  return (
    <Suspense fallback={<WorksLoadingFallback />}>
      <Routes>
        <Route path="/" element={<_AllWorks />} />
        <Route path="/marvel-app" element={<_Marvel />} />
        <Route path="/notes-app" element={<_Notes />} />
        <Route path="/code-pencil-app" element={<_CodePencil />} />
        <Route path="/simple-editor-app" element={<_SimpleEditor />} />
        <Route path="/converter-app" element={<_Converter />} />
        <Route path="/todolist-app" element={<_TodoList />} />
        <Route path="/generator-app" element={<_Generator />} />
        <Route path="/terminal-app" element={<_Terminal />} />
        <Route path="/signature-app" element={<_Signature />} />
        <Route path="/admin-app" element={<_AdminApp />} />
        <Route path="/crm-app" element={<_CRM />} />
        <Route path="/colors-app" element={<_Colors />} />
        <Route path="/keynotes-app" element={<_KeyNotes />} />
        <Route path="/password-app" element={<_Password />} />
        <Route path="/weather-app" element={<_Weather />} />
        <Route path="/tres-finance" element={<_TresFinance />} />
        <Route path="/basic-notes" element={<_NotesV2 />} />
        <Route path="/interview-app" element={<_InterviewApp />} />
        <Route path="/learn-lang-app" element={<_LangApp />} />
        <Route path="/tanki-shop" element={<_TankiShop />} />
        <Route path="/apisaurus" element={<_Apisaurus />} />
        <Route path="/encrypting-app" element={<_EncryptingApp />} />
        <Route path="/vue-csrf-app" element={<_VueCsrfApp />} />
        <Route path="/interval-app" element={<_IntervalApp />} />
        <Route path="/alumini-js" element={<_Alumini />} />
        <Route path="/chess-app" element={<_Chess />} />

        <Route path="*" element={<_AllWorks />} />
      </Routes>
    </Suspense>
  );
}

export default WorkRoutes;
