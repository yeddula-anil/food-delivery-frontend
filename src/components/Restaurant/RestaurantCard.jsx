import { Card, Chip, Icon, IconButton } from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const RestaurantCard=()=>{
    return(
        <Card className='w-[18rem]'>
            <div className={`${true? 'cursor-pointer':'cusor-not-allowed'} relative`}>
                <Chip size='small' 
                    className='absolute top2-left-2' 
                    color={true?"success":"error"} 
                    label={true?"open":"closed"}
                />
                <img className='w-full h-[10rem] rounded-t-md object-cover' src="https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg" alt="" />
                
            </div>
            <div className="p-4 textPart lg:flex w-full justify-between">
                <div className='space-y-1'>
                    <p className='font-semibold text-lg'>Indian FastFood</p>
                    <p className='text-gray-500 text-sm'>craving it all? Dive into our global fla....</p>
                </div>
            </div>
            <div>
                <IconButton>
                    {true?<FavoriteIcon/>:<FavoriteBorderIcon />}
                </IconButton>
            </div>

        </Card>
        
    )
}
export default RestaurantCard;