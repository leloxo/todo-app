import React, { useEffect } from 'react';
import { Todo } from '../../types/types';
import TodoItem from '../TodoItem/TodoItem';
import styles from 'todoList.module.scss'
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { editTodo, getTodos, removeTodo } from '../../slices/todoSlice';

const TodoList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todo.items);
    const loading = useSelector((state: RootState) => state.todo.loading);
    const error = useSelector((state: RootState) => state.todo.error);

    useEffect(() => {
        dispatch(getTodos());
    }, []);

    const handleDelete = async (id: number) => {
        dispatch(removeTodo(id));
    };
    
    const handleEdit = async (todo: Todo) => {
        dispatch(editTodo({ id: todo.id, todo }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>

    return (
        <div>
            {todos.length === 0 ? (
                <p>No todos available.</p>
            ) : (
                todos.map(todo => 
                    <TodoItem 
                        key={todo.id} 
                        todo={todo} 
                        onDelete={handleDelete} 
                        onEdit={handleEdit} 
                    />
                )
            )}
        </div>
    );
};

export default TodoList;