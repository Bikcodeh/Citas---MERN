import { injectable } from 'inversify';
import { ITask } from "../../domain/interface";
import { TasksRepository } from "../../domain/repository/tasks.repository";
import TaskModel from '../../domain/model/Task.model';
import { TaskNotFoundException } from '../../../../common/exceptions';


@injectable()
export class TasksMongoRepositoryImpl implements TasksRepository {

    static NAME: string = 'TasksMongoRepositoryImpl';

    constructor() { }

    public updateTask = async (taskId: string, data: ITask): Promise<ITask> => {
        try {
            const updatedTask = await TaskModel.findOneAndUpdate(
                { _id: taskId },
                {
                    name: data.name,
                    description: data.description,
                    deadline: data.deadline,
                    priority: data.priority
                },
                { new: true }
            );
            if (updatedTask) {
                return updatedTask;
            } else {
                throw new TaskNotFoundException();
            }
        } catch (error) {
            throw new TaskNotFoundException();
        }
    }
    

    public getSingleTask = async (taskId: string): Promise<ITask> => {
        const task = await TaskModel.findById(taskId).populate('projectId');
        if (!task) throw new TaskNotFoundException();
        return task;
    }

    public addTask = async (data: ITask): Promise<ITask> => {
        return await TaskModel.create(data)
    }

}