import React from 'react';
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note, updateNote} = props;
    return (
        <div className='col-md-4'>
            <div className="card my-3" >
                <div className="card-body border">
                    <h4 className="card-title"><strong>{note.title}</strong></h4>
                    <h6><span className="badge bg-warning text-dark rounded-pill">{note.tag}</span></h6>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted","success")}} ></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
