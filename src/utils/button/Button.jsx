import React from "react";

const Button = (props) => {
    return (
        <button type={props.type ? props.type : 'button'} onClick={props.onClick} className={props.className}>{props.content}</button>
    )
}

export default Button;