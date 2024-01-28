import { useEffect } from "react";
import Notes from "../components/Notes";
import UpdateForm from "../components/UpdateForm";
import CreateForm from "../components/CreateForm";
import notesStore from "../stores/notesStore";

const NotesPage = () => {

    const store = notesStore();

    //use effect to run the fuction fetchNotes as soon as the app starts up
    useEffect(() => {
        store.fetchNotes();
    }, []);

    //we want it to run once so we leave the dependency array empty

    return (
        <div>
            <Notes />
            <UpdateForm />
            <CreateForm />
        </div>
    );
}

export default NotesPage;