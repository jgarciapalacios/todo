import React, { useEffect } from "react";
import "./Task.css";
import Checkbox from "@mui/material/Checkbox";
import { Stack } from "@mui/material";
import { useState } from "react";
import { DeleteOutline, Add } from "@mui/icons-material";
import { getTaskProgress, Task } from "../utils";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { Typography, IconButton, Box, TextField, Divider } from "@mui/material";

interface TaskEntryProps {
  task: Task;
  handleAddTask: (parentId: string, text: string) => void;
  handleDeleteTask: (taskId: string) => void;
  handleReplaceTask: (taskId: string, updatedTask: Task) => void;
  width?: string;
  backgroundColor?: string;
}

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export const TaskEntry = (props: TaskEntryProps) => {
  const {
    task,
    width = "100%",
    backgroundColor = "pink",
    handleAddTask,
    handleDeleteTask,
    handleReplaceTask,
  } = props;
  const [addTaskVisible, setAddTaskVisible] = useState<boolean>(false);

  return (
    <div
      className="task-top-container"
      style={{
        width: width,
        borderLeft: task.subtasks.length !== 0 ? "solid 2px black" : "none",
        borderRight: task.subtasks.length !== 0 ? "solid 2px black" : "none",
      }}
    >
      <div className="task-entry-container">
        <TextField
          id="standard-basic"
          defaultValue={task.text}
          variant="standard"
          fullWidth
          onBlur={(e) => {
            if (e.target.value === task.text) return;
            const updatedTask: Task = { ...task, text: e.target.value };
            handleReplaceTask(task.id, updatedTask);
            console.log(`REPLACING ${task.text} with ${e.target.value}`);
          }}
          slotProps={{
            htmlInput: {
              style: {
                fontSize: "1.5em",
              },
            },
          }}
        />
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          {task.subtasks.length === 0 && (
            <Checkbox
              defaultChecked={task.completed}
              onChange={(e) => {
                const updatedTask = { ...task, completed: e.target.checked };
                handleReplaceTask(task.id, updatedTask);
              }}
            />
          )}
          <IconButton
            onClick={() => handleDeleteTask(task.id)}
            aria-label="Add"
          >
            <DeleteOutline />
          </IconButton>
        </Stack>
      </div>
      {task.subtasks.length !== 0 && (
        <LinearProgressWithLabel
          value={getTaskProgress(task)}
          style={{ height: "8px" }}
        />
      )}
      <div className="subtasks-container">
        {task?.subtasks.map((t, index) => {
          return (
            <>
              <div className="subtask-container">
                <p className="subtask-number"> {index + 1}. </p>
                <TaskEntry
                  key={t.id}
                  task={t}
                  width="95%"
                  backgroundColor="lightblue"
                  handleAddTask={handleAddTask}
                  handleDeleteTask={handleDeleteTask}
                  handleReplaceTask={handleReplaceTask}
                />
              </div>
            </>
          );
        })}
      </div>
      {
        <div
          className="task-hover-bar"
          onMouseEnter={() => {
            setAddTaskVisible(true);
          }}
          onMouseLeave={() => setAddTaskVisible(false)}
        >
          {
            <IconButton
              onClick={() => handleAddTask(task.id, "")}
              aria-label="Add"
              style={{
                visibility: addTaskVisible ? "visible" : "hidden",
              }}
            >
              <Add />
            </IconButton>
          }
        </div>
      }
    </div>
  );
};
