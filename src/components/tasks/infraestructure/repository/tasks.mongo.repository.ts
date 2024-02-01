import { injectable } from 'inversify';
import { ITask } from "../../domain/interface";
import { TasksRepository } from "../../domain/repository/tasks.repository";
import TaskModel from '../../domain/model/Task.model';


@injectable()
export class TasksMongoRepositoryImpl implements TasksRepository {

    static NAME: string = 'TasksMongoRepositoryImpl';

    constructor() { }

    public addTask = async (data: ITask): Promise<ITask> => {
        return await TaskModel.create(data)
    }

}