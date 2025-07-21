import { ThemeContext, ThemeProvider } from '@emotion/react';
import {Navbar} from './components/navbar/navbar.jsx';
import { darkTheme } from './theme/DarkTheme.jsx';
import { CssBaseline } from '@mui/material';
import CustomerRoute from './components/Routers/CustomerRoute.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './components/Redux/Authentication/Actions.js';
import { useEffect } from 'react';
import { findCart } from './components/Redux/Cart/Action.js';
import ProfileNavigation from './admin/components/Profile/ProfileNavigation.jsx';
import CreateRestaurantForm from './admin/components/Profile/CreateRestaurant.jsx';
import Profile from './admin/components/Profile/Profile.jsx';
import AdminRoute from './components/Routers/AdminRoute.jsx';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Auth from './components/Auth/Auth.jsx';



function App() {
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")
  
  
  const navigate=useNavigate();
  useEffect(() => {
      const token = localStorage.getItem("jwt");
      if (token) {
        dispatch(getUser(token,navigate));
        dispatch(findCart(token))
        
      }
  }, [dispatch]);
  


  return (
    <>
      <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          <Navbar />
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/account/:register' element={<Home />} />
              {/* <Route path="/*" element={<CustomerRoute />} /> */}
              <Route path="/admin/*" element={<AdminRoute />} />
         </Routes>
         <Auth />
      </ThemeProvider>
      
        
    </>
  )
}

export default App
