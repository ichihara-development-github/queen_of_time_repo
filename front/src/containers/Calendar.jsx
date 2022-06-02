import React, { useEffect, useState, useContext } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"
import { Box } from '@mui/system';
import timeGridPlugin from '@fullcalendar/timegrid';
import "react-datepicker/dist/react-datepicker.css";
import { Button, FormLabel, Switch, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { CalendarModal } from '../components/calendars/CalendarModal';
import { CalendarForm } from './CalendarForm';
import { CalendarEventTypes } from '../components/calendars/CalendarEventTypes';
import { fetchCalendars } from '../apis/calendar';
import { calcAssignCount } from '../lib/calc';
import { ConfigContext } from '../contexts/config';
import { CalendarShifts } from '../components/calendars/CalendarShifts';
import { formattedDate } from '../lib/calcDate';

const shiftColor = "gray";

let content = "";


export const Calendar = ({setOpenState}) => {

  const [initial, setInitial] = useState();
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState();
  const [shift, setShift] = useState([])
  const [overlay, setOverlay]= useState(true);

  const time = useContext(ConfigContext).params.bussinessTime;

  let initialParams = {title:"",description:"",start:"",end:"",color:"red"};

  const handleEventClick = (e) => {
    const ev = e.event;

    initialParams = {title: ev.title,
                   description: ev.extendedProps.description,
                   start: ev.start,
                   end: ev.end,
                   color: ev.backgroundColor
                  }
      
        ev.backgroundColor === shiftColor ?
        content = <CalendarShifts 
                    shifts={shift[formattedDate(ev.start)]}
                    count={ev.title}
                    setOpenState={setOpenState}
                   />
        :
        content = (
            <CalendarForm  
            eventId={event.id}
            initialParams={initialParams}
            setOpen={setOpen} 
            setEvent={setEvent}
            setInitial={setInitial}
            />       
        )
    
    setOpen(true)   
  }

  const handleDateClick = (e) => {
   setOpen(true)
   content = (
    <CalendarForm 
      initialParams={{...initialParams,start:e.dateStr}}
      setOpen={setOpen} 
      setEvent={setEvent}
      setInitial={setInitial}
      />
    )
  }

  const countToEvent = (shifts) => {
  

    const events = Object.keys(shifts).map(
      function(key){
        const count = calcAssignCount(shifts[key], time);

        return {
          title:` 🌤${count.early} ☼${count.mid} ☾${count.late}`,
          start: key,
          color: shiftColor
        }
          })

    return events;
  }

    
useEffect(() => {
  fetchCalendars()
  .then((res) => {
    setEvent(res.data.events)
    setShift(res.data.shifts)
    setInitial(res.data.events)
  })
  
  
},[]);


    return (
    <> 
      {event ? 
      <div>
        <FormLabel >表示項目</FormLabel>
        <Stack direction="row" alignItems="center">
           
              <CalendarEventTypes
                initial={initial}
                setEvent={setEvent}
              />
          <Stack 
            style={{marginLeft: "auto"}}
            direction="row" 
            spacing={2} 
            alignItems="center"
          >
              <Switch 
                checked={overlay}
                onChange={()=>setOverlay(!overlay)}
              />
              <Typography variant="subtitle1">シフト反映</Typography>

          </Stack>

        
        </Stack>
      
         <FullCalendar
            plugins={[dayGridPlugin,interactionPlugin,timeGridPlugin ]}
            headerToolbar={{
              center: 'dayGridMonth,timeGridWeek'
            }}
            initialView="dayGridMonth"
            locale="ja" 
            dayMaxEvents
            contentHeight={700}
            events={
              overlay ? [...countToEvent(shift),...event] : event}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
          />

      </div>
      
      :
        <Skeleton variant="rectangular" width="100%" height={480} />
      
      }

      <CalendarModal
        open={open} 
        setOpen={setOpen}
        handleClose={()=>setOpen(false)}
        content={content}
        
        />
    
      </>
 
    
    )
}