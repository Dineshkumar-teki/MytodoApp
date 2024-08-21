import React from "react";

const TodoContext = React.createContext({
    todoList: [], 
    setTodoList: () => {},
    setTaskStatus: () => {},
    deleteTodoFunc: () => {},
    editTodoItemFunc: () => {}
})

export default TodoContext