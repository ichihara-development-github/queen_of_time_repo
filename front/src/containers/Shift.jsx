import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { deleteShift, determineShifts, fetchSubmittedShifts } from "../apis/shifts";
import { SnackbarContext } from '../contexts/snackBar';
import { ShiftEdit } from "./ShiftEdit";

export const Shift = () => {

const [value, setValue] = useState();
const [loading, setLoading] = useState(false)
const sb = useContext(SnackbarContext);

const undo = () => {
  fetchSubmittedShifts()
  .then(res =>  setValue(res.data.shifts))
}

  
const updateShifts = (params) => {
  setLoading(true)
  determineShifts(params)
  .then((res) => {
        if(res.status === 200){
          setValue(res.data.shifts)
          sb.setSnackBar({open: true, variant:"success",content:"シフトを確定しました。"})
        }
      })
  setLoading(false)
}


  const  unassignShift = (id) => {
    setLoading(true)
    deleteShift(id)
    .then(res => {
      if(res.status !== 200){
        sb.setSnackBar({open: true, color:"error",content:"エラーが発生しました。"})
        return
      }
      setValue(res.data.shifts)
      sb.setSnackBar({open: true, color:"success",content:"シフトの削除が成功しましtた。"})
    })
    setLoading(false)

  }




useEffect(() => {
  try {
      fetchSubmittedShifts()
      .then((res) => {
      setValue(res.data.shifts)
})
} 
catch(e){
  console.log(e)
}

},[])

  return (
    <>
    {
    value ?

    <div>
      <ShiftEdit
        value={value}
        loading={loading}
        setLoading={setLoading}
        undo={undo}
        updateShifts={updateShifts}
        unassignShift={unassignShift}
      />
    </div>
    :
    <CircularProgress
    style={{display:"block",width: "80px", height: "80px", margin: "180px auto"}}
    color="inherit"/>
  
}

    </>
    

  )

}