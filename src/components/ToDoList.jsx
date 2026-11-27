import ToDoItem from "./ToDoItem";

function TodoList({ todos, onDelete, onToggle, onUpdate }) {
    return (
        <div className="todo-list">
            {todos.map((todo) => (
                <ToDoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
}

export default TodoList;