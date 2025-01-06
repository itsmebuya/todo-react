import React, { useState } from 'react'
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [task, setTask] = useState('')
  const [list, setList] = useState([])
  const [error, setError] = useState('')
  const [filter, setFilter] = useState("All")

  const onChange = (e) => {
    setTask(e.target.value)
  }

  const onClick = () => {
    if (task.length === 0) {
      setError(true)
    } else {
      setError(false);
      setList([...list, { description: task, status: "Active", id: uuidv4() }])
      setTask("")
    }

  }
  const handleCheckBox = (id) => {
    const tasks = list.map((task) => {
      // console.log(id)
      if (task.id === id) {
        return { ...task, status: task.status === "Completed" ? "Active" : "Completed" }
      }
      else {
        return task;
      }
    })
    setList(tasks);
  }

  const handleFilterState = (state) => [
    setFilter(state)
  ]
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
          </div>
          <div className='task-container'>
            {
              (list.length === 0) ? <p className='noTask'>No tasks yet. Add one above!</p> :
                list.filter((list) => {
                  if (filter === "Active") {
                    return list.status === "Active"
                  } else if (filter === "Completed") {
                    return list.status === "Completed"
                  } else { return true }
                }).map((task, index) => (
                  <div key={index} className='task'>
                    <div className='task-item'>
                      <input type="checkbox" name="checkbox" checked={list.status === "Completed"} onChange={() => handleCheckBox(task.id)} />
                      <p className='task-text'>{task.description}</p>
                    </div>
                    <div className='delete-btn'>
                      Delete
                    </div>
                  </div>
                ))
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
