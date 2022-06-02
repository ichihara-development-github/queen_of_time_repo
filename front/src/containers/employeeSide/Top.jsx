import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { TimeStamp } from './TimeStamp';
import { EmployeeAttendance } from './EmployeeAttendance'
import { Notification } from '../Notification';
import { SnackbarContext } from '../../contexts/snackBar';
import { AuthContext } from '../../contexts/auth';
import { Button } from '@mui/material';
import { EmployeeShifts } from './EmployeeShift';
import { Redirect } from 'react-router-dom';

const style= {
  position: 'fixed',
  bottom: 20, 
  right: 20, 
  zIndex:200,
  marginTop: 30

}

export const EmployeeTop = () => {
    const [openState, setOpenState] = useState("attendance");
    
    const sb = useContext(SnackbarContext);
    const auth = useContext(AuthContext)

const actions = 
  !auth.state.chief ? 
  [
    { icon: <PersonOutlineOutlinedIcon />  , name: 'profile',value: "情報設定" },
    { icon: <AccessTimeOutlinedIcon /> , name: 'timestamp',value: "打刻画面" },
    { icon: <ListAltIcon />, name: 'attendance', value: "打刻履歴" },
    { icon:  <ChatOutlinedIcon />   , name: 'chat',value: "チャット" }
  ]
  :
  [
  { icon: <PersonOutlineOutlinedIcon />  , name: 'profile',value: "情報設定" },
  { icon: <AccessTimeOutlinedIcon /> , name: 'timestamp',value: "打刻画面" },
  { icon: <ListAltIcon />, name: 'attendance', value: "打刻履歴" },
  { icon: <BadgeOutlinedIcon /> , name: 'shift',value: "シフト" },
  { icon:  <ChatOutlinedIcon />   , name: 'chat',value: "チャット" }
  ]
;
    const SwitchRender = () => {
      

        switch(openState){  
            case "chat":
              return (<Redirect to="/chat"/>)
            case "shift":
              return (<EmployeeShifts/>)
            case "attendance":
              return (<EmployeeAttendance  setOpenState={setOpenState}/>)
            case "timestamp":
              return (<TimeStamp />)
            case "notification":
              return (<Notification />)
        
      }
    }
    

  return (
  <>     
        <SwitchRender/>

        <Box sx={style}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          icon={<SpeedDialIcon openIcon={<ModeEditIcon />} />}
        >
    
          {actions.map((action) => (
            <SpeedDialAction
              onClick={() =>  {setOpenState(action.name)}}
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.value}
            />
          ))}
        </SpeedDial>
      </Box>
  
  </>
   
  );
}

