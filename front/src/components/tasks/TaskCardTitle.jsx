import React from "react";
import { useState } from "react";
export const TaskCardTitle = () =>{
    const [isClick, setIsClick] = useState(false);
    const [inputCardTitle, setInputCardTitle] = useState("Today");
    const handleClick=()=>{
        setIsClick(true);
        console.log(isClick);
    };

    const handleChange= (e) =>{
        setInputCardTitle(e.target.value);
        console.log(inputCardTitle);
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        setIsClick(false);
    };

    return (
    <div onClick={handleClick}>
       {isClick? (<form onSubmit={handleSubmit}><input type="text" onChange={handleChange}/></form>)
        :  
        (<h3>{inputCardTitle}</h3>)}
    </div>
    );
}