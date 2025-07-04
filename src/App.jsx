import { ThemeContext, ThemeProvider } from '@emotion/react';
import {Navbar} from './components/navbar/navbar.jsx';
import { darkTheme } from './theme/DarkTheme.jsx';
import { CssBaseline } from '@mui/material';
import CustomerRoute from './components/Routers/CustomerRoute.jsx';



function App() {
  

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
