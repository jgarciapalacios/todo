import { useLocalTasks } from "./useLocalTasks";
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
import { mockTask } from "./mock";
import { Button, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";

const DEFAULT_TASKS: Task[] = [];
function App() {
  const { tasks, setTasks } = useLocalTasks(DEFAULT_TASKS);

  const handleAddTask = (parentId: string, text: string) => {
    const newTask: Task = createNewTask(text);
    const updatedTasks = addTaskToTree(tasks, parentId, newTask);
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId: string) => {
    if (tasks.length <= 1 && tasks[0]?.id === taskId)
      return window.alert("You must have at least 1 task!");

    setTasks((oldTasks) => {
      const updatedTasks = deleteTaskFromTree(oldTasks, taskId);
      console.log("updatedTasks", updatedTasks);
      return updatedTasks;
    });
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
        <h1> Track Your Goals! </h1>
        <div className="tasklist">
          {tasks.map((task) => (
            <TaskEntry
              key={task.id}
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
