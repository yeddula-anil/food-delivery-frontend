import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
const MenuCard=()=>{
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
                            <img className='w-[7rem] h-[7rem] object-cover' src="https://images.pexels.com/photos/16020573/pexels-photo-16020573.jpeg" alt="" />
                            <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                                <p className='font-semibold text-xl'>Biryani</p>
                                <p>₹499</p>
                                <p className='text-gray-400'>tastiest biryani</p>
                            </div>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                   <form>
                    <div className='flex gap-5 flex-wrap'>
                        {
                            ingredients.map((cat)=>(
                                <div>
                                    <p>{cat.category}</p>
                                    {
                                        cat.ingredients.map((item)=>(
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox onChange={()=>handleCheckboxChange(item)} />} label={item} />
                                            </FormGroup>
                                        ))
                                    }
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