import noteContext from "./noteContext"
// import { useState } from "react"

const NoteState = (props) => {

    return (
        <noteContext.Provider value={{ state: "state", update: "update" }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState