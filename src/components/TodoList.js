import React from 'react'
import PropTypes from 'prop-types'

import Todo from './Todo'

const TodoList = ({todos, onTodoClick, onTodoDelete}) => (
  <ul>
    {todos.map((todo) => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} onDelete={() => onTodoDelete(todo.id)} />
    ))}
  </ul>
)

TodoList.PropTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired
}

export default TodoList