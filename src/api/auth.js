
import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/users`;


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
