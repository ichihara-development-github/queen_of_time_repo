import { TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";

export const TaskCardTitle = () =>{
    const [isClick, setIsClick] = useState(false);
    const [inputCardTitle, setInputCardTitle] = useState("タイトル");

    const handleClick=()=>{
        setIsClick(true);
        console.log(isClick);
    };

    const handleChange= (e) =>{
        setInputCardTitle(e.target.value);
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        setIsClick(false);
    };

    return (
    <div onClick={handleClick}>
       {isClick? 
        <form onSubmit={handleSubmit}>
            <TextField  style={{backgroundColor:"white"}}size="small" onChange={handleChange} />
        </form>
        :  
        (<Typography style={{textAlign:"center"}}variant="h5">
            {inputCardTitle}
        </Typography>)}
    </div>
    );
}