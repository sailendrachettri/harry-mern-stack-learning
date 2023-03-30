import noteContext from "./noteContext"
import { useState } from "react"

const NoteState = (props) => {
    const notesInitial =
        [
            {
                "_id": "6420605f1a526e8536e81a4dc",
                "user": "642023d2575fa11a0238dfa7",
                "title": "my title",
                "description": "description",
                "tag": "mytag",
                "date": "2023-03-26T15:10:23.073Z",
                "__v": 0
            },
            {
                "_id": "64206035fa526e8536e81a4de",
                "user": "642023d2575fa11a0238dfa7",
                "title": "my title",
                "description": "description",
                "tag": "mytag",
                "date": "2023-03-26T15:10:23.860Z",
                "__v": 0
            },
            {
                "_id": "64204605fa526e8536e81a4de",
                "user": "642023d2575fa11a0238dfa7",
                "title": "my title",
                "description": "description",
                "tag": "mytag",
                "date": "2023-03-26T15:10:23.860Z",
                "__v": 0
            },
            {
                "_id": "6420605fa526e58536e81a4de",
                "user": "642023d2575fa11a0238dfa7",
                "title": "my title",
                "description": "description",
                "tag": "mytag",
                "date": "2023-03-26T15:10:23.860Z",
                "__v": 0
            },
            {
                "_id": "6420605fa5256e8536e81a4de",
                "user": "642023d2575fa11a0238dfa7",
                "title": "Hit the gym",
                "description": "Ok boss i got it",
                "tag": "mytag",
                "date": "2023-03-26T15:10:23.860Z",
                "__v": 0
            },
            {
                "_id": "6420605fa5264e8536e81a4de",
                "user": "642023d2575fa11a0238dfa7",
                "title": "my title",
                "description": "description",
                "tag": "mytag",
                "date": "2023-03-26T15:10:23.860Z",
                "__v": 0
            },
        ]

    // add a note
    const addNote = (title, description, tag) => {
        console.log("adding a new note");
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
    const deleteNote = () => {

    }

    //edit a note
    const editNote = () => {

    }

    const [notes, setNotes] = useState(notesInitial)


    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState