import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/ecommerceSlice";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

// const fetchProduct = async (id) => {
//   const res = await axios.get(`http://localhost:3000/products/${id}`); // Fetch product by ID
//   return res.data;   // Return the product data
// };

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// const fetchProducts = async () => {
//   const res = await axios.get(`${API_URL}/products`);
//   return res.data;
// };

const fetchProduct = async (id) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data;
};

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const dispatch = useDispatch(); // Initialize the Redux dispatch function
  // State to track if the product is already added to the cart 
  const [isAdded, setIsAdded] = useState(false); // Initialize state to track if product is added

  const {
    data: product,isLoading,isError,error,
 
  } = useQuery({ // Fetch product details       queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    // refetchOnWindowFocus: false, 
  });

  if (isLoading)
    return (
      <p className="p-4 text-center text-gray-500 text-lg">Loading...</p>
    );

  if (isError)
    return (
      <p className="p-4 text-center text-red-500 text-lg">
        Error: {error.message}
      </p>
    );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setIsAdded(true);
    toast.success(`${product.name} added to cart!`, { position: "top-right" });
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full grid md:grid-cols-2 gap-8 p-6">
        {/* Product Image */}
        <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {product.description}
            </p>
            <p className="text-2xl font-bold text-pink-600 mb-6">
              ₦{product.price}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`px-6 py-3 rounded-lg text-lg font-medium transition duration-300 cursor-pointer
                ${
                  isAdded
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
            >
              {isAdded ? "Added!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;


