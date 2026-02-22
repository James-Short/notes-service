import './NoteEditor.css'

function NoteEditor(){
    return(
        <div className='note-editor'>
            <textarea type='text' className='note-title' maxLength={35} placeholder='Your Title' spellCheck={false}/>
            <textarea type="text" className='note-input' placeholder='Write your notes here:'/>
        </div>
    )
}

export default NoteEditor;