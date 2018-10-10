import React from 'react';
import { Table, Button, Alert} from 'antd';

import { Input } from 'antd';




const TodoList = ({tasks, onRemove, onToggle, onEdit}) => {

    const columns = [{
        title: "Task",
        dataIndex: 'task',
        key: 'task',
        render: (text,record) => {
            if(record.isEditing){
                return (
                    <Input
                        size="large"
                        value={text}
                        onChange={(e) => onEdit(e.target.value,record.key)}
                        onPressEnter={ () => onToggle(record.key,'isEditing')}
                    />
                )
            } else {
                return (
                    <h1>{text}</h1>
                )
            }

        }
    },{
        title: "Done",
        dataIndex: "done",
        key: "done",
        render: text => {
            if(text){
                return (
                    <Alert message="Done" type="success" />
                )
            } else {
                return (
                    <Alert message="Not done" type="error" />
                )
            }
        }
    },{
        title: "Remove",
        dataIndex: "key",
        key: 'key',
        render: text => <Button type="danger" size="large" onClick={ () => onRemove(text) } icon="close">Remove</Button>
    },{
        title: "toggle",
        dataIndex: "key",
        key: "x",
        render: (text, record) => {
            if(record.done){
                return (
                    <Button type="info" size="large" onClick={ () => onToggle(text,'done') } icon="meh">Undo</Button>
                )
            } else {
                return (
                    <Button type="primary" size="large" onClick={ () => onToggle(text,'done') } icon="fire">Do</Button>
                )
            }
        }
    },{
        title: "Edit",
        dataIndex: "key",
        key: 'z',
        render: text => <Button type="default" size="large" onClick={ () => onToggle(text,'isEditing') } icon="setting">Edit</Button>
    }];


    return(
        <Table dataSource={tasks} columns={columns} pagination={false} />
    );
};

export default TodoList;

