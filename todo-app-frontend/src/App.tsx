import React, {useEffect} from 'react';
import TodoList from './components/TodoList/TodoList';
import styles from './app.module.scss'
import AppHeader from "./components/AppHeader/AppHeader";
import {AppDispatch, RootState} from "./store/store";
import {useDispatch, useSelector} from "react-redux";
import {getTodos, removeTodo} from "./slices/todoSlice";

const App: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const todoState = useSelector((state: RootState) => state.todo);

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

    const handleDelete = (id: number) => {
        dispatch(removeTodo(id));
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center'}}>TODO LIST</h1>

            <div className={styles.appContentWrapper}>
                <AppHeader />
                <div className={styles.todoListContainer}>
                    <TodoList
                        todoState={todoState}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;