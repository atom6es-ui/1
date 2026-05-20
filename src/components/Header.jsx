import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Store } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: "/", label: "首頁" },
    { to: "/shop", label: "商店" },
    { to: "/cart", label: "購物車" },
  ];

  return (
    <header className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold hover:text-indigo-200 transition-colors">
            <Store size={28} className="text-amber-400" />
            <span>購物天地</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-amber-300 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 hover:bg-indigo-600 rounded-full transition-colors"
              aria-label="購物車"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-indigo-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-indigo-600 rounded-full transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="選單"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-indigo-600 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-amber-300 transition-colors font-medium py-1"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
