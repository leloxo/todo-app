import { Status, Priority } from "../types/types";

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