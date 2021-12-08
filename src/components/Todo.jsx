import React, {useState, useEffect} from 'react'

const Todo = React.memo(({todo, checkedTodo, updateTodo}) => {
    const [text, setText ] = useState('');
    const [edit, setEdit] = useState(false);
    const isCompletedStyle = {
        textDecoration: 'line-through',
        color: 'red',
    }
    
    useEffect(() => {
        setText(todo.name)
    }, [todo])

    const toggleCheckedTodo = (id) => {
        checkedTodo(id)
    }
    
    const onUpdateTodo = (e) => {
        setEdit(!edit)
        let newTodo = {...todo}
        newTodo = {...newTodo, name: text}
        updateTodo(newTodo)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setEdit(!edit)
            let newTodo = {...todo}
            newTodo = {...newTodo, name: text}
            updateTodo(newTodo)
        }
    }

    return (
        <li className="todo" >
            <input 
                onKeyPress={(e) => handleKeyPress(e)} 
                style={todo.isCompleted ? isCompletedStyle : {}} 
                className={edit ? 'input-todo-edit' : 'input-todo'} 
                type="text" 
                value={text} 
                onChange={e => setText(e.target.value)} 
            />
            <button onClick={() => toggleCheckedTodo(todo.id)}><i className="fa fa-check" aria-hidden="true"></i></button>
            <button className="btn-edit" onClick={() => onUpdateTodo()} >{edit ? <i class="fa fa-check-square" aria-hidden="true"></i> : <i className="fa fa-pencil" aria-hidden="true"></i>}</button>
        </li>
    )
})

export default Todo

