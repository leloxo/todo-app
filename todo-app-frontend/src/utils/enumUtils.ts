import {Status, Priority, Month} from "../types/types";

export const decodeStatus = (status: Status): string => {
    switch (status) {
        case Status.DONE:
            return 'Done';
        case Status.IN_PROGRESS:
            return 'In Progress';
        case Status.TODO:
            return 'To Do';
        default:
            return 'Unknown Status';
    }
}

export const decodePriority = (priority: Priority): string => {
    switch (priority) {
        case Priority.HIGH:
            return 'High';
        case Priority.MEDIUM:
            return 'Medium';
        case Priority.LOW:
            return 'Low';
        default:
            return 'Unknown Priority';
    }
}

export const decodeMonth = (month: Month): string => {
    switch (month) {
        case Month.JANUARY:
            return 'January';
        case Month.FEBRUARY:
            return 'February';
        case Month.MARCH:
            return 'March';
        case Month.APRIL:
            return 'April';
        case Month.MAY:
            return 'May';
        case Month.JUNE:
            return 'June';
        case Month.JULY:
            return 'July';
        case Month.AUGUST:
            return 'August';
        case Month.SEPTEMBER:
            return 'September';
        case Month.OCTOBER:
            return 'October';
        case Month.NOVEMBER:
            return 'November';
        case Month.DECEMBER:
            return 'December';
        default:
            return 'Invalid month';
    }
}