import { useState, useEffect } from "react";
import TodoTaskCard from "./TodoTaskCard";
import TodoForm from "./TodoForm";

const Todo = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState("all");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) =>
    sortAsc ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)
  );

  return (
    <div className="todo-container">
      <h1>Todo App</h1>
      <TodoForm tasks={tasks} setTasks={setTasks} />
      <div className="todo-filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <button className="todo-sort" onClick={() => setSortAsc(!sortAsc)}>
          {sortAsc ? "Sort A → Z" : "Sort Z → A"}
        </button>
      </div>

      <div className="task-list">
        {sortedTasks.map((t) => (
          <TodoTaskCard t={t} tasks={tasks} setTasks={setTasks} />
        ))}
      </div>
    </div>
  );
};

export default Todo;
