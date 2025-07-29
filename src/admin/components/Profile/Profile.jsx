import React from 'react';
import ProfileNavigation from './ProfileNavigation';
import { Route, Routes } from 'react-router-dom';
import Orders from './Orders';
import Menu from './Menu';
import CreateRestaurantForm from './CreateRestaurant';
import AddMenu from './AddMenu';
import CreateCategory from './CreateCategory';
import Dashboard from './Dashboard';
import { Box } from '@mui/material';
// import ProfileNavigation from './ProfileNavigation';
import UserProfile from '../../../components/Profile/UserProfile';

const Profile = () => {
  return (
    <Box display="flex" sx={{ height: '100vh' }}>
      {/* Sidebar (20%) */}
      <Box
        sx={{
          width: '20%',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          zIndex: 10,
          bgcolor: 'background.paper',
        }}
      >
        <ProfileNavigation />
      </Box>

      {/* Main content (80%) */}
      <Box sx={{ width: '80%', padding: 2 }}>
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="menu" element={<Menu />} />
          <Route path="restaurant" element={<CreateRestaurantForm />} />
          <Route path="add-menu" element={<AddMenu />} />
          <Route path="category" element={<CreateCategory />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Profile;
