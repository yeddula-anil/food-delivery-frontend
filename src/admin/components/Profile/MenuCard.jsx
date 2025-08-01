import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { createIngredients } from '../../../components/Redux/Ingredients/Action';
import { categorizeIngredients } from '../../../components/util/categorizeIngredients';


const MenuCard = ({item}) => {
  const [categories, setCategories] = useState([]);
  
  const [openModal, setOpenModal] = useState(false);

  const [categoryName, setCategoryName] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")
  const foodId=item.id

  const handleOpenModal = () => {
    setCategoryName('');
    setIngredients(['']);
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  const handleAddIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const handleAddCategory = () => {
    if (!categoryName.trim()) return;
    const filteredIngredients = ingredients.filter((i) => i.trim() !== '');
    if (filteredIngredients.length === 0) return;

    const newCategory = {
      name: categoryName,
      ingredients: filteredIngredients
    };

    setCategories([...categories, newCategory]);
    handleCloseModal();
  };

  const handleSet = () => {
      const formattedList = categories.flatMap((category) =>
         category.ingredients.map((ingredient) => ({
            name: ingredient,
            category: category.name
        }))
      );
      dispatch(createIngredients(formattedList,jwt,foodId))

    console.log('Final Ingredients:', categories);
  };

  return (
    <div>
      {/* Only ONE Accordion */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className="lg:flex items-center justify-between">
            <div className="lg:flex items-center lg:gap-5">
              <img
                className="w-[7rem] h-[7rem] object-cover"
                src={item.images[0]}
                alt="Food"
              />
              <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                <p className="font-semibold text-xl">{item.name}</p>
                <p>₹{item.price}</p>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          </div>
        </AccordionSummary>

            <AccordionDetails>
                {/* Add Category Button */}
                <Button variant="contained" onClick={handleOpenModal}>
                    Add Category
                </Button>

                {/* Horizontal Scrollable Category List */}
                <div className="mt-4 overflow-x-auto flex gap-6">
                       {
                          Object.entries(categorizeIngredients(item.ingredients)).map(([category, ingredients]) => (
                                      <div key={category}>
                                                <p className="font-semibold">{category}</p>
                                                <FormGroup>
                                                      {ingredients.map((ingredient) => (
                                                           <FormControlLabel
                                                                key={ingredient.id}
                                                                control={<Checkbox onChange={() => handleCheckboxChange(ingredient)} />}
                                                                label={ingredient}
                                                           />
                                                        ))}
                                                </FormGroup>
                                      </div>
                          ))
                        }
                </div>

                {/* Set Button */}
                <div className="pt-5">
                    <Button variant="contained" onClick={handleSet}>
                    Set
                    </Button>
                </div>
            </AccordionDetails>

      </Accordion>

      {/* Modal (unchanged) */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          Add Ingredient Category
          <IconButton
            onClick={handleCloseModal}
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            margin="normal"
          />
          <p className="mt-3 font-medium">Ingredients:</p>
          {ingredients.map((ing, index) => (
            <TextField
              key={index}
              fullWidth
              label={`Ingredient ${index + 1}`}
              value={ing}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              margin="dense"
            />
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddIngredientField}
            sx={{ mt: 2 }}
          >
            Add More Ingredient
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleAddCategory} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MenuCard;
