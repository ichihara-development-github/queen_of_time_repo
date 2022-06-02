import React ,{ useState } from "react";
import { Draggable } from "react-beautiful-dnd";
// import { TaskAddInput } from "./input/TaskAddInput";
// import { TaskCardDeleteButton } from "./TaskCardDeleteButton";
import { TaskCardTitle } from "./TaskCardTitle";
import { TaskAddInput } from "./TaskInputForm";
import { Tasks } from "./Tasks";

export const TaskCard = ({
    taskCardsList, 
    setTaskCardsList, 
    taskCard, 
    index,
}) =>{
    const [inputText, setInputText] = useState("");
    const [taskList, settaskList] = useState([]);


    return (
        <Draggable draggableId={taskCard.draggableId} index={index}>
            {(provided) => (
                <div 
                    className="taskCard" 
                    ref={provided.innerRef} 
                    {...provided.draggableProps}
                >
                    <div
                    className="taskCardTitleAndTaskCardDeleteButtonArea"
                    {...provided.dragHandleProps}
                    >
                        <TaskCardTitle/>
                        {/* <TaskCardDeleteButton 
                            taskCardsList={taskCardsList}
                            setTaskCardsList={setTaskCardsList} 
                            taskCard={taskCard}
                        /> */}
                    </div>
                    <TaskAddInput
                    inputText={inputText}
                    setInputText={setInputText}
                    settaskList={settaskList}
                    taskList={taskList}
                    />
                    <Tasks 
                    inputText={inputText} 
                    taskList={taskList} 
                    settaskList={settaskList}/>

                </div>
            )}

        </Draggable>
    );
};