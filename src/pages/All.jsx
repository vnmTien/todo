import React from "react";

const All = ({ index, item, checkJob }) => {
    return (
        <div className="task-list">
            <div className="task-item" key={index} id={item.id}>
                <div className="list-container">
                    <input type="checkbox" className='task-checkbox' id={item.id} onClick={(e) => checkJob(item, e)} checked={item.isChecked} />
                    <div className="task-text">{item.job}</div>
                </div>
            </div>
        </div>
    )
}

export default All