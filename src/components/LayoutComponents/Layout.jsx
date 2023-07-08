import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <main className='w-full h-screen px-20'>
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;
