import React from 'react';
import { Todo } from '../types';

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
    return (
        <div>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <p>Creation Date: {todo.creationDate}</p>
            <p>Due Date: {todo.dueDate}</p>
            <p>Priority: {todo.priority}</p>
            <p>Status: {todo.status}</p>
            <p>Category: {todo.category}</p>
            <p>completion Date: {todo.completionDate}</p>
            <p>Tags: {todo.tags}</p>
            <button onClick={() => onDelete(todo.id)}>Delete Todo</button>
        </div>
    );
};

export default TodoItem;
