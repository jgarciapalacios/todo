import React, { useEffect, useState } from "react";
import "./App.css";
import { TaskEntry } from "./components/Task";
import {
  Task,
  addTaskToTree,
  deleteTaskFromTree,
  replaceTaskInTree,
  updateTaskCompletionStatus,
  createNewTask,
} from "./utils";
import { v4 as uuidv4 } from "uuid";
import { mockTask } from "./mock";
import { Button, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";

const DEFAULT_TASKS = [mockTask];
function App() {
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);

  const handleAddTask = (parentId: string, text: string) => {
    const newTask: Task = createNewTask(text);
    const updatedTasks = addTaskToTree(tasks, parentId, newTask);
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = deleteTaskFromTree(tasks, taskId);
    setTasks(updatedTasks);
  };

  const handleReplaceTask = (id: string, updatedTask: Task) => {
    const updatedTasks = replaceTaskInTree(tasks, id, updatedTask);
    const moreUpdatedTasks = updatedTasks.map((t) =>
      updateTaskCompletionStatus(t)
    );
    setTasks(moreUpdatedTasks);
  };

  return (
    <div className="App">
      <div className="homepage">
        <h1> TRACK YOUR GOALS </h1>
        <div className="tasklist">
          {tasks.map((task) => (
            <TaskEntry
              task={task}
              handleAddTask={handleAddTask}
              handleDeleteTask={handleDeleteTask}
              handleReplaceTask={handleReplaceTask}
            />
          ))}
        </div>
        <IconButton
          onClick={() => {
            const newTask = createNewTask("TITLE");
            const newSubTask = createNewTask("");
            const updateNewTask = { ...newTask, subtasks: [newSubTask] };
            setTasks((tasks) => [...tasks, updateNewTask]);
          }}
          aria-label="Add"
        >
          <Add />
        </IconButton>
      </div>
    </div>
  );
}

export default App;
