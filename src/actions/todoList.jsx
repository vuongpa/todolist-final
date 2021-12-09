export const addTodo = (todoList) => {
  return {
    type: "ADD_TODO",
    payload: todoList,
  };
};
export const editTodo = (todoList) => {
  return {
    type: "EDIT_TODO",
    payload: todoList,
  };
};
export const checkedTodo = (id) => {
  return {
    type: "CHECKED_TODO",
    payload: id,
  };
};
export const deleteCompletedTodo = (todoList) => {
  return {
    type: "DELETE_COMPLETED_TODO",
    payload: todoList,
  };
};
