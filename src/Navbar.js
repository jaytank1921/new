// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: for custom styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/leads">Leads</Link></li>
        <li><Link to="/owners">Owners</Link></li>
        <li><Link to="/agents">Agents</Link></li>
        <li><Link to="/docs">Docs</Link></li>
        <li style={{float:'right'}}> <Link to="/">Logout </Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
