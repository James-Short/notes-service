import './SideBar.css'
import NoteButton from '../NoteButton/NoteButton.jsx'
import axios from 'axios';
import { useEffect, useState } from 'react';

function SideBar(){
    const [notes, setNotes] = useState([]);

    function updateTaskList(){
        axios.get('http://localhost:8080/users/getUserTaskList', {withCredentials: true})
        .then((res) => {
            setNotes(res.data);   
        })
        .catch((err) => {console.log(err)});
    }

    useEffect(() => {
        updateTaskList();
    }, [])



    function submitNoteCreation(){
        axios.post('http://localhost:8080/notes/createNote', {
            noteTitle: "Blank title",
            noteContents: ""
        }, {withCredentials: true, validateStatus: () => true}
        ).then(() => {
        updateTaskList();
        })
        .catch((err) => alert(err));

    }
        
    return(
        <div className="side-bar">
            <h1 className='notes-header'>Notes</h1>
            <button className='new-note-button' onClick={() => submitNoteCreation()}>+</button>
            
            <div className='note-button-holder'>
                {notes.map((note) => (
                    <NoteButton name={note.title} key={note.id} noteId={note.id}/>
                ))}
            </div>
            
        </div>
    );
}

export default SideBar;