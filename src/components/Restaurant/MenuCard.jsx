import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup, Typography,Snackbar } from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categorizeIngredients } from '../util/categorizeIngredients';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../Redux/Cart/Action';
import MuiAlert from '@mui/material/Alert';


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
const MenuCard=({item})=>{
    const [selectedIngredients,setSelectedIngredients]=useState([]);
    const dispatch=useDispatch();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleCheckboxChange=(itemName)=>{
      if(selectedIngredients.includes(itemName)){
        setSelectedIngredients(selectedIngredients.filter((item)=>item!=itemName))
      }
      else{
        setSelectedIngredients([...selectedIngredients,itemName])
      }
    }
    const handleAddTocart=(e)=>{
        e.preventDefault()
        const reqData={
            jwt:localStorage.getItem("jwt"),
            cartItem:{
                foodId:item.id,
                quantity:1,
                ingredients:selectedIngredients

            }
        }
        dispatch(addItemToCart(reqData))
        setOpenSnackbar(true);
        console.log("req data",reqData)
    }
    return(
        <div>
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
                                                control={<Checkbox onChange={() => handleCheckboxChange(ingredient.name)} />}
                                                label={ingredient}
                                            />
                                        ))}
                                    </FormGroup>
                                </div>
                          ))



                        }

                    </div>
                    <div className='pt-5'>
                        <Button onClick={handleAddTocart} type="submit" variant="contained" disabled={false}>{true?"Add To Cart":"out of stock"}</Button>
                    </div>
                   </form>
                </AccordionDetails>
            </Accordion>
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={3000} 
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <MuiAlert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled">
                Added to Cart Successfully!
                </MuiAlert>
            </Snackbar>
        </div>
    )
}
export default MenuCard;