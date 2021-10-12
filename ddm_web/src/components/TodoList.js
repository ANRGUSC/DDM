/*
   Copyright (c) 2018, Autonomous Networks Research Group. All rights reserved.
   Read license file in main directory for more details
*/

import { Button, Input } from "antd";
import axios from "axios";
import React, { Component } from "react";
import TodoItem from "./TodoItem";

class TodoList extends Component {
  state = {
    input: "",
    list: ["todo1", "todo2"],
  };
  componentDidMount = () => {
    axios
      .get("/api/search")
      .then((res) => {
        console.log(res.data);
        this.setState(() => ({
          list: res.data,
        }));
      })
      .catch(() => {
        alert("error");
      });
  };

  render() {
    return (
      <div>
        <Input onChange={this.handleInputChange} value={this.state.input} />
        <Button type="primary" onClick={this.handleBtnClick}>
          click me
        </Button>
        <ul>{this.getTodoItem()}</ul>
      </div>
    );
  }

  getTodoItem = () => {
    const itemsArray = this.state.list.map((item, index) => {
      return (
        <TodoItem
          content={item}
          index={index}
          deleteItem={this.handleItemDelete}
        />
      );
    });
    return itemsArray;
  };

  handleInputChange = (e) => {
    const value = e.target.value;
    this.setState(() => ({
      input: value,
    }));
  };

  handleBtnClick = () => {
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.input],
      input: "",
    }));
  };

  handleItemDelete = (index) => {
    const list = [...this.state.list];
    list.splice(index, 1);
    this.setState(() => ({
      list: list,
    }));
  };
}

export default TodoList;
