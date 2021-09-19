import React from 'react';
import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);
  // Add a note
  const addNote = async (title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MGE4NzcxNzBkZGJjYjE0NGY5NjAzIn0sImlhdCI6MTYzMTcyNjYxNn0.yP8AGxsqlRBI7EAuz7hT2d_N209Hz1DUC0HG0GLLTTA"
      },
      body: JSON.stringify({ title, description, tag })
    });
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
  // Get all notes
  const getNotes = async () => {
    // api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MGE4NzcxNzBkZGJjYjE0NGY5NjAzIn0sImlhdCI6MTYzMTcyNjYxNn0.yP8AGxsqlRBI7EAuz7hT2d_N209Hz1DUC0HG0GLLTTA"
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }
  // Delete a note
  const deleteNote = (id) => {
    console.log("del note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST', headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MGE4NzcxNzBkZGJjYjE0NGY5NjAzIn0sImlhdCI6MTYzMTcyNjYxNn0.yP8AGxsqlRBI7EAuz7hT2d_N209Hz1DUC0HG0GLLTTA"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }
  return (
    <NoteContext.Provider value={{ notes, getNotes,editNote, deleteNote, addNote }} >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;