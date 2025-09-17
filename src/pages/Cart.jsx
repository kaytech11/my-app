


import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, addToCart, deleteFromCart } from "../features/ecommerceSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.ecommerce.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Decrease quantity
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  // Remove entire item
  const handleDeleteItem = (id) => {
    dispatch(deleteFromCart(id));
    toast.success("Item removed from cart!");
  };

  // Clear all products
  const handleClearCart = () => {
    if (cart.length === 0) {
      toast.error("Cart is already empty!");
      return;
    }
    dispatch(clearCart());
    toast.success("All items removed from cart!");
    navigate("/");
  };

  // Increase quantity
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // If empty cart
  if (cart.length === 0) {
    return (
      <div className="p-8 bg-purple-50 rounded-2xl text-white min-h-screen flex flex-col items-center justify-center">
        <button
          onClick={() => navigate("/")}
          className="mb-6 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
        >
          Back to Home
        </button>
        <h2 className="text-3xl font-bold mb-3 text-gray-800">Your Cart is Empty</h2>
        <p className="text-gray-400">Add some products to your cart!</p>
      </div>
    );
  }

  // Totals
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="p-8 pt-20 bg-slate-100 rounded-2xl text-white min-h-screen">
      <button
        onClick={() => navigate("/")}
        className="mb-6 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
      >
        Back to Home
      </button>

      <h2 className="text-3xl font-bold mb-6 text-black"> Your Cart</h2>

      {cart.length > 0 && (
        <button
          onClick={handleClearCart}
          className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 mb-6 rounded-lg shadow-md transition-all duration-300"
        >
          Clear All
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div
            className="group space-y-4 max-h-[500px] overflow-y-auto pr-2
               scrollbar scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-100 scrollbar-thumb-rounded-full 
               rounded-xl bg-white shadow-inner
               scrollbar-thumb-transparent hover:scrollbar-thumb-pink-500"
          >
            {cart.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 p-4 rounded-lg bg-white text-black
                   shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  {/* Product Info */}
                  <Link to={`/product/${item.id}`} className="flex-1 min-w-0">
                    <h4 className="font-semibold text-lg truncate">{item.name}</h4>
                    <p className="text-black mt-1">
                      ₦{item.price} × {item.quantity || 1}
                    </p>
                  </Link>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      className="bg-white hover:bg-slate-100 text-black cursor-pointer px-3 py-1 
                         rounded-lg transition-all duration-300 shadow-sm"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-white hover:bg-slate-100 cursor-pointer text-black px-3 py-1 
                         rounded-lg transition-all duration-300 shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <div className="mt-3">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-pink-500 hover:text-pink-600 text-sm font-medium cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>




        {/* Cart Summary */}
        <div className="bg-white p-6 rounded-lg shadow-xl sticky top-24 h-fit">
          <h3 className="text-xl font-bold text-black mb-4 border-b border-gray-600 pb-2">
            Order Summary
          </h3>
          <p className="mb-2 text-black">
            Total Items: <span className="font-semibold">{totalItems}</span>
          </p>
          <p className="mb-4 text-black">
            Total Price:{" "}
            <span className="font-semibold">₦{totalPrice.toFixed(2)}</span>
          </p>
          <Link
            to="/checkout"
            className="bg-purple-600 hover:bg-purple-700 w-full py-3 rounded-lg block text-center font-semibold shadow-md transition-all duration-300"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div >
  );
};

export default Cart;



