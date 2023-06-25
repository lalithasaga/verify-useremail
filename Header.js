import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.jpg';
import './Header.css';
import AuthContext from './AuthContext';


const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="My Web Link Logo" />
        <span className="logo-text">MyWeb Link</span>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
