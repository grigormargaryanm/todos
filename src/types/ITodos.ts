import {Dayjs} from "dayjs";

export enum TodoStatus {
    PENDING = 'Pending',
    COMPLETED = 'Completed',
    OVERDUE = 'Overdue',
    REMOVED = 'Removed',
}

export enum Filter {
    ALL = 'all',
    REMOVED = 'removed',
}

export interface ITodos {
    id: string;
    title: string;
    status: TodoStatus;
    description?: string;
    deadline?: Dayjs;
}