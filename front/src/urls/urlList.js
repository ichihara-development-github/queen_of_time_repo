
const ORIGIN_HOST = "http://localhost:3000"

const DEFAULT_API_HOST = `${ORIGIN_HOST}/api/v1`

//----------------get--------------------

export const employeesList = 
`${DEFAULT_API_HOST}/employees`

export const submittedShiftList = 
`${DEFAULT_API_HOST}/organizations/employees_shifts`


export const myShifts =
`${DEFAULT_API_HOST}/employees/shifts`


export const assignMember = (date) => 
`${DEFAULT_API_HOST}/employees/shifts/assign_member/${date}`


export const calendarList =  
`${DEFAULT_API_HOST}/organizations/calendars`


export const manageAttendance = 
`${DEFAULT_API_HOST}/organizations/manage_timestamps`


export const attendanceList = 
`${DEFAULT_API_HOST}/employees/timestamps`


export const notificationList =  
`${DEFAULT_API_HOST}/employees/notifications`


export const initialNotifications = 
`${DEFAULT_API_HOST}/employees/initial_notifications`


export const allNotifications = 
`${DEFAULT_API_HOST}/employees/notifications/all_notifications`



export const timestampStandby =
`${DEFAULT_API_HOST}/employees/timestamps/new`


export const roomList = 
`${DEFAULT_API_HOST}/rooms`


export const inviteEmployees = 
`${DEFAULT_API_HOST}/rooms/invite_employees`


export const messageList = (room_id) =>
`${DEFAULT_API_HOST}/rooms/${room_id}/messages`



//----------------put-------------------


export const newSession =
`${DEFAULT_API_HOST}/login`


export const newEmployee = 
`${DEFAULT_API_HOST}/employees`


export const newCalendar = 
`${DEFAULT_API_HOST}/organizations/calendars`

export const newShifts =
`${DEFAULT_API_HOST}/employees/shifts/new`


export const newTimestamp =  
`${DEFAULT_API_HOST}/employees/timestamps`


export const newNotification = 
`${DEFAULT_API_HOST}/employees/notifications`


export const newMessage =
`${DEFAULT_API_HOST}/messages`


export const assign =
`${DEFAULT_API_HOST}/employees/shifts/assign`




//----------------patch-------------------

export const modulateTimestamp = 
`${DEFAULT_API_HOST}/employees/timestamps/modulate_timestamps`


export const approveTimestamp =
`${DEFAULT_API_HOST}/timestamps/approve`


export const updateCalendar = (eventId) => 
`${DEFAULT_API_HOST}/organizations/calendars/${eventId}`

export const updateNotification =
`${DEFAULT_API_HOST}/employees/notifications/update_notification_read`


export const determineShift =
`${DEFAULT_API_HOST}/employees/shifts/determine_shifts`






//----------------delete-------------------


export const removeEmployee = (Id) => 
`${DEFAULT_API_HOST}/employees/${Id}`



export const removeSession = () => 
`${DEFAULT_API_HOST}/logout`


export const deleteCalendar = (Id) => 
`${DEFAULT_API_HOST}/organizations/calendars/${Id}`


export const removeShift = (Id) => 
`${DEFAULT_API_HOST}/employees/shifts/${Id}`


//---------------------------------
export const currentSession = () => 
`${DEFAULT_API_HOST}/check_session`


