import { Button, FormControl, Stack, TextField } from "@mui/material";
import React, { useState, useContext } from "react"
import { createCalendarEvent, deleteCalendarEvent, updateCalendarEvent } from "../apis/calendar";
import { CalendarEventTypes } from "../components/calendars/CalendarEventTypes";
import { CalendarDatePicker } from "../components/calendars/CalendarDatePicker";

import {SnackbarContext} from "../contexts/snackBar"

export const CalendarForm = ({
    eventId,
    initialParams,
    setOpen, 
    setEvent,
    setInitial,
    }) => {
      
    const [params, setParams] = useState(initialParams);
    const [value, setValue] = useState(initialParams.color);
    const sb = useContext(SnackbarContext);
  

    const handleChange= (e) => {
      setParams({...params, [e.target.name]: e.target.value})
    }

    
    const eventEdit = () => {
      updateCalendarEvent(eventId,params)
      .then(res => {
        setEvent(res.data.events)
        setInitial(res.data.events)
      })
      sb.setSnackBar({variant:"success", open:true, content:"イベントを削除しました"})
      setOpen(false)
    }
  

    const eventDelete = () => {
      deleteCalendarEvent(eventId)
      .then(res => {
        setEvent(res.data.events)
        setInitial(res.data.events)
      })
      sb.setSnackBar({variant:"error", open:true, content:"イベントを削除しました"})
      setOpen(false)
    }
  
    const eventCreate = (e) => { 
        e.preventDefault()
        try{
        createCalendarEvent(params)
        .then(res => {
          setEvent(res.data.events)
          setInitial(res.data.events)
        })
         setOpen(false)
         sb.setSnackbar({variant:"success", open:true, content:"イベントを作成しました"})
        }
         catch(e){console.log(e.message)}
      }
  
    const SelectEventType = () => {
      
      const handleSelect = (e) => {
        setValue(e.target.value)
        setParams({...params, color: e.target.value});
      };
    
      return (
        <CalendarEventTypes
          value={value}
          handleChange={(e) => handleSelect(e)} />
      )
      
    }
  
    return (
      <div>   
      <FormControl variant="standard">
        <TextField
          margin="normal"
          type="text" 
          value={params.title}
          name="title"
          label="イベント名"
          size="small"
          onChange={handleChange}
        />
        <TextField
         margin="normal"
         type="text"
         value={params.start}
         disabled
         name="start"
         label="開始日"
         size="small"
        />
        
        <CalendarDatePicker
        params={params} setParams={setParams} />
       
         <TextField
          margin="normal"
          fullWidth
          value={params.description}
          name="description"
          onChange={handleChange}
          placeholder="詳細"
          multiline
          rows={3}
        />

        <SelectEventType />
        {
          eventId ?
          <>
            <Stack sx={{p:1}} spacing={3} direction="row">
            <Button
            size="small"
            variant="contained" 
            color="success"
            onClick={eventEdit}
            >
              　　　編　集 　　
          </Button>
            <Button 
            size="small"
            variant="contained" 
            color="error" 
            onClick={() =>{
              if (confirm("イベントを削除しますか？"))
              {eventDelete()}
            }}
          >
          　　　削　除　　　
        </Button>
        </Stack>
          </>
        :
        <Button
        size="medium"
        variant="contained" 
        color="primary"
        onClick={eventCreate}
        >
            作　成
        </Button>

        }
        </FormControl>
  </div>
  
    )
  }