import noteContext from "./noteContext"
import { useState } from "react"

const NoteState = (props) => {
    const notesInitial =
        [
            {
                "_id": "6420605fa526e8536e81a4dc",
                "user": "642023d2575fa11a0238dfa7",
                "title": "my title",
                "description": "description",
                "tag": "mytag",
                "date": "2023-03-26T15:10:23.073Z",
                "__v": 0
            },
            {
                "_id": "6420605fa526e8536e81a4de",
                "user": "642023d2575fa11a0238dfa7",
                "title": "my title",
                "description": "description",
                "tag": "mytag",
                "date": "2023-03-26T15:10:23.860Z",
                "__v": 0
            },
            {
                "_id": "6420605fa526e8536e81a4de",
                "user": "642023d2575fa11a0238dfa7",
                "title": "my title",
                "description": "description",
                "tag": "mytag",
                "date": "2023-03-26T15:10:23.860Z",
                "__v": 0
            },
            {
                "_id": "6420605fa526e8536e81a4de",
                "user": "642023d2575fa11a0238dfa7",
                "title": "my title",
                "description": "description",
                "tag": "mytag",
                "date": "2023-03-26T15:10:23.860Z",
                "__v": 0
            },
            {
                "_id": "6420605fa526e8536e81a4de",
                "user": "642023d2575fa11a0238dfa7",
                "title": "Hit the gym",
                "description": "Ok boss i got it",
                "tag": "mytag",
                "date": "2023-03-26T15:10:23.860Z",
                "__v": 0
            },
            {
                "_id": "6420605fa526e8536e81a4de",
                "user": "642023d2575fa11a0238dfa7",
                "title": "my title",
                "description": "description",
                "tag": "mytag",
                "date": "2023-03-26T15:10:23.860Z",
                "__v": 0
            },
        ]

    const [notes, setNotes] = useState(notesInitial)


    return (
        <noteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState