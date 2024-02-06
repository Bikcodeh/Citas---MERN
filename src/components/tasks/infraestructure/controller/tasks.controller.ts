import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { TasksService } from './../service/tasks.service';
import { Request, Response } from 'express';

@injectable()
export class TasksController {

    static NAME: string = 'TasksController';

    constructor(@inject(TasksService.NAME) private tasksService: TasksService) { }

    public addTask = async (req: Request, res: Response) => {
        const task = await this.tasksService.addTask(req.body, req.user._id);
        return res.status(StatusCodes.CREATED).json({ status: 'ok', data: task });
    }

    public editTask = async (req: Request, res: Response) => {
        const task = await this.tasksService.editTask(req.params.id, req.body, req.user._id);
        return res.status(StatusCodes.OK).json({ status: 'ok', data: task });
    }

    public deleteTask = async (req: Request, res: Response) => {
        const isDeleted = await this.tasksService.deleteTask(req.params.id, req.user._id);
        if (isDeleted) {
            return res.status(StatusCodes.OK).json({ msg: 'Task deleted' });
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'An error happened, please try again later.' })
        }
    }

    public getTask = async (req: Request, res: Response) => {
        const task = await this.tasksService.getTask(req.params.id, req.user._id);
        return res.json({ mgs: 'ok', data: task });
    }

    public changeStatus = async (req: Request, res: Response) => {

    }
}