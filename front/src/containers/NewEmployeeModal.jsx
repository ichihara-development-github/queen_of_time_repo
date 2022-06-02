import React from 'react';

import { useState, useEffect, useRef, useContext } from 'react';

import Button from '@mui/material/Button';

import { sendEmployeeParams } from '../apis/employees';
import { DefaultModal } from '../components/shared/DefaultModal';

import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

import { SnackbarContext } from '../contexts/snackBar';

import { DefaultSteps } from '../components/shared/DefaultSteps';
import { NewEmployeeForm } from '../components/employees/NewEmployeeForm';
import { NewShiftForm } from '../components/shifts/NewShiftForm';
import { NewRoomForm } from '../components/chats/NewRoomForm';
import { createRoom } from '../apis/room';
import { Box, Modal } from '@mui/material';

    
const steps = [
  '従業員登録',
  'シフト作成',
  'チャットルーム作成',
];



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  maxWidth: 700,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};




export const NewEmployeeModal = ({state, dispatch}) =>{

  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState("false");
  const [stepIndex, setStepIndex] =useState(0)

  const sb = useContext(SnackbarContext);
 
    const sendParams = (params) => {
      try {
        sendEmployeeParams(params)
        .then(res=> {
          if(res.status !== 201){
            return
          }
          dispatch({
            type: "FETCH_END",
            payload:res.data.employees
          })
          sb.setSnackBar({open: true, variant:"success", content: "従業員を作成しました"})
          setStepIndex(stepIndex + 1)
      })
      }
      catch(e){console.log(e.message)}
    }
    
    const sendShiftParams = (params) => {
      setLoading(true)
      assignShift(params)
      .then(res => {
          if(res.status !== 201){
              sb.setSnackBar({open: true, color:"error",content:"エラーが発生しました。"})
              setOpen(false)
              return
          }
          dispatch(re.data.shifts)
          sb.setSnackBar({open: true, color:"success",content:"シフトを作成しました。"})
          setLoading(false)
          
      })
  }

  const sendRoomParams = (params) => {
     
    createRoom(params)
    .then(res => {
      if(!res.status === 201){
        return false
      }
      setLoading("false")
      sb.setSnackBar({open: true, variant:"success",content:"新しいチャットを作成しました。"})
    })

  }

    
const stepComponents = [ 

  <NewEmployeeForm
  sendParams={sendParams}
  requestStatus={state.FETCH_STATE}
  />,
  <NewShiftForm
   sendShiftParams={sendShiftParams}
   date={new Date()}
   loading={loading}
   />,
  <NewRoomForm
  sendRoomParams={sendRoomParams}
  loading={loading}
  setLoading={setLoading}
  />


]

 


  const content = (
    <>
      <DefaultSteps 
      steps={steps} 
      state={stepIndex}
     />
     {stepComponents[stepIndex]}
     <Button variant="outlined" onClick={() => setStepIndex(stepIndex+1)}>
       +

     </Button>
     <Button variant="outlined" onClick={() => setStepIndex(stepIndex-1)}>
       -

     </Button>
    
     </>

  
  )

    return (
      <>
    
         <Button 
          style={{marginRight:0}}
          variant="contained" 
          color="success" 
          endIcon={<PersonAddAltOutlinedIcon />} 
          onClick={() => {setOpen(true)}}
          >
           新規登録
         </Button>
         <Modal
          open={open}
          onClose={()=> setOpen(false)}
          >
        <Box sx={style}>
            {content}
        </Box>
          </Modal>
      </>

    )

}