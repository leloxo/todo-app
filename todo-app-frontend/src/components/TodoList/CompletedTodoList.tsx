import React from 'react';
import {Status, Todo} from '../../types/types';
import TodoItem from '../TodoItem/TodoItem';
import {TodoState} from "../../slices/todoSlice";
import styles from './todoList.module.scss'

interface CompletedTodoListProps {
    todoState: TodoState;
}

const CompletedTodoList: React.FC<CompletedTodoListProps> = ({ todoState }) => {
    const { items, loading, error, navigation } = todoState;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>

    const getCompletedTodos = (): Todo[] => {
        return items.filter((item) => item.status === Status.DONE)
    }

    return (
        <div className={styles.todoListContainer}>
            {
                getCompletedTodos().slice().reverse().map((todo: Todo) =>
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        navigation={navigation}
                        isNew={false}
                    />
                )
            }
        </div>
    );
};

export default CompletedTodoList;