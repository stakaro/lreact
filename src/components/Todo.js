import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({onClick, onDelete, completed, text}) => (
  <div>
    <span 
      onClick={onClick}
      style={{
        textDecoration: completed ? 'line-through' : 'none'
      }}
    >
    {text}
    </span> &nbsp;&nbsp;&nbsp;
    <a onClick={onDelete} style={{
      cursor: 'pointer'
    }}> x </a>
  </div>
)

Todo.prototype = {
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo