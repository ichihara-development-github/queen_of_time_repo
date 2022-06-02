import React, { Fragment, useEffect, useState, useReducer, useContext } from 'react';
import {socket, joinedSocket} from "../server/socket";

import { ChatMessages } from '../components/chats/ChatMessages'
import { ChatInput } from '../components/chats/ChatInput';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Chip, CircularProgress, Drawer, ListItemAvatar } from '@mui/material';
import { fetchMessages, createMessage } from '../apis/chat';
import Stack from '@mui/material/Stack';
import transitions from '@material-ui/core/styles/transitions';
import { ChatReducer, initialState } from '../reducers/chat';
import { FormControlLabel, FormGroup } from '@material-ui/core';

import icon from "../images/moomin.jpeg"
import { Link, useHistory } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

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

const initialConfig = {
  notification: true
}

export const Chat = () => {
 
const [state, dispatch] = useReducer(ChatReducer, initialState);

const [rooms, setRooms] = useState([{id:1,name:"room1"},{id:2,name:"room2"}]);
const [selected, setSelected] = useState({id: "",name:""});

const auth = useContext(AuthContext);

  const sendMessage = (id, content) => {
   
    createMessage(id, content)
    .then((res) => {
      socket.emit("SEND_MESSAGE", res.data.message);
      joinedSocket.emit("SEND_PUSH", res.data.message);
    })
    .catch(e => console.log(e))
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
    console.log("recieve")
    dispatch({
      type: "ADD",
      message: message
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

return (
 
    <Box  sx={{ display: 'flex' }} >
     
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <h4>{selected.name}</h4>
       
       
      </AppBar>
      
         <Drawer
           sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width:  drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open
        >
        <Box
        role="presentation"
        // onClick={()=>{setOpen(false)}}
        >
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
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
    </Drawer>
    <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        style={{position: "relative"}}
      >   
        
      {
        selected.id?
        
        <div>

          {state.fetchState === "FETCHING"?
           <CircularProgress
              style={{display:"block",width: "80px", height: "80px", margin: "180px auto"}}
              color="inherit"/>
              :
            <>
            <div style={{overflow: "scroll",width:"100%",height:430 }}>
            <ChatMessages 
            selected={selected}
            messages={state.messageList} 
            setMessage={dispatch}
          />
            </div>
              
            <ChatInput
            selected={selected}
            sendMessage={sendMessage}
            />
          </>
      }
      </div>
     
      :
      <div style={{paddingTop:100}}>
         <ChatOutlinedIcon /> 
          <Typography variant="h5" noWrap component="div">
            ルームをクリックして会話を始めましょう！
          </Typography>
          
      </div>
      } 
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
      
    </Box>
    
  
);

  
}