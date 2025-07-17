import React from 'react'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { useSelector } from 'react-redux'
import FavoriteRestaurantCard from '../Restaurant/FavoriteRestaurantCard';

const Favorites = () => {
  const favorites = useSelector((state) => state.auth.user?.favorites || []);
  const user=useSelector((state)=>state.auth.user)
  


  return (
    <div>
        <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
        <div className='flex flex-wrap justify-center gap-4'>
            {
                favorites.map((item)=><FavoriteRestaurantCard res={item}/>)
            }

        </div>
    </div>
  )
}

export default Favorites
