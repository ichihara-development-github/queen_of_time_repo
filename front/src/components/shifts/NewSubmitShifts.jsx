import { Button, Chip, CircularProgress, Divider, List, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SubmitFeed } from "../../components/shifts/SubmitFeed";
import { submitShifts } from "../../apis/shifts";
import { useEffect, useState } from "react";

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { getMonAndDate } from "../../lib/calcDate";
import { fetchNewShifts } from "../../apis/shifts";

const style = {
    zIndex:100, 
    backgroundColor:"white",
    width:"100%", 
    height: "100%",
    position:"absolute",
    top:0

}

const chipStyle = {
    position: 'fixed',
    bottom: 30,
    left: 20,
    zIndex:200 
}

export const NewSubmitShifts = ({
    times,
    list,
    setList
}) => {
 
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    
    const sendNewShifts = (e) => {
        e.preventDefault();
        submitShifts(list)
        .then(res => {
            res.status == 201?
            setOpen(false)
            :
            ""
        }
            
            )
        setLoading(false)

    }

    const NewShifts = () => (
         <>
         <Box style={style}>
         {list.size > 0 ?
          <form  onSubmit={e=>sendNewShifts(e)}>  
           <List style={{height:450,overflow:"scroll"}}>
               {list.map((elm,index) => 
               <div key={index}>
                  
                   <ListItem sx={{height:60}}>
                      <SubmitFeed
                          elm={elm}
                          times={times} 
                          list={list} 
                          setList={setList}
                      />
                  </ListItem>
                  <Divider/> 
         
       
              </div>
               )}
           </List>
            <Button
              fullWidth
              type="submit" 
              color="success" 
              variant="contained" 
              margin="normal"
              endIcon={loading &&<CircularProgress/>}
              onClick={()=> {if (confirm("シフトを提出しますか？")){
                 setLoading(true)
              }}}
              >
                  提　出 
            </Button>
            </form>
    
       :
       <Typography variant="h5">
           現在提出可能なシフトはありません
       </Typography>
        }

       </Box>
       <Chip
           style={chipStyle}
           onClick={()=>setOpen(!open)}
           size="medium"
           label="戻る"
           variant="outlied"
            />  
        </>
    )

   
    useEffect(() => {

        fetchNewShifts()
        .then(res => setList(res.data.dates))

    },[])

    
  
  return (
      <>
      {
          open?
          <NewShifts/>
          :
          <Chip
          sx={chipStyle}
          onClick={()=>setOpen(!open)}
          size="medium"
          label="新規提出"
          color="secondary" 
          variant="contained" 
          icon={<AddBoxOutlinedIcon/>}
      />  
      }
      </>
        
    
        
    )

}
