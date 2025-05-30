import React, { useState } from "react";

const TodoForm = ({tasks,setTasks}) => {
  const [task, setTask] = useState('');
  const handleAddTask = () => {
    const trimmed = task.trim();
    if (trimmed === '') {
      alert('Task cannot be empty!');
      return;
    }
    setTasks([
      ...tasks,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
    setTask('');
  };
  return (
    <form className="input-wrapper" onSubmit={handleAddTask}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="What is the task today?"
      />
      <button className="add-btn">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
