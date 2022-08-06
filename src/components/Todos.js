import React from 'react';
import './Todos.css'

const Todos = ({ todo, isChecked, setTodo }) => {

  return (<div className='todo'
    style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
    <input
      checked={ isChecked }
      onChange={ () => {
        setTodo(
          v => {
            const i = v.find(el => {
              return el.text === todo
            })
            i.isChecked = !i.isChecked
            return [...v]
          }
        )
      }}
      type='checkbox'
      style={ { height: '25px', width: '25px', border: '1px black solid' } }
    />
    <p className='todo-items'
      style={ { fontSize: '18px', lineHeight: '25px' } }>{ todo }</p>
  </div>);
};

export default Todos;
