import { InputLabel, Input, Button } from '@material-ui/core';

import React from 'react';


export default function Search({applySearch}){
    const [charCount, setCharCount] = React.useState(0)
    const countChars = (e) => {
        setCharCount(e.target.value.length)
    }
    const search = (e) => {
        applySearch(document.getElementById('search').value)
    }

    const clear = (e) => {
        e.preventDefault();
        document.getElementById('search').value = "";
        applySearch('');
    }
    return (
        <div> 
            <InputLabel htmlFor="search">Search by name</InputLabel>
            <Input id="search" name="search" onChange={countChars}></Input>
            <Button onClick={search} variant="contained" disabled={charCount < 3}>Search</Button>   
            {charCount > 2 && <a href="#" onClick={clear}>Clear</a>}     
        </div>
    )
}