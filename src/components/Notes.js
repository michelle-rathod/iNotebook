import React, { useContext, useEffect, useRef , useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    let navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }else{
            navigate('/login')
        }
       
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id:"", etitle: "", edescription: "", etag: "" });

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id: currentNote._id ,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }


    const handleClick = (e) => {
        
        editNote(note.id, note.etitle, note.edescription, note.etag)
      refClose.current.click()
      props.showAlert("Note Updated","success")
      
    }
  
    const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value })
  
    }
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            {/* Modal  */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} required minLength={3} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" aria-describedby="emailHelp" value={note.etag} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={note.edescription} id="edescription" name='edescription' onChange={onChange} required minLength={4} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<3 || note.edescription.length<4} onClick={handleClick} type="button" className="btn btn-danger">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2 className='mt-2'>Your Notes</h2>
                <div className='container'>{notes.length ===0 && "No notes to display"}</div>
                {notes.map (note =>
                    <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                )}
            </div>
        </>
    )
}

export default Notes