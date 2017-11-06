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