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
        return res.status(StatusCodes.CREATED).json({status: 'ok', data: task});
    }

    public editTask = async (req: Request, res: Response) => {
        
    }

    public deleteTask = async (req: Request, res: Response) => {
        
    }

    public getTask = async (req: Request, res: Response) => {
        const task = await this.tasksService.getTask(req.params.id, req.user._id);
        return res.json({mgs: 'ok', data: task});
    }

    public changeStatus = async (req: Request, res: Response) => {
        
    }
}