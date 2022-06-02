import React from "react";
import { useState } from "react";
// import {AddTaskCardButton} from "./button/AddTaskCardButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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
        reorder(taskCardsList, result.source.index, result.destination.index);
        setTaskCardsList(taskList);

    };
    return (<>
       <DragDropContext onDragEnd={handleDragEnd}>
           
           <Droppable droppableId="droppable" direction="horizontal">
              {(provided) => (
                <div 
                  className="taskCardsArea" 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  >
                      
                  {taskCardsList.map((taskCard, index) => (
                      <TaskCard
                      key={taskCard.id}
                      index={index}
                      taskCardsList={taskCardsList}
                      setTaskCardsList={setTaskCardsList}
                      taskCard={taskCard} />
                  ))}
                  {/* <AddTaskCardButton 
                  taskCardsList={taskCardsList}
                  setTaskCardsList={setTaskCardsList}/> */}
              </div>
              )}

           </Droppable>
        </DragDropContext>
        </>


    )
}