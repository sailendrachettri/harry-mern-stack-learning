import noteContext from "./noteContext"
import { useState } from "react"

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const notesInitial = []

    // Get all the notes 
    const getNotes = async () => {
        // API call
        const url = `${host}/api/notes/fetchallnotes`

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyMDIzZDI1NzVmYTExYTAyMzhkZmE3In0sImlhdCI6MTY3OTg0MzI5MX0.SRROYa34h7H5hCQmr3BZJgF6QQccJhfDQtHFQGWVK50'
            }
        })
        const json = await response.json();
        console.log(json);
        setNotes(json)
    }
    // add a note
    const addNote = async (title, description, tag) => {
        // API call
        const url = `${host}/api/notes/addnote`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyMDIzZDI1NzVmYTExYTAyMzhkZmE3In0sImlhdCI6MTY3OTg0MzI5MX0.SRROYa34h7H5hCQmr3BZJgF6QQccJhfDQtHFQGWVK50'
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = response.json()
        console.log(json);

        const note = {
            "_id": "6420603455fa5264e8536e81a4de",
            "user": "642023d2575fa11a0238dfa7",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-03-26T15:10:23.860Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    // delete a note
    const deleteNote = async (id) => {
        // API call
        const url = `${host}/api/notes/deletenote/${id}`

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyMDIzZDI1NzVmYTExYTAyMzhkZmE3In0sImlhdCI6MTY3OTg0MzI5MX0.SRROYa34h7H5hCQmr3BZJgF6QQccJhfDQtHFQGWVK50'
            }
        })
        const json = response.json()
        console.log(json);

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    //edit a note
    const editNote = async (id, title, description, tag) => {
        // API call
        const url = `${host}/api/notes/updatenote/${id}`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyMDIzZDI1NzVmYTExYTAyMzhkZmE3In0sImlhdCI6MTY3OTg0MzI5MX0.SRROYa34h7H5hCQmr3BZJgF6QQccJhfDQtHFQGWVK50'
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = response.json()
        console.log(json);

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];

            if (element._id === id) {
                element.title = title
                element.description = description
                element.tag = tag
            }
        }
    }

    const [notes, setNotes] = useState(notesInitial)


    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState