import React, { useEffect, useReducer, useState } from "react"

import { Box, Button, Skeleton, Stack, Switch, Tooltip, Typography } from "@mui/material";
import { AttendanceGraph } from "../../components/attendances/AttendanceGraph";
import { fetchAttendance } from "../../apis/attendance";
import { AttendanceReducer, initialState } from "../../reducers/attendances";
import { RequestModal } from "./RequestModal";
import { SelectDate } from "../../components/shared/SelectDate";
import { AttendanceIndex } from "../../components/attendances/AttendanceIndex";
import { SelectMonth } from "../../components/shared/SelectMonth";


export const EmployeeAttendance = ({setSbParams}) => {

  //----------------------state----------------

const [open, setOpen] = useState(false);
const [list, setList] = useState();
const [checked, setChecked] = useState([]);
const [display, setDisplay] = useState(false)

const [state, dispatch] = useReducer(AttendanceReducer, initialState);


const handleCheck = (e) => {
  var id = e.target.id;
  var timestamp = state.attendanceData.find(elm => elm.id == id);
  
    
  if (e.target.checked){
    setChecked([...checked,timestamp])
  }else{
    var filtered = checked.filter(elm => 
      elm.id != id
    )
    setChecked(filtered)

  } 
} 

const handleSwitch = () => {
  setList(null);
  setDisplay(!display);
}
  

  useEffect(() => {
    dispatch({type: "FETCHING"})
    try {
      fetchAttendance()
      .then(res => {
        dispatch({type: "FETCH_END", payload: res.data.attendances})
        setList( res.data.attendances)
      }
    )
    }catch (e){
      console.log(e.message);
    }

  },[]);

  const Display = () => (
    <>
    {display ?
        <AttendanceGraph
          state={state.fetchState}
          list={list} 
          handleCheck={handleCheck}
        />
        :
        <Box sx={{ margin:"0 auto", maxWidth: 600}}>
        <AttendanceIndex
          state={state.fetchState}
          list={list} 
          checked={checked}
          handleCheck={handleCheck}
        />
        </Box>
      }
    </>
  )

      

      return(
      <>        
      <Box sx={{p: 2,height: 400}}>
            <Stack direction="row" alignItems="center">
              {display ?
              
              <SelectDate 
                list={state.attendanceData}
                setList={setList}
              />
              :
              <SelectMonth
                list={state.attendanceData}
                setList={setList}
              />
                }
              <div style={{marginLeft: "auto"}}>
                <Stack direction="row" alignItems="center">
                    <Switch
                      checked={display}
                      onChange={()=> handleSwitch()}
                    />
                  <Typography variant="h6">
                    日別
                  </Typography>
                </Stack>
              
              </div>
              </Stack>
              
                  <Button 
                    sx={{my:1, marginLeft:"auto"}}
                    size="large"
                    variant="contained" 
                    color="success"
                    disabled={checked.length == 0}
                    onClick={() => setOpen(true)}
                  >
                  　　　申請画面へ　　　
                </Button>
              
              {
                list ?
                <Display />
                :
                <Skeleton 
                height="100%"
                variant="rectangle" />
               }

            <RequestModal 
              open={open} 
              setOpen={setOpen} 
              params={checked}
              setSbParams={setSbParams} />
      </Box>
     
      </>

    )
}