
import { useSelector } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import { debounce } from "lodash";

const Layout = () => {
  const cart = useSelector((state) => state.ecommerce.cart);
  const totalItems = cart.length;

  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false); // desktop dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const desktopRef = useRef(null); // desktop dropdown ref
  const mobileRef = useRef(null);  // mobile menu ref

  // get user
  let user = null;
  try {
    const stored = localStorage.getItem("user");
    user = stored ? JSON.parse(stored) : null;
  } catch (e) {
    user = null;
  }

  // debounced search navigation
  const debouncedNavigate = useMemo(
    () =>
      debounce((val) => {
        if (val.trim()) navigate(`/productsearch?query=${encodeURIComponent(val)}`);
      }, 200),
    [navigate]
  );

  const handleChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    debouncedNavigate(val);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/productsearch?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  // close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopRef.current && !desktopRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white px-6 py-4 w-full shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between">
          {/* Logo + Hamburger */}
          <div className="flex justify-between">
            <div className="flex ">
              <button className="md:hidden mr-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              {/* Logo */}

              <div className="">
                <Link to="/" className="text-xl font-extrabold tracking-tight text-pink-600 text-nowrap ">
                  My Store
                </Link>
              </div>
            </div>
            <div className="">
              <Link to="/cart" className="relative flex  md:hidden ml-48 animate-slideInRight">
                <ShoppingCart size={26} className="text-gray-700 hover:text-pink-600 transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">{totalItems}</span>
                )}
              </Link>
            </div>

          </div>

          {/* Desktop search + account + cart */}
          <div className="hidden md:flex items-center gap-6   animate-slideInRight">
            <form onSubmit={handleSearch} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 shadow-inner">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent px-2 py-1 outline-none w-60 text-sm"
                value={searchTerm}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-1 rounded-full text-sm transition-colors"
              >
                Search
              </button>
            </form>

            {/* Account */}
            <div className="relative" ref={desktopRef}>
              {!user ? (
                <Link
                  to="/signin"
                  className="text-md font-semibold text-gray-700 hover:text-pink-600 border-l border-r border-gray-100 hover:border-gray-300 px-3"
                >
                  Sign In
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-pink-600"
                  >
                    👤 {user.name}
                    <svg
                      className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
                      <Link to="/account"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account
                      </Link>
                      <Link to="/orders" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                      <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center justify-center">
              <ShoppingCart size={26} className="text-gray-700 hover:text-pink-600 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">{totalItems}</span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="pt-3 px-15 md:hidden">
          <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-full py-1 shadow-inner">
            <input type="text" placeholder="Search products..." className="bg-transparent px-2 py-1 outline-none w-full text-sm" value={searchTerm} onChange={handleChange} />
            <button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-1 rounded-full text-sm transition-colors">Search</button>
          </form>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        ref={mobileRef}
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col gap-6 mt-20 px-4 pt-10">
          {!user ? (
            <Link to="/signin" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-pink-600">Sign In</Link>
          ) : (
            <>
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-pink-600"
              >
                My Account
              </Link>
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-pink-600"
              >
                My Orders
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-red-600 hover:text-red-500 text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Page content */}
      <main className="flex-grow pt-20 px-4 sm:px-8 lg:px-16 ">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white text-center py-4 shadow-inner mt-8">
        <p className="text-sm text-gray-500">© 2025 My Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
