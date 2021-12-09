import React, { useState, useEffect } from "react";
import {
  EditTwoTone,
  CheckSquareTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { checkedTodo, editTodo } from "../actions/todoList";
// @ts-ignore
const Todo = React.memo(({ todo }) => {
  const dispatch = useDispatch();
  // @ts-ignore
  const todoList = useSelector((state) => state.todoList.list);

  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);

  // style
  const isCompletedStyle = {
    textDecoration: "line-through",
    color: "#d9d9d9",
    fontSize: "20px",
  };

  useEffect(() => {
    localStorage.setItem("TODO_APP", JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    setText(todo.name);
  }, [todo]);

  const onCheckedTodo = (id = 0) => {
    if (id) {
      const action = checkedTodo(id);
      dispatch(action);
    }
  };

  const onUpdateTodo = (todo) => {
    setEdit(!edit);
    if (edit) {
      const newTodo = { ...todo, name: text };
      console.log(newTodo);
      const action = editTodo(newTodo);
      dispatch(action);
    }
  };

  return (
    <Content style={{ margin: "5px 0", background: "#fff", display: "flex" }}>
      <Input
        style={todo.isCompleted ? isCompletedStyle : { fontSize: "20px" }}
        className={edit ? "input_todo_edit" : "input_todo"}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        size="large"
        icon={
          edit ? (
            <CheckSquareTwoTone twoToneColor={text === "" ? "#d6d6d6" : ""} />
          ) : (
            <EditTwoTone />
          )
        }
        type="text"
        className="btn-edit"
        onClick={() => onUpdateTodo(todo)}
        disabled={text === "" ? true : false}
      />
      <Button
        size="large"
        type="text"
        onClick={() => onCheckedTodo(todo.id)}
        icon={<CheckCircleTwoTone />}
      />
    </Content>
  );
});

export default Todo;
