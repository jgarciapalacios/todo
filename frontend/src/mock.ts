import { v4 as uuidv4 } from "uuid";
import { Task } from "./utils"; // adjust to match your actual file structure

const subSubSubTask0: Task = {
  id: uuidv4(),
  text: "Send final confirmation email",
  subtasks: [],
  completed: true,
};

const subSubTask0: Task = {
  id: uuidv4(),
  text: "Call landlord for documents",
  subtasks: [subSubSubTask0],
  completed: false,
};

const subSubTask1: Task = {
  id: uuidv4(),
  text: "Schedule moving truck",
  subtasks: [],
  completed: false,
};

const subTask0: Task = {
  id: uuidv4(),
  text: "Create apartment shortlist",
  subtasks: [],
  completed: true,
};

const subTask1: Task = {
  id: uuidv4(),
  text: "Research neighborhoods",
  subtasks: [subSubTask0, subSubTask1],
  completed: false,
};

const subTask2: Task = {
  id: uuidv4(),
  text: "Book plane tickets",
  subtasks: [],
  completed: false,
};

export const mockTask: Task = {
  id: uuidv4(),
  text: "Plan Move to California",
  subtasks: [subTask0, subTask1, subTask2],
  completed: false,
};
