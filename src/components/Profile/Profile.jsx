import React, { useState } from 'react'
import ProfileNavigation from './ProfileNavigation'
import { Routes, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import Orders from './Orders';
import Favorites from './Favorites';
import Events from './Events';
import Address from './Address';

const Profile = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="lg:flex justify-between">
      {/* Sidebar (only visible on large screens) */}
      <div className="hidden lg:block sticky h-[80vh] lg:w-[20%]">
        <ProfileNavigation 
          open={openSidebar} 
          handleClose={() => setOpenSidebar(false)} 
        />
      </div>

      {/* Content */}
      <div className="w-full lg:w-[80%] px-4 pt-2 lg:pt-6">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path='/address' element={<Address />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/events' element={<Events />} />
        </Routes>
      </div>
    </div>
  )
}

export default Profile;
