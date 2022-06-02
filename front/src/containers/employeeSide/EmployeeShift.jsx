
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';

import { useState, useEffect, useContext, useReducer } from "react";
import { useHistory } from 'react-router-dom';
import { ConfigContext } from "../../contexts/config"
import { fetchMyShifts } from "../../apis/shifts";
import { SnackbarContext } from "../../contexts/snackBar";
import { betweenDates, getMonAndDate } from "../../lib/calcDate";
import { DefaultModal } from "../../components/shared/DefaultModal";
import { initialState, ShiftReducer } from "../../reducers/shift";
import { Button, Chip, Divider, Stack, Typography } from "@mui/material";


import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BusinessIcon from '@mui/icons-material/Business';
import { CONFIRMED_COLOR, UNCONFIRMED_COLOR } from "../../components/const";

import { NewSubmitShifts } from "../../components/shifts/NewSubmitShifts";

const shifts = [{title:"9:00-17:00",description:"hogehoge",start:"2022-05-05",end:""}]
let content = "";

export const EmployeeShifts = () => {
    
    const [open, setOpen] = useState(false);
    const [list, setList] = useState([]);
  
    const [state, dispatch] = useReducer(ShiftReducer, initialState)
 
    const orgConfig = useContext(ConfigContext);
    const sb = useContext(SnackbarContext);

    const times = (() => {
        let time = [];
        for(let i=orgConfig.params.open; i <= orgConfig.params.close-1; i++){
            for(let j=0; j< 60; j+=30){
                time.push(`${i}:${("0"+j).slice(-2)}`)
            }
        }
        return time;
    })();

   
    const handleEventClick = (e) => {
        content = (
    
            <Stack spacing={2}>
            
                 <Typography variant="h3">
                    {getMonAndDate(e.event.start,"/")}
                 </Typography>
                 <Typography variant="h4">
                    {e.event.title}
                 </Typography>
                    
                 <Typography variant="h5">
                    備考： {e.event.extendedProps.description}
                 </Typography>
                 <div>
                    {e.event.backgroundColor == CONFIRMED_COLOR?
                    <h2 style={{color: CONFIRMED_COLOR}}>承認済み</h2>       :
                    <h2 style={{color: UNCONFIRMED_COLOR}} >承認待ち</h2>
                }
               
                </div>
                 <Button
                    sx={{ my:4}}
                    color="warning"
                    variant="contained" 
                >シフト時間について相談する
                </Button>  
                 <Divider/>
                 <Typography variant="h5">
                   <BusinessIcon />：株式会社
                 </Typography>
                 <Typography variant="h5">
                   <LocationOnIcon/>：東京都
                 </Typography>
                 <Typography variant="h5">
                   <LocalPhoneIcon/>：090-9999-9999
                 </Typography>
            </Stack>
           
        )
       
        setOpen(true)
    }

    
    useEffect(() => {
        dispatch({type: "FETCHING"})
        fetchMyShifts()
        .then(res => {
            dispatch({
                type: "FETCH_END",
                payload: res.data.shifts})
        })
    },[])

    return (
        <>   
        <FullCalendar
            plugins={[dayGridPlugin,interactionPlugin,timeGridPlugin ]}
            headerToolbar={{
            center: 'dayGridMonth'
            }}
            initialView="dayGridMonth"
            locale="ja" // 日本語化
            events={state.shiftList}
            eventClick={handleEventClick}
        />
        <NewSubmitShifts
            times={times}
            list={list}
            setList={setList}
             />

        <DefaultModal
            open={open} 
            setOpen={setOpen}
            content={content}
        />

        </>
    )
}
