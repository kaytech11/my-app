

// import axios from "axios";

// // Sign up a new user
// export const signup = async (user) => {
//   try {
//     const res = await axios.post("http://localhost:3000/users", user);
//     return res.data;
//   } catch (err) {
//     console.error("Signup error:", err);
//     throw err;
//   }
// };

// // Sign in user
// export const signin = async (email, password) => {
//   try {
//     const res = await axios.get(
//       `http://localhost:3000/users?email=${email}&password=${password}`
//     );
//     return res.data[0]; // return the first matching user
//   } catch (err) {
//     console.error("Signin error:", err);
//     throw err;
//   }
// };


// src/api/auth.js
import axios from "axios";

const API = "http://localhost:3000/users";

// Sign up a new user
export const signup = async (user) => {
  const res = await axios.post(API, user);
  return res.data;
};

// Sign in user (returns single user or null)
export const signin = async (email, password) => {
  const res = await axios.get(
    `${API}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  );
  return res.data && res.data.length ? res.data[0] : null;
};

// ✅ Reset password (json-server style)
export const resetPassword = async (email, newPassword) => {
  //  find user
  const res = await axios.get(`${API}?email=${encodeURIComponent(email)}`);
  const user = res.data[0];
  if (!user) throw new Error("User not found");

  // update user password
  const updatedUser = { ...user, password: newPassword };
  const updateRes = await axios.put(`${API}/${user.id}`, updatedUser);

  return updateRes.data;
};
