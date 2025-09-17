// import { useState } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// const Signin = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Fetch users from db.json
//       const res = await axios.get("http://localhost:3000/users");
//       const user = res.data.find(
//         (u) => u.email === form.email && u.password === form.password
//       );

//       if (!user) {
//         toast.error("Invalid email or password");
//         return;
//       }
//       else{
//         toast.success("Signin successful!");
//       }

//       // Save user info in localStorage
//       localStorage.setItem("user", JSON.stringify(user));

//       // Redirect to original protected page or home
//       const from = location.state?.from?.pathname || "/";
//       navigate(from, { replace: true });
//     } catch (err) {
//       console.error("Signin error:", err);
//       toast.error("Signin failed. Try again.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-20">
//       <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700"
//         >
//           Sign In
//         </button>
//       </form>

//       <p className="text-center text-sm text-gray-600 mt-4">
//         Don't have an account?{" "}
//         <Link to="/signup" className="text-pink-600 hover:underline">
//           Sign Up
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Signin;

import PasswordInput from "../component/passwordtoggle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { signinUser } from "../features/authSlice";

const Signin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signinUser(form)).unwrap(); // throws on reject
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Signin failed:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* 👇 use PasswordInput instead of plain input */}
        <PasswordInput
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700 disabled:bg-pink-300"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <p className="text-center text-sm text-gray-600 mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-pink-600 hover:underline">
          Sign Up
        </Link>
      </p>
      <p className="text-center text-sm text-pink-600 hover:underline mt-2">
        <Link to="/reset-password">Forgot Password?</Link>
      </p>

    </div>
  );
};

export default Signin;
