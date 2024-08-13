import { Button, TextField, Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import Center from './Center';
import useForm from '../hooks/useForm';

// returns the default values of `name` and `email` to be used in the login form
// i.e. a "fresh" new model ready for use (?)
const getFreshModel = () => ({
    name: '',
    email: ''
})

export default function Login() {
    // object that holds values to be assigned to the text fields
    // and also the functions / event handlers to be used
    // come from the `useForm` hook we made, which actually sets the contents of these
    // `handleInputChange` in this case is what updates the two state vars above it
    const {
        values,                     // holds values from the form
        setValues,                  // setter for `values` (see useForm.js)
        errors,                     // holds error messages generated from the form
        setErrors,                  // setter for `errors` (see useForm.js)
        handleInputChange
    } = useForm(getFreshModel);

    // frontend validation for email and name. pulls data from the form element itself
    const validate = () => {
        // this will contain booleans, which will be converted to error messages
        let errorMessages = {};
        // validate email format
        // returns true if valid, false otherwise
        errorMessages.email = (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(values.email) ? "" : "Email is not valid.";
        // returns empty string if valid, 'This field is required.' otherwise
        errorMessages.name = values.name !== '' ? '' : 'This field is required.';
        // will set a react global that stores errors for display
        // in this case, uses the contents of ``
        setErrors(errorMessages);
        // return true if all values of `errorMessages` are empty strings
        // i.e. no error messages were generated
        return Object.values(errorMessages).every(x => x == ""); 
    };

    const loginHandler = e => {
        e.preventDefault();  // prevent the form from reloading the page
        // make sure the "login request" (demo) only comes through if valid
        if (validate())
            console.log(values); // print the `values` state object defined in Login() above
    };

  return (
    <Center>
        <Card sx={{width:400}}>
            <CardContent sx={{textAlign:'center'}}>
                <Typography variant='h3' sx={{my: 3}}>
                    Quiz App
                </Typography>
                <Box sx={{
                    '& .MuiTextField-root' : {
                        m: 1,
                        width: '90%'
                    }
                }}>
                    <form noValidate autoComplete='off' onSubmit={loginHandler}>
                        <TextField
                            label="Email"
                            name="email"
                            value={values.email}  // value to pass to the e handler
                            onChange={handleInputChange}  // the e handler for elem changes
                            variant="outlined"
                            // non-dynamically, it would be like (already assuming error): 
                            // error={true}
                            // helperText=".."
                            // CONDITIONALLY show the email validation errors generated if any:
                            // if there IS something in error.email (i.e. email has err)
                            // then return the object following the `&&`
                            // but DESTRUCTURE the object first.
                            // this results in the properties of this object
                            // becoming ATTRIBUTES, i.e. part of this TextField
                            {...(errors.email && {error:true, helperText:errors.email})}
                        />
                        <TextField
                            label="Name"
                            name="name"
                            value={values.name}
                            onChange={handleInputChange}
                            variant="outlined"
                            // CONDITIONALLY show the name validation errors generated if any
                            {...(errors.name && {error:true, helperText:errors.name})}
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            size='large'
                            sx={{width:'100%'}}
                        > Start </Button>
                    </form>
                </Box>            
            </CardContent>
        </Card>
    </Center>
  );
}
