import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({setIsAuthenticated}) => {

  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the token cookie (replace 'token' with your actual cookie name)
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert('Logged out');
    setIsAuthenticated(false);
    navigate("/login");
  };
  

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="brand" >MyApp</h1>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/sale-orders" className="nav-link">Sale Orders</Link>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
