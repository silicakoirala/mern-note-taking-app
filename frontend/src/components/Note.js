import notesStore from "../stores/notesStore";

const Note = ({ note }) => {
    const store = notesStore((store) => {
        return { deleteNote: store.deleteNote, toggleUpdate: store.toggleUpdate };
    });
    return (
        <div key={note._id}>
            <h3>{note.title}</h3>
            <button onClick={() => store.deleteNote(note._id)}>Delete note</button>
            <button onClick={() => store.toggleUpdate(note)} type="submit">Update note</button>
        </div>
    )
}

export default Note;