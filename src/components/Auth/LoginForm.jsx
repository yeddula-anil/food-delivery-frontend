import { TextField, Typography, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { style } from '../cart/Cart';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Redux/Authentication/Actions';

const initialValues = {
  email: '',
  password: '' 
};

const LoginForm = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
  const handleSubmit = (values) => {
    dispatch(loginUser({loginData:values,navigate}))
  };
 

  return (
    <div>
      <Typography variant='h5' className='text-center'>
        Login
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <Field
              as={TextField}
              name='email'
              label='Email'
              fullWidth
              variant='outlined'
              margin='normal'
            />
            <Field
              as={TextField}
              name='password'
              label='Password'
              type='password'
              fullWidth
              variant='outlined'
              margin='normal'
            />
            <Button type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Typography variant='body2' align='center' sx={{mt:3}}>
        Don't have an account
      
      <Button onClick={()=>navigate("/account/register")} sx={{
                        outline: 'none',
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        textTransform: 'none', 
                        padding: 0,            
                        minWidth: 0,
                        marginLeft:1,
                        textDecoration:'underline'         
        }}>
            register
        </Button>
      </Typography>
    </div>
  );
};

export default LoginForm;
