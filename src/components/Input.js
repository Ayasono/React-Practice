import React, { useEffect, useState } from 'react';
import './Input.css'

const Input = ({ onIpt }) => {
  const [todo, setTodo] = useState('')

  return (
    <div className="input">
      <input
        autoFocus={ true }
        placeholder="What needs to be done?"
        value={ todo }
        onChange={e => setTodo(e.target.value)}
        onKeyDown={ e => {
          if (todo === '') return
          if (e.code === 'Enter') {
            onIpt(todo)
            setTodo('')
          }
        } }
        type="text"
      />
    </div>
  );
};

export default Input;
