import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import { useSelector, useDispatch } from "react-redux";
import "./css/App.css";

import { addTodo, deleteCompletedTodo } from "./actions/todoList";
import { Button, Input, notification } from "antd";
import { Content } from "antd/lib/layout/layout";

function App() {
  // @ts-ignore
  const todoList = useSelector((state) => state.todoList.list);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  useEffect(() => {
    const storageTodoList = localStorage.getItem("TODO_APP");
    if (storageTodoList) {
      JSON.parse(storageTodoList).forEach((todo) => {
        const action = addTodo(todo);
        dispatch(action);
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("TODO_APP", JSON.stringify(todoList));
  }, [todoList]);

  const handleClick = () => {
    const newTodo = {
      name: input || "",
      isCompleted: false,
      id:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
    };
    const action = addTodo(newTodo);
    dispatch(action);
    openNotification("success", "Successfully added new job");
    setInput("");
    // @ts-ignore
    document.querySelector(".inputField").focus();
  };

  const handlePress = (e) => {
    if (e.key === "Enter") {
      const newTodo = {
        name: input || "",
        isCompleted: false,
        id:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
      };
      const action = addTodo(newTodo);
      dispatch(action);
      setInput("");
      // @ts-ignore
      document.querySelector(".inputField").focus();
    }
  };

  const clearCheckedTodo = () => {
    const action = deleteCompletedTodo();
    dispatch(action);
    openNotification("success", "Successfully clear");
  };

  const openNotification = (type, content) => {
    const config = {
      message: `Notification ${type}`,
      description: content,
      duration: 2,
    };
    notification[type](config);
  };
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Content style={{ width: "600px", marginTop: "50px" }}>
        <h1>TODO LIST</h1>
        <Content>
          <div style={{ display: "flex" }}>
            <Input
              onKeyPress={(e) => handlePress(e)}
              placeholder="Type todo..."
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="inputField"
            />
            <Button
              onClick={handleClick}
              type="primary"
              style={{ marginLeft: "10px" }}
              disabled={input === "" ? true : false}
            >
              ADD
            </Button>
          </div>
        </Content>
        <Content style={{ marginTop: "15px" }}>
          <TodoList />
          <Button
            disabled={
              todoList.filter((todo) => todo.isCompleted).length > 0
                ? false
                : true
            }
            danger
            type="primary"
            onClick={clearCheckedTodo}
          >
            Clear completed todo
          </Button>
        </Content>
      </Content>
    </div>
  );
}

export default App;
