import '../App.css'
import moment from 'moment';

const TaskCard = (props) => {
    const { list, logs, setList, setLogs, filter } = props;

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

    return (
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
    )
}
export default TaskCard;