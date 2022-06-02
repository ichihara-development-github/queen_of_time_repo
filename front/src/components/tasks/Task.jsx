import React from "react";
import { Draggable } from "react-beautiful-dnd";

export const Task = (props) =>{

    console.log(props);

    const task = props.task;
    const taskList = props.taskList;
    const settaskList = props.setTaskList;
    const index = props.index;

    
    console.log(taskList);

    const handleDelete = (id) => {
        settaskList(taskList.filter(() => task.id !== id));
    };

    
    
    return (
    <Draggable index={index} draggableId={task.draggableId}>
        {(provided) => (
            <div 
                className="taskBox" 
                key={task.id} 
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
            <p className="taskText">{task.text}</p>
            <button className="taskTrashButton" onClick={()=> handleDelete(task.id)}>
                <i className="fas fa-trash-alt">☑</i>
            </button>
        </div>
        )}
    </Draggable>

    
    );
}