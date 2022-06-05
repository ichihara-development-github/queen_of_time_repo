import { IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

import CancelIcon from '@mui/icons-material/Cancel';

export const Task = ({
    task,
    taskList,
    setTaskList,
    index
}) =>{

    const handleDelete = () => {
        setTaskList(taskList.filter(elm => elm.id !== task.id));
    };

    
    
    return (
    <Draggable 
        index={index}
        draggableId={task.draggableId}
    >
        {(provided) => (
            <Paper
            key={task.id} 
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="taskContent"
                >
                <Stack 
                    sx={{width:"100%"}}
                    direction="row" 
                    alignItems="center"
                >
                    <Typography variant="h6">{task.text}</Typography>
                    <IconButton style={{marginLeft: "auto"}} onClick={handleDelete}>
                        <CancelIcon />
                    </IconButton>

                </Stack>
        </Paper>
        )}
        
    </Draggable>

    
    );
}