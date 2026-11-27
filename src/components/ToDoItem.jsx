
import { useState } from "react";

function ToDoItem({ todo, onDelete, onToggle, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleUpdate = () => {
        if (!editText.trim()) return;

        onUpdate(todo.id, editText.trim());
        setIsEditing(false);
    };

    return (
        <div className={`todo-item ${todo.completed ? "completed" : ""}`}>

            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />

            {isEditing ? (
                <>
                    <input
                    className="todo-edit-input"
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />

                    <button onClick={handleUpdate}>
                        Save
                    </button>

                    <button onClick={() => {
                        setEditText(todo.text);
                        setIsEditing(false);
                    }}>
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <p>{todo.text}</p>

                    <button onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                </>
            )}

            <button onClick={() => onDelete(todo.id)}>
                Delete
            </button>

            

        </div>
    );
}

export default ToDoItem;
