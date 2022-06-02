import axios from "axios";
import { messageList, newMessage } from "../urls/urlList"

export const fetchMessages = (id) => {
    console.log(id)
    return axios.get(messageList(id))
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}


export const  createMessage = (id,params) => {
   
    return axios.post(messageList(id),{messages: params})
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}
