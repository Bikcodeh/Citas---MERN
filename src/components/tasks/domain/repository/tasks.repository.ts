import { Priority, ITask } from './../interface/index';

export interface TasksRepository {
    addTask(data: ITask): Promise<ITask>
    getSingleTask(taskId: string): Promise<ITask>
}