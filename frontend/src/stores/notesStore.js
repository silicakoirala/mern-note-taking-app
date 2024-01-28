import { create } from 'zustand';
import axios from 'axios';

const notesStore = create((set) => ({
  notes: null,

  createForm: {
    title: "",
    body: "",
  },

  updateForm: {
    _id: null,
    title: "",
    body: "",
  },

  fetchNotes: async () => {
    console.log("hey");
    //fetch the notes
    const res = await axios.get("/notes");
    //set to state
    set({ notes: res.data.notes }); //res data's notes into setNotes
  },

  updateCreateFormField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
  },

  createNote: async (e) => {
    e.preventDefault(); //by default, html reloads the page. So to prevent that from happening, we need preventdefault 

    const { createForm, notes } = notesStore.getState()
    //create the note
    const res = await axios.post("/notes", createForm);

    set({
      notes: [...notes, res.data.note],
      createForm: {
        title: "",
        body: "",
      },
    });
  },

  deleteNote: async (_id) => {
    //delete note 
    const res = await axios.delete(`/notes/${_id}`);
    const { notes } = notesStore.getState();

    //update state
    const newNotes = notes.filter((note) => {
      return note._id !== _id; //everything else excpet the id that we passed
    });

    set({ notes: newNotes });
  },

  handleUpdateFieldChange: (e) => {
    const { value, name } = e.target;

    set((state) => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]: value,
        },
      };
    });
  },

  toggleUpdate: ({ _id, title, body }) => {
    //set state on update form
    set({
      updateForm: {
        title,
        body,
        _id,
      },
    });
  },

  updateNote: async (e) => {
    e.preventDefault(); //prevent refreshing

    const {
       updateForm: { title, body, _id },
     notes,
     } = notesStore.getState();

    //set the update request
    const res = await axios.put(
      `/notes/${_id}`, {
      title,
      body,
    });

    //update state
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === _id;
    });
    newNotes[noteIndex] = res.data.note;

    set({
      notes: newNotes,
      updateForm: {
        _id: null,
        title: "",
        body: "",
      }
    });
  },
}));

export default notesStore;