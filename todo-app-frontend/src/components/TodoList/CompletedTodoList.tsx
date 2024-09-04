import React from 'react';
import {Status, Todo} from '../../types/types';
import TodoItem from '../TodoItem/TodoItem';
import styles from './todoList.module.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

const CompletedTodoList: React.FC = () => {
    const { items, loading, error, navigation } = useSelector((state: RootState) => state.todo);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>

    const getCompletedTodos = (): Todo[] => {
        return items.filter((item) => item.status === Status.DONE)
    }

    return (
        <div className={styles.todoListContainer}>
            { getCompletedTodos().length === 0 ? (
                <div style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex'
                }}>
                    <p>No tasks completed yet...</p>
                </div>
                ) : (
                getCompletedTodos().slice().reverse().map((todo: Todo) =>
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

export default CompletedTodoList;