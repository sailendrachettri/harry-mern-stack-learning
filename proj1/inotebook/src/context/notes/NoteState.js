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
        const note = await response.json()
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
        const json = await response.json()

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    //edit a note
    const editNote = async (id, title, description, tag) => {
        // API call
        const url = `${host}/api/notes/updatenote/${id}`

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyMDIzZDI1NzVmYTExYTAyMzhkZmE3In0sImlhdCI6MTY3OTg0MzI5MX0.SRROYa34h7H5hCQmr3BZJgF6QQccJhfDQtHFQGWVK50'
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json()

        let newNotes = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];

            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break
            }
        }
        setNotes(newNotes)
    }

    const [notes, setNotes] = useState(notesInitial)


    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState