import React from 'react';
import {Priority, Status, Todo} from '../../types/types';
import TodoItem from '../TodoItem/TodoItem';
import {NavigationState, TodoState} from "../../slices/todoSlice";

interface TodoListProps {
    todoState: TodoState;
    onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todoState, onDelete }) => {
    const { items, loading, error, navigation } = todoState;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>

    return (
        <div style={{ width: '100%' }}>
            { navigation === NavigationState.CREATE && (
                <div>
                    <TodoItem
                        todo={{
                            id: Date.now(), // temporary ID
                            title: '',
                            creationDate: '',
                            dueDate: '',
                            priority: Priority.DEFAULT,
                            status: Status.DEFAULT,
                            description: '',
                            category: '',
                            completionDate: '',
                            tags: []
                        }}
                        navigation={navigation}
                        onDelete={onDelete}
                        isNew={true}
                    />
                </div>
            )}
            {items.length === 0 ? (
                <p>No todos available.</p>
            ) : (
                items.map((todo: Todo) =>
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        navigation={navigation}
                        onDelete={onDelete}
                        isNew={false}
                    />
                )
            )}
        </div>
    );
};

export default TodoList;