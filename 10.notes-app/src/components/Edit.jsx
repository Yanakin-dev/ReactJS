import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNote, editNote } from "../features/notes"
import { useParams } from "react-router-dom"



export default function Edit() {


    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes);
    const [inputsStates, setInputsStates] = useState({
        title: "",
        subtitle: "",
        bodyText: ""
    })
    const [showValidation, setshowValidation] = useState({
        title: false,
        subtitle: false,
        bodyText: false
    })
    const {id} = useParams();

    useEffect(() => {
        if (id && notes.list) {
            setInputsStates({
                title: notes.list.find(note => note.id === id).title,
                subtitle: notes.list.find(note => note.id === id).subtitle,
                bodyText: notes.list.find(note => note.id === id).bodyText
            }) 
        } else {
            setInputsStates({
                title: "",
                subtitle: "",
                bodyText: ""
            })
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (Object.values(inputsStates).every(value => value)) {
            setshowValidation({
                title: false,
                subtitle: false,
                bodyText: false
            })


            if (id && notes.list) {
                dispatch(editNote({...inputsStates, id}))
            }
            else {
                dispatch(addNote({...inputsStates, id: nanoid(8)}))
                setInputsStates({
                    title: "",
                    subtitle: "",
                    bodyText: ""
                })
            }

            
        }
        else {
            for (const[key, value] of Object.entries(inputsStates)) {
                if (value.length === 0) {
                    setshowValidation(state => ({...state, [key]: true}))
                } else {
                    setshowValidation(state => ({...state, [key]: false}))
                }
            }
        }
    }

    return (
        <div className="w-full p-10">
            <p className="text-slate-100 text-xl mb-4">Ajouter une note</p>
            <form onSubmit={ handleSubmit }>
                <label htmlFor="title" className="mb-2 block text-slate-100">Titre</label>
                <input 
                    onChange={ e => setInputsStates({...inputsStates, title: e.target.value} )}
                    type="text" 
                    className="p-2 text-md block w-full rounded bg-slate-200"
                    value={ inputsStates.title } 
                    id="title"
                />
                { showValidation.title && (
                    <p className="text-red-400 mb-2">Veuillez écrire un titre</p>
                )}

                <label htmlFor="subtitle" className="mb-2 mt-4 block text-slate-100">Sous-titre</label>
                <input 
                    onChange={ e => setInputsStates({...inputsStates, subtitle: e.target.value} )}
                    type="text" 
                    className="p-2 text-md block w-full rounded bg-slate-200"
                    value={ inputsStates.subtitle } 
                    id="subtitle"
                />  
                { showValidation.subtitle && (
                    <p className="text-red-400 mb-2">Veuillez écrire un sous-titre</p>
                )}

                <label htmlFor="bodyText" className="mb-2 mt-4 block text-slate-100">Contenu</label>
                <textarea 
                    spellCheck="false"
                    id="bodyText"
                    value={ inputsStates.bodyText }
                    onChange={ e => setInputsStates({...inputsStates, bodyText: e.target.value} )}
                    className="w-full min-h-[300px] p-2 rounded bg-slate-200">
                </textarea> 
                { showValidation.bodyText && (
                    <p className="text-red-400 mb-2">Veuillez écrire du contenu</p>
                )}
                
                <button className="mt-4 px-3 py-1 bg-slate-100 rounded">Enregister</button>
            </form>
        </div>
    )

}