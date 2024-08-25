import React from 'react';
import { Todo } from '../../types/types';
import styles from './todoItem.module.scss';

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: number) => void;
    onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onEdit }) => {
    return (
        <div>
            <div className={styles.todoItem}>
                <p className={styles.title}>{todo.title}</p>
                <div className={styles.gridContainer}>
                    <p>Creation Date: {todo.creationDate}</p>
                    <p>Due Date: {todo.dueDate}</p>
                    <p>Priority: {todo.priority}</p>
                    <p>Status: {todo.status}</p>
                </div>
                {/* <section>{todo.description}</section> */}
                {/* <p>Category: {todo.category}</p> */}
                {/* <p>completion Date: {todo.completionDate}</p> */}
                {/* <p>Tags: {todo.tags}</p> */}

                <div className={styles.buttonContainer}>
                    <button onClick={() => onEdit(todo)}>Edit</button>
                    <button onClick={() => onDelete(todo.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
