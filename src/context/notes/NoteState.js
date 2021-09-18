import React from 'react';
import NoteContext from './NoteContext';
import {useState} from 'react';
const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "61438673f3eb6fb038cd1ee2",
          "user": "6140a877170ddbcb144f9603",
          "title": "My title update",
          "description": "this is a description update",
          "tag": "this is a tag updated",
          "date": "2021-09-16T18:01:23.733Z",
          "__v": 0
        },
        {
          "_id": "614387142bdd9086d0c7dcef",
          "user": "6140a877170ddbcb144f9603",
          "title": "My title 2",
          "description": "this is a description 2",
          "tag": "this is a tag 2",
          "date": "2021-09-16T18:04:04.076Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes,setNotes}} >
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;