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
  { title: "Dashboard", icon: <DashboardIcon />, path: "" },
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
      navigate(`/admin/${item.path}`);
    }
  };

  return (
    <div>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={handleClose}
        open={isSmallScreen ? open : true}
        anchor="left"
        sx={{ zIndex: -1, position: 'sticky' }}
      >
        <div className='w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl gap-6 pt-16'>
          {menu.map((item, i) => (
            <React.Fragment key={item.title}>
              <div onClick={() => handleNavigate(item)} className='px-5 flex items-center space-x-5 cursor-pointer'>
                {item.icon}
                <span>{item.title}</span>
              </div>
              {i !== menu.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default ProfileNavigation;
