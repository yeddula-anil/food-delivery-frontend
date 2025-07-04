import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';

const UserProfile = () => {
    const handleLogout=()=>{

    }
  return (
    <div className='min-h-[80vh] flex-col justify-center items-center text-center'>
        <div className='flex flex-col items-center justify-center gap-0 mt-12'>
                <AccountCircleIcon sx={{fontSize:'9rem'}}/>
                <h1 className='py-5 text-2xl font-semibold'>Vikas</h1>
                <p>vikasyeddula@gmail.com</p>
                <Button variant='contained' onClick={handleLogout} sx={{margin:'1rem 0rem'}}>Logout</Button>
        </div>
        
    </div>
  )
}

export default UserProfile
