import { useState } from "react";
import "./ToDoForm.css";

function TodoForm({ onAddTodo }) {

    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!input.trim()) 
            return;
        

        onAddTodo(input.trim());

        setInput("");
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Add a new task..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button type="submit">
                Add Task
            </button>

        </form>
    );
}

export default TodoForm;