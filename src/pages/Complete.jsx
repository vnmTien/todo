import React from "react";
import './complete.css';

const Complete = ({ index, item, checkJob, deleteJob }) => {
    return (
        <div className="task-list">
            <div className="task-item" key={index} id={item.id}>
                <div className="list-container-delete">
                    <input type="checkbox" className='task-checkbox' id={item.id} onClick={(e) => checkJob(item, e)} checked={item.isChecked} readOnly/>
                    <div className="task-text">{item.job}</div>
                    <button onClick={() => deleteJob(item.id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Complete