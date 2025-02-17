import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-[100%] z-50">
      <div className="container w-[90%] m-auto  px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          ShopZone
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center gap-2 text-gray-800 hover:text-indigo-600 transition">
            <FaHome className="text-xl" /> Home
          </Link>
          <Link to="/cart" className="relative flex items-center gap-2 text-gray-800 hover:text-indigo-600 transition">
            <FaShoppingCart className="text-xl" />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-800">
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            to="/"
            className="block py-3 px-4 text-gray-800 hover:bg-indigo-100 transition"
            onClick={() => setIsOpen(false)}
          >
            <FaHome className="inline mr-2" /> Home
          </Link>
          <Link
            to="/cart"
            className="block py-3 px-4 text-gray-800 hover:bg-indigo-100 transition"
            onClick={() => setIsOpen(false)}
          >
            <FaShoppingCart className="inline mr-2" /> Cart
            {cartCount > 0 && (
              <span className="ml-2 bg-red-600 text-white text-xs w-5 h-5 inline-flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
