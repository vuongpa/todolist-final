import React from 'react'
import Todo from './Todo'

const TodoList = React.memo(function TodoList({todolist, checkedTodo, updateTodo}) {
    return (
        <ol>
            {todolist.map(todo => <Todo updateTodo={updateTodo} checkedTodo={checkedTodo} todo={todo} key={todo.id} />)}
        </ol>
    )
})

export default TodoList