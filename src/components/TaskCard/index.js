import { BsThreeDots } from "react-icons/bs"
import './index.css'
import { useState } from "react"
import TodoContext from "../../context/TodoContext"
import Popup from "reactjs-popup"
import EditTodoItem from "../EditTodoItem"

const taskTypes = [
    {id:'WORK',type:'work', color:'#D2CEFF', active: false},
    {id:'STUDY',type:'study', color:'#D1E5F7', active: false},
    {id:'ENTERTAINMENT',type:'entertainment', color:'#FFCECE', active: false},
    {id:'FAMILY',type:'family', color:'#DAF2D6', active: false}
]

const TaskCard = props => {
    const [displayEditAndDeleteCard, setDisplayEditAndDeleteCard] = useState(false)

    const {eachTask} = props

    const {id, title, description, typeOfTask, taskDone} = eachTask
    const typeOfTasks = taskTypes.filter(eachTask => typeOfTask.includes(eachTask.id))

    const eAndDCard = displayEditAndDeleteCard? null:'hideCard'
    const isTaskDone = taskDone? 'taskDone': null

    return (
        <TodoContext.Consumer>
            {
                props => {
                    const {setTaskStatus, deleteTodoFunc} = props
                    const onClickThreeDots = () => {
                        setDisplayEditAndDeleteCard(!displayEditAndDeleteCard)
                    }
                
                    const onChangeTaskStatus = () => {
                        setTaskStatus(id)
                    }

                    const onTodoDelete = () => {
                        setDisplayEditAndDeleteCard(!displayEditAndDeleteCard)
                        deleteTodoFunc(id)
                    }

                    return (
                        <li className="taskCard">
                            <div className="titleCard">
                                <h1 className={`${isTaskDone}`}>{title}</h1>
                                <button type="button" onClick={onClickThreeDots}><BsThreeDots /></button>
                                <div className={`editAndDelete ${eAndDCard}`}>
                                    <Popup
                                        modal
                                        trigger = {
                                            <button type="button">Edit...</button>
                                        }
                                    >
                                        {
                                            close => (                                                
                                                <EditTodoItem todoItem={eachTask} close={close} onClickThreeDots={onClickThreeDots}  />
                                            )
                                        }
                                    </Popup>
                                    <hr/>
                                    <button type="button" onClick={onTodoDelete}>Delete</button>
                                </div>
                            </div>
                            <p className={`${isTaskDone}`}>{description}</p>
                            <div className="taskTypeAndTaskStatus">
                                <ul className="taskSpecificTypes">
                                    {
                                        typeOfTasks.map(eachTask => (
                                            <span key={eachTask.id} style={{backgroundColor:eachTask.color}}></span>
                                        ))
                                    }
                                </ul>
                                <div className="taskStatus">
                                    <input type="checkbox" id={id} checked={taskDone} onChange={onChangeTaskStatus} />
                                    <label htmlFor={id} style={{color: taskDone? 'black':''}} >Done</label>
                                </div>
                            </div>
                        </li>
                    )
                }
            }
        </TodoContext.Consumer>

    )
}

export default TaskCard