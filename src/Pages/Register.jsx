import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register, googleLogin } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    return hasUpper && hasLower && password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(form.password)) {
      Swal.fire("error!", "The password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.", "error");
      return;
    }

    try {
      await register(form.email, form.password, form.name, form.photoURL);
      Swal.fire("success!", "Your account successfully created!", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("error!", error.message, "error");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await googleLogin();
      Swal.fire("success!", "The account has been created using Google.", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("error!", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center px-4 py-12">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Register Now!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <label className="label">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-green-500"
            required
          />
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-green-500"
            required
          />
          <label className="label">Photo URL</label>
          <input
            type="text"
            name="photoURL"
            value={form.photoURL}
            onChange={handleChange}
            placeholder="Enter photo URL"
            className="w-full px-4 py-2 border rounded-lg focus:outline-green-500"
            required
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-green-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-200"
          >
           Register
          </button>
        </form>

        <div className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 underline">Login here</Link>
        </div>

        <div className="mt-4 text-center text-gray-600">OR</div>

        <button
          onClick={handleGoogleSignUp}
          className="w-full mt-4 border border-gray-300 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-green-700 hover:text-white cursor-pointer"
        >
          <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
          Register with google
        </button>
      </div>
    </div>
  );
};

export default Register;
