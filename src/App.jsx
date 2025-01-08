import React, { useState } from 'react'
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

function App() {
  const [task, setTask] = useState('')
  const [list, setList] = useState([])
  const [error, setError] = useState('')
  const [filter, setFilter] = useState("All")
  const [logs, setLogs] = useState([])

  const onChange = (e) => {
    setTask(e.target.value)
  }

  const onClick = () => {
    if (task.length === 0) {
      setError(true)
    } else {
      setError(false);
      const newTask = { description: task, id: uuidv4(), status: "Active", }
      const newLogs = { taskDescription: newTask.description, status: "Active", id: newTask.id, logs: [{ status: 'Active', time: moment().format('MMM Do YYYY, h:mm a') }] }
      setList([...list, newTask])
      setLogs([...logs, newLogs])
      setTask("")
    }
  }

  const handleCheckBox = (id) => {
    setList(list.map((task) => {
      if (task.id !== id) return task

      const newStatus = task.status === "Completed" ? "Active" : "Completed"
      return { ...task, status: newStatus }
    }))

    setLogs(logs.map((log_item) => {
      if (log_item.id !== id) return log_item

      const newStatus = log_item.status === "Completed" ? "Active" : "Completed"
      const newEl = { ...log_item, status: newStatus, logs: [...log_item.logs, { status: newStatus, time: moment().format('MMM Do YYYY, h:mm a') }] }
      return newEl
    }))
  }



  const handleDeleteButton = (id) => {
    const updatedLogs = logs.map((el) => {
      if (el.id !== id) return el
      return { ...el, status: "Deleted", logs: [...el.logs, { status: 'Deleted', time: moment().format('MMM Do YYYY, h:mm a') }] }
    })
    setLogs(updatedLogs)

    const newTasks = list.filter((el) => {
      return el.id !== id
    });

    setList(newTasks);
  }

  const handleClearButton = () => {

    setLogs(logs.map((log_item) =>{
      if(log_item.status !== "Completed") return log_item
      return {...log_item, status: "Completed and Deleted", logs: [...log_item.logs, { status: "Completed and Deleted", time: moment().format('MMM Do YYYY, h:mm a') }
        ],
      };
    }))

    

    const newTasks = list.filter(list => list.status !== "Completed")
    setList(newTasks);
  }

  const handleFilterState = (state) => { setFilter(state) }

  const completedTasks = list.filter((task) => task.status === 'Completed').length === 0
  const activeTasks = list.filter((task) => task.status === 'Active').length === 0
  const allTask = list.length === 0
  const filteredLogs = logs.length === 0
  const filteredStatus = () => {
    if (filter === "Active" && activeTasks) {
      return <p className='noTask'>No active tasks found.</p>
    }
    else if (filter === "Completed" && completedTasks) {
      return <p className='noTask'>No completed tasks found.</p>
    }
    else if (filter === "All" && allTask) {
      return <p className='noTask'>No tasks yet. Add one above!</p>
    } else if (filter === "Logs" && filteredLogs) {
      return <p className='noTask'>No logs found.</p>
    } else {
      return null
    }
  }

  const checkedTask = list.filter((task) => task.status === "Completed").length;
  const totalTask = list.length;


  return (
    <>
      <div className='board-comp'>
        <div className='header'>
          <p className='title'>To-Do List</p>
          <div className='input-container'>
            <input className='input' value={task} placeholder="Add a new task..." onChange={onChange} />
            <button className='button' onClick={onClick}>Add</button>
          </div>
          <div className='filter-container'>
            <div className={`filter ${filter === "All" ? "active" : ""}`} onClick={() => handleFilterState("All")} >All</div>
            <div className={`filter ${filter === "Active" ? "active" : ""}`} onClick={() => handleFilterState("Active")}>Active</div>
            <div className={`filter ${filter === "Completed" ? "active" : ""}`} onClick={() => handleFilterState("Completed")}>Completed</div>
            <div className={`filter ${filter === "Logs" ? "active" : ""}`} onClick={() => handleFilterState("Logs")}>Logs</div>
          </div>
          <div className='task-container'>
            {filteredStatus()}
            {(filter === "Logs") ?
              logs.map((list, index) => (
                <div key={index} className='log-container'>
                  <p className='log-title'>Task: {list.taskDescription}</p>
                  {list?.logs?.map((log, index) => (
                    <div key={index} className='log-item'>
                      <p className='log-text'>STATUS:{log.status}</p>
                      <p className='log-text'>Date:{log.time}</p>
                    </div>
                  ))}
                </div>
              )) : null
            }
            {
              list.filter((list) => {
                if (filter === "Active") {
                  return list.status === "Active"
                } else if (filter === "Completed") {
                  return list.status === "Completed"
                } else if (filter === "Logs") {
                  return null
                } else { return true }
              }).map((task, index) => (
                <div key={index} className='task'>
                  <div className='task-item'>
                    <input type="checkbox" name="checkbox" checked={task.status === "Completed"} onChange={() => handleCheckBox(task.id)} />
                    <p className='task-text'>{task.description}</p>
                  </div>
                  <div className='delete-btn' onClick={() => handleDeleteButton(task.id)}>
                    Delete
                  </div>
                </div>

              ))
            }
            {(list.length !== 0) ?
              <div className='summary-container'>
                <div className='summary-text'>{checkedTask} of {totalTask} tasks completed</div>
                <div className='clear-summary' onClick={() => handleClearButton()}>Clear completed</div>
              </div> : null
            }
          </div>

        </div>
        <div className='footer'>
          <p>Powered by </p>
          <a href="https://pinebaatars.pinecone.mn/">Pinecone Academy</a></div>
      </div>
    </>
  )
}

export default App
