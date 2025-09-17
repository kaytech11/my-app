import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline"; // Tailwind Heroicons

const Navbar = () => {
    const cartCount = useSelector((state) => state.ecommerce.cart.length);

    return (
        <nav className="flex justify-between items-center p-4 bg-black text-white">
            <Link to="/" className="text-lg font-bold">My Store</Link>

            <Link to="/cart" className="relative">
                <ShoppingCartIcon className="w-8 h-8" />
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cartCount}
                    </span>
                )}
            </Link>
        </nav>
    );
};

export default Navbar;
