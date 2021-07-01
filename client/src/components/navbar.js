import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div><Link to="/">Home</Link></div>
      <div><Link to="/exercises">Exercises</Link></div>
      <div><Link to="/programs">Programs</Link></div>
      <div><Link to="/start">Start!</Link></div>
    </div>
  )
}

export default Navbar;
