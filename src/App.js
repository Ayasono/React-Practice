import './App.css';
import Input from './components/Input'
import { useState, useEffect } from 'react'
import Todos from './components/Todos'

function App() {
  const [todos, setTodos] = useState([])

  // todos
  useEffect(() => {


    return () => {

    };
  }, [todos]);

  return (
    <div className="App">
      <h1>Todos</h1>
      <Input onIpt={ text => {
        setTodos(todo => {
          return [...todo, text]
        })
      } }/>
    </div>
  );
}

export default App;
