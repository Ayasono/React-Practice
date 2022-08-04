import './App.css';
import Input from './components/Input'
import { useState, useEffect } from 'react'

function App() {
  const [todo, setTodo] = useState('')

  function onIpt(text) {
    setTodo(text)
  }

  return (
    <div className="App">
      <h1>Todos</h1>
      <Input onIpt={ onIpt }/>
    </div>
  );
}

export default App;
