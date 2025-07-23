import React, { useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form } from "formik";
import { CircularProgress } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getMenuItemByRestaurantId } from "../../../components/Redux/Menu/Action";
import MenuCard from '../../../components/Restaurant/MenuCard'
import { getRestaurantByUserId } from "../../../components/Redux/Restaurant/Action";

// const categoryOptions = ["VEG", "NON_VEG", "DESSERT", "DRINKS"];

const Menu = () => {
  const dispatch = useDispatch();
  const id=useSelector(store=>store.restaurant.userRestaurant?.id)
  const menuItems=useSelector(store=>store.menu.menuItems)
  const jwt=localStorage.getItem("jwt")

  useEffect(() => {
     dispatch(getRestaurantByUserId(jwt));
   }, [dispatch, jwt]);
 
   // Then, once restaurant is available, fetch categories
   useEffect(() => {
    
    if (id && jwt) {
      dispatch(
        getMenuItemByRestaurantId({
          restaurantId: id,
          vegetarian: false,
          seasonal: false,
          nonveg: false,
          foodCategory: "", // or some value
          jwt,
        })
      );
    }
  }, [id,jwt,dispatch]);

  return(
     <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Menu Items
      </Typography>

      {!menuItems ? (
        <CircularProgress />
      ) : menuItems.length === 0 ? (
        <Typography>No menu items found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {menuItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <MenuCard item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
export default Menu;

