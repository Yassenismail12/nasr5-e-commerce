import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart, Store, Sun, Moon } from "lucide-react";
import { selectCartCount } from "../store/cartSlice";
import useTheme from "../hooks/usetheme";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const cartCount = useSelector(selectCartCount);
  const { theme, toggleTheme } = useTheme();
  const linkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`;

  return (
    <header className="navbar sticky top-0 z-50 bg-base-100 px-4 shadow-sm sm:px-6">
      <div className="flex-1">
        <Link to="/" className={styles.logo}>
          <Store size={26} />
          <span>ShopE</span>
        </Link>
      </div>
      <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-2">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/products" className={linkClass}>
          Products
        </NavLink>
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <Link to="/cart" className="btn btn-ghost btn-circle" aria-label="Cart">
          <div className="indicator">
            {cartCount > 0 && (
              <span className="indicator-item badge badge-secondary badge-sm">
                {cartCount}
              </span>
            )}
            <ShoppingCart size={22} />
          </div>
        </Link>
      </nav>
    </header>
  );
}
