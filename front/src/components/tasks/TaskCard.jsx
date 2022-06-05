import { Box, Card, IconButton } from "@mui/material";
import React ,{ useState } from "react";
import { Draggable } from "react-beautiful-dnd";
// import { TaskAddInput } from "./input/TaskAddInput";
// import { TaskCardDeleteButton } from "./TaskCardDeleteButton";
import { TaskCardTitle } from "./TaskCardTitle";
import { TaskAddInput } from "./TaskInputForm";
import { Tasks } from "./Tasks";

import DeleteIcon from '@mui/icons-material/Delete';


const title = ["掃除","洗濯","料理","仕事"]
const init = title.map((t,index) => ({ id: index,
    draggableId: `${index}`,
    text: t})
    )


export const TaskCard = ({
    taskCardsList, 
    setTaskCardsList, 
    taskCard, 
    index,
}) =>{

    const [inputText, setInputText] = useState("");
    const [taskList, setTaskList] = useState([]);

    const handleDeleteCard = () => {
       setTaskCardsList(taskCardsList.filter(t => t.id !== taskCard.id))
    }


    return (
        <Draggable draggableId={taskCard.draggableId} index={index}>
            {(provided) => (
                <div 
                    ref={provided.innerRef} 
                    {...provided.draggableProps}
                    className="taskCard"
                >
                    <div
                    {...provided.dragHandleProps}

                    >
                     <IconButton 
                        style={{position:"absolute", top:0, right:0}}
                        onClick={handleDeleteCard}
                        >
                         <DeleteIcon/>
                    </IconButton>
                    <TaskCardTitle/>
                    </div>
                    <Tasks 
                        inputText={inputText} 
                        taskList={taskList} 
                        setTaskList={setTaskList}
                    />
                    <TaskAddInput
                    inputText={inputText}
                    setInputText={setInputText}
                    setTaskList={setTaskList}
                    taskList={taskList}
                    />

                </div>
            )}

        </Draggable>
    );
};