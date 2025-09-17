
// src/pages/Signup.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../features/authSlice";
import PasswordInput from "../component/passwordtoggle"; // 👈 toggle input

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [localError, setLocalError] = useState(null); // 👈 for password mismatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (form.password !== form.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    try {
      await dispatch(
        signupUser({ name: form.name, email: form.email, password: form.password })
      ).unwrap();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Password input with toggle */}
        <PasswordInput
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Confirm password input with toggle */}
        <PasswordInput
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700 disabled:bg-pink-300"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {/* local error if passwords mismatch */}
      {localError && (
        <p className="text-red-500 text-center mt-2">{localError}</p>
      )}

      {/* API error if signup failed */}
      {error && (
        <p className="text-red-500 text-center mt-2">{error}</p>
      )}

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/signin" className="text-pink-600 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Signup;
