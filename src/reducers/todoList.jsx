const initialState = {
  list: [],
  activeId: null,
};

const todoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case "EDIT_TODO": {
      return {
        ...state,
        list: state.list.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    }
    case "DELETE_COMPLETED_TODO": {
      return {
        ...state,
        list: state.list.filter((todo) => !todo.isCompleted),
      };
    }
    case "CHECKED_TODO": {
      return {
        ...state,
        list: state.list.map((todo) =>
          todo.id === action.payload
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
      };
    }
    default:
      return state;
  }
};

export default todoListReducer;
