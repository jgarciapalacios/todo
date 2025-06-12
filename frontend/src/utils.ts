import { v4 as uuidv4 } from "uuid";

export interface Task {
  id: string;
  text: string;
  subtasks: Array<Task>;
  completed: boolean;
}

export const addTaskToTree = (
  tasks: Task[],
  parentId: string,
  newTask: Task
): Task[] => {
  return tasks.map((task) => {
    if (task.id === parentId) {
      return {
        ...task,
        subtasks: [...task.subtasks, newTask],
      };
    } else if (task.subtasks.length > 0) {
      return {
        ...task,
        subtasks: addTaskToTree(task.subtasks, parentId, newTask),
      };
    } else {
      return task;
    }
  });
};

export const deleteTaskFromTree = (tasks: Task[], targetId: string): Task[] => {
  return tasks
    .filter((task) => task.id !== targetId)
    .map((task) => ({
      ...task,
      subtasks: deleteTaskFromTree(task.subtasks, targetId),
    }));
};

export const replaceTaskInTree = (
  tasks: Task[],
  targetId: string,
  newTask: Task
): Task[] => {
  return tasks.map((task) => {
    if (task.id === targetId) {
      return newTask;
    } else if (task.subtasks.length > 0) {
      return {
        ...task,
        subtasks: replaceTaskInTree(task.subtasks, targetId, newTask),
      };
    } else {
      return task;
    }
  });
};

export const getTaskProgress = (task: Task): number => {
  const total = task.subtasks.length;

  if (total === 0) return 0;

  const completed = task.subtasks.filter((sub) => sub.completed).length;

  return Math.round((completed / total) * 100);
};

export const updateTaskCompletionStatus = (task: Task): Task => {
  const updatedSubtasks = task.subtasks.map(updateTaskCompletionStatus);

  const allSubtasksComplete =
    updatedSubtasks.length > 0
      ? updatedSubtasks.every((sub) => sub.completed)
      : task.completed;

  return {
    ...task,
    subtasks: updatedSubtasks,
    completed: allSubtasksComplete,
  };
};

export const createNewTask = (text: string) => {
  const newTask: Task = {
    id: uuidv4(),
    text: text,
    subtasks: [],
    completed: false,
  };

  return newTask;
};
