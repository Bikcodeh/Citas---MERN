export interface ITask {
    _id?: any;
    name: string;
    description: string;
    status: boolean;
    deadline: Date;
    priority: Priority;
    projectId: any;
}

export enum Priority {
    LOW = 'low',
    MIDDLE = 'middle',
    HIGH = 'high'
}

export interface ITaskDocument extends ITask, Document {}