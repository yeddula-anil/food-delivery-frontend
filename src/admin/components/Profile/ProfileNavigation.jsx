import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../components/Redux/Authentication/Actions';

const menu = [
  { title: "Dashboard", icon: <DashboardIcon />, path: "dashboard" },
  { title: "Orders", icon: <ShoppingBagIcon />, path: "orders" },
  { title: "Menu", icon: <MenuIcon />, path: "menu" },
  { title: "Restaurant", icon: <AddBoxIcon />, path: "restaurant" },
  { title: "Add Menu", icon: <AddBoxIcon />, path: "add-menu" },
  { title: "Category", icon: <AddIcon />, path: "category" },
  { title: "Logout", icon: <LogoutIcon />, path: "logout" }
];

const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.path === 'logout') {
      dispatch(logoutUser());
      navigate('/');
    } else {
      navigate(`/admin/my-profile/${item.path}`);
    }
     if(isSmallScreen){
        handleClose
     }
  };
 

  return (
    <div>
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
      
    </div>
  );
};

export default ProfileNavigation;
