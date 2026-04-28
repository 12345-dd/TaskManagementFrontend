import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("https://taskmanagementbackend-o0bo.onrender.com/user/signup", data);
      alert("Signup successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-blue-200">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            {...register("name", { required: true })}
            placeholder="Full Name"
            className="border p-2 mb-3 w-full rounded focus:outline-green-500"
          />

          <input
            {...register("email", { required: true })}
            placeholder="Email"
            className="border p-2 mb-3 w-full rounded focus:outline-green-500"
          />

          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            className="border p-2 mb-4 w-full rounded focus:outline-green-500"
          />

          <button className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded transition">
            Signup
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}