const Messages = (props) => {
    const { filter, list, logs } = props;

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

    return (
        filteredStatus()
    )
        
}
export default Messages