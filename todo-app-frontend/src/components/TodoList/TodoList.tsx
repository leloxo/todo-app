import React from 'react';
import {Priority, Status, Todo} from '../../types/types';
import TodoItem from '../TodoItem/TodoItem';
import {NavigationState, TodoState} from "../../slices/todoSlice";
import styles from './todoList.module.scss'
import {convertTimestampToDate} from "../../utils/dateUtils";

interface TodoListProps {
    todoState: TodoState;
}

const TodoList: React.FC<TodoListProps> = ({ todoState }) => {
    const { items, loading, error, navigation } = todoState;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>

    const getUncompletedTodos = (): Todo[] => {
        return items.filter((item) => item.status !== Status.DONE)
    }

    return (
        <div className={styles.todoListContainer}>
            { navigation === NavigationState.CREATE && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <TodoItem
                        todo={{
                            id: Date.now(), // temporary ID
                            title: '',
                            creationDate: '',
                            dueDate: convertTimestampToDate(Date.now()),
                            priority: Priority.DEFAULT,
                            status: Status.DEFAULT,
                            description: '',
                            completionDate: '',
                        }}
                        navigation={navigation}
                        isNew={true}
                    />
                </div>
            )}
            {items.length === 0 ? (
                <p>No todos available.</p>
            ) : (
                getUncompletedTodos().slice().reverse().map((todo: Todo) =>
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