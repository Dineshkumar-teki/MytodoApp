import { useState } from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import TaskCard from '../TaskCard'
import TodoContext from '../../context/TodoContext'
import './index.css'

const Home = () => {
    const [hideDoneTasks, setHideDoneTasks] = useState(false)
    const [activeTabItems, setActiveTabs] = useState([])

    const selectTabItem = id => {
        if (activeTabItems.includes(id)){
            const updatedActiveTabItems = activeTabItems.filter(eachTab => eachTab !== id)
            setActiveTabs([...updatedActiveTabItems])
        }else{
            setActiveTabs([...activeTabItems,id])
    }}

    const onChangeHideDoneTasks = () => {
        setHideDoneTasks(!hideDoneTasks)
    }

    const displayTaskList = (todoList) => {
        const filteredList = todoList.filter(eachTask => {
            const activeTabItemsSet = new Set(activeTabItems)
            const typeOfTaskSet = new Set(eachTask.typeOfTask)
            return activeTabItemsSet.isSubsetOf(typeOfTaskSet)
        })
        if (hideDoneTasks){
            const updatedTodoList = filteredList.filter(eachTask => !eachTask.taskDone)
            return (
                updatedTodoList.map(eachTask => (
                    <TaskCard key={eachTask.id} eachTask={eachTask} />
                )))
        }
        return (
            filteredList.map(eachTask => (
                <TaskCard key={eachTask.id} eachTask={eachTask} />
        )))
        
    }
    
    return (
        <TodoContext.Consumer>
            {
                props => {
                    const {todoList} = props
                    return(
                            <>
                                <Navbar/>
                                <section className='homePage'>
                                <aside>
                                    <Sidebar selectTabItem={selectTabItem} activeTabItems={activeTabItems} />
                                    <div className='hideTasksCheckbox'>
                                        <input id='hideDoneTasks' type="checkbox" onChange={onChangeHideDoneTasks} />
                                        <label htmlFor='hideDoneTasks'>Hide Done Tasks</label>
                                    </div>
                                    <img src="https://cdn.pixabay.com/photo/2017/08/18/12/19/reading-2654807_640.png" alt="Cartoonimg" className='cartoonImg' />
                                </aside>
                                <section className='taskSection'>
                                    {
                                        todoList.length > 0 ? (
                                            <ul className='tasks'>
                                                {
                                                    displayTaskList(todoList)
                                                }
                                            </ul>
                                        ) : (
                                            <div className='emptyTodoList'>
                                                <img src="https://img.freepik.com/free-vector/document-evaluation-verifying-approved-validating-signing-official-contact-agreement-businesswoman-cartoon-character-with-briefcase_335657-835.jpg?uid=R136712360&ga=GA1.1.1914382452.1716092979&semt=ais_hybrid" alt="emptyTodoList" />
                                                <p>
                                                    Your to-do list is clear and ready for new tasks. Let’s get started on something great!
                                                </p>
                                            </div>
                                        )
                                    }

                                </section>
                            </section>
                        </>
                    )
                }
            }
        </TodoContext.Consumer>

    )
}

export default Home