import { useState } from 'react'
import './App.css'
import React from 'react';

function App() {
  const [task, setTask] = useState()
  const[list, setList] = useState([])
  const onClick = () => {
    setList([...list, task]);
  }
  const onChange = (e) => {
    setTask(e.target.value)
  }

  return (
    <>
      <div className='board-comp'>
        <div className='header'>
          <p className='title'>To-Do List</p>
          <div className='input-container'>
            <input className='input' placeholder="Add a new task" onChange={onChange} />
            <button className='button' onClick={onClick}>Add</button>
          </div>
          {
            (list.length === 0) ? <p className='noTask'>No tasks yet. Add one above!</p> : 
            list.map((task, index) => (
              <div key={index}>
                <p className='task'>{task}</p>
                
              </div>
            ))
          }
        </div>
        <div className='footer'>
          <p>Powered by </p>
          <a href="https://pinebaatars.pinecone.mn/">Pinecone Academy</a></div>
      </div>
    </>
  )
}

export default App
