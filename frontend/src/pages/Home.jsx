import { useContext } from "react";
import NoteForm from "../components/NoteForm";
import { NotesContext } from "../context/NotesContext";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const {notes,setNotes,editingNote,setEditingNote}=useContext(NotesContext);
  const navigate = useNavigate();

  const addNote = (title, content) => {
    fetch('http://localhost:3000/api/notes',{
      method: 'POST',
      credentials: 'include',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, content})
    })
    .then(res => res.json())
    .then(data => {
      setNotes([...notes, data]);
    })
    
  };
 

  const updateNote = (id, title, content) => {
    fetch(`http://localhost:3000/api/notes/${id}`,{
      method: 'PUT',
      credentials:'include',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, content})
    })
    .then(res => res.json())
    .then(data => {
      setNotes(notes.map((note) => {
        return note._id === id ? data : note;
      }))
    })

    setEditingNote(null);
    navigate("/notes");
  };

  return (
    <div className="container">
      <h1>Notes App</h1>

      <NoteForm
        addNote={addNote}
        updateNote={updateNote}
        editingNote={editingNote}
      />
    </div>
  );
};

export default Home;
