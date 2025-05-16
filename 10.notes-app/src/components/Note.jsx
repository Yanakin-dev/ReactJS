import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteNote } from "../features/notes";


export default function Note() {

    const dispatch = useDispatch();
    const {id} = useParams()
    const navigate = useNavigate();
    const notes = useSelector(state => state.notes)



    const currentNote = notes.list?.find(note => note.id === id)

    return (

        <div className="p-10">
            <Link to="/" className="px-2 py-1 text-slate-800 bg-slate-300 rounded mr-2">Notes</Link>
            <Link to={`/editer/${id}`} className="px-2 py-1 text-slate-200 bg-green-600 rounded mr-2">Mettre à jour</Link>
            <button className="px-2 py-1 text-slate-200 bg-red-600 rounded mr-2" onClick={() => {
                dispatch(deleteNote(id))
                navigate("/")
            }}>Supprimer</button>
            <p className="text-slate-100 text-4xl mb-2 mt-8">{ currentNote?.title }</p>
            <p className="text-slate-200 text-xl mb-4">{ currentNote?.subtitle }</p>
            <p className="text-slate-300">{ currentNote?.bodyText }</p>
        </div>

    )
}