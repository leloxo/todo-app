import {Month} from "../types/types";
import {decodeMonth} from "./enumUtils";

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month !== 'NaN' ? decodeMonth(convertMonthValueToEnum(month)) : month}/${year}`;
}

export const convertTimestampToDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const pad = (num: number) => num.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());

    return `${year}-${month}-${day}`;
};

export const convertMonthValueToEnum = (value: string): Month => {
    switch (value) {
        case '01':
            return Month.JANUARY;
        case '02':
            return Month.FEBRUARY;
        case '03':
            return Month.MARCH;
        case '04':
            return Month.APRIL;
        case '05':
            return Month.MAY;
        case '06':
            return Month.JUNE;
        case '07':
            return Month.JULY;
        case '08':
            return Month.AUGUST;
        case '09':
            return Month.SEPTEMBER;
        case '10':
            return Month.OCTOBER;
        case '11':
            return Month.NOVEMBER;
        case '12':
            return Month.DECEMBER;
        default:
            throw new Error(`Unsupported format ${value}`);
    }
}