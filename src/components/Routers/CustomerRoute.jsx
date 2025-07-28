import React from 'react';
import { Navbar } from '../navbar/navbar';
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from '../Home/Home';
import RestaurantDetails from '../Restaurant/RestaurantDetails';
import Cart from '../cart/Cart';
import Profile from '../Profile/Profile';

const CustomerRoute = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:title/:id" element={<RestaurantDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-profile/*" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* fallback */}
      </Routes>
    </div>
  );
};

export default CustomerRoute;
