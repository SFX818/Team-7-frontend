import React from 'react'

const Button = (props) => {
    return (
        <button
        className="btn btn-default"
        onClick={props.handleClick}>{props.label}</button>
    )
}

export default button