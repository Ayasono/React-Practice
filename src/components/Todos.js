import React from 'react';

const Todos = ({todo}) => {
  console.log(todo)
  return (
    <div className="todo" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <input type="checkbox" style={{height: '25px', width: '25px', border: '1px black solid'}}/>
      <p style={{fontSize: '18px', lineHeight: '25px'}}>{todo}</p>
    </div>
  );
};

export default Todos;
