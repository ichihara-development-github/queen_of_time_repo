import React from "react";
import { Task } from "./Task";
import { DragDropContext, Droppable } from "react-beautiful-dnd";


export const Tasks = ({taskList,settaskList}) =>{

    const reorder=(taskList, startIndex, endIndex)=>{
        const remove = taskList.splice(startIndex, 1);
        taskList.splice(endIndex, 0, remove[0])


    };

    const handleDragEnd=(result)=>{
        reorder(taskList, result.source.index, result.destination.index);
        settaskList(taskList);

    }
    return (
    <div>
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {taskList.map((task, index)=>(
                            <div key={task.startIndex}>
                            <Task 
                                index={index}
                                task={task} 
                                taskList={taskList} 
                                settaskList={settaskList}/
                            >
                        </div>

                        ))}

                    </div>
                         )}
                
            </Droppable>

        </DragDropContext>
        
    </div>
    );
}