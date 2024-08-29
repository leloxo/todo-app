import React, {useEffect, useState} from 'react';
import {Priority, Status, Todo} from '../../types/types';
import styles from './todoItem.module.scss';
import {convertTimestampToDate, formatDate} from "../../utils/dateUtils";
import {decodePriority, decodeStatus} from "../../utils/enumUtils";
import {AppDispatch, RootState} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {
    addTodo,
    editTodo,
    NavigationState,
    removeTodo,
    setNavigationState,
    setSelectedItemId
} from "../../slices/todoSlice";
import ComboBoxInput from "../ComboBoxInput/ComboBoxInput";
import DateInput from "../DateInput/DateInput";

interface TodoItemProps {
    todo: Todo;
    navigation: NavigationState;
    isNew: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, navigation, isNew = false }) => {
    const dispatch: AppDispatch = useDispatch();
    const [formValues, setFormValues] = useState<Todo>(todo);
    const selectedItemId = useSelector((state: RootState) => state.todo.selectedItemId)

    useEffect(() => {
        if (todo.status === Status.DONE && !todo.completionDate) {
            updateCompletionDate();
        }
    }, [todo.status, todo.completionDate]);
    
    const handleEditButtonClick = (id: number) => {
        dispatch(setNavigationState(NavigationState.EDIT));
        dispatch(setSelectedItemId(id));
    };

    const handleDeleteButtonClick = (id: number) => {
        dispatch(removeTodo(id));
    };

    const handleCancelButtonClick = () => {
        dispatch(setNavigationState(NavigationState.DEFAULT));
    };

    const isCreate = (navigation: NavigationState): boolean => {
        return navigation === NavigationState.CREATE;
    };

    const isEdit = (navigation: NavigationState): boolean => {
        return navigation === NavigationState.EDIT;
    };

    const handleInputChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;

        console.log('handleInputChange');
        console.log(name, ' ',value);

        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (isCreate(navigation) && isNew) {
            dispatch(addTodo({
                ...formValues,
                creationDate: todo.creationDate || (convertTimestampToDate(Date.now())),
            }));
        } else if (isEdit(navigation)) {
            dispatch(editTodo({id: todo.id, todo: formValues}));
        }
        dispatch(setNavigationState(NavigationState.DEFAULT));
    };

    const updateCompletionDate = () => {
        const updatedTodo = {
            ...todo,
            completionDate: (convertTimestampToDate(Date.now())),
        };
        dispatch(editTodo({id: todo.id, todo: updatedTodo}));
    }

    return (
        <div className={styles.todoItem}>
            {(isCreate(navigation) && isNew) || (isEdit(navigation) && selectedItemId === todo.id) ? (
                // TODO put in TodoForm component
                <form>
                    <input
                        name='title'
                        placeholder='Title'
                        value={formValues.title}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name='description'
                        placeholder='Description'
                        value={formValues.description}
                        onChange={handleInputChange}
                    />
                    <div className={styles.gridContainer}>
                        <p>Creation Date: {formatDate(formValues.creationDate)}</p>

                        <DateInput
                            displayName='Due Date:'
                            name='dueDate'
                            value={formValues.dueDate ? formValues.dueDate : convertTimestampToDate(Date.now())}
                            onChange={handleInputChange}
                        />
                        <ComboBoxInput
                            displayName='Priority:'
                            name='priority'
                            value={formValues.priority}
                            options={Object.values(Priority)}
                            decode={decodePriority}
                            onChange={handleInputChange}
                        />
                        <ComboBoxInput
                            displayName='Status:'
                            name='status'
                            value={formValues.status}
                            options={Object.values(Status)}
                            decode={decodeStatus}
                            onChange={handleInputChange}
                        />

                    </div>
                    <div className={styles.buttonContainer}>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleCancelButtonClick}>Cancel</button>
                    </div>
                </form>
            ) : (
                <>
                    <p className={styles.title}>{todo.title}</p>
                    <p style={{ paddingBottom: '10px' }}>Description: {todo.description}</p>
                    <div className={styles.gridContainer}>
                        <p>Creation Date: {formatDate(todo.creationDate)}</p>
                        <p>Due Date: {formatDate(todo.dueDate)}</p>
                        <p>Priority: {decodePriority(todo.priority)}</p>
                        <p>Status: {decodeStatus(todo.status)}</p>

                        { todo.status === Status.DONE && todo.completionDate &&
                            <p> completion Date: {formatDate(todo.completionDate)} </p>
                        }
                    </div>

                    <div className={styles.buttonContainer}>
                        <button onClick={() => handleEditButtonClick(todo.id)}>Edit</button>
                        <button onClick={() => handleDeleteButtonClick(todo.id)}>Delete</button>
                    </div>
                </>
            )}

        </div>
    );
};

export default TodoItem;
