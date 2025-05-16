import React from 'react'
import { addColor, removeColor } from "../features/gradient";
import { useDispatch } from 'react-redux'

export default function AddRemoveColor({ action, text }) {

    const dispatch = useDispatch();  

    const handleClick = () => {
        if (action === "add") dispatch(addColor())
        else dispatch(removeColor())
    }

    return (
        <button onClick={ handleClick } className="mr-1 border-slate-400 rounded min-w-[40w]">{ text }</button>
    )
}
