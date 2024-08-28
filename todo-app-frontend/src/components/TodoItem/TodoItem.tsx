import React, {useState} from 'react';
import { Todo } from '../../types/types';
import styles from './todoItem.module.scss';
import {formatDate} from "../../utils/dateUtils";
import {decodePriority, decodeStatus} from "../../utils/enumUtils";
import {AppDispatch} from "../../store/store";
import {useDispatch} from "react-redux";
import {addTodo, editTodo, NavigationState, setNavigationState} from "../../slices/todoSlice";

interface TodoItemProps {
    todo: Todo;
    navigation: NavigationState;
    onDelete: (id: number) => void;
    isNew: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, navigation, onDelete, isNew = false }) => {
    const dispatch: AppDispatch = useDispatch();
    const [newTodo, setNewTodo] = useState<Todo>(todo);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const handleEditButtonClick = (id: number) => {
        dispatch(setNavigationState(NavigationState.EDIT));
        setSelectedItemId(id);
    };

    const handleCancelButtonClick = () => {
        dispatch(setNavigationState(NavigationState.DEFAULT));
        resetSelectedItemId();
    };

    const isCreate = (navigation: NavigationState): boolean => {
        return navigation === NavigationState.CREATE;
    };

    const isEdit = (navigation: NavigationState): boolean => {
        return navigation === NavigationState.EDIT;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewTodo(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (isCreate(navigation)) {
            dispatch(addTodo(newTodo));
        } else if (isEdit(navigation)) {
            dispatch(editTodo({id: todo.id, todo: newTodo}));
        }
        dispatch(setNavigationState(NavigationState.DEFAULT));
        resetSelectedItemId();
    };

    const resetSelectedItemId = () => {
        setSelectedItemId(null);
    };

    return (
        <div className={styles.todoItem}>
            { (isCreate(navigation) && isNew) || (isEdit(navigation) && selectedItemId === todo.id) ? (
                <>
                    <input
                        name="title"
                        placeholder="Title"
                        value={newTodo.title}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={newTodo.description}
                        onChange={handleInputChange}
                    />
                    <div className={styles.buttonContainer}>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleCancelButtonClick}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <p className={styles.title}>{todo.title}</p>
                    <section>{todo.description}</section>
                    <div className={styles.gridContainer}>
                        <p>Creation Date: {formatDate(todo.creationDate)}</p>
                        <p>Due Date: {formatDate(todo.dueDate)}</p>
                        <p>Priority: {decodePriority(todo.priority)}</p>
                        <p>Status: {decodeStatus(todo.status)}</p>
                    </div>
                    {/* <p>Category: {todo.category}</p> */}
                    {/* <p>completion Date: {todo.completionDate}</p> */}
                    {/* <p>Tags: {todo.tags}</p> */}

                    <div className={styles.buttonContainer}>
                        <button onClick={() => handleEditButtonClick(todo.id)}>Edit</button>
                        <button onClick={() => onDelete(todo.id)}>Delete</button>
                    </div>
                </>
            )}

        </div>
    );
};

export default TodoItem;
