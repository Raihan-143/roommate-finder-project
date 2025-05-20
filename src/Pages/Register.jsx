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
  const [isDrawerOpen, setDrawerOpen] = useState(false);
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
      Swal.fire("ত্রুটি!", "পাসওয়ার্ডে অন্তত ১টি বড় হাতের, ১টি ছোট হাতের অক্ষর এবং ন্যূনতম ৬ অক্ষর থাকতে হবে।", "error");
      return;
    }

    try {
      await register(form.email, form.password, form.name, form.photoURL);
      Swal.fire("সফল!", "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("ত্রুটি!", error.message, "error");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await googleLogin();
      Swal.fire("সফল!", "Google দিয়ে অ্যাকাউন্ট তৈরি হয়েছে", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("ত্রুটি!", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 relative">
      {/* Drawer Toggle Button */}
      <button
        onClick={() => setDrawerOpen(!isDrawerOpen)}
        className="absolute top-4 left-4 z-50 p-2 bg-white shadow-md rounded-lg md:hidden"
      >
        ☰
      </button>

      {/* Drawer Menu */}
      {isDrawerOpen && (
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-4 z-40">
          <h2 className="text-xl font-bold mb-4">মেনু</h2>
          <ul className="space-y-2">
            <li><a href="/" className="block hover:text-blue-600">হোম</a></li>
            <li><a href="/register" className="block hover:text-blue-600">রেজিস্টার</a></li>
            <li><a href="/about" className="block hover:text-blue-600">আমাদের সম্পর্কে</a></li>
          </ul>
        </div>
      )}

      {/* Register Form */}
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 relative">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">রেজিস্টার করুন</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
             <label className="label">নাম</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="আপনার নাম"
              className="w-full px-4 py-2 border rounded-lg focus:outline-green-500"
              required
            />
             <label className="label">ইমেইল</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="আপনার ইমেইল"
              className="w-full px-4 py-2 border rounded-lg focus:outline-green-500"
              required
            />
             <label className="label">ফটো URL</label>
            <input
              type="text"
              name="photoURL"
              value={form.photoURL}
              onChange={handleChange}
              placeholder="ফটো URL দিন"
              className="w-full px-4 py-2 border rounded-lg focus:outline-green-500"
              required
            />
             <label className="label">পাসওয়ার্ড</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="পাসওয়ার্ড"
              className="w-full px-4 py-2 border rounded-lg focus:outline-green-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-200"
            >
              রেজিস্টার করুন
            </button>
          </form>

          <div className="mt-4 text-center text-gray-600">
            ইতিমধ্যে একাউন্ট আছে? <Link to="/login" className="text-green-600 underline">লগইন করুন</Link>
          </div>

          <div className="mt-4 text-center text-gray-600">অথবা</div>

          <button
            onClick={handleGoogleSignUp}
            className="w-full mt-4 border border-gray-300 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-green-700 hover:text-white cursor-pointer"
          >
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Google দিয়ে রেজিস্টার করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
