import { ThemeContext, ThemeProvider } from '@emotion/react';
import {Navbar} from './components/navbar/navbar.jsx';
import { darkTheme } from './theme/DarkTheme.jsx';
import { CssBaseline } from '@mui/material';
import { Home } from './components/Home/Home.jsx';

function App() {
  

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <Navbar></Navbar>
        <Home />
       
      </ThemeProvider>
        
    </>
  )
}

export default App
