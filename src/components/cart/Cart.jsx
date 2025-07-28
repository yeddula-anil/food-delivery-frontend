import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import AddressCard from './AddressCard';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { AddLocationAlt } from '@mui/icons-material';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { findCart } from '../Redux/Cart/Action';
import { createOrder } from '../Redux/Orders/Action';
const items=[1,1];
const initialValues={
    streetAddress:"",
    state:"",
    pincode:"",
    city:""
}
const validationSchema=Yup.object().shape({
    streetAddress:Yup.string().required("Street address is required"),
    state:Yup.string().required("State address is required"),
    pincode:Yup.string().required("pincode is required"),
    city:Yup.string().required("city is required")


})
export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline:'none',
    boxShadow: 24,
    p: 4
  };
  
const Cart=()=>{
    const {cart}=useSelector(store=>store)
    const dispatch=useDispatch()
    const createOrderUsingSelectedAdrdress=()=>{

    }
    const [open,setOpen]=useState(false);
    const [orderSuccessModal, setOrderSuccessModal] = useState(false);

    const handleOpenAddressModal=()=>{
        setOpen(true);
    }
    const handleClose = () =>{
         setOpen(false);
    }
    const handleSubmit = (values) => {
    const cartItems = cart.cartItems;

    if (!cartItems || cartItems.length === 0) {
        console.error("No items in cart");
        return;
    }
    const data = {
        jwt: localStorage.getItem("jwt"),
        order: {
            
            deliveryAdress: {
                streetAdress: values.streetAddress, // ✅ correct field name
                city: values.city,
                stateProvince: values.state,
                postalCode: values.pincode,
                country: "india"
            }
        }
    };

    dispatch(createOrder(data));
    setOpen(false);

    // Show success modal
    setOrderSuccessModal(true);
    console.log("Submitted data:", data);
};

    
    
    console.log("cart",cart)
    return(
        <div>
            <main className='lg:flex justify-between'>
                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
                    {
                        cart.cartItems.map((item)=><CartItem item={item}/>)
                    }
                <Divider />
                <div className='billDetails px-5 text-sm'>
                    <p className='font-extralight py-5'>Bill Details</p>
                    <div className='space-y-3'>
                        <div className='flex justify-between text-gray-400'>
                            <p>item total</p>
                            <p>₹{cart.cart?.total}</p>

                        </div>
                        <div className='flex justify-between text-gray-400'>
                            <p>Delivery fee</p>
                            <p>₹30</p>
                            
                        </div>
                        <div className='flex justify-between text-gray-400'>
                            <p>PlatForm Fee</p>
                            <p>₹5</p>
                            
                        </div>
                        <div className='flex justify-between text-gray-400'>
                            <p>GST & Restaurant charges</p>
                            <p>$10</p>
                            
                        </div>
                        <Divider />
                        <div className='flex justify-between text-gray-400'>
                            <p>Total Pay</p>
                            <p>₹{cart.cart?.total+30+5+10}</p>
                            
                        </div>
                    </div>
                </div>
                </section>
                <Divider orientation='vertical' flexItem/>
                <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
                    <div>
                        <h1 className='text-center font-semibold text-2xl py-10'>Choose Delivery Address</h1>
                        <div className='flex gap-5 flex-wrap justify-center'>
                            {[1,1,1,1,1].map((item)=><AddressCard handleSelectAddress={createOrderUsingSelectedAdrdress} item={item} showButton={true}/>)}
                            <Card className='flex gap-5 w-64 p-5'>
                            <AddLocationAltIcon />
                            <div className='space-y-3 text-gray-500'>
                                <h1 className='font-semibold text-lg text-white'>Add New Address</h1>
                                
                                <Button variant='outlined' fullWidth onClick={handleOpenAddressModal} >Add</Button>
                            </div>
      
                        </Card>
                        </div>
                        
                        
                    </div>
                </section>
                
            </main>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(val)=>handleSubmit(val)}
                    >
                    <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Field
                                as={TextField}
                                name="streetAddress"
                                label="Street Address"
                                fullWidth
                                variant="outlined"
                            />
                            <ErrorMessage name="streetAddress">
                                {msg => <span className="text-red-600">{msg}</span>}
                            </ErrorMessage>
                        </Grid>
                        <Grid item xs={12} lg={12} md={12}>
                            <Field
                                as={TextField}
                                name="city"
                                label="city"
                                fullWidth
                                variant="outlined"
                            />
                            <ErrorMessage name="city">
                                {msg => <span className="text-red-600">{msg}</span>}
                            </ErrorMessage>
                        </Grid>
                        <Grid item xs={12} lg={12} md={12}>
                            <Field
                                as={TextField}
                                name="pincode"
                                label="pincode"
                                fullWidth
                                variant="outlined"
                            />
                            <ErrorMessage name="pincode">
                                {msg => <span className="text-red-600">{msg}</span>}
                            </ErrorMessage>
                        </Grid>
                        <Grid item xs={12} lg={12} md={12}>
                            <Field
                                as={TextField}
                                name="state"
                                label="state"
                                fullWidth
                                variant="outlined"
                            />
                            <ErrorMessage name="state" md={12}>
                                {msg => <span className="text-red-600">{msg}</span>}
                            </ErrorMessage>
                        </Grid>
                        <Grid item xs={12} lg={12} md={12}>
                            <Button variant='contained' type='submit' color='primary' fullWidth>Deliver Here</Button>
                        </Grid>
                    </Grid>
                </Form>
                </Formik>

                    
                    
                </Box>
            </Modal>
            <Modal
            open={orderSuccessModal}
            onClose={() => setOrderSuccessModal(false)}
            aria-labelledby="order-success-title"
            aria-describedby="order-success-description"
            >
            <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'white', // 👈 white background
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    width: 300,
                    textAlign: 'center',
                    }}>
                <h2 id="order-success-title" className='text-xl font-semibold mb-4'>Order Placed</h2>
                <p id="order-success-description" className='text-gray-600 mb-6'>
                Your order has been placed successfully!
                </p>
                <Button variant='contained' onClick={() => setOrderSuccessModal(false)}>
                Close
                </Button>
            </Box>
            </Modal>
        </div>
    )
}
export default Cart;