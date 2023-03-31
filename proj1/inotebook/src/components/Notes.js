import { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import Addnote from '../components/Addnote'

function Notes() {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", editTitle: "", editDescription: "", editTag: "personal" })

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, editTitle: currentNote.title, editDescription: currentNote.description, editTag: currentNote.tag })
    }

    const handleClick = (e) => {
        editNote(note.id, note.editTitle, note.editDescription, note.editTag)
        refClose.current.click()
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <Addnote />

            {/* Modal to edit your notes */}
            <button ref={ref} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="editTitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="editTitle" name='editTitle' value={note.editTitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editDescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="editDescription" name='editDescription' value={note.editDescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editTag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="editTag" name='editTag' value={note.editTag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Cancle</button>
                            <button disabled={note.editTitle.length < 5 || note.editDescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h3>Your Notes</h3>
                <div className="container">
                    {notes.length === 0 && "No notes to display!"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes