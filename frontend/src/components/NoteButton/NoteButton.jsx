import './NoteButton.css'
import { useNavigate } from 'react-router-dom';

function NoteButton(props){
    const navigate = useNavigate();


    function handleClick(){
        navigate("note/" + props.noteId);
    }

    return(
        <button className="note-button" onClick={() => handleClick()}>
            {props.name}
        </button>
    );
}

export default NoteButton;