import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ModeEditIcon from '@mui/icons-material/ModeEdit';

export const CalendarDatePicker  = ({params, setParams}) => {
    const [endDate, setEndDate] = useState(new Date)

    const handleChange = (date) => {
        console.log(date)
        setEndDate(date)
        setParams({...params, end: date})
    }


    return (
        <DatePicker 
        customInput={
            <TextField
                margin="normal"
                size="small"
                fullWidth
                label="終了日"
            />
        }      
        dateFormat="yyyy-MM-dd"
        minDate={new Date()}
        selected={endDate} 
        onChange={handleChange} />
    )


}