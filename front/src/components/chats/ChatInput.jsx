import React, { useContext, useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { InputBase, Stack, TextField } from "@mui/material";
import { createMessage, fetchMessages } from "../../apis/chat";
import { useForm } from "react-hook-form";
import { Button, Grid, Snackbar } from "@material-ui/core";
import { SnackbarContext } from "../../contexts/snackBar";

export const ChatInput = ({selected, sendMessage}) => {


  const [text, setText] = useState();
  const { register, handleSubmit, watch, reset,formState: { errors } } = useForm();
  const sb = useContext(SnackbarContext)

  const handleChange = (e) => {
    setText(e.target.value)
  }
  
  const Submit = (e) => {
    
    e.preventDefault();
    reset();
    text ?
    // sendMessage(selected.id, text)
    sendMessage(selected.id, text)
    :
    sb.setSnackBar({open: true, variant: "error", content: "メッセージを空白にできません"})
  
  }


  return (
    <>
     <form onSubmit={Submit} style={{position:"flexed", bottom:0,  marginTop:20}}>
   
        <TextField
        style={{width:"85%"}}
         
          {...register("content", { required: "メッセージは空白にできません" })}
           onChange={handleChange} 
        />
         <IconButton 
         type="submit"
          style={{marginLeft:5,height:50}}
          color="primary" 
          component="button"
          >
         <SendIcon/>
          </IconButton>
    </form>

     </>
    

// {
// <Paper
//       component="form"
//       sx={{position: "absolute",bottom: 10, display: 'flex', alignItems: 'center', width:"100%", maxWidth:"100%"}}
//     >
//        <InputBase
//         onChange={handleChange}
//         sx={{ ml: 1, flex: 1 }}
//         row={3}
//         inputProps={{ 'aria-label': 'search google maps' }}
//         value={text}
//       />
      
      
//       <IconButton onClick={sendMessage} type="submit" color="primary" sx={{ p: '10px' }} aria-label="search">
//         <SendIcon />
//       </IconButton>
//       <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
     
       
//     </Paper> */}
  

  )

}