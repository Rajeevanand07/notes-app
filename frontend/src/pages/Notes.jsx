import NotesList from "../components/NotesList";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

const Notes = () => {
  const { notes, setNotes, setEditingNote } = useContext(NotesContext);
  const deleteNote = (id) => {
    fetch(`http://localhost:3000/api/notes/${id}`,{
      method: 'DELETE',
      credentials: 'include',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        setNotes(notes.filter((note) => note._id !== id ));
      })
  };

  return (
    <NotesList
      notes={notes}
      deleteNote={deleteNote}
      setEditingNote={setEditingNote}
    />
  );
};

export default Notes;
