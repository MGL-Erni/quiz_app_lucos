import { useState } from "react";

export default function useForm(getFreshModelObject) {
    // define state variables for the form
    // in this case, the values from the form, and the error messages generated from it
    const [values, setValues] = useState(getFreshModelObject());
    const [errors, setErrors] = useState({});

    // set one of the values when a user changes data on the form
    // e.g. "Email is not valid." is set as long as the contents don't match a valid email regex
    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    // return these values to be used on the actual form itself
    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    };
}