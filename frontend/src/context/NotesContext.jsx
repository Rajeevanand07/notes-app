import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const NotesContext = createContext(null);

const NotesContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);

  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    const getAllNotes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/notes", {
          withCredentials: true,
        });
        setNotes(res.data || []);
      } catch (err) {
        console.log(err);
        setNotes([]);
      }
    };
    getAllNotes();
  }, [user]);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/user/currentUser",
          {
            withCredentials: true,
          },
        );
        console.log(res);

        setUser(res.data.user || null);
      } catch (err) {
        console.log(err);
        setUser(null);
      }
    };
    getCurrentUser();
  }, []);

  return (
    <NotesContext.Provider
      value={{ notes, setNotes, editingNote, setEditingNote, user, setUser }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;
