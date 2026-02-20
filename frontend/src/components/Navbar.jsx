import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { NotesContext } from "../context/NotesContext";
import axios from "axios";

const Navbar = () => {
  const { user, setUser } = useContext(NotesContext);
  
  const logout = async () => {
    console.log("logout");
    try {
      const res = await axios.post("http://localhost:3000/api/user/logout",{}, {
        withCredentials: true,
      });
      console.log(res);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <h2 className="logo">Notes.</h2>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/notes">Notes</NavLink>
          {user == null ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
            </>
          ) : (
            <NavLink to="/login" onClick={logout}>
              logout
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
