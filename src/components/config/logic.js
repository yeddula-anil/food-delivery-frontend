import { Restaurant } from "@mui/icons-material";

export const isPresentInFavorites=(favorites,restaurantId)=>{
    for(let item of favorites){
       
        if(item.restaurantId===restaurantId){
           
            return true;
        }
     
    }
    return false;
}