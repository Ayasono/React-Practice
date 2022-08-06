import './App.css';
import Input from './components/Input'
import { useState, useEffect } from 'react'
import Todos from './components/Todos'

function App() {
  const [todos, setTodos] = useState([])

  // todos
  function renderList(todos) {
    return (
      todos.map(
        (todo, index) => {
          return <Todos
            key={ index }
            todo={ todo.text }
            isChecked={ todo.isChecked }
            setTodo={ setTodos }
          />
        }
      )
    )
  }

  let list = renderList(todos)
  useEffect(() => {
    list = renderList(todos)
    console.log(todos)
    return () => {

    };
  }, [todos]);

  return (
    <div className='App'>
      <h1>Todos</h1>
      <Input onIpt={ text => {
        setTodos(todo => {
          return [...todo, { text, isChecked: false }]
        })
      } }
      />
      { list }
    </div>
  );
}

export default App;
