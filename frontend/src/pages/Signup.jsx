import { useForm } from "react-hook-form";
import axios from 'axios'

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    const res = await axios.post("http://localhost:3000/api/user/signup",data)
    console.log(res.data);
    reset();
  };

  return (
    <div className="auth-container">
      <h1>Create Account</h1>

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          {...register("userName", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters"
            }
          })}
        />
        {errors.username && (
          <span className="error-text">{errors.username.message}</span>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && (
          <span className="error-text">{errors.email.message}</span>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })}
        />
        {errors.password && (
          <span className="error-text">{errors.password.message}</span>
        )}

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;