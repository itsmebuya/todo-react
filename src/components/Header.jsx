import '../App.css'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Messages from './Messages';
import Log from './Log';
import TaskCard from './TaskCard';

const Header = (props) => {
    const { task, setTask, setList, setLogs, setFilter, filter, list, logs} = props;

    const onChange = (e) => {
        setTask(e.target.value)
    }

    const onClick = () => {
        if (task.length !== 0) {
            const newTask = { description: task, id: uuidv4(), status: "Active", }
            const newLogs = { taskDescription: newTask.description, status: "Active", id: newTask.id, logs: [{ status: 'Active', time: moment().format('MMM Do YYYY, h:mm a') }] }
            setList([...list, newTask])
            setLogs([...logs, newLogs])
            setTask("")
        }
    }
    const handleFilterState = (state) => { setFilter(state) }

    return (
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
                <Messages filter={filter} list={list} logs={logs} />
                <Log filter={filter} logs={logs} />
                <TaskCard list={list} logs={logs} setList={setList} setLogs={setLogs} filter={filter} />
            </div>
        </div>
    )
}
export default Header;