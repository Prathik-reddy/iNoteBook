import React , {useContext} from 'react'
import noteContext from '../context/notes/NoteContext';
import {useEffect} from 'react'
export const About = () => {
    const a = useContext(noteContext);
    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <h1>This is about page {a.state.name} and he in {a.state.class}</h1>
        </div>
    )
}
