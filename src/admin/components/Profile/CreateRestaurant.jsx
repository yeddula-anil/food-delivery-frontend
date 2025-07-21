import React from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form, Field } from "formik";
import { createRestaurant } from "../../../components/Redux/Restaurant/Action";
import { useDispatch } from "react-redux";

const CreateRestaurantForm = () => {
  const initialValues = {
    name: "",
    description: "",
    cuisineType: "",
    openingHours: "",
    adress: {
      street: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      country: "",
    },
    contactInformation: {
      email: "",
      mobile: "",
      twitter: "",
      instagram: "",
    },
    images: [""],
  };
  const dispatch=useDispatch()

  const handleSubmit = (values) => {
    console.log(values);
    const jwt=localStorage.getItem("jwt");
    dispatch(createRestaurant({body:values,jwt:jwt}))
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
        Create Restaurant
      </Typography>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange }) => (
          <Form>
            <Grid container spacing={4}>
              {/* Left Column */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Restaurant Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Cuisine Type"
                  name="cuisineType"
                  value={values.cuisineType}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Opening Hours"
                  name="openingHours"
                  value={values.openingHours}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>

              {/* Middle Column - Address */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Address
                </Typography>
                <TextField
                  label="Street"
                  name="address.street"
                  value={values.adress.street}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="City"
                  name="address.city"
                  value={values.adress.city}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="State"
                  name="address.state"
                  value={values.adress.stateProvince}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="ZIP / PIN Code"
                  name="address.zipCode"
                  value={values.adress.postalCode}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Country"
                  name="address.country"
                  value={values.adress.country}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>

              {/* Right Column - Contact */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <TextField
                  label="Email"
                  name="contactInformation.email"
                  value={values.contactInformation.email}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Mobile Number"
                  name="contactInformation.mobile"
                  value={values.contactInformation.mobile}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Twitter"
                  name="contactInformation.twitter"
                  value={values.contactInformation.twitter}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Instagram"
                  name="contactInformation.instagram"
                  value={values.contactInformation.instagram}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />

                <Box mt={2}>
                  <Typography variant="subtitle1">Images</Typography>
                  <Box display="flex" alignItems="center">
                    <TextField
                      label="Image URL 1"
                      name="images[0]"
                      value={values.images[0]}
                      onChange={handleChange}
                      variant="outlined"
                      margin="normal"
                    />
                    <IconButton color="secondary">
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box mt={4} textAlign="center">
              <Button variant="contained" color="secondary" type="submit">
                Create Restaurant
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateRestaurantForm;
