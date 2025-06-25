import React, { useState } from 'react'

const useForm = (initialvalues) => {

    const [formData, setFormData] = useState(initialvalues);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        console.log(formData)
    }

    return {
        formData, 
        handleChange, 
        setFormData, 
        loading, 
        setLoading, 
        errors, 
        setErrors
    };
}

export default useForm;