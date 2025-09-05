import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const NavBar = ({ searchTerm, setSearchTerm, isLoggedIn, setIsLoggedIn }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the navbar
  const toggleNavbar = () => setIsOpen(!isOpen);

  // Logout function
  const handleLogout = async () => {
    try {
      console.log(`${import.meta.env.VITE_GENERAL_API}/api/logout`);
      await axios.post(
        `${import.meta.env.VITE_GENERAL_API}/api/logout`,
        {},
        { withCredentials: true }
      );
      Cookies.remove("isLoggedIn");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
     <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <div className="container-fluid">
          {/* App Name */}
          <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
            📝 NoteVault
          </Link>

          {/* Search Box */}
          <input
            className="form-control ms-auto"
            type="search"
            placeholder="Search notes..."
            style={{ maxWidth: '300px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Set the search term
          />

          {/* Toggle Button for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar} // Toggle navbar on click
            aria-controls="navbarNav"
            aria-expanded={isOpen ? 'true' : 'false'} // Control aria-expanded based on state
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div
            className={`collapse navbar-collapse justify-content-end ${isOpen ? 'show' : ''}`}
            id="navbarNav"
          >
            <ul className="navbar-nav align-items-center gap-3">
              {isLoggedIn ? (
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger px-4 py-1 rounded-pill fw-semibold"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-dark fw-semibold" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="btn btn-outline-primary px-4 py-1 rounded-pill fw-semibold"
                      to="/Register"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
