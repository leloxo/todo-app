import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/types';
import { deleteTodo, getAllTodos } from '../../utils/api';
import TodoItem from '../TodoItem/TodoItem';

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const todos = await getAllTodos();
                setTodos(todos);
            } catch (error: any) {
                console.error('Error fetching todos: ', error);
                setError(error.message || 'Failed to fetch todos.');
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    const handleDelete = async (id: number) => {
        await deleteTodo(id);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>

    return (
        <div>
            {todos.length === 0 ? (
                <p>No todos available.</p>
            ) : (
                todos.map(todo => <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />)
            )}
        </div>
    );
};

export default TodoList;