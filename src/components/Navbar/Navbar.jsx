import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showMenu, setShowMenu] = useState(false); // State to toggle mobile menu visibility
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // State to toggle profile dropdown visibility
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  };

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState); // Toggle the visibility of the menu
    if (showProfileDropdown) setShowProfileDropdown(false); // Close profile dropdown if it's open
  };

  const closeMenu = () => {
    setShowMenu(false); // Close the mobile menu
    setShowProfileDropdown(false); // Close the profile dropdown when closing the menu
  };

  const scrollToSection = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/"); 
      setTimeout(() => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100); 
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prevState) => !prevState); // Toggle the profile dropdown visibility
  };

  const handleProfileItemClick = () => {
    setShowProfileDropdown(false);
    closeMenu();
  };

  const handleSignInClick = () => {
    setShowLogin(true);  // Trigger the login modal or component
    closeMenu();
  };

  return (
    <div className="navbar">
      <Link to="/" onClick={scrollToTop}>
        <img className="logo" src={assets.logo} alt="Quickserve" />
      </Link>
      <h4>Quickserve</h4>

      {/* Hamburger Icon for mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navbar Menu */}
      <ul className={`navbar-menu ${showMenu ? 'show' : ''}`}>
        <li>
          <Link
            to="/"
            onClick={() => {
              setMenu("home");
              scrollToTop();
              closeMenu();
            }}
            className={`${menu === "home" ? "active" : ""}`}
          >
            home
          </Link>
        </li>
        <li
          onClick={() => {
            setMenu("menu");
            scrollToSection("#explore-menu");
          }}
          className={`${menu === "menu" ? "active" : ""}`}
        >
          menu
        </li>
        <li
          onClick={() => {
            setMenu("mob-app");
            scrollToSection("#app-download");
          }}
          className={`${menu === "mob-app" ? "active" : ""}`}
        >
          mobile app
        </li>
        <li
          onClick={() => {
            setMenu("contact");
            scrollToSection("#footer");
          }}
          className={`${menu === "contact" ? "active" : ""}`}
        >
          contact us
        </li>

        {/* Profile and Cart in Hamburger for Mobile */}
        <li className="navbar-mobile-item">
          <Link
            to="/cart"
            className="navbar-search-icon"
            onClick={() => {
              scrollToTop(); // Scroll to top when navigating
              closeMenu();   // Close menu after navigation
            }}
          >
            Cart
            {getTotalCartAmount() > 0 && <div className="dot"></div>}
          </Link>
        </li>

        {/* Display Sign In or Profile */}
        {!token ? (
          <li className="navbar-mobile-item">
            <button className="signin" onClick={handleSignInClick}>Sign in</button>
          </li>
        ) : (
          <li className="navbar-mobile-item navbar-profile">
            <span onClick={toggleProfileDropdown}>Profile</span>
            {showProfileDropdown && (
              <ul className="navbar-profile-dropdown">
                <li onClick={() => { navigate('/myorders'); handleProfileItemClick(); }}>
                  Orders
                </li>
                <hr />
                <li onClick={() => { logout(); handleProfileItemClick(); }}>
                  Logout
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
