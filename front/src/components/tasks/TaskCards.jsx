import { Button, Grid, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
// import {AddTaskCardButton} from "./button/AddTaskCardButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { AddTaskCardButton } from "./AddTaskCardButton";

import {TaskCard} from "./TaskCard"


export const TaskCards = () => {
    const [taskCardsList, setTaskCardsList] = useState([
        {
            id: 0,
            draggableId: "item0",
        },
    ]);

    const reorder=(taskCardsList, startIndex, endIndex)=>{
        const remove = taskCardsList.splice(startIndex, 1);
        taskCardsList.splice(endIndex, 0, remove[0])
    };


    const handleDragEnd = (result) => {
        console.log(result)
        reorder(taskCardsList, result.source.index, result.destination.index);
        setTaskCardsList(taskCardsList);
    };

    const saveTask = () => {
        console.log(taskCardsList)
    }


    return (
    <div className="taskCardsArea">
        <Stack 
        sx={{height:60,width:"100%"}} 
        direction="row"
        >
        <AddTaskCardButton
            taskCardsList={taskCardsList}
            setTaskCardsList={setTaskCardsList}
        />
        <Button 
            style={{marginLeft:"auto"}}
            color="success" 
            variant="contained"
            onClick={()=> {
                 if(confirm("タスクの状態を保存しますか？ \n ※削除されたタスクは復元されません")){
                    saveTask()
                  }
            }}
            >保存
        </Button>
       
        </Stack>
        
       <DragDropContext onDragEnd={handleDragEnd}>
           
           <Droppable droppableId="droppable" direction="horizontal">
              {(provided) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  >
                 <Grid 
                    container 
                    columns={{sm: 12, md: 12, lg: 12 }}
                    spacing={{sm: 4, md: 3, lg: 2 }} 
                    justifyContent="center"
                    alignItems="center"
                 >
                {taskCardsList.map((taskCard, index) => (
                  <Grid item  
                    key={index}
                    sm={12} md={6} lg={4}
                    >
                       <TaskCard
                            key={taskCard.id}
                            index={index}
                            taskCardsList={taskCardsList}
                            setTaskCardsList={setTaskCardsList}
                            taskCard={taskCard}
                        />
                  </Grid>
                  ))}

                </Grid>
                      
              </div>
              )}

           </Droppable>
        </DragDropContext>
        </div>


    )
}