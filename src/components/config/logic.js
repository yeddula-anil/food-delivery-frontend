import { Restaurant } from "@mui/icons-material";

export const isPresentInFavorites=(favorites,restaurant)=>{
    for(let item of favorites){
       
        if(restaurant.id===item.RestaurantId){
           
            return true;
        }
     
    }
    return false;
}