import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SelectComponent({value, setValue, values, desc}){

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return(
        <>
            <Box sx={{ minWidth: 120, mt:2}}>
                <FormControl sx={{minWidth: 100}}>
                <InputLabel id="demo-simple-select-label">{desc}</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Faktor"
                onChange={handleChange}
                >
                    {values.map(value => (
                        <MenuItem value={value}>{value}</MenuItem>
                    ))}
                </Select>
                </FormControl>
            </Box>
        </>
    );

}

export { SelectComponent };