import React, {useEffect} from 'react';
import TodoList from './components/TodoList/TodoList';
import AppHeader from "./components/AppHeader/AppHeader";
import AppTitle from "./components/AppTitle/AppTitle";
import {AppDispatch, RootState} from "./store/store";
import {useDispatch, useSelector} from "react-redux";
import {getTodos} from "./slices/todoSlice";
import styles from './app.module.scss'
import CompletedTodoList from "./components/TodoList/CompletedTodoList";
import CompletedTodoHeader from "./components/AppHeader/CompletedTodoHeader";

const App: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const todoState = useSelector((state: RootState) => state.todo);

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

    return (
        <div className='container'>
            <AppTitle
                title='Todo App'
            />
            <div className={styles.appContentWrapper}>
                <AppHeader/>
                <div className={styles.todoListContainer}>
                    <TodoList
                        todoState={todoState}
                    />
                </div>
                <CompletedTodoHeader/>
                <div className={styles.todoListContainer}>
                    <CompletedTodoList
                        todoState={todoState}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;