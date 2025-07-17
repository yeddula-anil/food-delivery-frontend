import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categorizeIngredients } from '../util/categorizeIngredients';

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
    const handleCheckboxChange=(item)=>{
        console.log(item);
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
                    control={<Checkbox onChange={() => handleCheckboxChange(ingredient)} />}
                    label={ingredient.name}
                />
            ))}
        </FormGroup>
    </div>
))



                        }

                    </div>
                    <div className='pt-5'>
                        <Button type="submit" variant="contained" disabled={false}>{true?"Add To Cart":"out of stock"}</Button>
                    </div>
                   </form>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
export default MenuCard;