import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRestaurantById, getRestaurantByUserId, getRestaurantCategories } from "../../../components/Redux/Restaurant/Action";
import {createMenuItem} from '../../../components/Redux/Menu/Action'



const AddMenu = () => {
  const dispatch = useDispatch();
  const jwt=localStorage.getItem("jwt")
  const userRestaurant = useSelector(store => store.restaurant.userRestaurant);
  const id = userRestaurant?.id;

  const categories=useSelector(store=>store.restaurant.categories)
 useEffect(() => {
  // Step 1: Get restaurant by user ID
  if (!id && jwt) {
    dispatch(getRestaurantByUserId(jwt));
  }

  // Step 2: When restaurant ID is available, fetch restaurant details & categories
  if (id && jwt) {
    // dispatch(getRestaurantById(jwt, id));
    dispatch(getRestaurantCategories({ jwt, restaurantId: id }));
  }
}, [dispatch, jwt, id]);

 // <- reruns when id is set

  

  

  const initialValues = {
    name: "",
    description: "",
    price: "",
    images: [""],
    categoryId: null,
    vegetarian: false,
    isSeasonal: false,
  };

  const handleSubmit = (values) => {
    const jwt = localStorage.getItem("jwt");
    const payload = {
      ...values,
      price: parseInt(values.price),
    };
    console.log(payload);
    dispatch(createMenuItem({ body: payload, jwt }));
  };

  return (
    <Box
      sx={{
        backgroundColor: "#1e1e1e",
        color: "white",
        p: 4,
        borderRadius: 2,
        maxWidth: "95%",
        margin: "auto",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Add Food Item
      </Typography>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <Grid container spacing={4}>
              {/* Left Column */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  type="number"
                  label="Price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  select
                  fullWidth
                  label="Category"
                  name="categoryId"
                  value={values.categoryId || ""} // use categoryId directly
                  onChange={handleChange} // use Formik's built-in handler
                  variant="outlined"
                  margin="normal"
                >
                  {categories.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.vegetarian}
                      onChange={handleChange}
                      name="vegetarian"
                      color="secondary"
                    />
                  }
                  label="Vegetarian"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.isSeasonal}
                      onChange={handleChange}
                      name="isSeasonal"
                      color="secondary"
                    />
                  }
                  label="Seasonal"
                />
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Images
                </Typography>
                {values.images.map((img, index) => (
                  <TextField
                    key={index}
                    fullWidth
                    label={`Image URL ${index + 1}`}
                    name={`images[${index}]`}
                    value={img}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                  />
                ))}
                <IconButton
                  color="secondary"
                  onClick={() =>
                    setFieldValue("images", [...values.images, ""])
                  }
                >
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>

            <Box mt={4} textAlign="center">
              <Button variant="contained" color="secondary" type="submit">
                Add Food
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddMenu;
