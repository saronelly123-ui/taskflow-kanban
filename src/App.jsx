
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { initialTasks } from "./data/initialTasks";
import useLocalStorage from "./hooks/useLocalStorage";

import BoardPage from "./pages/BoardPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import ArchivePage from "./pages/ArchivePage";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storageReady, setStorageReady] = useState(false);

  // Load tasks when application starts
  useEffect(() => {
    const savedTasks = localStorage.getItem("kanbanTasks");

    if (savedTasks !== null) {
      try {
        const parsedTasks = JSON.parse(savedTasks);

        if (!Array.isArray(parsedTasks)) {
          throw new Error("Invalid tasks data");
        }

        setTasks(parsedTasks);
        setIsLoading(false);
        setStorageReady(true);
      } catch (error) {
        console.error("Error loading tasks:", error);

        setTimeout(() => {
          setTasks(initialTasks);
          setIsLoading(false);
          setStorageReady(true);
        }, 400);
      }
    } else {
      setTimeout(() => {
        setTasks(initialTasks);
        setIsLoading(false);
        setStorageReady(true);
      }, 400);
    }
  }, []);

  // Save tasks to localStorage
  useLocalStorage("kanbanTasks", tasks, storageReady);

  // Add new task
  const addTask = (newTask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        ...newTask,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  // Move task
  const moveTask = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  // Update task
  const updateTask = (taskId, updatedData) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updatedData }
          : task
      )
    );
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BoardPage
              tasks={tasks}
              addTask={addTask}
              moveTask={moveTask}
              deleteTask={deleteTask}
              isLoading={isLoading}
            />
          }
        />

        <Route
          path="/task/:id"
          element={
            <TaskDetailPage
              tasks={tasks}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          }
        />

        <Route
          path="/archive"
          element={<ArchivePage tasks={tasks} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
