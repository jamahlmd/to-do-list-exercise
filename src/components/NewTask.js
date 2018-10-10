import React from 'react';

const NewTask = ({task}) => {

    if (task) {
        return (
            <div>
                <h1 className="newTask">{task}</h1>
            </div>
        )
    }


    return null;
};


export default NewTask;