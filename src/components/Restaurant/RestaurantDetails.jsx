import React, { useEffect } from 'react';
import { useState } from 'react';
import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { getRestaurantById, getRestaurantCategories } from '../Redux/Restaurant/Action';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItemByRestaurantId } from '../Redux/Menu/Action';
// const categories=["pizza","biryani","burger","chicken","rice"];
const foodTypes=[
    {label:"All",value:"all"}
    ,{label:"vegetarianOnly",value:"vegetarian"},
    {label:"non veg only",value:"non_veg"},
    {label:"Seasonal",value:"seasonal"}
];

const RestaurantDetails = () => {
    const [food_type,setfood_type]=useState("all");
    const [foodCategory,setFoodCategory]=useState("");
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt")
    const {auth} = useSelector(store=>store)
    const {restaurant}=useSelector(store=>store.restaurant)
    const {categories}=useSelector(store=>store.restaurant)
    const {menuItems}=useSelector(store=>store.menu)
   
    
    const {id}=useParams();
    
    useEffect(() => {
        
            dispatch(getRestaurantById({ jwt, restaurantId: id }));
            dispatch(getRestaurantCategories({ jwt, restaurantId: id}))
            dispatch(getMenuItemByRestaurantId({jwt,restaurantId:id,vegetarian:true,nonveg:false,seasonal:false,foodCategory:"Burgers"}))
        
    }, [dispatch, jwt, id]);
    useEffect(()=>{
        dispatch(getMenuItemByRestaurantId({jwt,restaurantId:id,
            vegetarian:true,
            nonveg:false,
            seasonal:false,
            foodCategory:foodCategory}))

    },[foodCategory])
    
    console.log("restuarants by id",restaurant)
    console.log("restaurant categories",categories)
    console.log("menu items",menuItems)
    

  if (!restaurant) {
    return <div className="text-center py-10 text-gray-500">Loading restaurant details...</div>;
  }
        
  return (
    <div className='px-5 lg:px-20' >
        <section>
            <h3 className='text-gray-500 py-2 mt-10'>Home/{restaurant.adress.country}/{restaurant.name}</h3>

            <div>
            <Grid item xs={12}>
                    <div>
                        <img
                        src="http://res.cloudinary.com/dcpesbd8q/image/upload/v1707802815/ux3xq93xzfbqhtudigv2.jpg"
                        alt="Banner"
                        style={{
                            width: '100%',
                            height: '40vh',
                            objectFit: 'cover',
                       
                            display: 'block',
                        }}
                        />
                    </div>
            </Grid>
            <div className="flex">
                        <div className="w-1/2 pt-4 pr-4">
                        <img
                        src="http://res.cloudinary.com/dcpesbd8q/image/upload/v1707802819/cpfxroggttxg6tedfskd.jpg"
                        alt="Banner"
                        style={{
                            width: '100%',
                            height: '40vh',
                            objectFit: 'cover',
                       
                            display: 'block',
                        }}
                        />
                        </div>
                        <div className="w-1/2 pt-4 pr-0">
                        <img
                        src="http://res.cloudinary.com/dcpesbd8q/image/upload/v1707802825/dtwyuhxuawmg3qzffv84.jpg"
                        alt="Banner"
                        style={{
                            width: '100%',
                            height: '40vh',
                            objectFit: 'cover',
                       
                            display: 'block',
                        }}
                        />
                        </div>
                        </div>
            </div>
            <div className='pt-3 pb-5'>
                <h1 className='text-4xl font-semibold'>{restaurant.name}</h1>
                <p className='text-gray-500 mt-1'><span>{restaurant.description}</span></p>
        <div className='space-y-3 mt-3'>
            <p className='text-gray-500 flex items-center gap-3'><LocationOnIcon /><span>{restaurant.adress?.city}</span></p>
            <p className='text-gray-500 flex items-center gap-3'><CalendarTodayIcon /><span>{restaurant.openingHours} (Today)</span></p>

        </div>


            
            </div>
        </section>
        <Divider />
        <section className='pt-[2rem] lg:flex relative'>
            <div className='space-y-10 lg:w-[20%] filter p-5 shadow-md'>
                <div className='box space-y-5 lg:sticky top-28'>
                    <div>
                        <Typography variant='h5' sx={{paddingBottom:'1rem'}}>Food Type</Typography>
                        <FormControl className='py-10 space-y-5' component={"fieldset"}>
                             <RadioGroup
                                    name='food_type'
                                    value={food_type}
                                    onChange={(e) => setfood_type(e.target.value)}
                                    >
                                    {foodTypes.map((item) => (
                                        <FormControlLabel
                                        key={item.value}
                                        value={item.value}
                                        label={item.label}
                                        control={<Radio />}
                                        />
                                    ))}
                            </RadioGroup>

                        </FormControl>
                        <Divider />
                        <Typography variant='h5' sx={{paddingBottom:'1rem'}}>Food Categories</Typography>
                        <FormControl className='py-10 space-y-5' component={"fieldset"}>
                             <RadioGroup
                                    name='Food Categories'
                                    
                                    onChange={(e) => setFoodCategory(e.target.value)}
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
            <div className='space-y-5 lg:w-[80%] lg:pl-10'>
                {menuItems.map((item)=>(
                    <MenuCard item={item}/>
                ))}
                
            </div>

        </section>

    </div>
  );
};

export default RestaurantDetails;
