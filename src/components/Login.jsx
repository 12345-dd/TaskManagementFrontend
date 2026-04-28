import { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("https://taskmanagementbackend-o0bo.onrender.com/user/login", data);
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login 
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            {...register("email", { required: true })}
            placeholder="Email"
            className="border p-2 mb-3 w-full rounded focus:outline-blue-500"
          />

          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            className="border p-2 mb-4 w-full rounded focus:outline-blue-500"
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded transition">
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}