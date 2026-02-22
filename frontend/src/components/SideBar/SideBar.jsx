import './SideBar.css'
import NoteButton from '../NoteButton/NoteButton.jsx'

function SideBar(){
    return(
        <div className="side-bar">
            <h1 className='notes-header'>Notes</h1>
            <button className='new-note-button'>+</button>
            
            <div className='note-button-holder'>
                <NoteButton name="Notes about stuff and more stuff and more stuff and more stuff"></NoteButton>
                <NoteButton></NoteButton>
                <NoteButton></NoteButton>
                <NoteButton></NoteButton>
                <NoteButton></NoteButton>
                <NoteButton></NoteButton>
                <NoteButton></NoteButton>
                <NoteButton></NoteButton>
                <NoteButton></NoteButton>
                <NoteButton></NoteButton>
                <NoteButton></NoteButton>
                <NoteButton></NoteButton>
                <NoteButton></NoteButton>
            </div>
            
        </div>
    );
}

export default SideBar;