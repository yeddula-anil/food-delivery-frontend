import { Card, Chip, Icon, IconButton, ListItem } from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isPresentInFavorites } from '../config/logic';
import { addToFavorite } from '../Redux/Authentication/Actions';
const FavoriteRestaurantCard=({res})=>{
    if(!res)
        return null
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt")

    
    const handleAddToFavorite=()=>{
        dispatch(addToFavorite(jwt,res.restaurantId))
    }
    const handleNavigateToRestaurant=()=>{
        // if(res.open){
            navigate(`restaurant/${res.name}/${res.restaurantId}`)
        // }
    }
    return(
        <Card className='w-[18rem] justify-between'>
            <div className={`${true? 'cursor-pointer':'cusor-not-allowed'} relative`}>
                <Chip size='small' 
                    className='absolute top2-left-2' 
                    color={res.open?"success":"error"} 
                    label={res.open?"open":"closed"}
                />
                <img
                        className='w-full h-[10rem] rounded-t-md object-cover'
                        src={res.images?.[2] || "https://via.placeholder.com/300x150?text=No+Image"}
                        alt={res.name}
                />
                
            </div>
            <div className="p-4 textPart lg:flex w-full justify-between">
                <div className='space-y-1'>
                    <p  onClick={handleNavigateToRestaurant} className='font-semibold text-lg cursor-pointer'>{res.name}</p>
                    <p className='text-gray-500 text-sm'>{res.description}</p>
                </div>
                
            </div>
            <div>
                <IconButton onClick={handleAddToFavorite}>
                    {isPresentInFavorites(favorites,res.restaurantId)?<FavoriteIcon />:<FavoriteBorderIcon />}
                </IconButton>
            </div>
           

        </Card>
        
    )
}
export default FavoriteRestaurantCard;