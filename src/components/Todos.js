import React, { useState } from 'react';
import './Todos.css'

const Todos = ({ todo }) => {
  const [isChecked, setIsChecked] = useState(false)

  return (<div className='todo'
    style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
    <input
      checked={ isChecked }
      onChange={ () => setIsChecked(!isChecked) }
      type='checkbox'
      style={ { height: '25px', width: '25px', border: '1px black solid' } }
    />
    <p className='todo-items'
      style={ { fontSize: '18px', lineHeight: '25px' } }>{ todo }</p>
  </div>);
};

export default Todos;
