import React from "react";
import ComboBoxInput from "../ComboBoxInput/ComboBoxInput";
import {decodeMonth} from "../../utils/enumUtils";
import {convertMonthValueToEnum} from "../../utils/dateUtils";
import styles from './dateInput.module.scss'

interface DateInputProps {
    displayName: string;
    name: string;
    value: string; // YYYY-MM-DD
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const getMonthValue = (value: string): string => {
    return value.substring(5, 7);
}

const getDayValue = (value: string): string => {
    return value.substring(8, 10);
}

const getYearValue = (value: string): string => {
    return value.substring(0, 4);
}

const DateInput: React.FC<DateInputProps> = ({ displayName, name, value, onChange }) => {
    const daysInMonth = (month: number, year: number) => {
        return new Date(year, month, 0).getDate(); // Get the last date of the month
    }

    const monthOptions = Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, '0'));
    const yearOptions = Array.from({ length: 10 }, (_, i) => `${new Date().getFullYear() + i}`);

    const currentYear = parseInt(getYearValue(value), 10);
    const currentMonth = parseInt(getMonthValue(value), 10);
    const dayOptions = Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, i) => `${i + 1}`.padStart(2, '0'));

    const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const day = event.target.value.padStart(2, '0');
        const newValue = `${getYearValue(value)}-${getMonthValue(value)}-${day}`;
        onChange({
            ...event,
            target: { ...event.target, name, value: newValue }
        });
    }

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const month = event.target.value.padStart(2, '0');
        const newValue = `${getYearValue(value)}-${month}-${getDayValue(value)}`;
        onChange({
            ...event,
            target: { ...event.target, name, value: newValue }
        });
    }

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const year = event.target.value;
        const newValue = `${year}-${getMonthValue(value)}-${getDayValue(value)}`;
        onChange({
            ...event,
            target: { ...event.target, name, value: newValue }
        });
    }

    return (
        <div className={styles.InputContainer}>
            { displayName && <p style={{ marginRight: '5px' }}>{displayName}</p> }
            <ComboBoxInput
                name={`${name}_month`}
                value={getMonthValue(value)}
                options={monthOptions}
                decode={(month) => decodeMonth(convertMonthValueToEnum(month))}
                onChange={handleMonthChange}
            />
            <p>/</p>
            <ComboBoxInput
                name={`${name}_day`}
                value={getDayValue(value)}
                options={dayOptions}
                decode={(day) => day}
                onChange={handleDayChange}
            />
            <p>/</p>
            <ComboBoxInput
                name={`${name}_year`}
                value={getYearValue(value)}
                options={yearOptions}
                decode={(year) => year}
                onChange={handleYearChange}
            />
        </div>

    );
};

export default DateInput;