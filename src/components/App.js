import React, { Component } from 'react';
import '../App.css';

import Header from './Header';
import TodoList from './TodoList';
import NewTask from './NewTask';

import uuid from 'uuid';
import { Input,Modal, Row, Col } from 'antd';



const confirm = Modal.confirm;
const Search = Input.Search;

class App extends Component {
  state = {
    tasks: [],
    newTask: ''
  };

  componentDidMount(){
      try {
          const json = localStorage.getItem('savedTasks');
          const tasks = JSON.parse(json);

          tasks && this.setState({tasks});
      }
      catch (e){
          console.log(e);
      }
  }

  componentDidUpdate(prevProps, prevState){
      if(prevState.tasks !== this.state.tasks){
          const json = JSON.stringify(this.state.tasks);
          localStorage.setItem('savedTasks',json);
      }

  }

  handleAddNewTask = (task) => {
      this.setState( previousState => ({
          tasks: previousState.tasks.concat({
              key: uuid(),
              task: task,
              done: false,
              isEditing: false
          }),
          newTask: ''
      }));
  };

  handleCheckForDoubles = (task) => {

      if(task){
          if(this.state.tasks.find(todo => todo.task === task)){

              confirm({
                  title: task,
                  content: 'Is already in your todo-list. Do you still want to continue?',
                  okText: 'Add it anyway',
                  cancelText: 'Cancel',
                  onOk: () => this.handleAddNewTask(task),
                  onCancel() {},
              });

          } else {
              this.handleAddNewTask(task);

          }
      }
  };

  handleRemoveTask = (keyToRemove) => {
    this.setState( previousState => ({
       tasks: previousState.tasks.filter( (task) => task.key !== keyToRemove),
    }));


  };


  handleToggleTask = (keyFromTaskToToggle,property) => {
      this.setState( previousState => ({
          tasks: previousState.tasks.map( task => {
              if (task.key === keyFromTaskToToggle){
                  return {
                      ...task,
                      [property]: !task[property]
                  }
              }
              return task;
          })
      }));
  };

  handleEditTask = (edit, keyFromTaskToEdit) => {
      this.setState( previousState => ({
          tasks: previousState.tasks.map( task => {
            if(task.key === keyFromTaskToEdit){
                return {
                    ...task,
                    task: edit
                }
            }

            return task;
          })
      }));
  };


  render() {
      return (
      <div>
        <Header/>

          <div>
              <Row>
                  <Col md={{span: 16, offset:4}} xs={{span: 20, offset:2}}>
                      <TodoList tasks={this.state.tasks} onRemove={this.handleRemoveTask} onToggle={this.handleToggleTask} onEdit={this.handleEditTask}/>

                      <Search
                          style={{marginTop: 26}}
                          placeholder="Enter a new task"
                          size="large"
                          value={this.state.newTask}
                          onChange={(e) => this.setState({newTask: e.target.value})}
                          onSearch={value => this.handleCheckForDoubles(value)}
                      />

                      <NewTask  task={this.state.newTask}/>

                  </Col>
              </Row>
          </div>


      </div>
    );
  }
}

export default App;
