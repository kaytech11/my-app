
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addToCart } from "../features/ecommerceSlice";
import { useEffect, useState } from "react";
import { resetJustSignedIn } from "../features/authSlice"; // 👈 reset flag after welcome

// const fetchProducts = async () => {
//   const res = await axios.get("http://localhost:3000/products");
//   return res.data;
// };

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const fetchProducts = async () => {
  const res = await axios.get(`${API_URL}/products`);
  return res.data;
};

const Home = () => {
  const dispatch = useDispatch();
  const { user, justSignedIn } = useSelector((state) => state.auth);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // loader + animation states
  const [showLoader, setShowLoader] = useState(true);
  const [showHeading, setShowHeading] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);

      // if signed in on mobile, show welcome popup first
      if (user && justSignedIn && window.innerWidth < 768) {
        setShowWelcome(true);

        setTimeout(() => {
          setShowWelcome(false);
          setShowHeading(true);
          setShowProducts(true);
          dispatch(resetJustSignedIn());
        }, 2000);
      } else {
        // directly show products
        setShowHeading(true);
        setShowProducts(true);
      }
    }, 1500); // loader duration

    return () => clearTimeout(timer);
  }, [user, justSignedIn, dispatch]);

  // Loader screen
  if (isLoading || showLoader) {
    return (
      <div className="fixed inset-0 flex items-center justify-center h-screen z-50">
        {/* Gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-white to-pink-200 animate-pulse"></div>

        {/* 3 bouncing pink dots */}
        <div className="flex space-x-3">
          <div className="w-5 h-5 bg-pink-500 rounded-full animate-bounce"></div>
          <div className="w-5 h-5 bg-pink-500 rounded-full animate-bounce [animation-delay:200ms]"></div>
          <div className="w-5 h-5 bg-pink-500 rounded-full animate-bounce [animation-delay:400ms]"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="relative bg-gray-50 min-h-screen px-6 py-10 transition-colors duration-700">
      {/* Mobile-only welcome popup */}
      {showWelcome && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div
            className="bg-pink-500 text-white text-lg font-bold px-6 py-4 rounded-xl shadow-lg 
              transition-all duration-700 transform animate-slide-in"
          >
            Welcome, {user?.name || "Guest"}!{" "}
          </div>
        </div>
      )}

      {/* Heading */}
      <h2
        className={`text-4xl font-extrabold text-gray-800 mb-8 text-center transition-all duration-700 ease-out transform ${
          showHeading ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        Products
      </h2>

      {/* Product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={product.id}
            style={{
              transitionDelay: `${index * 200}ms`, // stagger each card
            }}
            className={`bg-white rounded-xl shadow-lg hover:shadow-2xl 
              transition-all duration-700 ease-out transform
              ${showProducts
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
              }`}
          >
            <Link to={`/product/${product.id}`}>
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-pink-600 font-bold mt-1">
                  ₦{product.price}
                </p>
              </div>
            </Link>
            <div className="px-5 pb-5">
              <button
                onClick={() => {
                  dispatch(addToCart(product));
                  toast.success(`${product.name} added to cart!`);
                }}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg 
                transition-colors duration-300 font-medium cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
