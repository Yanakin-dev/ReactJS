import { useDispatch, useSelector } from "react-redux"
import NotesList from "./components/NotesList"
import { getNotesFromAPI } from "./features/notes"
import Sidebar from "./components/Sidebar"
import SideNotes from "./components/SideNotes"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Note from "./components/Note"
import Edit from "./components/Edit"

function App() {


  const notes = useSelector(state => state.notes)
  const dispatch = useDispatch()

  if (notes.list === undefined) dispatch(getNotesFromAPI());



  return <div className="bg-slate-800 min-h-screen flex">
    <BrowserRouter>
      <Sidebar />
      <SideNotes />

      <Routes>
        <Route path="/" element={ <NotesList /> } />
        <Route path="/note/:id" element={ <Note /> } />
        <Route path="/editer" element={ <Edit /> } />
        <Route path="/editer/:id" element={ <Edit /> } />
      </Routes>
    
    </BrowserRouter>
  </div>
}

export default App
