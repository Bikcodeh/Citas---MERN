import { injectable } from 'inversify';
import { Request, Response } from 'express';

@injectable()
export class TasksController {

    static NAME: string = 'TasksController';
    
    constructor() {}

    public addTask = async (req: Request, res: Response) => {

    }

    public editTask = async (req: Request, res: Response) => {
        
    }

    public deleteTask = async (req: Request, res: Response) => {
        
    }

    public getTask = async (req: Request, res: Response) => {
        
    }

    public changeStatus = async (req: Request, res: Response) => {
        
    }
}