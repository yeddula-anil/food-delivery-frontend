import React, { useState } from 'react'
import ProfileNavigation from './ProfileNavigation'
import { Route, Routes } from 'react-router-dom';
import { Home } from '@mui/icons-material';
import UserProfile from './UserProfile';
import Orders from './Orders';
import Favorites from './Favorites';
import Events from './Events';
import Address from './Address';

const Profile = () => {
    const [openSidebar,setOpenSidebar]=useState(false);
    const closeSideBar=()=>{
        setOpenSidebar(false);
    }

  return (
    <div className='lg:flex justify-between'>
        <div className='sticky h-[80vh] lg:w-[20%]'>
            <ProfileNavigation open={openSidebar} handleClose={closeSideBar}/>
        </div>
        <div className='lg:w-[80%]'>
            <Routes>
                <Route path="/" element={<UserProfile />}/>
                <Route path="/orders" element={<Orders />} />
                <Route path='/address' element={<Address />}/>
                <Route path='/favorites' element={<Favorites />}/>
                <Route path='/events' element={<Events />}/>
            </Routes>
        </div>
      
    </div>
  )
}

export default Profile
