import React from 'react'
import './settings.scss'

class Settings extends React.Component {
    render() {
        return (
            <div className="setting">
                <h3 className="setting__title" id={this.props.labelID}>{this.props.title}</h3>
                <button disabled={this.props.status} className="setting__btn btn" id={this.props.incrementID} onClick={this.handleClick} onClick={this.props.increment}>
                    <i className="fas fa-plus"></i>
                </button>
                <span className="setting__value" id={this.props.valueID}>{this.props.time}</span>
                <button disabled={this.props.status} className="setting__btn btn" id={this.props.decrementID} onClick={this.props.decrement}>
                    <i className="fas fa-minus"></i>
                </button>
            </div>
        )
    }
}

export default Settings