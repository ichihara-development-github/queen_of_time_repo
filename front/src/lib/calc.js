
const calcAssignCount = (shifts, time) => {
  let count = {early:0, mid: 0, late:0};
   
    
  if(!shifts){return count}
  
  shifts.forEach(elm => {
    const st = Math.ceil(elm.attendance_time)
    const en = Math.ceil(elm.leaving_time)
    const shift = [...Array(en-st)].map((_, i) => i+st)

    count = {
    early: count.early + Number(shift.some(el => time.early_time.includes(el))),
    mid: count.mid + Number(shift.some(el => time.mid_time.includes(el))),
    late: count.late + Number(shift.some(el => time.late_time.includes(el)))
    }
  })

  return count;
}

export {calcAssignCount};