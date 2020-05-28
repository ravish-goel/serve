import { NativeSelect, InputLabel } from '@material-ui/core';
import React from 'react';


export default function Sort({value, options, applySort}){
    var handleChange = (e)=>{
        applySort(e.target.value)
        value = e.target.value;
    }
    return (
        <div>
            <InputLabel htmlFor="select">Sort by ID</InputLabel>
            <NativeSelect id="select" value={value}
          onChange={handleChange}>
            {
                options.map((option)=>{
                    return <option value={option}>{option}</option>
                })
            }
            </NativeSelect>
        </div>
    )
}