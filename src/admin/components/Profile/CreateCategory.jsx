import React, { useState } from 'react'
import {
  Divider,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TextField,
} from '@mui/material'
import MenuCard from './MenuCard'
import axios from 'axios'

const CreateCategory = () => {
  const [foodType, setFoodType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([
    { id: 1, name: "biryani" },
    { id: 2, name: "pizza" }
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const res = await axios.post("/api/restaurant/category", {
        name: newCategory
      });
      setCategories([...categories, res.data]); // add new category
      setNewCategory("");
      setShowInput(false);
    } catch (error) {
      console.error("Failed to add category", error);
    }
  };

  return (
    <div className='px-5 lg:px-20'>
      <Divider />
      <section className='pt-[2rem] lg:flex relative'>
        {/* Left Panel */}
        <div className='space-y-10 lg:w-[20%] filter p-5 shadow-md'>
          <div className='box space-y-5 lg:sticky top-28'>
            {/* Add Category Button */}
            <div className='space-y-3'>
              <Button
                variant='contained'
                color='primary'
                onClick={() => setShowInput(true)}
                size='small'
              >
                Add Category
              </Button>

              {showInput && (
                <div className='space-y-2'>
                  <TextField
                    fullWidth
                    size='small'
                    label='New Category'
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <Button variant='contained' size='small' onClick={handleAddCategory}>
                    Submit
                  </Button>
                </div>
              )}
            </div>

            <div>
              <Typography variant='h5' sx={{ paddingBottom: '1rem' }}>Food Type</Typography>
              <FormControl className='py-10 space-y-5' component={"fieldset"}>
                <RadioGroup
                  name='food_type'
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                >
                  {["all", "vegetarian", "non-vegetarian"].map((type) => (
                    <FormControlLabel
                      key={type}
                      value={type}
                      label={type}
                      control={<Radio />}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <Divider />

              <Typography variant='h5' sx={{ paddingBottom: '1rem' }}>Food Categories</Typography>
              <FormControl className='py-10 space-y-5' component={"fieldset"}>
                <RadioGroup
                  name='Food Categories'
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      value={item.name}
                      label={item.name}
                      control={<Radio />}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className='space-y-5 lg:w-[80%] lg:pl-10'>
          {[1, 2, 3, 4].map((item, index) => (
            <MenuCard key={index} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default CreateCategory;
