
import React, { useEffect, useReducer, useState, useMemo } from "react";
import { deleteEmployee, fetchEmployees } from "../apis/employees";

import { employeesReducer, initialState} from "../reducers/empoyees";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Button from '@mui/material/Button';
import ListSubheader from '@mui/material/ListSubheader';
import { NewEmployeeModal } from "./NewEmployeeModal";
import { Stack, Grow, ImageListItem, ImageListItemBar, IconButton, ButtonBase, Paper, Divider, ListItemButton, ListItemAvatar, Avatar } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';

import Image1 from "../images/moomin.jpeg";
import Image2 from "../images/mountain.jpg"
import Image3 from "../images/employee-default.jpg"


import Switch from '@mui/material/Switch';
import { Box } from "@mui/system";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { TextField } from "@material-ui/core";
import { useTextFilter } from "../customeHooks/hooks";

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
//----------------------icons-----------------------



const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
];

const deleteMesssage = ""
export const Employees = () => {


const [state, dispatch] = useReducer(employeesReducer, initialState);
const [selected, setSelected] = useState({id:"", name:"",admin:false,chief:false,active:true});
const [index, SetIndex] = useState(false);
const [text, setText] = useState();

const filtered = useTextFilter(state.employeeList, text);
const list = filtered.length > 0? filtered : state.employeeList

const handleDelete = () => {
  console.log("d")
  deleteEmployee(selected.id)
  .then(res => console.log(""))
}

const ShowImageList = () => (
  
    <ImageList cols={3} sx={{ width: "50%", height: "100%"}}>
    {
       list.map((elm,index) => 
     
        <ButtonBase key={index}>
        <ImageListItem onClick={()=>setSelected(elm)}>
      <img
        src={index % 2 === 0? Image1 : Image2}
        alt={index}
        loading="lazy"
      />
      <ImageListItemBar
        title={elm.name}
      />
    </ImageListItem>
      
      </ButtonBase>
        )
    }
    </ImageList>
)

const ShowList = () => (
  <List style={{ width: "50%", overflow:"scroll"}}>
     {list.map((elm,index) => 
      <ListItemButton
              key={index}
              sx={{width: 220}}
              selected={elm.id===selected.id}
              onClick={()=> setSelected(elm)}
            >
        <ListItemAvatar>
          <Avatar alt={elm.name} >
            {elm.name.slice(0,2)}
          </Avatar>
      
        </ListItemAvatar>
        <ListItemText primary={elm.name}/>
    </ListItemButton>
     )
    }
  </List>

)


    useEffect(() => {
     
      try {
        dispatch({type: "FETCHING"});
        fetchEmployees()
        .then(res => {
        dispatch({
          type: "FETCH_END",
          payload:  res.data.employees
        })
        })

      }catch (e){
        console.log(e.message);
      }

    },[]);


    return (
        <> 
         <NewEmployeeModal 
          state={state} 
          dispatch={dispatch}
        />
      <Box sx={{px:2 }}>
        <Stack sx={{my:2}} direction="row" spacing={2}>
        <Stack direction="row" alignItems="center">
        <ImageOutlinedIcon/>
          <Switch
            checked={index}
            onChange={()=> SetIndex(!index)}
          />
           <ListOutlinedIcon />
        </Stack>
        <TextField 
          variant="standard"
          placeholder="検索"
          onChange={e => setText(e.target.value)}
        />
      <div style={{marginLeft: "auto"}}>
       
      </div>
     


      </Stack>
      {
            (text && filtered.length < 1) &&  
            <h5 style={{color: "red"}}>見つかりませんでした。</h5>
      }
       
        <Stack sx={{height: 500}} direction="row" spacing={1}>
          {
            index?
            <ShowList/>
            :
            <ShowImageList/>
          }

       
        <Paper 
          sx={{position:"relative",p:1, width: "50%"}}
          elevation={2}
          >
          <Avatar 
            sx={{width:100, height:100, float:"right"}}
            variant="square" 
            src={Image3}/>
          <Typography variant="h4">{selected.name}</Typography><Divider/>
          <Typography component="h5">{selected.image}</Typography>
          {/* <Typography component="h5">{Number(selected.admin)}</Typography>
          <Typography component="h5">{Number(selected.chief)}</Typography>
          <Typography component="h5">{Number(selected.active)}</Typography> */}
          <div style={{position: "absolute", bottom:0}}>
          <Button 
            color="error" 
            variant="contained"
            size="large"
            onClick={()=>{
            if(confirm(deleteMesssage)){handleDelete()}
            }}>
            削除
          </Button>

          </div>
        </Paper>
  
        

        </Stack>
      </Box>
  
       </>
    )
}