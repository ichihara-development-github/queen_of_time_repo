import { Box, FormControl } from "@material-ui/core";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState, useContext } from 'react';
import { ConfigContext } from "../../contexts/config";

  export const CalendarEventTypes = ({initial, setEvent}) =>{


  const [value, setValue] = useState("")
  const orgConfig = useContext(ConfigContext);

  const colors = orgConfig.params.events;
    
  const handleChange = (e) => {
    setValue(e.target.value)
    setEvent(initial.filter(event=> event.color === e.target.value))
  };

    return(
  
    <Box>
     <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {colors.map(v =>  
           <FormControlLabel 
           key={v.key}
            value={v.key} 
            control={<Radio 
              sx={{
                color: v.key,
                '&.Mui-checked': {
                  color: v.key[600],
                }}}/>} 
            label={v.value}
          />
        )}
       
      </RadioGroup>
    </FormControl>
  </Box>
  )
      }
  