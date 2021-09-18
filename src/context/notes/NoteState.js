import React from 'react';
import NoteContext from './NoteContext';
import {useState} from 'react';
const NoteState = (props) => {
    const s1 = {
        "name": "Prathik",
        "class":"sybsc"
    }
    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setState({
                "name":"Prathik Reddy",
                "class":"sybsc Cs"
            });

        }, 1000);
    }

    return (
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;