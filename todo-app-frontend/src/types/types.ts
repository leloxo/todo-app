export interface Todo {
    id: number;
    title: string;
    description: string;
    creationDate: string;
    dueDate: string;
    priority: Priority;
    status: Status;
    category: string;
    completionDate: string;
    tags: string[];
}

export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    DEFAULT = 'DEFAULT',
}

export enum Status {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    DEFAULT = 'DEFAULT',
}