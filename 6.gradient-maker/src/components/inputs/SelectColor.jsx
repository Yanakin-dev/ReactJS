import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pickColor } from '../../features/gradient';

export default function SelectColor() {

    const gradientValues = useSelector(state => state.gradient)
    
    const dispatch = useDispatch();
    return (
        <div className="mb-5">
            <select 
            onChange={ e => dispatch(pickColor(Number(e.target.value))) }
            className="bg-gray-900 cursor-pointer py-1 px-2 mb-1 mt-2 border-gray-700 outline-none focus:border-gray-500">
                { gradientValues.colors.map((color, index) => (
                    <option key={ color.id } value={ color.id }>Color { color.id }</option>
                ))}
            </select>
        </div>
    )
}
