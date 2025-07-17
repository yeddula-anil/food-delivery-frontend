import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/Authentication/Actions';

const UserProfile = () => {
    const user=useSelector((state)=>state.auth.user)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleLogout=()=>{
         dispatch(logoutUser())
         navigate("/account/login");
    }
  return (
    <div className='min-h-[80vh] flex-col justify-center items-center text-center'>
        <div className='flex flex-col items-center justify-center gap-0 mt-12'>
                <AccountCircleIcon sx={{fontSize:'9rem'}}/>
                {user &&<>
                <h1 className='py-5 text-2xl font-semibold'>{user.fullname}</h1>
                <p>{user.email}</p>
                </>}
                <Button variant='contained' onClick={() => handleLogout()} sx={{margin:'1rem 0rem'}}>Logout</Button>
        </div>
        
    </div>
  )
}

export default UserProfile
