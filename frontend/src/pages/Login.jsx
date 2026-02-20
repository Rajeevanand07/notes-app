import { useForm } from "react-hook-form";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

const Login = () => {
  const { setUser } = useContext(NotesContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate()


  const onSubmit = async(data) => {
    const res = await axios.post('http://localhost:3000/api/user/login',data,{
      withCredentials: true
    })
    console.log(res.data.user);
    reset();
    setUser(res.data.user)
    navigate('/notes')
  };

  return (
    <div className="auth-container">
      <h1>Welcome Back</h1>

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required"
          })}
        />
        {errors.email && (
          <span className="error-text">{errors.email.message}</span>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required"
          })}
        />
        {errors.password && (
          <span className="error-text">{errors.password.message}</span>
        )}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;