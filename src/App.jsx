import { ThemeProvider } from '@mui/material/styles';

import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { Navbar } from './components/navbar/navbar.jsx';
import { darkTheme } from './theme/DarkTheme.jsx';
import { getUser } from './components/Redux/Authentication/Actions.js';
import { findCart } from './components/Redux/Cart/Action.js';

import Home from './components/Home/Home.jsx';
import Auth from './components/Auth/Auth.jsx';
import CustomerRoute from './components/Routers/CustomerRoute.jsx';
import AdminRoute from './components/Routers/AdminRoute.jsx';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      dispatch(getUser(token));
      dispatch(findCart(token));
    }
  }, [dispatch, navigate]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/account/:register" element={<Home />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/*" element={<CustomerRoute />} />
      </Routes>
      <Auth />
    </ThemeProvider>
  );
}

export default App;
