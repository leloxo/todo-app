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
    FormFieldError,
    NavigationState,
    removeTodo, setFormFieldErrors,
    setNavigationState,
    setSelectedItemId
} from "../../slices/todoSlice";
import WarnModal from "../WarnModal/WarnModal";
import TodoForm from "../TodoForm/TodoForm";

interface TodoItemProps {
    todo: Todo;
    navigation: NavigationState;
    isNew: boolean;
}

export const INITIAL_FORM_VALUES: Todo = {
    id: Date.now(),
    title: '',
    creationDate: '',
    dueDate: convertTimestampToDate(Date.now()),
    priority: Priority.DEFAULT,
    status: Status.DEFAULT,
    description: '',
    completionDate: '',
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, navigation, isNew = false }) => {
    const dispatch: AppDispatch = useDispatch();
    const selectedItemId = useSelector((state: RootState) => state.todo.selectedItemId);

    const [formValues, setFormValues] = useState<Todo>(todo);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [taskIsCompleted, setTaskIsCompleted] = useState(todo.status === Status.DONE);
    const [itemIsExpanded, setItemIsExpanded] = useState(false);

    useEffect(() => {
        if (taskIsCompleted && !todo.completionDate) {
            updateCompletionDate();
        }
    }, [todo.status, todo.completionDate]);

    const updateCompletionDate = () => {
        dispatch(editTodo({
            id: todo.id,
            todo: { ...todo, completionDate: convertTimestampToDate(Date.now()) },
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const isInputValid = ():boolean => {
        const formFieldErrors: FormFieldError[] = [];

        if (!formValues.title.trim()) {
            formFieldErrors.push(FormFieldError.TITLE_INPUT);
        }
        if (formValues.priority === 'DEFAULT') {
            formFieldErrors.push(FormFieldError.PRIORITY_INPUT);
        }
        if (formValues.status === 'DEFAULT') {
            formFieldErrors.push(FormFieldError.STATUS_INPUT);
        }
        if ((navigation === NavigationState.CREATE && formValues.status === 'DONE')) {
            formFieldErrors.push(FormFieldError.STATUS_INPUT);
        }

        if (formFieldErrors.length > 0) {
            dispatch(setFormFieldErrors(formFieldErrors));
            return false;
        }
        return true;
    }

    const handleSave = () => {
        if (isInputValid()) {
            if (navigation === NavigationState.CREATE && isNew) {
                dispatch(addTodo({
                    ...formValues,
                    creationDate: todo.creationDate || (convertTimestampToDate(Date.now())),
                }));
            } else if (navigation === NavigationState.EDIT) {
                dispatch(editTodo({id: todo.id, todo: formValues}));
            }
            dispatch(setNavigationState(NavigationState.DEFAULT));
        }
    };

    const handleCheckButtonClick = () => {
        const updatedStatus = taskIsCompleted ? Status.IN_PROGRESS : Status.DONE;
        setTaskIsCompleted(!taskIsCompleted);
        dispatch(editTodo({
            id: todo.id,
            todo: { ...todo, status: updatedStatus },
        }));
    };

    const handleEditButtonClick = () => {
        dispatch(setNavigationState(NavigationState.EDIT));
        dispatch(setSelectedItemId(todo.id));
    };

    const handleDeleteButtonClick = () => {
        dispatch(removeTodo(todo.id));
    };

    const handleCancelButtonClick = () => {
        dispatch(setNavigationState(NavigationState.DEFAULT));
    };

    const toggleItemExpansion = () => {
        setItemIsExpanded(prev => !prev);
    }

    const getPriorityIconColor = () => {
        switch (todo.priority) {
            case 'HIGH':
                return 'red';
            case 'MEDIUM':
                return 'orange';
            case 'LOW':
                return 'green';
            default:
                return 'white';
        }
    };

    return (
        <div className={taskIsCompleted ? styles.todoItemDone : styles.todoItem}>
            {(navigation === NavigationState.CREATE && isNew) ||
            (navigation === NavigationState.EDIT && selectedItemId === todo.id) ? (
                <TodoForm
                    formValues={formValues}
                    onInputChange={handleInputChange}
                    onSave={handleSave}
                    onCancel={handleCancelButtonClick}
                />
            ) : (
                <>
                    <div className={styles.todoItemContent}>
                        <div className={styles.todoItemContentElement}>
                            <button
                                className={taskIsCompleted ? styles.checkedButton : styles.uncheckButton}
                                onClick={handleCheckButtonClick}
                            />
                            <p
                                style={{ cursor: 'pointer' }}
                                className={taskIsCompleted ? styles.titleTaskDone : styles.title}
                                onClick={toggleItemExpansion}
                            >
                                {todo.title}
                            </p>
                        </div>

                        <div>
                            {!taskIsCompleted &&
                                <p>Deadline: {formatDate(todo.dueDate)}</p>
                            }
                            {taskIsCompleted && todo.completionDate &&
                                <p>Completion Date: {formatDate(todo.completionDate)} </p>
                            }
                        </div>

                        <div className={styles.buttonContainer}>
                            {!taskIsCompleted && (
                                <>
                                    <svg width="30" height="30">
                                        <circle cx="15" cy="15" r="12" fill={getPriorityIconColor()}/>
                                    </svg>
                                    <button
                                        className={styles.editButton}
                                        onClick={() => handleEditButtonClick()}
                                    />
                                </>
                            )}
                            <button
                                className={styles.deleteButton}
                                onClick={() => setModalIsOpen(true)}
                            />
                        </div>
                    </div>
                    {itemIsExpanded &&
                        <div className={styles.additionalInformationContainer}>
                            <p><strong>Creation Date:</strong> {formatDate(todo.creationDate)}</p>
                            <p><strong>Priority:</strong> {decodePriority(todo.priority)}</p>
                            <p><strong>Status:</strong> {decodeStatus(todo.status)}</p>
                            <p><strong>Description:</strong> {todo.description}</p>
                        </div>
                    }
                </>
            )}

            <WarnModal
                isOpen={modalIsOpen}
                message={'Are you sure you want to delete this task?'}
                onConfirm={() => handleDeleteButtonClick()}
                onCancel={() => setModalIsOpen(false)}
            />
        </div>
    );
};

export default TodoItem;
