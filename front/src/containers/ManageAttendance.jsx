import React, { useEffect, useReducer, useState } from "react"

import { Button, CircularProgress, List, Stack } from "@mui/material";
import { AttendanceReducer, initialState } from "../reducers/attendances";
import { AttendanceGraph } from "../components/attendances/AttendanceGraph";
import { approveRequest, fetchManageAttendance } from "../apis/attendance";
import { } from "../apis/timestamp";
import { SelectDate } from "../components/shared/SelectDate";

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
const [list, setList] = useState([]);
const [loading, setLoading] = useState(false);

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


const approveTimecard = () => {
  setLoading(true)
  var ids = checked.map(elm => elm.id)
  try {
    approveRequest(ids)
    .then(res => {
      if(res.status !== 200){
        setSbParams({variant: "error", content: "承認できませんでした", open: true})
        setLoading(true)
        return
      }
      setList(res.data.attendances)
      setSbParams({variant: "success", content: "勤怠を承認しました", open: true})
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
      dispatch({type: "FETCH_END",
      payload: res.data.attendances
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
        <Stack sx={{my:2}} direction="row">
        <SelectDate 
          list={state.attendanceData}
          setList={setList}
          />
          <Button 
            style={{marginLeft: "auto"}}
            variant="contained" 
            color="success"
            disabled={(checked.length == 0 || loading)}
            onClick={() => 
              {if (confirm("選択中の勤怠を承認しますか？"))
              {approveTimecard()}
            }}
            endIcon={loading ? <CircularProgress sx={{width: "1rem", height: "1rem"}} />:""}

            >
            　　　承　認　　　
        </Button>


        </Stack>

        
            
          <AttendanceGraph 
            state={state.fetchState} 
            list={list}
            handleCheck={handleCheck}
          />

      </div>

      
      </>

    )
}