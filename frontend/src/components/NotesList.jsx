import { useNavigate } from "react-router-dom";

const NotesList = ({ notes, deleteNote, setEditingNote }) => {
  
  const navigate = useNavigate();
  const editNote = (note) => {
    setEditingNote(note);
    navigate("/");
  };
  
  if (!notes || notes.length === 0) {
    return <div className="notes"><p>No notes found</p></div>;
  }
  
  return (
    <div className="notes">
      {notes.map((note) => (
        <div key={note._id} className="note">
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <div className="actions">
            <button onClick={() => editNote(note)}>Edit</button>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
