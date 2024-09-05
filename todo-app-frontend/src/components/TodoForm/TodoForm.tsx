import React from 'react';
import {Priority, Status, Todo} from '../../types/types';
import {formatDate} from "../../utils/dateUtils";
import ComboBoxInput from "../ComboBoxInput/ComboBoxInput";
import DateInput from "../DateInput/DateInput";
import styles from './todoForm.module.scss'
import {decodePriority, decodeStatus} from "../../utils/enumUtils";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {FormFieldError, setFormFieldErrors} from "../../slices/todoSlice";

interface TodoFormProps {
    formValues: Todo;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onSave: () => void;
    onCancel: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ formValues, onInputChange, onSave, onCancel }) => {
    const dispatch: AppDispatch = useDispatch();
    const { formFieldErrors } = useSelector((state: RootState) => state.todo);

    const onChange = (e: React.ChangeEvent<any>, formFieldError: FormFieldError) => {
        const updatedFormFieldErrors = formFieldErrors.filter(
            (error) => error !== formFieldError
        );
        dispatch(setFormFieldErrors(updatedFormFieldErrors));
        onInputChange(e);
    }

    const hasError = (field: FormFieldError) => formFieldErrors.includes(field);

    return (
        <form className={styles.formContainer}>
            <input
                type="text"
                name="title"
                placeholder={hasError(FormFieldError.TITLE_INPUT) ? 'Title must not be empty!' : 'Title'}
                value={formValues.title}
                onChange={(e) => onChange(e, FormFieldError.TITLE_INPUT)}
                aria-label="Task Title"
                className={hasError(FormFieldError.TITLE_INPUT) ? styles.inputWarning : ''}
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
                    onChange={(e) => onChange(e, FormFieldError.PRIORITY_INPUT)}
                    inputHasError={hasError(FormFieldError.PRIORITY_INPUT)}
                />
                <ComboBoxInput
                    displayName="Status:"
                    name="status"
                    value={formValues.status}
                    options={Object.values(Status)}
                    decode={decodeStatus}
                    onChange={(e) => onChange(e, FormFieldError.STATUS_INPUT)}
                    inputHasError={hasError(FormFieldError.STATUS_INPUT)}
                />
            </div>
            <textarea
                name="description"
                placeholder="Description"
                value={formValues.description}
                onChange={onInputChange}
                aria-label="Task Description"
            />
            <div className={styles.buttonContainer}>
                <button type="button" onClick={onSave}>Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default TodoForm;

