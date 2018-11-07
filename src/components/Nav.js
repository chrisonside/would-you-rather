import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className='nav'>
    <Link to="/" className="nav__link">Polls</Link>
    <Link to="/leaderboard" className="nav__link">Leaderboard</Link>
    <Link to="/add" className="nav__link">Add Poll</Link>
  </div>
);

export default Nav;