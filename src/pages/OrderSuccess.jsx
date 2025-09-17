import { Link } from "react-router-dom";

const OrderSuccess = () => {
    return (
        <div className="p-8 pt-40 bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white min-h-screen flex flex-col items-center justify-center">
            {/* Success Icon */}
            <div className="bg-white text-black w-20 h-20 flex items-center justify-center rounded-full shadow-lg mb-6 animate-bounce">
                <span className="text-4xl">✔</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-extrabold mb-4 text-center drop-shadow-lg">
                🎉 Order Placed Successfully!
            </h2>

            {/* Message */}
            <p className="text-gray-300 mb-8 text-center max-w-md leading-relaxed">
                Thank you for shopping with us. Your order is being processed, and we’ll notify you once it’s on its way.
            </p>

            {/* Button */}
            <Link
                to="/"
                className="bg-purple-600 hover:bg-purple-700 py-3 px-6 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition duration-300"
            >
                Continue Shopping
            </Link>
        </div>
    );
};

export default OrderSuccess;

