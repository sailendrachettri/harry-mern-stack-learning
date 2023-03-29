import noteContext from "./noteContext"
import { useState } from "react"

const NoteState = (props) => {
    const s1 = {
        "name": "Sailendra",
        "class": "VI sem"
    }

    // states
    const [state, setState] = useState(s1)

    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Groot",
                "class": "I sem"
            })
        }, 2000);
    }
    return (
        <noteContext.Provider value={{ state, update }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState