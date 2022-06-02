import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react"

export const MessageForm = ({id, name, formParams, setFormParams}) => {

    const [inputText, setInputText] = useState();

    const handleBlur = () => {
        const copy = formParams.slice();
        copy.find(elm => elm.id == id).message = inputText;
        setFormParams(copy)
      
    }

    const handleChange = (e) => {
        setInputText(e.target.value)
    }

    return (
        <>
        <Box>
        <h4>{id}: {name}</h4>
        <TextField
        fullWidth
        sx={{ ml: 1}}
        row={3}
        value={inputText}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      </Box>
         
          
      
        </>  
      
    )
}