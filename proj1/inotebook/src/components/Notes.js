import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import Addnote from '../components/Addnote'

function Notes() {
    const context = useContext(noteContext)
    const { notes } = context
    return (
        <>
            <Addnote />
            <div className="row my-3">
                <h3>Your Notes</h3>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes