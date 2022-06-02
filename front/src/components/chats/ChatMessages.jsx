import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import { joinedSocket, socket } from "../../server/socket";

import ChatTemplate from "./ChatTemplate"

export const ChatMessages = ({messages, selected}) => {

    const auth = useContext(AuthContext);

    const setJoinedIds = (id) => {
        if(!sessionStorage.getItem("qotRoomIds")){
            sessionStorage.setItem("qotRoomIds",id)
            return 
        } 
        if(sessionStorage.getItem("qotRoomIds").length > 1) {
         let roomIds2 = [id,...JSON.parse(sessionStorage.getItem("qotRoomIds"))]
            roomIds2 = [...new Set(roomIds2)]
            sessionStorage.setItem("qotRoomIds",JSON.stringify(roomIds2))
        }else{
                let roomIds1 = [id,JSON.parse(sessionStorage.getItem("qotRoomIds"))]
                roomIds1 = [...new Set(roomIds1)]
                sessionStorage.setItem("qotRoomIds",JSON.stringify(roomIds1))
            }
            console.log(sessionStorage)
        }
       

    const joinRoom = (id) => {
        socket.emit("join", id)
        joinedSocket.emit("join", id)
        setJoinedIds(id)
    }

    const leaveRoom = (id) => {
        socket.emit("leave", id)
    }

    useEffect(() => {
        
    (async()=>joinRoom(selected.id))();
    return ()=> leaveRoom(selected.id);
            
    },[messages])


    return (
        
        messages.map((message, index) => {

            const side = message.employee_id === auth.state.tempId ? "right" : "left";
            const time = `${("00" + new Date(message.created_at).getHours()).slice(-2)} :
             ${("00" + new Date(message.created_at).getMinutes()).slice(-2)}`

            return (
            <div key={index}>
                <ChatTemplate
                    messages={[message.content]}
                    side={side}
                    time={time}
                />
           
        </div>
        )
    })
    
    )

}