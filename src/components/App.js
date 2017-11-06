import React from 'react'
import Footer from './Footer'

import AddTodo from './AddTodo'
import VisibileTodoList from './VisibleTodoList'

const App = () => (
  <div>
    <AddTodo />
    <VisibileTodoList />
    <Footer />
  </div>
)

export default App