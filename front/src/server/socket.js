import io from "socket.io-client"
const ENDPOINT1 = "http://localhost:5000/current"
const ENDPOINT2 = "http://localhost:5000/joined"
let socket = io(ENDPOINT1, { transports: ['websocket'] })
let joinedSocket = io(ENDPOINT2, { transports: ['websocket'] })


export  {socket, joinedSocket};