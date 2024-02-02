import mongoose from 'mongoose';
import { ObjectId } from 'mongoose';
import { inject, injectable } from 'inversify';
import { ITask } from './../../domain/interface/index';
import { TasksRepository } from './../../domain/repository/tasks.repository';
import { IProjectRepository } from '../../../project/domain/repository/project.repository';
import { ProjectNotAllowedException, ProjectNotFoundException } from '../../../../common/exceptions';

@injectable()
export class TasksService {

    static NAME: string = 'TasksService';
    constructor(
        @inject('TasksRepository') private tasksRepository: TasksRepository,
        @inject('ProjectRepository') private projectRepository: IProjectRepository
    ) { }

    public addTask = async (data: ITask, userId: any): Promise<ITask> => {
        const project = await this.projectRepository.getProjectById(data.projectId);

        if (!project) {
            throw new ProjectNotFoundException();
        }

        if (project.owner._id.toString() !== userId.toString()) {
            throw new ProjectNotAllowedException();
        }
        const task = await this.tasksRepository.addTask(data);
        return task;
    }

    public getTask = async (taskId: string, userId: any) => {
        const task = await this.tasksRepository.getSingleTask(taskId);
        if (task.projectId.owner._id.toString() !== userId.toString()) {
            throw new ProjectNotAllowedException();
        }
        return task;
    }

    public editTask = async(taskId: string, data: ITask, userId: any) => {
        const task = await this.tasksRepository.getSingleTask(taskId);
        if (task.projectId.owner._id.toString() !== userId.toString()) {
            throw new ProjectNotAllowedException();
        }
        return await this.tasksRepository.updateTask(taskId, data);
    }
}