import { useEffect, useState, useRef } from "react";
import { Task } from "./utils";

const STORAGE_KEY = "my-task-data";

export const useLocalTasks = (defaultTasks: Task[]) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  // Load tasks from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    console.log("SAVED: ", saved);
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch {
        console.error("Invalid JSON in localStorage");
      }
    }
  }, []);

  useEffect(() => {
    console.log("Tasks: ", tasks);
    if (tasks.length !== 0)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return { tasks, setTasks };
};
