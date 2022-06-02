import React from "react"
import { Modal}  from '@mui/material';
import { Box } from '@mui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

export const CalendarModal = ({
    open={open},
    setOpen={setOpen},
    handleClose={handleClose},
    content={content}
}) => {

    return (
        <Modal
        open={open}
        onClose={handleClose}
      >   
        <Box sx={style}>
            {content}
        </Box>
      </Modal>
        

    )
}