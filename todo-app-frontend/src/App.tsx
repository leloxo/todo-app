import React from 'react';
import TodoList from './components/TodoList/TodoList';
import styles from './app.module.scss'

const App: React.FC = () => {
    return (
        <div>
            <h1 style={{ textAlign: 'center'}}>TODO LIST</h1>
            <div className={styles.todoItemContainer}>
                <TodoList />
            </div>
        </div>
    );
};

export default App;