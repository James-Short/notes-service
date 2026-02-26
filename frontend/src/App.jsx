import {Routes, Route, Navigate} from "react-router-dom"
import HomeLayout from './HomeLayout/HomeLayout.jsx'
import NoteEditor from "./components/NoteEditor/NoteEditor.jsx"
import OpenNotePrompt from "./components/OpenNotePrompt/OpenNotePrompt.jsx"
import LogInPage from "./pages/LogInPage/LogInPage.jsx"
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomeLayout/>}>
        <Route path="" element={<OpenNotePrompt/>}/>
        <Route path="note/:id" element={<NoteEditor/>}/>
      </Route>
      <Route path="/logIn" element={<LogInPage/>}/>
      <Route path="/signUp" element={<SignUpPage/>}/>
      <Route path="/*" element={<Navigate to="/" replace />}/>
    </Routes>
  )
}

export default App
