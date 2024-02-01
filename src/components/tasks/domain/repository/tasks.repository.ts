import { Priority, ITask } from './../interface/index';

export interface TasksRepository {
    addTask(data: ITask): Promise<ITask>
}