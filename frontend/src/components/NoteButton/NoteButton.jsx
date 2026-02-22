import './NoteButton.css'

function NoteButton(props){
    return(
        <button className="note-button">
            {props.name}
        </button>
    );
}

export default NoteButton;