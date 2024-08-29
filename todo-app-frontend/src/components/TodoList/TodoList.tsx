import React from 'react';
import {Priority, Status, Todo} from '../../types/types';
import TodoItem from '../TodoItem/TodoItem';
import {NavigationState, TodoState} from "../../slices/todoSlice";
import styles from './todoList.module.scss'

interface TodoListProps {
    todoState: TodoState;
}

const TodoList: React.FC<TodoListProps> = ({ todoState }) => {
    const { items, loading, error, navigation } = todoState;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>

    return (
        <div className={styles.todoListContainer}>
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
                        isNew={true}
                    />
                </div>
            )}
            {items.length === 0 ? (
                <p>No todos available.</p>
            ) : (
                items.slice().reverse().map((todo: Todo) =>
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        navigation={navigation}
                        isNew={false}
                    />
                )
            )}
        </div>
    );
};

export default TodoList;