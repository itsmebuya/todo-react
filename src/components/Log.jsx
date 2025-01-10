import "../App.css"

const Log = (props) => {
    const {filter, logs } = props;


    return (
        (filter === "Logs") ?
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
    )
}
export default Log