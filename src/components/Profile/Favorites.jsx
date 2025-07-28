import React, { useEffect } from 'react'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { useDispatch, useSelector } from 'react-redux'
import FavoriteRestaurantCard from '../Restaurant/FavoriteRestaurantCard';
import { getUser } from '../Redux/Authentication/Actions';

const Favorites = () => {
  
  const favorites=useSelector((state)=>state.auth.favorites || [])
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")
  useEffect(()=>{
    dispatch(getUser(jwt))
  },[dispatch,jwt])
  


  return (
    <div>
        <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
        <div className='flex flex-wrap justify-center gap-4'>
            {
                favorites?.map((item)=><FavoriteRestaurantCard res={item} favorites={favorites}/>)
            }

        </div>
    </div>
  )
}

export default Favorites
