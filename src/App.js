import './css/App.css'
import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList'
function App() {
  const [input, setInput] = useState('')
  const [todolist, setTodolist] = useState([])
  useEffect(() => {
    const storageTodoList = localStorage.getItem('TODO_APP')
    if (storageTodoList) {
      setTodolist(JSON.parse(storageTodoList))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('TODO_APP', JSON.stringify(todolist))
  }, [todolist])

  const handleClick = () => {
    input && setTodolist(prevState => [...prevState, {name: input, isCompleted: false, id: Math.floor(Math.random() * 1000000)}])
    setInput('')
    document.querySelector('.inputField').focus()
  }

  const handlePress = (e) => {
    if (e.key === 'Enter') {
      input && setTodolist(prevState => [...prevState, {name: input, isCompleted: false, id: Math.floor(Math.random() * 1000000)}])
      setInput('')
      document.querySelector('.inputField').focus()
    }
  }

  const checkedFileLeft = (todos = []) => {
    return todos.filter(item => !item.isCompleted)
  }

  const clearCheckedTodo = () => {
    setTodolist(prevState => checkedFileLeft(prevState))
  }

  const checkedTodo = (id = 0) => {
    id && setTodolist(prevState => (prevState.map(todo => todo.id === id ? ({...todo, isCompleted: !todo.isCompleted}) : todo)))
  }

  const updateTodo = (td = {}) => {
    td && setTodolist(prevState => (prevState.map(todo => todo.id === td.id ? td : todo)))
  }
  
  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <div className="wrapper">
        <div className="inputText">
          <input onKeyPress={(e) => handlePress(e)} className="inputField" placeholder="Type todo..." type="text" onChange={e => setInput(e.target.value)} value={input} />
          <button type="button" onClick={handleClick}>ADD</button>
        </div>
        <TodoList updateTodo={updateTodo} checkedTodo={checkedTodo} todolist={todolist} />
        <div className="btn-action" style={{display: 'flex'}}>
          <button onClick={clearCheckedTodo}>Clear completed</button>
        </div>
      </div>
    </div>
  );
}

export default App;
