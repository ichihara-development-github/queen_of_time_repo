var express = require("express");

var server = require("http").createServer(express);
const { Server } = require("socket.io");
var io =  new Server(server)

server.listen(5000);

const currentJoinRoom = io.of("/current");
const joinedRoom = io.of("/joined");

currentJoinRoom.on("connect", function(socket){
    console.log("connected current room")

    socket.on("join",function(roomId){
        socket.join(`room_${roomId}`);
    });

    socket.on("leave",function(roomId){
        socket.leave(`room_${roomId}`)
      
    });
    
    socket.on("SEND_MESSAGE",function(message){
        console.log("send")
        io.of('/current').in(`room_${message.room_id}`).emit("RECIEVE_MESSAGE", message)
    });

    
    socket.on("CANCEL_MESSAGE",function(roomId,id){
        console.log("cancel send")
        io.of('/current').in(`room_${roomId}`).emit("REMOVE_MESSAGE", id)
    });

    socket.on("disconnect", function(){
        console.log("disconnected");
    });
})


joinedRoom.on("connection", function(socket){
    socket.emit("getJoinedIds")
    console.log("joined")

    socket.on("reConnect", function(ids){
        ids.map(id => socket.join(`room_${id}`))
        // console.log(socket.rooms)
    })
   
    socket.on("join",function(roomId){
        socket.join(`room_${roomId}`);
        // console.log(socket.rooms)
      
    })

    socket.on("SEND_PUSH",function(message){
        console.log("push")
        console.log(socket.rooms)
        socket.broadcast.to(`room_${message.room_id}`).emit("PUSH_MESSAGE", message)
    })

})
