import React from 'react'
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from '../Redux/Authentication/Actions';

const menu = [
  { title: "Orders", icon: <ShoppingBagIcon /> },
  { title: "Favorites", icon: <FavoriteIcon /> },
  // { title: "Address", icon: <HomeIcon /> },
  { title: "Payments", icon: <AccountBalanceWalletIcon /> },
  { title: "Notification", icon: <NotificationsActiveIcon /> },
  // { title: "Events", icon: <EventIcon /> },
  { title: "Logout", icon: <LogoutIcon /> },
];

const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === 'Logout') {
      dispatch(logoutUser());
      navigate("/account/login");
    } else {
      navigate(`/my-profile/${item.title.toLowerCase()}`);
    }
    if (isSmallScreen) handleClose(); // auto-close drawer on mobile
  };

  return (
 <Drawer
      
      variant={isSmallScreen ? "temporary" : "permanent"} 
      onClose={handleClose}
      open={isSmallScreen ? open : true}
      anchor="left"
      sx={{
        '& .MuiDrawer-paper': {
          top: '64px',
          height: 'calc(100% - 64px)',
          width: isSmallScreen ? '45vw' : '20vw',  // 👈 smaller for mobile
          maxWidth: isSmallScreen ? 200 : 300,     // cap the size
          backgroundColor: 'transparent',              // dark background
          color: 'white',
          padding: '1rem',
          boxShadow: 'none !important',          // 🔑 remove white box shadow
          backdropFilter: 'none !important'
        },
        
      }}
    >
      <div className="h-full flex flex-col gap-4">
        {menu.map((item, i) => (
          <div
            key={i}
            onClick={() => handleNavigate(item)}
            className="flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-700"
            style={{
              backgroundColor: '#374151', // gray-700 for card effect
            }}
          >
            {item.icon}
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </Drawer>


  );
};

export default ProfileNavigation;
