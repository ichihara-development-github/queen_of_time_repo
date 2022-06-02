import axios from "axios";
import { assign, assignMember, determineShift, myShifts, newShift, newShifts, removeShift, submittedShiftList } from "../urls/urlList";

export const fetchSubmittedShifts = () => {
    return axios.get(submittedShiftList)
    .then(res => {
        return res
    })
}

export const fetchMyShifts = () => {
    return axios.get(myShifts)
    .then(res => {
        return res
    })
}

export const fetchNewShifts = () => {
    return axios.get(newShifts)
    .then(res => {
        return res
    })
    .catch((e) => console.log(e))
}


export const fetchAssignMember = (date) => {
    return axios.get(assignMember(date),)
    .then(res => {
        return res
    })
    .catch((e) => console.log(e))
}



export const submitShifts = (params) => {
    return axios.post(myShifts,{shifts: params})
    .then(res => {

        return res
    })
    .catch((e) => console.log(e))
}



export const assignShift = (params) => {
    return axios.post(assign,{shifts: params})
    .then(res => {

        return res
    })
    .catch((e) => console.log(e))
}



export const determineShifts = (params) => {
    return axios.patch(determineShift,{shifts: params})
    .then(res =>{
        return res})
    .catch((e) => console.log(e))
}

export const deleteShift = (id) => {
    return axios.delete(removeShift(id))
    .then(res =>{
        return res})
    .catch((e) => console.log(e))
}