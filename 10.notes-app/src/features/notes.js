import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    list: undefined
}

export const notes = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNotesFromAPI: (state, action) => {
            state.list = action.payload
        },
        addNote: (state, action) => {
            state.list.push(action.payload)
        },
        editNote: (state, action) => {
            const noteIndex = state.list.findIndex(note => note.id === action.payload.id);
            state.list[noteIndex] = action.payload
        },
        deleteNote: (state, action) => {
            state.list = state.list.filter(note => note.id !== action.payload)
        }
    }
})


export function getNotesFromAPI(action) {
    return function(dispatch, getState) {
        fetch("/data/notes.json")
        .then(response => response.json())
        .then(data => dispatch(addNotesFromAPI(data.notes)))
    }
}


export const { addNotesFromAPI, addNote, editNote, deleteNote } = notes.actions
export default notes.reducer
