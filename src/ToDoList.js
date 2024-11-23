import React, { useEffect, useState } from 'react';
import './ToDoList.css'; 


function TodoList() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("items")) || []);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState("");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleToggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleEditButton = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index].text); // Update `editTask` with the text field
  };

  const handleSaveButton = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = { ...tasks[editIndex], text: editTask }; // Only update the text
    setTasks(updatedTasks);
    setEditIndex(null);
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div>
     <div className="app">
      <h1>Todo List</h1>
      <div className="inp">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Add Item..."
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editTask}
                  onChange={handleEditChange}
                />
                <button onClick={handleSaveButton}>Save</button>
              </>
            ) : (
              <>
                <span
                  className={task.completed ? "completed" : ""}
                  onClick={() => handleToggleTask(index)}
                >
                  {task.completed ? "☑" : "☐"} {task.text}
                </span>
                <div className="divbtn">
                <button onClick={() => handleRemoveTask(index)}>Remove</button>
                <button onClick={() => handleEditButton(index)}>Edit</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default TodoList;
