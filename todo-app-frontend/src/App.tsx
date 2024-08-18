import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

const App: React.FC = () => {
    return (
        <div>
            <h1>TODO LIST</h1>
            <TodoList />
        </div>
    );
};

export default App;