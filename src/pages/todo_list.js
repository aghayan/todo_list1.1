import React, { useState, useRef } from "react";
import { TodoFooter } from "./footer";
import { TodoItem } from "./todoitem";

export function Todo() {
  const [newValue, setNewValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const [list, setList] = useState([
    { title: "Learn Html", id: "1", isCompleted: false },
    { title: "Learn Css", id: "2", isCompleted: false },
    { title: "Learn Js", id: "3", isCompleted: false },
    { title: "Learn React", id: "4", isCompleted: false },
    { title: "Learn PHP", id: "5", isCompleted: false },
  ]);

  const handleChange = (e) => {
    setNewValue(e.target.value);
  };

  const handleCreate = () => {
    if (newValue.trim() !== "") {
      setList((prevList) => [
        ...prevList,
        { title: newValue, id: (prevList.length + 1).toString(), isCompleted: false },
      ]);
      setNewValue("");
    }
  };

  const todoDelete = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const todoEdit = (id) => {
    setEditingId(id);
    const todoToEdit = list.find((item) => item.id === id);
    setEditingTitle(todoToEdit.title);
  };

  const handleEditChange = (e) => {
    setEditingTitle(e.target.value);
  };

  const handleSaveEdit = () => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === editingId ? { ...item, title: editingTitle } : item
      )
    );
    setEditingId(null);
    setEditingTitle("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const handleDeleteAll = () => {
    setList([]);
  };

  const curr = useRef();

  return (
    <div className="todo">
      <div className="wrapper">
        <div className="container">
          <h1>TODO LIST</h1>
          <div className="input_button">
            <input
              className="input"
              type="text"
              placeholder={"add item..."}
              ref={curr}
              onChange={handleChange}
              value={newValue}
            />
            <button onClick={() => { curr.current.focus(); handleCreate(); }}>ADD</button>
          </div>
          <div className="delete_button">
            <button onClick={handleDeleteAll}>All</button>
          </div>
          <div className="list">
            {list?.map((elem) => (
              <div key={elem.id} className="list_elem">
                <p className="text_list" style={{ display: "flex", justifyContent: "space-between" }}>
                  {editingId === elem.id ? (
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={handleEditChange}
                    />
                  ) : (
                    elem.title
                  )}
                  <div className="input_button">
                    <TodoItem todo={elem} onChange={(updatedTodo) => {
                      setList((prevList) =>
                        prevList.map((item) =>
                          item.id === elem.id ? updatedTodo : item
                        )
                      );
                    }} />
                    {editingId === elem.id ? (
                      <>
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => todoDelete(elem.id)}>Delete</button>
                        <button onClick={() => todoEdit(elem.id)}>Edit</button>
                      </>
                    )}
                  </div>
                </p>
              </div>
            ))}
          </div>
        </div>
        <TodoFooter
          list={list}
          onClearCompleted={() => {
            setList((prevList) => prevList.filter((todo) => !todo.isCompleted));
          }}
        />
      </div>
    </div>
  );
}
