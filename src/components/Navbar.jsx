// client/src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // if you used a different path, adjust it

export default function Navbar() {
  // useAuth comes from the AuthContext used in the project created earlier.
  // If your project doesn't have AuthContext, remove useAuth and read username from localStorage:
  // const user = JSON.parse(localStorage.getItem('user') || 'null');
  const { user, logout } = useAuth() || {}; // fallback if context missing
  const navigate = useNavigate();

  const handleLogout = () => {
    // Use the context logout if available, else clear localstorage
    if (typeof logout === "function") logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="container nav-inner">
        <div className="brand">
          <Link to="/" className="logo">Blog-MernStack-App</Link>
        </div>

        <div className="nav-actions" role="menubar" aria-label="Primary">
          <Link to="/" className="navlink">Home</Link>
          <Link to="/create" className="navlink">Add Post</Link>

          {user ? (
            <div className="user-area" role="group" aria-label="User menu">
              <span className="user-greeting">Hi, <strong className="username">{user.username}</strong></span>
              <button
                className="logout-btn"
                onClick={handleLogout}
                aria-label="Log out"
                type="button"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="navlink">Login</Link>
              <Link to="/register" className="navlink">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
