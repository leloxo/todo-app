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

export enum Month {
    JANUARY = '01',
    FEBRUARY = '02',
    MARCH = '03',
    APRIL = '04',
    MAY = '05',
    JUNE = '06',
    JULY = '07',
    AUGUST = '08',
    SEPTEMBER = '09',
    OCTOBER = '10',
    NOVEMBER = '11',
    DECEMBER = '12',
}