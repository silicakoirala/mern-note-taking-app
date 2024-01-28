import notesStore from "../stores/notesStore";

const CreateForm = () => {
    const store = notesStore();
    
    if (store.updateForm._id) return <></>;
    return (
        <div>
            <h2>Create note</h2>
            <form onSubmit={store.createNote}>
                <input
                    onChange={store.updateCreateFormField}
                    value={store.createForm.title}
                    name="title" />
                <textarea
                    onChange={store.updateCreateFormField}
                    value={store.createForm.body}
                    name="body" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateForm;