import React, { useEffect, useReducer, useState } from "react"

import { Button, Stack } from "@mui/material";
import { AttendanceModal } from "../components/attendances/AttendanceModal";
import { AttendanceReducer, initialState } from "../reducers/attendances";
import { AttendanceGraph } from "../components/attendances/AttendanceGraph";
import { fetchManageAttendance } from "../apis/attendance";
import { approveRequest } from "../apis/timestamp";

const SCALE = 4;


export const ManageAttendance = ({
  setOpenState,
  badge,
  setBadge,
  setSbParams
}) => {

  //----------------------state----------------

const [checked, setChecked]= useState([]);
const [state, dispatch] = useReducer(AttendanceReducer, initialState);

const handleCheck = (e) => {
    
  if (e.target.checked){
    setChecked([...checked,
    {id: e.target.id,
    name: e.target.name}])
 
  }else{
    var filtered = checked.filter(elm => {
      return elm.id != e.target.id
    })
    setChecked(filtered)
  } 
} 


const approvTimecard = () => {
  var ids = checked.map(elm => elm.id)
  try {
    dispatch({type: "FETCHING"});
    approveRequest(ids).then((data) => {
    dispatch({type: "FETCH_END",
    payload: {
        attendances: data.attendances
    }})
    setSbParams({variant: "error", content: "承認できませんでした", open: true})
  })
  }catch (e){
    console.log(e.message);
  }

}


  useEffect(() => {
    try {
      dispatch({type: "FETCHING"});
      fetchManageAttendance()
      .then((res) => {
        console.log(res.data)
      dispatch({type: "FETCH_END",
      payload: {
          attendances: res.data.attendances
      }
    })
    setBadge({...badge,
       attendance: res.data.attendances.filter(elm => elm.confirmed == false).length})
  })
    }catch (e){
      console.log(e.message);
    }
  },[]);

      return(
      <>      
      <div style={{ height: 450, width: '95%', margin: 30 }}>
            
          <AttendanceGraph 
            state={state} 
            setOpenState={setOpenState} 
            setChecked={setChecked}
            handleCheck={handleCheck}
          />
          <Stack sx={{p:1}} spacing={2} direction="row">
          <Button 
              size="large"
              variant="contained" 
              color="success"
              disabled={checked.length == 0}
              onClick={() => 
                {if (confirm("選択中の勤怠を承認しますか？"))
                {approvTimecard()}
              }}

              >
              　　　承　認　　　
          </Button>

          <AttendanceModal 
            params={checked} 
            setSbParams={setSbParams}
          />

          </Stack>

      </div>

      
      </>

    )
}