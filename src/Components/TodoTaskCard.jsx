import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdSave } from "react-icons/md";

const TodoTaskCard = ({ t, setTasks, tasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(t.text);

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditSave = (id) => {
    if (editText.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editText.trim() } : task
      )
    );
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      <div className="task-checkbox">
        <input
          type={isEditing ? "hidden" : "checkbox"}
          checked={t.completed}
          onChange={() => toggleTaskCompletion(t.id)}
        />
      </div>
      {isEditing ? (
        <input
          className="edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleEditSave(t.id);
          }}
        />
      ) : (
        <span
          className="task-text"
          style={{ textDecoration: t.completed ? "line-through" : "none" }}
        >
          {t.text}
        </span>
      )}

      <div className="task-actions">
        {isEditing ? (
          <button
            title="Save"
            className="edit-save-btn"
            onClick={() => handleEditSave(t.id)}
          >
            <MdSave />
          </button>
        ) : (
          <>
            <button
              title="Edit"
              className="edit-btn"
              onClick={() => {
                setEditText(t.text);
                setIsEditing(true);
              }}
            >
              <FaEdit />
            </button>
            <button
              title="Delete"
              className="delete-btn"
              onClick={() => handleDeleteTask(t.id)}
            >
              <MdDelete />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoTaskCard;
