import React, { Fragment, useEffect, useState, useReducer, useContext } from 'react';
import {socket, joinedSocket} from "../server/socket";

import { ChatMessages } from '../components/chats/ChatMessages'
import { ChatInput } from '../components/chats/ChatInput';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Chip, CircularProgress, Drawer, ListItemAvatar, Switch } from '@mui/material';
import { fetchMessages, createMessage, deleteMessage } from '../apis/chat';
import Stack from '@mui/material/Stack';
import { ChatReducer, initialState } from '../reducers/chat';
import { FormControlLabel, FormGroup } from '@material-ui/core';

import { Link, useHistory } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';

import { Avatar, AvatarGroup, ListItem, ListItemIcon, ListItemText } from "@mui/material"

import MainImage from '../images/cake.jpeg';


import Typography from '@mui/material/Typography';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';

import { fetchRooms } from '../apis/room';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { AuthContext } from '../contexts/auth';
import { AddChatRoom } from '../components/chats/AddChatRoom';
import { textAlign } from '@mui/system';

const welcomeStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  height: 400,
  maxWidth: "95%",
 
}

export const Chat = () => {
 
const [state, dispatch] = useReducer(ChatReducer, initialState);

const [rooms, setRooms] = useState([{id:1,name:"room1"},{id:2,name:"room2"}]);
const [selected, setSelected] = useState({id: "",name:""});
const [open, setOpen] = useState(true);
const auth = useContext(AuthContext);

  const sendMessage = (id, content) => {
   
    createMessage(id, content)
    .then((res) => {
      socket.emit("SEND_MESSAGE", res.data.message);
      joinedSocket.emit("SEND_PUSH", res.data.message);
    })
    .catch(e => console.log(e))
  }

  
  const cancelSend = (roomId, id) => {
    deleteMessage(roomId, id)
    .then(res => {
      if(res.status !== 200){return}
      dispatch({
        type: "REMOVE",
        id: id
      })
      socket.emit("CANCEL_MESSAGE", roomId, id);
    })

  }



  const handleSelect = (id) => {
    dispatch({type: "FETCHING"})
    fetchMessages(id)
    .then((res) => {
      setSelected({id: id, name: res.data.companion})
      dispatch({
        type: "FETCH_END", 
        payload: res.data.messages})
    })
  }

useEffect(() => {

  (async()=>{
    
  socket.on("RECIEVE_MESSAGE",(message)=>{
    console.og("add")
    dispatch({
      type: "ADD",
      message: message
    })
  })

  
  socket.on("REMOVE_MESSAGE",(id)=>{
    console.log("sub")
    dispatch({
      type: "REMOVE",
      id: id
    })
  })

  fetchRooms()
  .then((res) => {
    console.log(res.data)
    setRooms(res.data.rooms)
    auth.setState({...auth.state, tempId: res.data.tempId})
  })

})();

return ()=> {
  auth.setState({...auth.state, tempId: "" })};
  
},[])

const drawerWidth = 240;
const responsiveWidth = window.innerWidth > 768 ? drawerWidth : 0;
console.log(responsiveWidth)

return (
 
    <Box 
      sx={{p:1}}
      >
     
      <AppBar
        position="fixed"
        sx={{ width: "100%", marginLeft: responsiveWidth}}
      >
        <Stack direction="row" alignItems="center" justifyContent="center">
          <h4>{selected.name}</h4>  
          <FormControlLabel
          style={{marginLeft: "auto"}}
            control={
              <Switch onChange={()=>setOpen(!open)} checked={open} color="default"/>
            } 
            label="メニュー"
            labelPlacement="start" />   
          
        </Stack>
       
      </AppBar>
      
         <Drawer
           sx={{
            width: responsiveWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width:  drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
        <Box
      
        >
      <List sx={{ width: '100%', bgcolor: 'background.paper'}}>
      　{auth.state.chief ?  
      <ListItem>
        <AddChatRoom setRooms={setRooms}/>
      </ListItem>
      :
      ""
      }
      {rooms.map((room, index) => (
        <div key={index}>
         <ListItem button onClick={()=>handleSelect(room.id)}>
        <ListItemAvatar>
        <Avatar
          src={room.image || MainImage}
          alt={room.name}
        />
      
        </ListItemAvatar>
        <ListItemText primary={room.name}/>
      </ListItem>
        <Divider variant="inset" component="li" />
        </div>
      )
      )}
    </List>
         
  </Box>
  　{auth.state.chief ?
      <div style={{position:"fixed", bottom:10, left:10, zIndex:1300}}>
        <Link to="/Dashboard">
        <Chip
          label="管理画面"
          color="success"
          variant="outlined"
          deleteIcon={ <DashboardCustomizeOutlinedIcon/>}
        />
        </Link>
      </div>
      :
      ""
      }
    </Drawer>
    <Box style={{
        width: `calc(100% - ${responsiveWidth}px)`,
        marginLeft: `${responsiveWidth}px`
    }}
    >   
        
      {
        selected.id?
        
        <>

          {state.fetchState === "FETCHING"?
           <CircularProgress
              style={{width: "80px", height: "80px", margin: "180px auto"}}
              color="inherit"/>
              :
            <>
            <div style={{height: 450,maxWidth: 700}}>
            <ChatMessages 
              selected={selected}
              messages={state.messageList} 
              setMessage={dispatch}
              cancelSend={cancelSend }
            />
             
            <ChatInput
              selected={selected}
              sendMessage={sendMessage}
              />
            </div>
    
          </>
      }
      </>
     
      :
      <div style={welcomeStyle}>
         <ChatOutlinedIcon /> 
          <Typography variant="h5">
            ルームをクリックして会話を始めましょう！
          </Typography>
          
      </div>
      } 
      </Box>
      
    </Box>
    
  
);

  
}