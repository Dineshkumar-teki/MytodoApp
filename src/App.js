import Home from './components/Home';
import TodoContext from './context/TodoContext';
import './App.css';
import { useState } from 'react';

function App() {
  const [todoList, setTodo] = useState([])

  const setTodoList = todo => {
    setTodo([...todoList, todo])
  }

  const setTaskStatus = id => {
    const updatedTodoList = todoList.map(eachTask => {
        if (eachTask.id === id){
            return {
                ...eachTask, taskDone: !eachTask.taskDone
            }
        }
        return eachTask
    })
    setTodo(updatedTodoList)
  }

  const deleteTodoFunc = id => {
    setTodo(todoList.filter(eachTodo => eachTodo.id !== id))
  }

  const editTodoItemFunc = (todo, id) => {
    const updatedTodoList = todoList.map(eachTask => {
      if (eachTask.id === id){
          return todo
      }
      return eachTask
  })
  setTodo(updatedTodoList)
  }

  return (
    <TodoContext.Provider value={
        {
          todoList, 
          setTodoList: setTodoList, 
          setTaskStatus: setTaskStatus,
          deleteTodoFunc: deleteTodoFunc,
          editTodoItemFunc: editTodoItemFunc
        }}
      >
      <Home/>
    </TodoContext.Provider>
  )
}

export default App;
