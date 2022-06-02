import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Image from "./mountain.jpg";
import { updateNotificationRead } from "../../apis/notification";


export const NotificationFeed = ({
    index,
    notification, 
    selected, 
    setSelected,
    badge,
    setBadge
}) => {

    const [read, setRead] = useState(notification.read);

    const handleClick = () => {
        setSelected(index)
        if(!read){
            updateNotificationRead(1,notification.id)
            .then((res) =>{
            setRead(true)
            setBadge({...badge,notification: res.data.notifications.length})
            })
    }
    }

    useEffect(() => {
        console.log("hoge")
        setRead(notification.read);
    },[])
    return (
    <div>
    <ListItem
        style={read ?  {backgroundColor: "rgb(180,180,180)"} : {}}
        button 
        selected={selected==index}
        onClick={() => handleClick()}
   >
        <ListItemIcon>
        <Avatar src={Image} />
    </ListItemIcon>
    <ListItemText primary={notification.title}/>
    <span>{new Date(notification.created_at).getHours().toString().padStart(2,"0")}:
          {new Date(notification.created_at).getMinutes().toString().padStart(2,"0")}
    </span>
    </ListItem>
    </div>
    )


}