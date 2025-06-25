import React, { useState } from 'react'

const validate = (formData, schema) => {
    
    const errors = {};

    
    for(let field in schema){
        console.log(field);
        const value = formData[field]?.toString()?.trim() || '';
        const rules = schema[field];

        if(rules.required && !value){
            errors[field] = `${field} is required`;
        }
    }

    return errors;

}

export default validate;