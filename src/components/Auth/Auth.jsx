import { Box, Modal } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { style } from '../cart/Cart';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const Auth = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const isModelOpen=location.pathname==="/account/register" || location.pathname==="/account/login"
    const handleClose=()=>{
        navigate("/")
    }
        
  return (
    <>
        <Modal open={isModelOpen} onClose={handleClose}>
            <Box sx={style}>
                {location.pathname==="/account/login"?<LoginForm />:<SignUpForm />}
            </Box>

        </Modal>
    </>
  )
}

export default Auth
