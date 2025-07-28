import { Chip, IconButton,Button } from '@mui/material';
import React from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findCart, removeCartItem, updateCartItem } from '../Redux/Cart/Action';

    const CartItem = ({ item }) => {
    const { cart } = useSelector(store => store);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const handleUpdatecartItem = async (value) => {
        if (!item?.id) {
            console.warn("Skipping update: item ID is missing");
            return;
        }

        if (value === -1 && item.quantity === 1) {
            handleRemoveCartItem(item.id, jwt);
            return;
        }

        const data = { cardItemId: item.id, quantity: item.quantity + value };

        try {
            await dispatch(updateCartItem({ data, jwt }));
            dispatch(findCart(jwt));
        } catch (err) {
            console.error("Error updating cart item:", err);
        }
    };

    const handleRemoveCartItem=()=>{
        dispatch(removeCartItem(item.id,jwt))
    }


    return (
        <div className='px-5'>
            <div className='lg:flex items-center lg:space-x-5'>
                <div>
                    <img className='w-[5rem] h-[5rem] object-cover' src={item.food.images[0]} alt="" />
                </div>
                <div className='flex items-center justify-between lg:w-[70%]'>
                    <div className='space-y-1 lg:space-y-3 w-full'>
                        <p>{item.food.name}</p>
                        <div className='flex items-center space-x-1'>
                            <IconButton onClick={() => handleUpdatecartItem(-1)}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <div className='w-5 h-5 text-xs flex items-center justify-center'>{item.quantity}</div>
                            <IconButton onClick={() => handleUpdatecartItem(1)}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </div>
                    </div>
                    <p>{item.totalPrice}</p>
                </div>
                <Button varaiant="contained" onClick={handleRemoveCartItem}>delete</Button>
            </div>
            <div className='pt-3 space-x-2'>
                {item.ingredients.map((ingredientItem, i) => (
                    <Chip key={i} label={ingredientItem} />
                ))}
            </div>
        </div>
    );
};

export default CartItem;
