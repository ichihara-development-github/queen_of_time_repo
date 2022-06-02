const getMonAndDate = (date, separater="/") => {
  return `${date.getMonth() + 1}${separater}${date.getDate()}`
}


const formattedTime = (param, text) => {
  if (!param){return null}

  var date = new Date(param * 1000);
  var hour = date.getHours();
  var minute = date.getMinutes();

  return (`${text || ""}${hour.toString().padStart(2,"0")}:${minute.toString().padStart(2,"0")}`)
}

const formattedDate = (date) => 
`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2,"0")}-${date.getDate().toString().padStart(2,"0")}`

export {getMonAndDate, formattedTime, formattedDate};