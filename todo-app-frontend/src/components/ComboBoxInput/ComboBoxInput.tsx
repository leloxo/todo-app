import React from 'react';
import styles from './comboBoxInput.module.scss';

interface ComboBoxInputProps<T> {
    displayName?: string;
    name: string;
    value: T;
    options: T[];
    decode: (value: T) => string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    inputHasError?: boolean;
}

const ComboBoxInput = <T,>({ displayName, name, value, options, decode, onChange, inputHasError }: ComboBoxInputProps<T>) => {
    return (
        <div className={inputHasError ? styles.inputWarning : styles.ComboBoxInputContainer}>
            {displayName && <p>{displayName}</p>}
            <select name={name} value={value as string} onChange={onChange}>
                {options.map(option => (
                    <option key={option as string} value={option as string}>
                        {decode(option)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ComboBoxInput;

