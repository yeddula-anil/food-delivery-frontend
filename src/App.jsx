import { ThemeContext, ThemeProvider } from '@emotion/react';
import {Navbar} from './components/navbar/navbar.jsx';
import { darkTheme } from './theme/DarkTheme.jsx';
import { CssBaseline } from '@mui/material';
import CustomerRoute from './components/Routers/CustomerRoute.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './components/Redux/Authentication/Actions.js';
import { useEffect } from 'react';



function App() {
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")
  const {auth}=useSelector(store=>store)
  useEffect(()=>{
      dispatch(getUser(auth.jwt || jwt))
  },[auth.jwt])

  return (
    <>
      <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          <CustomerRoute />
      </ThemeProvider>
        
    </>
  )
}

export default App
