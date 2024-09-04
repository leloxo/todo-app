import React from 'react';
import {Priority, Status, Todo} from '../../types/types';
import {formatDate} from "../../utils/dateUtils";
import ComboBoxInput from "../ComboBoxInput/ComboBoxInput";
import DateInput from "../DateInput/DateInput";
import styles from './todoForm.module.scss'
import {decodePriority, decodeStatus} from "../../utils/enumUtils";

interface TodoFormProps {
    formValues: Todo;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onSave: () => void;
    onCancel: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ formValues, onInputChange, onSave, onCancel }) => {
    return (
        <form>
            <input
                name="title"
                placeholder="Title"
                value={formValues.title}
                onChange={onInputChange}
                aria-label="Task Title"
            />
            <textarea
                name="description"
                placeholder="Description"
                value={formValues.description}
                onChange={onInputChange}
                aria-label="Task Description"
            />
            <div className={styles.gridContainer}>
                <p>Creation Date: {formatDate(formValues.creationDate)}</p>

                <DateInput
                    displayName="Deadline:"
                    name="dueDate"
                    value={formValues.dueDate}
                    onChange={onInputChange}
                />
                <ComboBoxInput
                    displayName="Priority:"
                    name="priority"
                    value={formValues.priority}
                    options={Object.values(Priority)}
                    decode={decodePriority}
                    onChange={onInputChange}
                />
                <ComboBoxInput
                    displayName="Status:"
                    name="status"
                    value={formValues.status}
                    options={Object.values(Status)}
                    decode={decodeStatus}
                    onChange={onInputChange}
                />
            </div>
            <div className={styles.buttonContainer}>
                <button type="button" onClick={onSave}>Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default TodoForm;

