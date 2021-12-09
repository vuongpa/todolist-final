import React from "react";
import Todo from "./Todo";
import { List } from "antd";
import { useSelector } from "react-redux";
// @ts-ignore
const TodoList = React.memo(function TodoList() {
  // @ts-ignore
  const todoList = useSelector((state) => state.todoList.list);
  return (
    <List
      dataSource={todoList}
      itemLayout="horizontal"
      // @ts-ignore
      renderItem={(todo) => <Todo todo={todo} key={todo.id} />}
    />
  );
});

export default TodoList;
