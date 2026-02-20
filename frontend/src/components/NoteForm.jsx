import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NoteForm = ({ addNote, updateNote, editingNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editingNote) {
      await axios.put(
        `http://localhost:3000/api/notes/${editingNote._id}`,
        {
          title,
          content,
        },
        {
          withCredentials: true,
        },
      );
      updateNote(editingNote._id, title, content);
    } else {
      await axios.post(
        "http://localhost:3000/api/notes",
        { title, content },
        {
          withCredentials: true,
        },
      );
      addNote(title, content);
    }

    setTitle("");
    setContent("");
    navigate("/notes");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Note content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button>{editingNote ? "Update Note" : "Add Note"}</button>
    </form>
  );
};

export default NoteForm;
