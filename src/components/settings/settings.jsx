import React from 'react'
import './settings.scss'

function Settings(props) {
    return (
        <div className="setting">
            <h3 className="setting__title" id={props.labelID}>{props.title}</h3>
            <button disabled={props.status} className="setting__btn btn" id={props.incrementID} onClick={props.handleClick} onClick={props.increment}>
                <i className="fas fa-plus"></i>
            </button>
            <span className="setting__value" id={props.valueID}>{props.time}</span>
            <button disabled={props.status} className="setting__btn btn" id={props.decrementID} onClick={props.decrement}>
                <i className="fas fa-minus"></i>
            </button>
        </div>
    )
}

export default Settings