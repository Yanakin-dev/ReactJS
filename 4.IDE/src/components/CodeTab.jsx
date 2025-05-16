import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCode } from '../features/tabs';

const CodeTab = ({ code, id }) => {

    const dispatch = useDispatch();

    const handleChange = e => {
        dispatch(updateCode({ id, value: e.target.value }))
    }

    return (
        <textarea
            onChange={e => handleChange(e) }
            value={ code }
            spellCheck="false"
            className="bg-zinc-900 text-slate-200 text-xl p-8 block h-full w-full focus:outline-none resize-none"
            ></textarea>
    );
};

export default CodeTab;