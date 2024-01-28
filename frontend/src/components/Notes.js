import notesStore from "../stores/notesStore";
import Note from "./Note";

const Notes = ({ note }) => {
    const store = notesStore();
    return (
        <div>
            <h2>Notes:</h2>
            {store.notes && store.notes.map((note) => { //check if notes exist and  map notes
                return (
                    <Note note={note} nkey={note._id} />
                );
            })}
        </div>
    )
}

export default Notes;