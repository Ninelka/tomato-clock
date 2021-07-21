import React from 'react'
import './current-timer.scss'

const convertTime = (timer) => {
    let minute = Math.floor(timer / 60);
    if (minute < 10) minute = '0' + minute;

    let second = timer - 60 * minute;
    if (second < 10) second = '0' + second;

    return `${minute}:${second}`;
}

function CurrentTimer(props) {
    return (
        <div className={props.status ? 'current-timer is-running' : 'current-timer'}>
            <div className='current-timer__container'>
                <span>{props.timeLabel}</span>
                <h1 id="time-left" className="current-timer__value">{convertTime(props.currentTime)}</h1>
                <div>
                    <button className="btn" onClick={props.start}>
                        <i className={props.status ? 'fas fa-pause' : 'fas fa-play'}></i>
                    </button>
                    <button className="btn" onClick={props.reset}>
                        <i className="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CurrentTimer