import React from "react";

const Input = (props) => {
    return (
        <input onChange={(event) => props.setValue(event.target.value) }
            value={props.value}
            className={"text-slate-700 outline-none border-b-2 mb-3 p-2 border-slate-500"+" "+ props.className}
            type={props.type}
            id={props.id}
            placeholder={props.placeholder}/>
    )
}

export default Input;