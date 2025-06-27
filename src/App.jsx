import { ThemeContext, ThemeProvider } from '@emotion/react';
import {Navbar} from './components/navbar/navbar.jsx';
import { darkTheme } from './theme/DarkTheme.jsx';
import { CssBaseline } from '@mui/material';
import { Home } from './components/Home/Home.jsx';
import RestaurantDetails from './components/Restaurant/RestaurantDetails.jsx';


function App() {
  

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        {/* <Navbar></Navbar>
        <Home /> */}
        <RestaurantDetails />
       
      </ThemeProvider>
        
    </>
  )
}

export default App
