import React from 'react';
import { Link } from 'react-router-dom';
import Footer from 'src/components/Footer';
import { DatePicker, Button } from 'antd';

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
      <Footer name={'kien'} />
      <DatePicker />
      <br />
      <Button type={'primary'}>button antd</Button>
    </div>
  );
};
export default Home;
