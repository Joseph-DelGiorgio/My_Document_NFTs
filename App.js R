/* import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v9 } from 'uuid'
import { stringify } from 'uuid';

const LOCAL_STORAGE_KEY= 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos= JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos (storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(e){
    const name= todoNameRef.current.value
    if(name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: v9(), name: name, complete: false}]
    })
    console.log(name)
    todoNameRef.current.value = null
  }

  return (
    <>
    <TodoList todos={todos} />
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}> Add Todo </button>
    <button> Clear Completed Todos</button>
    <div>0 left to do</div>
    </>
  )
}

export default App;
*/

import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 } from 'uuid'

const LOCAL_STORAGE_KEY= 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos= JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos (storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos= [...todos]
    const todo= newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name= todoNameRef.current.value
    if(name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: v4(), name: name, complete: false}]
    })
    console.log(name)
    todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos= todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo} />
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}> Add Todo </button>
    <button onClick={handleClearTodos}> Clear Completed</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;

