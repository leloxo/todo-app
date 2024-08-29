import React from "react";

interface ComboBoxInputProps<T> {
    displayName?: string;
    name: string;
    value: T;
    options: T[];
    decode: (value: T) => string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ComboBoxInput = <T,>({ displayName, name, value, options, decode, onChange }: ComboBoxInputProps<T>) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            { displayName && <p style={{ marginRight: '5px' }}>{displayName}</p> }
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

