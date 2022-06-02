import { Checkbox, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import {useState} from "react";
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import { getMonAndDate } from "../../lib/calcDate";
import { DefaultModal } from "../shared/DefaultModal";

export const SubmitFeed = ({elm, times, list, setList}) => {
    

    const copy =  list.slice();
    const thisDate = copy.find(l=> l.date == elm.date)

    const [isClick, setIsClick] = useState(false);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState();
        
    
    const handleChange = (e) => {
       
        const name = e.target.name;
        const value = e.target.value;
       
        thisDate[name] = value
        setList(copy)
    }

    const handleRest = (e) => {
        thisDate.rest = e.target.checked
        setList(copy)
        setIsClick(false)

    }

    const SelectTimes = ()=>(
        <>
         <FormControl sx={{ minWidth: 80 }}>
        <InputLabel >出</InputLabel>
        <Select
            required
            disabled={thisDate.rest}
            name="attendance_time"
            label="出勤"
            value={thisDate.attendance_time}
            onChange={(e)=> handleChange(e)}
          
        >
            {  
                times.map((time,index) => (
                    <MenuItem key={index} value={time}>{time}
                    </MenuItem>
                ))  
            } 
        </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 80 }}>
        <InputLabel id="demo-select-small">退</InputLabel>
        <Select
            disabled={thisDate.rest}
            value={thisDate.leaving_time}
            name="leaving_time"
            label="退勤"
            onChange={(e)=>handleChange(e)}
           
        >
            {  
                times.map((time,index) => (
                    <MenuItem key={index} value={time}>{time}
                    </MenuItem>
                ))  
            } 

        </Select>

        </FormControl>
        </>
    )

    const content = (
        <>
        <TextField
            fullWidth
            name="comment"
            multiline
            rows={3}
            value={comment}
            defaultValue="備考"
            onChange={(e)=>setComment(e.target.value)}
            onBlur={()=>{thisDate.comment=comment}}
        />
        </>
    )


    return (
        <>
         {getMonAndDate(new Date(elm.date),"/")}
        <div style={{marginLeft:"auto"}}>  
        <Stack direction="row" spacing={1}>
            {isClick?
            <SelectTimes/>: 
            <Checkbox
            label="出勤" 
            icon={<>出勤</>}
            onChange={()=>setIsClick(true)}
            />
            }
        <Checkbox
            label="休" 
            name="rest"
            icon={<>休 <NotInterestedOutlinedIcon /></>}
            checkedIcon={<NotInterestedOutlinedIcon  
                style={{display:"block",height:"2rem",width: "2rem"}}
                        color="error"
                    />}
            onChange={(e)=> {handleRest(e)}}
            />
             <IconButton onClick={()=> setOpen(true)}>
                 <InsertCommentOutlinedIcon color={thisDate.comment&&"primary"} />
            </IconButton>
        </Stack>    
        <DefaultModal
            open={open} 
            setOpen={setOpen} 
            content={content}
        />
       
    </div>  

        </>
    

    )
} 
 