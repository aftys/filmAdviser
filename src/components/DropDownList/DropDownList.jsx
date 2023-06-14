import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({setFilter,arrayFilters,name}) {


  const handleChange = (event) => {
    setFilter(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, backgroundColor: "#202020", color:"yellow", borderColor:"yellow", borderRadius:"5px"}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" sx={{color:"white"}} >{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          sx={{ color:"white"}}
          onChange={handleChange}
        >
            {arrayFilters.map((item)=>(
                <MenuItem value={item.id}>{item.name}</MenuItem>
            )

            )}

        </Select>
      </FormControl>
    </Box>
  );
}