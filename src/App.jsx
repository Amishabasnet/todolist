
import { useEffect, useState } from "react";
import "./App.css";

import TodoForm from "./components/ToDoForm";
import TodoList from "./components/ToDoList";

function App() {

    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    // Add Todo
    const addTodo = (todoText) => {
        const newTodo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };

        setTodos(prevTodos => [...prevTodos, newTodo]);
    };

    // Delete Todo
    const deleteTodo = (id) => {
        setTodos(prevTodos =>
            prevTodos.filter(todo => todo.id !== id)
        );
    };

    // Toggle Todo
    const toggleTodo = (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    // Update Todo
    const updateTodo = (id, updatedText) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id
                    ? { ...todo, text: updatedText }
                    : todo
            )
        );
    };

    // filter Todo
    const filteredTodos = todos.filter(todo => {
        const matchesSearch = todo.text.toLowerCase().includes(search.toLowerCase());

        const matchesFilter = filter === "all" || (filter === "active" && !todo.completed) || (filter === "completed" && todo.completed);

        return matchesSearch && matchesFilter;
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);


    const remainingTodos = todos.filter((todo) => !todo.completed).length;
    const totalTodos = todos.length;

    const clearCompleted = () => {
        setTodos((prevTodos) =>
        prevTodos.filter((todo) => !todo.completed));
    };

    return (
        <div className="app">

            <header className="header">
                <h1>My Todo List</h1>
                <p>Organize your day, one task at a time.</p>
            </header>

            <div className="todo-controls">
                <input type="search"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)} />

                <p>{remainingTodos} of {totalTodos} tasks remaining</p>

                <div className="filter-buttons">
                    <button onClick={() => setFilter("all")}>All</button>

                    <button onClick={() => setFilter("active")}>Active</button>            
                    
                    <button onClick={() => setFilter("completed")}>Completed</button>
                </div>

                <button onClick={clearCompleted} disabled={!todos.some((todo) => todo.completed)}>Clear completed</button>
            </div>

            <main className="todo-container">

                <TodoForm onAddTodo={addTodo} />

                <TodoList
                    todos={filteredTodos}
                    onDelete={deleteTodo}
                    onToggle={toggleTodo}
                    onUpdate={updateTodo}
                />

            </main>

        </div>
    );
}

export default App;
