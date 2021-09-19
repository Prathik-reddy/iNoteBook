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
        },
        {
          "_id": "614387142bdd9086d1c7dcef",
          "user": "6140a877170ddbcb144f9603",
          "title": "My title 2",
          "description": "this is a description 2",
          "tag": "this is a tag 2",
          "date": "2021-09-16T18:04:04.076Z",
          "__v": 0
        },
        {
          "_id": "614387142bdd9086d2c7dcef",
          "user": "6140a877170ddbcb144f9603",
          "title": "My title 2",
          "description": "this is a description 2",
          "tag": "this is a tag 2",
          "date": "2021-09-16T18:04:04.076Z",
          "__v": 0
        },
        {
          "_id": "614387142bdd9086d3c7dcef",
          "user": "6140a877170ddbcb144f9603",
          "title": "My title 2",
          "description": "this is a description 2",
          "tag": "this is a tag 2",
          "date": "2021-09-16T18:04:04.076Z",
          "__v": 0
        },
        {
          "_id": "614387142bdd9086d4c7dcef",
          "user": "6140a877170ddbcb144f9603",
          "title": "My title 2",
          "description": "this is a description 2",
          "tag": "this is a tag 2",
          "date": "2021-09-16T18:04:04.076Z",
          "__v": 0
        },
        {
          "_id": "614387142bdd9086d5c7dcef",
          "user": "6140a877170ddbcb144f9603",
          "title": "My title 2",
          "description": "this is a description 2",
          "tag": "this is a tag 2",
          "date": "2021-09-16T18:04:04.076Z",
          "__v": 0
        },
        {
          "_id": "614387142bdd9086d6c7dcef",
          "user": "6140a877170ddbcb144f9603",
          "title": "My title 2",
          "description": "this is a description 2",
          "tag": "this is a tag 2",
          "date": "2021-09-16T18:04:04.076Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial);
      // Add a note
      const addNote = (title,description,tag) =>{
        let note = {
          "_id": "614387142bdd9086d6c7dcef",
          "user": "6140a877170ddbcb144f9603",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2021-09-16T18:04:04.076Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }
      // Delete a note
      const deleteNote = (id) =>{
          console.log("del note with id"+id);
          const newNotes = notes.filter((note) => {return note._id!==id});
          setNotes(newNotes);
      }
      // Edit a note
      const editNote = () =>{

      }
    return (
        <NoteContext.Provider value={{notes,editNote,deleteNote,addNote}} >
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;