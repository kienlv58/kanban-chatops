import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      this is Home page
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
