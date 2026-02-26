import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import axios from 'axios';
import './NoteEditor.css'

function NoteEditor(){
    const { id } = useParams();
    const { refreshSidebar } = useOutletContext();
    

    const[noteTitle, setNoteTitle] = useState("");
    const[noteContent, setNoteContent] = useState("");


    function submitNoteTitleUpdate(){
        axios.post("http://localhost:8080/notes/updateNoteTitle", {
            noteId: id,
            noteTitle: noteTitle
        }, {withCredentials: true})
        .then(() => {
            refreshSidebar();
        })
        .catch(err => {
            console.log(err);
        })
    }

    function submitNoteContentUpdate(){
        axios.post("http://localhost:8080/notes/updateNoteContent", {
            noteId: id,
            noteContent: noteContent
        }, {withCredentials: true})
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        axios.post("http://localhost:8080/notes/getNote", {
            noteId: id,
        }, {withCredentials: true})
        .then((res) => {
            setNoteTitle(res.data.title);
            setNoteContent(res.data.contents);
        })
    }, [id])


    return(
        <div className='note-editor'>
            <textarea type='text' className='note-title' maxLength={35} placeholder='Your Title' spellCheck={false} value={noteTitle}
             onBlur={() => submitNoteTitleUpdate()} onChange={(e) => setNoteTitle(e.target.value)}/>
            <textarea type="text" className='note-input' placeholder='Write your notes here:' value={noteContent}
             onChange={(e) => setNoteContent(e.target.value)} onBlur={(e) => submitNoteContentUpdate(noteContent)}/>
        </div>
    )
}

export default NoteEditor;