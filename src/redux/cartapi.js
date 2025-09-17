
import axios from "axios";

export const fetchCart = async () => {
  const response = await axios.get("http://localhost:3000/cart");
  return response.data;
};
exportaddToCart = async (product) => {
  const response = await axios.post("http://localhost:3000/cart", product);
  return response.data;
};

// remove a single item
export const removeFromCartApi = async (id) => {
  await axios.delete(`http://localhost:3000/cart/${id}`);
  return id;
};

// clear all items in cart
export const clearCartApi = async () => {
  const response = await axios.get("http://localhost:3000/cart");
  const cartItems = response.data;

  // delete each item one by one
  await Promise.all(
    cartItems.map((item) =>
      axios.delete(`http://localhost:3000/cart/${item.id}`)
    )
  );


  return [];
};

// add new item
export const addToCartApi = async (product) => {
  const response = await axios.post("http://localhost:3000/cart", product);
  return response.data;
};

