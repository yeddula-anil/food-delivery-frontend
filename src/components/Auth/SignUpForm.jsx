import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
  } from '@mui/material';
  import { Field, Form, Formik } from 'formik';
  import React from 'react';
import { useDispatch } from 'react-redux';
  import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Redux/Authentication/Actions';
  
  const initialValues = {
    fullname:'',
    email: '',
    password: '',
    role: '',
  };
  
  const SignUpForm = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
  
    const handleSubmit = (values) => {
      dispatch(registerUser({userData:values,navigate}))
    };
  
    return (
      <div>
        <Typography variant='h5' className='text-center'>
          Register
        </Typography>
  
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => (
            <Form>
              <Field
                as={TextField}
                name='fullname'
                label='Full Name'
                fullWidth
                variant='outlined'
                margin='normal'
              />
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
              <FormControl fullWidth margin='normal'>
                <InputLabel id='role-select-label'>Role</InputLabel>
                <Select
                  labelId='role-select-label'
                  id='role-select'
                  name='role'
                  value={values.role || ''}
                  label='Role'
                  onChange={(e) => setFieldValue('role', e.target.value)}
                >
                  <MenuItem value={'ROLE_CUSTOMER'}>Customer</MenuItem>
                  <MenuItem value={'ROLE_RESTAURANT_OWNER'}>Restaurant Owner</MenuItem>
                </Select>

              </FormControl>
  
              <Button type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
                Register
              </Button>
            </Form>
          )}
        </Formik>
  
        <Typography variant='body2' align='center' sx={{ mt: 3 }}>
          Already have an account?
          <Button
            onClick={() => navigate('/account/login')}
            sx={{
              outline: 'none',
              backgroundColor: 'transparent',
              boxShadow: 'none',
              textTransform: 'none',
              padding: 0,
              minWidth: 0,
              marginLeft: 1,
              textDecoration: 'underline',
            }}
          >
            Login
          </Button>
        </Typography>
      </div>
    );
  };
  
  export default SignUpForm;
  