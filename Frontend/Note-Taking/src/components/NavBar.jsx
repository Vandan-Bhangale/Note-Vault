import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const NavBar = ({ searchTerm, setSearchTerm }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check cookie on component mount
  useEffect(() => {
    const loginCookie = Cookies.get('isLoggedIn');
    setIsLoggedIn(loginCookie === 'true');
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
      Cookies.remove('isLoggedIn');
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
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
            style={{ maxWidth: "300px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Toggle Button for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
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
