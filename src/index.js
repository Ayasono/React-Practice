import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'

// 单个todo组件
class TodoItem extends React.Component {
  constructor(props) {
    super(props);

  }

  // 处理一个变化
  handleCheckOne(id) {
    this.props.handleCheckOne(id)
  }

  // 双击编辑
  handleEdit(id, e) {
    // 通过dom关系找到目标元素
    var target = e.target.parentNode.nextElementSibling;
    this.props.handleEdit(id, target);
  }

  handleEditChange(id, e) {
    var value = e.target.value;
    this.props.handleEditInputChange(id, value);
  }

  handleOkOrCancel(id, e) {
    this.props.handleEditOkOrCancel(id, e);
  }

  render() {
    return (
      <li className={ this.props.isDone ? 'completed' : '' }>
        <div className='view'
          style={ { display: this.props.isEdit ? 'none' : 'block' } }>
          <input className='toggle'
            type='checkbox'
            checked={ this.props.isDone }
            onChange={ e => this.handleCheckOne(this.props.id, e) }/>
          <label onDoubleClick={ e => this.handleEdit(this.props.id, e) }>{ this.props.text }</label>
          <button className='destroy'
            onClick={ e => this.props.removeItem(this.props.id) }></button>
        </div>
        <input className='edit'
          onKeyUp={ e => this.handleOkOrCancel(this.props.id, e) }
          style={ { display: !this.props.isEdit ? 'none' : 'block' } }
          value={ this.props.text }
          onChange={ e => this.handleEditChange(this.props.id, e) }/>
      </li>
    )
  }
}

class FooterBar extends React.Component {
  constructor(props) {
    super(props);
    this.changeFilterState = this.changeFilterState.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
  }

  changeFilterState(state) {
    this.props.changeFilterState(state);
  }

  handleClearCompleted() {
    this.props.handleClearCompleted();
  }

  render() {
    return (
      <footer className='footer'>
        {/* This should be `0 items left` by default */ }
        <span className='todo-count'>
          <strong>{ this.props.itemLeft || 0 }</strong> item left
        </span>
        {/* Remove this if you don't implement routing */ }
        <ul className='filters'>
          <li onClick={ e => this.changeFilterState('all') }>
            <a className={ this.props.fitlerState == 'all' ? 'selected' : '' }
              href='#'>
              All
            </a>
          </li>
          <li onClick={ e => this.changeFilterState('active') }>
            <a className={ this.props.fitlerState == 'active' ? 'selected' : '' }
              href='#'>Active</a>
          </li>
          <li onClick={ e => this.changeFilterState('completed') }>
            <a className={ this.props.fitlerState == 'completed' ? 'selected' : '' }
              href='#'>Completed</a>
          </li>
        </ul>
        {/* Hidden if no completed items are left ↓ */ }
        <button className='clear-completed'
          onClick={ this.handleClearCompleted }>Clear completed
        </button>
      </footer>
    )
  }
}

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodoValue: '',
      todoList: [],
      itemLeft: 0, // 未完成剩余数量
      allCheckState: false, // 全选状态
      preEditValue: '',// 备份编辑前的内容
      fitlerState: 'all', //all, active, completed
    }
    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.handleNewTodoEnter = this.handleNewTodoEnter.bind(this);
    this.handleCheckOne = this.handleCheckOne.bind(this);
    this.handleCheckAll = this.handleCheckAll.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleOkOrCancel = this.handleOkOrCancel.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.changeFilterState = this.changeFilterState.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
  }

  // 响应新增
  handleNewTodo(e) {
    this.setState({
      newTodoValue: e.target.value
    })
  }

  // 处理新增
  handleNewTodoEnter(e) {
    // enter or  esc
    if (e.keyCode === 13) {
      var todo = {
        id: new Date().getTime(),
        text: e.target.value,
        isEdit: false,
        isDone: false
      }
      var todoList = [...this.state.todoList];
      todoList.push(todo);
      // 添加新增 并修改表单内容
      // 因为setState是异步的
      this.setState({
        todoList,
        newTodoValue: ''
      }, () => {
        this.regetItemLeft();
      })
    } else if (e.keyCode === 27) {
      this.setState({
        newTodoValue: ''
      })
    }

  }

  // 当修改是否选中状态
  handleCheckOne(id) {
    console.log('id', id)
    var todoList = [...this.state.todoList];
    var todo = todoList.find(item => item.id == id);
    todo.isDone = !todo.isDone;
    // 修改state
    this.setState({
      ...todoList
    })
    this.regetItemLeft();
  }

  // 全选
  handleCheckAll() {
    if (this.state.todoList.length == 0) return;
    // 注意: setState是异步的,必须在第二个回调才能获取最新状态
    // # https://react.docschina.org/docs/state-and-lifecycle.html
    this.setState(state => ({
      allCheckState: !state.allCheckState
    }), () => {
      // 更改每一项
      var todoList = [...this.state.todoList];
      todoList.map(item => {
        item.isDone = this.state.allCheckState;
        return item;
      })
      //
      this.setState(state => ({
        todoList
      }), () => {
        // 更新剩余数量
        this.regetItemLeft();
      })

    })
  }

  // 计算剩余
  regetItemLeft() {
    // 如果没有数据
    if (this.state.todoList.length == 0) {
      // 处理全选
      this.setState({
        allCheckState: false
      })
      return;
    }
    // 设置剩余长度
    var itemLefts = this.state.todoList.filter(item => !item.isDone);
    this.setState({
      itemLeft: itemLefts.length
    })
    console.log(itemLefts.length)
    // 响应全选
    this.setState({
      allCheckState: itemLefts.length == 0
    })
  }

  //双击编辑
  handleEdit(id, target) {
    var todoList = [...this.state.todoList];
    // 排他 只能有一个处于编辑状态
    var beforeEditIndex = todoList.findIndex(item => item.isEdit);
    if (beforeEditIndex > -1) {
      todoList[beforeEditIndex].isEdit = false;
    }
    // 找到目标元素下标
    var index = todoList.findIndex(item => item.id == id);
    todoList[index].isEdit = true;
    this.setState({
      todoList
    }, () => {
      target.focus();
    })
    // 备份旧内容 用于esc取消还原
    this.setState({
      preEditValue: todoList[index].text
    })
  }

  // 编辑行数据变化
  handleEditChange(id, value) {
    var todoList = [...this.state.todoList];
    var index = todoList.findIndex(item => item.id == id);
    todoList[index].text = value;
    this.setState({
      todoList
    })
  }

  // 编辑行确定
  handleOkOrCancel(id, e) {
    var todoList = [...this.state.todoList];
    // 找到目标元素下标
    var index = todoList.findIndex(item => item.id == id);
    // 确定是esc还是enter
    if (e.keyCode === 13) {
      todoList[index].isEdit = false;
      this.setState({
        todoList,
        preEditValue: ''
      })
    } else if (e.keyCode === 27) {
      // 还原
      todoList[index].text = this.state.preEditValue;
      todoList[index].isEdit = false;
      this.setState({
        todoList,
        preEditValue: ''
      })
    }
  }

  removeItem(id) {
    var todoList = [...this.state.todoList];
    // 找到目标元素下标
    var index = todoList.findIndex(item => item.id == id);
    todoList.splice(index, 1);
    this.setState({
      todoList
    })
  }

  // 改变filterState
  changeFilterState(state) {
    this.setState({
      fitlerState: state
    })
  }

  // 清除所有完成的
  handleClearCompleted() {
    var todoList = [...this.state.todoList];
    todoList = todoList.filter(item => !item.isDone);
    this.setState({
      todoList
    })
  }

  render() {
    return (
      <section className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <input
            className='new-todo'
            placeholder='What needs to be done?'
            autoFocus
            value={ this.state.newTodoValue }
            onChange={ this.handleNewTodo }
            onKeyUp={ this.handleNewTodoEnter }
          />
        </header>
        {/* This section should be hidden by default and shown when there are todos */ }
        <section className='main'>
          <input id='toggle-all'
            className='toggle-all'
            type='checkbox'
            checked={ this.state.allCheckState }
            onChange={ this.handleCheckAll }/>
          <label htmlFor='toggle-all'>Mark all as complete</label>
          <ul className='todo-list'>
            {
              this.state.todoList.map(item => {
                // 待办
                if (this.state.fitlerState == 'active') {
                  if (item.isDone) return null;
                }
                // 已完成
                if (this.state.fitlerState == 'completed') {
                  if (!item.isDone) return null;
                }
                return (
                  /*把整个item对象传入组件*/
                  <TodoItem key={ item.id } { ...item }
                    handleEdit={ this.handleEdit }
                    handleCheckOne={ this.handleCheckOne }
                    handleEditInputChange={ this.handleEditChange }
                    handleEditOkOrCancel={ this.handleOkOrCancel }
                    removeItem={ this.removeItem }/>
                )
              })
            }
          </ul>
        </section>
        <FooterBar fitlerState={ this.state.fitlerState }
          itemLeft={ this.state.itemLeft }
          changeFilterState={ this.changeFilterState }
          handleClearCompleted={ this.handleClearCompleted }/>
      </section>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Todos/>
  </React.StrictMode>
);
