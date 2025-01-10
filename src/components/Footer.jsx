import Button from "./Button";
import "../App.css";
import moment from "moment";

const Footer = (props) => {
    const { list, setList, setLogs, logs } = props;
    const checkedTask = list.filter((task) => task.status === "Completed").length;
    const totalTask = list.length;

    const handleClearButton = () => {
        setLogs(logs.map((log_item) => {
            if (log_item.status !== "Completed") return log_item
            return {
                ...log_item, status: "Completed and Deleted", logs: [...log_item.logs, { status: "Completed and Deleted", time: moment().format('MMM Do YYYY, h:mm a') }
                ],
            };
        }))
        const newTasks = list.filter(list => list.status !== "Completed")
        setList(newTasks);
    }
    return (
        <>
            {(list.length !== 0) ?
                <div className='summary-container'>
                    <div className='summary-text'>{checkedTask} of {totalTask} tasks completed</div>
                    <div className='clear-summary' onClick={() => handleClearButton()}>Clear completed</div>
                </div> : null
            }
            <div className="footer">
                <p>Powered by </p>
                <a href="https://pinebaatars.pinecone.mn/">Pinecone Academy</a>
            </div>

        </>
    );

};
export default Footer;