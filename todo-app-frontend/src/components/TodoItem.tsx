import React from 'react';
import { Todo } from '../types';
import './TodoItem.css';

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
    return (
        <div className='todo-item-container'>
            <div className='todo-item'>
                <p className='todo-title'>{todo.title}</p>
                <p>{todo.description}</p>
                <p>Creation Date: {todo.creationDate} Due Date: {todo.dueDate}</p>
                <p>Priority: {todo.priority}</p>
                <p>Status: {todo.status}</p>
                <p>Category: {todo.category}</p>
                <p>completion Date: {todo.completionDate}</p>
                <p>Tags: {todo.tags}</p>
                <button onClick={() => onDelete(todo.id)}>Delete Todo</button>
            </div>
        </div>
    );
};

export default TodoItem;
