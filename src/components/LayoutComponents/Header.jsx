import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <ul className='flex justify-start gap-32 p-4 shadow-md'>
        <li className='border-r border-gray-50'>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
