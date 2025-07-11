import { Avatar, Badge, IconButton } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './navbar.css'
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const Navbar=()=>{
    const navigate=useNavigate();
    const {auth}=useSelector(store=>store)
    const handleAvatarClick=()=>{
        if(auth.user?.role==='ROLE_CUSTOMER'){
            navigate('/my-profile')
        }
    }
    return(
        <div className='px-5 sticky  top-0 z-[50] py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between'>
            <div className='flex items-center space-x-4'>
                <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                    <li onClick={()=>navigate("/")} className='logo font-semibold text-gray-300 text-2xl'>Vikas Foods</li>
                </div>

            </div>
            <div className='flex items-center space-x-2 lg:space-x-10'>
                <div className=''>
                    <IconButton>
                        <SearchIcon sx={{fontsSize:"1.5rem"}}/>
                    </IconButton>
                </div>
                <div className=''>
                    {auth.user && auth.user.fullname ?(
                        <Avatar onClick={handleAvatarClick} sx={{ bgcolor: "white", color: "pink.A400" }}>
                            {auth.user.fullname.charAt(0).toUpperCase()}
                        </Avatar>
                        ) : (
                        <IconButton onClick={() => navigate("/account/login")}>
                            <PersonIcon />
                        </IconButton>
                    )}
                </div>
                <div className=''>
                    <IconButton>
                       <Badge color='primary' badgeContent={3}>
                             <ShoppingCartIcon sx={{fontsSize:"1.5rem"}}/>
                        </Badge>
                        
                    </IconButton>
                </div>
            </div>
        </div>
    )

}