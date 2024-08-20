import React from 'react';
import TodoList from './components/TodoList/TodoList';

const App: React.FC = () => {
    return (
        <div>
            <h1>TODO LIST</h1>
            <TodoList />
        </div>
    );
};

export default App;