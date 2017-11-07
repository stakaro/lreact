const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        }
      ]
    
    case 'DELETE_TODO':
      console.log('id', action.id)
      
      const nextState = state.filter((s) => { 
        return (s.id !== action.id) 
      })
      return nextState

    case 'TOGGLE_TODO':
      console.log('TOGGLE_TODO')
      return state.map(t => {
        if (t.id === action.id) {
          t.completed = !t.completed
        }
        return t
       }
      )
    
    default:
      return state;
  }
};

export default todos;