import axios from "axios";
import { attendanceList, attendanceMonthly, manageAttendance } from "../urls/urlList"

export const fetchManageAttendance = () => {
    return axios.get(manageAttendance)
    .then(res => {
        return res
    })
    .catch((e) => console.log(e))
}


export const fetchAttendance = () => {
    return axios.get(attendanceList)
    .then(res => {
        return res
    })
    .catch((e) => console.log(e))
}
