import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categorizeIngredients } from '../../../components/util/categorizeIngredients';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../../components/Redux/Cart/Action';
import { updateMenuItemAvailability } from '../../../components/Redux/Menu/Action';

const ingredients=[
    {
        category:"Nuts & seeds",
        ingredients:["Cashews"]
    },
    {
        category:"Proteins",
        ingredients:["Bacon Stripes","chicken"]
    }
]
const AdminMenuCard=({item})=>{
    const [available,setAvailable]=useState(item.available);
    const [selectedIngredients,setSelectedIngredients]=useState([]);
    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt")
    const handleCheckboxChange=(itemName)=>{
      if(selectedIngredients.includes(itemName)){
        setSelectedIngredients(selectedIngredients.filter((item)=>item!=itemName))
      }
      else{
        setSelectedIngredients([...selectedIngredients,itemName])
      }
    }
    const handleFoodAvailability=(e)=>{
         e.preventDefault();
         setAvailable(!available);
        dispatch(updateMenuItemAvailability({foodId:item.id,jwt:jwt}))
    }
    return(
        <div className='w-full'>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <div className='lg:flex items-center justify-between'>
                        <div className='lg:flex items-center lg:gap-5'>
                            <img className='w-[7rem] h-[7rem] object-cover' src={item.images[0]} alt="" />
                            <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                                <p className='font-semibold text-xl'>{item.name}</p>
                                <p>{item.price}</p>
                                <p className='text-gray-400'>{item.description}</p>
                            </div>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                   <form>
                    <div className='flex gap-5 flex-wrap'>
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
                    <div className='pt-5'>
                        <Button onClick={handleFoodAvailability} type="submit" variant="contained" disabled={false}>{available?"make out of stock":"make available"}</Button>
                    </div>
                   </form>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
export default AdminMenuCard;