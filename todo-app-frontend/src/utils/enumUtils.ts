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
            return 'Jan';
        case Month.FEBRUARY:
            return 'Feb';
        case Month.MARCH:
            return 'Mar';
        case Month.APRIL:
            return 'Apr';
        case Month.MAY:
            return 'May';
        case Month.JUNE:
            return 'June';
        case Month.JULY:
            return 'July';
        case Month.AUGUST:
            return 'Aug';
        case Month.SEPTEMBER:
            return 'Sept';
        case Month.OCTOBER:
            return 'Oct';
        case Month.NOVEMBER:
            return 'Nov';
        case Month.DECEMBER:
            return 'Dec';
        default:
            return 'Invalid month';
    }
}