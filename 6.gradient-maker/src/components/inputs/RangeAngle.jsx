import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateAngle } from '../../features/gradient';

export default function RangeAngle() {

    const gradientValues = useSelector(state => state.gradient)

    const dispatch = useDispatch();


    return (
        <input 
        value={ gradientValues.angle }
        onChange={ e => dispatch(updateAngle(e.target.value)) }
        className="w-full h-1 mb-10 bg-gray-200 rounded-leg cursor-pointer"
        type="range" 
        min="0" 
        max="360" />
    )
}
