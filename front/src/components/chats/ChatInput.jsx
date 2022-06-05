import React, { useContext, useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { Box, InputBase, Stack, TextField } from "@mui/material";
import { createMessage, fetchMessages } from "../../apis/chat";
import { useForm } from "react-hook-form";
import { Button, Grid, Snackbar } from "@material-ui/core";
import { SnackbarContext } from "../../contexts/snackBar";

export const ChatInput = ({selected, sendMessage}) => {


  const [text, setText] = useState();
  const { register, reset,formState: { errors } } = useForm();
  const sb = useContext(SnackbarContext)

  const handleChange = (e) => {
    setText(e.target.value)
  }
  
  const Submit = (e) => {
    
    e.preventDefault();
    reset();
    console.log(text)
    text ?
    sendMessage(selected.id, text)
    :
    sb.setSnackBar({open: true, variant: "error", content: "メッセージを空白にできません"})
  
  }


  return (
    <Box sx={{width: "100%"}}>
     <form 
      onSubmit={Submit} 
      style={{position:"flexed", bottom:0}}
     >
       <Stack 
        sx={{py:2}}
        direction="row" 
        spacing={1} 
        alignItems="center"
        >
          <TextField
        style={{width:"calc(100% - 50px)"}}
       
          {...register("content", { required: "メッセージは空白にできません" })}
           onChange={handleChange} 
        /> 
         <IconButton 
          type="submit"
          color="primary" 
          component="button"
          >
         <SendIcon/>
          </IconButton>

       </Stack>

   
        
    </form>

     </Box>
    
  

  )

}