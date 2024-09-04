import React from 'react';
import {Status, Todo} from '../../types/types';
import TodoItem, {INITIAL_FORM_VALUES} from '../TodoItem/TodoItem';
import {NavigationState} from "../../slices/todoSlice";
import styles from './todoList.module.scss'
import {RootState} from "../../store/store";
import {useSelector} from "react-redux";

const TodoList: React.FC = () => {
    const { items, loading, error, navigation } = useSelector((state: RootState) => state.todo);

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
                        todo={INITIAL_FORM_VALUES}
                        navigation={navigation}
                        isNew={true}
                    />
                </div>
            )}
            {getUncompletedTodos().length === 0 ? (
                <div style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex'
                }}>
                    <p>No tasks available...</p>
                </div>
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