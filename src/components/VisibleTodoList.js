import { connect } from 'react-redux'
import { toggleTodo, deleteTodo } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error(`Unknown filter: ${filter}.`)
  }
}

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = (dispath) => ({
  onTodoClick(id) {
    console.log('toggle todo')
    dispath(toggleTodo(id))
  },
  onTodoDelete(id) {
    console.log('delete todo')
    dispath(deleteTodo(id))
  }
})

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
