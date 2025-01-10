import React, { useState } from 'react'
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [task, setTask] = useState('')
  const [filter, setFilter] = useState("All")
  const [logs, setLogs] = useState([])
  const [list, setList] = useState([])

  return (
    <>
      <div className='board-comp'>
        <Header task={task} setTask={setTask} setList={setList} setLogs={setLogs} setFilter={setFilter} filter={filter} list={list} logs={logs} />
        <Footer list={list} setList={setList} setLogs={setLogs} logs={logs} />
      </div>
    </>
  )
}

export default App