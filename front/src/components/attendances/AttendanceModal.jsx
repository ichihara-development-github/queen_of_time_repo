import React, { useState } from "react";
import { Modal, Button, Box }  from "@mui/material"
import Typography from '@mui/material/Typography';
import { MessageForm } from "./MessageForm";
import { createNotification } from "../../apis/notification";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

export const AttendanceModal = ({params, employeeId,setSbParams}) => {

    const [open, setOpen] = useState(true);
    const [formParams, setFormParams] = useState([]); 

    const handleOpen = () => {
      setOpen(true)
      setFormParams(...formParams,
      params.map((param) =>
      (
        {
          id: param.id,
          message: ""
          }
      )
      )
      )
    }
    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      createNotification(formParams)
      .then((data) => {
      data.status == 201 ? setSbParams({variant: "success", content: "従業員に通知を送信しました。", open: true})
      :
      setSbParams({variant: "error", content: "失敗", open: true})
      })
      setOpen(false)
    }



    return (

        <>
        <Button 
          onClick={handleOpen}
          size="large"
          variant="contained" 
          color="error" 
          >
          　　　連絡　　　
        </Button>


        <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
      
          <Typography  variant="h6" component="h2">
            <form onSubmit={handleSubmit}>   
                {[1,2].map((param) => {
                    return (
                    // <MessageForm 
                    //   id={param.id}
                    //   name={param.name}
                    //   key={param.id}
                    //   formParams={formParams}
                    //   setFormParams={setFormParams} 
                    // />
                    <MessageForm 
                      id={param}
                      name={param}
                      key={param}
                      formParams={formParams}
                      setFormParams={setFormParams} 
                    />
                    )
                  
                })}
                <Button 
                fullWidth sx={{my:2}} 
                color="success" 
                size="midium"
                variant="contained" 
                type="submit">
                  送信
                </Button>
            </form> 
          </Typography>
        </Box>
      </Modal>

        
        </>
    )
}