import { Priority, ITask } from './../interface/index';

export interface TasksRepository {
    addTask(data: ITask): Promise<ITask>
    getSingleTask(taskId: string): Promise<ITask>
    updateTask(taskId: string, data: ITask): Promise<ITask>
    deleteTask(taskId: string): Promise<boolean>
    getTasksByProject(projectId: string): Promise<ITask[]>
}